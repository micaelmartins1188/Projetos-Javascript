'use strict';

const btnModalInfo = document.querySelector('.show-modal--info');
const modalInfo = document.querySelector('.modal--info');
const overlay = document.querySelector('.overlay');

const modalResult = document.querySelector('.modal--result');
const btnModalResult = document.querySelector('.show-modal--result');

const modalResultX1 = document.querySelector('.modal--result-x1');
const modalResultX2 = document.querySelector('.modal--result-x2');

const mathA = document.querySelectorAll('.math__a');
const mathB = document.querySelectorAll('.math__b');
const mathC = document.querySelectorAll('.math__c');
const mathAC = document.querySelector('.math__ac');
const mathB2 = document.querySelector('.math__b2');
const mathDelta = document.querySelectorAll('.math__delta');
const mathX1sup = document.querySelector('.math__x1sup');
const mathX1sup1 = document.querySelector('.math__x1sup1-1');
const mathX1sup12 = document.querySelector('.math__x1sup1-2');
const mathX1sub = document.querySelector('.math__x1sub');
const mathX1sub1 = document.querySelector('.math__x1sub1');
const mathX1 = document.querySelector('.math__x1');
const mathX2sup = document.querySelector('.math__x2sup');
const mathX2sub = document.querySelector('.math__x2sub');
const mathX2 = document.querySelector('.math__x2');
const mathX2sup2 = document.querySelector('.math__x2sup2-1');
const mathX2sup22 = document.querySelector('.math__x2sup2-2');
const mathX2sub2 = document.querySelector('.math__x2sub2');

const btnModalClose = document.querySelectorAll('.modal__close');

const inputA = document.getElementById('a');
const inputB = document.getElementById('b');
const inputC = document.getElementById('c');
const btnCalc = document.querySelector('.calc__btn');

const containerTable = document.querySelector('.container--table');
const tableBody = document.querySelector('.table__body');

const itens = [];

itens.forEach(item => createElement(item));
////////////////////////////////////////////////////////////////
//FUNCTIONS
const displayModalInfo = function () {
    modalInfo.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
}

const closeModal = function () {
    modalInfo.classList.add('hidden');
    modalResult.classList.add('hidden');
    modalResultX1.classList.add('hidden');
    modalResultX2.classList.add('hidden');
    overlay.classList.add('hidden');
}


//////////////////////////// MODAL /////////////////////////////
btnModalInfo.addEventListener('click', function () {
    btnModalInfo.blur();
    displayModalInfo();
})

btnModalClose.forEach(btn => {
    btn.addEventListener('click', function () {
        closeModal();
    })
})

overlay.addEventListener('click', function () {
    closeModal();
})

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }
})


/////////////////////////// INPUTS ///////////////////////////
btnCalc.addEventListener('click', function () {
    if (inputA.value !== '' && inputB.value !== '' && inputC.value !== '') {
        const aValue = +inputA.value;
        const bValue = +inputB.value;
        const cValue = +inputC.value;

        const currentItem = {
            a: aValue,
            b: bValue,
            c: cValue,
        }

        currentItem.id = itens[itens.length - 1] ? (itens[itens.length -1]).id +1 : 0;
        calcBhaskara(aValue, bValue, cValue, currentItem);
        itens.push(currentItem);

        createElement(currentItem);

        inputA.value = inputB.value = inputC.value = '';
        btnCalc.blur();
        containerTable.classList.remove('hidden');
    }
})


//////////////////////// CALC BHASKARA /////////////////////////
function calcBhaskara(a, b, c, item) {

    const delta = Math.pow(b, 2) - (4 * a * c);
    item.delta = delta;
    item.b2 = Math.pow(b, 2);
    item.ac = -(4 * a * c);

    if (delta > 0) {
        const x1sup = -b + Math.sqrt(delta);
        const x1 = (-b + Math.sqrt(delta)) / (2 * a);
        const x2 = (-b - Math.sqrt(delta)) / (2 * a);
        const x2sup = -b - Math.sqrt(delta);
        const xsub = 2 * a;
        const x1sup1 = -(b);
        const x1sup12 = Math.sqrt(delta);
        const x2sup2 = -(b);
        const x2sup22 = Math.sqrt(delta);

        //saving the values inside currentItem
        item.x1 = x1;
        item.x2 = x2;
        item.x1sup = x1sup;
        item.x2sup = x2sup;
        item.xsub = xsub;
        item.x1sup1 = x1sup1;
        item.x1sup12 = x1sup12;
        item.x1sub1 = xsub;
        item.x2sup2 = x2sup2;
        item.x2sup22 = x2sup22;
        item.x2sub2 = xsub;
        return;
    } else if (delta === 0) {
        modalResultX1.classList.add('hidden');
        modalResultX2.classList.add('hidden');
        // const x1sup = -b + Math.sqrt(delta);
        // const xsub = 2 * a;
        // const x1 = -b / (2 * a);
        // const x1sup1 = -(b);
        // const x1sup12 = Math.sqrt(delta);
        // const x2sup2 = -(b);
        // const x2sup22 = Math.sqrt(delta);

        // item.x1 = x1;
        // item.delta = delta;
        // item.x1sup = x1sup;
        // item.xsub = xsub;
        // item.x1sub1 = xsub;
        // item.x1sup1 = x1sup1;
        // item.x1sup12 = x1sup12;
        // item.x2sub2 = xsub;
        // item.x2sup2 = x2sup2;
        // item.x2sup22 = x2sup22;
        return;
    } else {
        return;
    }

}




