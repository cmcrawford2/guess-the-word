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

  let word = "magnolia";

  const guessedLetters = [];

  let remainingGuesses = 8;

  const getWord = async function () {
    const result = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await result.text();
    const wordArray = data.split("\n");
    const newWordIndex = Math.floor(Math.random() * wordArray.length);
    const randomWord = wordArray[newWordIndex].trim();
    word = randomWord;
    addPlaceholders(randomWord);
  }

  const addPlaceholders = function(word) {
    const circleArray = [];
    for (let letter of word) {
      circleArray.push("●");
    }
    wordInProgress.innerHTML = circleArray.join("");
  };

  getWord();

  guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    playerMessage.innerText = "";
    const letter = guessLetter.value;
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
      updateGuessedLetters();
      countRemainingGuesses(uLetter);
      updateWordInProgress(guessedLetters);
    }
  }

  const updateGuessedLetters = function() {
    letterList.innerHTML = "";
    for (let letter of guessedLetters) {
      let li = document.createElement("li");
      li.innerHTML = letter;
      letterList.append(li);
    }
  }

  const updateWordInProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const newWordInProgress = [];
    for (let letter of wordArray) {
      if (guessedLetters.indexOf(letter) >= 0) {
        newWordInProgress.push(letter);
      }
      else {
        newWordInProgress.push("●");
      }
    }
    wordInProgress.innerHTML = newWordInProgress.join("");
    checkWordInProgress();
  }

  const countRemainingGuesses = function (guess) {
    const uWord = word.toUpperCase();
    const letterArray = uWord.split("");
    if (letterArray.indexOf(guess) >= 0) {
      playerMessage.innerHTML = `${guess} is in the word!`;
    } else {
      playerMessage.innerHTML = `${guess} is NOT in the word.`;
      remainingGuesses -= 1;
    }
    if (remainingGuesses === 0) {
      playerMessage.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
      guessNumber.innerText = "no guesses";
    } else if (remainingGuesses === 1) {
      guessNumber.innerText = `${remainingGuesses} guess`;
    } else {
      guessNumber.innerText = `${remainingGuesses} guesses`;
    }
  }

  const checkWordInProgress = function () {
    const guessed = (word.toUpperCase() === wordInProgress.innerHTML);
    if (guessed === true) {
      playerMessage.classList.add("win");
      playerMessage.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
  }