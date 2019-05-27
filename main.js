let gameField = document.getElementById('game-field');
let cells = gameField.children;
let newGame = document.getElementById('new-game');
let player = document.getElementById('player');
let gameData = {1:0, 2:0, 3:0,
                4:0, 5:0, 6:0,
                7:0, 8:0, 9:0};


newGame.addEventListener('click', startNewGame);

function startNewGame(event) {
    player.textContent = 'Turn: Player 1';
    for(let i = 0; i < cells.length; i++){
        cells[i].textContent = null;
    }
    gameData = {1:0, 2:0, 3:0,
                4:0, 5:0, 6:0,
                7:0, 8:0, 9:0};
    gameField.onclick = playerOne;
    for(let i = 0; i < cells.length; i++){
        cells[i].style.backgroundColor = 'grey';
    }
}



function playerOne(event){
    let target = event.target;

    if((!gameData[target.id])) {
        target.textContent = 'X';
        gameData[target.id] = 'X';
        player.textContent = 'Turn: Player 2';
        target.style.backgroundColor = 'green';
        gameField.onclick = playerTwo;
        checkWinner(gameData, 'X');
    }
}

function playerTwo(event){
    let target = event.target;

    if((!gameData[target.id])) {
        target.textContent = 'O';
        gameData[target.id] = 'O';
        player.textContent = 'Turn: Player 1';
        target.style.backgroundColor = 'red';
        gameField.onclick = playerOne;
        checkWinner(gameData, 'O');
    }

}
function checkWinner(obj, sym){
    if((obj[1] === sym && obj[2] === sym && obj[3] === sym) ||
    (obj[4] === sym && obj[5] === sym && obj[6] === sym) ||
    (obj[7] === sym && obj[8] === sym && obj[9] === sym) ||
    (obj[1] === sym && obj[4] === sym && obj[7] === sym) ||
    (obj[2] === sym && obj[5] === sym && obj[8] === sym) ||
    (obj[3] === sym && obj[6] === sym && obj[9] === sym) ||
    (obj[1] === sym && obj[5] === sym && obj[9] === sym) ||
    (obj[3] === sym && obj[5] === sym && obj[7] === sym)){
        player.textContent = `${sym} Player Won`;
        gameField.onclick = '';

    }
}
