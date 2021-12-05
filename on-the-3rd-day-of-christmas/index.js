let readToArray = require("../santasHelpers");

(async () => {
  const diagnostics = await readToArray("diagnosticReport.txt");

  console.log(powerConsumption(diagnostics), lifeSupportRating(diagnostics));
})();

const powerConsumption = (diagnostics) => {
  let gamma = "";
  [...new Array(diagnostics[0].length)].map((_, bit) => {
    gamma += determineCommonValue(diagnostics, bit);
  });

  let epsilon = invert(gamma);
  return toDecimal(gamma) * toDecimal(epsilon);
};

const lifeSupportRating = (diagnostics) => {
  let [oxygenGeneratorRating, scrubberRating] = [diagnostics, diagnostics];

  [...new Array(diagnostics[0].length)].map((_, bit) => {
    if (scrubberRating.length != 1) {
      scrubberRating = scrubberRating.filter(
        (byte) => byte[bit] != determineCommonValue(scrubberRating, bit)
      );
    }
  });

  [...new Array(diagnostics[0].length)].map((_, bit) => {
    if (oxygenGeneratorRating.length != 1) {
      oxygenGeneratorRating = oxygenGeneratorRating.filter(
        (byte) => byte[bit] === determineCommonValue(oxygenGeneratorRating, bit)
      );
    }
  });

  return toDecimal(scrubberRating[0]) * toDecimal(oxygenGeneratorRating[0]);
};

const determineCommonValue = (diagnostics, position) => {
  let [zeros, ones] = [0, 0];
  diagnostics.map((binary) => {
    binary[position] > 0 ? ones++ : zeros++;
  });
  return zeros > ones ? "0" : "1";
};

const invert = (byte) =>
  [...byte].map((bit) => (bit === "1" ? "0" : "1")).join("");

const toDecimal = (byte) => parseInt(byte, 2);
