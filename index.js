// TODO Create tic tac toe Game

// TODO Store the gameboard in the Gameboard object using Module

const gameboardModule = (() => {
    'use strict';

    let _gameboard = [];

    const getGameboard = () => {
         return _gameboard
    } 

    const setGameboard = (mark) => {
        _gameboard.push(mark);
    }

    return {
        getGameboard: getGameboard,
        setGameboard: setGameboard
    };
})();

// TODO Store players in Player object using FF

const playerFactory = (name, mark) => {

    const getName = () => name;
    const getMark = () => mark;

    const playerMove = (cell) => {
        
        if(!cell.innerText) {
            gameboardModule.setGameboard(mark);
            cell.innerText = mark;
        }
    }

    return {getName, getMark, playerMove}

};

const playerOne = playerFactory('Player One', 'X');

const playerTwo = playerFactory('Player Two', 'O');


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
            }
        });
    }
    
    return {
        getCurrentPlayer: getCurrentPlayer,
        displayMark: displayMark
    }

})();

game.displayMark();
