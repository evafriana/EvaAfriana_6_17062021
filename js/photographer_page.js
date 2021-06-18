import { getParam, dbData, tags } from "./utils.js";

export const initPhotographer = () => {
  dbData()
    .then((response) => {
      appendData(response);
    })
    .catch((err) => {
      console.log("error: " + err);
    });
};

const appendData = (response) => {
  const photographerId = getParam("id");

  const { photographers } = response;
  const photographer = photographers.find((photographer) => {
    return photographer.id === parseInt(photographerId);
  });

  const photographerProfil = document.querySelectorAll(".photographer");
  photographerProfil.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="photographer__profil">
    <div class="photographer__profil__info">
      <h2>${photographer.name}</h2>
      <span>
        <h4>${photographer.city}, ${photographer.country}</h4>
        <p>${photographer.tagline}</p>
      </span>
    </div>
    <button class="btn btn__primary btn__profil desktop">
      <span class="contact">Contactez-moi</span>
    </button>
    <img
      src="./assets/images/photographers/MimiKeel.jpg"
      alt=""
      class="photographer__profil__img"
    />
    </div>
    ${tags(photographer.tags)}
      `;
    element.appendChild(div);
  });
};
