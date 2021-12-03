let readToArray = require("../santasHelpers");

(async () => {
  let sensorData = [];
  //   let depthIncreases = 0;

  sensorData = await readToArray("sensorData.txt", parseInt);

  console.log(sensorData);
})();
