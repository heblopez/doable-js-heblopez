import { header } from "../components/header.js";
import { listenLogout } from "../components/header.js";
import STORE from "../store.js";
import {
  renderTask,
  listenTaskImportant,
  listenTaskCompleted,
  listenSortTasks,
} from "../components/task.js";
import { formTask, listenCreateTask } from "../components/form.js";
import {
  optionsUser,
  listenNavigation,
  changeCurrent,
} from "../components/options-user.js";

function render() {
  const currentTab = STORE.currentTab;
  return `
    ${header(true)}
    <main>
      <section class="section-doable mt-12">
        ${optionsUser()}
      </section>
      <section class="tasks-list mt-12 js-action-tasks">
        ${currentTab === "" ? STORE.tasks.map(renderTask).join("") : ""}
        ${
          currentTab === "completed"
            ? STORE.completed.map(renderTask).join("")
            : ""
        }
        ${
          currentTab === "important"
            ? STORE.important.map(renderTask).join("")
            : ""
        }
      </section>
      <div class="section-doable">
      ${formTask()}
      </div>
    </main>
  `;
}

const HomePage = {
  toString() {
    return render();
  },
  addListeners() {
    listenLogout();
    listenCreateTask();
    listenNavigation();
    changeCurrent();
    listenTaskCompleted();
    listenTaskImportant();
    listenSortTasks();
  },
};

export default HomePage;
