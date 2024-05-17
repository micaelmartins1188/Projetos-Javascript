'use strict';

//ELEMENTS

//MESSAGE ACCOUNT CREATED
const info = document.querySelector('.info');
const formRegister = document.querySelector('.info__right ');
const infoMessage = document.querySelector('.info__message');
const infoUser = document.querySelector('.info__text--user');
const infoPin = document.querySelector('.info__text--pin');
const btnCallFormRegister = document.querySelector('.btn--new-acc');
const btnCloseMessage = document.getElementById('message-btn');
const infoErrorLogin = document.querySelector('.info__left-error');

//NEW ACCOUNT
const registerName = document.getElementById("register-name");
const registerSurname = document.getElementById("register-surname");
const registerCurrentBalance = document.getElementById("register-current-balance");
const registerBtn = document.getElementById('register-btn');

// LOGIN
const loginUser = document.getElementById('login-user');
const loginPin = document.getElementById('login-pin');
const btnLogin = document.getElementById('login-btn');


//MODAL FORGOT ACCOUNT
const btnMostrarModalAcc = document.querySelector('.btn--forgot');
const modalAcc = document.querySelector('.modal__acc');
const btnFecharModalAcc = document.getElementById('close-modal-acc');
const divAccCards = document.querySelector('.modal__acc-cards');

//OVERLAY
const overlay = document.querySelector('.overlay');


//MODAL INFO
const btnModalInfo = document.querySelectorAll('.expenses__heading--question');
const btnFecharModalInfo = document.getElementById('close-modal-info');
const modalInfo = document.querySelector('.modal__info');

//APP
const app = document.querySelector('.app');

//BALANCE
const saldoBalance = document.getElementById('value-current')
const saldoPrevistoBalance = document.getElementById('value-expected');
const entradaBalance = document.getElementById('value-in');
const saidaBalance = document.getElementById('value-out');
const resultadoBalance = document.getElementById('value-result');


//BOTÃO FILTRO
const filtroSelect = document.getElementById('filter-select-year');

// MESES DA ESTATISTICAS
const mesesEntrada = document.querySelectorAll('.month-in');
const mesesSaida = document.querySelectorAll('.month-out');
const mesesResultado = document.querySelectorAll('.month-result');
const entradaAnual = document.getElementById('value-in--yearly');
const saidaAnual = document.getElementById('value-out--yearly');
const resultadoAnual = document.getElementById('value-result--yearly');
const tituloEstatistica = document.getElementById('statistic-year-heading');


//ENTRADA FORMULÁRIO
const eTabela = document.getElementById('e-tbody');
const eInputDescricao = document.getElementById('description-e');
const eInputValor = document.getElementById('value-e');
const eInputVencimento = document.getElementById('date-e');
const eBtn = document.getElementById('e-btn');
const eTotal = document.querySelector('.expenses__in--value');


//DESPESA FIXA FORMULÁRIO
const dfTabela = document.getElementById('df-tbody');
const dfInputDescricao = document.getElementById('description-df');
const dfInputValor = document.getElementById('value-df');
const dfInputVencimento = document.getElementById('date-df');
const dfBtn = document.getElementById('df-btn');
const dfTotal = document.getElementById('df-total');

//DESPESA VARIÁVEL FORMULÁRIO
const dvTabela = document.getElementById('dv-tbody');
const dvInputDescricao = document.getElementById('description-dv');
const dvInputValor = document.getElementById('value-dv');
const dvBtn = document.getElementById('dv-btn');
const dvTotal = document.getElementById('dv-total');

//CARTÃO DE CRÉDITO FORMULÁRIO
const ccTabela = document.getElementById('cc-tbody');
const ccInputDescricao = document.getElementById('description-cc');
const ccInputValor = document.getElementById('value-cc');
const ccInputParcelas = document.getElementById('parcels-cc');
const ccInputVencimento = document.getElementById('date-cc');
const ccBtn = document.getElementById('cc-btn');
const ccTotal = document.getElementById('cc-total');
const ccTotalMensal = document.getElementById('cc-total-monthly');

//TABELA DA DESPESA MENSAL
const dmTabela = document.getElementById('dm-tbody');
const dmTotal = document.getElementById('dm-total');

//TABELA DE DESPESAS PENDENTES
const dpTabela = document.getElementById('dp-tbody');

//CRIANDO UM ARRAY PARA ARMAZENAR ENTRADA, SAIDA e Resultado
const despesasPrevistas = [0, 0, 0];

//CRIANDO UM ARRAY PARA ARMAZENAR saldo atual E saldo previsto
const saldos = [0, 0];


const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

////////////////////////////////////////////////////////////////////////////////////


//FUNCTIONS

//PASSWORD - GENERATE RANDOM NUMBERS
const generatePassword = function () {
    const number = Math.trunc(Math.random() * 999) + 1;
    return number;
}

// CREATE USERNAME
const createUsername = function (accs) {
    accs.forEach(acc => acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join(''));
}

//DISPLAY FORM REGISTER NEW ACCOUNT and INFO about ACC
const displayRegister = function () {
    formRegister.classList.toggle('hidden');
    if (!infoMessage.classList.contains('hidden')) {
        infoMessage.classList.add('hidden');
    }
    infoErrorLogin.classList.add('hidden');
}


//FUNCÇÃO DE ADICIONAR MESES
function adicionarMeses(data, numeroMeses) {
    let novaData = new Date(data); // copia a data para evitar mutação

    //Incrementa o número de meses
    novaData.setMonth(data.getMonth() + numeroMeses);

    //Retorna o mês com o incremento
    return novaData;
}


//FUNÇÃO FORMATAR DATA
function formatarData(data) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }

    return Intl.DateTimeFormat('pt-br', options).format(new Date(data));
}


//FUNÇÃO FORMATAR DINHEIRO
function formatarDinheiro(valor) {
    // const options = {
    //     style: 'currency',
    //     currency: 'BRL',
    // }

    return new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL',
    }).format(valor);
}


//FUNÇÃO CRIAR OS DADOS DA TABELA DE ENTRADA
function criarTabelaEntrada(conta) {
    eTabela.innerHTML = '';

    if (conta.entrada.length > 0) {
        conta.entrada.forEach(item => {

            const lista = document.createElement('tr');
            lista.classList.add("e-tr");
            lista.dataset.id = item.id
            lista.innerHTML = `<td>${item.descricao}</td>
            <td>${formatarDinheiro(item.valor)}</td>
            <td>${formatarData(new Date(item.vencimento))}</td>
            `;

            //criar um td para o status
            const tdStatus = document.createElement('td');
            const btnStatus = criarBtnStatusEntrada(conta, item);
            tdStatus.appendChild(btnStatus);
            lista.appendChild(tdStatus);

            const td = document.createElement('td');
            const btnRemover = criarBotaoRemover(conta, item);
            td.appendChild(btnRemover);

            lista.appendChild(td);
            eTabela.appendChild(lista);

        })
    } else return;

}

