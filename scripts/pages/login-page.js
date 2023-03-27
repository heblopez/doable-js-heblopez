import { input } from "../components/input.js";
import DOMHandler from "../dom-handler.js";
import SignupPage from "./signup-page.js";
import HomePage from "./home-page.js";
import { login } from "../services/sessions-services.js";
import { header } from "../components/header.js";
import STORE from "../store.js";

function render() {
  const { loginError } = LoginPage.state;
  return `
  ${header()}
  <main class="section height-header">
    <section class="container-sm">
      <form class="flex flex-column gap-4 mb-4 js-login-form">
        ${input({
          label: "email",
          id: "email",
          placeholder: "you@example.com",
          type: "email",
          required: true,
          value: "",
        })}
        ${input({
          label: "password",
          id: "password",
          placeholder: "******",
          type: "password",
          required: true,
          value: "",
        })}
        ${
          loginError ? `<p class="text-center error-300">${loginError}</p>` : ""
        }
        <button class="button button--primary">Login</button>
      </form>
     <p class="block text-center js-signup-link css-link">Create account</p>
    </section>
  </main>
  `;
}

function listenSubmitForm() {
  const form = document.querySelector(".js-login-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const { email, password } = event.target;
      const credentials = {
        email: email.value,
        password: password.value,
      };
      await login(credentials);
      await STORE.fetchTasks();
      STORE.tasks.sort((a, b) => (a.title > b.title ? 1 : -1));
      DOMHandler("#root").load(HomePage);
    } catch (error) {
      LoginPage.state.loginError = error.message;
      DOMHandler("#root").load(LoginPage);
    }
  });
}

function listenClickSignup() {
  const login = document.querySelector(".js-signup-link");
  login.addEventListener("click", () => {
    DOMHandler("#root").load(SignupPage);
  });
}

const LoginPage = {
  toString() {
    return render();
  },
  addListeners() {
    listenClickSignup();
    listenSubmitForm();
  },
  state: {
    loginError: null,
  },
};
export default LoginPage;
