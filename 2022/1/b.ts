const input = await Deno.readTextFile("1/input.txt");

const elfesCal = input.split("\n\n");

const elfesList = [];
for (const elfeCal of elfesCal) {
  const calGroup = elfeCal.split("\n");
  let total = 0;
  calGroup.forEach((value) => total += Number(value));
  elfesList.push(total);
}

const sorted = elfesList.sort((a, b) => a - b).reverse();
console.log(sorted[0] + sorted[1] + sorted[2]);
