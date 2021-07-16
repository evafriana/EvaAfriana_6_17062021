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
  const imagePlaceholder = document.querySelector(
    ".photographer__profil__img--span"
  );
  const profilImage = document.createElement("img");
  profilImage.src = `./assets/images/photographers/${portrait}`;
  profilImage.classList.add("photographer__profil__img");
  profilImage.setAttribute("alt", `${name} profil image`);
  profilImage.setAttribute("aria-label", `${name}`);
  imagePlaceholder.parentNode.replaceChild(profilImage, imagePlaceholder);

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
