let { splitWithDelimiterToArray, addPredicate } = require("../santasHelpers");

(async () => {
  const crabPositions = await splitWithDelimiterToArray(
    "crabPositions.txt",
    parseInt
  );

  const furthestCrab = Math.max(...crabPositions);
  const moves = [...new Array(furthestCrab).fill(0)];

  [...new Array(furthestCrab)].forEach((_, position) => {
    crabPositions.forEach((crab) => {
      moves[position] += [
        ...new Array(Math.abs(crab - (position + 1)) + 1).keys(),
      ].reduce(addPredicate);
    });
  });
  console.log(Math.min(...moves));
})();
