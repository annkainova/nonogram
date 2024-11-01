import { createElement } from "./createElement.js";

export const elementHTML = {
  main: createElement("main", "app"),
  section: createElement("section", "app__container"),
  appPanel: createElement("div", "app__panel"),

  nonogramBox: createElement("div", "nonogram"),
  nonogramLeftHint: createElement("div", "nonogram__left-hint"),
  nonogramTopHint: createElement("div", "nonogram__top-hint"),
  // hintBoxLeft: createElement("div", "hint-box--left"),
  // hintBoxTop: createElement("div", "hint-box--top"),
  nonogramView: createElement("div", "nonogram__view"),
  nonogramGrid: createElement("div", "nonogram__grid"),
  nonogramWrapper: createElement("div", "nonogram__wrapper"),

  nonogramCell: createElement("div", "nonogram__cell"),
  buttonBox: createElement("div", "button-box"),

  settingMenu: createElement("div", "setting__menu hidden"),
  formBox: createElement("div", "setting__form-box"),
  managerBox: createElement("div", "setting__manager-box"),
  settingGame: createElement("div", "setting__game"),
  settingVisual: createElement("div", "setting__visual"),

  btnGear: createElement("div", "setting btn-icon"),
};

export const elementForm = {
  form: createElement("form", "form"),
  label: createElement("label", "form__label"),
  select: createElement("select", " form__select"),
};

export const elementFormTemplate = {
  formTemplate: createElement("form", "form form-template"),
  labelTemplate: createElement("label", "form__label form__label-template"),
  selectTemplate: createElement("select", "form__select form__select-template"),
};

export const elementTimer = {
  timer: createElement("div", "timer"),
};

export const elementButton = {
  btnReset: createElement("button", "reset btn-icon"),
  btnSave: createElement("button", "save btn"),
  btnContinue: createElement("button", "continue-game btn"),
  btnDecision: createElement("button", "decision-game btn-icon"),
  btnRandom: createElement("button", "random-game btn"),
  btnRecords: createElement("button", "records btn"),
  btnMute: createElement("button", "mute btn-icon"),
  btnDarkMode: createElement("button", "dark-mode btn-icon"),
};

export const modalWin = {
  body: document.querySelector("body"),

  modal: createElement("div", "modal"),
  modalBox: createElement("div", "modal__box"),
  modalImage: createElement("img", "modal__image"),
  modalText: createElement("p", "modal__text"),
  modalAnswer: createElement("p", "modal__answer"),
  modalButton: createElement("button", "modal__button btn"),

  modalBestResult: createElement("div", "result"),
};

export const modalRecords = {
  modalRecords: createElement("div", "modal"),
  modalBestResult: createElement("div", "modal__box"),
  resultWrapper: createElement("div", "result__wrapper"),
};

export const audioFile = {
  clickFill: new Audio("src/assets/audio/S1.mp3"),
  clickCross: new Audio("src/assets/audio/S2.mp3"),
  clickEmpty: new Audio("src/assets/audio/S3.mp3"),

  victory: new Audio("src/assets/audio/The_Hallow.mpeg"),
};
