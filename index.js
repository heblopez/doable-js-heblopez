import DOMHandler from "./scripts/dom-handler.js";
import HomePage from "./scripts/pages/home-page.js";
import LoginPage from "./scripts/pages/login-page.js";
import { tokenKey } from "./scripts/config.js";
import STORE from "./scripts/store.js";

async function init() {
  try {
    const token = sessionStorage.getItem(tokenKey);
    if (!token) return DOMHandler("#root").load(LoginPage);
    DOMHandler("#root").load(HomePage);
    await STORE.fetchTasks();
  } catch (error) {
    console.error(error);
    sessionStorage.removeItem(tokenKey);
    DOMHandler("#root").load(LoginPage);
  }
}

init();
