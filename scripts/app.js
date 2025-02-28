//Selecting elements from the page (Variables)
const wordDisplay = document.querySelector(".word-display"); 
const guessesText = document.querySelector(".guesses-text b"); 
const keyboardDiv = document.querySelector(".keyboard"); 
const hangmanImage = document.querySelector(".hangman-box img"); 
const gameModal = document.querySelector(".game-modal"); 
const playAgainBtn = gameModal.querySelector("button"); 

//Initializing game variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

//function to reset game
const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src= "../hangman/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`; 
    //create the empty letter slots
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("")
    //enable keyboard buttons
    keyboardDiv.querySelectorAll("buttons").forEach(btn => btn.disabled = false); 
    //Hide the game modal
    gameModal.classList.remove("show"); 
}

//function to get a random word and set up the game
const getRandomWord = () => {
    //picking a random word and hint from your wordList array
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]; 
    //set the current word and update the hint
    currentWord = word;
    document.querySelector(".hint-text b") .innerText = hint;
    //call reset game
    resetGame();
}



//Function to handle the end of game win or lose
const gameOver = (isVistory) => {
    //show the game over modal with win or loss
    const modalText = isVistory ? `You found the word:` : 'The correct word was :';
    // gameModal.querySelector("img").src = `images/${isVistory ? 'victory :"lost" }`.gif'; 
    gameModal.querySelector("h4").innerText = isVistory ? 'Congratulations!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");  
}


//Starting the game with a random word
getRandomWord();


