const router = require('express').Router();

router.use('/maze', require('./maze.router'));

// Default route
router.get('/', (req, res) => res.status(200).send(
  { message: 'This is where it all started :)' }
));

module.exports = router;
