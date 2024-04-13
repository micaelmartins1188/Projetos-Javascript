'use strict';

const modal = document.querySelectorAll('.modal');
const overlay = document.querySelector('.overlay');
const btnsCloseModal = document.querySelectorAll('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');


for (let i = 0; i < btnsOpenModal.length; i++) {
    btnsOpenModal[i].addEventListener('click', function () {
        modal[i].classList.remove('hidden');
        overlay.classList.remove('hidden');
    })
}

const closeModal = function () {
    for (let i = 0; i < modal.length; i++) {
        if(!modal[i].classList.contains('hidden'))
        modal[i].classList.add('hidden');
    }
    overlay.classList.add('hidden');
}

for(let j = 0; j < btnsCloseModal.length; j++) {
    btnsCloseModal[j].addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
}