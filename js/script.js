// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters

lettersArray.forEach((letter) => {
  // Create Span & Append Spans To The Letters Container
  lettersContainer.innerHTML += `
   <span class="letter-box">${letter}</span>
  `;
});

// Object Of  Words + Categories

const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "prestige",
    "inception",
    "parasite",
    "interstellar",
    "whiplash",
    "memento",
    "coco",
    "up",
  ],
  people: [
    "albert einstein",
    "hitchcock",
    "alexander",
    "cleopatra",
    "mahatma ghandi",
  ],
  countries: ["syria", "palestine", "yemen", "egypt", "bahrain", "qatar"],
};

// Get Random Property

let allKeys = Object.keys(words);

// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Category Words
let randomPropValues = words[randomPropName];

// Random Number Depend On Words Length
let randomValueNumber = Math.floor(Math.random() * randomPropValues.length);

// The Chosen Word
let randomValueValue = randomPropValues[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depend On Word
lettersAndSpace.forEach((letter) => {
  // Create Empty Span
  let emptySpan = document.createElement("span");

  //   If Letter Is Space
  if (letter === " ") {
    emptySpan.className = "with-space";
  }

  //   Append Span To The Letter Guess Container
  lettersGuessContainer.appendChild(emptySpan);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let thDraw = document.querySelector(".hangman-draw");

// Handel Clicking On Letters
document.addEventListener("click", (e) => {
  // Set The Choose Status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // The Chosen Word
    let wordT = "";
    lettersAndSpace.forEach((wordLetter, index) => {
      // If The Clicked Letter Equal To One Of The Chosen Word Letter
      if (theClickedLetter == wordLetter) {
        // Add The Click Letter In The Span Index
        guessSpans[index].innerHTML = theClickedLetter;

        // Set Status To True
        theStatus = true;
      }
    });

    //  Get The Final Word
    guessSpans.forEach((s) => {
      wordT += s.innerHTML;
    });

    //  Check if The Final Word Is The Same Word
    if (wordT === randomValueValue) {
      success();
    }
    if (theStatus !== true) {
      //  If Letter Is Wrong
      // Increase The Wrong Attempts
      wrongAttempts++;

      // Add Class Wrong On The Draw Element
      thDraw.classList.add(`wrong-${wrongAttempts}`);

      if (wrongAttempts === 8) {
        endGame();

        lettersContainer.classList.add("finished");
      }
    }
  }
});

// End Game Function
function endGame() {
  let layout = document.querySelector(".layout");
  layout.style.top = 0;
  let theCorrectWord = document.querySelector(".layout p span");
  theCorrectWord.innerHTML = `${randomValueValue}`;
  let reloadBtn = document.getElementById("btn");

  reloadBtn.onclick = () => {
    location.reload();
  };
}

function success() {
  let layout = document.querySelector(".layout");
  layout.style.top = 0;

  let h1 = document.querySelector(".layout h1");
  h1.innerHTML = "Congratulations!";
  h1.style.color = `#009688`;

  let theCorrectWord = document.querySelector(".layout p");
  let score = 8 - wrongAttempts;
  theCorrectWord.innerHTML = `score: <span style="color:red;">${score} / 8</span> `;

  let grade = document.querySelector(".grade");
  if (score < 4) {
    grade.innerHTML = `<h3 style="color:red;">Bad</h3>`;
  } else if (score >= 4 && score <= 8) {
    grade.innerHTML = `<h2 style="color:#009688; margin-bottom:10px;">Very Good</h2>`;
  }

  let reloadBtn = document.getElementById("btn");
  reloadBtn.onclick = () => {
    location.reload();
  };
}
