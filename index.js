// TODO Create tic tac toe Game

const gameboardModule = (() => {
    'use strict';

    let _gameboard = [];

    const resetGameboard = () => {
        _gameboard = [];
    }
    const getGameboard = () => {
         return _gameboard
    } 

    const setGameboard = (mark) => {
        _gameboard.push(mark);
    }


    return {
        getGameboard: getGameboard,
        setGameboard: setGameboard,
        resetGameboard: resetGameboard
    };
})();

const playerFactory = (name, mark) => {

    const getName = () => name;
    const getMark = () => mark;

    const playerMove = (cell) => {
        
        if(!cell.innerText) {
            gameboardModule.setGameboard(mark);
            cell.innerText = mark;
        }
    }

    const isWinner = () => {
        console.log(name);
        const gameOver = document.querySelector('.display-winner'); 
        const displayIsWinner = document.querySelector('.display-winner :nth-child(2)');
        displayIsWinner.innerText = `Winner is ${name}`;
        gameOver.classList.remove('hidden');
    }

    return {getName, getMark, playerMove, isWinner}

};


const playerOne = playerFactory('X', 'X');

const playerTwo = playerFactory('O', 'O');

// TODO Create object to store flow of game

const game = (() => {
    'use strict';
    
    
    const getCurrentPlayer = () => {     
        let currentPlayer = playerOne;
        let gameArr = gameboardModule.getGameboard();

        if(gameArr.length < 1) {
            currentPlayer = playerOne; 
        }
        else if(gameArr.length >= 1) {
            if(gameArr[gameArr.length - 1] === "X") {
                currentPlayer = playerTwo;
            } else if(gameArr[gameArr.length - 1] === "O") {
                currentPlayer = playerOne;
            }
        } 
        return currentPlayer;
    }

    const displayMark = () => {
        const grid = document.querySelector('.grid');
    
        grid.addEventListener('click', (e) => {
            if(e.target.classList.contains('cell')) {
                getCurrentPlayer().playerMove(e.target)
                checkWinner(e.target);
            }
        });
    }

    let rows = [[], [], []];
    let colomns = [[], [], []];
    let diagonals = [[], []]; // 1, 3, 5, 7, 9
    let winner;
    
    const checkWinner = (cell) => {

        let cellNum = Number(cell.id);

        const addToCol= (mark) => {
            if(cellNum === 1 || cellNum === 4 || cellNum === 7) {
                colomns[0].push(mark);
            }
            else if(cellNum === 2 || cellNum === 5 || cellNum === 8) {
                colomns[1].push(mark);
            }
            else {
                colomns[2].push(mark);
            }
        }

        const addToDiag = (mark) => {
            if(cellNum === 5) {
                diagonals[0].push(mark);
                diagonals[1].push(mark);
            } 
            else if (cellNum === 1 || cellNum === 9) {
                diagonals[0].push(mark);
            }
            else if(cellNum === 3 || cellNum === 7) {
                diagonals[1].push(mark);
            }
        }

        const addToRow = (() => {
            if(cellNum <= 3) {
                rows[0].push(cell.innerText);
                addToCol(cell.innerText);
                addToDiag(cell.innerText);
            }
            else if(cellNum <= 6) {
                rows[1].push(cell.innerText);
                addToCol(cell.innerText);
                addToDiag(cell.innerText);
            }
            else {
                rows[2].push(cell.innerText);
                addToCol(cell.innerText);
                addToDiag(cell.innerText);
            }
        })();
        
        const allEqual = (arr) => {
            return arr.every(val => val === arr[0]);
        }
        
        
        const outputWinner = (arrs) => {
            for(let arr of arrs) {
                if(arr.length === 3) {
                    if(allEqual(arr)) {
                        if(arr[0] === "X") {
                            playerOne.isWinner()
                            endGame();
                        } else {
                            playerTwo.isWinner()
                            endGame();
                        }
                    }
                }
            }
        }

        outputWinner(rows);
        outputWinner(colomns);
        outputWinner(diagonals);
    }

    const endGame = () => {  

        rows = [[], [], []];
        colomns = [[], [], []];
        diagonals = [[], []];
        gameboardModule.resetGameboard();

        const cells = document.querySelectorAll('.cell');
        for (let cell of cells) {
            cell.innerText = '';
        }
        
    }
    
    return {
        getCurrentPlayer: getCurrentPlayer,
        displayMark: displayMark,
        winner: winner
    }

})();

game.displayMark();
