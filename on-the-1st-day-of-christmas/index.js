let readToArray = require("../santasHelpers");

(async () => {
  const sensorData = await readToArray("sensorData.txt", parseInt);
  let depthIncreases = 0;
  let lastMeasurement;

  sensorData.map((measurement) => {
    measurement > lastMeasurement ? depthIncreases++ : null;
    lastMeasurement = measurement;
  });

  console.log(depthIncreases);
})();
