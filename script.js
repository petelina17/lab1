/**
 *Play background audio when page is loading
 * @type {HTMLElement}
 */
const backsound = document.getElementById("audio-welcome");
window.onload = function () {
    backsound.play();
};

let questionElement;

/**
 * Hide welcome-elements and show question
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
 * Defines is answer correct (expected) or not
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
 * Return to the beginning of the game
 * @param {boolean} win
 */
function gameOver(win) {
    if (win) {
        // alert('YOU WERE LUCKY... THIS TIME!!! GAME OVER!');
        goodFinal();
    } else {
        // alert('YOU LOOSE... GAME OVER!!!');
        badFinal();
    }
    // resetGame();
}

function resetGame() {
    const welcome = document.getElementById('logo');
    welcome.hidden = false;
    const pumpkin = document.getElementById('startBlock');
    pumpkin.hidden = false;

    cleanScreen();
    round = 0;
}

function cleanScreen() {
    questionElement = document.getElementById('question');
    questionElement.hidden = true;
    document.getElementById('answer').hidden = true;
}

function goodFinal() {
    cleanScreen();
    document.getElementById('goodbye').hidden = false;
    document.getElementById('finalScene').hidden = false;
    document.getElementById('finalScene').style.height = '600px';
    document.getElementById('finalScene').classList.add('witch2');
    document.getElementById('goodbye').innerText = 'YOU WON!!!'
}


function badFinal() {
    cleanScreen();
    document.getElementById('goodbye').hidden = false;
    document.getElementById('finalScene').hidden = false;
    document.getElementById('finalScene').style.height = '600px';
    document.getElementById('finalScene').classList.add('witch1');
    document.getElementById('goodbye').innerText = 'YOU LOOSE ...'
}


/**
 * Show question in rounds
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
 *list of questions
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
 * list of Answers
 * @type {AnswerObject[]}
 * @typedef {{text: [string], nextRound: [number]}} AnswerObject
 */
const answers = [
    {text: ['yes'], nextRound: [1]},
    {text: ['playing','play','not know'], nextRound: [2,2,2]},
    {text: ['yes'], nextRound: [3]},
    {text: ['tree', 'pumpkin'], nextRound: [200, 100]}
];


