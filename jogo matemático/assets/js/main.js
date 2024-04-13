'use strict';

// Variables

const choiceDiv = document.querySelector('.choiceDiv');
const number1Div = document.querySelector('.number1');
const number2Div = document.querySelector('.number2');
const operationDiv = document.querySelector('.operation');
const sumBtn = document.querySelector('.sum');
const subBtn = document.querySelector('.sub');
const multBtn = document.querySelector('.mult');
const gameDiv = document.querySelector('.game');
const input = document.querySelector('.input');
const btnConfirm = document.querySelector('.confirm');
const painelAgain = document.querySelector('.painel-again');
const painelEquation = document.querySelector('.painel-equation');
const levelDiv = document.querySelector('.level');
const lifeDiv = document.querySelector('.life');
const timerSpan = document.querySelector('.second');
const scoreDiv = document.querySelector('.score');
const highlightSumDiv = document.querySelector('.highlight-sum');
const highlightSubDiv = document.querySelector('.highlight-sub');
const highlightMultDiv = document.querySelector('.highlight-mult');
const againBtn = document.querySelector('.again');
const choiceBtn = document.querySelector('.choice');


// TIMER

let life = 5;
let timer;
let score = 0;
let highlightSum = 0;
let highlightSub = 0;
let highlightMult = 0;
let mathOperator;

const displayScore = function () {
    scoreDiv.textContent = score;
}

const displayHighlight = function () {
    if (mathOperator === 'sum') {
        highlightSum = score > highlightSum ? score : highlightSum;

        return highlightSumDiv.textContent = highlightSum;
    }

    if (mathOperator === 'sub') {
        highlightSub = score > highlightSub ? score : highlightSub;

        return highlightSubDiv.textContent = highlightSub;
    }

    if (mathOperator === 'mult') {
        highlightMult = score > highlightMult ? score : highlightMult;

        return highlightMultDiv.textContent = highlightMult;
    }
};

const displayTimer = function () {

    const tick = function () {
        const seconds = time % 60;
        timerSpan.textContent = String(seconds).padStart(2, 0);
        lifeDiv.textContent = life;

        if (time === 0) {
            clearInterval(timer);
            life--;

            if (score === 0) {
                setTimeout(() => { displayLevel(), randomNumber() }, 1000)
            }

            if (score > 0) {
                score -= 5;
                setTimeout(() => {
                    displayScore();
                    displayLevel();
                    randomNumber()
                }, 1000)
            }

            if (life > 0) {
                // Fixing the problem of the 1s that is jumping to 10s, the call happens so fast that u can't see the number 0
                setTimeout(() => displayTimer(), 1000);
            }
            else setTimeout(() => gameover(), 1000);

        } else {
            time--;
        }
    }

    let time = 10;
    tick();
    timer = setInterval(tick, 1000);
    return timer;
};

const displayEquation = function (value1, value2) {
    number1Div.textContent = value1;
    number2Div.textContent = value2;
};

const displayLevel = function () {
    if (score < 50) {
        levelDiv.textContent = `level 1`;
        levelDiv.classList.remove('max-level');
        return;
    } else if (score < 100) {
        levelDiv.textContent = `level 2`;
        levelDiv.classList.remove('max-level');
        return;
    } else if (score < 150) {
        levelDiv.textContent = `level 3`;
        levelDiv.classList.remove('max-level');
        return;
    } else if (score < 200) {
        levelDiv.textContent = `level máximo`;
        levelDiv.classList.add('max-level');
        return;
    } else {
        levelDiv.textContent = `level máximo`;
        levelDiv.classList.add('max-level');
        return;
    }
};

