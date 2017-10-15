import Deck from './Deck';
import Score from './Score';

export default class Game {
  constructor(field, scoreboard) {
    this.score = new Score(scoreboard, this);
    this.deck = new Deck(this.score, this.win);
    this.field = field;
    this.resetField();
  }

  resetField = () => {
    const { field, deck, score } = this;
    deck.shuffle();
    for(let card of deck.cards) card.className = 'card';
    while(field.childNodes.length) field.lastChild.remove();
    deck.addToDom(field);
    score.reset();
    let modal = document.getElementsByClassName('win-modal')[0];
    if(modal) modal.remove();
  }

  win = () => {
    this.score.stopClock();
    const stars = this.score.moveCount < 16 ? 3 :
      this.score.moveCount < 32 ? 2 : 1;
    const time = this.score.timer.innerText;
    window.setTimeout(() => this.createModal(time, stars), 500);
  }

  createModal = (time, stars) => {
    document.body
      .appendChild(this.modal())
      .appendChild(this.congrats())
      .parentNode.appendChild(this.winStars(stars))
      .parentNode.appendChild(this.winTime(time))
      .parentNode.appendChild(this.restart());
  }

  modal = () => {
    const modal = document.createElement('div');
    modal.className = 'win-modal';
    return modal;
  }

  congrats = () => {
    const message = document.createElement('h1');
    message.innerText = 'Congratulations! You Won!';
    message.className = 'message';
    return message;
  }

  winStars = stars => {
    const winStars = document.createElement('ul');
    winStars.className = 'stars';
    winStars.innerHTML = '<strong>Rating:</strong> ';
    while(stars--) winStars.appendChild(this.score.star());
    return winStars;
  }

  winTime = time => {
    const winTime = document.createElement('span');
    winTime.className = 'timer';
    winTime.innerHTML = `<strong>Time:</strong> ${time}`;
    return winTime;
  }

  restart = () => {
    const restart = document.createElement('a');
    restart.className = 'restart';
    restart.innerText = 'Play Again?';
    restart.setAttribute('href', '#');
    restart.addEventListener('click', this.resetField);
    return restart;
  }
}
