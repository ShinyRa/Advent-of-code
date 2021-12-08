let { splitWithDelimiterToArray, addPredicate } = require("../santasHelpers");

(async () => {
  const scan = await splitWithDelimiterToArray(
    "anglerFishPopulation.txt",
    parseInt
  );

  const SIMULATION_DAYS = 256;
  const MAX_REPRODUCTION_TICK = 8;
  const NEW_REPRODUCTION_TICK = 6;
  let anglerFishAges = [...new Array(MAX_REPRODUCTION_TICK + 1)].fill(0);

  scan.forEach((reproduction) => anglerFishAges[reproduction]++);

  [...new Array(SIMULATION_DAYS)].forEach(() => {
    const anglerFishOnDay = [...new Array(MAX_REPRODUCTION_TICK + 1)].fill(0);
    anglerFishOnDay.forEach((_, index) => {
      const amount = anglerFishAges[index];
      if (!index) {
        anglerFishOnDay[NEW_REPRODUCTION_TICK] += amount;
        anglerFishOnDay[MAX_REPRODUCTION_TICK] += amount;
      } else {
        anglerFishOnDay[index - 1] += amount;
      }
    });
    anglerFishAges = anglerFishOnDay;
  });

  console.log(anglerFishAges.reduce(addPredicate));
})();
