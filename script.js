let currentQuestionIndex = 0;
let score = 0;
let quizData = [];

// URL for Open Trivia Database API (you can change the category and type as needed)
const apiUrl = "https://opentdb.com/api.php?amount=5&type=multiple";

// Fetch quiz questions from API
async function fetchQuizData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        quizData = data.results;
        loadQuestion();
    } catch (error) {
        console.error("Error fetching quiz data:", error);
    }
}

// Decode HTML entities (like &quot;, &#039;) to their original characters
function decodeHtmlEntities(text) {
    const element = document.createElement('div');
    element.innerHTML = text;
    return element.textContent || element.innerText;
}

function loadQuestion() {
    // Decode the HTML entities in the question and choices
    const currentQuestion = quizData[currentQuestionIndex];
    questionContainer.textContent = decodeHtmlEntities(currentQuestion.question);

    // Clear previous choices
    choicesContainer.innerHTML = "";

    // Decode and display new choices
    currentQuestion.incorrect_answers.push(currentQuestion.correct_answer);
    const choices = shuffleArray(currentQuestion.incorrect_answers);

    choices.forEach((choice, index) => {
        const choiceElement = document.createElement("li");
        choiceElement.textContent = decodeHtmlEntities(choice);  // Decode each choice
        choiceElement.classList.add("choice");
        choiceElement.addEventListener("click", () => handleAnswer(index, choice, currentQuestion.correct_answer));
        choicesContainer.appendChild(choiceElement);
    });

    // Hide/Show the previous and next buttons
    previousButton.style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
    nextButton.style.display = currentQuestionIndex === quizData.length - 1 ? "none" : "inline-block";
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr;
}

function handleAnswer(selectedChoiceIndex, selectedAnswer, correctAnswer) {
    // Disable the choices after one is selected
    const allChoices = document.querySelectorAll(".choice");
    allChoices.forEach(choice => choice.style.pointerEvents = "none");

    // Check if the selected answer is correct and update the score
    if (selectedAnswer === correctAnswer) {
        score++;
    }

    // Highlight the correct and selected answer
    allChoices.forEach((choice, index) => {
        if (choice.textContent === correctAnswer) {
            choice.style.backgroundColor = "#4caf50"; // Green for correct answer
        } else if (choice.textContent === selectedAnswer) {
            choice.style.backgroundColor = "#f44336"; // Red for wrong answer
        }
    });

    // Show the "Next" button
    nextButton.style.display = "inline-block";
}

function nextQuestion() {
    // Check if it's the last question
    if (currentQuestionIndex === quizData.length - 1) {
        showResult(); // If it's the last question, show result instead of loading next question
    } else {
        // Move to the next question
        currentQuestionIndex++;
        loadQuestion();
    }
}

function showResult() {
    // Calculate the percentage score
    const percentage = (score / quizData.length) * 100;

    resultText.textContent = `Your score: ${score} out of ${quizData.length} (${percentage.toFixed(2)}%)`;
    resultContainer.style.display = "block";
    quizContainer.style.display = "none"; // Hide the quiz questions
    nextButton.style.display = "none"; // Hide the next button after finishing the quiz
}

// Initialize the quiz
const questionContainer = document.getElementById("question");
const choicesContainer = document.getElementById("choices");
const nextButton = document.getElementById("next-btn");
const previousButton = document.getElementById("previous-btn");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result");
const quizContainer = document.getElementById("quiz-container");

// Fetch quiz data when the page loads
fetchQuizData();

// Event listener for the "Next" button
nextButton.addEventListener("click", nextQuestion);

// Event listener for the "Previous" button
previousButton.addEventListener("click", () => {
    // Move to the previous question
    currentQuestionIndex--;
    loadQuestion();
});

// Event listener for the "Restart Quiz" button
document.getElementById("restart-btn").addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.style.display = "none";
    quizContainer.style.display = "block"; // Show quiz container again
    fetchQuizData(); // Re-fetch quiz data for a fresh start
});
