let container = document.querySelector("#container");
let block = document.querySelector("#block");
let dino = document.querySelector("#dino");
let road = document.querySelector("#road");
let cloud = document.querySelector("#cloud");
let score = document.querySelector("#score");
let gameOver = document.querySelector("#gameOver");
let highScoreElement = document.querySelector("#highScore");

let interval = null;
let playerScore = 0;
let highScore = 0;



const scoreCounter = () => {
  playerScore++;
  score.innerHTML = `Score <b>${playerScore}</b>`
};

// Start Game

window.addEventListener("keydown", (start) => {
  if (start.code === "Space") {
    gameOver.style.display = "none";
    block.classList.add("blockActive");
    road.firstElementChild.style.animation = "roadAnimate 1.5s linear infinite";
    cloud.firstElementChild.style.animation = "cloudAnimate 50s linear infinite";

    let playerScore = 0;

    interval = setInterval(scoreCounter, 200);
  }
});

// Jump Dino

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    if (dino.classList !== "dinoActive") {
      dino.classList.add("dinoActive");
      setTimeout(() => {
        dino.classList.remove("dinoActive")
      }, 500)
    }
  }
});

// 'Game Over' if Dino hits blocks

let result = setInterval(() => {
  let dinoBottom = parseInt(getComputedStyle(dino).getPropertyValue("bottom"));
  //    console.log("dinoBottom" + dinoBottom);

  let blockLeft = parseInt(getComputedStyle(block).getPropertyValue("left"));
  //    console.log("BlockLeft" + blockLeft);

  if (dinoBottom <= 90 && blockLeft >= 20 && blockLeft <= 145) {
    //        console.log("Game Over");

    gameOver.style.display = "block";
    block.classList.remove("blockActive");
    road.firstElementChild.style.animation = "none";
    cloud.firstElementChild.style.animation = "none";
    clearInterval(interval);
    highScoreElement.innerHTML = `High Score <b>${calculateHighScore(playerScore)}</b>`
    playerScore = 0;
  }
}, 10);


const calculateHighScore = (playerScore) => {
  if (highScore === 0) {
    highScore = playerScore;
  } else if (playerScore > highScore){
    highScore = playerScore;
  }
  return highScore;
}
