// Tic-Tac-Toe Game Logic
const cells = document.querySelectorAll(".cell");
const statusDiv = document.getElementById("status");
const resetButton = document.getElementById("reset-btn");
let currentPlayer = "X";
let gameBoard = Array(9).fill(null); // Tracks the state of the board (null for empty, "X" or "O" for the moves)
let gameOver = false;

// Event listener for each cell
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

// Handle a player's move
function handleCellClick(e) {
    const cellIndex = e.target.getAttribute("data-index");
    
    // Don't allow a cell to be clicked if it's already filled or if the game is over
    if (gameBoard[cellIndex] || gameOver) return;
    
    // Update the board state
    gameBoard[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;

    // Check for a winner or a draw
    if (checkWinner()) {
        gameOver = true;
        statusDiv.textContent = `Player ${currentPlayer} Wins! 🎉`;
    } else if (gameBoard.every(cell => cell !== null)) {
        gameOver = true;
        statusDiv.textContent = "It's a Draw! 🤔";
    } else {
        // Change player
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDiv.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

// Check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Reset the game
resetButton.addEventListener("click", resetGame);

function resetGame() {
    gameBoard = Array(9).fill(null);
    currentPlayer = "X";
    gameOver = false;
    statusDiv.textContent = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => {
        cell.textContent = "";
    });
}
