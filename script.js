'use strict';

let p0_CurrScore = document.getElementById('current--0');
let p1_CurrScore = document.getElementById('current--1');

let player0Sec = document.querySelector('.player--0');
let player1Sec = document.querySelector('.player--1');

let totalScorePlayer0 = document.getElementById('score--0');
let totalScorePlayer1 = document.getElementById('score--1');

const diceImg = document.querySelector('.dice');

const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');

let currScore = 0;
let randomNum  = 0;

//rolls the dice and a new dice image with the random num is displayer
const displayDice = (randomNo) =>{

    const imagePath = 'dice-' + randomNo + '.png';
    diceImg.setAttribute('src', imagePath);
    if(diceImg.style.display!=='block'){
        diceImg.style.display='block';
    }

}

const generateRandomNo = () => {
    
     const random =Math.floor(Math.random()*6 + 1);
     displayDice(random);
     return random;
}

const updateCurrentScore = () =>{
    if(player0Sec.classList.contains('player--active')){  
        p0_CurrScore.textContent=currScore;  
    }
    else{
        p1_CurrScore.textContent=currScore;
    }

}

const incrementCurrScore = (randomNo) => {
    currScore+=randomNo;
}

const rollDice = () => {

    randomNum = generateRandomNo();
    //if random number is = 1 then switch the player
    if(randomNum===1){
        switchPlayer();
        return;
    }
    incrementCurrScore(randomNum);
    updateCurrentScore();

}

const updateTotalScore = (totalScore,currScore) =>{
    if(randomNum!=1)totalScore.textContent = Number(totalScore.textContent) + Number (currScore.textContent);
    currScore.textContent = 0;
}

const switchPlayer = () => {
    currScore = 0;
    if(player0Sec.classList.contains('player--active')){
        
       
        updateTotalScore(totalScorePlayer0,p0_CurrScore);

        if(Number(totalScorePlayer0.textContent) >=100){
            console.log("yo");
            wonTheMatch(player0Sec);
            return;
        }

        player0Sec.classList.remove('player--active');
        player1Sec.classList.add('player--active');
    }
    else{
        updateTotalScore(totalScorePlayer1,p1_CurrScore);

        if(Number(totalScorePlayer1.textContent) >=100){
            console.log("yo");
            wonTheMatch(player1Sec);
            return;
        }

        player1Sec.classList.remove('player--active');
        player0Sec.classList.add('player--active');
    }
}

const startNewGame = () =>{

    currScore = 0;

    if(player0Sec.classList.contains('player--winner')){
        player0Sec.classList.remove('player--winner');
    }
    else{
        player1Sec.classList.remove('player--winner');
    }

    //make player 0 acitve player
    console.log(player0Sec);
    console.log(player1Sec);
    if(!player0Sec.classList.contains('player--active')){
        player0Sec.classList.add('player--active');
    }
    player1Sec.classList.remove('player--active');

    //enable the disabled buttons
    rollDiceBtn.disabled = false;
    holdBtn.disabled = false;
    p0_CurrScore.textContent = 0;
    p1_CurrScore.textContent = 0;

    totalScorePlayer0.textContent=0;
    totalScorePlayer1.textContent=0;



}

//function to decorate winner side

const wonTheMatch = (winner)=>{
    console.log("yo");
    winner.classList.add('player--winner');
    rollDiceBtn.disabled=true;
    holdBtn.disabled=true;
}
rollDiceBtn.addEventListener('click', rollDice ); //role dice when roll dice button is clicked

holdBtn.addEventListener('click', switchPlayer); //switch player when hold button is clicked

newGameBtn.addEventListener('click', startNewGame);


