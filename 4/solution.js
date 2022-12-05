const fs = require("fs");

const input = fs.readFileSync("input.txt", {
  encoding: "utf8",
  flag: "r",
});
const pairs = input.split(/\n/);

function isBetween(x, min, max) {
  return x >= min && x <= max;
}

const containedFully = pairs.filter((pair) => {
  const [left, right] = pair.split(",");
  const [leftMin, leftMax] = left.split("-").map(Number);
  const [rightMin, rightMax] = right.split("-").map(Number);

  const leftMinFits = isBetween(leftMin, rightMin, rightMax);
  const leftMaxFits = isBetween(leftMax, rightMin, rightMax);

  const rightMinFits = isBetween(rightMin, leftMin, leftMax);
  const rightMaxFits = isBetween(rightMax, leftMin, leftMax);

  const leftFits = leftMinFits && leftMaxFits;
  const rightFits = rightMinFits && rightMaxFits;

  return leftFits || rightFits;
});

console.info(containedFully.length); // 441

// PART 2

const overlaps = pairs.filter((pair) => {
  const [left, right] = pair.split(",");
  const [leftMin, leftMax] = left.split("-").map(Number);
  const [rightMin, rightMax] = right.split("-").map(Number);

  const leftOverlap =
    isBetween(leftMin, rightMin, rightMax) ||
    isBetween(leftMax, rightMin, rightMax);

  const rightOverlap =
    isBetween(rightMin, leftMin, leftMax) ||
    isBetween(rightMax, leftMin, leftMax);

  return leftOverlap || rightOverlap;
});

console.info(overlaps.length);
