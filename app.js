const words = ["road", "dog", "fish", "dragon"];
var attempts = 3;
var wordToMatch = [];
var wordGuessed = [];

const wordToBeGuessedEl = document.getElementById("word-to-guess");
const keyBoardEl = document.getElementById("keyboard");
const attemptsRemainingEl = document.getElementById("attempts");
const resetButton = document.getElementById("reset");
const gameMessage = document.getElementById("game-message");


function handleClick(e) {
    if (e.target.tagName !== 'BUTTON') return;
    if (attempts === 0) return;

    const letter = e.target.id;

    if (wordToMatch.includes(letter)) {
        wordToMatch.forEach((char, idx) => {
            if (char === letter) {
                wordGuessed[idx] = letter;
            }
        });
        updateWordsToGuess();
        gameMessage.textContent = "Good guess!";
        gameMessage.style.color = "green";
    } else {
        attempts -= 1;
        attemptsRemainingEl.textContent = attempts;

        gameMessage.textContent = `Oops! "${letter}" is incorrect.`;
        gameMessage.style.color = "red";

        if (attempts === 0) {
            showGameOverMessage();
        }
    }
}


function startGame() {
    attempts = 3;
    attemptsRemainingEl.textContent = attempts;

    var randomIdx = Math.floor(Math.random() * words.length);
    var randomWord = words[randomIdx];
    wordToMatch = randomWord.split("");
    wordGuessed = wordToMatch.map(() => "_");

   
    gameMessage.textContent = "";
    keyBoardEl.style.display = "block";
    resetButton.style.display = "block";


    updateWordsToGuess();
}


function updateWordsToGuess() {
    wordToBeGuessedEl.innerHTML = "";
    wordGuessed.forEach(character => {
        wordToBeGuessedEl.innerHTML += `<span class="letter">${character}</span>`;
    });
    attemptsRemainingEl.textContent = attempts;

    if (!wordGuessed.includes("_")) {
        setTimeout(() => {
            gameMessage.textContent = "Congratulations! You won!";
            gameMessage.style.color = "green";
            gameMessage.style.display = "block";
        }, 500);
    }
}


function showGameOverMessage() {
    gameMessage.textContent = "Game Over! The word was '" + wordToMatch.join("") + "'.";
    gameMessage.style.color = "red";
    gameMessage.style.display = "block";
    keyBoardEl.style.display = "none"; // Hide keyboard
}


keyBoardEl.addEventListener("click", handleClick);
resetButton.addEventListener("click", startGame);


startGame();