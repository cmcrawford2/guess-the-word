  // Unordered list where player's guessed letters will appear:
  const guessedLetters = document.querySelector(".guessed-letters");
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
    const letter = guessLetter.value;
    console.log(letter);
    guessLetter.value = "";
  });