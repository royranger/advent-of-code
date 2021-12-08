const fs = require('fs');

const getInput = (source) => {
  const data = fs.readFileSync('./input.txt');
  return data.toString().trim();
};

const findIncreases = (array) => {
  const increases = array.filter((item, index) => index !== 0 && item > array[index - 1]);
  return increases.length;
};

const data = getInput('./input.txt');

const measurements = data.split('\n').map(m => +m);

const increases = findIncreases(measurements);

console.log('Number of measurements larger than previous measurement ->', increases); // 1215

const windows = measurements.map((m, index) => {
  if (index > measurements.length - 2) return null;
  return (m + measurements[index + 1] + measurements[index + 2]);
}).filter(x => x);

const increasesWindowSums = findIncreases(windows);

console.log('Sums larger than previous sum ->', increasesWindowSums); // 1150
