const startButton = document.getElementById('startButton');
const greeting = document.getElementById('greeting');
const game = document.getElementById('game');
const message = document.getElementById('message');
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');

let fartSound; // Declare here
let score = 0;

startButton.addEventListener('click', () => {
  fartSound = new Audio('fart.mp3'); // Load fart sound AFTER click
  fartSound.volume = 1; // Max volume
  greeting.style.display = 'none';
  game.style.display = 'block';
  startGame();
});

function startGame() {
  let balloonInterval = setInterval(() => {
    createBalloon();
  }, 800);

  function createBalloon() {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.innerText = '💩';
    balloon.style.left = Math.random() * (gameArea.offsetWidth - 50) + 'px';
    balloon.style.top = gameArea.offsetHeight + 'px';

    gameArea.appendChild(balloon);

    let moveUp = setInterval(() => {
      let currentTop = parseInt(balloon.style.top);
      balloon.style.top = (currentTop - 1) + 'px';

      if (currentTop < -70) {
        balloon.remove();
        clearInterval(moveUp);
      }
    }, 20);

    balloon.addEventListener('click', () => {
      score++;
      fartSound.currentTime = 0; // Reset sound if clicked fast
      fartSound.play();
      scoreDisplay.textContent = score;
      balloon.remove();
      clearInterval(moveUp);

      if (score >= 2) {
        clearInterval(balloonInterval);
        setTimeout(() => {
            game.style.display = 'none';
            message.style.display = 'block';
          
            // Show embarrassing pic after 1 second
            setTimeout(() => {
              document.getElementById('embarrassingPic').style.display = 'block';
            }, 1000);
          
          }, 500);
          
      }
    });
  }
}
