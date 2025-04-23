const box1 = document.querySelector("#game-box1");
const box2 = document.querySelector("#game-box2");
const box3 = document.querySelector("#game-box3");
const box4 = document.querySelector("#game-box4");
const playBtn = document.querySelector("#play");

const boxesInfo = {
  boxes: [box1, box2, box3, box4],
  lightUpColors: [
    "rgb(115, 201, 115)",
    "rgb(231, 134, 134)",
    "rgb(255, 174, 66)",
    "rgb(111, 111, 239)",
  ],
  defaultColors: ["green", "red", "yellow", "blue"],
  roundColors: [],
  userRoundColors: [],
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
    default:
      console.log("Unexpected number");
  }
  console.log(boxesInfo.roundColors);
};
const patternLengthGen = () => {
  //   let randomPaternNum = Math.round(1 + Math.random() * 8);
  let randomPaternNum = 3;
  // console.log(randomPaternNum);
  for (let i = 0; i < randomPaternNum; i++) {
    setTimeout(randomPatternGen, 1500 * i);
  }
};
play.addEventListener("click", patternLengthGen);

for (let i = 0; i < boxesInfo.boxes.length; i++) {
  boxesInfo.boxes[i].addEventListener("click", () => {
    if (boxesInfo.userRoundColors.length >= boxesInfo.roundColors.length) {
      boxesInfo.roundColors = [];
      return;
    }
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
    console.log(boxesInfo.userRoundColors);
    for (let j = 0; j < boxesInfo.userRoundColors.length; j++) {
      if (boxesInfo.roundColors[j] === boxesInfo.userRoundColors[j]) {
        console.log(boxesInfo.roundColors[j]);
        console.log(boxesInfo.userRoundColors[j]);
      } else {
        console.log("Attempt failed");
        boxesInfo.roundColors = [];
        boxesInfo.userRoundColors = [];
        playBtn.innerHTML = "Play again?";
      }
    }
  });
}
