import HomePage from "../pages/home-page.js";
import { input } from "./input.js";
import { createTask } from "../services/task-services.js";
import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";

export function formTask() {
  return `
  <form class="js-create-submit flex flex-column gap-4 mb-4 mt-4">
    ${input({
      id: "title",
      placeholder: "do the dishes...",
      type: "text",
      required: true,
    })}
    ${input({
      id: "date",
      type: "date",
    })}
      <button type="submit" class="button button--primary">Add Task</button>
  </form>
  `;
}

export function listenCreateTask() {
  const create = document.querySelector(".js-create-submit");
  create.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const { title, date } = event.target;
      const data = {
        title: title.value,
        due_date: date.value,
      };
      await createTask(data);
      await STORE.fetchTasks();
      STORE.tasks.sort((a, b) => (a.title > b.title ? 1 : -1));
      DOMHandler("#root").load(HomePage);
    } catch (error) {
      console.log(error);
    }
  });
}
