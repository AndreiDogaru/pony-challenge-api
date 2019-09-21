const router = require('express').Router({ mergeParams: true });

const mazeController = require('../controllers/maze.controller');

// POST: /maze
router.post('/', (req, res, next) => {
  mazeController.createMaze(req.body)
    .then(result => res.json(result))
    .catch(next);
});

// GET: /maze/:id
router.get('/:id', (req, res, next) => {
  mazeController.getMaze(req.params.id)
    .then(result => res.json(result))
    .catch(next); 
});

// POST: /maze/:id
router.post('/:id', (req, res, next) => {
  mazeController.move(req.body.direction, req.params.id)
    .then(result => res.json(result))
    .catch(next); 
});

module.exports = router;