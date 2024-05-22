'use strict';

//ELEMENTOS
//Mensagem (informação sobre login e senha)
const msg = document.querySelector('.message');
const msgUsuario = document.getElementById('username');
const msgPin = document.getElementById('pin');

//Container do formulario de cadastro e login
const containerForm = document.querySelector('.container--form');
const btnShowAccs = document.getElementById('show-accs');
const modalAccClose = document.getElementById("modal-acc-close");

//MODAL INFO ACCS
const modalAccs = document.getElementById('modal-acc');
const overlay = document.querySelector('.overlay');
const modalContainerCards = document.querySelector('.modal__container-cards');

// APP
const app = document.querySelector('.app');

//Formulário de cadastro
const formRegistro = document.getElementById('form-register');
const nomeInputRegistro = document.getElementById('name-input');
const sobrenomeInputRegistro = document.getElementById('surname-input');
const btnRegistrar = document.getElementById('btn-register');
const btnChamarFormRegistro = document.getElementById('new-acc');
const btnCloseRegister = document.getElementById('btn-close-register');

//Formulário de login
const formLogin = document.getElementById('form-login');
const nomeInputLogin = document.getElementById('username-input');
const pinInputLogin = document.getElementById('pin-input');
const btnEntrar = document.getElementById('btn-login');
const loginError = document.getElementById('login-error');

//TAREFAS FORMULÁRIO
const taskTitle = document.getElementById('task-title');
const taskDescription = document.getElementById('task-description');
const taskBtn = document.getElementById('task-btn');

//CARD INICIAL
const cardInitialTask = document.getElementById('card-initial-task');
const cardInProgressTask = document.getElementById('card-in-progress-task');
const cardDoneTask = document.getElementById('card-done-task');

//INFO STATUS
const statusInitialTask = document.getElementById('status-initial-task');
const statusInProgressTask = document.getElementById('status-in-progress-task');
const statusDoneTask = document.getElementById('status-done-task');

// MODAL VIEW
const modalView = document.getElementById('modal-view');
const modalViewClose = document.getElementById('modal-view-close');
const modalViewTitulo = document.querySelector('.modal__heading');
const modalViewDescricao = document.querySelector('.modal__description');

//FORM SUBTASKS
const subtaskId = document.getElementById('subtask-id');
subtaskId.disabled = true;
const subtaskDescription = document.getElementById('subtask-description');
const subtaskBtn = document.getElementById('subtask-btn');
const cardInitialSubtask = document.getElementById('card-initial-subtask');
const cardInProgressSubtask = document.getElementById('card-in-progress-subtask');
const cardDoneSubtask = document.getElementById('card-done-subtask');
const statusInitialSubtask = document.getElementById('status-initial-subtask');
const statusInProgressSubtask = document.getElementById('status-in-progress-subtask');
const statusDoneSubtask = document.getElementById('status-done-subtask');

// MODAL EDIT
const modalEdit = document.getElementById('modal-edit');
const modalEditId = document.getElementById('edit-id');
const modalEditType = document.getElementById('edit-type');
const modalEditTitle = document.getElementById('edit-title');
const modalEditDescription = document.getElementById('edit-description');
const modalEditBtn = document.getElementById('edit-btn');
const modalEditClose = document.getElementById('modal-edit-close');


const contas = JSON.parse(localStorage.getItem('contas')) || [];
let contaAtual;






//FUNÇOES
const criarUsuario = arrContas => {
    arrContas.forEach(conta =>
        conta.usuario = conta.dono.toLowerCase().split(' ').map(nome => nome[0]).join(''))
}

const criarSenha = () => {
    //Vai gerar um número de 100 á 999
    return Math.floor(Math.random() * 900) + 100;
}

const displayFormRegistro = () => {
    formRegistro.classList.toggle('hidden');
    formLogin.classList.toggle('hidden');
}

const displayMensagem = (conta) => {
    msg.classList.remove('hidden');
    msgUsuario.textContent = conta.usuario;
    msgPin.textContent = conta.pin;
    topoPagina();
}

function topoPagina() {
    //Para navegadores web
    document.body.scrollTop = 0;

    //Para navegadores móveis
    document.documentElement.scrollTop = 0;
}

function mostrarContas() {
    if (contas.length > 0) {
        modalContainerCards.innerHTML = '';



        contas.forEach((conta, i) => {
            const div = document.createElement('div');
            div.classList.add('modal__card');
            div.innerHTML = `<h3 class="modal__card-heading">Conta ${i + 1}</h3>

        <p class="modal__card-text">Dono: ${conta.dono}</p>
        <p class="modal__card-text">Usuario: ${conta.usuario}</p>
        <p class="modal__card-text">PIN: ${conta.pin}</p>`;

            modalContainerCards.appendChild(div);
        })
    }
}


