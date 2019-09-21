const Sequelize = require('sequelize');
const { types } = require('pg');

const dbConfig = require('./config/config');
const fileHelpers = require('../utilities/file-helpers');

// Remove timezone from timestamps
types.setTypeParser(1114, (stringValue) => new Date(Date.parse(`${stringValue}+0000`)));

// Create sequelize connection
const sequelize = new Sequelize(dbConfig);

// Return a log with authentication status
sequelize.authenticate()
  .then(() => {
    console.log('Connection to database OK');
  })
  .catch((err) => {
    console.log(err);
  });

// Init all models TODO: avoid searching, just get all files from 'models' directory
const modelsPath = fileHelpers.searchRecursive('./', '.model.js');

const models = modelsPath.reduce((result, modelPath) => {
  const model = sequelize.import(modelPath);

  return { ...result, [model.name]: model };
}, {});

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) models[modelName].associate(models);
});

module.exports = {
  sequelize,
  Sequelize,
  models,
};
