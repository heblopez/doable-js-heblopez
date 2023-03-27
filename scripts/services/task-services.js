import apiFetch from "./api-fetch.js";

export function getTasks() {
  return apiFetch("tasks");
}

export function createTask(newTask = { title, due_date }) {
  return apiFetch("tasks", { body: newTask });
}

export function editImpTask(id, taskImportant = { important }) {
  return apiFetch(`tasks/${id}`, { method: "PATCH", body: taskImportant });
}

export function editComTask(id, taskCompleted = { completed }) {
  return apiFetch(`tasks/${id}`, { method: "PATCH", body: taskCompleted });
}
