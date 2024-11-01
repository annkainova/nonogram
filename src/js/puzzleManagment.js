import { createElement } from "./createElement.js";
import { elementHTML, elementButton } from "./elementHTML.js";

import { createResult, isDarkMode, applyCurrentTheme } from "./gameLogic.js";

import {
  handleCellClick,
  handleRightClick,
  clickOnSettingIcon,
} from "./eventHandlers.js";

export function addBoxHints(num) {
  clearNonogramsHint();
  for (let i = 0; i < num; i += 1) {
    const hintBoxLeft = createElement("div", "nonogram__hint-box--left");
    const hintBoxTop = createElement("div", "nonogram__hint-box--top");

    elementHTML.nonogramLeftHint.appendChild(hintBoxLeft);
    elementHTML.nonogramTopHint.appendChild(hintBoxTop);
  }
}

export function addHint(hint, position) {
  const boxs = document.querySelectorAll(`.nonogram__hint-box--${position}`);
  const hintPosition = position === "left" ? hint.left : hint.top;
  hintPosition.forEach((hintAmounts, hintIndex) => {
    const hintBox = boxs[hintIndex];

    hintAmounts.forEach((hintAmount) => {
      const hint = createElement("div", "hint");

      if (!isDarkMode) {
        hint.classList.add("light-mode");
      }

      hint.textContent = hintAmount;
      hintBox.appendChild(hint);
    });
  });
}

function clearNonogramsHint() {
  while (
    elementHTML.nonogramLeftHint.firstChild &&
    elementHTML.nonogramTopHint.firstChild
  ) {
    elementHTML.nonogramLeftHint.removeChild(
      elementHTML.nonogramLeftHint.firstChild
    );
    elementHTML.nonogramTopHint.removeChild(
      elementHTML.nonogramTopHint.firstChild
    );
  }
}

export function generateNonograms(num) {
  clearNonogramsCell();
  createResult(num);

  let cellBox;
  cellBox = createElement("div", "nonogram__cell-box");

  for (let i = 0; i < num * num; i += 1) {
    if (i % 25 === 0) {
      const separateBox = createElement("div", "nonogram__separate-box");
      cellBox.appendChild(separateBox);
    }
  }
  elementHTML.nonogramGrid.appendChild(cellBox);

  for (let i = 0; i < num * num; i += 1) {
    const cell = createElement("div", "nonogram__cell");
    elementHTML.nonogramGrid.appendChild(cell);

    if (!isDarkMode) {
      cell.classList.add("light-mode");
    }

    cell.onclick = () => handleCellClick(cell, i, num);
    cell.oncontextmenu = () => {
      event.preventDefault();
      handleRightClick(cell);
      return false;
    };
  }
}

function clearNonogramsCell() {
  while (elementHTML.nonogramGrid.firstChild) {
    elementHTML.nonogramGrid.removeChild(elementHTML.nonogramGrid.firstChild);
  }
}
