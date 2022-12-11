const input = await Deno.readTextFile("1/input.txt");

const elfesCal = input.split("\n\n");

const topElfes = [];
for (const elfeCal of elfesCal) {
  const calGroup = elfeCal.split("\n");
  let total = 0;
  calGroup.forEach((value) => total += Number(value));
  topElfes.push(total);
}

console.log(Math.max(...topElfes));
