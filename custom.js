// Assigned HTML tags to JS variables
const tic_tac_game = document.getElementById('tic_tac_game');
const boxs = document.getElementsByClassName('box');

// Predict values
const players = ['X', 'O'];
let currentPlayer = players[0];

// Creating Message Element
const endMessage = document.createElement('h2');
endMessage.textContent = `X's turn!`;
endMessage.style.marginTop = '30px';
endMessage.style.textAlign = 'center';
tic_tac_game.after(endMessage);

// Listing Winning Situations
const winning_combinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

// Check for a Win Situation
function checkWin(currentPlayer) {
    for (const [a, b, c] of winning_combinations) {
        if (boxs[a].textContent === currentPlayer &&
            boxs[b].textContent === currentPlayer &&
            boxs[c].textContent === currentPlayer) {
            return true;
        }
    }
    return false;
}

// Check for a Tie Situation
function checkTie() {
    for (const box of boxs) {
        if (box.textContent === '') {
            return false;
        }
    }
    return true;
}

// when a restart button is clicked
function restartBtn() {
    for (const box of boxs) {
        box.textContent = "";
        box.classList.remove('xclass', 'oclass'); // Remove player-specific classes
    }
    endMessage.textContent = `X's turn!`;
    currentPlayer = players[0];
    document.body.classList.remove('gamewin', 'gametie'); // Remove any existing game outcome classes
}

// Loop for boxes
for (const box of boxs) {
    box.addEventListener('click', () => {
        if (box.textContent !== '') {
            return; // Ignore if the box is already filled
        }
        box.textContent = currentPlayer; // Set the current player's symbol
        // Add class based on the current player
        if (currentPlayer === 'X') {
            box.classList.add('xclass');
        } else {
            box.classList.add('oclass');
        }
        if (checkWin(currentPlayer)) {
            endMessage.textContent = `Game over! ${currentPlayer} wins!`;
            document.body.classList.add('gamewin'); // Add class to body
            return;
        }
        if (checkTie()) {
            endMessage.textContent = `Game is tied!`;
            document.body.classList.add('gametie'); // Add class to body
            return;
        }
        // Switch player
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
        endMessage.textContent = `${currentPlayer}'s turn!`;
    });
}
