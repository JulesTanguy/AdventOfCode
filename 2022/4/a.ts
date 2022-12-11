const input = await Deno.readTextFile("4/input.txt");

const lines = input.split("\r\n").map((line) =>
  line.split(",").map((group) => group.split("-").map((val) => parseInt(val)))
);

let i = 0;

lines.forEach(
  (group) => {
    if (contains(group[0], group[1])) {
      i++;
    }
  },
);
console.log(i);

function contains(x: Array<number>, y: Array<number>) {
  const x_start = x[0];
  const x_end = x[1];
  const y_start = y[0];
  const y_end = y[1];

  return ((x_start <= y_start) && (y_end <= x_end)) ||
    ((y_start <= x_start) && (x_end <= y_end));
}
