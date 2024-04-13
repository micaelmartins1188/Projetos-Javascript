'use strict';

const formRegister = document.querySelector('.form--register');
const formRemove = document.querySelector('.form--remove');
const btnCallRemove = document.getElementById('btn-call-remove');
const btnCallAdd = document.getElementById('btn-call-add');
const formBtnCallRemove = document.querySelector('.form__btn-remove');
const nameInput = document.getElementById('name');
const nameInputRemove = document.getElementById('name-remove');
const btnConfirm = document.getElementById('btn-confirm');
const btnConfirmRemove = document.getElementById('btn-confirm-remove');
const list = document.querySelector('.list');
const btnCleanList = document.querySelector('.container-list__btn');
const sortHeading = document.querySelector('.sort__heading');
const sortWinner = document.querySelector('.sort__winner');
const btnSort = document.querySelector('.sort__btn');
const itens = JSON.parse(localStorage.getItem('itens')) || [];
itens.forEach(name => {
    createElement(name);
})

btnConfirm.addEventListener('click', function (e) {
    e.preventDefault();
    btnConfirm.blur();

    if (nameInput.value !== '') {

        //Always keep the list inside an object, because it's more easy to work with
        const currentItem = {
            name: nameInput.value,
        }

        //Putting an ID on text
        currentItem.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

        //Creating a new list to the user
        createElement(currentItem);

        //Storage the current item inside the array 'itens'
        itens.push(currentItem);


        //Saving the array itens inside the key 'itens'
        localStorage.setItem('itens', JSON.stringify(itens));
        nameInput.value = '';
        nameInput.focus();
        btnConfirm.blur();

        sortHeading.textContent = 'Quem será o sortudo ?';
        sortWinner.classList.add('hidden');
    }

})

btnConfirmRemove.addEventListener('click', function (e) {
    e.preventDefault();

    if (nameInputRemove.value !== '') {
        const name = nameInputRemove.value;

        for (let i = itens.length - 1; i >= 0; i--) {
            if (itens[i].name === name) {
                itens.splice(i, 1);
            }
        }

        localStorage.setItem('itens', JSON.stringify(itens));
        
        nameInputRemove.value = '';
        btnConfirmRemove.blur();
        list.innerHTML = '';
        itens.forEach(name => {
            createElement(name);
        })

    }
})

btnCallRemove.addEventListener('click', function(e) {
    e.preventDefault();
    formRegister.classList.add('hidden');
    formRemove.classList.remove('hidden')
})

btnCallAdd.addEventListener('click', function(e) {
    e.preventDefault();
    formRegister.classList.remove('hidden');
    formRemove.classList.add('hidden')
})

btnCleanList.addEventListener('click', function() {
    btnCleanList.blur();
    itens.splice();
    localStorage.setItem('itens', JSON.stringify(itens));

    list.innerHTML = '';
})

btnSort.addEventListener('click', function () {
    btnSort.blur();
    if (itens.length > 0) {
        sortHeading.textContent = 'Ganhador';
        sortWinner.textContent = randomNumber();
        sortWinner.classList.remove('hidden');
    }
})


function createElement(item) {
    //Creating the tag li
    const newList = document.createElement('li');
    newList.classList.add('list__row');

    const textList = document.createElement("p");
    textList.classList.add("list__text");
    textList.innerText = item.name;
    textList.dataset.id = item.id;

    newList.appendChild(textList);

    newList.appendChild(createButton(item.id));

    //Adding the list inside the tag UL
    list.appendChild(newList);
}

function createButton(id) {
    //Creating the element
    const btn = document.createElement('span');
    btn.classList.add('list__delete');
    btn.innerText = '🗑';

    btn.addEventListener('click', function () {
        removeList(this.parentNode, id);

        sortHeading.textContent = 'Quem será o sortudo ?';
        sortWinner.classList.add('hidden');
    })

    return btn;
}

function removeList(element, id) {
    element.remove();

    //Removing from array itens
    itens.splice(itens.findIndex(element => element.id === id), 1);

    localStorage.setItem('itens', JSON.stringify(itens));
}

function randomNumber() {
    const number = Math.floor(Math.random() * itens.length);

    const sorted = itens[number].name;
    return sorted;
}