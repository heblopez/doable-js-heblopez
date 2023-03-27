import { getTasks } from "./services/task-services.js";

async function fetchTasks() {
  const listTasks = await getTasks();
  this.tasks = listTasks;
  this.completed = listTasks.filter((task) => !task.completed);
  this.important = listTasks.filter((task) => task.important);
}

function currentTasks() {
  return this[this.currentTab];
}

const STORE = {
  tasks: [],
  completed: [],
  important: [],
  currentTab: "",
  optionSelect: "",
  fetchTasks,
  currentTasks,
};

export default STORE;
