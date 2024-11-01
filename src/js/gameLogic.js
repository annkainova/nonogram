import {
  curretPuzzle,
  letChooseLevel,
  setupGameInterface,
  levelPuzzle,
  previusLevel,
  selectedLevel,
  selectedLevelKey,
  selectedTemplate,
  setLevelAndTemplate,
} from "./elementManagement.js";

import { getLevelKeyByValue, clearTemplateOptions } from "./utilities.js";

import { puzzle } from "./createHint.js";
import { createGameControls } from "./gameControls.js";

import { startTimer } from "./timer.js";
import {
  modalWin,
  elementForm,
  audioFile,
  modalRecords,
  elementButton,
  elementHTML,
  elementTimer,
} from "./elementHTML.js";
import { timeToSeconds } from "./utilities.js";
import { stopTimer, startTime, resetTimer } from "./timer.js";
import { createElement } from "./createElement.js";
import {
  handleCellClick,
  handleRightClick,
  clickOnSettingIcon,
} from "./eventHandlers.js";

export let stateGameLogic = {
  isSolutionShown: false,
};

export let valueCells;
export let isGameWin;
export let result;
export let isMuted = false;
export let isDarkMode = true;

export function createResult(num) {
  result = new Array(num * num).fill(0);
}

export function checkResultWin() {
  const flatCurrentPuzzle = curretPuzzle.grid.flat();

  if (result.length !== flatCurrentPuzzle.length) {
    return;
  }

  const isWin = result.every(
    (item, index) => item === flatCurrentPuzzle[index]
  );

  if (isWin) {
    setTimeout(() => {
      finishGame(elementTimer.timer.textContent);
      saveAllResult();
      stopTimer();
    }, 100);
  } else {
    return;
  }
}

export function resetGame() {
  stateGameLogic.isSolutionShown = false;

  valueCells = document.valueCells = Array.from(
    document.querySelectorAll(".nonogram__cell")
  );
  valueCells.forEach((value) => {
    value.classList.remove("fill");
    value.classList.remove("cross");
  });
}

function finishGame(timer) {
  audioFile.victory.loop = true;
  audioFile.victory.play();
  isGameWin = false;

  const timeInSeconds = timeToSeconds(timer);

  modalWin.modalText.textContent = `Congratulations!`;
  modalWin.modalAnswer.textContent = `You have solved the nonogram in ${timeInSeconds} seconds!`;
  modalWin.modalButton.textContent = "Play again";

  // clearBestResults();
  // displayBestResult();

  modalWin.modalBox.appendChild(modalWin.modalImage);
  modalWin.modalBox.appendChild(modalWin.modalText);
  modalWin.modalBox.appendChild(modalWin.modalAnswer);
  modalWin.modalBox.appendChild(modalWin.modalButton);

  modalWin.modal.appendChild(modalWin.modalBox);

  modalWin.body.appendChild(modalWin.modal);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !isGameWin) {
      startAgain();
      closeModal(modalWin.modal);
    }
  });
  modalWin.modalButton.onclick = () => startAgain();
}

export function displayBestResult() {
  const resultText = createElement("div", "modal__text");
  resultText.textContent = "Table of Records";
  modalRecords.modalBestResult.appendChild(resultText);

  const resultButton = modalWin.modalButton;
  resultButton.textContent = "Ok";

  resultButton.onclick = () => {
    clearBestResults(modalRecords.modalBestResult);
    closeModal(modalRecords.modalRecords);
  };

  document.addEventListener("keydown", handleKeyDown);

  // document.addEventListener("click", function (event) {
  //   const isClickInsideModal = modalRecords.modalBestResult.contains(
  //     event.target
  //   );

  //   if (isClickInsideModal) {
  //     clearBestResults(modalRecords.modalBestResult);
  //     closeModal(modalRecords.modalRecords);
  //   }
  // });
  writeBestResult();
  modalRecords.modalBestResult.appendChild(resultButton);
  modalRecords.modalRecords.appendChild(modalRecords.modalBestResult);
  modalWin.body.appendChild(modalRecords.modalRecords);
}

export function writeBestResult() {
  const sortedResult = getBestFiveResult();
  sortedResult.forEach((result) => {
    const resultBox = createElement("div", "result__box");

    const resultName = createElement("div", "result__name");
    const resultLevel = createElement("div", "result__level");
    const resultTime = createElement("div", "result__time");

    resultName.textContent = result.name;
    resultLevel.textContent = result.level;
    resultTime.textContent = result.time;

    resultBox.appendChild(resultName);
    resultBox.appendChild(resultLevel);
    resultBox.appendChild(resultTime);

    modalRecords.modalBestResult.appendChild(resultBox);
  });
}

function closeModal(modal) {
  if (modal) {
    modal.remove();
    document.removeEventListener("keydown", handleKeyDown);
  }
}

