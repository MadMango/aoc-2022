const fs = require("fs");

const input = fs.readFileSync("input.txt", {
  encoding: "utf8",
  flag: "r",
});

const instructions = input
  .split(/\n/)
  .filter(Boolean)
  .map((instruction) =>
    instruction === "noop"
      ? { cycles: 1 }
      : { cycles: 2, change: instruction.split(" ")[1] }
  );

const registerValuesForEachCycle = [];

let X = 1;
instructions.forEach(({ cycles, change }) => {
  for (i = 0; i < cycles; i += 1) {
    registerValuesForEachCycle.push(X);
  }
  if (change) {
    X += +change;
  }
});

const indexesOfInterest = [20, 60, 100, 140, 180, 220];
const sum = indexesOfInterest
  .map((index) => registerValuesForEachCycle[index - 1] * index)
  .reduce((acc, cv) => acc + cv, 0);

console.info("sum", sum); // 14620

// PART 2

const crtWidth = 40;

const lightUpLastInserted = (crtDisplay) => {
  return (crtDisplay[crtDisplay.length - 1][
    crtDisplay[crtDisplay.length - 1].length - 1
  ] = "█");
};

const crtDisplay = registerValuesForEachCycle.reduce(
  (crt, X) => {
    const updatedCrt = [...crt];
    const currentRowIndex = updatedCrt.length - 1;
    const currentRow = updatedCrt[currentRowIndex];
    const currentColumnIndex = currentRow.length;

    let distance;
    if (currentRow.length < crtWidth) {
      distance = Math.abs(X - currentColumnIndex);
      currentRow.push(" ");
    } else {
      distance = Math.abs(X - 0);
      updatedCrt.push([" "]);
    }

    const shouldLightUp = distance <= 1;
    if (shouldLightUp) {
      lightUpLastInserted(updatedCrt);
    }

    return updatedCrt;
  },
  [[]]
);

crtDisplay.forEach((row) => console.info(row.join("")));
