// Get all the cell elements
const cells = document.querySelectorAll('.cell');
const winningLine = document.getElementById('winning-line');

// Current player (X or O)
let currentPlayer = 'X';

// Game board state
const board = ['', '', '', '', '', '', '', '', ''];

// Winning combinations (indices)
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Add click event listeners to cells
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (board[index] === '' && !checkWinner()) {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add(currentPlayer);

      if (checkWinner()) {
        setTimeout(() => {
          alert(`${currentPlayer} is the winner.`);
          highlightWinningCombination();
        }, 100);
      } else if (board.every(cell => cell !== '')) {
        alert('The match is a draw.');
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  });
});

// Check if there's a winner
function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

// Highlight the winning combination
function highlightWinningCombination() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      cells[a].classList.add('win');
      cells[b].classList.add('win');
      cells[c].classList.add('win');
      break;
    }
  }
}