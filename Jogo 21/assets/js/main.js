'use strict';
//////////////////////////////////////////////////////////////
// MODAL
const modalElement = document.querySelectorAll('.modal');
const overlayElement = document.querySelectorAll('.overlay');
const btnShowModal = document.querySelectorAll('.show-modal');
const btnCloseModal = document.querySelectorAll('.modal__close');

const displayModal = function (i) {
    modalElement[i].classList.toggle('hidden');
    overlayElement[i].classList.toggle('hidden');
}

btnShowModal.forEach((btn, i) => {
    btn.addEventListener('click', () => displayModal(i));
})

btnCloseModal.forEach((btn, i) => {
    btn.addEventListener('click', () => displayModal(i));
})

overlayElement.forEach((overlay, i) => {
    overlay.addEventListener('click', () => displayModal(i));
})

document.addEventListener('keydown', function (e) {

    if (e.key === 'Escape' || e.key === 'Enter') {
        modalElement.forEach((modal, i) => {
            if (!modal.classList.contains('hidden')) {
                displayModal(i);
                btnShowModal[i].blur();
            }
        })
    }


})
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
//GAME
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const currentScore0Element = document.getElementById('player__current-score--0');
const currentScore1Element = document.getElementById('player__current-score--1');
const score0Element = document.getElementById('player__score-score--0');
const score1Element = document.getElementById('player__score-score--1');
const dice = document.querySelector('.dice');
const panelScore0 = document.querySelector('.panel__score--0');
const panelScore1 = document.querySelector('.panel__score--1');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const scores = [0, 0];

let currentScore, activePlayer, playing;

//CREATING RANDOM DICE
const displayDice = function () {
    const diceNumber = Math.floor(Math.random() * 6) + 1;
    dice.src = `assets/img/dice-${diceNumber}.png`;
    dice.classList.remove('hidden');

    currentScore += diceNumber;
    return diceNumber;
}

