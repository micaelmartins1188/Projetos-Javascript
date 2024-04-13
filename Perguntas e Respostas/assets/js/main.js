'use strict';

// BTN NEW QUESTION
const btnNewQuestion = document.querySelector('.btn-new-question');


// FORM & BTN
const btnFormClose = document.querySelector('.form__close');
const formRegister = document.querySelector('.form__register');
const formUpdate = document.querySelector('.form__update');
const btnSave = document.getElementById('btn-save');
const btnUpdate = document.getElementById('btn-update');


// FORM INPUTS
const inputQuestion = document.getElementById('question');
const inputAnswer = document.getElementById('answer');
const inputID = document.getElementById('id');
const inputQuestionID = document.getElementById('id-question');
const inputAnswerID = document.getElementById('id-answer');


// LIST & BTN
const containerList = document.querySelector('.container--list');
const list = document.querySelector('.list');
const btnListUpdate = document.getElementById('list-update');
const btnListRemove = document.getElementById('list-remove');
const btnListView = document.getElementById('list-view');


// MODAL & MODALINFO
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const btnModalClose = document.querySelector('.modal__close');

const modalInfo = document.querySelector('.modal__container--info');
const modalInfoQuestion = document.querySelector('.modal__heading--info');
const modalInfoAnswer = document.querySelector('.modal__text--info');


//TEST & MODAL TEST
const btnTest = document.querySelector('.test__btn');
const modalTest = document.querySelector('.modal__container--test');
const progressTest = document.querySelector('.progress-test');
const questionNumbers = document.querySelector('.question-numbers');

const modalTestQuestion = document.querySelector('.modal-heading--test');
const modalTestAnswer = document.querySelector('.modal__text--test');

const modalBtnAnswer = document.querySelector('.modal__btn-answer');
const modalBoxChoice = document.querySelector('.modal__box--choice');
const modalBtnRight = document.getElementById('correct');
const modalBtnWrong = document.getElementById('incorrect');


const spanRightAnswers = document.getElementById('right-answers');
const spanWrongAnswers = document.getElementById('wrong-answers');
const spanAverage = document.getElementById('average');
/**/

// ARRAY QUESTIONS
const questions = JSON.parse(localStorage.getItem('questions')) || [];

displayList();
questions.forEach(question => {
    createElement(question);
})


btnFormClose.addEventListener('click', function (e) {
    e.preventDefault();

    formRegister.classList.add('hidden');
    btnNewQuestion.classList.remove('hidden');

    inputQuestion.value = inputAnswer.value = '';
    inputID.value = inputQuestionID.value = inputAnswerID.value = '';
})


btnNewQuestion.addEventListener('click', function () {
    formRegister.classList.remove('hidden');
    btnNewQuestion.classList.add('hidden');
})


btnSave.addEventListener('click', function (e) {
    e.preventDefault();

    formRegister.classList.add('hidden');
    btnNewQuestion.classList.remove('hidden');
    if (inputQuestion.value !== '' && inputAnswer.value !== '') {
        const question = inputQuestion.value;
        const answer = inputAnswer.value;

        const currentQuestion = {
            q: question,
            a: answer,
        }

        currentQuestion.id = questions[questions.length - 1] ? (questions[questions.length - 1]).id + 1 : 0;

        questions.push(currentQuestion);
        createElement(currentQuestion);

        localStorage.setItem('questions', JSON.stringify(questions));

        inputQuestion.value = inputAnswer.value = '';
        displayList();
    }
})



btnUpdate.addEventListener('click', function (e) {
    e.preventDefault();

    if (inputQuestionID.value !== '' && inputAnswerID.value !== '') {
        questions[questions.findIndex(element => element.id === +inputID.value)].q = inputQuestionID.value;
        questions[questions.findIndex(element => element.id === +inputID.value)].a = inputAnswerID.value;

        localStorage.setItem('questions', JSON.stringify(questions));

        list.innerHTML = '';

        questions.forEach(item => {
            createElement(item);
        })
    }
})


function displayList() {
    const showList = questions[questions.length - 1] ? true : false;

    if (showList) {
        containerList.classList.remove('hidden');
        return;
    } else {
        containerList.classList.add('hidden');
        spanAverage.textContent = 0;
        spanRightAnswers.textContent = 0;
        spanWrongAnswers.textContent = 0;
    }
}

function displayModal() {
    modal.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
}


function createElement(obj) {
    const listRow = document.createElement('li');
    listRow.classList.add('list__row');

    const listQuestion = document.createElement('p');
    listQuestion.classList.add('list__question');
    listQuestion.textContent = obj.q;
    listRow.appendChild(listQuestion);

    const listBtnUpdate = createBtnUpdate(obj);
    listRow.appendChild(listBtnUpdate);

    const listBtnRemove = createBtnRemove(obj);
    listRow.appendChild(listBtnRemove);

    const listBtnView = createBtnView(obj);
    listRow.appendChild(listBtnView);

    list.appendChild(listRow);
}

