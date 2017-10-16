
export default class Score {
  constructor(board, {resetField}) {
    this.stars = board.getElementsByClassName('stars')[0];
    this.moves = board.getElementsByClassName('moves')[0];
    this.timer = board.getElementsByClassName('timer')[0];
    board.getElementsByClassName('restart')[0].addEventListener('click', resetField);
    this.moveCount = 0;
    this.startTime = Date.now();
    this.clock;
  }

  incrementMoves = () => {
    this.moves.innerText = ++this.moveCount;
    if(this.moveCount === 16) this.removeStar();
    else if(this.moveCount === 32) this.removeStar();
  }

  startClock = () => this.clock = window.setInterval(this.updateTimer, 1000);

  stopClock = () => window.clearInterval(this.clock);

  updateTimer = () => {
    const elapsed = Math.floor((Date.now()-this.startTime)/1000);
    let minutes = Math.floor(elapsed/60);
    let seconds = Math.floor(elapsed-(minutes*60));
    if(minutes<10) minutes = `0${minutes}`;
    if(seconds<10) seconds = `0${seconds}`;
    this.timer.innerText = `${minutes}:${seconds}`;
  }

  removeStar = () => this.stars.getElementsByClassName('fa')[0].remove();

  star = () => {
    const icon = document.createElement('i');
    icon.className = 'fa fa-star';
    const wrapper = document.createElement('li');
    wrapper.appendChild(icon);
    return wrapper;
  }

  reset = () => {
    this.moveCount = 0;
    this.moves.innerText = this.moveCount;
    this.stars.innerHTML = '';
    let stars = 3;
    while(stars--) this.stars.appendChild(this.star());
    this.startTime = Date.now();
    if(this.clock) window.clearInterval(this.clock);
    this.updateTimer();
    this.startClock();
  }
}
