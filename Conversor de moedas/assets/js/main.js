'use strict';

//Variables
const inputUs = document.querySelector('.form__input-us');
const inputBr = document.querySelector('.form__input-br');
const btnUsToBr = document.querySelector('.form__btn-us--br');
const btnBrToUs = document.querySelector('.form__btn-br--us');
const painel = document.querySelector('.painel');
const inputResultUsToBr = document.querySelector('.converter__result-span-input-us--br');
const inputResultBrToUs = document.querySelector('.converter__result-span-input-br--us');
const resultUsToBr = document.querySelector('.converter__result-span-us--br');
const resultBrToUs = document.querySelector('.converter__result-span-br--us');

// $1 => R$ 5,07
const dollar = 5.07;

const displayPainel = (type, value, converter) => {
    // painel.innerHTML = '';

    const html = `
        <div class="painel__row ${type === 'd' ? 'dollar' : 'reais'}">
            <div class="painel__from">${type === 'd' ? Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(value) : Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(value)}</div>
            <span class="painel__span">&rArr;</span>
            <div class="painel__to">${type === 'd' ? Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(converter) : Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(converter)}</div>
        </div>
        `;

    painel.insertAdjacentHTML('afterbegin', html);

};

const displayResult = (type, value, converter) => {

    if (type === 'd') {
        inputResultUsToBr.textContent = `${Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(value)}`;
        resultUsToBr.textContent = `${Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(converter)}`;
    } 
    else {
        inputResultBrToUs.textContent = `${Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(value)}`;
        resultBrToUs.textContent = `${Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(converter)}`;
    }
}

const cleanInput = () => inputUs.value = inputBr.value = '';


const convertCoin = (type, value) => type === 'd' ? value * dollar : value / dollar;

btnUsToBr.addEventListener('click', function (e) {
    e.preventDefault();
    let input = +inputUs.value;
    inputUs.blur();

    if (input > 0) {
        const converter = convertCoin('d', input);
        displayResult('d', input, converter);
        displayPainel('d', input, converter);
        cleanInput();
    }

})

btnBrToUs.addEventListener('click', function (e) {
    e.preventDefault();
    let input = +inputBr.value;
    inputBr.blur();

    if (input > 0) {
        const converter = convertCoin('r', input);
        displayResult('r', input, converter);
        displayPainel('r', input, converter);
        cleanInput();
    }

})


