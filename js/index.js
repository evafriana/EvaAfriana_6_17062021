import { initHome } from "./pages/home.js";
import { initPhotographer } from "./pages/photographer.js";

// website's router

const home_page = document.getElementById("home_page");
const photographer_page = document.getElementById("photographer_page");

if (home_page) {
  initHome();
}

if (photographer_page) {
  initPhotographer();
}
