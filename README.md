# Interactive Quiz Application

## Overview
This is an interactive quiz application that fetches quiz questions from the Open Trivia Database API. The user can answer questions, view their score, and track their progress. Features include a timer, local storage to save high scores, and animations for smooth transitions between questions.

## Features
- Fetches 5 multiple-choice questions from the Open Trivia Database API.
- Timer for each question (30 seconds per question).
- Displays progress bar showing percentage of completion.
- Next and Previous buttons to navigate through questions.
- Displays the final score and percentage after completing the quiz.
- Saves high score in local storage.
- Animations for smooth question transitions.

## Files in the Project
- `index.html`: Contains the HTML structure of the quiz application.
- `styles.css`: Defines the styles for the application, including the layout and animations.
- `script.js`: Contains the JavaScript logic for fetching quiz data, handling user interaction, timer functionality, and saving high scores.

### Running on Live Server (VS Code):
1. Open the project folder in Visual Studio Code.
2. Install the "Live Server" extension from the VS Code marketplace if you don't have it already.
3. Right-click on `index.html` and select "Open with Live Server" to run the quiz application in your browser.

## Local Storage
The high score is saved in the browser's local storage. This allows you to view the highest score across sessions even after the browser is closed.