//FUNÇÃO CRIAR O BOTÃO DE STATUS DA TABELA DE ENTRADA
function criarBtnStatusEntrada(conta, despesa) {
    const btn = document.createElement('button');
    btn.classList.add('expenses__btn', 'expenses__btn--not-received', `e-status--${despesa.id}`);
    btn.innerText = 'não';

    btn.addEventListener('click', function () {
        if (this.classList.contains('expenses__btn--not-received')) {
            this.classList.remove('expenses__btn--not-received');
            this.classList.add('expenses__btn--received');
            this.textContent = 'sim';

            despesa.pago = 1;
            atualizarValorTotalDasTabelas(conta);
            attStatusEntrada(conta);
            attBalance(conta);

            localStorage.setItem('accounts', JSON.stringify(accounts));
            return;
        } else {
            this.classList.add('expenses__btn--not-received');
            this.classList.remove('expenses__btn--received');
            this.textContent = 'não';

            despesa.pago = 0;
            atualizarValorTotalDasTabelas(conta);
            attStatusEntrada(conta);
            attBalance(conta);

            localStorage.setItem('accounts', JSON.stringify(accounts));
            return;
        }
    })

    return btn;
}

//FUNÇÃO CRIAR OS DADOS DA TABELA DE DESPESAS FIXAS
function criarTabelaDF(conta) {
    dfTabela.innerHTML = '';
    if (conta.df.length > 0) {
        conta.df.forEach(item => {

            const lista = document.createElement('tr');
            lista.classList.add("df-tr");
            lista.dataset.id = item.id;
            lista.innerHTML = `<td>${item.descricao}</td>
            <td>${formatarDinheiro(item.valor)}</td>
            <td>Dia ${new Date(item.vencimento).getDate()}</td>
            `;

            const td = document.createElement('td');
            const btnRemover = criarBotaoRemover(conta, item);
            td.appendChild(btnRemover);

            lista.appendChild(td);
            dfTabela.appendChild(lista);
        })
    } else return;

}


//FUNÇÃO CRIAR OS DADOS DA TABELA DE DESPESAS VARIAVEIS
function criarTabelaDV(conta) {
    dvTabela.innerHTML = '';
    if (conta.dv.length > 0) {
        conta.dv.forEach(item => {
            if (new Date(item.vencimento).getMonth() === new Date().getMonth() && new Date(item.vencimento).getFullYear() === new Date().getFullYear()) {
                const lista = document.createElement('tr');
                lista.classList.add("dv-tr");
                lista.dataset.id = item.id
                lista.innerHTML = `<td>${item.descricao}</td>
            <td>${formatarDinheiro(item.valor)}</td>
            <td>${formatarData(new Date(item.vencimento))}</td>
            `;

                const td = document.createElement('td');
                const btnRemover = criarBotaoRemover(conta, item);
                td.appendChild(btnRemover);

                lista.appendChild(td);
                dvTabela.appendChild(lista);
            }
        })
    } else return;

}


//FUNÇÃO CRIAR OS DADOS DA TABELA DE DESPESAS DO CARTÃO DE CRÉDITO
function criarTabelaCC(conta) {
    ccTabela.innerHTML = '';

    if (conta.cc.length > 0) {
        conta.cc.forEach(item => {

            const lista = document.createElement('tr');
            lista.classList.add("cc-tr");
            lista.dataset.id = item.id
            lista.innerHTML = `<td>${item.descricao}</td>
            <td>${formatarDinheiro(item.valor)}</td>
            <td>${item.parcelas}</td>
            <td>${formatarDinheiro(item.valorDaParcela)}</td>
            `;

            //criar um td para o status
            const tdStatus = document.createElement('td');
            const btnStatus = criarBtnStatusCC(item);
            tdStatus.appendChild(btnStatus);

            const btnAttStatus = atualizarBtnStatusCC(conta, item);
            tdStatus.appendChild(btnAttStatus);
            lista.appendChild(tdStatus);

            const td = document.createElement('td');
            const btnRemover = criarBotaoRemover(conta, item);
            td.appendChild(btnRemover);

            lista.appendChild(td);
            ccTabela.appendChild(lista);

        })
    } else return;

}


//CRIANDO O BOTÃO DE REMOVER ITEM DA LISTA (criar um padrão para ser reutilizado pelas outras tabelas)
function criarBotaoRemover(conta, despesa) {
    const btn = document.createElement('button');
    btn.classList.add('expenses__btn', 'expenses__btn--remove');
    btn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    btn.addEventListener('click', function () {
        //REMOVENDO OS DADOS DA TABELA PARA O USUÁRIO
        const tr = btn.closest('tr');
        if (tr) tr.remove();

        //esse debaixo não funciona de imediato, só no segundo clique 
        //porque existem varios TR (esse meio de remoção não funciona para este projeto)
        // const tr = document.querySelector(`[data-id = '${despesa.id}']`);
        // if (tr) {
        //     tr.remove();
        // }


        if (despesa.tipo === 'e') {
            //REMOVENDO A ENTRADA DA CONTA DO USUARIO
            conta.entrada.splice(conta.entrada.findIndex(elemento => elemento.id === despesa.id), 1);
            atualizarValorTotalDasTabelas(conta);
            attBalance(conta);
            mostrarDP(conta);
        }

        if (despesa.tipo === 'df') {
            //REMOVENDO A DESPESA FIXA DA CONTA DO USUARIO
            conta.df.splice(conta.df.findIndex(elemento => elemento.id === despesa.idR), 1);

            //REMOVENDO TODAS AS DESPESAS CRIADAS DA DESPESA FIXA REFERENTE HÁ DESPESA REMOVIDA
            conta.despesas = conta.despesas.filter(obj => !(obj.idR === despesa.id && obj.descricao === despesa.descricao && obj.tipo === despesa.tipo));
            //ESTAMOS FAZENDO ALTERAÇÃO DIRETA NO ARRAY DE DESPESAS
            //(SE O OBJETO.ID === O ID DA DESPESA REMOVIDA && SE O OBJETO.DESCRICAO === DESCRICAO DA DESPESA REMOVIDA && SE O OBJETO.TIPO === TIPO DA DESPESA REMOVIDA) => TUDO ISSO VAI DAR TRUE
            // ENTÃO FICARIA FILTRADO SOMENTE O ITEM REMOVIDO, 
            //PORÉM FOI COLOCADO O "!" SINAL DE NEGAÇÃO, SE FOR TRUE SERÁ FALSO. ENTÃO SERÁ FILTRADO APENAS AS DESPESAS QUE SÃO DIFERENTES DA DESPESA REMOVIDA
            atualizarValorTotalDasTabelas(conta);
            attBalance(conta);
            mostrarDP(conta);
        }

        if (despesa.tipo === 'dv') {
            //REMOVENDO A DESPESA FIXA DA CONTA DO USUARIO
            conta.dv.splice(conta.dv.findIndex(elemento => elemento.id === despesa.idR), 1);

            //REMOVENDO TODAS AS DESPESAS CRIADAS DA DESPESA FIXA REFERENTE HÁ DESPESA REMOVIDA
            conta.despesas = conta.despesas.filter(obj => !(obj.idR === despesa.id && obj.descricao === despesa.descricao && obj.tipo === despesa.tipo));

            atualizarValorTotalDasTabelas(conta);
            attBalance(conta);
            mostrarDP(conta);
        }

        if (despesa.tipo === 'cc') {
            //REMOVENDO A DESPESA FIXA DA CONTA DO USUARIO
            conta.cc.splice(conta.cc.findIndex(elemento => elemento.id === despesa.idR), 1);

            //REMOVENDO TODAS AS DESPESAS CRIADAS DA DESPESA FIXA REFERENTE HÁ DESPESA REMOVIDA
            conta.despesas = conta.despesas.filter(obj => !(obj.idR === despesa.id && obj.descricao === despesa.descricao && obj.tipo === despesa.tipo));

            atualizarValorTotalDasTabelas(conta);
            attBalance(conta);
            mostrarDP(conta);
        }

        localStorage.setItem('accounts', JSON.stringify(accounts));

        if (conta.despesas.length > 0) {
            atualizarDM();
            mostrarDM(conta);
        } else {
            dmTabela.innerHTML = '';
            conta.dm = [];
        }
    })

    return btn;
}

