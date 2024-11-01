import { createElement } from "./createElement.js";
import {
  elementHTML,
  elementForm,
  elementFormTemplate,
} from "./elementHTML.js";
import { puzzle, getHintPuzzle } from "./createHint.js";
import { addBoxHints, addHint, generateNonograms } from "./puzzleManagment.js";
import { resetTimer } from "./timer.js";
import { applyCurrentTheme, isDarkMode, stateGameLogic } from "./gameLogic.js";
import { createGameControls } from "./gameControls.js";
import { getLevelKeyByValue, clearTemplateOptions } from "./utilities.js";

export let curretPuzzle, currentPuzzleName, selectedLevel, selectedLevelKey;
export let previusLevel;
export let selectedTemplate = 0;

export const levelPuzzle = {
  easy: 5,
  medium: 10,
  hard: 15,
};

export let isMuted = false;

export function createHTMLElemets() {
  elementHTML.nonogramBox.appendChild(elementHTML.nonogramView);
  elementHTML.nonogramBox.appendChild(elementHTML.nonogramTopHint);
  elementHTML.nonogramBox.appendChild(elementHTML.nonogramLeftHint);
  elementHTML.nonogramBox.appendChild(elementHTML.nonogramWrapper);

  elementHTML.nonogramWrapper.appendChild(elementHTML.nonogramGrid);

  elementHTML.section.appendChild(elementHTML.nonogramBox);

  elementHTML.nonogramWrapper.appendChild(elementHTML.appPanel);

  elementHTML.main.appendChild(elementHTML.section);

  document.body.appendChild(elementHTML.settingMenu);

  document.body.appendChild(elementHTML.btnGear);
  document.body.appendChild(elementHTML.main);
}

export function createForm() {
  Object.entries(levelPuzzle).forEach(([key, value]) => {
    const valueForm = createElement("option", `option-level`);
    valueForm.textContent = key;
    valueForm.value = value;
    elementForm.select.appendChild(valueForm);
  });
  elementForm.form.appendChild(elementForm.label);
  elementForm.form.appendChild(elementForm.select);

  elementHTML.formBox.appendChild(elementForm.form);
  elementHTML.settingMenu.appendChild(elementHTML.formBox);

  selectedLevel = elementForm.select.value;
  elementForm.select.addEventListener("change", letChooseLevel);
}

export function setLevelAndTemplate(level = null, templateIndex = 0) {
  previusLevel = selectedLevel;
  selectedLevel = level ?? parseInt(elementForm.select.value, 10);
  selectedLevelKey = getLevelKeyByValue(selectedLevel);
  selectedTemplate = templateIndex;
}

export function setupGameInterface() {
  stateGameLogic.isSolutionShown = false;
  removeClassList(previusLevel);
  changeClassList(selectedLevel);
  createTemplateForm(selectedLevel, selectedTemplate);
  generateNonograms(selectedLevel, selectedTemplate);
  addBoxHints(selectedLevel);
  curretPuzzle = puzzle[selectedLevelKey][selectedTemplate];
  addHint(getHintPuzzle(curretPuzzle.grid), "left");
  addHint(getHintPuzzle(curretPuzzle.grid), "top");
  if (!isDarkMode) applyCurrentTheme();
}

// export function createGameControls() {
//   createButtonSave();
//   createButtonContinue();
//   createButtonRandomGame();

//   createButtonRecords();

//   createButtonMute();
//   createDarkMode();

//   createButtonReset();
//   createTimer();
//   createButtonDecision();

//   if (!isDarkMode) applyCurrentTheme();
// }

export function letChooseLevel() {
  resetTimer();
  setLevelAndTemplate();
  setupGameInterface();
  createGameControls();
  console.log("Загаданная нонограмма", curretPuzzle);
}

function changeClassList(level) {
  elementHTML.nonogramGrid.classList.add(`nonogram__grid--${level}`);
  elementHTML.nonogramTopHint.classList.add(`nonogram__top-hint--${level}`);
  elementHTML.nonogramLeftHint.classList.add(`nonogram__left-hint--${level}`);
}

function removeClassList(level) {
  elementHTML.nonogramGrid.classList.remove(`nonogram__grid--${level}`);
  elementHTML.nonogramTopHint.classList.remove(`nonogram__top-hint--${level}`);
  elementHTML.nonogramLeftHint.classList.remove(
    `nonogram__left-hint--${level}`
  );
}

export function createTemplateForm(level) {
  selectedLevelKey = getLevelKeyByValue(level);

  clearTemplateOptions();

  puzzle[selectedLevelKey].forEach((template, indexTemplate) => {
    const templateForm = createElement("option", `option-template`);
    templateForm.textContent = `${template.name}`;
    templateForm.value = indexTemplate;
    elementFormTemplate.selectTemplate.appendChild(templateForm);
  });

  elementFormTemplate.formTemplate.appendChild(
    elementFormTemplate.labelTemplate
  );
  elementFormTemplate.formTemplate.appendChild(
    elementFormTemplate.selectTemplate
  );

  elementHTML.formBox.appendChild(elementFormTemplate.formTemplate);
  elementFormTemplate.selectTemplate.addEventListener(
    "change",
    onTemplateChange
  );

  elementFormTemplate.selectTemplate.value = selectedTemplate.toString();
}

function onTemplateChange() {
  resetTimer();
  selectedLevel = parseInt(elementForm.select.value, 10);
  let selectedLevelKey = getLevelKeyByValue(selectedLevel);

  selectedTemplate = parseInt(elementFormTemplate.selectTemplate.value, 10);

  generateNonograms(selectedLevel);
  addBoxHints(selectedLevel);

  curretPuzzle = puzzle[selectedLevelKey][selectedTemplate];

  addHint(getHintPuzzle(curretPuzzle.grid), "left");
  addHint(getHintPuzzle(curretPuzzle.grid), "top");
}

// let previusLevel;
// let selectedLevel, selectedLevelKey, selectedTemplate, curretPuzzle;

function getRandomKey(level) {
  const keys = Object.keys(level);
  return keys[Math.floor(Math.random() * keys.length)];
}

function getRandomTemplate(levelKey) {
  const templates = puzzle[levelKey];
  return Math.floor(Math.random() * templates.length);
}

export function randomGame() {
  if (elementHTML.settingMenu.classList.contains("visible")) {
    elementHTML.settingMenu.classList.remove("visible");
    elementHTML.settingMenu.classList.toggle("hidden");
  }

  previusLevel = selectedLevel;

  let randomLevelKey = getRandomKey(levelPuzzle);
  let randomTemplateIndex = getRandomTemplate(randomLevelKey);

  selectedLevel = levelPuzzle[randomLevelKey];
  selectedLevelKey = randomLevelKey;
  selectedTemplate = randomTemplateIndex;
  curretPuzzle = puzzle[selectedLevelKey][selectedTemplate];

  elementForm.select.value = levelPuzzle[selectedLevelKey];
  // createTemplateForm(selectedLevel);
  elementFormTemplate.selectTemplate.value = selectedTemplate;

  resetTimer();
  setupGameInterface();
  createGameControls();
}
