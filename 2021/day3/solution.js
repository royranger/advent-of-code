const fs = require('fs');

const getInput = (source) => {
  const data = fs.readFileSync('./input.txt');
  return data.toString().trim();
};

const getMoreCommon = (data, i) => {
  let numOnes = 0;
  let numZeros = 0;
  data.forEach(num => {
    if (num[i] === '1') {
      numOnes++;
    } else {
      numZeros++;
    }
  });

  if (numOnes > numZeros) {
    return 'one';
  } else if (numZeros > numOnes) {
    return 'zero';
  } else {
    return 'equal';
  }
};

const flip = (zeroOrOne) => {
  return 1 - (+zeroOrOne);
};

const data = getInput('./input.txt').split('\n');
const numLength = data[0].length;
let gamma = '';

for (let i = 0; i < numLength; i++) {
  const moreCommon = getMoreCommon(data, i);

  if (moreCommon === 'one') {
    gamma += '1';
  } else {
    gamma += '0'
  }
}

const epsilon = new Array(numLength).fill(1).map((num, i) => flip(gamma[i])).join('');
const gammaDec = parseInt(gamma, 2);
const epsilonDec = parseInt(epsilon, 2);

console.log('Power consumption ->', gammaDec * epsilonDec); // 1092896

let oxygenData = data;
let co2Data = data;


for (let i = 0; i < numLength; i++) {

  if (oxygenData.length > 1) {
    const oxygenDataMoreCommon = getMoreCommon(oxygenData, i);
    if (oxygenDataMoreCommon === 'zero') {
      oxygenData = oxygenData.filter(num => num[i] === '0');
    } else if (oxygenDataMoreCommon === 'one' || oxygenDataMoreCommon === 'equal') {
      oxygenData = oxygenData.filter(num => num[i] === '1');
    }
  }

  if (co2Data.length > 1) {
    const co2DataMoreCommon = getMoreCommon(co2Data, i);
    if (co2DataMoreCommon === 'zero') {
      co2Data = co2Data.filter(num => num[i] === '1');
    } else if (co2DataMoreCommon === 'one' || co2DataMoreCommon === 'equal') {
      co2Data = co2Data.filter(num => num[i] === '0');
    }
  }

  if (oxygenData.length < 2 && co2Data.length < 2) {
    break;
  }
}

const oxygenDec = parseInt(oxygenData[0], 2);
const co2Dec = parseInt(co2Data[0], 2);

console.log('Life support rating ->', oxygenDec * co2Dec); // 4672151