//  FUNÇÃO ATUALIZAR O STATUS DO CARTÃO DE CRÉDITO
function atualizarBtnStatusCC(conta, despesa) {
    const btn = document.createElement('button');
    btn.classList.add('expenses__btn', 'expenses__btn--waiting', `cc-status--${despesa.id}`);
    btn.innerHTML = '<i class="fa-solid fa-rotate"></i>';
    //  Escondi o botão porque o status está funcionando automaticamente
    //Caso ele dê problemas só comentar o código abaixo, ele foi feito para ser atualizado manualmente
    //caso o modo automatico não funcione
    btn.style.display = 'none';

    btn.addEventListener('click', function () {
        attStatusCC(conta, despesa);
    })

    return btn;
}


//FUNÇÃO CRIAR O BOTÃO DE STATUS DA TABELA DE CARTÃO DE CRÉDITOS
function criarBtnStatusCC(despesa) {
    const btn = document.createElement('button');
    btn.classList.add('expenses__btn', 'expenses__btn--waiting', `cc-status--${despesa.id}`);
    btn.innerText = 'em andamento';

    return btn;
}


//ATUALIZAR STATUS DA DESPESA CC
function attStatusCC(conta, despesa) {
    if (despesa.tipo === 'cc') {
        const statusDespesas = [];

        //to fazendo uma varredura no array de despesas e comparando com a despesa atual do cc (que é de onde o botão status faz parte) a despesa seria a despesa atual
        conta.despesas.forEach(obj => {
            if (obj.idR === despesa.id && obj.descricao === despesa.descricao && obj.tipo === despesa.tipo && despesa.tipo === 'cc') {
                statusDespesas.push(obj)
            }
        })

        //fazendo a soma das parcelas para saber se foram pagas
        const parcelasPagas = statusDespesas.reduce((contador, despesaPaga) => contador + despesaPaga.pago, 0);

        // console.log(parcelasPagas);
        // console.log(statusDespesas);

        if (parcelasPagas === despesa.parcelas) {

            despesa.done = 1;
            atualizarValorTotalDasTabelas(conta);
            attBalance(conta);
            localStorage.setItem('accounts', JSON.stringify(accounts));

            document.querySelector(`.cc-status--${despesa.id}`).classList.remove('expenses__btn--waiting');
            document.querySelector(`.cc-status--${despesa.id}`).classList.add('expenses__btn--done');
            document.querySelector(`.cc-status--${despesa.id}`).textContent = 'finalizado';
        }

        if ((parcelasPagas !== despesa.parcelas)) {
            despesa.done = 0;
            atualizarValorTotalDasTabelas(conta);
            attBalance(conta);
            localStorage.setItem('accounts', JSON.stringify(accounts));

            document.querySelector(`.cc-status--${despesa.id}`).classList.add('expenses__btn--waiting');
            document.querySelector(`.cc-status--${despesa.id}`).classList.remove('expenses__btn--done');
            document.querySelector(`.cc-status--${despesa.id}`).textContent = 'em andamento';
        }

    }

}

//CHECK NAS DESPESAS DE CRÉDITO PARA SABER SE JÁ FOI QUITADA
function checkStatusCC(conta) {
    conta.cc.forEach(despesa => {
        if (despesa.done) {
            document.querySelector(`.cc-status--${despesa.id}`).classList.remove('expenses__btn--waiting');
            document.querySelector(`.cc-status--${despesa.id}`).classList.add('expenses__btn--done');
            document.querySelector(`.cc-status--${despesa.id}`).textContent = 'finalizado';
        }
    })
}


//ATUALIZAR DESPESAS MENSAIS
function atualizarDM() {
    //ADIONANDO AS DESPESAS DO MÊS ATUAL DENTRO DO OBJETO dm => despesas mensais
    currentAccount.dm = [];
    currentAccount.despesas.forEach(conta => {
        if (new Date(conta.vencimento).getMonth() === new Date().getMonth() && new Date(conta.vencimento).getFullYear() === new Date().getFullYear()) {

            currentAccount.dm.push(conta)

        }
    })
}


function mostrarDM(conta) {
    if (conta.despesas.length > 0) {
        dmTabela.innerHTML = '';

        //Se quizer deixar todas as despesas é só tirar o método filter e deixar o forEach
        //Ficando assim => conta.despesas.forEach()

        /* DEPOIS ADICIONAR DE VOLTA O FILTER ANTES DO FOREACH
        .filter(despesa => new Date(despesa.vencimento).getMonth() === new Date().getMonth() && new Date(despesa.vencimento).getFullYear() === new Date().getFullYear())
        */
        conta.despesas.filter(despesa => new Date(despesa.vencimento).getMonth() === new Date().getMonth() && new Date(despesa.vencimento).getFullYear() === new Date().getFullYear()).forEach(item => {

            const lista = document.createElement('tr');
            lista.classList.add("dm-tr");
            lista.dataset.id = item.id
            lista.innerHTML = `<td>${item.descricao}</td>
            <td>${formatarDinheiro(item.valor)}</td>
            <td>${item.numeroDeParcelas}</td>
            <td>${formatarDinheiro(item.valorDaParcela)}</td>
            <td>${item.parcelaAtual ? (item.parcelaAtual + 'º Parcela') : 0}</td>
            <td>${formatarData(item.vencimento)}</td>
            `;

            //criar um td para o status
            const tdStatus = document.createElement('td');
            const btnStatus = criarBotaoDePagamentoDM(conta, item);
            tdStatus.appendChild(btnStatus);
            lista.appendChild(tdStatus);

            //criar um td para o botão de remover (somente para o aluguel)
            const tdBtnRemove = document.createElement('td');
            const btnRemove = criarBotaoDeRemoverDM(conta, item);
            tdBtnRemove.appendChild(btnRemove);
            lista.appendChild(tdBtnRemove);

            dmTabela.appendChild(lista);

            if (item.tipo === 'cc') {
                const despesaCC = [];

                conta.cc.forEach(obj => {
                    if (item.idR === obj.id) {
                        despesaCC.push(obj);
                    }
                })
                // console.log(despesaCC);
                attStatusCC(conta, despesaCC[0]);
            }
        })
    }
}

