var firstPlayer, secondPlayer, activePlayer, diceDOM, dice, 
    roundSocre, notWinner, previousNumber, maxPoints;

declareElements();
setNumbersToStart();


// add events to elements

document.getElementById('btn-roll-dice').addEventListener('click', function(){
    if ( notWinner){

        dice = Math.floor(Math.random() * 6) + 1;
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
    
        if (dice !== 1 ){
            if (previousNumber === 6 && dice === 6){
                activePlayer.globalScore = 0;
                switchPlayer();
            } else {
                previousNumber = dice;

                roundScore += dice
                activePlayer.currentScoreElement.textContent = roundScore;
            }
        } else {
            switchPlayer();
        }
    }
})

document.getElementById('btn-hold-score').addEventListener('click', function() {
    if ( notWinner){

        activePlayer.globalScore += roundScore
        activePlayer.scoreElement.textContent = activePlayer.globalScore;

        if (activePlayer.globalScore >= 20){
            declareWin();
        } else {
            switchPlayer();
        }
    }
});

document.getElementById('btn-to-new-game').addEventListener('click', setNumbersToStart);


// functions

function setNumbersToStart(){
    if (typeof activePlayer !== 'undefined') {
        activePlayer.nameElement.textContent = 'Player ' + (activePlayer.id + 1);
        activePlayer.playerPanel.classList.remove('winner');
        activePlayer.playerPanel.classList.remove('active');
        firstPlayer.globalScore = 0;
        secondPlayer.globalScore = 0;
    }

    activePlayer = [firstPlayer, secondPlayer][Math.floor(Math.random()*2)]
    firstPlayer.scoreElement.textContent = 0;
    firstPlayer.currentScoreElement.textContent = 0;
    secondPlayer.scoreElement.textContent = 0;
    secondPlayer.currentScoreElement.textContent = 0;
    roundScore = 0;
    diceDOM.style.display = 'none';
    activePlayer.playerPanel.classList.toggle('active');
    notWinner = true;
    previousNumber = 0;
}

function declareElements(){
    firstPlayer = { scoreElement: document.getElementById('score-0'), 
                    currentScoreElement: document.getElementById('current-0'),
                    nameElement: document.querySelector('#name-0'),
                    globalScore: 0,
                    playerPanel: document.querySelector('.player-0-panel'),
                    id: 0 };
    secondPlayer = { scoreElement: document.getElementById('score-1'), 
                     currentScoreElement: document.getElementById('current-1'),
                     nameElement: document.querySelector('#name-1'),
                     playerPanel: document.querySelector('.player-1-panel'),
                     globalScore: 0,
                     id: 1 };
    diceDOM   = document.getElementById('dice-view');
}

function switchPlayer(){
    activePlayer.currentScoreElement.textContent = '0';
    activePlayer.playerPanel.classList.toggle('active');

    activePlayer === firstPlayer ? activePlayer = secondPlayer : activePlayer = firstPlayer;
    previousNumber = 0;
    roundScore = 0;
    activePlayer.playerPanel.classList.toggle('active');
    diceDOM.style.display = 'none';
}

function declareWin(){
    activePlayer.nameElement.textContent = 'Winner!!!';
    diceDOM.style.display = 'none';
    activePlayer.playerPanel.classList.add('winner');
    activePlayer.playerPanel.classList.remove('active');
    notWinner = false;
}
