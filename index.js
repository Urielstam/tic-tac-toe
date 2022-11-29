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

    return {getName, getMark}

};

const playerOne = playerFactory('Player One', 'X');

const playerTwo = playerFactory('Player Two', 'O');

console.log(playerOne.getMark());

console.log(playerTwo.getName());


// Game Flow Logic:
// 


// TODO Create object to store flow of game

const gameFLow = {

};

// * Have as little global code as possible


function renderContent() {
    const cells = document.querySelectorAll('.cell');

    let array = gameboardModule.getGameboard();

    for(let i = 0; i < cells.length; i++) {
        (function () {
            this.addEventListener('click', (e) => {
                if(!this.innerText) {
                    this.innerText = 'X'
                }
            })
        }).call(cells[i])
    }
}

renderContent()