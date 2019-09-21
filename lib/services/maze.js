/**
 * Function that generates an array of cells, based on a given width and height.
 * Each cell has its own array of walls, containing values from the following list:
 * 'north', 'south'.
 */
module.exports.generateMazeWalls = (width, height) => {
  const totalCells = width * height;

  // array that contains the walls of each cell and a boolean if the cell is visited or not
  const cells = [];

  // fill the array with initial data
  for (let i = 0; i < totalCells; i += 1) {
    cells.push({ walls: ['north', 'west'], isVisited: false });
  }

  // generate random start and get the id of the current cell ( can from 0 to totalCells - 1 )
  let currentCell = Math.floor(Math.random() * totalCells);

  // store the path
  const path = [currentCell];
  // mark currentCell as visited
  cells[currentCell].isVisited = true;
  // store num of visited cells
  let visited = 1;

  // loop until all cells are visited
  while (visited < totalCells) {
    // gather all potential neighbours
    const neighbours = [];

    if (currentCell >= width && !cells[currentCell - width].isVisited) {
      // North
      neighbours.push(currentCell - width);
    }
    if (currentCell < totalCells - width && !cells[currentCell + width].isVisited) {
      // South
      neighbours.push(currentCell + width);
    }
    if (currentCell % width !== 0 && !cells[currentCell - 1].isVisited) {
      // West
      neighbours.push(currentCell - 1);
    }
    if ((currentCell + 1) % width !== 0 && !cells[currentCell + 1].isVisited) {
      // East
      neighbours.push(currentCell + 1);
    }

    if (neighbours.length) {
      // get the next neighbour to be added to the path
      const nextCell = neighbours[Math.floor(Math.random() * neighbours.length)];

      // check which neighbour has been choosen and remove walls between nextCell and currentCell
      switch (nextCell) {
        case currentCell - width: // nextCell is in North
          cells[currentCell].walls.splice(cells[currentCell].walls.indexOf('north'), 1);
          break;
        case currentCell + width: // nextCell is in South
          cells[nextCell].walls.splice(cells[nextCell].walls.indexOf('north'), 1);
          break;
        case currentCell - 1: // nextCell is in West
          cells[currentCell].walls.splice(cells[currentCell].walls.indexOf('west'), 1);
          break;
        case currentCell + 1: // nextCell is in East
          cells[nextCell].walls.splice(cells[nextCell].walls.indexOf('west'), 1);
          break;
        default: break;
      }

      // mark nextCell as visited
      cells[nextCell].isVisited = true;
      // increase num of visited cells
      visited += 1;
      // change currentCell
      currentCell = nextCell;
      // add new currentCell to the path
      path.push(currentCell);
    } else {
      // go back 1 step
      currentCell = path.pop();
    }
  }

  return cells.map((item) => item.walls);
};

/**
 * Function that returns the new pony location and if the move is valid inside the maze,
 * based on a provided direction.
 */
module.exports.calculateNewPonyLocation = (maze, direction) => {
  let isMoveAccepted = false;
  let newPonyLocation;

  switch (direction) {
    case 'north':
      isMoveAccepted = maze.pony - maze.width >= 0 && maze.data[maze.pony].indexOf('north') === -1;
      newPonyLocation = maze.pony - maze.width;
      break;
    case 'south':
      isMoveAccepted = maze.pony + maze.width < maze.width * maze.height && maze.data[maze.pony + maze.width].indexOf('north') === -1;
      newPonyLocation = maze.pony + maze.width;
      break;
    case 'west':
      isMoveAccepted = maze.pony % maze.width !== 0 && maze.data[maze.pony].indexOf('west') === -1;
      newPonyLocation = maze.pony - 1;
      break;
    case 'east':
      isMoveAccepted = (maze.pony + 1) % maze.width !== 0 && maze.data[maze.pony + 1].indexOf('west') === -1;
      newPonyLocation = maze.pony + 1;
      break;
    default: break;
  }

  return { isMoveAccepted, newPonyLocation };
};

/**
 * Function that generates a new move for the domokun.
 */
module.exports.generateNewDomokunMove = (maze) => {
  // gather all domokun possibilities
  const domokunPossibleMoves = [];

  if (
    maze.domokun - maze.width >= 0
    && maze.data[maze.domokun].indexOf('north') === -1
  ) {
    // North
    domokunPossibleMoves.push(maze.domokun - maze.width);
  }
  if (
    maze.domokun + maze.width < maze.width * maze.height
    && maze.data[maze.domokun + maze.width].indexOf('north') === -1
  ) {
    // South
    domokunPossibleMoves.push(maze.domokun + maze.width);
  }
  if (
    maze.domokun % maze.width !== 0
    && maze.data[maze.domokun].indexOf('west') === -1
  ) {
    // West
    domokunPossibleMoves.push(maze.domokun - 1);
  }
  if (
    (maze.domokun + 1) % maze.width !== 0
    && maze.data[maze.domokun + 1].indexOf('west') === -1
  ) {
    // East
    domokunPossibleMoves.push(maze.domokun + 1);
  }

  return domokunPossibleMoves[Math.floor(Math.random() * domokunPossibleMoves.length)];
};
