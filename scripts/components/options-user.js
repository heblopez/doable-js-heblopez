import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import HomePage from "../pages/home-page.js";

export function optionsUser() {
  const currentTab = STORE.currentTab;
  const optionSelect = STORE.optionSelect;
  return `
  <div>
    <p class = "option-box"> Sort
      <select id="Importance" class="select-menu js-select-menu">
      <option ${
        optionSelect === "alpha" ? "selected" : ""
      } value="Alpha">Alphabetical (a-z)</option>
      <option ${
        optionSelect === "dueDate" ? "selected" : ""
      } value="Due date">Due date</option>
      <option ${
        optionSelect === "import" ? "selected" : ""
      } value="Import">Importance</option>
      </select>
    </p>
    <div class="js-navigation">    
      <p class = "option-box">Show
        ${
          currentTab === "completed"
            ? '<input type="checkbox" class="checkbox__input layout-ck change-current" checked>'
            : '<input type="checkbox" class="checkbox__input layout-ck" data-tab="completed">'
        }
        <label>Only Pending</label>
        ${
          currentTab === "important"
            ? '<input  type="checkbox" class="checkbox__input layout-ck change-current" checked>'
            : '<input type="checkbox" class="checkbox__input layout-ck" data-tab="important">'
        }
        <label>Only Important</label>
      </p>
    </div>
  </div>
  `;
}

export function listenNavigation() {
  const navigation = document.querySelector(".js-navigation");
  navigation.addEventListener("click", (event) => {
    event.preventDefault();
    const link = event.target.closest("[data-tab]");
    if (!link) return;
    STORE.currentTab = link.dataset.tab;
    DOMHandler("#root").load(HomePage);
  });
}

export function changeCurrent() {
  const current = document.querySelector(".js-navigation");
  current.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.classList.contains("change-current")) {
      STORE.currentTab = "";
      DOMHandler("#root").load(HomePage);
    }
  });
}
