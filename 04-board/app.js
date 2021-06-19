const body = document.querySelector("body");
const board = document.getElementById("board");
const startGameBtn = document.querySelector(".start-game");
const purpleBtn = document.querySelector(".purple");
const orangeBtn = document.querySelector(".orange");
const greenBtn = document.querySelector(".green");
const blueBtn = document.querySelector(".blue");
const taskEl = document.querySelector(".task-word");
const timerMinutesEl = document.querySelector(".minutes");
const timerSecondsEl = document.querySelector(".seconds");
const gameOverEl = document.querySelector(".game-over");

const colorPalletes = {
  purple: ["#CD0074", "#992667", "#85004B", "#E6399B", "#E667AF"],
  orange: ["#FF7400", "#BF7130", "#A64B00", "#FF9640", "#FFB273"],
  green: ["#00CC00", "#269926", "#008500", "#39E639", "#67E667"],
  blue: ["#0B61A4", "#25567B", "#033E6B", "#3F92D2", "#66A3D2"],
};
const words = ["Дождь", "Кошка", "Карандаш"];

let colors = ["red", "yellow", "green"];
let seconds = 9;

const SQUARE_NUMBER = 300;

for (let i = 0; i < SQUARE_NUMBER; i++) {
  const square = document.createElement("div");
  square.classList.add("square");

  square.addEventListener("mouseover", () => {
    setColor(square);
  });

  board.append(square);
}

purpleBtn.addEventListener("click", () => {
  setPalette("purple");
});
orangeBtn.addEventListener("click", () => {
  setPalette("orange");
});
greenBtn.addEventListener("click", () => {
  setPalette("green");
});
blueBtn.addEventListener("click", () => {
  setPalette("blue");
});

startGameBtn.addEventListener("click", startGame);

let timer;

function startGame() {
  body.style.backgroundColor = "#111";
  gameOverEl.style.display = "none";
  clearInterval(timer);
  seconds = 9;
  setRandomWord();
  removeColor();
  setTimerCount();
}

function setTimerCount() {
  timer = setInterval(() => {
    timerSecondsEl.innerHTML = seconds;
    seconds--;
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
    body.style.backgroundColor = "rgb(238, 66, 66)";
    gameOverEl.style.display = "block";
  }, 10000);
}

function setPalette(color) {
  switch (color) {
    case "purple":
      colors = colorPalletes.purple;
      break;
    case "orange":
      colors = colorPalletes.orange;
      break;
    case "green":
      colors = colorPalletes.green;
      break;
    case "blue":
      colors = colorPalletes.blue;
      break;
  }
}

function setColor(element) {
  const color = getRandomColor();
  element.style.backgroundColor = color;
  element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor() {
  const squares = document.querySelectorAll(".square");
  for (square of squares) {
    square.style.backgroundColor = "#1d1d1d";
    square.style.boxShadow = "0 0 2px #000";
  }
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function setRandomWord() {
  const index = Math.floor(Math.random() * words.length);
  taskEl.innerHTML = words[index];
}
