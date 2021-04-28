  // Unordered list where player's guessed letters will appear:
  const letterList = document.querySelector(".guessed-letters");
  const guessButton = document.querySelector(".guess");
  // Text input for player's guess letter:
  const guessLetter = document.querySelector(".letter");
  const wordInProgress = document.querySelector(".word-in-progress");
  // Message about remaining guesses
  const remainingGuess = document.querySelector(".remaining");
  // Number of remaining guesses
  const guessNumber = document.querySelector(".remaining span");
  const playerMessage = document.querySelector(".message");
  const replayButton = document.querySelector(".play-again");

  const word = "magnolia";

  const guessedLetters = [];

  const addPlaceholders = function(word) {
    const circleArray = [];
    for (let letter of word) {
      circleArray.push("●");
    }
    wordInProgress.innerHTML = circleArray.join("");
  };

  addPlaceholders(word);

  guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    playerMessage.innerText = "";
    const letter = guessLetter.value;
    console.log(letter);
    const validLetter = checkPlayerInput(letter);
    if (validLetter.length > 0) {
      makeGuess(validLetter);
    }
    guessLetter.value = "";
  });

  const checkPlayerInput = function (inputValue) {
    const acceptedLetter = /[a-zA-Z]/;
    // Check for something
    if (inputValue === "") {
      playerMessage.innerText = "Please type a letter into the box.";
    }
    // Check for just one thing
    else if (inputValue.length > 1) {
      playerMessage.innerText = "Just one letter, please!";
    }
    // Check for an actual letter
    else if (!inputValue.match(acceptedLetter)) {
      playerMessage.innerText = "The guess should be a letter.";
    }
    // Input is correct
    else {
      return inputValue;
    }
    return "";
  };

  const makeGuess = function(letter) {
    const uLetter = letter.toUpperCase();
    const letterIndex = guessedLetters.indexOf(uLetter);
    if (letterIndex >= 0) {
      playerMessage.innerText = "That letter was already guessed.";
    }
    else {
      guessedLetters.push(uLetter);
    }
    console.log(guessedLetters);
  }