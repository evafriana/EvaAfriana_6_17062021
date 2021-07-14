import { Tags } from "./tags.js";

export const Profil = ({ name, city, country, tagline, portrait, tags }) => {
  document.querySelector(".photographer__profil__info").innerHTML = `
        <h2>${name}</h2>
        <span>
          <h4>${city}, ${country}</h4>
          <p>${tagline}</p> 
        </span>`;

  document.querySelector(
    ".photographer__profil__img"
  ).src = `./assets/images/photographers/${portrait}`;

  document
    .querySelector(".photographer__profil__img")
    .setAttribute("aria-label", `${name}`);

  document.querySelector(".photographer__tag").innerHTML = `
          ${Tags(tags, "")}
        `;

  document.querySelector(".modal__content__title").innerHTML = `
        <h2>Contactez-moi</h2>
        <h2>${name}</h2>
      `;
};
