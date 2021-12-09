const fs = require('fs');

const getInput = (source) => {
  const data = fs.readFileSync('./input.txt');
  return data.toString().trim();
};

const checkBoardWin = (board) => {
	// check rows
	for (const row of board) {
		const unmarked = row.filter(num => typeof num !== 'string');
		if (unmarked.length < 1) {
			return true;
		}
	}

	// check columns
	for (let colIndex = 0; colIndex < 5; colIndex++) {
		const column = [];
		for (const row of board) {
			column.push(row[colIndex]);
		}
		const unmarked = column.filter(num => typeof num !== 'string');
		if (unmarked.length < 1) {
			return true;
		}
	}
	return false;
};

const calculateBoardScore = (board, finalNumber) => {
	let scoreTally = 0;
	board.forEach(row => {
		row.forEach(num => {
			if (typeof num !== 'string') {
				scoreTally += num;
			}
		})
	});
	return scoreTally * finalNumber;
};

const data = getInput('./input.txt').split('\n').filter(x => x);
const calledNumbers = data.shift().split(',').map(a => +a);

const boards = [];
let firstBoardScore;
let lastBoardScore;

data.forEach((row, index) => {
	if (index%5 === 0) {
		let board = [];
		for (let i = 0; i < 5; i++) {
			board.push(data[index + i].split(' ').filter(x => x).map(a => +a));
		}
		boards.push(board);
	}
});

for (const call of calledNumbers) {
	// mark all boards
	boards.forEach((board, boardIndex) => {
		board.forEach((row, rowIndex) => {
			row.forEach((num, numIndex) => {
				if (call === num) {
					boards[boardIndex][rowIndex][numIndex] = `${num}X`;
				}
			});
		});
	});

	// check for winning board
	for (const [boardIndex, board] of boards.entries()) {
		const boardWon = checkBoardWin(board);
		if (boardWon) {
			if (!firstBoardScore) {
				firstBoardScore = calculateBoardScore(board, call);
			}
			lastBoardScore = calculateBoardScore(board, call);
			boards.splice(boardIndex, 1);
		}
	}
	if (boards.length < 1) {
		break;
	}
}

console.log('Final score for first board ->', firstBoardScore); // 49686
console.log('Final score for last board ->', lastBoardScore); // 26878
