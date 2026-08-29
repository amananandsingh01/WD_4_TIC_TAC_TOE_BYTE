const cells = document.querySelectorAll(".cell");
const turnMessage = document.getElementById("turnMessage");
const gameStatus = document.getElementById("gameStatus");
const resetButton = document.getElementById("resetButton");

// Game state
let board = ["", "", "", "", "", "", "", "",];
let currentPlayer = "X";
let gameActive = true;

// All possible winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

// Handle a cell click
function handleCellClick(event) {

    const clickedCell = event.target;
    const cellIndex = Number(clickedCell.dataset.index);

    // Ignore clicks if the game is over or cell is already filled
    if (!gameActive || board[cellIndex] !== "") {
        return;
    }

    // Store player's move
    board[cellIndex] = currentPlayer;

    clickedCell.textContent = currentPlayer;
    clickedCell.disabled = true;

    clickedCell.classList.add(
        currentPlayer === "X" ? "x" : "o"
    );

    checkGameResult();
}

// Check whether someone won or game ended in a draw
function checkGameResult() {

    let winningCombination = null;

    for (const combination of winningCombinations) {

        const [a, b, c] = combination;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            winningCombination = combination;
            break;
        }
    }

    // Someone won
    if (winningCombination) {

        gameActive = false;

        winningCombination.forEach(index => {
            cells[index].classList.add("winner");
        });

        turnMessage.textContent = `Player ${currentPlayer} Wins!`;
        gameStatus.textContent = "Congratulations! 🎉";

        disableBoard();

        return;
    }

    // Check for draw
    if (!board.includes("")) {

        gameActive = false;

        turnMessage.textContent = "It's a Draw!";
        gameStatus.textContent = "No more moves available.";

        disableBoard();

        return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    turnMessage.textContent = `Player ${currentPlayer}'s Turn`;
    gameStatus.textContent = `Player ${currentPlayer}, choose an empty cell.`;
}

// Disable all cells after game ends
function disableBoard() {

    cells.forEach(cell => {
        cell.disabled = true;
    });
}

// Reset the complete game
function resetGame() {

    board = ["", "", "", "", "", "", "", "",];

    currentPlayer = "X";
    gameActive = true;

    cells.forEach(cell => {

        cell.textContent = "";

        cell.disabled = false;

        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.classList.remove("winner");
    });

    turnMessage.textContent = "Player X's Turn";
    gameStatus.textContent = "Player X starts the game.";
}

// Add click events to all cells
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

// Reset button
resetButton.addEventListener("click", resetGame);