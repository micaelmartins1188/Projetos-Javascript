'use strict';

// CLOCK
//Variables
const clockHour = document.querySelector('.clock__hour');
const clockMinute = document.querySelector('.clock__minute');
const clockSecond = document.querySelector('.clock__second');

const displayClock = function () {
    const clock = function () {
        const now = new Date();
        const hour = String(now.getHours()).padStart(2, 0);
        const min = String(now.getMinutes()).padStart(2, 0);
        const sec = String(now.getSeconds()).padStart(2, 0);

        

        clockHour.textContent = hour;
        clockMinute.textContent = min;
        clockSecond.textContent = sec;
    };

    clock();
    setInterval(clock, 1000);
};
displayClock();
/////////////////////////////////////////////////////////////

// TIMER
// Dysplay
const timerHour = document.querySelector('.timer__hour');
const timerMinute = document.querySelector('.timer__minute');
const timerSecond = document.querySelector('.timer__second');

// Options
const btnStart = document.querySelector('.timer__btn--start');
const btnPause = document.querySelector('.timer__btn--pause');
const btnRestart = document.querySelector('.timer__btn--restart');
const btnNewTimer = document.querySelector('.timer__btn--new');

// Form
const formTimer = document.querySelector('.form');
const inputHour = document.querySelector('.form__input--hour');
const inputMinute = document.querySelector('.form__input--minute');
const inputSecond = document.querySelector('.form__input--second');
const btnGetTimer = document.querySelector('.form__btn');

let time, timer;
let isPaused = false;
let restartTime;
let disabled = false;

const displayTimer = function () {
    const tick = function () {
        //Getting values
        const hour = String(Math.floor(time / 3600)).padStart(2, 0);
        const min = String(Math.floor((time % 3600) / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);

        //Display
        timerHour.textContent = hour;
        timerMinute.textContent = min;
        timerSecond.textContent = sec;
        if (time === 0) return;
        time--;
    };

    tick();
    const timer = setInterval(tick, 1000);
    return timer;
}

const calcTime = function (hour = 0, min = 0, sec) {
    const time1 = +hour * 3600;
    const time2 = +min * 60;
    const time3 = +sec;

    return time = time1 + time2 + time3;
}

const displayForm = function () {
    formTimer.classList.toggle('hidden');
    if(disabled) disabled = false;
    else disabled = true;

    btnGetTimer.disabled = disabled;
    inputHour.disabled = disabled;
    inputMinute.disabled = disabled;
    inputSecond.disabled = disabled;
};

btnGetTimer.addEventListener('click', function (e) {
    e.preventDefault();

    if (inputHour.value !== '' || inputMinute.value !== '' || inputSecond.value !== '') {
        const hour = inputHour.value === '' ? 0 : +inputHour.value;
        const min = inputMinute.value === '' ? 0 : +inputMinute.value;
        const sec = +inputSecond.value;
        console.log('certo');
        restartTime = calcTime(hour, min, sec);
        displayForm();

        if (timer) clearInterval(timer)
        timer = displayTimer();

        inputHour.value = inputMinute.value = '';
        inputSecond.value = inputHour.value;
    }
});


//Options functionatily
btnStart.addEventListener('click', function () {
    if (isPaused && time >= 0) {
        timer = displayTimer();
        isPaused = false;
    }
});

btnPause.addEventListener('click', function () {
    if (!isPaused && time >= 0) {
        clearInterval(timer);
        isPaused = true;
    }
    
});

btnRestart.addEventListener('click', function () {
    time = restartTime;
    if (time) {
        isPaused = false;
        clearInterval(timer);
        timer = displayTimer();
    }
});

btnNewTimer.addEventListener('click', function () {
    displayForm();
});
