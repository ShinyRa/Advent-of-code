let { readToArray, sortNumericPredicate } = require("../santasHelpers");

(async () => {
  const syntaxes = await readToArray("syntax.txt");
  const scores = correctMissingSyntaxScore(syntaxes);

  console.log(
    scores.sort(sortNumericPredicate)[Math.round((scores.length - 1) / 2)]
  );
})();

const correctMissingSyntaxScore = (syntaxes) => {
  const openingSymbols = ["(", "[", "{", "<"];
  const closingSymbols = [")", "]", "}", ">"];
  const symbolPoints = [1, 2, 3, 4];
  const totalPoints = [];

  syntaxes.forEach((syntax) => {
    let hasCorruption = false;
    const symbolQueue = [];
    [...syntax].forEach((character) => {
      if (openingSymbols.includes(character)) {
        symbolQueue.push(character);
      } else {
        const lastOpeningSymbol = symbolQueue.pop();
        const expected =
          closingSymbols[openingSymbols.indexOf(lastOpeningSymbol)];

        if (character !== expected) {
          hasCorruption = true;
        }
      }
    });

    if (!hasCorruption) {
      totalPoints.push(
        calculateScore(symbolQueue.reverse(), symbolPoints, openingSymbols)
      );
    }
  });

  return totalPoints;
};

const calculateScore = (queue, symbolPoints, openingSymbols) =>
  queue
    .map((symbol) => symbolPoints[openingSymbols.indexOf(symbol)])
    .reduce((prev, curr) => (prev = prev * 5 + curr));

// const syntaxErrorScore = (syntaxes, openingSymbols, closingSymbols) => {
//   const symbolPoints = [3, 57, 1197, 25137];
//   let totalPoints = 0;

//   syntaxes.forEach((syntax) => {
//     const symbolQueue = [];
//     [...syntax].forEach((character) => {
//       if (openingSymbols.includes(character)) {
//         symbolQueue.push(character);
//       } else {
//         let lastOpeningSymbol = symbolQueue.pop();
//         let expected =
//           closingSymbols[openingSymbols.indexOf(lastOpeningSymbol)];

//         if (character !== expected) {
//           totalPoints += symbolPoints[closingSymbols.indexOf(character)];
//         }
//       }
//     });
//   });

//   return totalPoints;
// };
