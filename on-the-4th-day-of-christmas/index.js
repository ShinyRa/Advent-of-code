let readToArray = require("../santasHelpers");

(async () => {
  const bingo = await readToArray("bingo.txt");

  console.log(bingo);
})();
