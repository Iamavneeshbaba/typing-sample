let timer;
let timeElapsed = 0;
let isTyping = false;
let wordsTyped = 0;
let correctChars = 0;
let totalChars = 0;

const quoteElement = document.getElementById("quote");
const userInput = document.getElementById("user-input");
const timeElement = document.getElementById("time");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const startBtn = document.getElementById("start-btn");

const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "A journey of a thousand miles begins with a single step.",
  "To be or not to be, that is the question.",
  "All that glitters is not gold."
];

function startTest() {
  // Reset values
  isTyping = false;
  timeElapsed = 0;
  wordsTyped = 0;
  correctChars = 0;
  totalChars = 0;

  // Pick a random quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteElement.textContent = randomQuote;

  userInput.value = "";
  userInput.disabled = false;
  userInput.focus();
  
  // Start the timer
  timer = setInterval(updateTime, 1000);
  startBtn.textContent = "Restart Test";
}

function updateTime() {
  if (isTyping) {
    timeElapsed++;
    timeElement.textContent = timeElapsed;
    calculateStats();
  }
}

function checkInput() {
  const quote = quoteElement.textContent;
  const input = userInput.value;

  if (!isTyping && input.length > 0) {
    isTyping = true;
  }

  totalChars = input.length;
  wordsTyped = input.trim().split(" ").length;

  // Check accuracy
  let correct = 0;
  for (let i = 0; i < Math.min(input.length, quote.length); i++) {
    if (input[i] === quote[i]) {
      correct++;
    }
  }
  correctChars = correct;

  calculateStats();
}

function calculateStats() {
  const wpm = Math.floor((wordsTyped / timeElapsed) * 60);
  const accuracy = Math.floor((correctChars / totalChars) * 100);

  wpmElement.textContent = wpm;
  accuracyElement.textContent = accuracy;

  if (userInput.value === quoteElement.textContent) {
    clearInterval(timer);
    alert("Test Complete! You typed the text correctly.");
  }
}
