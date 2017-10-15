import './css/app.css';
import Game from './classes/Game';

let game;

const setup = () => {
  game = new Game(document.getElementById('play-field'));
  document.getElementById('restart').addEventListener('click', game.resetField);

};

document.body.onload = setup;
