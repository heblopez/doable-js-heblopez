import { tokenKey } from "../config.js";
import apiFetch from "./api-fetch.js";

async function login(credentials = { email, password }) {
  const { token, ...user } = await apiFetch("login", { body: credentials });
  sessionStorage.setItem(tokenKey, token);
  return user;
}

async function logout() {
  const data = await apiFetch("logout", { method: "DELETE" });
  sessionStorage.removeItem(tokenKey);
  return data;
}
export { login, logout };
