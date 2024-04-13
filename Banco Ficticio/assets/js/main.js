'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "João Oliveira",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2022-11-18T21:31:17.178Z",
    "2022-12-23T07:42:02.383Z",
    "2023-01-28T09:15:04.904Z",
    "2023-04-01T10:17:24.185Z",
    "2023-05-08T14:11:59.604Z",
    "2023-07-26T17:01:17.194Z",
    "2024-03-04T23:36:17.929Z",
    "2024-03-06T10:51:36.790Z",
  ],
  currency: "BRL",
  locale: "pt-BR",
};

const account2 = {
  owner: "Maria Almeida",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2024-03-01T18:49:59.371Z",
    "2024-03-06T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: 'Pedro Estênio',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    "2021-11-18T21:31:17.178Z",
    "2021-12-23T07:42:02.383Z",
    "2022-01-28T09:15:04.904Z",
    "2022-04-01T10:17:24.185Z",
    "2022-05-08T14:11:59.604Z",
    "2023-07-26T17:01:17.194Z",
    "2024-03-03T23:36:17.929Z",
    "2024-03-06T10:51:36.790Z",
  ],
  currency: "BRL",
  locale: "pt-BR",
};



const accounts = [account1, account2, account3];

// Elements
const labelWelcome = document.querySelector('.nav__welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.summary__btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//////////////////////////////////////////////////////////////////////////////
//Criando uma função de formatação de data
const formatedDate = function (date, locale) {
  //Criando uma função para fazer o calculo dos dias passados, Math.abs => remove o absoluto se o num for negativo ele deixa positivo
  //(1000 * 60 * 60 * 24) => (1s = 1000ms; 1min = 60s; 1h = 60min; 1dia = 24hrs) queremos saber o dia então para no 24
  const calcDisplayPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  //Pegando a data atual - a data a ser fornecida
  const daysPassed = calcDisplayPassed(new Date(), date);

  if (daysPassed === 0) return 'Hoje';
  //Se o dia for recente(hoje = 0) retornar 'Hoje'
  if (daysPassed === 1) return 'Ontem';
  //Se o dia for ontem(1) retornar 'Ontem'
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  //Se o dia for menor ou igual a 7 retornar 'Dias atrás'

  //Formatar a data de acordo com o local onde você mora (ta armazendo no objeto da conta)
  return Intl.DateTimeFormat(locale).format(date);
}

//Função para formatar o dinheiro
const formatedNumber = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',//pode ser milhas por hora, km/k, celsius... mas aqui iremos utilizar currency
    currency: currency,
  }).format(value);
};


//Creating an username
const createUsername = function (accs) {
  //Percorrendo o array de objeto com as contas, criando uma nova propriedade no objeto 'username' que será o login do usuário
  accs.forEach(acc => acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join(''));
  //vai pegar o nome do dono(acc.owner) deixar tudo letra minúscula 
  //split(Separa os elementos ex:'João Oliveira' / com split => ['João','Oliveira'])
  //map retornar um novo array => ta pegando somente a primeira letra do array (name[0]) e join('') juntando eles =>jo 
}
createUsername(accounts);//Chamando a função imediatamente para criar os usuarios


