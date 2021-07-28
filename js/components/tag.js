import { getParam } from "../utils/index.js";

export const Tag = (tag) => {
  const activeLabel = getParam("tag") === tag.toLowerCase();
  return `<li class="tags ${activeLabel ? "active" : ""}">
  <a tabindex="0" href="index.html?tag=${tag.toLowerCase()}">#${tag}</a>
  </li>`;
};
