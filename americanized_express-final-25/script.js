const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Coding is like humor. If you have to explain it, it’s bad.",
    "Debugging is like being the detective in a crime movie.",
    "Simplicity is the soul of efficiency.",
    "The only way to learn a new programming language is by writing programs in it.",
    "Practice makes perfect.",
    "Typing speed improves with consistent practice.",
    "Focus on accuracy before speed.",
    "Errors help you learn and grow.",
    "Success is the sum of small efforts repeated daily.",
    "Speed is irrelevant if you are going in the wrong direction.",
    "Every great developer starts as a beginner.",
    "Keep calm and keep coding.",
    "Hard work beats talent when talent doesn’t work hard.",
    "Programming is not about typing, it’s about thinking.",
    "Learn from your mistakes and move forward.",
    "The best way to predict the future is to create it.",
    "Believe you can and you’re halfway there.",
    "Your limitation—it’s only your imagination.",
    "Dream it. Wish it. Do it.",
    "Do something today that your future self will thank you for.",
    "Opportunities don’t happen. You create them.",
    "Don’t stop until you’re proud.",
    "Push yourself, because no one else is going to do it for you.",
    "Coding is a journey, not a destination.",
    "Fail fast, learn faster.",
    "Trust the process.",
    "Always be improving.",
    "Great things take time.",
    "If you want it, work for it.",
    "Your time is limited, don’t waste it.",
    "Wake up with determination, go to bed with satisfaction.",
    "Dream big, start small, act now.",
    "Take risks, make mistakes, learn fast.",
    "Strive for progress, not perfection.",
    "Consistency is key.",
    "Challenge yourself daily.",
    "Be stronger than your excuses.",
    "Do what you love, love what you do.",
    "Mistakes are proof that you are trying.",
    "Little progress each day adds up to big results.",
    "Work hard in silence, let success make the noise.",
    "Make it happen.",
    "Nothing worth having comes easy.",
    "Difficult roads often lead to beautiful destinations.",
    "Hustle in silence and let your success be the noise.",
    "Quality over quantity.",
    "Don’t watch the clock, do what it does—keep going.",
    "Perseverance is not a long race, it is many short races.",
    "Strength grows in the moments you think you can’t go on.",
    "Stay patient and trust your journey.",
    "Every expert was once a beginner.",
    "Set goals. Crush them. Repeat.",
    "Go the extra mile, it’s never crowded.",
    "The key to success is to focus on goals, not obstacles.",
    "Do more of what makes you happy.",
    "Invest in yourself. It pays the best interest.",
    "Success doesn’t come from what you do occasionally, it comes from what you do consistently."
];

let currentQuote = "";
let userInput = "";
let startTime = null;
let mistakes = 0;
let timer;
let timeLeft = 30;

const quoteElement = document.getElementById("quote");
const typedTextElement = document.getElementById("typed-text");
const inputElement = document.getElementById("input");
const wpmElement = document.getElementById("wpm");
const timeElement = document.getElementById("time");
const mistakesElement = document.getElementById("mistakes");

function startTest() {
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.innerText = currentQuote;
    typedTextElement.innerText = "";
    userInput = "";
    inputElement.value = "";
    inputElement.focus();
    mistakes = 0;
    timeLeft = 30;
    startTime = new Date();
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    timeElement.innerText = `Time: ${timeLeft}s`;

    if (timeLeft <= 0) {
        clearInterval(timer);
        endTest();
    }
}

inputElement.addEventListener("input", function (event) {
    if (!startTime) {
        startTime = new Date();
        timer = setInterval(updateTimer, 1000);
    }

    userInput = inputElement.value;
    typedTextElement.innerText = userInput;

    let correctText = currentQuote.substring(0, userInput.length);
    if (userInput !== correctText) {
        mistakes++;
    }

    mistakesElement.innerText = `Mistakes: ${mistakes}`;
    calculateWPM();
});

function calculateWPM() {
    let elapsedTime = (new Date() - startTime) / 1000 / 60; // Convert ms to minutes
    let wordsTyped = userInput.split(" ").length;
    let wpm = Math.round(wordsTyped / elapsedTime);
    wpmElement.innerText = `WPM: ${isNaN(wpm) || wpm < 0 ? 0 : wpm}`;
}

function endTest() {
    inputElement.disabled = true;
    let finalWPM = wpmElement.innerText;
    alert(`Test finished! Your ${finalWPM} with ${mistakes} mistakes.`);
}

// Start typing test on page load
window.onload = startTest;