function mostrarDP(conta) {
    if (conta.despesas.length > 0) {
        dpTabela.innerHTML = '';

        //Se quizer deixar todas as despesas é só tirar o método filter e deixar o forEach
        //Ficando assim => conta.despesas.forEach()

        /* DEPOIS ADICIONAR DE VOLTA O FILTER ANTES DO FOREACH
        .filter(despesa => new Date(despesa.vencimento).getMonth() === new Date().getMonth() && new Date(despesa.vencimento).getFullYear() === new Date().getFullYear())
        */
        conta.despesas.filter(despesa => new Date(despesa.vencimento).getMonth() < new Date().getMonth() && new Date(despesa.vencimento).getFullYear() === new Date().getFullYear() && !despesa.pago).forEach(item => {

            const lista = document.createElement('tr');
            lista.classList.add("dm-tr");
            lista.dataset.id = item.id
            lista.innerHTML = `<td>${item.descricao}</td>
            <td>${formatarDinheiro(item.valor)}</td>
            <td>${item.numeroDeParcelas}</td>
            <td>${formatarDinheiro(item.valorDaParcela)}</td>
            <td>${item.parcelaAtual ? (item.parcelaAtual + 'º Parcela') : 0}</td>
            <td>${formatarData(item.vencimento)}</td>
            `;

            //criar um td para o status
            const tdStatus = document.createElement('td');
            const btnStatus = criarBotaoDePagamentoDP(conta, item);
            tdStatus.appendChild(btnStatus);
            lista.appendChild(tdStatus);

            //criar um td para o botão de remover (somente para o aluguel)
            const tdBtnRemove = document.createElement('td');
            const btnRemove = criarBotaoDeRemoverDM(conta, item);
            tdBtnRemove.appendChild(btnRemove);
            lista.appendChild(tdBtnRemove);

            dpTabela.appendChild(lista);

            if (item.tipo === 'cc') {
                const despesaCC = [];

                conta.cc.forEach(obj => {
                    if (item.idR === obj.id) {
                        despesaCC.push(obj);
                    }
                })
                // console.log(despesaCC);
                attStatusCC(conta, despesaCC[0]);
            }
        })
    }
}


//FUNÇÃO REMOVER UMA DESPESA DA DESEPSA MENSAL
function criarBotaoDeRemoverDM(conta, item) {
    const btn = document.createElement('button');
    btn.classList.add('expenses__btn', 'expenses__btn--remove');
    btn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    btn.addEventListener('click', function () {

        if (item.tipo === 'df') {
            //REMOVENDO OS DADOS DA TABELA PARA O USUÁRIO
            const tr = btn.closest('tr');
            if (tr) tr.remove();

            if (conta.despesas.filter(despesa => despesa.idR === item.idR && despesa.descricao === item.descricao).length === 1) {
                const despesaID = conta.df.find(despesa => despesa.id === item.idR).id;
                // console.log(despesaID);
                conta.despesas.splice(conta.despesas.findIndex(elemento => elemento.id === item.id), 1);
                atualizarValorTotalDasTabelas(conta);
                attBalance(conta);

                conta.df.splice(conta.df.findIndex(elemento => elemento.id === item.idR), 1);
                atualizarValorTotalDasTabelas(conta);
                attBalance(conta);
                mostrarDP(conta);

                // console.log(conta.df.find(despesa => despesa.id === item.idR));
                const elemento = document.querySelector(`.df-tr[data-id='${despesaID}']`);
                if (elemento) {
                    elemento.remove();
                    atualizarValorTotalDasTabelas(conta);
                    attBalance(conta);
                    mostrarDP(conta)
                } else {
                    console.log("Elemento não encontrado com ID:", despesaID);
                }


            } else {
                //REMOVENDO A DESPESA DA CONTA DO USUARIO
                conta.despesas.splice(conta.despesas.findIndex(elemento => elemento.id === item.id), 1);
                atualizarValorTotalDasTabelas(conta);
                attBalance(conta);
            }

            localStorage.setItem('accounts', JSON.stringify(accounts));
        }
    })

    return btn;
}


//BOTÃO DE PAGAMENTO DAS DESPESAS MENSAIS
function criarBotaoDePagamentoDM(conta, despesa) {
    const btn = document.createElement('button');
    if (despesa.pago) {
        btn.classList.add('expenses__btn', 'expenses__btn--paid', `dm-status--${despesa.id}`);
        btn.textContent = 'pago';
    } else {
        btn.classList.add('expenses__btn', 'expenses__btn--not-paid', `dm-status--${despesa.id}`);
        btn.textContent = 'não pago';
    }

    if (despesa.pago && despesa.tipo === 'dv') {
        btn.classList.add('expenses__btn', 'expenses__btn--paid', `dm-status--${despesa.id}`);
        btn.textContent = 'pago';
        btn.disabled = true;
    }

    btn.addEventListener('click', function () {
        if (this.classList.contains('expenses__btn--not-paid')) {
            // console.log('contem não pago');
            this.classList.remove('expenses__btn--not-paid');
            this.classList.add('expenses__btn--paid');
            this.textContent = 'pago';

            despesa.pago = 1;
            atualizarValorTotalDasTabelas(conta);
            attBalance(conta);
            localStorage.setItem('accounts', JSON.stringify(accounts));

            if (despesa.tipo === 'cc') {
                const despesaCC = [];

                conta.cc.forEach(obj => {
                    if (despesa.idR === obj.id) {
                        despesaCC.push(obj);
                    }
                })
                // console.log(despesaCC);
                attStatusCC(conta, despesaCC[0]);
            }

        } else {
            // console.log('contem pago');
            this.classList.add('expenses__btn--not-paid');
            this.classList.remove('expenses__btn--paid');
            this.textContent = 'não pago';

            despesa.pago = 0;
            atualizarValorTotalDasTabelas(conta);
            attBalance(conta);
            localStorage.setItem('accounts', JSON.stringify(accounts));

            if (despesa.tipo === 'cc') {
                const despesaCC = [];

                conta.cc.forEach(obj => {
                    if (despesa.idR === obj.id) {
                        despesaCC.push(obj);
                    }
                })

                attStatusCC(conta, despesaCC[0]);
            }
        }
    })


    return btn;
}

//BOTÃO DE PAGAMENTO DAS DESPESAS PENDENTES
function criarBotaoDePagamentoDP(conta, despesa) {
    const btn = document.createElement('button');
    if (despesa.pago) {
        btn.classList.add('expenses__btn', 'expenses__btn--paid', `dp-status--${despesa.id}`);
        btn.textContent = 'pago';
    } else {
        btn.classList.add('expenses__btn', 'expenses__btn--not-paid', `dp-status--${despesa.id}`);
        btn.textContent = 'não pago';
    }

    if (despesa.pago && despesa.tipo === 'dv') {
        btn.classList.add('expenses__btn', 'expenses__btn--paid', `dp-status--${despesa.id}`);
        btn.textContent = 'pago';
        btn.disabled = true;
    }

    btn.addEventListener('click', function () {
        if (this.classList.contains('expenses__btn--not-paid')) {
            console.log('contem não pago');
            this.classList.remove('expenses__btn--not-paid');
            this.classList.add('expenses__btn--paid');
            this.textContent = 'pago';
            despesa.pago = 1;
            atualizarValorTotalDasTabelas(conta);
            attBalance(conta);

            const tr = btn.closest('tr');
            if (tr) tr.remove();

            localStorage.setItem('accounts', JSON.stringify(accounts));

            if (despesa.tipo === 'cc') {
                const despesaCC = [];

                conta.cc.forEach(obj => {
                    if (despesa.idR === obj.id) {
                        despesaCC.push(obj);
                    }
                })
                console.log(despesaCC);
                attStatusCC(conta, despesaCC[0]);

            }

        }

        this.remove();
    })


    return btn;
}


function attStatusDM(conta) {
    // const despesasCC = conta.despesas.filter(obj => obj.tipo === 'cc');

    // console.log(despesasCC);

    conta.dm.forEach(despesa => {
        if (despesa.pago) {

            const despesaDaTabela = document.querySelector(`.dm-status--${despesa.id}`);

            despesaDaTabela.classList.remove('expenses__btn--not-paid');
            despesaDaTabela.classList.add('expenses__btn--paid');
            despesaDaTabela.textContent = 'pago';

        }

    })
}