//SWITCHING PLAYER
const switchPlayer = function () {
    document.getElementById(`player__score-score--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
}

const removeClassActive = function () {
    player0Element.classList.remove('player--active');
    player1Element.classList.remove('player--active');
}

const displayScore = function () {
    panelScore0.textContent = scores[0];
    panelScore1.textContent = scores[1];
}

const init = function () {
    removeClassActive();

    activePlayer = 0;
    currentScore = 0;
    playing = true;
    btnRoll.disabled = false;
    btnHold.disabled = false;

    currentScore0Element.textContent = 0;
    currentScore1Element.textContent = 0;
    score0Element.textContent = 0;
    score1Element.textContent = 0;

    player0Element.classList.add('player--active');
    player0Element.classList.remove('win');
    player1Element.classList.remove('win');
}
init();


const displayWinner = function () {
    if (activePlayer === 0) {
        if (+score0Element.textContent === 21) {
            document.getElementById(`player__current-score--${activePlayer}`).textContent = currentScore;

            scores[activePlayer] += 1;
            displayScore();

            player0Element.classList.add('win');
            removeClassActive();

            return playing = false;
        } else if (+score0Element.textContent > 21) {
            player1Element.classList.add('win');
            removeClassActive();

            scores[activePlayer + 1] += 1;
            displayScore();

            return playing = false;
        } else {

        }
    } else if (activePlayer === 1) {
        if (+score1Element.textContent === 21) {
            document.getElementById(`player__current-score--${activePlayer}`).textContent = currentScore;

            scores[activePlayer] += 1;
            displayScore();

            player1Element.classList.add('win');
            removeClassActive();

            return playing = false;
        } else if (+score1Element.textContent > 21) {
            player0Element.classList.add('win');
            removeClassActive();

            scores[activePlayer - 1] += 1;
            displayScore();

            return playing = false;
        }
    }
}

const removeFocus = function() {
    btnNew.blur();
    btnRoll.blur();
    btnHold.blur();
}
//////////////////////////////////////////////////////////////
//PLAY BUTTON
btnRoll.addEventListener('click', function () {
    if (playing) {
        displayDice();

        document.getElementById(`player__score-score--${activePlayer}`).textContent = currentScore;

        displayWinner();
    } else {
        btnRoll.disabled = true;
        btnHold.disabled = true;
    }
})
//////////////////////////////////////////////////////////////
//PLAY BUTTON WITH KEYBOARD
document.addEventListener('keydown', function (e) {
    removeFocus();
    if ((playing && e.key.toLowerCase() === 'd') || (playing && e.key === 'ArrowRight')) {
        displayDice();

        document.getElementById(`player__score-score--${activePlayer}`).textContent = currentScore;

        displayWinner();
    }
})
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
//HOLD BUTTON
btnHold.addEventListener('click', function () {
    if (playing) {
        if (activePlayer === 0) {
            document.getElementById(`player__current-score--${activePlayer}`).textContent = currentScore;
            document.getElementById(`player__score-score--${activePlayer}`).textContent = 0;

            switchPlayer();
            return;
        }

        if (activePlayer === 1) {
            document.getElementById(`player__current-score--${activePlayer}`).textContent = currentScore;
            document.getElementById(`player__score-score--${activePlayer}`).textContent = 0;

            if (+currentScore0Element.textContent > +currentScore1Element.textContent) {
                player0Element.classList.add('win');
                removeClassActive();

                scores[activePlayer - 1] += 1;
                displayScore();

                return playing = false;
            } else if (+currentScore0Element.textContent < +currentScore1Element.textContent) {
                player1Element.classList.add('win');
                removeClassActive();

                scores[activePlayer] += 1;
                displayScore();

                return playing = false;
            } else {
                player0Element.classList.add('win');
                player1Element.classList.add('win');
                removeClassActive();

                return playing = false;
            }

        }
    } else {
        btnRoll.disabled = true;
        btnHold.disabled = true;
    }
})
//////////////////////////////////////////////////////////////
//HOLD BUTTON WITH KEYBOARD
document.addEventListener('keydown', function (e) {
    if ((playing && e.key.toLocaleLowerCase() === 's') || (playing && e.key === 'ArrowLeft')) {
        if (activePlayer === 0) {
            document.getElementById(`player__current-score--${activePlayer}`).textContent = currentScore;
            document.getElementById(`player__score-score--${activePlayer}`).textContent = 0;

            switchPlayer();
            return;
        }

        if (activePlayer === 1) {
            document.getElementById(`player__current-score--${activePlayer}`).textContent = currentScore;
            document.getElementById(`player__score-score--${activePlayer}`).textContent = 0;

            if (+currentScore0Element.textContent > +currentScore1Element.textContent) {
                player0Element.classList.add('win');
                removeClassActive();

                scores[activePlayer - 1] += 1;
                displayScore();

                return playing = false;
            } else if (+currentScore0Element.textContent < +currentScore1Element.textContent) {
                player1Element.classList.add('win');
                removeClassActive();

                scores[activePlayer] += 1;
                displayScore();

                return playing = false;
            } else {
                player0Element.classList.add('win');
                player1Element.classList.add('win');
                removeClassActive();

                return playing = false;
            }

        }
    }
})


//////////////////////////////////////////////////////////////
//NEW GAME
btnNew.addEventListener('click', function () {
    init();
})
//////////////////////////////////////////////////////////////
//NEW GAME WITH KEYBOARD
document.addEventListener('keydown', function (e) {
    if (e.key.toLocaleLowerCase() === 'r') init();
})


//////////////////////////////////////////////////////////////
// CHANGING THEME
const btnTheme = document.querySelector('.theme');
const players = document.querySelectorAll('.player');
const panel = document.querySelector('.panel');
const playerScoreElement = document.querySelectorAll('.player__score');
const playerActiveModifier = document.querySelector('.player--active');
let activeTheme = true;

const changeTheme = function () {
    players.forEach(element => element.classList.toggle('theme--player'));

    panel.classList.toggle('theme--panel');
    playerScoreElement.forEach(score => score.classList.toggle('theme--score'));
}

btnTheme.addEventListener('click', changeTheme);
document.addEventListener('keydown', e => {
    if (e.key === 't' || e.key === 'T') changeTheme();
});
//////////////////////////////////////////////////////////////
