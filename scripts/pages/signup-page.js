import { input } from "../components/input.js";
import DOMHandler from "../dom-handler.js";
import LoginPage from "./login-page.js";
import HomePage from "./home-page.js";
import { createUser } from "../services/user-services.js";
import { header } from "../components/header.js";
import STORE from "../store.js";

function render() {
  const { signupError } = SignupPage.state;
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
        })}
        ${input({
          label: "password",
          id: "password",
          placeholder: "******",
          type: "password",
          required: true,
        })}
        ${
          signupError
            ? `<p class="text-center error-300">${signupError}</p>`
            : ""
        }
        <button class="button button--primary">Create account</button>
      </form>
     <p class="block text-center js-login-link css-link">Login</p>
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
      await createUser(credentials);
      await STORE.fetchTasks();
      DOMHandler("#root").load(HomePage);
    } catch (error) {
      SignupPage.state.signupError = error.message;
      DOMHandler("#root").load(SignupPage);
    }
  });
}

function listenClickLogin() {
  const createAccount = document.querySelector(".js-login-link");
  createAccount.addEventListener("click", () => {
    DOMHandler("#root").load(LoginPage);
  });
}

const SignupPage = {
  toString() {
    return render();
  },
  addListeners() {
    listenClickLogin();
    listenSubmitForm();
  },
  state: {
    signupError: null,
  },
};
export default SignupPage;
