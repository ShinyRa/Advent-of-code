let { splitDelimiterToArray } = require("../santasHelpers");

(async () => {
  const population = await splitDelimiterToArray("lanternFishPopulation.txt");
  console.log(population);
})();
