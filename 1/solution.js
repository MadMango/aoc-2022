const fs = require("fs");

const input = fs.readFileSync("input.txt", { encoding: "utf8", flag: "r" });
const elves = input.split(/\n\n/).map((elf) => elf.split(/\n/));

const elvesCounted = elves.map((elf) => {
  return elf.reduce((acc, cv) => +acc + +cv, 0);
});

const elvesSorted = elvesCounted.sort((a, b) => b - a);
const elfWithMostCalories = elvesSorted[0];

console.info(elfWithMostCalories); // 68787

const topThreeElves = elvesSorted.slice(0, 3);
const topThreeElvesCalories = topThreeElves.reduce((acc, cv) => acc + cv, 0);

console.info(topThreeElvesCalories); // 198041
