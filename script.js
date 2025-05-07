const box1 = document.querySelector("#game-box1");
const box2 = document.querySelector("#game-box2");
const box3 = document.querySelector("#game-box3");
const box4 = document.querySelector("#game-box4");
const playBtn = document.querySelector("#play");
const infoText = document.querySelector("#game-info-text");
const roundBtn = document.querySelector("#round-button");
const title = document.querySelector("#title");
const pointsText = document.querySelector("#points-display");
const highScoreDisplay = document.querySelector("#highscore-display");
const beepSound = document.querySelector("#beep-sound");

title.addEventListener("click", () => {
  localStorage.clear();
});

let highScore = 0;

const storedHighscore = localStorage.getItem("highscoreVal");

console.log(storedHighscore);

if (storedHighscore !== null) {
  highScoreDisplay.innerHTML = `High Score: ${storedHighscore}`;
} else {
  highScoreDisplay.innerHTML = `High Score: ${highScore}`;
}

const boxesInfo = {
  boxes: [box1, box2, box3, box4],
  //order for both light up and default colors is: green, red,  yellow, blue
  defaultColors: ["#73c973", "#ff5733", "#fcf45c", "#5e5edd"],
  lightUpColors: ["#9dd59d", "#e78686", "#f1efbc", "#a7c7e7"],
  roundColors: [],
  userRoundColors: [],
  points: 0,
  roundFlashCount: 1,
};

const colorChange = (boxNum, index) => {
  boxNum.style.backgroundColor = boxesInfo.lightUpColors[index];
};

const colorReset = (boxNum, index) => {
  boxNum.style.backgroundColor = boxesInfo.defaultColors[index];
};

const randomPatternGen = () => {
  let randomColorNum = Math.round(1 + Math.random() * 3);
  switch (randomColorNum) {
    case 1:
      boxesInfo.roundColors.push("Green");
      colorChange(box1, 0);
      setTimeout(colorReset, 1000, box1, 0);
      break;
    case 2:
      boxesInfo.roundColors.push("Red");
      colorChange(box2, 1);
      setTimeout(colorReset, 1000, box2, 1);
      break;
    case 3:
      boxesInfo.roundColors.push("Yellow");
      colorChange(box3, 2);
      setTimeout(colorReset, 1000, box3, 2);
      break;
    case 4:
      boxesInfo.roundColors.push("Blue");
      colorChange(box4, 3);
      setTimeout(colorReset, 1000, box4, 3);
      break;
  }
  console.log(boxesInfo.roundColors);
};

const playStart = () => {
  playBtn.classList.add("hidden");
  infoText.innerHTML = "";
  patternLengthGen();
};

const patternLengthGen = () => {
  for (let i = 0; i < boxesInfo.roundFlashCount; i++) {
    setTimeout(randomPatternGen, 1500 * i);
  }
};
playBtn.addEventListener("click", playStart);

const roundSet = () => {
  roundBtn.classList.add("hidden");
  boxesInfo.roundColors = [];
  boxesInfo.userRoundColors = [];
  boxesInfo.points += 1;
  boxesInfo.roundFlashCount += 1;
  pointsText.innerHTML = `Points: ${boxesInfo.points}`;
  playStart();
};
roundBtn.addEventListener("click", roundSet);

const successGuessHandler = () => {
  if (boxesInfo.userRoundColors.length === boxesInfo.roundFlashCount) {
    infoText.innerHTML = "Round complete, press 'Next Round' button";
    roundBtn.classList.remove("hidden");
  } else {
    infoText.innerHTML = "✔️";
    setTimeout(() => {
      infoText.innerHTML = "";
    }, 750);
  }
};

const noSuccessGuessHandler = () => {
  infoText.innerHTML = "❌";
  if (boxesInfo.points > highScore) {
    localStorage.clear();
    highScore = boxesInfo.points;
    localStorage.setItem("highscoreVal", JSON.stringify(highScore));
    if (storedHighscore !== null) {
      highScoreDisplay.innerHTML = `High Score: ${storedHighscore}`;
    } else {
      highScoreDisplay.innerHTML = `High Score: ${highScore}`;
    }
  }
  roundBtn.classList.add("hidden");
  roundBtn.style.display = "none";
  playBtn.classList.remove("hidden");
  playBtn.innerHTML = "Play again?";
  if (playBtn.innerHTML === "Play again?") {
    playBtn.addEventListener("click", () => {
      location.reload();
    });
  }
};

for (let i = 0; i < boxesInfo.boxes.length; i++) {
  boxesInfo.boxes[i].addEventListener("click", () => {
    switch (boxesInfo.boxes[i]) {
      case box1:
        boxesInfo.userRoundColors.push("Green");
        break;
      case box2:
        boxesInfo.userRoundColors.push("Red");
        break;
      case box3:
        boxesInfo.userRoundColors.push("Yellow");
        break;
      case box4:
        boxesInfo.userRoundColors.push("Blue");
        break;
    }
    for (let j = 0; j < boxesInfo.userRoundColors.length; j++) {
      if (boxesInfo.roundColors[j] === boxesInfo.userRoundColors[j]) {
        successGuessHandler();
      } else {
        noSuccessGuessHandler();
      }
    }
  });
}
