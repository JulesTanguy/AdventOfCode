const input = await Deno.readTextFile("7/input.txt").then((input) =>
  input.split("\r\n")
);

enum Commands {
  CD,
  LS,
}

class lineData {
  index;
  commandType: Commands;
  value: string | Array<file | dir>;
  constructor(
    index: number,
    commandType: Commands,
    value: string | Array<file | dir>
  ) {
    this.index = index;
    this.commandType = commandType;
    this.value = value;
  }
}

class file {
  name: string;
  size: number;
  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }
}

class dir {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

function filter(input: string[]) {
  return input
    .map((line, i, input) => {
      let userCommand = false;
      let commandType: Commands;
      let value: string | Array<file | dir>;
      if (line.match(/\$/)) {
        userCommand = true;
      }
      if (userCommand) {
        if (line.match(/\$ cd/)) {
          commandType = Commands.CD;
        } else if (line.match(/\$ ls/)) {
          commandType = Commands.LS;
        }
        if (commandType! === Commands.CD) {
          value = line.split(/\$ cd/)[1].slice(1);
        } else if (commandType! === Commands.LS) {
          value = parseOutLines(input.slice(i, input.length));
        }
        return new lineData(i, commandType!, value!);
      } else {
        return;
      }
    })
    .filter((val) => val);
}

function parseOutLines(input: string[]) {
  let userCommand = false;
  let i = 1;
  const result = [];
  while (!userCommand && i !== input.length) {
    if (input[i].match(/\$/)) {
      userCommand = true;
    } else {
      result.push(parseLsOutput(input[i]));
    }
    i++;
  }
  return result;
}

function parseLsOutput(input: string): file | dir {
  const lssplitted = input.split(" ");
  if (lssplitted[0] === "dir") {
    return new dir(lssplitted[1]);
  } else {
    return new file(lssplitted[1], parseInt(lssplitted[0]));
  }
}

console.log(filter(input).length);
