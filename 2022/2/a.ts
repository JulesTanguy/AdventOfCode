const input = await Deno.readTextFile("2/input.txt");

const matches = input.split("\r\n");

// part 1
const points = {
  "A X": 4,
  "A Y": 8,
  "A Z": 3,
  "B X": 1,
  "B Y": 5,
  "B Z": 9,
  "C X": 7,
  "C Y": 2,
  "C Z": 6,
};
console.log(
  `My score is ${matches.reduce((total, round) => total + points[round], 0)}.`,
);

// part 2
const points2 = {
  "A X": 0 + 3,
  "A Y": 3 + 1,
  "A Z": 6 + 2,
  "B X": 0 + 1,
  "B Y": 3 + 2,
  "B Z": 6 + 3,
  "C X": 0 + 2,
  "C Y": 3 + 3,
  "C Z": 6 + 1,
};
const scores = matches.map((round) => points2[round]);
console.log(
  `My score is ${scores.reduce((total, score) => total + score, 0)}.`,
);