const criarTarefaInicial = conta => {
    if (conta.parado.length > 0) {
        cardInitialTask.innerHTML = '';
        conta.parado.forEach(tarefa => {
            if (tarefa.status === 0 && tarefa.tipo === 'tarefa') {
                const li = document.createElement('li');
                li.classList.add('card__list-item', 'card__list-item--initial');
                li.id = tarefa.id;

                const titulo = document.createElement('p');
                titulo.classList.add('card__list-text');
                titulo.textContent = tarefa.titulo;
                li.appendChild(titulo);

                const divOptions = document.createElement('div');
                divOptions.classList.add('container-options');

                //ESSES BOTÕES VÃO SER CRIADOS POR UMA FUNÇÃO
                const btnEditar = criarBtnEditar(tarefa);
                divOptions.appendChild(btnEditar);

                const btnVisualizar = criarBtnVisualizar(tarefa);
                divOptions.appendChild(btnVisualizar);

                const btnRemover = criarBtnRemover(tarefa);
                divOptions.appendChild(btnRemover);
                li.appendChild(divOptions);
                // FIM DO CONTAINER DE OPÇÕES


                const divStatus = document.createElement("div");
                divStatus.classList.add('container-status');

                const btnStatusInicial = criarBtnStatusInicial(tarefa);
                divStatus.appendChild(btnStatusInicial);

                const btnStatusAndamento = criarBtnStatusAndamento(tarefa);
                divStatus.appendChild(btnStatusAndamento);

                const btnStatusConcluido = criarBtnStatusConcluido(tarefa);
                divStatus.appendChild(btnStatusConcluido);
                li.appendChild(divStatus);

                cardInitialTask.appendChild(li);
            }
        })
    } else cardInitialTask.innerHTML = '';
}


const criarTarefaEmAndamento = conta => {
    if (conta.andamento.length > 0) {
        cardInProgressTask.innerHTML = '';
        conta.andamento.forEach(tarefa => {
            if (tarefa.status === 1 && tarefa.tipo === 'tarefa') {
                const li = document.createElement('li');
                li.classList.add('card__list-item', 'card__list-item--in-progress');
                li.id = tarefa.id;

                const titulo = document.createElement('p');
                titulo.classList.add('card__list-text');
                titulo.textContent = tarefa.titulo;
                li.appendChild(titulo);

                const divOptions = document.createElement('div');
                divOptions.classList.add('container-options');

                //ESSES BOTÕES VÃO SER CRIADOS POR UMA FUNÇÃO
                const btnEditar = criarBtnEditar(tarefa);
                divOptions.appendChild(btnEditar);

                const btnVisualizar = criarBtnVisualizar(tarefa);
                divOptions.appendChild(btnVisualizar);

                const btnRemover = criarBtnRemover(tarefa);
                divOptions.appendChild(btnRemover);
                li.appendChild(divOptions);
                // FIM DO CONTAINER DE OPÇÕES


                const divStatus = document.createElement("div");
                divStatus.classList.add('container-status');

                const btnStatusInicial = criarBtnStatusInicial(tarefa);
                divStatus.appendChild(btnStatusInicial);

                const btnStatusAndamento = criarBtnStatusAndamento(tarefa);
                divStatus.appendChild(btnStatusAndamento);

                const btnStatusConcluido = criarBtnStatusConcluido(tarefa);
                divStatus.appendChild(btnStatusConcluido);
                li.appendChild(divStatus);

                cardInProgressTask.appendChild(li);
            }
        })
    } else cardInProgressTask.innerHTML = '';
}


const criarTarefaConcluida = conta => {
    if (conta.concluido.length > 0) {
        cardDoneTask.innerHTML = '';
        conta.concluido.forEach(tarefa => {
            if (tarefa.status === 2 && tarefa.tipo === 'tarefa') {
                const li = document.createElement('li');
                li.classList.add('card__list-item', 'card__list-item--done');
                li.id = tarefa.id;

                const titulo = document.createElement('p');
                titulo.classList.add('card__list-text');
                titulo.textContent = tarefa.titulo;
                li.appendChild(titulo);

                const divOptions = document.createElement('div');
                divOptions.classList.add('container-options');

                //ESSES BOTÕES VÃO SER CRIADOS POR UMA FUNÇÃO
                const btnEditar = criarBtnEditar(tarefa);
                divOptions.appendChild(btnEditar);

                const btnVisualizar = criarBtnVisualizar(tarefa);
                divOptions.appendChild(btnVisualizar);

                const btnRemover = criarBtnRemover(tarefa);
                divOptions.appendChild(btnRemover);
                li.appendChild(divOptions);
                // FIM DO CONTAINER DE OPÇÕES


                const divStatus = document.createElement("div");
                divStatus.classList.add('container-status');

                const btnStatusInicial = criarBtnStatusInicial(tarefa);
                divStatus.appendChild(btnStatusInicial);

                const btnStatusAndamento = criarBtnStatusAndamento(tarefa);
                divStatus.appendChild(btnStatusAndamento);

                const btnStatusConcluido = criarBtnStatusConcluido(tarefa);
                divStatus.appendChild(btnStatusConcluido);
                li.appendChild(divStatus);

                cardDoneTask.appendChild(li);
            }
        })
    } else cardDoneTask.innerHTML = '';
}

