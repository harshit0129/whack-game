const moles = document.querySelectorAll('.mole');
const scoreDisplay = document.getElementById('score');
const winMessage = document.getElementById('win-message');
const restartBtn = document.getElementById('restart-btn');

const WIN_SCORE = 5;
let score = 0;
let gameInterval;
let isRunning = false;
function startGame() {
    // Ensure any previous game loop is cleared before starting a new one
    if (gameInterval) clearInterval(gameInterval);
    score = 0;
    scoreDisplay.textContent = score;
    winMessage.style.display = 'none';
    restartBtn.style.display = 'none';
    isRunning = true;
  
    gameInterval = setInterval(randomMole, 1000);
  }
  function randomMole() {
    moles.forEach(mole => mole.classList.remove('active'));
    const index = Math.floor(Math.random() * moles.length);
    moles[index].classList.add('active');
  }
  moles.forEach(mole => {
    mole.addEventListener('click', () => {
      if (!isRunning) return;
      if (mole.classList.contains('active')) {
        score++;
        scoreDisplay.textContent = score;
        // Deactivate immediately to avoid multiple scoring on the same mole
        mole.classList.remove('active');
        if (score >= WIN_SCORE) {
          stopGame();
        }
      }
    });
  });
  function stopGame() {
    clearInterval(gameInterval);
    gameInterval = undefined;
    moles.forEach(mole => mole.classList.remove('active'));
    winMessage.style.display = 'block';
    restartBtn.style.display = 'inline-block';
    isRunning = false;
  }
  restartBtn.addEventListener('click', () => {
    startGame();
  });
  // Start the game after DOM is fully parsed
window.addEventListener('DOMContentLoaded', startGame);