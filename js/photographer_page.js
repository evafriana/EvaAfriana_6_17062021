import { getParam, dbData, tags, checkFileExist } from "./utils.js";

export const initPhotographer = () => {
  dbData()
    .then((response) => {
      appendData(response);
    })
    .catch((err) => {
      console.log("error: " + err);
    });
};

// call profil of photographer
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
    <button class="btn btn__profil desktop">
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

// sort artworks's photographer by popularity, date and title
const dropdownOptions = [
  { key: "likes", value: "Popularité" },
  { key: "date", value: "Date" },
  { key: "title", value: "Titre" },
  ,
];
const toggleButton = document.querySelector(".toggle__button");
const toggleList = document.querySelector(".toggle__list");

if (toggleButton) {
  toggleButton.addEventListener("click", () => {
    toggleList.classList.toggle("open");
    toggleButton.classList.toggle("arrow-down");
    toggleButton.classList.toggle("arrow-up");
    appendLi();
  });

  const appendLi = () => {
    // remove li
    toggleList.innerText = "";

    // add a ghost li
    const li = document.createElement("li");
    li.appendChild(document.createTextNode("_"));
    toggleList.appendChild(li);

    // add li
    dropdownOptions.forEach(({ key, value }) => {
      if (value !== toggleButton.textContent) {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(value));
        li.classList.add("toggle__border");
        toggleList.appendChild(li);

        li.addEventListener("click", (event) => {
          toggleButton.textContent = value;
          toggleList.classList.remove("open");
          document.querySelector(".photographer__artworks").innerText = "";
          resetMedia(key.toLowerCase());
        });
      }
    });
  };
}

const resetMedia = (key) => {
  dbData()
    .then((response) => {
      appendMedia(response.media, key);
    })
    .catch((err) => {
      console.log("error: " + err);
    });
};

// call photographer's artworks
const appendMedia = (medias, key = "likes") => {
  const photographerId = parseInt(getParam("id"));
  const photographerMedias = document.querySelector(".photographer__artworks");

  let res = medias;

  if (key === "title") {
    res = medias.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
  } else {
    res = medias.sort((a, b) => {
      if (a[key] > b[key]) return -1;
      if (a[key] < b[key]) return 1;
      return 0;
    });
  }

  res.forEach((element) => {
    if (element.photographerId === photographerId) {
      const div = document.createElement("div");
      const path = "assets/images/medias/";
      let artWork = `
        <a>
          <img
            src="${path}not_found.jpeg"
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
