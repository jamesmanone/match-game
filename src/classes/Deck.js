import { cardTypes } from '../utils/const';
import { shuffle } from '../utils';

export default class Deck {
  constructor({incrementMoves}, win) {
    this.incrementMoves = incrementMoves;
    this.cards = this.newCardList(cardTypes);
    this.openCards = [];
    this.noMatch = false;
    this.matchedCards = [];
    this.win = win;
  }

  onClick = ({target}) => {
    if(this.noMatch) return;  // No cheating!
    if(target.className === 'card') {
      this.openCards.push(target);
      target.className += ' open show';
      // Match
      if(this.openCards.length > 1 && this.openCards[0].dataset.type === target.dataset.type) {
        this.openCards.forEach(card => card.className = 'card match');
        this.matchedCards = this.matchedCards.concat(this.openCards);
        this.clearOpenCards();
        this.incrementMoves();
        if(this.matchedCards.length === this.cards.length) this.win();
      } else if(this.openCards.length > 1) {  // no match but open card
        this.noMatch = true;
        this.openCards.forEach(card => card.className += ' wrong');
        window.setTimeout(this.resetOpenCards, 1000);
        this.incrementMoves();
      }
    }
  }

  resetOpenCards = () => {
    for(let card of this.openCards) card.className = 'card';
    this.clearOpenCards();
    this.noMatch = false;
  }

  clearOpenCards = () => this.openCards = [];

  createCard = type => {
    const newCard = document.createElement('i');
    newCard.className = `fa fa-${type}`;
    const newNode = document.createElement('li');
    newNode.dataset.type = type;
    newNode.appendChild(newCard);
    newNode.className = 'card';
    newNode.addEventListener('click', this.onClick);
    return newNode;
  }

  newCardList = types => {
    return types.reduce((list, type) => list.concat([
      // Unrolled loop for efficiency
      this.createCard(type),
      this.createCard(type)
    ]), []);
  }

  addToDom = field => {
    for(let card of this.cards) field.appendChild(card);
  }

  shuffle = () => {
    shuffle(this.cards);
    this.matchedCards = [];
  };

}
