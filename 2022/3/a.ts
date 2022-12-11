const input = await Deno.readTextFile("3/input.txt");

const lines = input.split("\r\n");

const halfs = lines.map((str) => {
  const left = str.substring(0, str.length / 2);
  const right = str.substring(str.length / 2, str.length);
  return { left, right };
});

let totalPriority = 0;
halfs.forEach(
  ({ left, right }) => {
    totalPriority += priority(itemType(left, right));
  },
);

console.log("Part 1: " + totalPriority);

totalPriority = 0;
const elfesGroups = groupArr(lines, 3);
elfesGroups.forEach((elfesGroup) => {
  const commonItem = [...elfesGroup[0]].filter((char) =>
    elfesGroup[1].includes(char) && elfesGroup[2].includes(char)
  )[0];
  totalPriority += priority(commonItem);
});
console.log("Part 2: " + totalPriority);

function groupArr(data: string[], n: number) {
  const group: string[][] = [];
  for (let i = 0, j = 0; i < data.length; i++) {
    if (i >= n && i % n === 0) {
      j++;
    }
    group[j] = group[j] || [];
    group[j].push(data[i]);
  }
  return group;
}

function priority(char: string) {
  if (char.length !== 1) {
    throw new Error("priority() can only threat one character");
  }

  const code = char.toUpperCase().charCodeAt(0);
  if (code > 64 && code < 91 && char.toUpperCase() === char) {
    return (code - 38);
  }
  if (code > 64 && code < 91) return (code - 64);

  throw new Error(char + " is not an alphabet character");
}

function itemType(a: string, b: string): string {
  if (b.length < a.length) {
    return itemType(b, a);
  }

  for (let i = 0, len = a.length; i < len; i++) {
    if (b.indexOf(a[i]) != -1) {
      return a[i];
    }
  }

  return "";
}
