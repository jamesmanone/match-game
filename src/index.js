import './css/app.css';
import Game from './classes/Game';

let game;

const setup = () => {
  game = new Game(
    document.getElementById('play-field'),
    document.getElementById('scoreboard')
  );
};

document.body.onload = setup;
