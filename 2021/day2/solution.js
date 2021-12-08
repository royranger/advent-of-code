const fs = require('fs');

const getInput = (source) => {
  const data = fs.readFileSync('./input.txt');
  return data.toString().trim();
};

const data = getInput('./input.txt');

const commands = data.split('\n').map(c => {
	const match = c.replace(' ', '').match(/^(\w\D+)(\d+)$/);
	return [match[1], +match[2]];
});

let horPos = 0;
let depth = 0;

commands.forEach((c) => {
  if (c[0] === 'forward') {
    horPos += c[1];
  }
  if (c[0] === 'down') {
    depth += c[1];
  }
  if (c[0] === 'up') {
    depth -= c[1];
  }
});

console.log('Part One ->', horPos * depth); // 1804520

horPos = 0;
depth = 0;
let aim = 0;

commands.forEach((c) => {
  if (c[0] === 'forward') {
    horPos += c[1];
    depth += (aim * c[1]);
  }
  if (c[0] === 'down') {
    aim += c[1];
  }
  if (c[0] === 'up') {
    aim -= c[1];
  }
});

console.log('Part Two ->', horPos * depth); // 1971095320
