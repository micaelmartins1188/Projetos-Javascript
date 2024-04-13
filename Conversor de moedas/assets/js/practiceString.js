'use strict';

const text1 = document.getElementById('text1');
const text2 = document.getElementById('text2');
const btnUpper = document.querySelector('.btn--upper');
const btnLower = document.querySelector('.btn--lower');
const btnArray = document.querySelector('.btn--array');
const array = [];

btnUpper.addEventListener('click', function () {
    let text = text1.value;
    text2.value = text.toUpperCase();
});

btnLower.addEventListener('click', function () {
    let text = text1.value;
    text2.value = text.toLowerCase();
});

btnArray.addEventListener('click', function () {

    const text = text1.value;
    console.log();

   if(text.includes(',') || text.includes(';')) {
    const textFormated = text.toLowerCase().replaceAll(';', ',');
    
    const array2 = textFormated.split(',');
    let newArr = 'const array = [';

    for (const txt of array2) {
        newArr += txt + ', ';
    }

    newArr += '];';

    text2.value = newArr;
   } else {
    const array2 = text2.value = text.toLowerCase().split(' ');

    let newArr = 'const array = [';

    for (const txt of array2) {
        newArr += txt + ', ';
    }

    newArr += '];';

    text2.value = newArr;
   }
});

// let test = 'Esse aqui é um texto de exemplo';
// let test2 = 'Esse, aqui, é, um, texto, de, exemplo';
let test3 = 'Esse;aqui;é;um;texto;de;exemplo';
// let test4 = 'Esse,aqui,é,um,texto,de,exemplo';


// if(test2.indexOf(',')) {
//     console.log(',');
//     console.log(test2.toLowerCase().replaceAll(' ', '').split(','));
// }



// console.log(test.split(' '));
// console.log(test2.split(', '));
// console.log(test3.split(';'));
// console.log(test4.split(','));
