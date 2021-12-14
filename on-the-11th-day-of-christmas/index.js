let { readToArray } = require("../santasHelpers");

class Flash {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

(async () => {
  let energyLevels = await readToArray("octopusEnergyLevels.txt", (row) =>
    row.split("")
  );

  let synchronized = false;
  let turn = 0;

  while (!synchronized) {
    turn++;
    let flashMap = createFlashMap(energyLevels);
    let levels = incrementEnergyLevels(energyLevels);
    const flashQueue = checkForFlashes(levels, flashMap);
    while (flashQueue.length > 0) {
      const { x, y } = flashQueue.pop();
      if (!hasAlreadyFlashed(flashMap, x, y)) {
        flashMap[y][x] = 1;
        levels = updateNeighbours(levels, x, y);
        flashQueue.push(...checkForFlashes(levels, flashMap));
      }
    }

    energyLevels = levels.map((row) =>
      row.map((level) => (level > 9 ? 0 : level))
    );

    synchronized = energyLevels.flat().every((level) => level == 0);
  }
  console.log(`All octopuses synchronize on turn ${turn}`);
})();

const updateNeighbours = (levels, middleX, middleY) => {
  const deltas = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ];
  deltas.forEach(({ x, y }) => {
    if (
      x + middleX >= 0 &&
      x + middleX < levels[0].length &&
      y + middleY >= 0 &&
      y + middleY < levels[0].length
    ) {
      levels[y + middleY][x + middleX]++;
    }
  });
  return levels;
};

const createFlashMap = (energyLevels) =>
  [...energyLevels].map((row) => row.map(() => 0));

const incrementEnergyLevels = (energyLevels) =>
  energyLevels.map((row) => row.map((level) => parseInt(level) + 1));

const hasAlreadyFlashed = (flashMap, x, y) => flashMap[y][x] != 0;

const checkForFlashes = (energyLevels, flashMap) => {
  const queue = [];

  energyLevels.forEach((row, y) => {
    [...row].forEach((energyLevel, x) => {
      if (energyLevel > 9) {
        queue.push(new Flash(x, y));
      }
    });
  });

  return queue;
};
