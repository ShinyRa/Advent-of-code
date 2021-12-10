let { readToArray } = require("../santasHelpers");

(async () => {
  const basins = [];
  const heightmap = await readToArray("heightmap.txt");

  heightmap.forEach((row, y) => {
    [...row].forEach((height, x) => {
      if (isLowPoint(heightmap, x, y, height)) {
        basins.push([
          {
            x: x,
            y: y,
            height: parseInt(height),
          },
        ]);
      }
    });
  });

  basins.forEach((basin, index) => {
    const visited = [];
    const points = [basin.pop()];

    while (points.length != 0) {
      const point = points.pop();

      if (
        !visited.some((visited) => visited.x == point.x && visited.y == point.y)
      ) {
        const neighbourgs = findNeighbourghs(
          heightmap,
          point.x,
          point.y
        ).filter(
          (neighbourg) =>
            neighbourg.height != 9 &&
            !visited.some(
              (visited) =>
                visited.x == neighbourg.x && visited.y == neighbourg.y
            )
        );

        visited.push(point);
        points.push(...neighbourgs);
      }
    }
    basins[index].push(...visited);
  });

  const topThreeLargestBasins = basins
    .map((basin) => parseInt(basin.length))
    .sort((a, b) => b - a)
    .splice(0, 3);

  const sum = topThreeLargestBasins.reduce((prev, curr) => {
    return prev * curr;
  }, 1);
  console.log(sum);
})();

const findNeighbourghs = (heightmap, x, y) => {
  const neighbourgs = [];
  neighbourgs.push(
    heightmap[y][x - 1] || 0
      ? {
          x: x - 1,
          y: y,
          height: parseInt(heightmap[y][x - 1]),
        }
      : { x: x - 1, y: y, height: 9 }
  );
  neighbourgs.push(
    heightmap[y][x + 1] || 0
      ? { x: x + 1, y: y, height: parseInt(heightmap[y][x + 1]) }
      : { x: x + 1, y: y, height: 9 }
  );
  neighbourgs.push(
    heightmap[y - 1] || 0
      ? { x: x, y: y - 1, height: parseInt(heightmap[y - 1][x]) }
      : { x: x, y: y - 1, height: 9 }
  );
  neighbourgs.push(
    heightmap[y + 1] || 0
      ? { x: x, y: y + 1, height: parseInt(heightmap[y + 1][x]) }
      : { x: x, y: y + 1, height: 9 }
  );
  return neighbourgs;
};

const isLowPoint = (heightmap, x, y, height) =>
  findNeighbourghs(heightmap, x, y).every(
    (neighbourg) => height < neighbourg.height
  );
