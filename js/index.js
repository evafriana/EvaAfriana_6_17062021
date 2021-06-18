import { getParam, dbData } from "./utils.js";
import { initHome } from "./home_page.js";
import { initPhotographer } from "./photographer_page.js";

const home_page = document.getElementById("home_page");
const photographer_page = document.getElementById("photographer_page");

if (home_page) {
  initHome();
}

if (photographer_page) {
  initPhotographer();
}
