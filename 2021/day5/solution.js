const fs = require('fs');

const getInput = (source) => {
  const data = fs.readFileSync('./input.txt');
  return data.toString().trim();
};

const handleVerticalLines = (line) => {
	line.sort((a, b) => a[1] - b[1]);
	let fixedX = line[0][0];
	let y1 = line[0][1];
	let y2 = line[1][1];
	for (let y = y1; y <= y2; y++) {
		recordCoords(fixedX, y, markedCoordsWithoutDiagonals, overlappingCoordsWithoutDiagonals);
		recordCoords(fixedX, y, markedCoordsTotal, overlappingCoordsTotal);
	}
};

const handleHorizontalLines = (line) => {
	line.sort((a, b) => a[0] - b[0]);
	let fixedY = line[0][1];
	let x1 = line[0][0];
	let x2 = line[1][0];
	for (let x = x1; x <= x2; x++) {
		recordCoords(x, fixedY, markedCoordsWithoutDiagonals, overlappingCoordsWithoutDiagonals);
		recordCoords(x, fixedY, markedCoordsTotal, overlappingCoordsTotal);
	}
};

const handleDiagonalLines = (line) => {
	line.sort((a, b) => a[0] - b[0]);
	let x1 = line[0][0];
	let x2 = line[1][0];
	let y1 = line[0][1];
	let y2 = line[1][1];
	let y = y1;;

	for (let x = x1; x <= x2; x++) {
		recordCoords(x, y, markedCoordsTotal, overlappingCoordsTotal);
		if (y1 < y2) {
			y++;
		} else {
			y--;
		}
	}
};


const recordCoords = (x, y, markedCoords, overlappingCoords) => {
	let coords = [x, y];
	if (markedCoords.find(c => c[0] === x && c[1] === y)) {
		if (!overlappingCoords.find(c => c[0] === x && c[1] === y)) {
			overlappingCoords.push(coords);
		}
	} else {
		markedCoords.push(coords);
	}
};


const data = getInput('./input.txt').split('\n').map(line => line.split(' -> ').map(coords => coords.split(',').map(point => +point)));

const markedCoordsWithoutDiagonals = [];
const overlappingCoordsWithoutDiagonals = [];
const markedCoordsTotal = [];
const overlappingCoordsTotal = [];

data.forEach(line => {
	// Fixed point is x
	if (line[0][0] === line[1][0]) {
		handleVerticalLines(line);
	} else if (line[0][1] === line[1][1]) { // Fixed point is y
		handleHorizontalLines(line);
	} else {
		handleDiagonalLines(line);
	}
});


console.log('Part One: Number of points where 2 lines overlap (without diagonals) ->', overlappingCoordsWithoutDiagonals.length); // 6461
console.log('Part Two: Number of points where 2 lines overlap ->', overlappingCoordsTotal.length); // 18065
