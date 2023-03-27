import DOMHandler from "../dom-handler.js";
import LoginPage from "../pages/login-page.js";
import { logout } from "../services/sessions-services.js";

export function header(logout = false) {
  return `
  <header>
    <div class="container-sm layout-header">
      <div class="img-header">
          <img src="../../images/logo.png" alt="logo">
      </div>
      <div class="logout-header">
          ${
            logout
              ? '<img class="link-header" src="../../images/logout.png" alt="logout">'
              : ""
          }
      </div>
    </div>
  </header>
  `;
}

export function listenLogout() {
  const logoutUser = document.querySelector(".link-header");
  logoutUser.addEventListener("click", async (event) => {
    event.preventDefault();
    await logout();
    DOMHandler("#root").load(LoginPage);
  });
}
