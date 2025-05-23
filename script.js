let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;

function handleClick(cell, index) {
  if (!gameActive || board[index]) return;

  makeMove(index, currentPlayer);
  updateCell(cell, currentPlayer);

  if (checkGameOver()) return;

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();

  // If bot mode and it's O's turn (bot plays as O)
  if (getMode() === 'bot' && currentPlayer === 'O') {
    setTimeout(botMove, 500); // delay for realism
  }
}

function makeMove(index, player) {
  board[index] = player;
  document.querySelectorAll('.cell')[index].textContent = player;
}

function updateCell(cell, player) {
  cell.textContent = player;
}

function updateStatus() {
  document.getElementById('status').textContent = `Player ${currentPlayer}'s Turn`;
}

function checkGameOver() {
  if (checkWin()) {
    document.getElementById('status').textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return true;
  }
  if (!board.includes(null)) {
    document.getElementById('status').textContent = "It's a Draw!";
    gameActive = false;
    return true;
  }
  return false;
}

function checkWin() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winPatterns.some(([a, b, c]) =>
    board[a] && board[a] === board[b] && board[a] === board[c]
  );
}

function botMove() {
  if (!gameActive) return;

  const emptyIndices = board
    .map((val, idx) => (val === null ? idx : null))
    .filter(i => i !== null);

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  const cell = document.querySelectorAll('.cell')[randomIndex];

  makeMove(randomIndex, currentPlayer);

  if (checkGameOver()) return;

  currentPlayer = 'X';
  updateStatus();
}

function resetGame() {
  board.fill(null);
  gameActive = true;
  currentPlayer = 'X';
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
  updateStatus();
}

function getMode() {
  return document.getElementById('mode').value;
}
