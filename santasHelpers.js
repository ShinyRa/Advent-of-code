/**
 * Read file contents to array
 *
 * @param String    filename
 * @param () => Any typeConverter
 *
 * @returns Array<Any>
 */

const readToArray = async (filename, typeConverter = null) => {
  let fs = require("fs");
  let readline = require("readline");

  return new Promise((resolve, reject) => {
    const data = [];
    let stream = fs.createReadStream(filename, "utf-8");

    var readLine = readline.createInterface({
      input: stream,
    });

    readLine
      .on("line", function (chunk) {
        data.push(typeConverter ? typeConverter(chunk) : chunk);
      })
      .on("close", () => {
        resolve(data);
      });
  });
};

module.exports = readToArray;
