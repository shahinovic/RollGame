'use strict';
const q = q => document.querySelector(q);
const qa = q => document.querySelectorAll(q);
// selecting elements

const diceEl = q('.dice');
const rollBtn = q('.btn--roll');
const holdBtn = q('.btn--hold');
const resetBtn = q('.btn--new');
const players = Array.from(qa('.player'));

// reset the application to the initial state

diceEl.classList.add('hidden');

// start game functionality

// global game variables

let dice, scores, current, playerIndex, isPlaying;

// reset game functionality
const reset = () => {
  playerIndex = 0;
  scores = [0, 0];
  current = 0;
  isPlaying = true;

  players.map(p => p.classList.remove('player--active', 'player--winner'));
  players[playerIndex].classList.add('player--active');
  qa(`.name`).forEach((name, i) => (name.innerHTML = `Player ${i + 1}`));

  qa(`.score`).forEach(score => (score.innerHTML = 0));
  qa(`.current-score`).forEach(score => (score.innerHTML = 0));

  diceEl.classList.add('hidden');
};

reset();

// rolling dice functionality

const diceSrc = num => `dice-${num}.png`;
const changePlayer = index => {
  playerIndex = index === 1 ? 0 : 1;
  players.map(p => p.classList.toggle('player--active'));
  diceEl.classList.add('hidden');
};

const changeDiceImage = dice => (diceEl.src = diceSrc(dice));

const changeCurrentState = value => {
  if (value !== 1) {
    current += value;
    q(`#current--${playerIndex}`).innerHTML = current;
  } else {
    current = 0;
    q(`#current--${playerIndex}`).innerHTML = current;
    changePlayer(playerIndex);
  }
};

const rollDice = () => {
  if (isPlaying) {
    dice = Math.floor(Math.random() * 6) + 1;
    changeDiceImage(dice);
    diceEl.classList.remove('hidden');
    changeCurrentState(dice);
  }
};

// hold functionality
const holdValue = () => {
  if (isPlaying) {
    diceEl.classList.add('hidden');
    scores[playerIndex] += current;
    q(`#score--${playerIndex}`).innerHTML = scores[playerIndex];
    current = 0;
    q(`#current--${playerIndex}`).innerHTML = 0;
    checkForWinner();
  }

  //   if (isPlayerOne) {
  //     if (current1) {
  //       if (score1 + current1 < 100) {
  //         score1 += current1;
  //         score1El.innerHTML = score1;
  //         current1 = 0;
  //         current1El.innerHTML = current1;
  //         changePlayer(false);
  //       } else {
  //         score1 = 100;
  //         score1El.innerHTML = score1;
  //         current1 = 0;
  //         current1El.innerHTML = current1;
  //       }
  //     }
  //   } else {
  //     if (current2) {
  //       if (score2 + current2 < 100) {
  //         score2 += current2;
  //         score2El.innerHTML = score2;
  //         current2 = 0;
  //         current2El.innerHTML = current2;
  //         changePlayer(true);
  //       } else {
  //         score2 = 100;
  //         score2El.innerHTML = score2;
  //         current2 = 0;
  //         current2El.innerHTML = current2;
  //       }
  //     }
  //   }
};

const checkForWinner = () => {
  //   if (scores[0] === 100 || score2 === 100) {
  //     rollBtn.setAttribute('disabled', true);
  //     holdBtn.setAttribute('disabled', true);
  //   }
  if (scores[playerIndex] >= 100) {
    q(`#name--${playerIndex}`).innerHTML = 'WINNER !';
    q(`.player--${playerIndex}`).classList.remove('player--active');
    q(`.player--${playerIndex}`).classList.add('player--winner');
    diceEl.classList.add('hidden');
    isPlaying = false;
  } else {
    changePlayer(playerIndex);
  }
};

rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', holdValue);
resetBtn.addEventListener('click', reset);
