let { readToArray, addPredicate } = require("../santasHelpers");
class BingoCard {
  rows = [];

  addRow = (row) => {
    this.rows.push(
      [...row]
        .map((_, index) =>
          index % 3 === 0 ? parseInt(row.slice(index, index + 3)) : false
        )
        .filter((num) => num !== false)
    );
  };
  hasWon = (numbers) => {
    let hasWon = false;

    [...new Array(this.rows[0].length)].map((_, col) => {
      let column = [];

      this.rows.map((row) => {
        if (this.winningLine(row, numbers)) {
          hasWon = true;
        }
        column.push(row[col]);
      });

      if (this.winningLine(column, numbers)) {
        hasWon = true;
      }
    });

    return hasWon;
  };

  winningLine = (line, numbers) =>
    line.filter((number) => !numbers.includes(number)).length === 0;

  score = (numbers) =>
    this.rows
      .flat()
      .filter((number) => !numbers.includes(number))
      .reduce(addPredicate);
}

(async () => {
  const bingoCardData = await readToArray("bingoCards.txt");
  const bingoBalls = (await readToArray("drawOrder.txt"))[0].split(",");
  const bingoCards = initializeBingoCards(bingoCardData);

  let [quickestWin, slowestWin] = [
    { score: null, drawn: null },
    { score: null, drawn: null },
  ];

  bingoCards.map((card) => {
    let numbers = [];
    let turn = 0;

    while (!card.hasWon(numbers)) {
      numbers.push(drawBall(bingoBalls, turn++));
    }

    let finalScore = {
      drawn: numbers.length,
      score: card.score(numbers) * numbers.pop(),
    };

    quickestWin =
      quickestWin.drawn == null || finalScore.drawn < quickestWin.drawn
        ? finalScore
        : quickestWin;

    slowestWin =
      slowestWin.drawn == null || finalScore.drawn > slowestWin.drawn
        ? finalScore
        : slowestWin;
  });

  console.log(quickestWin, slowestWin);
})();

const initializeBingoCards = (bingoCardData) => {
  let [bingoCards, bingoCard] = [[], new BingoCard()];

  bingoCardData.map((line) => {
    if (line.length != 0) {
      bingoCard.addRow(line);
    } else {
      bingoCards.push(bingoCard);
      bingoCard = new BingoCard();
    }
  });

  bingoCards.push(bingoCard);

  return bingoCards;
};

const drawBall = (bingoBalls, turn) => parseInt(bingoBalls[turn]);
