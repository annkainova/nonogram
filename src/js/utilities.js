import {
  curretPuzzle,
  letChooseLevel,
  setupGameInterface,
  levelPuzzle,
  selectedLevel,
} from "./elementManagement.js";
import { elementFormTemplate } from "./elementHTML.js";

export function timeToSeconds(timeString) {
  const [minutes, secundes] = timeString.split(":").map(Number);
  return minutes * 60 + secundes;
}

export function getLevelKeyByValue(value) {
  return Object.keys(levelPuzzle).find((key) => levelPuzzle[key] === value);
}

export function clearTemplateOptions() {
  while (elementFormTemplate.selectTemplate.firstChild) {
    elementFormTemplate.selectTemplate.removeChild(
      elementFormTemplate.selectTemplate.firstChild
    );
  }
}
