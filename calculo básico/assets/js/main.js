"use strict";

// VARIABLES
const btns = document.querySelectorAll('.btn');
const opr = document.querySelectorAll('.opr');
const add = document.querySelector('#add');
const sub = document.querySelector('#sub');
const div = document.querySelector('#div');
const mult = document.querySelector('#mult');
const spanVl1 = document.querySelector('#value1');
const spanVl2 = document.querySelector('#value2');
const inputVl1 = document.querySelector('#input1');
const inputVl2 = document.querySelector('#input2');
const result = document.querySelector('#result');
const calc = document.querySelector('#calc');
const clean = document.querySelector('#clean');
const resultBox = document.querySelector('.box-result');
const msgError = document.querySelector('.box-error');


// FUNCTIONS
const addCalc = (a,b) => a + b;
const subCalc = (a,b) => a - b;
const divCalc = function(a, b) {
    if((a == 0) || (b == 0)) return 0;


    return a / b;
};
const multCalc = (a,b) => a * b;
const btnToggle = function() {
    calc.classList.toggle('inv');
    clean.classList.toggle('inv');
};


// CHANGING OPERATORS
add.addEventListener("click", function() {
    opr[0].textContent = "+";
    opr[1].textContent = "+";
})

sub.addEventListener("click", function() {
    opr[0].textContent = "-";
    opr[1].textContent = "-";
})

div.addEventListener("click", function() {
    opr[0].textContent = "/";
    opr[1].textContent = "/";
})

mult.addEventListener("click", function() {
    opr[0].textContent = "x";
    opr[1].textContent = "x";
})

// BTN CALC
calc.addEventListener('click', function() {
    if(opr[0].textContent === '+') {
        if(inputVl1.value != "" && inputVl2.value != "") {
            msgError.classList.add('inv');
            resultBox.classList.remove('inv');
            spanVl1.textContent = inputVl1.value;
            spanVl2.textContent = inputVl2.value;
            result.textContent = addCalc(Number(inputVl1.value), Number(inputVl2.value));

            for(let j = 0; j < 4; j++) {
                btns[j].setAttribute('disabled', 'disabled');
            }

            btnToggle();
        } else {
            msgError.classList.remove('inv');
        }
    } else if(opr[0].textContent === '-') {
        if(inputVl1.value != "" && inputVl2.value != "") {
            msgError.classList.add('inv');
            resultBox.classList.remove('inv');
            spanVl1.textContent = inputVl1.value;
            spanVl2.textContent = inputVl2.value;
            result.textContent = subCalc(Number(inputVl1.value), Number(inputVl2.value));

            for(let j = 0; j < 4; j++) {
                btns[j].setAttribute('disabled', 'disabled');
            }

            btnToggle();
        } else {
            msgError.classList.remove('inv');
        }
    } else if(opr[0].textContent === '/') {
        if(inputVl1.value != "" && inputVl2.value != "") {
            msgError.classList.add('inv');
            resultBox.classList.remove('inv');
            spanVl1.textContent = inputVl1.value;
            spanVl2.textContent = inputVl2.value;
            result.textContent = divCalc(Number(inputVl1.value), Number(inputVl2.value));

            for(let j = 0; j < 4; j++) {
                btns[j].setAttribute('disabled', 'disabled');
            }

            btnToggle();
        } else {
            msgError.classList.remove('inv');
        }
    } else if(opr[0].textContent === 'x') {
        if(inputVl1.value != "" && inputVl2.value != "") {
            msgError.classList.add('inv');
            resultBox.classList.remove('inv');
            spanVl1.textContent = inputVl1.value;
            spanVl2.textContent = inputVl2.value;
            result.textContent = multCalc(Number(inputVl1.value), Number(inputVl2.value));

            for(let j = 0; j < 4; j++) {
                btns[j].setAttribute('disabled', 'disabled');
            }

            btnToggle();
        } else {
            msgError.classList.remove('inv');
        }
    }
})

// BTN CLEAN
clean.addEventListener('click', function() {
    for(let i = 0; i < 2; i++) {
        opr[i].textContent = '+';
    }

    for(let j = 0; j < 4; j++) {
        btns[j].removeAttribute('disabled');
    }
    
    inputVl1.value = '';
    inputVl2.value = '';
    resultBox.classList.add('inv')
    btnToggle();
})