// DISPLAY MOVEMENTS
const displayMovements = function (acc, sorted = false) {
  containerMovements.innerHTML = '';//Limpando  tudo oque está dentro da div de transações(movements)

  //Condição para deixar em ordem crescente ou normal
  const movs = sorted//se for true
    ? acc.movements.slice().sort((a, b) => a - b)//Retorna os valores das transações em ordem decrescente
    : acc.movements;//se não na ordem normal
  //.slice() => retorna um novo array
  //.sort(a, b) a-b ta comparando os valores das transações para deixar na ordem decrescente

  //Percorrendo o array das transações
  movs.forEach(function (mov, i) {
    //condição ternária para saber o typo de transação que está sendo feita se é deposito ou saque
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    //Formatando o dinheiro de acordo com o local do banco (US, EUR, BRL)
    const formatedMov = formatedNumber(mov, acc.locale, acc.currency);
    const date = new Date(acc.movementsDates[i]); //a data armazenada ta como string, 
    //cria-se uma nova data de acordo com a registrada no array da conta e converte essa string data para uma data onde conseguimos acessar

    //Criando o conteúdo html
    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type === 'deposit' ? 'depósito' : 'retirada'}</div>
          <div class="movements__date">${formatedDate(date, acc.locale)}</div>
          <div class="movements__value">${formatedMov}</div>
      </div>
    `;

    //Adicionar esse conteudo html logo após a div(movements) que foi limpada no começo com innerHTML = ""
    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
};


// DISPLAY BALANCE => Função para atualizar o display do saldo atual
const calcDisplayBalance = function (acc) {
  //criando uma propriedade balance dentro da conta atual se já existir ela só será reatribuida o valor 
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);//.reduce(contador, valor), inicie a contagem do 0
  labelBalance.textContent = formatedNumber(acc.balance, acc.locale, acc.currency);
};


// DISPLAY SUMMARY
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatedNumber(incomes, acc.locale, acc.currency);

  const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatedNumber(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements.filter(mov => mov > 0).map(deposit => deposit * acc.interestRate / 100).filter(int => int >= 1).reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatedNumber(interest, acc.locale, acc.currency);
};


const transfer = function (value, currentAccount, receiverAccount) {
  if (currentAccount.currency === receiverAccount.currency) {
    //Add transfer
    currentAccount.movements.push(-value);
    receiverAccount.movements.push(value);
  } else if (currentAccount.currency === 'BRL' && receiverAccount.currency === 'USD' && currentAccount.currency !== receiverAccount.currency) {
    //Add transfer
    currentAccount.movements.push(-value);
    receiverAccount.movements.push(value / 4.15); //Converting Reais to Dollares
  } else if (currentAccount.currency === 'USD' && receiverAccount.currency === 'BRL' && currentAccount.currency !== receiverAccount.currency) {
    //Add transfer
    currentAccount.movements.push(-value);
    receiverAccount.movements.push(value * 4.15); //Converting Dollares to Reais
  }

  // Add date
  currentAccount.movementsDates.push(new Date().toISOString()); 
  //adiciona a data da transação na propriedade de transaçõesData em formato de string

  receiverAccount.movementsDates.push(new Date().toISOString());
  //Mesma coisa que em cima, é feito tanto para quem está transferindo quanto para quem está recebendo
};


// UPDATE UI
const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
}


const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    //In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    //When time is 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Faça login para começar`
      containerApp.style.opacity = '0';
    }

    //Decrease 1 second
    time--;
  };

  //Set time to 5 minutes
  let time = 300;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
}


let currentAccount, timer;
// Login validation
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  const username = inputLoginUsername.value;
  const pin = +inputLoginPin.value;
  
  //find retorna o objeto/array/valor de acordo com a condição prescrita
  currentAccount = accounts.find(acc => acc.username === username);

  //CurrentAccount existe ? então pegue o pin => currentAccount.pin
  if (currentAccount?.pin === pin) {
    labelWelcome.textContent = `Seja bem-vindo, ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity = '100';

    const now = new Date();
    const options = {
      year: 'numeric',
      month: 'numeric',//narrow => primeira letra do mês / shor => abreviação do mes ex: jan, mar... / long => texto completo do mês ex:março
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',//tem a propriedade week: 'narrow'; //pode usar também 'short' ou 'long'
    };

    labelDate.textContent = Intl.DateTimeFormat(currentAccount.locale, options).format(now);

    if (timer) clearInterval(timer);//Se o timer estiver rodando, para ele e limpa
    timer = startLogOutTimer(); //Reinicia o timer de novo

    // UPDATE UI
    updateUI(currentAccount);

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
  }
});


btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);//Retorna o objeto da conta(podendo acessar tudo dentro dela)

  if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc !== currentAccount.username) {
    // Add transfer
    transfer(amount, currentAccount, receiverAcc);

    // Update UI
    updateUI(currentAccount);

    //Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }

  inputTransferAmount.value = inputTransferTo.value = '';
});


btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(+inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      //Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      //Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }

  inputLoanAmount.value = '';
});


btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (inputCloseUsername.value === currentAccount.username && +inputClosePin.value === currentAccount.pin) {

    const index = accounts.findIndex(acc => acc.username === currentAccount.username);

    //Splice mutate the array itself
    accounts.splice(index, 1);

    containerApp.style.opacity = '0';
  }
});


let sorted = false;
btnSort.addEventListener('click', function () {
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
})

//The log will apear at the console 3 seconds later
// setTimeout(() => console.log('Here is your pizza 🍕')
// , 3000);
// console.log('Waiting...');

// const ingredients = ['olives', 'spinach']
// //Passing arguments
// const pizzaTimer = setTimeout(
//   (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}🍕`),
//   3000,
//   ...ingredients
//   );

// console.log('Waiting...');

// if(ingredients.includes('spinach')) clearTimeout(pizzaTimer);


//setInterval
// setInterval(function() {
//   const now = new Date();
//   const options = {
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric'
//   }
//   console.log(Intl.DateTimeFormat('pt-BR', options).format(now));
// }, 1000)