const startBtn = document.getElementById("start");
const screens = document.querySelectorAll(".screen");
const timeList = document.getElementById("time-list");
const timeEl = document.getElementById("time");
const boardEl = document.getElementById("board");

const colors = ["#B9F73E", "#39E639", "#FF4040", "#E6399B"];

let time = 0;
let score = 0;

let timer;

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    startGame();
  }

  screens[1].classList.add("up");
});

boardEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    score++;
    e.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  timer = setInterval(decreaseTime, 1000);
  setTime(time);
  createRandomCircle();
}

function decreaseTime() {
  if (time === 0) {
    clearInterval(timer);
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const color = getRandomColor();
  circle.classList.add("circle");
  let size = getRandomNumber(5, 35);
  const { width, height } = boardEl.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.backgroundColor = color;

  boardEl.append(circle);
}

function getRandomColor() {
  let index = getRandomNumber(0, colors.length - 1);
  return colors[index];
}

function getRandomNumber(min, max) {
  let number = Math.round(Math.random() * (max - min) + min);
  return number;
}

function finishGame() {
  const finishHtml = `
  <div class="finish-game-wrapper">
    <h1>Счет: <span class="primary">${score}</span></h1>
    <a href="#" class="start" id="restart"> Сыграть еще раз</a>
  </div>
  `;
  boardEl.innerHTML = finishHtml;
  const restartBtn = boardEl.querySelector("#restart");
  restartBtn.addEventListener("click", restartGame);
  timeEl.parentNode.classList.add("hide");
}

function restartGame() {
  screens[1].classList.remove("up");
  score = 0;
  boardEl.innerHTML = "";
  timeEl.parentNode.classList.remove("hide");
}