function attStatusEntrada(conta) {
    // const despesasCC = conta.despesas.filter(obj => obj.tipo === 'cc');

    // console.log(despesasCC);

    conta.entrada.forEach(entrada => {
        if (entrada.pago) {

            const statusDaTabela = document.querySelector(`.e-status--${entrada.id}`);

            statusDaTabela.classList.remove('expenses__btn--not-received');
            statusDaTabela.classList.add('expenses__btn--received');
            statusDaTabela.textContent = 'sim';
        }

    })
}

/*
conta.entrada.filter(despesa => {
            if (ano) {
                return (new Date(despesa.vencimento).getMonth() === i && despesa.pago && new Date(despesa.vencimento).getFullYear() === ano)
            } else {
                return (new Date(despesa.vencimento).getMonth() === i && despesa.pago && new Date(despesa.vencimento).getFullYear() === new Date().getFullYear())
            }
 
Se o usuario filtrar o ano da estatisca, irá retornar as despesas e as entradas do mês filtrado
Caso ele não filtre, mostrará por padrão o do ano atual
*/

function atualizarEstatisticas(conta, ano = undefined) {

    if (ano) {
        tituloEstatistica.textContent = ano;
    } else {
        tituloEstatistica.textContent = new Date().getFullYear();
    }

    //ESTATISTICAS MENSAIS
    const estatisticaMensalArr = [0, 0, 0];

    for (let i = 0; i <= 11; i++) {
        //ENTRADA
        let entradaEstatistica = conta.entrada.filter(despesa => {
            if (ano) {
                return (new Date(despesa.vencimento).getMonth() === i && new Date(despesa.vencimento).getFullYear() === ano)
            } else {
                return (new Date(despesa.vencimento).getMonth() === i && new Date(despesa.vencimento).getFullYear() === new Date().getFullYear())
            }

        }).reduce((acc, despesa) => {
            return acc + despesa.valor;
        }, 0);

        estatisticaMensalArr[0] += entradaEstatistica;
        mesesEntrada[i].textContent = formatarDinheiro(estatisticaMensalArr[0]);

        //SAIDA
        const saidaEstatistica = conta.despesas.filter(despesa => {
            if (ano) {
                return (new Date(despesa.vencimento).getMonth() === i && new Date(despesa.vencimento).getFullYear() === ano)
            } else {
                return (new Date(despesa.vencimento).getMonth() === i && new Date(despesa.vencimento).getFullYear() === new Date().getFullYear())
            }

        }).forEach(item => {
            if(item.tipo === 'cc') {
                estatisticaMensalArr[1] += -item.valorDaParcela;
            } else {
                estatisticaMensalArr[1] += -item.valor;
            }
         });
         mesesSaida[i].textContent = formatarDinheiro(estatisticaMensalArr[1]);
         

        //RESULTADO
        estatisticaMensalArr[2] = estatisticaMensalArr[0] + estatisticaMensalArr[1];
        mesesResultado[i].textContent = formatarDinheiro(estatisticaMensalArr[2]);

        estatisticaMensalArr[0] = 0;
        estatisticaMensalArr[1] = 0;
        estatisticaMensalArr[2] = 0;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////

    const estatisticaAnualArr = [0, 0, 0];
    //ESTATISTICA ANUAL
    for (let i = 0; i <= 11; i++) {
        //ENTRADA
        const entradaEstatistica = conta.entrada.filter(despesa => {
            if (ano) {
                return (new Date(despesa.vencimento).getMonth() === i && new Date(despesa.vencimento).getFullYear() === ano)
            } else {
                return (new Date(despesa.vencimento).getMonth() === i && new Date(despesa.vencimento).getFullYear() === new Date().getFullYear())
            }

        }).reduce((acc, despesa) => {
            return acc + despesa.valor;
        }, 0);

        estatisticaAnualArr[0] += entradaEstatistica;
        entradaAnual.textContent = formatarDinheiro(estatisticaAnualArr[0]);

        //SAIDA
        const saidaEstatistica = conta.despesas.filter(despesa => {
            if (ano) {
                return (new Date(despesa.vencimento).getMonth() === i && new Date(despesa.vencimento).getFullYear() === ano)
            } else {
                return (new Date(despesa.vencimento).getMonth() === i && new Date(despesa.vencimento).getFullYear() === new Date().getFullYear())
            }

        }).forEach(item => {
            if(item.tipo === 'cc') {
                estatisticaAnualArr[1] += -item.valorDaParcela;
            } else {
                estatisticaAnualArr[1] += -item.valor;
            }
         });
         saidaAnual.textContent = formatarDinheiro(estatisticaAnualArr[1]);


        //RESULTADO
        estatisticaAnualArr[2] = estatisticaAnualArr[0] + estatisticaAnualArr[1];
        resultadoAnual.textContent = formatarDinheiro(estatisticaAnualArr[2]);
    }
}

function atualizarValorTotalDasTabelas(conta) {

    //ATUALIZAR O TOTAL DA TABELA DE ENTRADA

    //MOSTRANDO A ENTRADA 
    if (conta.entrada.length > 0) {
        const entradaSoma = conta.entrada.filter(entrada => entrada.pago).reduce((acc, entrada) => {
            return acc + entrada.valor;
        }, 0);
        eTotal.textContent = formatarDinheiro(entradaSoma);
        // console.log(entradaSoma);
    } else {
        eTotal.textContent = formatarDinheiro(0);
    }

    ////////////////////////////////////////////////////////////////////////////////////

    //ATUALIZAR TOTAL DA TABELA DE DESPESA FIXA
    if (conta.df.length > 0) {
        const despesaSomaDF = conta.df.reduce((acc, despesa) => {
            return acc + despesa.valor;
        }, 0);
        dfTotal.textContent = formatarDinheiro(despesaSomaDF);
    } else {
        dfTotal.textContent = formatarDinheiro(0);
    }

    ////////////////////////////////////////////////////////////////////////////////////

    //ATUALIZAR TOTAL DA TABELA DE DESPESA VARIAVEL
    if (conta.dv.length > 0) {
        const despesaSomaDV = conta.dv.filter(item => new Date(item.vencimento).getMonth() === new Date().getMonth() && new Date(item.vencimento).getFullYear() === new Date().getFullYear()).reduce((acc, despesa) => {
            return acc + despesa.valor;
        }, 0);
        dvTotal.textContent = formatarDinheiro(despesaSomaDV);
    } else {
        dvTotal.textContent = formatarDinheiro(0);
    }

    ////////////////////////////////////////////////////////////////////////////////////

    //ATUALIZAR TOTAL DA TABELA DE CARTÃO DE CRÉDITO
    //  TOTAL MENSAL
    if (conta.cc.length > 0) {
        const despesaSomaMensalCC = conta.cc.filter(despesa => !despesa.done).reduce((acc, despesa) => {
            return acc + despesa.valorDaParcela;
        }, 0);
        ccTotalMensal.textContent = formatarDinheiro(despesaSomaMensalCC);
    } else {
        ccTotalMensal.textContent = formatarDinheiro(0);
        ccTotal.textContent = formatarDinheiro(0);
    }

    //  TOTAL CARTÃO
    if (conta.cc.length > 0) {
        const despesaSomaTotalCC = conta.cc.filter(despesa => !despesa.done).reduce((acc, despesa) => {
            return acc + despesa.valor;
        }, 0);
        ccTotal.textContent = formatarDinheiro(despesaSomaTotalCC);
    } else {
        ccTotal.textContent = formatarDinheiro(0);
    }

    ////////////////////////////////////////////////////////////////////////////////////

    //ATUALIZAR O TOTAL DAS DESPESAS MENSAIS
    if (conta.dm.length > 0) {
        const despesasMensais = [0];

        
        conta.dm.forEach(item => {
            if (item.tipo === 'cc') {
                despesasMensais[0] += item.valorDaParcela;
            } else {  
                despesasMensais[0] += item.valor;
            }
        })
        
        
        dmTotal.textContent = formatarDinheiro(despesasMensais[0]);
    } else {
        dmTotal.textContent = formatarDinheiro(0);
    }

    ////////////////////////////////////////////////////////////////////////////////////


    //ATUALIZAR AS ESTATISTICAS
    atualizarEstatisticas(conta);
}


//FUNÇÃO PARA ATUALIZAR O BALANCE 
function attBalance(conta) {
    const saldoAtual = [conta.currentBalance];

    //MOSTRANDO O SALDO ATUAL DO USUARIO
    if (conta.entrada.length > 0) {
        const entradaSoma = conta.entrada.filter(entrada => entrada.pago && new Date(entrada.vencimento).getMonth() <= new Date().getMonth() && new Date(entrada.vencimento).getFullYear() <= new Date().getFullYear()).reduce((acc, entrada) => {
            return acc + entrada.valor;
        }, 0);

        saldoAtual[0] += entradaSoma;
        saldoBalance.textContent = formatarDinheiro(saldoAtual[0]);
    }

    const saidasPaga = conta.despesas.filter(despesa => despesa.pago && new Date(despesa.vencimento).getMonth() <= new Date().getMonth() && new Date(despesa.vencimento).getFullYear() <= new Date().getFullYear()).reduce((acc, despesa) => {
        const despesasMensais = [0];

        if (despesa.tipo === 'cc') {
            despesasMensais[0] += (acc + despesa.valorDaParcela);
        } else {
            despesasMensais[0] += (acc + despesa.valor);
        }

        return despesasMensais[0];
        // return acc + despesa.valor;
    }, 0);

    if (saidasPaga !== '') {
        saldoAtual[0] -= saidasPaga;
        saldoBalance.textContent = formatarDinheiro(saldoAtual[0]);
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const entradaArr = [0];

    //MOSTRANDO A ENTRADA 
    if (conta.entrada.length > 0) {
        const entradaSoma = conta.entrada.reduce((acc, entrada) => {
            return acc + entrada.valor;
        }, 0);

        entradaArr[0] = entradaSoma;
        entradaBalance.textContent = formatarDinheiro(entradaSoma);
    } else {
        entradaBalance.textContent = formatarDinheiro(entradaArr[0]);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const saidaArr = [0];

    //MOSTRANDO A SAIDA
    if (conta.df.length > 0 || conta.dv.length > 0 || conta.cc.length > 0) {

        if (conta.despesas.length > 0) {
            const saidaSoma = conta.despesas.filter(despesa => new Date(despesa.vencimento).getMonth() <= new Date().getMonth() && new Date(despesa.vencimento).getFullYear() <= new Date().getFullYear()).reduce((acc, despesa) => {
                const despesasMensais = [0];

                if (despesa.tipo === 'cc') {
                    despesasMensais[0] += (acc + despesa.valorDaParcela);
                } else {
                    despesasMensais[0] += (acc + despesa.valor);
                }

                return despesasMensais[0];
                // return acc + despesa.valor;
            }, 0);

            saidaArr[0] += saidaSoma;
            saidaBalance.textContent = formatarDinheiro(-saidaSoma);
        }

    } else {
        saidaBalance.textContent = formatarDinheiro(saidaArr[0]);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const resultadoSoma = entradaArr[0] - saidaArr[0];

    //MOSTRANDO RESULTADO
    resultadoBalance.textContent = formatarDinheiro(resultadoSoma);


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //MOSTRANDO SALDO PREVISTO
    saldoPrevistoBalance.textContent = formatarDinheiro(resultadoSoma + conta.currentBalance);
    //  saldo 
    //  saldoPrevisto 
    //  entrada 
    //  saida 
    //  resultado
    // meses entrada
    //meses saida
    //meses resultado
}

//  FUNÇÃO PARA O EFEITO DE ZOOM E BLUR NAS CELULAS DA TABELA
document.querySelectorAll('td').forEach(cell => {
    cell.addEventListener('mouseenter', function () {
        document.querySelectorAll('td').forEach(c => c.classList.add('blur'));
        this.classList.remove('blur');
        this.classList.add('active');
    });

    cell.addEventListener('mouseleave', function () {
        document.querySelectorAll('td').forEach(c => {
            c.classList.remove('blur', 'active');
        });
    });
});




//FUNÇÃO CRIAR OS CARDS DAS CONTAS CADASTRADAS
const criarCardDasContas = conta => {
    divAccCards.innerHTML = '';

    const div = document.createElement('div');
    div.classList.add('modal__acc-card');

    div.innerHTML = `<p class="modal__acc-card-text">Dono: <span class="modal__acc-card-span">${conta.owner}</span></p>
<p class="modal__acc-card-text">Username: <span class="modal__acc-card-span">${conta.username}</span></p>
<p class="modal__acc-card-text">PIN: <span class="modal__acc-card-span">${conta.PIN}</span></p>
<p class="modal__acc-card-text">Data de criação: <span class="modal__acc-card-span">${formatarData(conta.dataCriacao)}</span></p>`;

    divAccCards.appendChild(div);
}

////////////////////////////////////////////////////////////////////////////////////

//EVENT LISTENERS


// FORM REGISTER
registerBtn.addEventListener('click', function (e) {
    e.preventDefault();
    registerBtn.blur();

    const inputRegisterName = registerName.value;
    const inputRegisterSurname = registerSurname.value;
    const inputRegisterCurrentBalance = registerCurrentBalance.value;

    if (inputRegisterName !== '' && inputRegisterSurname !== '' && +inputRegisterCurrentBalance >= 0) {

        const date = new Date();

        const newAccount = {
            owner: `${inputRegisterName} ${inputRegisterSurname}`,
            currentBalance: +inputRegisterCurrentBalance,
            PIN: generatePassword(),
            dataCriacao: date.toISOString(),
            entrada: [],
            df: [],
            dv: [],
            cc: [],
            despesas: [],
            dm: [],
        };
        entradaBalance.textContent = formatarDinheiro(newAccount.currentBalance);
        newAccount.id = accounts[accounts.length - 1] ? (accounts[accounts.length - 1]).id + 1 : 0;

        accounts.push(newAccount);
        createUsername(accounts);

        infoUser.textContent = newAccount.username;
        infoPin.textContent = newAccount.PIN;

        registerName.value = registerSurname.value = registerCurrentBalance.value = '';
        displayRegister();
        infoMessage.classList.remove('hidden');

        registerName.value = registerSurname.value = registerCurrentBalance.value = '';
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }
})


//BTN CALL FORM REGISTER
btnCallFormRegister.addEventListener('click', function () {
    displayRegister();
    btnCallFormRegister.blur();
    loginUser.value = loginPin.value = '';
})


//BTN CLOSE MESSAGE ABOUT NEW ACCOUNT
btnCloseMessage.addEventListener('click', function () {
    infoMessage.classList.add('hidden');
    infoErrorLogin.classList.add('hidden');
})


//BTN MOSTRAR A LISTA DE CONTAS CADASTRADA
btnMostrarModalAcc.addEventListener('click', function () {
    modalAcc.classList.remove('hidden');
    overlay.classList.remove('hidden');

    accounts.forEach(conta => {
        criarCardDasContas(conta);
    })
})

//BTN FECHAR A LISTA DE CONTAS CADASTRADA
btnFecharModalAcc.addEventListener('click', function () {
    modalAcc.classList.add('hidden');
    overlay.classList.add('hidden');
    loginPin.value = '';
})

let currentAccount;
//LOGIN BTN
btnLogin.addEventListener('click', function (e) {
    e.preventDefault();
    btnLogin.blur();
    const inputUser = loginUser.value.toLowerCase();
    const inputPin = loginPin.value;

    if (inputUser !== '' && inputPin !== '') {

        if (accounts.length > 0) {
            accounts.forEach(acc => {
                if (inputUser === acc.username && +inputPin === acc.PIN) {
                    currentAccount = acc;
                    infoErrorLogin.classList.add('hidden');
                    infoMessage.classList.add('hidden');
                    formRegister.classList.add('hidden');
                    loginUser.value = loginPin.value = '';
                    info.classList.add('hidden');

                    if (1 <= new Date().getDate()) {
                        //ADIONANDO AS DESPESAS DO MÊS ATUAL DENTRO DO OBJETO dm => despesas mensais
                        currentAccount.dm = [];
                        currentAccount.despesas.forEach(conta => {
                            if (new Date(conta.vencimento).getMonth() === new Date().getMonth() && new Date(conta.vencimento).getFullYear() === new Date().getFullYear()) {

                                currentAccount.dm.push(conta)


                            }
                        })
                    }

                    criarTabelaDF(currentAccount);
                    criarTabelaDV(currentAccount);
                    criarTabelaCC(currentAccount);
                    criarTabelaEntrada(currentAccount);
                    atualizarDM();
                    mostrarDM(currentAccount);
                    mostrarDP(currentAccount);
                    atualizarValorTotalDasTabelas(currentAccount);
                    attBalance(currentAccount);
                    attStatusEntrada(currentAccount);
                    checkStatusCC(currentAccount);
                    app.classList.remove('hidden');
                    return;
                } else {
                    infoErrorLogin.classList.remove('hidden');
                    return;
                }
            })
        } else {
            infoErrorLogin.classList.remove('hidden');
            return;
        }
    }
})


//CADASTRO DE ENTRADA
eBtn.addEventListener('click', function (e) {
    e.preventDefault();
    eBtn.blur();

    if (eInputDescricao.value !== '' && +eInputValor.value > 0 && +eInputVencimento.value > 0 && +eInputVencimento.value < 32) {
        const dataAtual = new Date();
        const dataInput = +eInputVencimento.value;
        const descricaoInput = eInputDescricao.value;
        const valorInput = +eInputValor.value;

        const dataModificada = new Date();
        dataModificada.setDate(dataInput);

        const currentItem = {
            descricao: eInputDescricao.value,
            valor: +eInputValor.value,
            tipo: 'e',
            pago: 0,
        };

        //ADICIONANDO UMA ID NAS DESPESAS CRIADAS
        currentItem.id = currentAccount.entrada[currentAccount.entrada.length - 1] ? (currentAccount.entrada[currentAccount.entrada.length - 1]).id + 1 : 0;
        // console.log(currentItem);

        // OPERAÇÃO DE DATA (INDEPENDENTE DA DATA INPUT , JOGA PARA O MÊS ATUAL)
        currentItem.vencimento = dataModificada.toISOString();

        // OPERAÇÃO DE DATA (SE A DATA INPUT FOR MENOR QUE A DATA ATUAL, JOGA PARA O PRÓXIMO MÊS)
        // if(dataInput >= dataAtual.getDate()) {
        //     currentItem.vencimento = dataModificada.toISOString();
        //     // console.log('Vai receber este mês');
        //     // console.log(`Data de recebimento: ${dataModificada}`);
        // } else {
        //     const novaData = new Date(dataModificada);
        //     novaData.setMonth(dataAtual.getMonth() + 1);
        //     currentItem.vencimento = novaData.toISOString();
        //     // console.log('Vai receber no próximo mês');
        //     // console.log(`Data de recebimento: ${novaData}`);
        // }

        currentAccount.entrada.push(currentItem);
        criarTabelaEntrada(currentAccount);
        atualizarValorTotalDasTabelas(currentAccount);
        attStatusEntrada(currentAccount);
        attBalance(currentAccount);
        mostrarDP(currentAccount);

        eInputDescricao.value = eInputValor.value = eInputVencimento.value = '';
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }
})


let parcelaAtual = 0;
//CADASTRO DE DESPESAS FIXAS
dfBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (dfInputDescricao.value !== '' && +dfInputValor.value > 0 && +dfInputVencimento.value > 0 && +dfInputVencimento.value < 32) {

        const dataVenc = new Date();
        dataVenc.setDate(+dfInputVencimento.value);

        const currentItem = {
            descricao: dfInputDescricao.value,
            valor: +dfInputValor.value,
            vencimento: dataVenc.toISOString(),
            tipo: 'df',
        }

        currentItem.id = currentAccount.df[currentAccount.df.length - 1] ? (currentAccount.df[currentAccount.df.length - 1]).id + 1 : 0;
        // console.log(currentItem);
        currentAccount.df.push(currentItem);


        const dataAtual = new Date();
        const dataVencimento = new Date(currentItem.vencimento);

        const opcoes = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        }

        const data1 = Intl.DateTimeFormat('pt-br', opcoes).format(dataAtual);
        const data2 = Intl.DateTimeFormat('pt-br', opcoes).format(dataVencimento);

        if (data2 >= data1) {
            //ADICIONANDO A DESPESA QUE IRÁ VENCER NO MÊS ATUAL
            currentAccount.despesas.push({
                tipo: 'df',
                descricao: currentItem.descricao,
                valor: currentItem.valor,
                valorDaParcela: 0,
                numeroDeParcelas: 0,
                parcelaAtual: 0,
                vencimento: currentItem.vencimento,
                pago: 0,
                id: currentAccount.despesas[currentAccount.despesas.length - 1] ? (currentAccount.despesas[currentAccount.despesas.length - 1]).id + 1 : 0,
                idR: currentItem.id,
            });


            //adicionando despesa fixa nos meses subsequentes
            for (let i = 1; i <= 12; i++) {

                //Data parcela irá armazenar a data da parcela
                let dataParcela = adicionarMeses(new Date(currentItem.vencimento), i);

                //Quando for parcelas, adicionar o mesmo ID de cadastro
                //Ex: 3 parcelas, 3 parcelas com o mesmo ID do item cadastrado
                //Quando for excluir um item, é só fazer o forEach e remover todos os itens com o mesmo ID 
                //do item cadastrado

                //Estou adicionando os dados dentro da conta

                currentAccount.despesas.push({
                    tipo: 'df',
                    descricao: currentItem.descricao,
                    valor: currentItem.valor,
                    valorDaParcela: 0,
                    numeroDeParcelas: 0,
                    parcelaAtual: 0,
                    vencimento: dataParcela.toISOString(),
                    pago: 0,
                    id: currentAccount.despesas[currentAccount.despesas.length - 1] ? (currentAccount.despesas[currentAccount.despesas.length - 1]).id + 1 : 0,
                    idR: currentItem.id
                });
            }

        } else {
            //adicionando despesa fixa nos meses subsequentes
            for (let i = 1; i <= 12; i++) {

                //Data parcela irá armazenar a data da parcela
                let dataParcela = adicionarMeses(new Date(currentItem.vencimento), i);

                //Quando for parcelas, adicionar o mesmo ID de cadastro
                //Ex: 3 parcelas, 3 parcelas com o mesmo ID do item cadastrado
                //Quando for excluir um item, é só fazer o forEach e remover todos os itens com o mesmo ID 
                //do item cadastrado

                //Estou adicionando os dados dentro da conta

                currentAccount.despesas.push({
                    tipo: 'df',
                    descricao: currentItem.descricao,
                    valor: currentItem.valor,
                    valorDaParcela: 0,
                    numeroDeParcelas: 0,
                    parcelaAtual: 0,
                    vencimento: dataParcela.toISOString(),
                    pago: 0,
                    id: currentAccount.despesas[currentAccount.despesas.length - 1] ? (currentAccount.despesas[currentAccount.despesas.length - 1]).id + 1 : 0,
                    idR: currentItem.id
                });
            }

        }

        dfInputDescricao.value = dfInputValor.value = dfInputVencimento.value = '';
        criarTabelaDF(currentAccount);
        //Atualizando a tabela de despesas mensais para o usuário
        localStorage.setItem('accounts', JSON.stringify(accounts));
        atualizarDM();
        mostrarDM(currentAccount);
        mostrarDP(currentAccount);
        atualizarValorTotalDasTabelas(currentAccount);
        attBalance(currentAccount);
    }
})


//EVENT LISTENER DESPESAS VARIÁVEIS
dvBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (dvInputDescricao.value !== '' && +dvInputValor.value > 0) {
        const dataPagamento = new Date();
        // console.log(dvInputDescricao.value, +dvInputValor.value);
        const currentItem = {
            descricao: dvInputDescricao.value,
            valor: +dvInputValor.value,
            vencimento: dataPagamento.toISOString(),
            tipo: 'dv',
        };

        //ADICIONANDO UMA ID NAS DESPESAS CRIADAS
        currentItem.id = currentAccount.dv[currentAccount.dv.length - 1] ? (currentAccount.dv[currentAccount.dv.length - 1]).id + 1 : 0;
        // console.log(currentItem);
        currentAccount.dv.push(currentItem);


        //ADICIONANDO A DESPESA QUE IRÁ VENCER NO MÊS ATUAL
        currentAccount.despesas.push({
            tipo: 'dv',
            descricao: currentItem.descricao,
            valor: currentItem.valor,
            valorDaParcela: 0,
            numeroDeParcelas: 0,
            parcelaAtual: 0,
            vencimento: currentItem.vencimento,
            pago: 1,
            id: currentAccount.despesas[currentAccount.despesas.length - 1] ? (currentAccount.despesas[currentAccount.despesas.length - 1]).id + 1 : 0,
            idR: currentItem.id,
        });


        criarTabelaDV(currentAccount);
        //Atualizando a tabela de despesas mensais para o usuário
        atualizarDM();
        mostrarDM(currentAccount);
        atualizarValorTotalDasTabelas(currentAccount);
        attBalance(currentAccount);
        mostrarDP(currentAccount);
        mostrarDP(currentAccount);
        localStorage.setItem('accounts', JSON.stringify(accounts));
        dvInputDescricao.value = dvInputValor.value = '';
    }
})


