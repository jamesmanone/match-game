import Deck from './Deck';
import Score from './Score';

export default class Game {
  constructor(field, scoreboard) {
    this.score = new Score(scoreboard, this);
    this.deck = new Deck(this.score);
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
  }
}