const criarSubtarefaInicial = (conta, idTarefaPai = undefined) => {
    if (conta.parado.length > 0) {
        cardInitialSubtask.innerHTML = '';
        conta.parado.forEach(tarefa => {
            if (tarefa.status === 0 && tarefa.tipo === 'subtarefa' && tarefa.idR === idTarefaPai) {
                const li = document.createElement('li');
                li.classList.add('card__list-item', 'card__list-item--initial', `id-${tarefa.id}`);

                const descricao = document.createElement('p');
                descricao.classList.add('card__list-text');
                descricao.textContent = tarefa.descricao;
                li.appendChild(descricao);

                const divOptions = document.createElement('div');
                divOptions.classList.add('container-options');

                //ESSES BOTÕES VÃO SER CRIADOS POR UMA FUNÇÃO
                const btnEditar = criarBtnEditar(tarefa);
                divOptions.appendChild(btnEditar);

                const btnRemover = criarBtnRemoverSubtask(tarefa);
                divOptions.appendChild(btnRemover);
                li.appendChild(divOptions);
                // FIM DO CONTAINER DE OPÇÕES


                const divStatus = document.createElement("div");
                divStatus.classList.add('container-status');

                const btnStatusInicial = criarBtnStatusInicialSubtarefa(tarefa);
                divStatus.appendChild(btnStatusInicial);

                const btnStatusAndamento = criarBtnStatusAndamentoSubtarefa(tarefa);
                divStatus.appendChild(btnStatusAndamento);

                const btnStatusConcluido = criarBtnStatusConcluidoSubtarefa(tarefa);
                divStatus.appendChild(btnStatusConcluido);
                li.appendChild(divStatus);

                cardInitialSubtask.appendChild(li);
            }
        })
    } else cardInitialSubtask.innerHTML = '';
}

const criarSubtarefaConcluida = (conta, idTarefaPai = undefined) => {
    if (conta.concluido.length > 0) {
        cardDoneSubtask.innerHTML = '';
        conta.concluido.forEach(tarefa => {
            if (tarefa.status === 2 && tarefa.tipo === 'subtarefa' && tarefa.idR === idTarefaPai) {
                const li = document.createElement('li');
                li.classList.add('card__list-item', 'card__list-item--done', `id-${tarefa.id}`);

                const descricao = document.createElement('p');
                descricao.classList.add('card__list-text');
                descricao.textContent = tarefa.descricao;
                li.appendChild(descricao);

                const divOptions = document.createElement('div');
                divOptions.classList.add('container-options');

                //ESSES BOTÕES VÃO SER CRIADOS POR UMA FUNÇÃO
                const btnEditar = criarBtnEditar(tarefa);
                divOptions.appendChild(btnEditar);

                const btnRemover = criarBtnRemoverSubtask(tarefa);
                divOptions.appendChild(btnRemover);
                li.appendChild(divOptions);
                divOptions.appendChild(btnRemover);
                li.appendChild(divOptions);
                // FIM DO CONTAINER DE OPÇÕES


                const divStatus = document.createElement("div");
                divStatus.classList.add('container-status');

                const btnStatusInicial = criarBtnStatusInicialSubtarefa(tarefa);
                divStatus.appendChild(btnStatusInicial);

                const btnStatusAndamento = criarBtnStatusAndamentoSubtarefa(tarefa);
                divStatus.appendChild(btnStatusAndamento);

                const btnStatusConcluido = criarBtnStatusConcluidoSubtarefa(tarefa);
                divStatus.appendChild(btnStatusConcluido);
                li.appendChild(divStatus);

                cardDoneSubtask.appendChild(li);
            }
        })
    } else cardDoneSubtask.innerHTML = '';
}

const criarSubtarefaEmAndamento = (conta, idTarefaPai = undefined) => {
    if (conta.andamento.length > 0) {
        cardInProgressSubtask.innerHTML = '';
        conta.andamento.forEach(tarefa => {
            if (tarefa.status === 1 && tarefa.tipo === 'subtarefa' && tarefa.idR === idTarefaPai) {
                const li = document.createElement('li');
                li.classList.add('card__list-item', 'card__list-item--in-progress', `id-${tarefa.id}`);

                const descricao = document.createElement('p');
                descricao.classList.add('card__list-text');
                descricao.textContent = tarefa.descricao;
                li.appendChild(descricao);

                const divOptions = document.createElement('div');
                divOptions.classList.add('container-options');

                //ESSES BOTÕES VÃO SER CRIADOS POR UMA FUNÇÃO
                const btnEditar = criarBtnEditar(tarefa);
                divOptions.appendChild(btnEditar);

                const btnRemover = criarBtnRemoverSubtask(tarefa);
                divOptions.appendChild(btnRemover);
                li.appendChild(divOptions);
                divOptions.appendChild(btnRemover);
                li.appendChild(divOptions);
                // FIM DO CONTAINER DE OPÇÕES


                const divStatus = document.createElement("div");
                divStatus.classList.add('container-status');

                const btnStatusInicial = criarBtnStatusInicialSubtarefa(tarefa);
                divStatus.appendChild(btnStatusInicial);

                const btnStatusAndamento = criarBtnStatusAndamentoSubtarefa(tarefa);
                divStatus.appendChild(btnStatusAndamento);

                const btnStatusConcluido = criarBtnStatusConcluidoSubtarefa(tarefa);
                divStatus.appendChild(btnStatusConcluido);
                li.appendChild(divStatus);

                cardInProgressSubtask.appendChild(li);
            }
        })
    } else cardInProgressSubtask.innerHTML = '';
}





//TAREFAS FUNÇÕES DOS BOTÕES DE EDITAR / VISUALIZAR / REMOVER
function criarBtnVisualizar(tarefaAtual) {
    const btn = document.createElement('button');
    btn.classList.add('card__list-btn');
    btn.innerHTML = `<i class="fa-solid fa-eye"></i>`;

    btn.addEventListener('click', () => {
        ////////////////// ABRIR O MODAL VIEW //////////////////
        modalView.classList.remove('hidden');
        overlay.classList.remove('hidden');

        ////////////////// PREENCHER OS ELEMENTOS //////////////////
        modalViewTitulo.textContent = `${tarefaAtual.titulo}`;
        modalViewDescricao.textContent = `${tarefaAtual.descricao}`;
        subtaskId.value = tarefaAtual.id;

        criarSubtarefaInicial(contaAtual, tarefaAtual.id);
        criarSubtarefaEmAndamento(contaAtual, tarefaAtual.id);
        criarSubtarefaConcluida(contaAtual, tarefaAtual.id);
        atualizarInterfaceStatusSubtask(contaAtual, tarefaAtual.id);
    })

    return btn;
}

