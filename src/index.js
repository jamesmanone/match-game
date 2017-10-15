import './css/app.css';
import Game from './classes/Game';

const setup = () => new Game(
  document.getElementById('play-field'),
  document.getElementById('scoreboard')
);

document.body.onload = setup;
