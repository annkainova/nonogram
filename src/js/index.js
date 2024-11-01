// import { createHTMLElemets } from "./genertionHTML.js";
// import { createForm } from "./genertionHTML.js";

import {
  letChooseLevel,
  createHTMLElemets,
  createForm,
} from "./elementManagement.js";
import { clickOnSettingIcon } from "./eventHandlers.js";
document.body.onload = () => {
  createHTMLElemets();

  createForm();
  letChooseLevel();

  clickOnSettingIcon();
};
