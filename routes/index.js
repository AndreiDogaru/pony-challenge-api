const router = require('express').Router();

router.use('/maze', require('./maze.router'));

module.exports = router;
