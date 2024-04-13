'use strict';

const numbersSorted = [];

const randomNumbers = function (amount, max) {

    // if(amount >= max) {
    //     console.log('A quantidade de número sorteado não pode ser maior ou igual ao número máximo que terá no sorteio');
    //     return;
    // }

    let numbers = [];

    //Filling the array
    for (let i = 1; i <= max; i++) {
        numbers.push(i);
        console.log(i);
    }

    for (let i = numbers.length - 1; i > 0; i--) {
        const randomNumber = Math.floor(Math.random() * (i + 1));

        //Mixing the numbers
        let temp = numbers[i];
        numbers[i] = numbers[randomNumber];
        numbers[randomNumber] = temp;
    }

    // console.log(numbers);
    // console.log(numbers.slice(0, amount));
    // console.log(numbers.slice(0, amount).sort((a,b) => a- b));

    const sorted = numbers.slice(0, amount).sort((a, b) => a - b);

    sorted.map(number => {
        numbersSorted.push(number);
    })
}


//////////////////////////////////////////////////////////////
const msgError = document.querySelectorAll('.form__message-error');

const displayMessageError = function (type) {
    if (type === 'null') {
        msgError[0].classList.remove('hidden');
        msgError[1].classList.add('hidden');
    } else {
        msgError[1].classList.remove('hidden');
        msgError[0].classList.add('hidden');
    }
    msgError.classList.remove('hidden');
}

const cleanMessageError = function () {
    msgError.forEach(error => error.classList.add('hidden'));
}
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
const sortedBox = document.querySelector('.sorted__box');

const createElement = function () {
    sortedBox.innerHTML = '';

    numbersSorted.forEach(number => {
        const box = document.createElement('div');
        box.classList.add('sorted__number');
        box.textContent = number;

        box.addEventListener('click', function() {
            box.classList.toggle('sorted__number--clicked');
        })

        sortedBox.appendChild(box);
    })
}
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
const amountInput = document.getElementById('amount');
const maxInput = document.getElementById('max');
const btnForm = document.getElementById('sort');

btnForm.addEventListener('click', function (e) {
    e.preventDefault();
    btnForm.blur();

    const amount = amountInput.value;
    const max = maxInput.value;

    if (amount === '' || max === '') {
        displayMessageError('null');
    } else if (+amount >= +max) {
        displayMessageError();
    } else {
        cleanMessageError();
        randomNumbers(+amount, +max);
        createElement();
        numbersSorted.length = 0;
    }
})
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
const btnCleanForm = document.getElementById('clean-form');

btnCleanForm.addEventListener('click', function(e) {
    e.preventDefault();
    btnCleanForm.blur();

    cleanMessageError();
    amountInput.value = maxInput.value = '';
})
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
const btnCleanSorted = document.getElementById('clean-sorted');

btnCleanSorted.addEventListener('click', function(e) {
    e.preventDefault();
    btnCleanSorted.blur();

    sortedBox.innerHTML = '<div class="sorted__number">?</div>';
})
//////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////