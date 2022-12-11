const input = await Deno.readTextFile("5/input.txt").then((input) =>
  input.split("\r\n")
);

const head = input.slice(0, 9);
const moves = input.slice(10);

const columns = [
  [1, 2],
  [5, 6],
  [9, 10],
  [13, 14],
  [17, 18],
  [21, 22],
  [25, 26],
  [29, 30],
  [33, 34],
];

let stacks: string[][] = [[]];
for (const [start, end] of columns) {
  const column = head
    .map((val) => (val.slice(start, end) !== " " ? val.slice(start, end) : ""))
    .filter((val) => val);
  column.pop();
  column.reverse();

  stacks.push(column);
}
stacks = Object.assign({}, stacks);

const movesParsed = moves.map((move) =>
  move
    .split(/move|from|to/)
    .filter((val) => val)
    .map((val) => parseInt(val))
);

function moveCrates(
  stacks: string[][],
  [quantity, origin, destination]: number[],
  part: number
) {
  switch (part) {
    case 1:
      for (const _ of Array(quantity)) {
        stacks[destination].push(stacks[origin].pop()!);
      }
      break;
    case 2:
      stacks[destination].push(
        ...stacks[origin].slice(
          stacks[origin].length - quantity,
          stacks[origin].length
        )
      );
      for (const _ of Array(quantity)) {
        stacks[origin].pop();
      }
      break;
    default:
      throw new Error("Wrong part number");
  }

  return stacks;
}

function main(
  stacks: string[][],
  movesParsed: number[][],
  moveCrates: (
    stacks: string[][],
    [quantity, origin, destination]: number[],
    part: number
  ) => string[][],
  part: number
) {
  for (const move of movesParsed) {
    stacks = moveCrates(stacks, move, part);
  }

  const result = Object.keys(stacks)
    .map((_, i) => stacks[i].at(-1))
    .join("");
  return result;
}

console.log(
  main(JSON.parse(JSON.stringify(stacks)), movesParsed, moveCrates, 1)
);
console.log(main(stacks, movesParsed, moveCrates, 2));
