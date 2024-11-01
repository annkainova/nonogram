import { elementHTML, elementButton } from "./elementHTML.js";
import {
  showDecision,
  isDarkMode,
  continueGame,
  saveGame,
  displayBestResult,
  resetGame,
  makeDarkMode,
  muteSound,
  applyCurrentTheme,
} from "./gameLogic.js";
import { elementTimer } from "./elementHTML.js";
import { resetTimer } from "./timer.js";
import { randomGame } from "./elementManagement.js";

export function createGameControls() {
  createButtonSave();
  createButtonContinue();
  createButtonRandomGame();

  createButtonRecords();

  createButtonMute();
  createDarkMode();

  createButtonReset();
  createTimer();
  createButtonDecision();

  if (!isDarkMode) applyCurrentTheme();
}

export function createTimer() {
  elementTimer.timer.textContent = "00:00";
  elementHTML.appPanel.appendChild(elementTimer.timer);
}

export function createButtonReset() {
  elementHTML.appPanel.appendChild(elementButton.btnReset);

  elementButton.btnReset.onclick = () => {
    resetTimer();
    resetGame();
  };
}

export function createButtonSave() {
  elementButton.btnSave.textContent = "Save";
  elementHTML.settingGame.appendChild(elementButton.btnSave);

  elementHTML.settingMenu.appendChild(elementHTML.managerBox);

  elementButton.btnSave.onclick = () => {
    saveGame();
  };
}

export function createButtonContinue() {
  elementButton.btnContinue.textContent = "Continue Last Game";
  elementHTML.settingGame.appendChild(elementButton.btnContinue);

  elementHTML.managerBox.appendChild(elementHTML.settingGame);

  elementButton.btnContinue.onclick = () => {
    continueGame();
  };
}

export function createButtonRecords() {
  elementButton.btnRecords.textContent = "Records";
  elementHTML.settingGame.appendChild(elementButton.btnRecords);
  elementHTML.managerBox.appendChild(elementHTML.settingGame);

  elementButton.btnRecords.onclick = () => {
    displayBestResult();
  };
}

export function createButtonMute() {
  elementButton.btnMute.textContent = "";
  elementHTML.settingVisual.appendChild(elementButton.btnMute);
  elementHTML.managerBox.appendChild(elementHTML.settingVisual);

  elementButton.btnMute.onclick = () => muteSound();
}

export function createDarkMode() {
  elementButton.btnDarkMode.textContent = "";
  elementHTML.settingVisual.appendChild(elementButton.btnDarkMode);

  elementHTML.managerBox.appendChild(elementHTML.settingVisual);
  elementButton.btnDarkMode.classList.add("light-mode");

  elementButton.btnDarkMode.onclick = () => makeDarkMode();
}

export function createButtonDecision() {
  elementHTML.appPanel.appendChild(elementButton.btnDecision);

  elementButton.btnDecision.onclick = showDecision;
}

export function createButtonRandomGame() {
  elementButton.btnRandom.textContent = "Random Game";
  elementHTML.settingGame.appendChild(elementButton.btnRandom);
  elementHTML.managerBox.appendChild(elementHTML.settingGame);

  elementButton.btnRandom.onclick = randomGame;
}
