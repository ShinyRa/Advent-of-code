let readToArray = require("../santasHelpers");

(async () => {
  const commands = await readToArray("submarineCommands.txt");

  let [horizontalPosition, depth, aim] = [0, 0, 0];

  commands.map((instruction) => {
    let [direction, units] = instruction.split(" ");
    units = parseInt(units);
    switch (direction) {
      case "forward":
        horizontalPosition += units;
        depth += aim * units;
        break;
      case "down":
        aim += units;
        break;
      case "up":
        aim -= units;
        break;
    }
  });

  console.log(horizontalPosition * depth);
})();
