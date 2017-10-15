import Deck from './Deck';

export default class Game {
  constructor(field) {
    this.deck = new Deck();
    this.field = field;
    this.resetField();
  }

  resetField = () => {
    this.deck.shuffle();
    const { field, deck } = this;
    for(let card of deck.cards) card.className = 'card';
    while(field.childNodes.length) field.lastChild.remove();
    deck.addToDom(field);
  }
}
