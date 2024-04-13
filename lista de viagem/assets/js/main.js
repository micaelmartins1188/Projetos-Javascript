'use strict';
// LISTA DE VIAGEM - MANIPULANDO DOM
const nameInput = document.querySelector('.name');
const amountInput = document.querySelector('.amount');
const btnForm = document.querySelector('.form__btn');
const list = document.querySelector('.list');

// Pegando os dados armazenados do localStorage e armazendo eles no array itens, caso não tenha nada então cria um array vazio
const itens = JSON.parse(localStorage.getItem('itens')) || [];
//Tem que colocar o JSON.parse , para que o javascript consiga pegar os objetos, eles são devolvidos como um array

itens.forEach(element => {
    createElement(element);
})

btnForm.addEventListener('click', function (e) {
    e.preventDefault();

    if (nameInput.value !== '' && +amountInput.value > 0) {
        const name = nameInput.value;
        const amount = +amountInput.value;

        // Conferindo se o item que irá registar já existe
        const exist = itens.find(element => element.name === name);

        //Sempre que for mexer com localStorage, guarde os itens em um objeto, é mais fácil de trabalhar
        const currentItem = {
            name: name,
            amount: amount,
        }

        //Se o item já existe
        if (exist) {
            //o id do item atual que está tentando registrar será o mesmo id do item já armazenado antes
            currentItem.id = exist.id;

            //Atualizando o item
            updateElement(currentItem);

            //Sobrescrevendo a alteração dentro do array itens
            itens[itens.findIndex(element => element.id === exist.id)] = currentItem;

            // Caso contrário (se o item não existe)
        } else {
            //Criar um novo ID, o ID do item atual = array itens(onde está armazenado os dados do localStorage)[o tamanho do array - 1] se true => (itens[tamanho do array - 1].id + 1) se não (caso o array esteja vazio)=> 0
            currentItem.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

            //Criando uma nova lista para o usuário
            createElement(currentItem);

            //Armazenando o objeto do item atual dentro do array itens
            itens.push(currentItem);
        }   

        //Salvando o array itens dentro da chave 'itens'
        localStorage.setItem('itens', JSON.stringify(itens));
        nameInput.value = amountInput.value = '';
        amountInput.blur();
    }


})

//Criando a lista (passando o objeto como parâmetro)
function createElement(item) {
    //1)Criar a tag li 
    const newList = document.createElement("li");
    newList.classList.add('list__row');//Adicionando a classe nela
    //Criando o elemento strong
    const itemNumber = document.createElement('strong');
    itemNumber.classList.add('list__strong');//Add classe
    itemNumber.innerText = item.amount;//Add a quantidade dentro do strong
    itemNumber.dataset.id = item.id;//Criando um data-id='id do objeto'
    newList.appendChild(itemNumber);//Adicionado a tag strong dentro de li
    //Criando o elemento de texto
    const textList = document.createElement("p");
    textList.classList.add("list__text");//Add classe
    textList.innerText = item.name;//Add texto dentro da tag p
    newList.appendChild(textList);//Add a tag p dentro de li

    newList.appendChild(createButton(item.id));//Add btn dentro da tag li
    //Adicionando a lista dentro da tag UL
    list.appendChild(newList);
};

//Atualizando o item (usando o objeto como parâmetro)
function updateElement(item) {
    //Selecionando o data-id e mudando a quantidade dele para o usuário
    document.querySelector(`[data-id="${item.id}"]`).innerText = item.amount;
}

//Criando o botão de excluir (passando o id como parâmetro)
function createButton(id) {
    //Criando o elemento botão
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('list__delete');//Adicionando classe
    btnDelete.innerText = "🗑";//Colocando texto dentro do botão

    //Adicionando um addEventListener para o botão
    btnDelete.addEventListener('click', function () {
        //Chamando a função de deletar a lista
        deleteList(this.parentNode, id);
        //Passando como parâmetro (this.parentNode => a lista na qual o botão está atrelado) e o ID (para remover do localStorage)
    });

    //Tem que retornar o botão, se não fizer isso vai retornar undefined
    return btnDelete;
}

//Criando a função de remover um item da lista
function deleteList(element, id) {
    //Removendo a lista da tela para o usuário
    element.remove();

    //Removendo do array itens (que é onde fica armazenado os itens do localStorage)
    itens.splice(itens.findIndex(element => element.id === id), 1);//O métodofindIndex vai retornar apenas o índice de acordo com a condição (se o objeto.id === o id a ser removido), o splice remove no array original
    //Atualizando a lista do localStorage (porque agora removemos uma lista do array itens)
    localStorage.setItem('itens', JSON.stringify(itens));
    //Quando for utilizar o localStorage ao salvar os dados no navegador é preciso utilizar JSON.stringify(nome do array), porque o localStorage trabalha apenas com string. E ao você recer os dados com o getItem é necessário usar o JSON.parse para que converta essa string de uma forma com que o javascript consiga trabalhar
}