let gameField = document.getElementById('game-field');
let fieldRows = gameField.children;
let newGame = document.getElementById('new-game');
let resetScoreButton = document.getElementById('reset-score');
let player = document.getElementById('player');
let playerOneScore = document.getElementById('player-one-score');
let playerTwoScore = document.getElementById('player-two-score');
let winStatus = 0;
let gameFieldSize = 3;
const gameData = [];
const playerOne = {
    name: 'Player 1',
    icon: 'X',
    score: 0
};  
const playerTwo = {
    name: 'Player 2',
    icon: 'O',
    score: 0
};
let currentPlayer = playerOne;

newGame.addEventListener('click', startNewGame);
resetScoreButton.addEventListener('click', resetScore);
window.onload = recoverGameData;
gameField.addEventListener('click', currentPlayerTurn);

createGameField(gameFieldSize);

function createGameField(fieldSize){
    for(let i = 0; i < fieldSize; i++){
        gameData[i] = [];
        let fieldRow = document.createElement('div');
        fieldRow.setAttribute('class',`row-${i}`);
        for(let j = 0; j < fieldSize; j++){
            gameData[i][j] = null;
            let fieldCell = document.createElement('div');
            fieldCell.setAttribute('class',`cell-${j}`);
            fieldRow.appendChild(fieldCell);
        }
        gameField.appendChild(fieldRow);
        gameField.style.width = (gameFieldSize * 100)+'px';
    }
}

function startNewGame() {
    winStatus = 0;
    currentPlayer = playerOne;
    player.textContent = `${currentPlayer.name}`;
    for(let i = 0; i < fieldRows.length; i++){
        let fieldCells = fieldRows[i].children;
        gameData[i] = [];
        for(let j = 0; j < fieldCells.length; j++){
            gameData[i][j] = null;
            fieldCells[j].textContent = null;
        }
    }
    gameField.addEventListener('click', currentPlayerTurn);
    saveGameData();
}


function pushData(cell, row){
    gameData[row.className[4]][cell.className[5]] = currentPlayer.icon;
}

function togglePlayer() {
    if(currentPlayer === playerOne) {
        currentPlayer = playerTwo;
    } else {
        currentPlayer = playerOne;
    }
    player.textContent = `${currentPlayer.name}`;
}

function fillCell(cell) {
    cell.textContent = currentPlayer.icon;
}

function currentPlayerTurn(event){
    let cell = event.target;
    let row = cell.parentElement;
    event.preventDefault();
    if(!cell.textContent){
        pushData(cell, row);
        fillCell(cell);
        checkWinner(cell, row);
        togglePlayer();
        saveGameData();
    }
}

function setScore(){
    if(playerOne === currentPlayer){
        playerOneScore.textContent = playerOne.score;
    } else {
        playerTwoScore.textContent = playerTwo.score;
    }
}

function checkWinner(cell, row){
    let selectedCollumn = +cell.className[5];
    let selectedRow = +row.className[4];
    for(let i = 0; i < gameData.length; i++){
        if(gameData[selectedRow][i] === currentPlayer.icon){
            if(i === gameData.length - 1) stopGame();
            continue;
        }
        break;
    }
    for(let i = 0; i < gameData.length; i++){
        if(gameData[i][selectedCollumn] === currentPlayer.icon){
            if(i === gameData.length - 1) stopGame();
            continue;
        }
        break;
    }
    for(let i = 0; i < gameData.length; i++){
        if(gameData[i][i] === currentPlayer.icon){
            if(i === gameData.length - 1) stopGame();
            continue;
        }
        break;
    }
    for(let i = gameData.length - 1, j = 0; i >= 0; i--, j++){
        if(gameData[j][i] === currentPlayer.icon){
            if(i === 0) stopGame();
            continue;
        }
        break;
    }
}

function stopGame(){
    gameField.removeEventListener('click', currentPlayerTurn);
    alert(` ${currentPlayer.name} Won!`);
    winStatus = 1;
    currentPlayer.score++;
    setScore();
    saveScore();
    
}

function saveScore(){
    localStorage.setItem('playerOneScore',playerOne.score);
    localStorage.setItem('playerTwoScore',playerTwo.score);
}

function saveGameData(){
    for(let i = 0; i < gameData.length; i++){
        localStorage.setItem(`gameData${i}`, gameData[i].join(','));
    }
    localStorage.setItem('icon',currentPlayer.icon);
    localStorage.setItem('winStatus',winStatus);
}
function getGameData(){
    for(let i = 0; i < gameData.length; i++){
        gameData[i] = localStorage.getItem(`gameData${i}`).split(',');
    }
}

function recoveredUserSet(){
    let recoveredIcon = localStorage.getItem('icon',currentPlayer.icon);   
    if(recoveredIcon === 'X'){
        currentPlayer = playerOne;       
    } else {
        currentPlayer = playerTwo;
    }
}

function recoveredWinStatusCheck(){
    winStatus = +localStorage.getItem('winStatus');
    if(winStatus){
        gameField.removeEventListener('click', currentPlayerTurn);
    }
}
function recoverGameData(){
    getGameData();
    for(let i = 0; i < gameData.length; i++){
        fieldCells = fieldRows[i].children;
        for(let j = 0; j < gameData[i].length; j++){
            fieldCells[j].textContent = gameData[i][j];
        }
    }
    player.textContent = `${currentPlayer.name}`;
    recoveredUserSet();
    recoveredWinStatusCheck();
    getScore();
    setScore();
}
function getScore(){
    playerOne.score = +localStorage.getItem('playerOneScore');
    playerTwo.score = +localStorage.getItem('playerTwoScore');
}
function resetScore(){
    playerOne.score = 0;
    playerTwo.score = 0;
    setScore();
    saveScore();
}
function setScore(){
    playerOneScore.textContent = playerOne.score;
    playerTwoScore.textContent = playerTwo.score;
}