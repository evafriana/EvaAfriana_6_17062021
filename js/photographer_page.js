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
  appendProfil(response.photographers);

  appendMedia(response.media);
};

const appendProfil = (photographers) => {
  const photographerId = parseInt(getParam("id"));

  const photographer = photographers.find((photographer) => {
    return photographer.id === photographerId;
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
      src="./assets/images/photographers/${photographer.portrait}"
      alt=""
      class="photographer__profil__img"
    />
    </div>
    ${tags(photographer.tags)}
      `;
    element.appendChild(div);
  });
};

const checkFileExist = (urlToFile) => {
  const xhr = new XMLHttpRequest();
  xhr.open("HEAD", urlToFile, false);
  xhr.send();

  if (xhr.status == "404") {
    return false;
  } else {
    return true;
  }
};

const appendMedia = (media) => {
  const photographerId = parseInt(getParam("id"));

  const photographerMedias = document.querySelector(".photographer__artworks");

  media.forEach((element) => {
    if (element.photographerId === photographerId) {
      const div = document.createElement("div");
      const path = "assets/images/medias/";
      let artWork = `
        <a>
          <img
            src="${path}not_found.png"
            alt=""
          />
        </a>
      `;

      if (element.video) {
        if (checkFileExist(`${path}${element.video}`)) {
          artWork = `
          <a><video controls>
            <source src="${path}${element.video}" type="video/mp4">
            <source src="${path}${element.video}" type="video/ogg">
            Your browser does not support the video tag.
          </video></a>
        `;
        }
      } else if (element.image) {
        if (checkFileExist(`${path}${element.image}`)) {
          artWork = `
          <a><img
            src="${path}${element.image}"
            alt=""
          /></a>
        `;
        }
      }

      div.innerHTML = `
      ${artWork}
      <div class="photographer__artworks__info">
        <p class="photographer__artworks__title">${element.title}</p>
        <div class="likes">${element.likes} <i class="fas fa-heart"></i></div>
      </div>
    `;

      photographerMedias.appendChild(div);
    }
  });
};
