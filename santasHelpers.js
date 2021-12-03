let fs = require("fs");
let readline = require("readline");

/**
 * Read file contents to array
 *
 * @param String    filename
 * @param () => Any optional typeConverter to convert values
 *
 * @returns Array<Any>
 */
const readToArray = async (filename, typeConverter = null) => {
  return new Promise((resolve, reject) => {
    const data = [];
    let stream = fs.createReadStream(filename, "utf-8");
    stream.on("error", reject);

    let readLine = readline.createInterface({
      input: stream,
    });

    readLine
      .on("line", (chunk) => {
        data.push(typeConverter ? typeConverter(chunk) : chunk);
      })
      .on("close", () => {
        resolve(data);
      });
  });
};

module.exports = readToArray;
