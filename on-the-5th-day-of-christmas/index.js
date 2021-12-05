let { readToArray } = require("../santasHelpers");

(async () => {
  const layout = await readToArray("hydrothermalVentsLayout.txt");

  console.log(layout);
})();
