'use strict';

// Variables
const formInput = document.querySelector('.form__input');
const formBtn = document.querySelector('.form__btn');
const list = document.querySelector('.list');
const listRow = document.querySelectorAll('.list__row');

window.onload = function () {
    loadTask();
};

const removeList = function (listItem) {
    list.removeChild(listItem);

    savingTask();
}

const createList = function () {
    const task = formInput.value.trim();

    if (task) {
        // Creating tag li
        const listItem = document.createElement("li");


        // Adding class on tag li
        listItem.classList.add("list__row");

        // Creating the content inside li
        listItem.innerHTML = `<p class='list__text'>${task}</p><button class='delete'>🗑</button>`;

        const btnRemove = listItem.querySelector('.delete');
        btnRemove.addEventListener('click', function () {
            removeList(listItem);
        });

        //Add tag li inside tag ul
        list.appendChild(listItem);

        // Cleaning the input
        formInput.value = '';
        formInput.focus();

        // LOCAL STORAGE
        savingTask();
    }
}

const savingTask = function () {
    // Taking all the elements li inside ul
    const taskList = list.querySelectorAll("li");

    //Creating an array to save this elements
    const tasks = [];

    //Looping over the taskList
    taskList.forEach(function (task) {
        //Storage the tasks inside the empty array
        tasks.push(task.querySelector('.list__text').innerText);
    })

    //Saving the tasks inside of the key 'tasks' at localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const loadTask = function () {
    //Accessing the taks inside the array 'tasks' at localStorage
    const tasksKey = JSON.parse(localStorage.getItem("tasks"));

    //Clean the ul before adding the tasks
    list.innerHTML = "";

    if (tasksKey !== null && tasksKey.length > 0) {
        tasksKey.forEach(task => {
            const listItem = document.createElement("li");
            listItem.classList.add("list__row")

            listItem.innerHTML = `<p class='list__text'>${task}</p><button class='delete'>🗑</button>`;


            const btnRemove = listItem.querySelector('.delete');
            btnRemove.addEventListener('click', function () {
                removeList(listItem);
            });

            list.appendChild(listItem);
        })
    }
}

formInput.addEventListener('focus', function () {
    formBtn.style.transform = 'translateX(0)';
})


formBtn.addEventListener('click', function (e) {
    e.preventDefault();
    formBtn.blur();

    createList();
});






