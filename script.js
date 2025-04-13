let sequence = [];
let userSequence = [];
let score = 0;
let gameInProgress = false;

const startButton = document.getElementById('start-button');
const gameMessage = document.getElementById('game-message');
const scoreDisplay = document.getElementById('score');

const colors = ['green', 'red', 'yellow', 'blue'];
const colorBtns = {
    green: document.getElementById('green'),
    red: document.getElementById('red'),
    yellow: document.getElementById('yellow'),
    blue: document.getElementById('blue')
};

function startGame() {
    gameInProgress = true;
    score = 0;
    sequence = [];
    userSequence = [];
    scoreDisplay.textContent = score;
    gameMessage.textContent = "Watch the sequence!";
    startButton.style.display = 'none';
    nextRound();
}

function nextRound() {
    userSequence = [];
    score++;
    sequence.push(colors[Math.floor(Math.random() * 4)]);
    displaySequence();
}

function displaySequence() {
    let index = 0;
    const interval = setInterval(() => {
        highlightButton(sequence[index]);
        index++;
        if (index === sequence.length) {
            clearInterval(interval);
            gameMessage.textContent = "Your turn!";
        }
    }, 800);
}

function highlightButton(color) {
    const button = colorBtns[color];
    
    // Temporarily add the 'active' class to make the button blink
    button.classList.add('active');
    
    // Remove the 'active' class after a short delay to make it blink
    setTimeout(() => {
        button.classList.remove('active');
    }, 400);
}

function buttonClicked(color) {
    if (!gameInProgress) return;
    
    userSequence.push(color);
    highlightButton(color);
    checkUserInput();
}

function checkUserInput() {
    const lastIndex = userSequence.length - 1;
    
    if (userSequence[lastIndex] !== sequence[lastIndex]) {
        gameOver();
        return;
    }
    
    if (userSequence.length === sequence.length) {
        setTimeout(() => {
            nextRound();
        }, 1000);
    }
}

function gameOver() {
    gameInProgress = false;
    gameMessage.textContent = `Game Over! You reached score ${score}.`;
    startButton.style.display = 'block';
}
