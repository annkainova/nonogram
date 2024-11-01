import { elementTimer } from "./elementHTML.js";
import { elementHTML } from "./elementHTML.js";
import { elementButton } from "./elementHTML.js";

export let startTime, timerInterval;

let timerStarted = false;

export function startTimer(elapsedTime = 0) {
  if (timerStarted === false) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 1000);
    timerStarted = true;
  }
}

export function stopTimer() {
  clearInterval(timerInterval);
  timerStarted = false;
}

function updateTimer() {
  const elapsedTime = Date.now() - startTime;
  const seconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(seconds / 60);

  const displaySec = seconds % 60;
  const displayMin = minutes % 60;

  const textTimer = `${pad(displayMin)}:${pad(displaySec)}`;
  elementTimer.timer.textContent = textTimer;
}

function pad(number) {
  return number < 10 ? "0" + number : number;
}

export function resetTimer() {
  clearInterval(timerInterval);
  elementTimer.timer.textContent = "00:00";
  timerStarted = false;
}