//////////////////////// CREATE ELEMENT ////////////////////////
function createElement(item) {
    const tr = document.createElement('tr');
    tr.dataset.id = item.id;

    const tdA = document.createElement('td');
    tdA.textContent = item.a;
    tr.appendChild(tdA);

    const tdB = document.createElement('td');
    tdB.textContent = item.b;
    tr.appendChild(tdB);

    const tdC = document.createElement('td');
    tdC.textContent = item.c;
    tr.appendChild(tdC);

    const tdDelta = document.createElement('td');
    tdDelta.textContent = item.delta;
    tr.appendChild(tdDelta);

    const tdX1 = document.createElement('td');
    tdX1.textContent = item.x1 ? item.x1 : '';
    tr.appendChild(tdX1);

    const tdX2 = document.createElement('td');
    tdX2.textContent = item.x2 ? item.x2 : '';
    tr.appendChild(tdX2);

    const tdBtn = document.createElement('td');
    tdBtn.appendChild(createBtn(item));
    tr.appendChild(tdBtn);

    tableBody.appendChild(tr);
}


////////////////////// CREATE BTN TABLE ////////////////////////
function createBtn(item) {
    const btn = document.createElement('button');
    btn.classList.add('show-modal', 'show-modal--result');
    btn.textContent = 'visualizar';

    btn.addEventListener('click', function () {

        const tr = document.querySelector(`[data-id = '${item.id}']`);
        
        if(tr) {
            modalResult.classList.remove('hidden');
            overlay.classList.remove('hidden');
            const currentItem = itens.find(element => element.id === +tr.dataset.id);
            formatModalCalc(currentItem);
        }
    });

    return btn;
}


///////////// FORMAT MODAL CALC /////////////////
function formatModalCalc(item) {
    if(item.delta > 0) {
        modalResultX1.classList.remove('hidden');
        modalResultX2.classList.remove('hidden');

        mathA.forEach(a => a.textContent = item.a);
        mathB.forEach(b => b.textContent = `(${item.b})`);
        mathB2.textContent = `(${item.b2})`;
        mathC.forEach(c => c.textContent = item.c);
        mathAC.textContent = `(${item.ac})`;
        mathDelta.forEach(delta => delta.textContent = item.delta);
        mathX1sup.textContent = item.x1sup;
        mathX1sub.textContent = item.xsub;
        mathX1sub1.textContent = item.x1sub1;
        mathX1.textContent = item.x1;
        mathX1sup1.textContent = item.x1sup1;
        mathX1sup12.textContent = item.x1sup12;

        mathX2sup2.textContent = item.x2sup2;
        mathX2sup22.textContent = item.x2sup22;
        mathX2sub2.textContent = item.x2sub2;
        mathX2sup.textContent = item.x2sup;
        mathX2sub.textContent = item.xsub;
        mathX2.textContent = item.x2;
    } else if(item.delta === 0) {
        modalResultX1.classList.remove('hidden');
        modalResultX2.classList.add('hidden');

        mathA.forEach(a => a.textContent = item.a);
        mathB.forEach(b => b.textContent = `(${item.b})`);
        mathB2.textContent = `(${item.b2})`;
        mathC.forEach(c => c.textContent = item.c);
        mathAC.textContent = `(${item.ac})`;
        mathDelta.forEach(delta => delta.textContent = item.delta);
        mathX1sup.textContent = item.x1sup;
        mathX1sub.textContent = item.xsub;
        mathX1.textContent = item.x1;

        mathX2sup.textContent = item.x2sup;
        mathX2sub.textContent = item.xsub;
        mathX2.textContent = item.x2;
    } else if(item.delta < 0) {
        modalResultX1.classList.add('hidden');
        modalResultX2.classList.add('hidden');

        mathA.forEach(a => a.textContent = item.a);
        mathB.forEach(b => b.textContent = `(${item.b})`);
        mathB2.textContent = `(${item.b2})`;
        mathC.forEach(c => c.textContent = item.c);
        mathAC.textContent = `(${item.ac})`;
        mathDelta.forEach(delta => delta.textContent = item.delta);
    } else {return;}
        
}