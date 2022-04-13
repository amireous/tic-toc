"use strict";

const XLogo = document.querySelector(".X-logo");
const OLogo = document.querySelector(".O-logo");
const signsContainer = document.querySelector(".start-game-logos");
const homePage = document.querySelector(".home-page");
const gamePage = document.querySelector(".game");
const playerVsCpuBtn = document.querySelector(".player-vs-cpu");
const playerVsPlayerBtn = document.querySelector(".player-vs-player");
const restartBtn = document.querySelector(".game-restart");
const currentPlayerMarkEL = document.querySelector(".game-turn-display > div");
const cards = document.querySelectorAll(".game-card");
const cardsContainer = document.querySelector(".game-cards-container");
const playerXScore = document.querySelector(".player-X-score");
const playerOScore = document.querySelector(".player-O-score");
const modal = document.querySelector(".modal");
const winnerTitle = modal.querySelector(".winner-title");
const winnerDetails = modal.querySelector(".winner-details");
const quiteBtn = modal.querySelector(".quite-btn");
const nextRoundBtn = document.querySelector(".next-round-btn");

let currentPlayerMark = "o";
let oTurn = false;
let currentClass;
let winningArray;
let xWinCount = 0;
let oWinCount = 0;
let tieCount = 0;
let isVsPlayer = false;
let isFinished = false;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

OLogo.querySelector("svg").style.fill = "#1a2a33";

signsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("start-game-logos")) return;
  const selectedSign = e.target.closest("div.sign");
  selectedSign.classList.add("selected-sign");

  if (selectedSign) selectedSign.classList.remove("hover-on-selected-sign");
  if (selectedSign.classList.contains("X-logo")) {
    OLogo.classList.remove("selected-sign");
    OLogo.querySelector("svg").style.fill = "#a8bfc9";
    XLogo.querySelector("svg").style.fill = "#1a2a33";
  } else {
    XLogo.classList.remove("selected-sign");
    XLogo.querySelector("svg").style.fill = "#a8bfc9";
    OLogo.querySelector("svg").style.fill = "#1a2a33";
  }
});

const setGameMode = function () {
  const btnClickedId = this.id;

  if (btnClickedId === "vs-player") isVsPlayer = true;
  startGame();
};

async function setCpuChoice() {
  currentClass = oTurn ? "o" : "x";

  cardsContainer.classList.remove("o");
  cardsContainer.classList.remove("x");

  cards.forEach((card) => card.removeEventListener("click", gameHandler));
  await new Promise((resolve) => {
    setTimeout(() => {
      setMark(cpuCardChooser(), currentClass);
      setLogic();
      resolve("resolved");
    }, 2000);
  });

  setPlayerChoice();
}

const cpuGameConfig = function () {
  if (currentPlayerMark === "o") setCpuChoice();
  else setPlayerChoice();
};

const startGame = function () {
  gamePage.style.zIndex = 0;
  homePage.classList.add("hidden");
  gamePage.classList.remove("hidden");
  setTimeout(() => {
    homePage.style.display = "none";
  }, 400);

  setCurrentPlayer();
  setScoreBoard();
  setCurrentTurn();
  if (!isVsPlayer) cpuGameConfig();
  else setPlayerChoice();
};

function setScoreBoard() {
  const xWinEl = document.getElementById("x-win");
  const tieEl = document.getElementById("tie");
  const oWinEl = document.getElementById("o-win");

  xWinEl.innerHTML = `${
    isVsPlayer ? "X (P1)" : currentPlayerMark === "o" ? "X (CPU)" : "X (You)"
  } <span id="x-win-inner" class="X-score">${xWinCount}</span>`;
  tieEl.innerHTML = `Ties <span id="tie-inner" class="ties-score">${tieCount}</span>`;
  oWinEl.innerHTML = `${
    isVsPlayer ? "O (P2)" : currentPlayerMark === "o" ? "O (You)" : "O (CPU)"
  } <span id="o-win-inner" class="O-score">${oWinCount}</span>`;
}

const setCurrentPlayer = function () {
  if (oTurn) {
    cardsContainer.classList.add("o");
    cardsContainer.classList.remove("x");
  } else {
    cardsContainer.classList.add("x");
    cardsContainer.classList.remove("o");
  }
};

const cpuCardChooser = function () {
  const availableCards = [...cards].filter(
    (card) => !card.classList.contains("o") && !card.classList.contains("x")
  );
  return availableCards[Math.floor(Math.random() * availableCards.length)];
};