function criarBtnRemoverSubtask(tarefaAtual) {
    const btn = document.createElement('button');
    btn.classList.add('card__list-btn');
    btn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;



    btn.addEventListener('click', function () {
        document.querySelector(`.id-${tarefaAtual.id}`).remove();

        const indexParado = contaAtual.parado.findIndex(tarefa => tarefa.id === tarefaAtual.id && tarefa.tipo === tarefaAtual.tipo);

        if (indexParado >= 0) {
            //REMOVENDO O OBJETO DE SUBTAREFAS
            contaAtual.parado.splice(indexParado, 1);
        }

        const indexEmAndamento = contaAtual.andamento.findIndex(tarefa => tarefa.id === tarefaAtual.id && tarefa.tipo === tarefaAtual.tipo);

        if (indexEmAndamento >= 0) {
            //REMOVENDO O OBJETO DE SUBTAREFAS
            contaAtual.andamento.splice(indexEmAndamento, 1);
        }

        const indexConcluido = contaAtual.concluido.findIndex(tarefa => tarefa.id === tarefaAtual.id && tarefa.tipo === tarefaAtual.tipo);

        if (indexConcluido >= 0) {
            //REMOVENDO O OBJETO DE SUBTAREFAS
            contaAtual.concluido.splice(indexConcluido, 1);
        }

        atualizarInterfaceStatusSubtask(contaAtual, tarefaAtual.idR);
        localStorage.setItem('contas', JSON.stringify(contas));
    })

    return btn;
}

function criarBtnRemover(tarefaAtual) {
    const btn = document.createElement('button');
    btn.classList.add('card__list-btn');
    btn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;



    btn.addEventListener('click', function () {
        document.getElementById(`${tarefaAtual.id}`).remove();

        const indexParado = contaAtual.parado.findIndex(tarefa => tarefa.id === tarefaAtual.id && tarefa.tipo === tarefaAtual.tipo);

        if (indexParado >= 0) {
            contaAtual.parado = contaAtual.parado.filter(obj => !(obj.idR === tarefaAtual.id && obj.tipo === 'subtarefa'));
            contaAtual.andamento = contaAtual.andamento.filter(obj => !(obj.idR === tarefaAtual.id && obj.tipo === 'subtarefa'));
            contaAtual.concluido = contaAtual.concluido.filter(obj => !(obj.idR === tarefaAtual.id && obj.tipo === 'subtarefa'));

            //REMOVENDO O OBJETO DE TAREFAS
            contaAtual.parado.splice(indexParado, 1);

        }

        const indexEmAndamento = contaAtual.andamento.findIndex(tarefa => tarefa.id === tarefaAtual.id && tarefa.tipo === tarefaAtual.tipo);

        if (indexEmAndamento >= 0) {
            contaAtual.parado = contaAtual.parado.filter(obj => !(obj.idR === tarefaAtual.id && obj.tipo === 'subtarefa'));
            contaAtual.andamento = contaAtual.andamento.filter(obj => !(obj.idR === tarefaAtual.id && obj.tipo === 'subtarefa'));
            contaAtual.concluido = contaAtual.concluido.filter(obj => !(obj.idR === tarefaAtual.id && obj.tipo === 'subtarefa'));

            //REMOVENDO O OBJETO DE TAREFAS
            contaAtual.andamento.splice(indexEmAndamento, 1);
        }

        const indexConcluido = contaAtual.concluido.findIndex(tarefa => tarefa.id === tarefaAtual.id && tarefa.tipo === tarefaAtual.tipo);

        if (indexConcluido >= 0) {
            contaAtual.parado = contaAtual.parado.filter(obj => !(obj.idR === tarefaAtual.id && obj.tipo === 'subtarefa'));
            contaAtual.andamento = contaAtual.andamento.filter(obj => !(obj.idR === tarefaAtual.id && obj.tipo === 'subtarefa'));
            contaAtual.concluido = contaAtual.concluido.filter(obj => !(obj.idR === tarefaAtual.id && obj.tipo === 'subtarefa'));

            //REMOVENDO O OBJETO DE TAREFAS
            contaAtual.concluido.splice(indexConcluido, 1);
        }

        atualizarInterface(contaAtual);
        localStorage.setItem('contas', JSON.stringify(contas));
    })

    return btn;
}

function criarBtnEditar(tarefaAtual) {
    const btn = document.createElement('button');
    btn.classList.add('card__list-btn');
    btn.innerHTML = `<i class="fa-solid fa-pencil"></i>`;

    btn.addEventListener('click', function() {
        modalEdit.classList.remove('hidden');
        
        modalEditType.value = tarefaAtual.tipo;
        modalEditDescription.value = tarefaAtual.descricao;
        if(tarefaAtual.titulo) {
            modalEditTitle.value = tarefaAtual.titulo;
            modalEditTitle.disabled = false;
            modalEditId.value = tarefaAtual.id;
        } else {
            modalEditTitle.value = '';
            modalEditTitle.disabled = true;
            modalEditId.value = tarefaAtual.idR;
        }
    })

    return btn;
}

