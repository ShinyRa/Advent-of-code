let { readToArray } = require("../santasHelpers");

class Point {
  x;
  y;

  constructor(x, y) {
    this.x = parseInt(x);
    this.y = parseInt(y);
  }
}
class Line {
  from;
  to;

  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  intersectsWith = (point) => {
    const dxc = point.x - this.from.x;
    const dyc = point.y - this.from.y;

    const dxl = this.to.x - this.from.x;
    const dyl = this.to.y - this.from.y;

    const cross = dxc * dyl - dyc * dxl;

    if (cross != 0) return false;

    if (Math.abs(dxl) >= Math.abs(dyl))
      return dxl > 0
        ? this.from.x <= point.x && point.x <= this.to.x
        : this.to.x <= point.x && point.x <= this.from.x;
    else
      return dyl > 0
        ? this.from.y <= point.y && point.y <= this.to.y
        : this.to.y <= point.y && point.y <= this.from.y;
  };
}

(async () => {
  const layout = await readToArray("hydrothermalVentsLayout.txt");

  const lines = initializeLines(layout);
  const GRID_DIMENSIONS = 1000;
  const grid = [];

  [...new Array(GRID_DIMENSIONS)].map((_, y) => {
    [...new Array(GRID_DIMENSIONS)].map((_, x) => {
      let intersections = 0;
      let point = new Point(x, y);
      lines.map((line) => {
        if (line.intersectsWith(point)) {
          intersections++;
        }
      });
      grid.push({ x: x, y: y, intersections: intersections });
    });
  });

  console.log(grid.filter((point) => point.intersections >= 2).length);
})();

const initializeLines = (lineLayout) => {
  return lineLayout.map((line) => {
    const [x1, y1, x2, y2] = line.split("->").join(",").split(",");
    return new Line(new Point(x1, y1), new Point(x2, y2));
  });
};
