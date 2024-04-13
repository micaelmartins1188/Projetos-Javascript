'use strict';

const btnConfirm = document.getElementById('btn-confirm');

const containerForm = document.querySelector('.container__form');
const btnFormClose = document.querySelector('.form__close');
const nameInput = document.getElementById('name');
const telInput = document.getElementById('tel');
const msgInput = document.getElementById('message');

const containerTable = document.querySelector('.container__table');
const tableBody = document.querySelector('.table__body');
const btnShowModal = document.querySelectorAll('.table__btn--message');
const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modal__text');
const modalDate = document.querySelector('.modal__date');
const modalBtnClose = document.querySelector('.modal__close');
const overlay = document.querySelector('.overlay');

const itens = JSON.parse(localStorage.getItem('itens')) || [];

displayTable();
itens.forEach(item => {
    createElement(item);
})


const btnCallForm = document.querySelector('.btn-call-form');
btnCallForm.addEventListener('click', function () {
    containerForm.classList.remove('hidden');
})

btnFormClose.addEventListener('click', () => containerForm.classList.add('hidden'));


btnConfirm.addEventListener('click', function (e) {
    e.preventDefault();
    btnConfirm.blur();

    if (nameInput.value !== '' || telInput.value !== '' || msgInput.value) {


        if (!checkSpecialLetter(telInput.value)) {

            containerForm.classList.add('hidden');

            const currentItem = {
                name: nameInput.value,
                tel: telInput.value,
                msg: msgInput.value
            }

            currentItem.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;
            itens.push(currentItem);
            createElement(currentItem);
            displayTable();
            //Putting the object inside the keys 'itens'
            localStorage.setItem('itens', JSON.stringify(itens));

            //END OF THE CODE
            nameInput.value = telInput.value = msgInput.value = '';
        }
    }
})

function checkSpecialLetter(input) {
    const regex = /[a-zA-Z!@#$%^&*()]/;
    return regex.test(input);
}

function displayTable() {
    itens.length === 0 ? containerTable.classList.add('hidden') : containerTable.classList.remove('hidden');
}

function displayModal() {
    modal.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
}

modalBtnClose.addEventListener('click', () => displayModal());
overlay.addEventListener('click', () => displayModal());
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') displayModal();
    else if (e.key === 'Enter' && !modal.classList.contains('hidden')) displayModal();

    document.querySelectorAll('.table__btn--message').forEach(btn => btn.blur());
})


function createElement(item) {

    const list = document.createElement('tr');
    list.dataset.id = item.id;
    list.innerHTML = `<td>${item.name}</td>
        <td>${formatTel(item.tel)}</td>`;


    const btnModal = createBtnModal(item);
    const tdModal = document.createElement('td');
    tdModal.appendChild(btnModal)
    list.appendChild(tdModal);

    const date = createDate(item);
    const tdDate = document.createElement('td');
    tdDate.innerText = date;
    list.appendChild(tdDate);

    const btn = createBtnDelete(item);
    const td = document.createElement('td');
    td.appendChild(btn);

    list.appendChild(td);

    tableBody.appendChild(list);
}


function createBtnDelete(id) {
    const btn = document.createElement('button');
    btn.classList.add('table__btn', 'table__btn--remove');
    btn.innerText = '🗑';


    btn.addEventListener('click', function () {
        // const tr = btn.closest('tr');
        // if(tr) tr.remove();

        const tr = document.querySelector(`[data-id = '${id.id}']`);
        if (tr) {
            tr.remove();

            itens.splice(itens.findIndex(element => element.id === id.id), 1);
            localStorage.setItem('itens', JSON.stringify(itens));
            displayTable();
        }

    })

    return btn;
}


function createBtnModal(id) {
    const btnModal = document.createElement('button');
    btnModal.classList.add('table__btn', 'table__btn--message');
    btnModal.innerText = 'ver anotação';

    btnModal.addEventListener('click', function () {
        const tr = document.querySelector(`[data-id = '${id.id}']`);
        const item = itens[itens.findIndex(element => element.id === id.id)];

        modalText.innerText = item.msg;

        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit'
        }

        const date = Intl.DateTimeFormat(navigator.locale, options).format(new Date(id.date));
        modalDate.textContent = date;

        displayModal();
    })

    return btnModal;
}


function createDate(item) {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }

    let date = item.date;

    if (date) {
        date = Intl.DateTimeFormat(navigator.locale, options).format(new Date(item.date));
    } else {
        date = Intl.DateTimeFormat(navigator.locale, options).format(now);
        item.date = now.toISOString();
    }

    return date;
}


function formatTel(tel) {
    if (tel) {
        let ddd = '';
        let firstNumber = '';
        let secondNumber = '';
        let formatedProcess1 = tel.replaceAll(' ', '').split('-').join('');
        let formatedProcess2 = formatedProcess1.split('(').join('');
        let formatedProcess3 = formatedProcess2.split(')').join('');
        let number = formatedProcess3;
        let formatedNumber = '';

        if (number.length === 8) {
            firstNumber = number.slice(0, 4);
            secondNumber = number.slice(4, number.length)
            formatedNumber = `${firstNumber} - ${secondNumber}`;
            return formatedNumber;
        } else if (number.length === 9) {
            firstNumber = number.slice(0, 5);
            secondNumber = number.slice(5, number.length);
            formatedNumber = `${firstNumber} - ${secondNumber}`;
            return formatedNumber;
        } else if (number.length === 10) {
            ddd = number.slice(0, 2);
            firstNumber = number.slice(2, 6);
            secondNumber = number.slice(6, number.length);
            formatedNumber = `${ddd} ${firstNumber} - ${secondNumber}`;
            return formatedNumber;
        } else if (number.length === 11) {

            if (number.startsWith('0800')) {
                let thirdNumber = '';
                firstNumber = number.slice(0, 4);
                secondNumber = number.slice(4, 7);
                thirdNumber = number.slice(7, number.length);
                formatedNumber = `${firstNumber} ${secondNumber} ${thirdNumber}`;
                return formatedNumber;
            } else {
                ddd = number.slice(0, 2);
                firstNumber = number.slice(2, 7);
                secondNumber = number.slice(7, number.length);
                formatedNumber = `${ddd} ${firstNumber} - ${secondNumber}`;
                return formatedNumber;
            }

        } else return 'não existe';
    } else return '';
}


// HIGHLIGHT
const displayHighlight = function () {
    const inputs = document.querySelectorAll('.form__input');
    const inputsWrapper = document.querySelectorAll('.form__input--wrapper');
    const inputTextarea = document.querySelectorAll('.form__textarea');
    const textareaWrapper = document.querySelectorAll('.form__textarea--wrapper');

    inputs.forEach((input, i) => {
        input.addEventListener('focus', function () {
            inputsWrapper[i].classList.add('wrapper-focus');
        })

        input.addEventListener('blur', function () {
            inputsWrapper[i].classList.remove('wrapper-focus');
        })
    })

    inputTextarea.forEach((input, i) => {
        input.addEventListener('focus', function () {
            textareaWrapper[i].classList.add('wrapper-focus');
        })

        input.addEventListener('blur', function () {
            textareaWrapper[i].classList.remove('wrapper-focus');
        })
    })

}

displayHighlight();