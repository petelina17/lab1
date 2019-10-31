/**
 *
 * @type {HTMLElement}
 */
const backsound = document.getElementById("audio-welcome");
window.onload = function () {
    backsound.play();

};

/**
 *
 */
let questionElement;

/**
 *
 */
function beginGame() {
    const welcome = document.getElementById('logo');
    welcome.hidden = true;
    const pumpkin = document.getElementById('startBlock');
    pumpkin.hidden = true;

    questionElement = document.getElementById('question');
    questionElement.hidden = false;

    document.getElementById('answer').hidden = false;
    showNextQuestion();
}

/**
 *
 * @param event
 */
function checkAnswer(event) {
    if (event !== undefined) {
        if (event.key === 'Enter') {
            // console.log(event);
            console.log(event.target.value);

            // read input field
            let userAnswer = event.target.value;
            userAnswer = userAnswer.toLowerCase();

            // clean input field
            event.target.value = '';

            const rightAnswer = answers[round];

            if (userAnswer.includes(rightAnswer)) {
                round = round + 1;
                if (round >= questions.length) {
                    gameOver();
                    return
                }
                showNextQuestion();
            } else {
                alert('Try harder!')
            }
        }
    }
}

/**
 *
 */
function gameOver() {
    alert('YOU WON!!! GAME OVER!');
    const welcome = document.getElementById('logo');
    welcome.hidden = false;
    const pumpkin = document.getElementById('startBlock');
    pumpkin.hidden = false;

    questionElement = document.getElementById('question');
    questionElement.hidden = true;

    document.getElementById('answer').hidden = true;
    round = 0;
}

/**
 *
 */
function showNextQuestion() {
    questionElement.innerText = questions[round];
}

/**
 *
 * @type {HTMLElement}
 */
const answerElement = document.getElementById('answer');
answerElement.addEventListener('keypress', checkAnswer);

let round = 0;

/**
 *
 * @type {*[]}
 */
const questions = [
    '1. What is your name?',
    '2. Where are you from?',
    '3. How old are you?'
];

/**
 *
 * @type {*[]}
 */
const answers = [
    'natalia',
    'petersburg',
    '46'
];

// var visitor = prompt("Well hello there...What's your name?");
// var message = 'Well, well, do you want to get out of here alive?, visitor';
// document.write(massage);