function createBtnUpdate(obj) {
    const listBtn = document.createElement('button');
    listBtn.classList.add('list__btn');
    listBtn.id = 'list-update';
    listBtn.textContent = 'atualizar';

    listBtn.addEventListener('click', function () {
        listBtn.blur();
        formUpdate.classList.remove('hidden');
        btnNewQuestion.classList.add('hidden');

        inputID.value = obj.id;
        inputQuestionID.value = obj.q;
        inputAnswerID.value = obj.a;

        formUpdate.scrollIntoView();
    })

    return listBtn;
}


function createBtnRemove(obj) {
    const listBtn = document.createElement('button');
    listBtn.classList.add('list__btn');
    listBtn.id = 'list-remove';
    listBtn.textContent = '🗑';

    listBtn.addEventListener('click', function () {
        listBtn.blur();
        this.parentNode.remove();

        questions.splice(questions.findIndex(element => element.id === obj.id), 1)

        localStorage.setItem('questions', JSON.stringify(questions));
        list.innerHTML = '';
        displayList();
        questions.forEach(question => createElement(question));
    })
    return listBtn;
}


function createBtnView(obj) {
    const listBtn = document.createElement('button');
    listBtn.classList.add('list__btn');
    listBtn.id = 'list-view';
    listBtn.textContent = '👁';

    listBtn.addEventListener('click', function () {
        listBtn.blur();
        modalInfoQuestion.textContent = obj.q;
        modalInfoAnswer.innerText = obj.a;
        displayModal();
        modalInfo.classList.remove('hidden');
    })
    return listBtn;
}

btnModalClose.addEventListener('click', function () {
    displayModal();
    modalInfo.classList.add('hidden');
    modalTest.classList.add('hidden');
})

overlay.addEventListener('click', function () {
    displayModal();
    modalInfo.classList.add('hidden');
    modalTest.classList.add('hidden');
})

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        if (!modal.classList.contains('hidden')) {
            displayModal();
            modalInfo.classList.add('hidden');
            modalTest.classList.add('hidden');
        }
    }
})

const wrongQuestions = [];
const score = [0, 0];
let progressCounter = 1;

const randomQuestionsArr = [];

function init() {
    randomQuestions();
    progressCounter = 1;
    score[0] = 0;
    score[1] = 0;
    progressTest.textContent = progressCounter;
    displayTest();
}

function randomQuestions() {

    for (let i = 1; i <= questions.length; i++) {
        randomQuestionsArr.push(i);
    }

    for (let j = randomQuestionsArr.length - 1; j > 0; j--) {
        const randomNumber = Math.floor(Math.random() * (j + 1));

        let temp = randomQuestionsArr[j];
        randomQuestionsArr[j] = randomQuestionsArr[randomNumber];
        randomQuestionsArr[randomNumber] = temp;
    }

}

btnTest.addEventListener('click', function () {
    if(questions.length > 0) {
        displayModal();
        modalTest.classList.remove('hidden');
        progressTest.textContent = progressCounter;
        questionNumbers.textContent = questions.length;
        init();
    }
})

modalBtnAnswer.addEventListener('click', function () {
    modalTestAnswer.classList.remove('hidden');
    modalBtnAnswer.classList.add('hidden');
    modalBoxChoice.classList.remove('hidden');
})


function displayTest() {
        if (progressCounter <= questions.length) {

            modalTestQuestion.innerText = questions[randomQuestionsArr[0] - 1].q;
            modalTestAnswer.innerText = questions[randomQuestionsArr[0] - 1].a;

            randomQuestionsArr.splice(0, 1);
        }
}

modalBtnRight.addEventListener('click', function () {
    if (progressCounter < questions.length) {
        score[0] += 1;
        modalBoxChoice.classList.add('hidden');
        modalBtnAnswer.classList.remove('hidden');
        modalTestAnswer.classList.add('hidden')

        progressCounter += 1;
        progressTest.textContent = progressCounter;

        displayTest();
    } else if (progressCounter === questions.length) {
        score[0] += 1;
        progressTest.textContent = progressCounter;

        modalBoxChoice.classList.add('hidden');
        modalBtnAnswer.classList.remove('hidden');
        modalTestAnswer.classList.add('hidden');
        modalTest.classList.add('hidden');

        displayModal();
        endTest();
    }

})

modalBtnWrong.addEventListener('click', function () {
    if (progressCounter < questions.length) {
        score[1] += 1;

        modalBoxChoice.classList.add('hidden');
        modalBtnAnswer.classList.remove('hidden');
        modalTestAnswer.classList.add('hidden')
        progressCounter += 1;
        progressTest.textContent = progressCounter;

        displayTest();

    } else if (progressCounter === questions.length) {
        score[1] += 1;
        progressTest.textContent = progressCounter;

        modalBoxChoice.classList.add('hidden');
        modalBtnAnswer.classList.remove('hidden');
        modalTestAnswer.classList.add('hidden');
        modalTest.classList.add('hidden');

        displayModal();
        endTest();
    }

})

function endTest() {
    spanRightAnswers.textContent = score[0];
    spanWrongAnswers.textContent = score[1];
    spanAverage.textContent = `${((score[0] / questions.length) * 100).toFixed(2)} %`;
}

/*
const spanRightAnswers = document.getElementById('right-answers');
const spanWrongAnswers = document.getElementById('wrong-answers');
const spanAverage = document.getElementById('average');
*/