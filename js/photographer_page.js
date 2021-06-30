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

  photographerProfil.forEach(() => {
    document.querySelector(".photographer__profil__info").innerHTML = `
    <h2>${photographer.name}</h2>
    <span>
      <h4>${photographer.city}, ${photographer.country}</h4>
      <p>${photographer.tagline}</p> 
    </span>`;

    document.querySelector(
      ".photographer__profil__img"
    ).src = `./assets/images/photographers/${photographer.portrait}`;

    document.querySelector(".photographer__tag").innerHTML = `
      ${tags(photographer.tags)}
    `;

    document.querySelector(".modal__content__title").innerHTML = `
    <h2>Contactez-moi</h2>
    <h2>${photographer.name}</h2>
  `;
  });
};

// contact button Modal
// DOM Elements
const modal = document.getElementById("modal");
const modalBtn = document.querySelectorAll("#modalBtn");
const modalClose = document.querySelectorAll(".close");

// launch modal form
const launchModal = () => {
  modal.style.display = "flex";
};

// launch modal event
modalBtn?.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal form
const closeModal = () => {
  modal.style.display = "none";
};

// close modal event
modalClose.forEach((btn) => btn.addEventListener("click", closeModal));

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
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
      div.classList.add("artwork__modal");
      const path = "assets/images/medias/";
      let artWork = `
        <a>
          <img
            class="artwork__img"
            src="${path}not_found.jpeg"
            alt="${element.title}"
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
            class="artwork__img"
            src="${path}${element.image}"
            alt="${element.title}"
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

  Lightbox.init();
};

// lightbox modal carousel
class Lightbox {
  static init() {
    console.log("ok");
    const links = document.querySelectorAll(".artwork__img").forEach((link) => {
      console.log(link);

      return link.addEventListener("click", (e) => {
        e.preventDefault();

        new Lightbox({
          url: link.getAttribute("src"),
          title: link.getAttribute("alt"),
        });
      });
    });
  }

  /**
   * @param {string} url Url de l'image
   */
  constructor({ url, title }) {
    const element = this.buildDOM({ url, title });
    document.body.appendChild(element);
  }

  /**
   * close lightbox
   * @param {HTMLElement} element
   */
  close(element) {
    element.classList.add("fadeOut");
    window.setTimeout(() => {
      element.parentElement.removeChild(element);
    }, 500);
  }

  /**
   * @param {object} url & title de l'image
   * @return {HTMLElement}
   */
  buildDOM({ url, title }) {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.innerHTML = `<button class="lightbox__close"></button>
    <button class="lightbox__next"></button>
    <button class="lightbox__prev"></button>
    <div class="lightbox__container">
      <img
        src="./${url}"
        alt="${title}"
      />
      <div class="lightbox__container__info">${title}</div>
    </div>`;
    dom
      .querySelector(".lightbox__close")
      // .addEventListener("click", this.close.bind(this));
      .addEventListener("click", () => {
        this.close(dom);
      });
    return dom;
  }
}

/**
 * 
  <div class="lightbox">
    <button class="lightbox__close"></button>
    <button class="lightbox__next"></button>
    <button class="lightbox__prev"></button>
    <div class="lightbox__container">
      <img
        src="./assets/images/medias/Animals_Majesty.jpg "
        alt=""
        width="500px"
        height="auto"
        style="object-fit: contain"
      />
      <div class="lightbox__container__info">Titre</div>
    </div>
  </div>
 */
