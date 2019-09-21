# PonyChallengeAPI

This project was created using NodeJS 12 and Express.  
Data is stored inside a postgreSQL database.
Communication with the database is done through sequelize ORM.

## Environment variable

Use the structure inside `.env.example` to create a new `.env` file. There you can add your database configuration.

## Initialize the database

Create a new database ( give it whatever name you entered into the `.env` file ), then run the command
`npm run db:migrate` to migrate all tables.

## Run the API

Run `npm start` to start the server.
( make sure to run `npm install` the first time you set up the project )
