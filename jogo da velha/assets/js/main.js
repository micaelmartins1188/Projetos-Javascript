'use strict';

//Variables
const square = document.querySelectorAll('.div');
const score0 = document.querySelector('.score--0');
const score1 = document.querySelector('.score--1');
const hash = document.querySelector('.hash');

let playerActive = 0;
let mark = playerActive === 0 ? 'x' : 'o';
let tab = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];
const score = [0, 0];
let sum = 0;
let playing = true;

const changeActivePlayer = function () {
    playerActive = playerActive === 0 ? 1 : 0;
    mark = playerActive === 0 ? 'x' : 'o';
    return playerActive;
};

const playerMove = function (player, position, line, col) {
    if (tab[line][col] === '') {
        tab[line][col] = player;
        square[position].textContent = mark;
        document
    }
};

const displayScore = function (player) {
    score[player] += 1;
    score0.textContent = score[0];
    score1.textContent = score[1];
}

const displayWinner = function (value1, value2, value3) {
    square[value1].classList.add('win');
    square[value2].classList.add('win');
    square[value3].classList.add('win');
    playing = false;

    return true;
};


const checkMove = function () {
    // CHECKING LINES
    if (tab[0][0] === 0 && tab[0][1] === 0 && tab[0][2] === 0) return displayWinner(0, 1, 2);
    if (tab[1][0] === 0 && tab[1][1] === 0 && tab[1][2] === 0) return displayWinner(3, 4, 5);
    if (tab[2][0] === 0 && tab[2][1] === 0 && tab[2][2] === 0) return displayWinner(6, 7, 8);

    if (tab[0][0] === 1 && tab[0][1] === 1 && tab[0][2] === 1) return displayWinner(0, 1, 2);
    if (tab[1][0] === 1 && tab[1][1] === 1 && tab[1][2] === 1) return displayWinner(3, 4, 5);
    if (tab[2][0] === 1 && tab[2][1] === 1 && tab[2][2] === 1) return displayWinner(6, 7, 8);
    /////////////////////////////////////////////////////////////////////////////////////////

    // CHECKING COLUMNS
    if (tab[0][0] === 0 && tab[1][0] === 0 && tab[2][0] === 0) return displayWinner(0, 3, 6);
    if (tab[0][1] === 0 && tab[1][1] === 0 && tab[2][1] === 0) return displayWinner(1, 4, 7);
    if (tab[0][2] === 0 && tab[1][2] === 0 && tab[2][2] === 0) return displayWinner(2, 5, 8);

    if (tab[0][0] === 1 && tab[1][0] === 1 && tab[2][0] === 1) return displayWinner(0, 3, 6);
    if (tab[0][1] === 1 && tab[1][1] === 1 && tab[2][1] === 1) return displayWinner(1, 4, 7);
    if (tab[0][2] === 1 && tab[1][2] === 1 && tab[2][2] === 1) return displayWinner(2, 5, 8);
    /////////////////////////////////////////////////////////////////////////////////////////

    // CHECKING DIAGONALS
    if (tab[0][0] === 0 && tab[1][1] === 0 && tab[2][2] === 0) return displayWinner(0, 4, 8);
    if (tab[0][2] === 0 && tab[1][1] === 0 && tab[2][0] === 0) return displayWinner(2, 4, 6);

    if (tab[0][0] === 1 && tab[1][1] === 1 && tab[2][2] === 1) return displayWinner(0, 4, 8);
    if (tab[0][2] === 1 && tab[1][1] === 1 && tab[2][0] === 1) return displayWinner(2, 4, 6);
}

const checkEverything = function (player, position, line, col) {
    sum += 1;
    playerMove(player, position, line, col);
    if (checkMove()) {
        displayScore(player);
        return setTimeout(() => init(), 3000);
    }
    
    if (sum === 9) {
        if (checkMove()) {
            displayWinner();
            displayScore(player);
            return setTimeout(() => init(), 3000);
        } else {
            hash.classList.remove('hidden');
            return setTimeout(() => init(), 3000);
        }
    } 

    changeActivePlayer();
};

const init = function () {
    playerActive = 0;
    mark = playerActive === 0 ? 'x' : 'o';
    tab = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];
    sum = 0;
    playing = true;
    hash.classList.add('hidden');

    square.forEach(square => {
        square.classList.remove('win');
        square.textContent = '';
    })
};

square.forEach((square, i) => {
    if (square.textContent === '') {
        square.addEventListener('click', function () {
            if (playing) {
                if (i === 0) checkEverything(playerActive, i, 0, 0);
                if (i === 1) checkEverything(playerActive, i, 0, 1); 
                if (i === 2) checkEverything(playerActive, i, 0, 2);
                if (i === 3) checkEverything(playerActive, i, 1, 0);
                if (i === 4) checkEverything(playerActive, i, 1, 1);
                if (i === 5) checkEverything(playerActive, i, 1, 2);
                if (i === 6) checkEverything(playerActive, i, 2, 0);
                if (i === 7) checkEverything(playerActive, i, 2, 1);
                if (i === 8) checkEverything(playerActive, i, 2, 2);
            }
        })
    }
});