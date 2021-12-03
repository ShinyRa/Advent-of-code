let readToArray = require("../santasHelpers");

(async () => {
  const commands = await readToArray("submarineCommands.txt");

  console.log(commands);
})();