//EVENT LISTENER DESPESAS DO CARTÃO DE CRÉDITO
ccBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (ccInputDescricao.value !== '' && +ccInputValor.value > 0 && +ccInputVencimento.value > 0 && +ccInputVencimento.value < 32 && +ccInputParcelas.value > 0) {

        const dataVenc = new Date();
        dataVenc.setDate(+ccInputVencimento.value);

        const currentItem = {
            descricao: ccInputDescricao.value,
            valor: +ccInputValor.value * +ccInputParcelas.value,
            valorDaParcela: +ccInputValor.value,
            parcelas: +ccInputParcelas.value,
            vencimento: dataVenc.toISOString(),
            tipo: 'cc',
            done: 0,
        }

        currentItem.id = currentAccount.cc[currentAccount.cc.length - 1] ? (currentAccount.cc[currentAccount.cc.length - 1]).id + 1 : 0;
        // console.log(currentItem);
        currentAccount.cc.push(currentItem);


        //adicionando despesa do cartão de crédito nos meses subsequentes
        for (let i = 1; i <= currentItem.parcelas; i++) {

            //Data parcela irá armazenar a data da parcela
            let dataParcela = adicionarMeses(new Date(currentItem.vencimento), i);

            //Quando for parcelas, adicionar o mesmo ID de cadastro
            //Ex: 3 parcelas, 3 parcelas com o mesmo ID do item cadastrado
            //Quando for excluir um item, é só fazer o forEach e remover todos os itens com o mesmo ID 
            //do item cadastrado

            //Estou adicionando os dados dentro da conta

            currentAccount.despesas.push({
                tipo: 'cc',
                descricao: currentItem.descricao,
                valor: currentItem.valor,
                valorDaParcela: +ccInputValor.value,
                numeroDeParcelas: +ccInputParcelas.value,
                parcelaAtual: parcelaAtual += 1,
                vencimento: dataParcela.toISOString(),
                pago: 0,
                id: currentAccount.despesas[currentAccount.despesas.length - 1] ? (currentAccount.despesas[currentAccount.despesas.length - 1]).id + 1 : 0,
                idR: currentItem.id
            });
        }
        parcelaAtual = 0;

        criarTabelaCC(currentAccount);

        ccInputDescricao.value = ccInputValor.value = ccInputParcelas.value = ccInputVencimento.value = '';
        localStorage.setItem('accounts', JSON.stringify(accounts));
        //Atualizando a tabela de despesas mensais para o usuário
        atualizarDM();
        mostrarDM(currentAccount);
        atualizarValorTotalDasTabelas(currentAccount);
        attBalance(currentAccount);
        mostrarDP(currentAccount);
    }
})


//EVENT LISTENER BOTÃO DE FILTRO DAS ESTATISTICAS
filtroSelect.addEventListener("change", (e) => {
    const filtroValor = e.target.value;

    atualizarEstatisticas(currentAccount, +filtroValor);
    filtroSelect.blur();
});


//EVENT LISTENER DOS MODAIS INFO
btnModalInfo.forEach(botao => {

    botao.addEventListener('click', (e) => {

        modalInfo.classList.remove('hidden');
        overlay.classList.remove('hidden');

        // if(e.target.id === 'btn1') {
        //     console.log('Você clicou no botão 1');
        // } else if (e.target.id === 'btn2') {
        //     console.log('Você clicou no botão 2');
        // } else if(e.target.id === 'btn3') {
        //     console.log('Você clicou no botão 3');
        // }
    })
})


btnFecharModalInfo.addEventListener('click', function () {
    modalInfo.classList.add('hidden');
    overlay.classList.add('hidden');
})
//  só falta fazer o funcionamento do botão filtro e chamar a função atualizarEsatistica