function clearBestResults(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function handleKeyDown(event) {
  if (event.key === "Enter" || event.key === "Escape") {
    clearBestResults(modalRecords.modalBestResult);
    closeModal(modalRecords.modalRecords);
  }
}

function startAgain() {
  isGameWin = true;
  resetTimer();
  letChooseLevel();
  closeModal(modalWin.modal);
  // clearBestResults();
  audioFile.victory.pause();
  audioFile.victory.currentTime = 0;
}

export function saveGame() {
  const elapsedTime = Date.now() - startTime;
  const gameData = {
    result,
    elapsedTime,
    selectedLevel,
    selectedLevelKey,
    selectedTemplate,
  };
  localStorage.setItem("saveGame", JSON.stringify(gameData));
  // localStorage.setItem("saveTime", elapsedTime);
}

export function continueGame() {
  if (elementHTML.settingMenu.classList.contains("visible")) {
    elementHTML.settingMenu.classList.remove("visible");
    elementHTML.settingMenu.classList.toggle("hidden");
  }

  const savedGame = localStorage.getItem("saveGame");

  if (savedGame) {
    let {
      result: savedResult,
      elapsedTime,
      selectedLevel,
      selectedLevelKey,
      selectedTemplate,
    } = JSON.parse(savedGame);

    const levelOptionValue = levelPuzzle[selectedLevelKey];
    elementForm.select.value = levelOptionValue.toString();

    setLevelAndTemplate(selectedLevel, selectedTemplate);
    setupGameInterface();
    createGameControls();

    valueCells = document.valueCells = Array.from(
      document.querySelectorAll(".nonogram__cell")
    );

    valueCells.forEach((cell, index) => {
      if (savedResult[index] === 1) {
        cell.classList.add("fill");
      } else {
        cell.classList.remove("fill");
      }
    });

    startTimer(elapsedTime);
  } else {
  }
}

export function showDecision() {
  stateGameLogic.isSolutionShown = !stateGameLogic.isSolutionShown
    ? true
    : false;

  const answerPuzzle = curretPuzzle.grid.flat();
  elementButton.btnDecision.classList.toggle("active");
  valueCells = Array.from(document.querySelectorAll(".nonogram__cell"));
  valueCells.forEach((cell, index) => {
    if (answerPuzzle[index] === 1) {
      cell.classList.remove("cross");
      cell.classList.add("fill");
    } else {
      cell.classList.remove("fill");
      cell.classList.remove("cross");
    }

    if (!stateGameLogic.isSolutionShown) {
      cell.classList.remove("fill");
    }
  });
}

export function muteSound() {
  elementButton.btnMute.classList.add("unmute");
  isMuted = !isMuted;

  Object.values(audioFile).forEach((audio) => {
    audio.volume = isMuted ? 0 : 1;
  });
  if (isMuted) {
    elementButton.btnMute.classList.remove("mute");
    elementButton.btnMute.classList.add("unmute");
  } else {
    elementButton.btnMute.classList.remove("unmute");
    elementButton.btnMute.classList.add("mute");
  }
}

export function makeDarkMode() {
  isDarkMode = !isDarkMode;
  applyCurrentTheme();
}

export function applyCurrentTheme() {
  // const themeClass = isDarkMode ? "" : "light-mode";
  document.body.classList.toggle("light-mode");
  elementHTML.settingMenu.classList.toggle("light-mode");

  const valueCells = Array.from(document.querySelectorAll(".nonogram__cell"));
  const allHints = Array.from(document.querySelectorAll(".hint"));

  [...valueCells, ...allHints].forEach((element) => {
    element.classList.toggle("light-mode", !isDarkMode);
  });

  elementButton.btnSave.classList.toggle("light-mode");
  elementButton.btnContinue.classList.toggle("light-mode");
  elementButton.btnRecords.classList.toggle("light-mode");
  elementButton.btnRandom.classList.toggle("light-mode");

  modalRecords.modalBestResult.classList.toggle("light-mode");

  elementButton.btnReset.classList.toggle("light-mode");
  elementButton.btnMute.classList.toggle("light-mode");

  if (isDarkMode) {
    elementButton.btnDarkMode.classList.replace("dark-mode", "light-mode");
  } else {
    elementButton.btnDarkMode.classList.replace("light-mode", "dark-mode");
  }
}

export function saveAllResult() {
  const resultTime = elementTimer.timer.textContent;
  const resultName = curretPuzzle.name;
  const resultLevel = curretPuzzle.level;

  const newResult = {
    name: resultName,
    level: resultLevel,
    time: resultTime,
  };

  const existingResults = localStorage.getItem("results");
  let results = existingResults ? JSON.parse(existingResults) : [];

  results.push(newResult);
  localStorage.setItem("results", JSON.stringify(results));

  return results;
}

export function getBestFiveResult() {
  const existingResults = localStorage.getItem("results");
  let results = existingResults ? JSON.parse(existingResults) : [];

  return results
    .sort((a, b) => timeToSeconds(a.time) - timeToSeconds(b.time))
    .slice(0, 5);
}

export function openSettingMenu() {
  if (elementHTML.settingMenu.classList.contains("hidden")) {
    elementHTML.btnGear.classList.remove("close");
    elementHTML.settingMenu.classList.remove("hidden");
    elementHTML.settingMenu.classList.add("visible");
    elementHTML.btnGear.classList.add("open");
  } else {
    elementHTML.btnGear.classList.remove("open");
    elementHTML.settingMenu.classList.remove("visible");
    elementHTML.settingMenu.classList.add("hidden");
    elementHTML.btnGear.classList.add("close");
  }
  // letChooseLevel();
}
