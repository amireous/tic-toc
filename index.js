'use strict';

const XLogo = document.querySelector('.X-logo');
const OLogo = document.querySelector('.O-logo');
const signsContainer = document.querySelector(".start-game-logos");
const homePage = document.querySelector(".home-page")
const gamePage = document.querySelector(".game")
const playerVsCpuBtn = document.querySelector('.player-vs-cpu')
const playerVsPlayerBtn = document.querySelector('.player-vs-player');
const currentPlayerTurnSign = document.querySelector('.game-turn-display > div');
const cards = document.querySelectorAll('.game-card');
const playerXScore = document.querySelector('.player-X-score  span');
const playerOScore = document.querySelector('.player-O-score  span')
let playerSelectedSign = undefined;

let oTurn = false;
let currentClass;
let winningArry;
const playerXSelectedCards = [];
const playerOSelectedCards = []

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

signsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('start-game-logos')) return
    const selectedSign = e.target.closest('div.sign');

    selectedSign.classList.add('selected-sign');
    // selectedSign.querySelector('img').style.filter = 'invert(17%) sepia(50%) saturate(393%) hue-rotate(154deg) brightness(94%) contrast(95%)'
    // //   selectedSign.classList.add('')
    // // selectedSign
    // //   if(signsContainer.some(el => el.classList.contains))
    console.log('selecte', selectedSign.classList);
    if (selectedSign) selectedSign.classList.remove('hover-on-selected-sign');
    if (selectedSign.classList.contains('X-logo')) {
        OLogo.classList.remove('selected-sign');
        oTurn = false;
    } else {
        XLogo.classList.remove('selected-sign');
        oTurn = true
    }
});

playerVsCpuBtn.addEventListener('click', e => {

    // playerSelectedSign = 'x';
    // oTurn = false
    startGame();
    cpuLayout();
});

const startGame = function () {
    gamePage.style.zIndex = 0
    homePage.classList.add('hidden');
    gamePage.classList.remove('hidden');
    currentPlayerTurnSign.insertAdjacentHTML('afterbegin', `<img src="images/SVG/icon-${oTurn ? 'o' : 'x'}-default.svg"/>`);
    setCurrentPlayer()
}

const cpuLayout = function () {
    if (oTurn) {
        playerOScore.textContent = '(YOU)';
        playerXScore.textContent = '(CPU)'
    } else {
        playerOScore.textContent = '(CPU)';
        playerXScore.textContent = '(YOU)'
    }


}

const pVpLayout = function () {
    playerOScore.textContent = '(P1)';
    playerXScore.textContent = '(P2)'
}

console.log(playerOScore, playerXScore)

const setCurrentPlayer = function () {
    if (oTurn) {
        document.querySelector('div.game-cards-container').classList.add('o')
    } else {
        document.querySelector('div.game-cards-container').classList.add('x')
    }

    playerSetter()
}

const submitAnswer = function () {


};

const playerSetter = function () {
    cards.forEach((card, i, cardsArr) => {
        card.addEventListener('click', () => {
            if (oTurn) {
                cardsArr[i].classList.add('o');
            }

            if (!oTurn) {
                cardsArr[i].classList.add('x')
            }
            cardsArr[i].style.cursor = 'not-allowed'
            if (oTurn) {
                playerOSelectedCards.push(i)
            } else {
                playerXSelectedCards.push(i)
            }
            checkWin('o')
        });


    });
}

function checkWin(currentClass) {
    // return winningPositions.some(combination => {
    //     return combination.every((element, index, array) => {
    //         let condition = cards[element].classList.contains(currentClass);
    //         if (condition) winningArry = array;
    //         console.log(condition)
    //         return condition;
    //     });
    // });

    winningPositions.every(pos => {
        console.log(pos);
        pos.every((item, i, arr) => {
            console.log(cards[item])
        })
    })
}

const checkWinner = function (currentClass) {

}
