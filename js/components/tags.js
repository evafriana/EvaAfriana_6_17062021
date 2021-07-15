import { Tag } from "./tag.js";

export const Tags = (tags, className = "") => {
  const labels = tags.map((tag) => Tag(tag));
  return `
    <ul class="${className}" tabindex="0" aria-label="Tag">
    ${labels.join("")}
    </ul>
    `;
};