//TAREFAS FUNÇÕES DOS BOTÕES DE STATUS PARADO - EM ANDAMENTO - CONCLUIDO
function criarBtnStatusInicial(tarefaAtual) {
    const btn = document.createElement('button');
    btn.classList.add('card__list-btn-status');
    if (tarefaAtual.status === 0) btn.classList.add('card__list-btn-status--initial');
    btn.dataset.id = tarefaAtual.id;

    btn.addEventListener('click', function () {
        const btnStatusLista = document.querySelectorAll(`[data-id = '${tarefaAtual.id}']`);
        btnStatusLista.forEach(status => {
            status.classList.remove('card__list-btn-status--initial', 'card__list-btn-status--in-progress');
        })

        // this.classList.add('card__list-btn-status--initial');

        tarefaAtual.status = 0;

        //Achando o index da tarefa que vai ser jogada para o card parado
        const indexEmAndamento = contaAtual.andamento.findIndex(tarefa => tarefa.status === 0 && tarefa.tipo === 'tarefa');

        //Removendo essa tarefa do card atual
        if (indexEmAndamento >= 0) {
            const [element] = contaAtual.andamento.splice(indexEmAndamento, 1);

            //Adicionar a tarefa para o card desejado
            contaAtual.parado.push(element);
        }


        //Achando o index da tarefa que vai ser jogada para o card parado
        const indexConcluido = contaAtual.concluido.findIndex(tarefa => tarefa.status === 0 && tarefa.tipo === 'tarefa');

        //Removendo essa tarefa do card atual
        if (indexConcluido >= 0) {
            const [element] = contaAtual.concluido.splice(indexConcluido, 1);

            //Adicionar a tarefa para o card desejado
            contaAtual.parado.push(element);
        }

        //Atualizar a interface para o usuario
        atualizarInterface(contaAtual);
        localStorage.setItem('contas', JSON.stringify(contas));
    })

    return btn;
}

function criarBtnStatusAndamento(tarefaAtual) {
    const btn = document.createElement('button');
    btn.classList.add('card__list-btn-status');
    if (tarefaAtual.status === 1) btn.classList.add('card__list-btn-status--in-progress');
    btn.dataset.id = tarefaAtual.id;

    btn.addEventListener('click', function () {
        const btnStatusLista = document.querySelectorAll(`[data-id = '${tarefaAtual.id}']`);
        btnStatusLista.forEach(status => {
            status.classList.remove('card__list-btn-status--initial', 'card__list-btn-status--done');
        })

        // this.classList.add('card__list-btn-status--in-progress');

        tarefaAtual.status = 1;

        //Achando o index da tarefa que vai ser jogada para o card andamento
        const indexParado = contaAtual.parado.findIndex(tarefa => tarefa.status === 1 && tarefa.tipo === 'tarefa');

        //Removendo essa tarefa do card atual
        if (indexParado >= 0) {
            const [element] = contaAtual.parado.splice(indexParado, 1);

            //Adicionar a tarefa para o card desejado
            contaAtual.andamento.push(element);
        }


        //Achando o index da tarefa que vai ser jogada para o card parado
        const indexConcluido = contaAtual.concluido.findIndex(tarefa => tarefa.status === 1 && tarefa.tipo === 'tarefa');

        //Removendo essa tarefa do card atual
        if (indexConcluido >= 0) {
            const [element] = contaAtual.concluido.splice(indexConcluido, 1);

            //Adicionar a tarefa para o card desejado
            contaAtual.andamento.push(element);
        }

        //Atualizar a interface para o usuario
        atualizarInterface(contaAtual);
        localStorage.setItem('contas', JSON.stringify(contas));
    })

    return btn;
}

function criarBtnStatusConcluido(tarefaAtual) {
    const btn = document.createElement('button');
    btn.classList.add('card__list-btn-status');
    if (tarefaAtual.status === 2) btn.classList.add('card__list-btn-status--done');
    btn.dataset.id = tarefaAtual.id;

    btn.addEventListener('click', function () {
        const btnStatusLista = document.querySelectorAll(`[data-id = '${tarefaAtual.id}']`);
        btnStatusLista.forEach(status => {
            status.classList.remove('card__list-btn-status--initial', 'card__list-btn-status--in-progress');
        })

        // this.classList.add('card__list-btn-status--done');

        tarefaAtual.status = 2;

        //Achando o index da tarefa que vai ser jogada para o card andamento
        const indexParado = contaAtual.parado.findIndex(tarefa => tarefa.status === 2 && tarefa.tipo === 'tarefa');

        //Removendo essa tarefa do card atual
        if (indexParado >= 0) {
            const [element] = contaAtual.parado.splice(indexParado, 1);

            //Adicionar a tarefa para o card desejado
            contaAtual.concluido.push(element);
        }


        //Achando o index da tarefa que vai ser jogada para o card parado
        const indexEmAndamento = contaAtual.andamento.findIndex(tarefa => tarefa.status === 2 && tarefa.tipo === 'tarefa');

        //Removendo essa tarefa do card atual
        if (indexEmAndamento >= 0) {
            const [element] = contaAtual.andamento.splice(indexEmAndamento, 1);

            //Adicionar a tarefa para o card desejado
            contaAtual.concluido.push(element);
        }


        //Atualizar a interface para o usuario
        atualizarInterface(contaAtual);
        localStorage.setItem('contas', JSON.stringify(contas));

    })

    return btn;
}

