import { elementHTML, audioFile } from "./elementHTML.js";
import { startTimer } from "./timer.js";
// import { valueCells } from "./gameLogic.js";
import {
  result,
  checkResultWin,
  stateGameLogic,
  openSettingMenu,
} from "./gameLogic.js";

let valueCells;

export function handleCellClick(cell) {
  if (stateGameLogic.isSolutionShown) return;

  if (cell.classList.contains("fill")) {
    audioFile.clickEmpty.play();
  } else {
    audioFile.clickFill.play();
  }
  startTimer();

  cell.classList.toggle("fill");
  cell.classList.remove("cross");

  valueCells = Array.from(document.querySelectorAll(".nonogram__cell"));
  valueCells.forEach((value) => {
    const valueIndex = valueCells.indexOf(value);
    if (value.classList.contains("fill")) {
      result[valueIndex] = 1;
    } else {
      result[valueIndex] = 0;
    }
  });

  checkResultWin();
}

export function handleRightClick(cell) {
  if (stateGameLogic.isSolutionShown) return;

  if (cell.classList.contains("cross")) {
    audioFile.clickEmpty.play();
  } else {
    audioFile.clickCross.play();
  }
  startTimer();

  cell.classList.toggle("cross");
  cell.classList.remove("fill");
}

export function clickOnSettingIcon() {
  elementHTML.btnGear.onclick = () => openSettingMenu();
}
