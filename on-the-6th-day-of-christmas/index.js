let { splitWithDelimiterToArray } = require("../santasHelpers");

class AnglerFish {
  age;

  constructor(age) {
    this.age = age;
  }
}

(async () => {
  const population = await splitWithDelimiterToArray(
    "anglerFishPopulation.txt",
    parseInt
  );
  console.log(population);
})();
