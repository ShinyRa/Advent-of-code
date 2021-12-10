let { readToArray, addPredicate } = require("../santasHelpers");

(async () => {
  const randomSegments = await readToArray("segments.txt");
  const signalPatterns = [];

  [...randomSegments].forEach((signalPattern) => {
    signalPatterns.push(signalPattern);
  });

  let digits = [];
  [...signalPatterns].forEach((sequence) => {
    digits.push(decryptSequence(sequence));
  });

  console.log(digits.map((digit) => parseInt(digit)).reduce(addPredicate));
})();

const decryptSequence = (sequence) => {
  const digitLengths = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];
  const knownDigits = [1, 4, 7, 8];
  const segments = ["a", "b", "c", "d", "e", "f", "g"];
  const sides = [
    "LEFT_TOP",
    "RIGHT_TOP",
    "TOP",
    "CENTER",
    "LEFT_BOTTOM",
    "RIGHT_BOTTOM",
    "BOTTOM",
  ];

  const digitSides = [
    ["TOP", "RIGHT_TOP", "LEFT_TOP", "LEFT_BOTTOM", "RIGHT_BOTTOM", "BOTTOM"],
    ["RIGHT_TOP", "RIGHT_BOTTOM"],
    ["TOP", "RIGHT_TOP", "CENTER", "LEFT_BOTTOM", "BOTTOM"],
    ["TOP", "RIGHT_TOP", "CENTER", "RIGHT_BOTTOM", "BOTTOM"],
    ["RIGHT_TOP", "LEFT_TOP", "CENTER", "RIGHT_BOTTOM"],
    ["TOP", "LEFT_TOP", "CENTER", "RIGHT_BOTTOM", "BOTTOM"],
    ["TOP", "LEFT_TOP", "CENTER", "RIGHT_BOTTOM", "LEFT_BOTTOM", "BOTTOM"],
    ["TOP", "RIGHT_TOP", "RIGHT_BOTTOM"],
    [
      "TOP",
      "RIGHT_TOP",
      "LEFT_TOP",
      "CENTER",
      "LEFT_BOTTOM",
      "RIGHT_BOTTOM",
      "BOTTOM",
    ],
    ["TOP", "RIGHT_TOP", "LEFT_TOP", "CENTER", "RIGHT_BOTTOM", "BOTTOM"],
  ];

  const sidesMappedToSegments = new Map();
  const mappedToDigit = new Map();

  const [input, output] = sequence.split("|");

  digitLengths.forEach((_, index) => {
    mappedToDigit.set(index, "");
  });

  sides.forEach((side) => {
    sidesMappedToSegments.set(side, "");
  });

  let notKnown = "";

  input
    .trim()
    .split(" ")
    .map((digit) => {
      if (digit.length === 5 || digit.length === 6) {
        notKnown += digit;
      } else {
        knownDigits.map((known) => {
          if (digit.length === digitLengths[known]) {
            mappedToDigit.set(known, digit);
          }
        });
      }
    });

  const segmentsOccurance = [...new Array(segments.length).fill(0)];
  segments.forEach((segment, index) => {
    segmentsOccurance[index] += [...notKnown]
      .map((letter) => letter === segment)
      .reduce(addPredicate);
  });

  const findSegmentByCondition = (find) =>
    segments[segmentsOccurance.findIndex(find)];

  sidesMappedToSegments.set(
    "TOP",
    [...mappedToDigit.get(7)].filter(
      (letter) => ![...mappedToDigit.get(1)].includes(letter)
    )
  );

  sidesMappedToSegments.set(
    "LEFT_BOTTOM",
    findSegmentByCondition((segment) => segment === 3)
  );

  sidesMappedToSegments.set(
    "BOTTOM",
    findSegmentByCondition(
      (segment, index) =>
        segment === 6 && segments[index] != sidesMappedToSegments.get("TOP")
    )
  );

  sidesMappedToSegments.set(
    "RIGHT_TOP",
    findSegmentByCondition(
      (segment, index) =>
        segment === 4 && [...mappedToDigit.get(1)].includes(segments[index])
    )
  );

  sidesMappedToSegments.set(
    "RIGHT_BOTTOM",
    findSegmentByCondition(
      (segment, index) =>
        segment === 5 && [...mappedToDigit.get(1)].includes(segments[index])
    )
  );

  sidesMappedToSegments.set(
    "LEFT_TOP",
    findSegmentByCondition(
      (segment, index) =>
        segment === 4 &&
        segments[index] != sidesMappedToSegments.get("RIGHT_TOP")
    )
  );

  sidesMappedToSegments.set(
    "CENTER",
    findSegmentByCondition(
      (segment, index) =>
        segment === 5 &&
        segments[index] != sidesMappedToSegments.get("RIGHT_BOTTOM")
    )
  );

  let outputDigits = "";

  output
    .trim()
    .split(" ")
    .map((digit) => {
      const toFind = [...digit].sort();
      digitSides.forEach((structure, index) => {
        let decrypted = structure
          .map((side) => sidesMappedToSegments.get(side))
          .sort();
        if (toFind.join("") == decrypted.join("")) {
          outputDigits += index.toString();
        }
      });
    });

  return outputDigits;
};