//SUBTAREFAS FUNÇÕES DOS BOTÕES DE STATUS PARADO - EM ANDAMENTO - CONCLUIDO 
function criarBtnStatusInicialSubtarefa(tarefaAtual) {
    const btn = document.createElement('button');
    btn.classList.add('card__list-btn-status', `status-${tarefaAtual.id}`);
    if (tarefaAtual.status === 0) btn.classList.add('card__list-btn-status--initial');
    btn.id = tarefaAtual.id;

    btn.addEventListener('click', function () {
        const btnStatusLista = document.querySelectorAll(`status-${tarefaAtual.id}`);
        btnStatusLista.forEach(status => {
            status.classList.remove('card__list-btn-status--initial', 'card__list-btn-status--in-progress');
        })

        // this.classList.add('card__list-btn-status--initial');

        tarefaAtual.status = 0;

        //Achando o index da tarefa que vai ser jogada para o card parado
        const indexEmAndamento = contaAtual.andamento.findIndex(tarefa => tarefa.status === 0 && tarefa.tipo === 'subtarefa');

        //Removendo essa tarefa do card atual
        if (indexEmAndamento >= 0) {
            const [element] = contaAtual.andamento.splice(indexEmAndamento, 1);

            //Adicionar a tarefa para o card desejado
            contaAtual.parado.push(element);
        }


        //Achando o index da tarefa que vai ser jogada para o card parado
        const indexConcluido = contaAtual.concluido.findIndex(tarefa => tarefa.status === 0 && tarefa.tipo === 'subtarefa');

        //Removendo essa tarefa do card atual
        if (indexConcluido >= 0) {
            const [element] = contaAtual.concluido.splice(indexConcluido, 1);

            //Adicionar a tarefa para o card desejado
            contaAtual.parado.push(element);
        }

        //Atualizar a interface para o usuario
        atualizarInterface(contaAtual, tarefaAtual.idR);
        localStorage.setItem('contas', JSON.stringify(contas));
    })

    return btn;
}

function criarBtnStatusAndamentoSubtarefa(tarefaAtual) {
    const btn = document.createElement('button');
    btn.classList.add('card__list-btn-status', `status-${tarefaAtual.id}`);
    if (tarefaAtual.status === 1) btn.classList.add('card__list-btn-status--in-progress');

    btn.addEventListener('click', function () {
        const btnStatusLista = document.querySelectorAll(`status-${tarefaAtual.id}`);
        btnStatusLista.forEach(status => {
            status.classList.remove('card__list-btn-status--initial', 'card__list-btn-status--done');
        })

        // this.classList.add('card__list-btn-status--in-progress');

        tarefaAtual.status = 1;

        //Achando o index da tarefa que vai ser jogada para o card andamento
        const indexParado = contaAtual.parado.findIndex(tarefa => tarefa.status === 1 && tarefa.tipo === 'subtarefa');

        //Removendo essa tarefa do card atual
        if (indexParado >= 0) {
            const [element] = contaAtual.parado.splice(indexParado, 1);

            //Adicionar a tarefa para o card desejado
            contaAtual.andamento.push(element);
        }


        //Achando o index da tarefa que vai ser jogada para o card parado
        const indexConcluido = contaAtual.concluido.findIndex(tarefa => tarefa.status === 1 && tarefa.tipo === 'subtarefa');

        //Removendo essa tarefa do card atual
        if (indexConcluido >= 0) {
            const [element] = contaAtual.concluido.splice(indexConcluido, 1);

            //Adicionar a tarefa para o card desejado
            contaAtual.andamento.push(element);
        }

        //Atualizar a interface para o usuario
        atualizarInterface(contaAtual, tarefaAtual.idR);
        localStorage.setItem('contas', JSON.stringify(contas));
    })

    return btn;
}

function criarBtnStatusConcluidoSubtarefa(tarefaAtual) {
    const btn = document.createElement('button');
    btn.classList.add('card__list-btn-status');
    if (tarefaAtual.status === 2) btn.classList.add('card__list-btn-status--done');
    btn.dataset.id = tarefaAtual.id;

    btn.addEventListener('click', function () {
        const btnStatusLista = document.querySelectorAll(`[data-id = '${tarefaAtual.id}']`);
        btnStatusLista.forEach(status => {
            status.classList.remove('card__list-btn-status--initial', 'card__list-btn-status--in-progress');
        })

        // this.classList.add('card__list-btn-status--done');

        tarefaAtual.status = 2;

        //Achando o index da tarefa que vai ser jogada para o card andamento
        const indexParado = contaAtual.parado.findIndex(tarefa => tarefa.status === 2 && tarefa.tipo === 'subtarefa');

        //Removendo essa tarefa do card atual
        if (indexParado >= 0) {
            const [element] = contaAtual.parado.splice(indexParado, 1);

            //Adicionar a tarefa para o card desejado
            contaAtual.concluido.push(element);
        }


        //Achando o index da tarefa que vai ser jogada para o card parado
        const indexEmAndamento = contaAtual.andamento.findIndex(tarefa => tarefa.status === 2 && tarefa.tipo === 'subtarefa');

        //Removendo essa tarefa do card atual
        if (indexEmAndamento >= 0) {
            const [element] = contaAtual.andamento.splice(indexEmAndamento, 1);

            //Adicionar a tarefa para o card desejado
            contaAtual.concluido.push(element);
        }


        //Atualizar a interface para o usuario
        atualizarInterface(contaAtual, tarefaAtual.idR);
        localStorage.setItem('contas', JSON.stringify(contas));

    })

    return btn;
}

