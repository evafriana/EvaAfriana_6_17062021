import { Tags } from "./tags.js";

export const GalleryCard = ({
  id,
  portrait,
  name,
  city,
  country,
  tagline,
  price,
  tags,
}) => {
  const div = document.createElement("div");
  div.innerHTML = `
      <a tabindex="0" href="photographer_page.html?id=${id}">
        <img
          class="photographers__profil"
          src="assets/images/photographers/${portrait}"
          aria-label="${name}"
        />
        <h2>${name}</h2>
      </a>
      <div class=photographers__info>
        <h4>${city}, ${country}</h4>
        <p>${tagline}</p>
        <p class="photographers__price">${price}/jour</p> 
      <div>
      ${Tags(tags, "header__nav__list")}
      `;

  return div;
};
