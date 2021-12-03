let readToArray = require("../santasHelpers");

(async () => {
  const sensorData = await readToArray("sensorData.txt", parseInt);
  console.log(sonarSweep(sensorData), sonarSweepThreeMeasurements(sensorData));
})();

const sonarSweep = (sensorData) => {
  let lastMeasurement;
  let depthIncreases = 0;

  sensorData.map((measurement) => {
    measurement > lastMeasurement ? depthIncreases++ : null;
    lastMeasurement = measurement;
  });

  return depthIncreases;
};

const sonarSweepThreeMeasurements = (sensorData) => {
  const windowMeasurementCount = 3;
  let lastMeasurement = [];
  let currentMeasurement = [];
  let depthIncreases = 0;

  sensorData.map((_, dataIndex) => {
    currentMeasurement = [];
    [...new Array(windowMeasurementCount)].map((_, windowIndex) => {
      currentMeasurement.push(sensorData[dataIndex + windowIndex]);
    });

    if (lastMeasurement.length > 0) {
      currentMeasurement.reduce(add) > lastMeasurement.reduce(add)
        ? depthIncreases++
        : null;
    }

    lastMeasurement = currentMeasurement;
  });

  return depthIncreases;
};

const add = (prev, curr) => prev + curr;
