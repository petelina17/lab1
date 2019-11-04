/**
 * Play background audio when page is loading
 * @type {HTMLElement}
 */
const backsound = document.getElementById("audio-welcome");
window.onload = function () {
    backsound.play();
};

let questionElement;

/**
 * Hide welcome-elements and show question and answer field
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
 * Define is answer correct (expected) or not
 * matching possible right answers to user input.
 * If user did right answer, go to next round depends on the answer.
 * If user won game over with success.
 * If user lost game over with failure.
 * If user did unrecognized answer show alert to try again.
 * @param {Event} event
 */
function checkAnswer(event) {
    if (event !== undefined) {
        if (event.key === 'Enter') {
            // console.log(event);
            console.log(event.target.value);

            // read input field
            let userAnswer = event.target.value;
            userAnswer = userAnswer.toLowerCase();

            console.log('user answer', userAnswer);

            // clean input field
            event.target.value = '';

            for (const [index, rightAnswer] of answers[round].text.entries()) {
                console.log('index, rightAnswer', index, rightAnswer);

                if (userAnswer.includes(rightAnswer)) {
                    round = answers[round].nextRound[index];

                    if (round === 100) {
                        gameOver(true);
                        return
                    }
                    if (round === 200) {
                        gameOver(false);
                        return;
                    }

                    showNextQuestion();
                    return;
                }
            }
            alert('Try harder or die!')
        }
    }
}

/**
 * Switch to success or fail final scene.
 * @param {boolean} win - indicates if user won or not.
 */
function gameOver(win) {
    if (win) {
        goodFinal();
    } else {
        badFinal();
    }
}

/**
 * Activate start to play.
 */
function resetGame() {
    const welcome = document.getElementById('logo');
    welcome.hidden = false;
    const pumpkin = document.getElementById('startBlock');
    pumpkin.hidden = false;

    cleanScreen();
    round = 0;
}

/**
 * Hide question and answer areas.
 */
function cleanScreen() {
    questionElement = document.getElementById('question');
    questionElement.hidden = true;
    document.getElementById('answer').hidden = true;
}

/**
 * Show successful final scene.
 */
function goodFinal() {
    cleanScreen();
    document.getElementById('goodbye').hidden = false;
    document.getElementById('finalScene').hidden = false;
    document.getElementById('finalScene').style.height = '600px';
    document.getElementById('finalScene').classList.add('witch2');
    document.getElementById('goodbye').innerText = 'YOU WON!!!'
}

/**
 *  Show fail final scene.
 */
function badFinal() {
    cleanScreen();
    document.getElementById('goodbye').hidden = false;
    document.getElementById('finalScene').hidden = false;
    document.getElementById('finalScene').style.height = '600px';
    document.getElementById('finalScene').classList.add('witch1');
    document.getElementById('goodbye').innerText = 'YOU LOOSE ...'
}


/**
 * Show question in rounds.
 */
function showNextQuestion() {
    questionElement.innerText = questions[round];
}

/**
 * Text field for user input.
 * @type {HTMLElement}
 */
const answerElement = document.getElementById('answer');

/**
 * Assign function to event when user press a button.
 */
answerElement.addEventListener('keypress', checkAnswer);

/**
 * Global current round of the game.
 * @type {number}
 */
let round = 0;

/**
 *list of questions.
 * @type {string[]}
 */
const questions = [
    'Well hello there... Are you a human?',
    '?!.. what are you doing here, human?...',
    'WTH?... And you want to get out of here alive, right?.. HA-HA-HA',
    'There is the only one way for you to escape: the magic key... go to the cemetery...' +
    ' the key is hidden in a pumpkin or in a hollow of an old tree...maybe... ' +
    'What do you choose: tree or pumpkin?!',
];

/**
 * list of Answers.
 * It might be more than one correct answer.
 * @type {AnswerObject[]}
 * @typedef {{text: [string], nextRound: [number]}} AnswerObject
 */
const answers = [
    {text: ['yes'], nextRound: [1]},
    {text: ['playing','play','not know'], nextRound: [2,2,2]},
    {text: ['yes'], nextRound: [3]},
    {text: ['tree', 'pumpkin'], nextRound: [200, 100]}
];