function atualizarInterface(conta, idPai = undefined) {
    //ATUALIZANDO A INTERFACE DO CARD DE TAREFAS INICIAIS
    criarTarefaInicial(conta);

    //ATUALIZANDO A INTERFACE DO CARD DE TAREFAS EM ANDAMENTO
    criarTarefaEmAndamento(conta);

    //ATUALIZANDO A INTERFACE DO CARD DE TAREFAS CONCLUIDAS
    criarTarefaConcluida(conta);

    // ATUALIZANDO OS VALORES DO STATUS DA TAREFA
    atualizarInterfaceStatusTask(conta);

    //ATUALIZANDO A INTERFACE DO CARD DE TAREFAS INICIAIS
    criarSubtarefaInicial(conta, idPai);

    //ATUALIZANDO A INTERFACE DO CARD DE TAREFAS INICIAIS
    criarSubtarefaEmAndamento(conta, idPai);

    //ATUALIZANDO A INTERFACE DO CARD DE TAREFAS INICIAIS
    criarSubtarefaConcluida(conta, idPai);

    // ATUALIZANDO OS VALORES DO STATUS DA SUBTAREFA
    atualizarInterfaceStatusSubtask(conta, idPai);


    //SALVANDO AS ALTERAÇÕES NO LOCAL STORAGE
    localStorage.setItem('contas', JSON.stringify(contas));
}




// Função para encontrar o maior id em um array
const getMaxId = (array) => {
    return array.reduce((max, item) => (item.id > max ? item.id : max), -1);
};


//FUNÇÃO PARA MOSTRAR O STATUS DE DESENVOLVIMENTO
function atualizarInterfaceStatusTask(conta) {
    let parado, andamento, concluido
    //Somando a quantidade de tarefas paradas
    if (conta.parado.length > 0) {
        parado = conta.parado.filter(tarefa => tarefa.tipo === 'tarefa').length;
    } else parado = 0;

    if (conta.andamento.length > 0) {
        andamento = conta.andamento.filter(tarefa => tarefa.tipo === 'tarefa').length;
    } else andamento = 0;

    if (conta.concluido.length > 0) {
        concluido = conta.concluido.filter(tarefa => tarefa.tipo === 'tarefa').length;
    } else concluido = 0;


    // const parado = conta.parado.length ? conta.parado.length : 0;
    // const andamento = conta.andamento.length ? conta.andamento.length : 0;
    // const concluido = conta.concluido.length ? conta.concluido.length : 0;

    statusInitialTask.textContent = parado;
    statusInProgressTask.textContent = andamento;
    statusDoneTask.textContent = concluido;
}

function atualizarInterfaceStatusSubtask(conta, idPai) {
    let parado, andamento, concluido
    //Somando a quantidade de tarefas paradas
    if (conta.parado.length > 0) {
        parado = conta.parado.filter(tarefa => tarefa.tipo === 'subtarefa' && tarefa.idR === idPai).length;
    } else parado = 0;

    if (conta.andamento.length > 0) {
        andamento = conta.andamento.filter(tarefa => tarefa.tipo === 'subtarefa' && tarefa.idR === idPai).length;
    } else andamento = 0;

    if (conta.concluido.length > 0) {
        concluido = conta.concluido.filter(tarefa => tarefa.tipo === 'subtarefa' && tarefa.idR === idPai).length;
    } else concluido = 0;


    // const parado = conta.parado.length ? conta.parado.length : 0;
    // const andamento = conta.andamento.length ? conta.andamento.length : 0;
    // const concluido = conta.concluido.length ? conta.concluido.length : 0;

    statusInitialSubtask.textContent = parado;
    statusInProgressSubtask.textContent = andamento;
    statusDoneSubtask.textContent = concluido;
}




//EVENT LISTENERS
//Botão de chamada do formulário de cadastro
btnChamarFormRegistro.addEventListener('click', e => {
    e.preventDefault();
    displayFormRegistro();
    loginError.classList.add('hidden');
    nomeInputLogin.value = pinInputLogin.value = '';
})

//Formulário de cadastro
btnRegistrar.addEventListener('click', e => {
    e.preventDefault();

    const nome = nomeInputRegistro.value;
    const sobrenome = sobrenomeInputRegistro.value;
    if (nome !== '' && sobrenome !== '') {


        const novaConta = {
            id: contas[contas.length - 1] ? (contas[contas.length - 1]).id + 1 : 0,
            dono: `${nome} ${sobrenome}`,
            parado: [],
            andamento: [],
            concluido: [],
            pin: criarSenha(),
        }

        contas.push(novaConta);
        criarUsuario(contas);
        contaAtual = novaConta;

        displayMensagem(novaConta);
        displayFormRegistro();

        localStorage.setItem('contas', JSON.stringify(contas));
        nomeInputRegistro.value = sobrenomeInputRegistro.value = '';
    }
})

btnCloseRegister.addEventListener('click', e => {
    e.preventDefault();
    displayFormRegistro();
})

//Formulário de login
btnEntrar.addEventListener('click', e => {
    e.preventDefault();

    if (nomeInputLogin.value !== '' && pinInputLogin.value !== '') {
        if (contas.length > 0) {
            contas.forEach(conta => {

                if (nomeInputLogin.value.toLowerCase() === conta.usuario && +pinInputLogin.value === conta.pin) {
                    contaAtual = conta;
                    msg.classList.add('hidden');
                    loginError.classList.add('hidden');
                    containerForm.classList.add('hidden');
                    app.classList.remove('hidden');
                    atualizarInterface(contaAtual);
                } else {
                    loginError.classList.remove('hidden');
                    pinInputLogin.value = '';
                }
            })
        }

    }
})

