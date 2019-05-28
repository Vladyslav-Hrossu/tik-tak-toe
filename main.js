let gameField = document.getElementById('game-field');
let fieldRows = gameField.children;
let newGame = document.getElementById('new-game');
let player = document.getElementById('player');
const gameData = [];
const playerOne = {
    name: 'Player 1',
    icon: 'X',
    color: 'red'
};  
const playerTwo = {
    name: 'Player 2',
    icon: 'O',
    color: 'green'
};
let currentPlayer = playerOne;

newGame.addEventListener('click', startNewGame);
gameField.addEventListener('click', currentPlayerTurn);

createGameField(3);

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
    }
}

function startNewGame() {
    currentPlayer = playerOne;
    player.textContent = `Turn: ${currentPlayer.name}`;
    for(let i = 0; i < fieldRows.length; i++){
        let fieldCells = fieldRows[i].children;
        gameData[i] = [];
        for(let j = 0; j < fieldCells.length; j++){
            gameData[i][j] = null;
            fieldCells[j].textContent = null;
            fieldCells[j].style.backgroundColor = 'white';
        }
    }
    gameField.addEventListener('click', currentPlayerTurn);
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
    player.textContent = `Turn: ${currentPlayer.name}`;
}

function fillCell(cell) {
    cell.textContent = currentPlayer.icon;
    cell.style.backgroundColor = currentPlayer.color;
}

function currentPlayerTurn(event){
    let cell = event.target;
    let row = cell.parentElement;
    if(!cell.textContent){
        pushData(cell, row);
        fillCell(cell);
        checkWinner(cell, row);
        togglePlayer();
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
}