const randomNumber = function () {
    if (score < 50) {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;

        return displayEquation(num1, num2);
    } else if (score < 100) {
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 20) + 1;

        return displayEquation(num1, num2);
    } else if (score < 150) {
        const num1 = Math.floor(Math.random() * 50) + 1;
        const num2 = Math.floor(Math.random() * 50) + 1;

        return displayEquation(num1, num2);
    } else if (score < 200) {
        const num1 = Math.floor(Math.random() * 100) + 1;
        const num2 = Math.floor(Math.random() * 100) + 1;

        return displayEquation(num1, num2);
    } else {
        const num1 = Math.floor(Math.random() * 250) + 1;
        const num2 = Math.floor(Math.random() * 250) + 1;

        return displayEquation(num1, num2);
    }

};

const checkAnswer = function (type, value) {
    let answer;
    if (type === 'sum') answer = +number1Div.textContent + +number2Div.textContent;
    if (type === 'sub') answer = +number1Div.textContent - +number2Div.textContent;
    if (type === 'mult') answer = +number1Div.textContent * +number2Div.textContent;

    if (value === answer) {
        input.value = '';
        input.focus();
        score += 5;
        displayLevel();
        randomNumber();

        displayScore();

        if (timer) {
            clearInterval(timer);
            displayTimer();
        }
    }
    else {
        if (score === 0) {
            displayLevel();
            randomNumber();
        }

        if (score > 0) {
            score -= 5;
            displayScore();
            displayLevel();
            randomNumber();
        }

        input.value = '';
        input.focus();
        life--;

        if (life <= 0) {
            gameover();
            return; // To make sure that your code won't keep running
        }

        // Only if the user put the right answer
        if (timer) {
            clearInterval(timer);
            displayTimer();
        }
    }
};

const gameover = function () {
    clearInterval(timer);
    timerSpan.textContent = '00';
    lifeDiv.textContent = 0;
    levelDiv.classList.add('hidden');
    displayHighlight();

    painelEquation.classList.add('hidden');
    painelAgain.classList.remove('hidden');
};

const init = function () {
    life = 5;
    score = 0;

    levelDiv.textContent = `level 1`;
    levelDiv.classList.remove('max-level');
    levelDiv.classList.remove('hidden');
    timerSpan.textContent = '00';
    lifeDiv.textContent = life;
    scoreDiv.textContent = score;
    randomNumber();
    painelEquation.classList.remove('hidden');
    painelAgain.classList.add('hidden');
    input.focus();
    displayTimer();
};

sumBtn.addEventListener('click', function () {
    choiceDiv.classList.add('hidden')
    gameDiv.classList.remove('hidden');
    operationDiv.textContent = '+';
    mathOperator = 'sum';
    init();
});

subBtn.addEventListener('click', function () {
    choiceDiv.classList.add('hidden')
    gameDiv.classList.remove('hidden');
    operationDiv.textContent = '-';
    mathOperator = 'sub';
    init();
});

multBtn.addEventListener('click', function () {
    choiceDiv.classList.add('hidden')
    gameDiv.classList.remove('hidden');
    operationDiv.textContent = 'x';
    mathOperator = 'mult';
    init();
});

document.querySelector('body').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        btnConfirm.click();
    }
});


btnConfirm.addEventListener('click', function () {
    if (life > 0) {
        if (mathOperator === 'sum') {
            const inputNum = input.value;
            if (inputNum !== '') {
                // Timer will reset only if the user put the right answer
                checkAnswer(mathOperator, +inputNum);
            }
        }

        if (mathOperator === 'sub') {
            const inputNum = input.value;
            if (inputNum !== '') {
                // Timer will reset only if the user put the right answer
                checkAnswer(mathOperator, +inputNum);
            }
        }

        if (mathOperator === 'mult') {
            const inputNum = input.value;

            if (inputNum !== '') {
                // Timer will reset only if the user put the right answer
                checkAnswer(mathOperator, +inputNum);
            }
        }
    } else gameover();
});


againBtn.addEventListener('click', function () {
    init();
});

choiceBtn.addEventListener('click', function () {
    gameDiv.classList.add('hidden');
    choiceDiv.classList.remove('hidden');
})