const setCurrentTurn = function () {
  currentPlayerMarkEL.innerHTML = `<img src="images/SVG/icon-${
    oTurn ? "o" : "x"
  }-default.svg"/> TURN`;
};

const switchPlayer = function () {
  oTurn = !oTurn;
  setCurrentTurn();
};

const setPlayerChoice = function () {
  cards.forEach((card) => {
    if (!card.classList.contains("x") && !card.classList.contains("o")) {
      card.addEventListener("click", gameHandler);
    }
  });
};

const gameHandler = function (event) {
  const clickedCard = event.target;
  currentClass = oTurn ? "o" : "x";
  setMark(clickedCard, currentClass);
  setLogic();

  if (!isVsPlayer && !checkWinner(currentClass) && !isDraw()) setCpuChoice();
};

const setMark = function (card, className) {
  if (isFinished) return;
  card.classList.add(className);
  card.style.cursor = "not-allowed";
};

const setLogic = function () {
  if (isFinished) return;
  if (checkWinner(currentClass)) {
    endGameChecker(false);
  } else if (isDraw()) {
    endGameChecker(true);
  } else {
    switchPlayer();
    setCurrentPlayer();
  }
};

const checkWinner = function (currentClass) {
  return winningPositions.some((position) => {
    return position.every((el, i, array) => {
      let isWinnerArray = cards[el].classList.contains(currentClass);
      if (isWinnerArray) winningArray = array;
      return isWinnerArray;
    });
  });
};

const endGameChecker = function (isDraw = false) {
  if (isDraw) {
    tieCount++;
    const tieScore = document.querySelector(".ties-score");
    tieScore.textContent = tieCount;
    showModal(true);
  } else {
    setWinner();
  }
};

const setWinner = function () {
  const xScore = playerXScore.querySelector(".X-score");
  const oScore = playerOScore.querySelector(".O-score");
  winningArray.forEach((el) => cards[el].classList.add("win"));
  if (oTurn) oWinCount++;
  else xWinCount++;

  xScore.textContent = xWinCount;
  oScore.textContent = oWinCount;
  showModal(false);
  isFinished = true;
};

const restartGame = function (event) {
  isDraw = false;
  xWinCount = 0;
  oWinCount = 0;
  winningArray = [];
  cards.forEach((el) => el.classList.remove(["o", "x", "win"]));
};

const showModal = function (draw) {
  modal.style.display = "flex";

  if (isVsPlayer) {
    winnerTitle.textContent = oTurn ? "Player 2 Win" : "Player 1 win";
  } else if (oTurn && currentPlayerMark === "o") {
    winnerTitle.textContent = "You won";
  } else if (!oTurn && currentPlayerMark === "x") {
    winnerTitle.textContent = "You won";
  } else {
    winnerTitle.textContent = "Oh no you lost";
  }

  winnerDetails.textContent = `${oTurn ? "O" : "X"} TAKES THE ROUND`;
  winnerDetails.style.color = oTurn ? "#f2b137" : "#31c3bd";

  if (draw) {
    winnerDetails.textContent = "";
    winnerTitle.textContent = "ROUND TIED";
    winnerDetails.style.color = "#a8bfc9";
  }
};

const isDraw = function () {
  return [...cards].every((card) => {
    return card.classList.contains("o") || card.classList.contains("x");
  });
};

function setNextRound(event) {
  isFinished = false;
  oTurn = false;
  modal.style.display = "none";

  cards.forEach((card) => {
    card.classList.remove("x");
    card.classList.remove("o");
    card.classList.remove("win");
    card.removeEventListener("click", gameHandler);
  });

  startGame();
}

function getUserChoiceHandler() {
  currentPlayerMark = this.id;
  this.classList.add("selected");

  if (this.nextElementSibling)
    this.nextElementSibling.classList.remove("selected");
  else this.previousElementSibling.classList.remove("selected");
}

quiteBtn.addEventListener("click", (e) => {
  location.reload();
});

signsContainer.querySelectorAll("div").forEach((mark) => {
  mark.addEventListener("click", getUserChoiceHandler);
});

// document
//   .querySelector(".game-restart")
//   .addEventListener(".click", (e) => setNextRound);

const restartHandler = function () {
  xWinCount = 0;
  oWinCount = 0;
  tieCount = 0;

  setNextRound();
};

restartBtn.addEventListener("click", restartHandler);
nextRoundBtn.addEventListener("click", setNextRound);
playerVsCpuBtn.addEventListener("click", setGameMode);
playerVsPlayerBtn.addEventListener("click", setGameMode);
