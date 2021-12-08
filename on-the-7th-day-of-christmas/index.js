let { splitWithDelimiterToArray } = require("../santasHelpers");

(async () => {
  const whale = await splitWithDelimiterToArray("whale.txt", parseInt);

  console.log(whale);
})();
