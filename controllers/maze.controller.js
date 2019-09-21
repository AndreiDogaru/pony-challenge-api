const uuidv4 = require('uuid/v4');

const {
  generateMazeWalls,
  calculateNewPonyLocation,
  generateNewDomokunMove,
} = require('../lib/services/maze');
const { Maze } = require('../lib/db').models;

/**
 * Create a new maze and return its id.
 */
module.exports.createMaze = async (data) => {
  if (!data || !data.width || !data.height) {
    throw new Error('Please provide dimensions for the maze');
  }

  if (
    data.width < 15 || data.width > 25
    || data.height < 15 || data.height > 25
  ) {
    throw new Error('Maze dimensions must be between 15 and 25');
  }

  // generate maze walls
  const walls = generateMazeWalls(data.width, data.height);

  // create a new maze and store it in the db
  const mazeData = {
    id: uuidv4(),
    pony: Math.floor(Math.random() * data.width * data.height),
    domokun: Math.floor(Math.random() * data.width * data.height),
    exit: Math.floor(Math.random() * data.width * data.height),
    width: data.width,
    height: data.height,
    data: walls,
  };
  const maze = await Maze
    .create(mazeData)
    .catch(() => { throw new Error('Failed to create maze'); });

  return maze.id;
};

/**
 * Get an existing maze by id.
 */
module.exports.getMaze = (mazeId) => {
  if (!mazeId) {
    throw new Error('Please provide an id for the maze');
  }

  return Maze
    .findById(mazeId)
    .catch(() => { throw new Error('Failed to get maze'); });
};

/**
 * Move the player to a new position, given the direction and the id of the maze.
 * Return the state of the maze and a message.
 */
module.exports.move = async (direction, mazeId) => {
  if (!direction || ['north', 'south', 'east', 'west'].indexOf(direction) === -1) {
    throw new Error('Please provide a valid direction: north, south, east, west');
  }

  // initialize a message response
  let message = 'Move accepted';

  // get maze from db
  const maze = await module.exports.getMaze(mazeId);

  if (maze.state === 'won') {
    message = 'You won. Game over!';
  } else if (maze.state === 'lost') {
    message = 'You lost. Killed by monster!';
  } else {
    // check if the move is accepted and get the new pony location
    const { isMoveAccepted, newPonyLocation } = calculateNewPonyLocation(maze, direction);

    if (!isMoveAccepted) {
      message = 'Can\'t walk in there!';
    } else {
      // set the new location of pony an domokun
      maze.pony = newPonyLocation;
      maze.domokun = generateNewDomokunMove(maze);
    }
  }


  return {
    state: maze.state,
    message,
  };
};
