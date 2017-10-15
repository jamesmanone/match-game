import { cardTypes } from '../utils/const';
import { shuffle } from '../utils';

export default class Deck {
  constructor() {
    this.cards = this.newCardList(cardTypes);
  }

  onClick = ({target}) => target.className += ' open show';

  createCard = type => {
    const newCard = document.createElement('i');
    newCard.className = `fa fa-${type}`;
    const newNode = document.createElement('li');
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
    const { cards } = this;
    for(let i=cards.length;i--;) field.appendChild(cards[i]);
  }

  shuffle = () => shuffle(this.cards);

}
