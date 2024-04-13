'use strict';

// Variables
const formInput = document.querySelector('.form__input');
const formBtn = document.querySelector('.form__btn');
const list = document.querySelector('.list');
const textDefault = document.querySelector('.text-default');
const listRow = document.querySelectorAll('.list__row');
const deleteSpan = document.querySelectorAll('.delete');


const createList = function (text) {
    const html = `
    <div class="list__row">
        <p class="list__text">${text}</p>
    </div>
    `;
    
    list.insertAdjacentHTML('afterbegin', html);
}


formInput.addEventListener('focus', function () {
    formBtn.style.transform = 'translateX(0)';
})


formBtn.addEventListener('click', function (e) {
    e.preventDefault();
    formBtn.blur();

    if(formInput.value.trim()) {
        textDefault.style.display = 'none'; 
        createList(formInput.value);
    }     

    formInput.value = '';
    formInput.focus();
});





