import { Tags } from "./tags.js";

export const Profil = ({ name, city, country, tagline, portrait, tags }) => {
  // add photographers info
  document.querySelector(".photographer__profil__info").innerHTML = `
        <h2>${name}</h2>
        <span>
          <h4>${city}, ${country}</h4>
          <p>${tagline}</p> 
        </span>`;

  // add photographers profil img
  document.querySelector(
    ".photographer__profil__img"
  ).src = `./assets/images/photographers/${portrait}`;

  // add photographer's name as aria-label to photographer profil img
  document
    .querySelector(".photographer__profil__img")
    .setAttribute("aria-label", `${name}`);

  // add photographer's tags
  document.querySelector(".photographer__tag").innerHTML = `
          ${Tags(tags, "photographer__tag__list")}
        `;

  // add photographer's name on modal
  document.querySelector(".modal__content__title").innerHTML = `
        <h2>Contactez-moi</h2>
        <h2>${name}</h2>
      `;
};
