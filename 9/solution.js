const fs = require("fs");

const input = fs.readFileSync("input.txt", {
  encoding: "utf8",
  flag: "r",
});

const moves = input.split(/\n/);

const directionMap = {
  L: "left",
  R: "right",
  U: "up",
  D: "down",
};

const isTouching = (H, T) => {
  const distanceX = Math.abs(H.x - T.x);
  const distanceY = Math.abs(H.y - T.y);

  return distanceX <= 1 && distanceY <= 1;
};

const moveHead = (H, direction) => {
  // move head
  if (direction === "up") {
    H.y += 1;
  } else if (direction === "down") {
    H.y -= 1;
  } else if (direction === "left") {
    H.x -= 1;
  } else if (direction === "right") {
    H.x += 1;
  }
};

const moveTail = (H, T) => {
  const headIsOnTheLeft = H.x < T.x;
  const headIsOnTheRight = H.x > T.x;
  const headIsUp = H.y > T.y;
  const headIsDown = H.y < T.y;
  if (H.x !== T.x && H.y !== T.y) {
    // move diagonally
    const distanceX = Math.abs(H.x - T.x);
    const distanceY = Math.abs(H.y - T.y);
    if (distanceX > 1 || distanceY > 1) {
      if (headIsOnTheLeft) {
        T.x -= 1;
      }
      if (headIsOnTheRight) {
        T.x += 1;
      }
      if (headIsUp) {
        T.y += 1;
      }
      if (headIsDown) {
        T.y -= 1;
      }
    }
  } else if (H.x === T.x) {
    // move vertically
    const distance = Math.abs(H.y - T.y);
    if (distance > 1) {
      if (headIsUp) {
        T.y += 1;
      } else if (headIsDown) {
        T.y -= 1;
      }
    }
  } else if (H.y === T.y) {
    // move horizontally
    const distance = Math.abs(H.x - T.x);
    if (distance > 1) {
      if (headIsOnTheRight) {
        T.x += 1;
      } else if (headIsOnTheLeft) {
        T.x -= 1;
      }
    }
  }
};

const addTailLoc = (T, locations) => {
  const xSign = Math.sign(T.x) === -1 ? "-" : "";
  const xVal = Math.abs(T.x).toString();
  const ySign = Math.sign(T.y) === -1 ? "-" : "";
  const yVal = Math.abs(T.y).toString();
  const tailLoc = `${xSign}${xVal} ${ySign}${yVal}`;
  locations.add(tailLoc);
};

const countUniqueTailLocations = (moves, howManyKnots) => {
  const uniqueTailLocations = new Set();
  const knots = [];
  for (i = 0; i < howManyKnots; i += 1) {
    knots.push({ x: 0, y: 0 });
  }

  moves.forEach((move) => {
    const split = move.split(" ");
    const direction = directionMap[split[0]];
    const distance = +split[1];

    [...new Array(distance)].forEach(() => {
      knots.forEach((knot, index) => {
        if (index === 0) {
          moveHead(knot, direction);
        } else {
          const H = knots[index - 1];
          const T = knot;
          if (!isTouching(H, T)) {
            moveTail(H, T);
          }

          if (index === knots.length - 1) {
            addTailLoc(T, uniqueTailLocations);
          }
        }
      });
    });
  });

  return uniqueTailLocations.size;
};

console.info(countUniqueTailLocations(moves, 2)); // 6406
console.info(countUniqueTailLocations(moves, 10)); // 2643