btnShowAccs.addEventListener('click', e => {
    e.preventDefault();
    if (contas.length > 0) {
        modalAccs.classList.remove('hidden');
        overlay.classList.remove('hidden');

        mostrarContas();
    } else return;

})

modalAccClose.addEventListener('click', () => {
    modalAccs.classList.add('hidden');
    overlay.classList.add('hidden');
})


/////////////////////// FORMULÁRIO TASK ///////////////////////
taskBtn.addEventListener('click', e => {
    e.preventDefault();

    if (taskTitle.value !== '') {

        // Encontrar o maior id em todos os arrays de tarefas
        const maxIdParado = getMaxId(contaAtual.parado.filter(tarefa => tarefa.tipo === 'tarefa'));
        const maxIdAndamento = getMaxId(contaAtual.andamento.filter(tarefa => tarefa.tipo === 'tarefa'));
        const maxIdConcluido = getMaxId(contaAtual.concluido.filter(tarefa => tarefa.tipo === 'tarefa'));

        // Determinar o maior id geral
        const maxId = Math.max(maxIdParado, maxIdAndamento, maxIdConcluido);

        // Novo id será o maior id + 1 (se nenhum id for encontrado, começará em 0)
        const newId = maxId === -1 ? 0 : maxId + 1;

        const itemAtual = {
            id: newId,
            titulo: `${taskTitle.value}`,
            descricao: `${taskDescription.value}`,
            status: 0,
            tipo: 'tarefa',
            data: new Date().toISOString(),
            modificado: new Date().toISOString(),
        }

        contaAtual.parado.push(itemAtual);

        criarTarefaInicial(contaAtual);
        atualizarInterface(contaAtual);

        taskTitle.value = taskDescription.value = '';
        localStorage.setItem('contas', JSON.stringify(contas));
    }
})

/////////////////////// MODAL VIEW ///////////////////////
modalViewClose.addEventListener('click', () => {
    modalView.classList.add('hidden');
    overlay.classList.add('hidden');
})

/////////////////////// FORMULÁRIO SUBTASK ///////////////////////
subtaskBtn.addEventListener('click', e => {
    e.preventDefault();

    if (subtaskDescription.value !== '') {

        // Encontrar o maior id em todos os arrays de tarefas
        const maxIdParado = getMaxId(contaAtual.parado.filter(tarefa => tarefa.tipo === 'subtarefa'));
        const maxIdAndamento = getMaxId(contaAtual.andamento.filter(tarefa => tarefa.tipo === 'subtarefa'));
        const maxIdConcluido = getMaxId(contaAtual.concluido.filter(tarefa => tarefa.tipo === 'subtarefa'));

        // Determinar o maior id geral
        const maxId = Math.max(maxIdParado, maxIdAndamento, maxIdConcluido);

        // Novo id será o maior id + 1 (se nenhum id for encontrado, começará em 0)
        const newId = maxId === -1 ? 0 : maxId + 1;

        const itemAtual = {
            id: newId,
            descricao: `${subtaskDescription.value}`,
            status: 0,
            tipo: 'subtarefa',
            data: new Date().toISOString(),
            modificado: new Date().toISOString(),
            idR: +subtaskId.value,
        }

        contaAtual.parado.push(itemAtual);

        criarSubtarefaInicial(contaAtual, +subtaskId.value);
        atualizarInterfaceStatusSubtask(contaAtual, +subtaskId.value);
        localStorage.setItem('contas', JSON.stringify(contas));
        subtaskDescription.value = '';
    }
})

/////////////////////// FORMULÁRIO EDIÇÃO ///////////////////////
modalEditBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const tarefaParada = contaAtual.parado.find(tarefa => tarefa.id === +modalEditId.value && tarefa.tipo === modalEditType.value);
    const tarefaEmAndamento = contaAtual.andamento.find(tarefa => tarefa.id === +modalEditId.value && tarefa.tipo === modalEditType.value);
    const tarefaConcluida = contaAtual.concluido.find(tarefa => tarefa.id === +modalEditId.value && tarefa.tipo === modalEditType.value);

    if(tarefaParada) {
        if(modalEditTitle.value !== '') {
            tarefaParada.titulo = modalEditTitle.value;
            tarefaParada.descricao = modalEditDescription.value;
        } else {
            tarefaParada.descricao = modalEditDescription.value;
        }
    }

    if(tarefaEmAndamento) {
        if(modalEditTitle.value !== '') {
            tarefaEmAndamento.titulo = modalEditTitle.value;
            tarefaEmAndamento.descricao = modalEditDescription.value;
        } else {
            tarefaEmAndamento.descricao = modalEditDescription.value;
        }
    }

    if(tarefaConcluida) {
        if(modalEditTitle.value !== '') {
            tarefaConcluida.titulo = modalEditTitle.value;
            tarefaConcluida.descricao = modalEditDescription.value;
        } else {
            tarefaConcluida.descricao = modalEditDescription.value;
        }
    }
    
    atualizarInterface(contaAtual, +modalEditId.value)
    modalEdit.classList.add('hidden');
    modalEditId.value = modalEditType.value = modalEditTitle.value = modalEditDescription.value = '';
    localStorage.setItem('contas', JSON.stringify(contas));
});


modalEditClose.addEventListener('click', () => {
    modalEdit.classList.add('hidden');
})