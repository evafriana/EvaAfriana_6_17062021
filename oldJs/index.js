import { initHome } from "./home_page.js";
import { initPhotographer } from "./photographer__profile.js";

const home_page = document.getElementById("home_page");
const photographer__profile = document.getElementById("photographer__profile");

if (home_page) {
  initHome();
}

if (photographer__profile) {
  initPhotographer();
}
