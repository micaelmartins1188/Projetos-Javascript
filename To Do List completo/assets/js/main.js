'use strict';
//ELEMENTS
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');

const editForm = document.getElementById('edit-form');
const editInput = document.getElementById('edit-input');
const editInputID = document.getElementById('edit-input-id');
const editBtn = document.getElementById('edit-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const searchInput = document.getElementById("search-input");
const eraseBtn = document.getElementById("erase-btn");
const filterBtn = document.getElementById("filter-select");

const list = document.querySelector('.list');

const itens = JSON.parse(localStorage.getItem('itens')) || [];


//FUNCTIONS
const createElement = (item) => {
    const listRow = document.createElement('li');
    listRow.classList.add('list__row');
    listRow.dataset.id = item.id;

    const listText = document.createElement('p');
    listText.classList.add('list__text');
    listText.innerText = item.text;
    listRow.appendChild(listText);

    const doneBtn = finishBtn(item);
    listRow.appendChild(doneBtn);

    const editBtn = editList(item);
    listRow.appendChild(editBtn);

    const deleteBtn = removeList(item);
    listRow.appendChild(deleteBtn);

    if (item.done) {
        listRow.classList.add('done')
    } else {
        listRow.classList.remove('done')
    }

    list.appendChild(listRow);

    todoInput.value = '';
}

function finishBtn(item) {
    const finishBtn = document.createElement('button');
    finishBtn.classList.add('btn', 'finish-todo');
    finishBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

    finishBtn.addEventListener('click', function () {
        this.parentNode.classList.toggle('done');

        if (item.done) {
            item.done = false;
        } else {
            item.done = true;
        }

        localStorage.setItem('itens', JSON.stringify(itens));
        finishBtn.blur();
    })

    return finishBtn;
}

function removeList(item) {
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'remove-todo');
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    deleteBtn.addEventListener('click', function () {
        this.parentNode.remove();

        itens.splice(itens.findIndex(element => element.id === item.id), 1);

        localStorage.setItem('itens', JSON.stringify(itens));
    })

    return deleteBtn;
}

function editList(item) {
    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'edit-todo');
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';

    editBtn.addEventListener('click', function () {
        toggleForms();

        editInput.value = item.text;
        editInputID.value = item.id;
        editBtn.blur();
    })

    return editBtn;
}

function toggleForms() {
    editForm.classList.toggle('hidden');
    todoForm.classList.toggle('hidden');
    list.classList.toggle('hidden');
}


if (itens) {
    itens.forEach(element => {
        createElement(element);
    })
}

const getSearchedTodos = (search) => {
    const allList = document.querySelectorAll('.list__row');

    allList.forEach(list => {
        const listText = list.querySelector('.list__text').innerText.toLowerCase();

        list.style.display = 'flex';

        if (!listText.includes(search)) {
            list.style.display = 'none';
        }
    })
}


const filterList = (filterValue) => {
    const allList = document.querySelectorAll('.list__row');

    switch (filterValue) {
        case "all":
            allList.forEach((list) => list.style.display = 'flex');
            break;

        case "done":
            allList.forEach((list) => {
                list.classList.contains("done") ? list.style.display = 'flex' : list.style.display = 'none'
            });
            break;

        case "todo":
            allList.forEach(list => {
                !list.classList.contains("done") ? list.style.display = 'flex' : list.style.display = 'none';
            })
            break;

        default:
            break;
    }
}





//EVENTS
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue) {
        const currentItem = {
            text: inputValue,
        }

        currentItem.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;
        currentItem.done = false;

        createElement(currentItem);

        itens.push(currentItem);

        localStorage.setItem('itens', JSON.stringify(itens));
    }
})


cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault();

    editInput.value = editInputID.value = '';
    toggleForms();

    cancelEditBtn.blur();
});


editBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (editInput.value !== '') {
        const editText = editInput.value;
        const editID = editInputID.value;

        const editItem = itens.find(element => element.id === +editID);

        editItem.text = editText;
        toggleForms();

        localStorage.setItem('itens', JSON.stringify(itens));
        list.innerHTML = '';
        itens.forEach(item => createElement(item));

        editBtn.blur();
    }
})


searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value;

    getSearchedTodos(search);
});

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"));
    eraseBtn.blur();
});

filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;

    filterList(filterValue);
    filterBtn.blur();
});