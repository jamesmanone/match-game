/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 
const cardTypes = [
  'diamond',
  'paper-plane-o',
  'anchor',
  'bolt',
  'cube',
  'leaf',
  'bicycle',
  'bomb'
];

let openCard;

const onClick = ({target}) => {
  if(target.className.includes('open')) return;  // no clicking open card
  if(!openCard) {
    openCard = target.className;
    target.className += ' open show';
  } else if (openCard === target.className) {
    openCard = target.className;
  } else {
    for (let node of document.getElementsByClassName('open')) {
      node.classList.remove('open');
      node.classList.remove('show');
    }
  }
}

const shuffle = array => {
  let current = array.length, random;
  while (current--) {
    random = Math.floor(Math.random() * (current+1));
    [array[random], array[current]] = [array[current], array[random]];
  }
  return array;
};

const createCard = type => {
  const newCard = document.createElement('i');
  newCard.className = `fa fa-${type}`;
  const newNode = document.createElement('li');
  newNode.appendChild(newCard);
  newNode.className = 'card';
  newNode.addEventListener('click', onClick);
  return newNode;
};

const newCardList = types => shuffle(
  types.reduce((list, type) => list.concat([
    // Unrolled loop for efficiency
    createCard(type),
    createCard(type)
  ]), [])
);

const resetField = () => {
  const field = document.getElementById('play-field');
  const cards = newCardList(cardTypes);
  field.innerHtml = '';
  let i = cards.length;
  while(i--) field.appendChild(cards[i]);
};


document.getElementById('restart').addEventListener('click', resetField);
document.body.onload = resetField;


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
