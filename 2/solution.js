const fs = require("fs");

const input = fs.readFileSync("input.txt", { encoding: "utf8", flag: "r" });

const rounds = input.split(/\n/).map((round) => round.split(" "));

let result = 0;

const moveScores = {
  X: 1, // rock
  Y: 2, // paper
  Z: 3, // scissors
};

const ourMap = {
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

const opponentMap = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

// A is rock
// B is paper
// C is scissors

const calculateResult = (opponentsMove, ourMove) => {
  const opponentsMoveMapped = opponentMap[opponentsMove];
  const ourMoveMapped = ourMap[ourMove];

  if (opponentsMoveMapped === ourMoveMapped) return 3;
  if (opponentsMoveMapped === "rock") {
    if (ourMoveMapped === "paper") {
      return 6;
    }
    if (ourMoveMapped === "scissors") {
      return 0;
    }
  }

  if (opponentsMoveMapped === "paper") {
    if (ourMoveMapped === "rock") {
      return 0;
    }
    if (ourMoveMapped === "scissors") {
      return 6;
    }
  }

  if (opponentsMoveMapped === "scissors") {
    if (ourMoveMapped === "rock") {
      return 6;
    }
    if (ourMoveMapped === "paper") {
      return 0;
    }
  }
};

rounds.forEach((round) => {
  const [opponentsMove, ourMove] = round;
  const moveScore = moveScores[ourMove];
  result += moveScore;

  result += calculateResult(opponentsMove, ourMove);
});

console.info("result", result);

// PART 2

let actualResult = 0;

const resultScores = {
  X: 0, // lose
  Y: 3, // draw
  Z: 6, // win
};

const newMoveMap = {
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissors
};

const getOurPlay = (opponentsMove, intendedResult) => {
  if (resultScores[intendedResult] === 3) {
    return newMoveMap[opponentsMove];
  }
  if (resultScores[intendedResult] === 0) {
    // if lose
    if (opponentsMove === "A") {
      return newMoveMap.C;
    }
    if (opponentsMove === "B") {
      return newMoveMap.A;
    }
    if (opponentsMove === "C") {
      return newMoveMap.B;
    }
  }
  if (resultScores[intendedResult] === 6) {
    // if win
    if (opponentsMove === "A") {
      return newMoveMap.B;
    }
    if (opponentsMove === "B") {
      return newMoveMap.C;
    }
    if (opponentsMove === "C") {
      return newMoveMap.A;
    }
  }
};

rounds.forEach((round) => {
  const [opponentsMove, intendedResult] = round;
  const resultScore = resultScores[intendedResult];
  actualResult += resultScore;

  actualResult += getOurPlay(opponentsMove, intendedResult);
});

console.info("actual result", actualResult);
