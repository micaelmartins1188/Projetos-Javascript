
const secretNumber = document.querySelector('.secret-number');
const message = document.querySelector('.message');
const messageError = document.querySelector('.message-error');
const btnGuess = document.querySelector('.check');
const scoreSpan = document.querySelector('.score');
const playedNumber = document.querySelector('.number-played');
const highscoreSpan = document.querySelector('.highscore');
const btnAgain = document.querySelector('.again');
const number = document.querySelector('#number');

const body = document.querySelector('body');
const header = document.querySelector('.top');

let randomNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

btnGuess.addEventListener('click', function () {
    const guess = Number(number.value);

    if (!guess || guess < 1 || guess > 20) {
        messageError.classList.remove('invisible');
    } else if (guess === randomNumber) {
        if (!(messageError.classList.contains('invisible'))) {
            messageError.classList.add('invisible');
        }
        btnGuess.classList.add('invisible');
        btnAgain.classList.remove('invisible');
        message.textContent = 'Número correto!';
        body.classList.add('win');
        header.classList.add('win');
        secretNumber.textContent = randomNumber;
        playedNumber.textContent = guess;

        if (score > highscore) {
            highscore = score;
            highscoreSpan.textContent = highscore;
        }


    } else if (guess !== randomNumber) {
        if (score > 1) {
            if (!(messageError.classList.contains('invisible'))) {
                messageError.classList.add('invisible');
            }
            message.textContent = guess > randomNumber ? 'Muito alto!' : 'Muito baixo!';
            score--;
            scoreSpan.textContent = score;
            playedNumber.textContent = guess;
            number.value = '';
        } else {
            message.textContent = 'Você perdeu!';
            scoreSpan.textContent = 0;
        }
    }
})


btnAgain.addEventListener('click', function () {
    score = 20;
    randomNumber = Math.trunc(Math.random() * 20) + 1;

    message.textContent = 'Advinhe o número...';
    scoreSpan.textContent = score;
    secretNumber.textContent = '?';
    number.value = '';
    playedNumber.textContent = '';

    body.classList.remove('win');
    header.classList.remove('win');
    btnGuess.classList.remove('invisible');
    btnAgain.classList.add('invisible');
})
