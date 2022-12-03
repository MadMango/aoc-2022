const fs = require("fs");

const input = fs.readFileSync("input.txt", { encoding: "utf8", flag: "r" });

const backpacks = input.split(/\n/);

backpacks.forEach((backpack) => {
  if (backpack.length % 2 === 1) {
    throw new Error(
      "all backpacks should have an even number of items in them"
    );
  }
});

const getIntersection = (...args) => {
  const sets = args.map((arg) => new Set(arg));
  const intersection = new Set(
    [...sets[0]].filter((i) => sets.every((set) => set.has(i)))
  );
  return intersection;
};

const calculatePriority = (letter) => {
  const base = parseInt(letter, 36) - 9;
  if (letter.toUpperCase() === letter) {
    return base + 26;
  } else {
    return base;
  }
};

// PART 1

const backpacksSplitIntoHalves = backpacks.map((backpack) => {
  const backpackLength = backpack.length;
  const firstHalf = backpack.slice(0, backpackLength / 2);
  const secondHalf = backpack.slice(backpackLength / 2);
  return [firstHalf, secondHalf];
});

const overlaps = backpacksSplitIntoHalves.map((backpack) => {
  const [firstHalf, secondHalf] = backpack;
  const overlap = getIntersection(firstHalf, secondHalf);
  return overlap.values().next().value;
});

const prioritiesSum = overlaps.reduce((acc, cv) => {
  return acc + calculatePriority(cv);
}, 0);

console.info("prioritiesSum", prioritiesSum); // 8298

// PART 2

const groupsOfThree = backpacks.reduce(
  (acc, cv) => {
    const returnValue = [...acc];
    const lastEntry = returnValue[returnValue.length - 1];
    if (lastEntry.length === 3) {
      returnValue.push([cv]);
      return returnValue;
    } else {
      lastEntry.push(cv);
      return returnValue;
    }
  },
  [[]]
);

const overlapsInEachGroup = groupsOfThree.map(
  (group) =>
    getIntersection(...group)
      .values()
      .next().value
);

const overlapsPrioritiesSum = overlapsInEachGroup.reduce((acc, cv) => {
  return acc + calculatePriority(cv);
}, 0);

console.info("overlapsPrioritiesSum", overlapsPrioritiesSum); // 2708
