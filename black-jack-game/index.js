let player = {
    name: "Gabriel",
    chips: 20
}

const messageEl = document.getElementById("message-el");
let sum = 0;
let cards = [];
let isAlive = false;
let hasBlackjack = false;
const playerEl = document.getElementById("player-el");
const cardsEl = document.getElementById("cards-el");
const sumEl = document.getElementById("sum-el");





function newGame(){

    
    
    if(isAlive === false || hasBlackjack === true){
        cards = [];
        hasBlackjack = false;
        playerEl.textContent = player.name + ": $" + player.chips;
        isAlive = true;
        let cardOne = getRandomCard();
        let cardTwo = getRandomCard();
        cards.push(cardOne, cardTwo);
        sum = cardOne + cardTwo;
        renderGame();
    }
}

function getRandomCard(){
    let cardVal = 1 + Math.floor(Math.random()*13);
    if(cardVal === 1){
        return 11
    }else if(cardVal >10){
        return 10;
    }else{
        return cardVal;
    }
}

function newCard(){
    if(isAlive === true && hasBlackjack === false){
        let newCard = getRandomCard();
        cards.push(newCard);
        sum += newCard
        renderGame();
    }

}

function renderGame() {
    printCards();
    if (sum === 21) {
        messageEl.textContent = "You have a blackjack! 🥳 "
        hasBlackjack = true;
        player.chips += 10;
        playerEl.textContent = player.name + ": $" + player.chips;
    } else if (sum <= 20) {
        messageEl.textContent = "Do you want to draw a card? 😬"
    } else {
        isAlive = false;
        messageEl.textContent = "You have lost... 🤕"
        player.chips -= 1;
        playerEl.textContent = player.name + ": $" + player.chips;
    }
}


function printCards(){
    cardsEl.textContent = "Cards: "
    for(i = 0; i< cards.length ; i++){
        cardsEl.textContent += cards[i] +" ";
    }
    sumEl.textContent = "Sum: " + sum;

}