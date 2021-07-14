import { getParam, dbData, tags, doesFileExist } from "./utils.js";

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

    document
      .querySelector(".photographer__profil__img")
      .setAttribute("aria-label", `${photographer.name}`);

    document.querySelector(".photographer__tag").innerHTML = `
      ${tags(photographer.tags)}
    `;

    document.querySelector(".modal__content__title").innerHTML = `
    <h2>Contactez-moi</h2>
    <h2>${photographer.name}</h2>
  `;
  });

  // the price of photographer in footer
  const photographerPrice = document.querySelector(".photographer__price");
  photographerPrice.innerHTML = `${photographer.price}€`;

  // contact button Modal
  const modal = document.getElementById("modal");
  modal.setAttribute("aria-labelledby", `Contact me ${photographer.name}`);
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

// Close modal when escape key is pressed
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    //if esc key was not pressed in combination with ctrl or alt or shift
    const isNotCombinedKey = !(event.ctrlKey || event.altKey || event.shiftKey);
    if (isNotCombinedKey) {
      closeModal();
    }
  }
});

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
        li.setAttribute("role", "option");
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

  // to sort the title of media from a to z
  if (key === "title") {
    res = medias.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    // to sort media from smallest to largest
  } else {
    res = medias.sort((a, b) => {
      if (a[key] > b[key]) return -1;
      if (a[key] < b[key]) return 1;
      return 0;
    });
  }

  let numberLikes = 0;

  res.forEach((element) => {
    if (element.photographerId === photographerId) {
      numberLikes += element.likes;
      const div = document.createElement("div");
      div.classList.add("photographer__artwork");
      const path = "assets/images/medias/";
      let artWork = `
        <a>
          <img
            class="photographer__artwork__img"
            src="${path}not_found.jpeg"
            alt="${element.title}"
          />
        </a>
      `;

      if (element.video) {
        if (doesFileExist(`${path}${element.video}`)) {
          artWork = `
          <a><video controls class="photographer__artwork__img">
            <source src="${path}${element.video}" type="video/mp4">
            <source src="${path}${element.video}" type="video/ogg">
            Your browser does not support the video tag.
          </video></a>
        `;
        }
      } else if (element.image) {
        if (doesFileExist(`${path}${element.image}`)) {
          artWork = `
          <a><img
            class="photographer__artwork__img"
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
            <p class="photographer__artworks__date">${element.date}</p>
            <p class="photographer__artworks__price">${element.price}€</p>
          <div>
            <span id="likes" class="likes">${element.likes}</span>
            <i class="fas fa-heart clickme" aria-label="likes"></i>
          </div>
        </div>
      `;

      photographerMedias.appendChild(div);

      const clickme = div.querySelector(".clickme");
      const likes = div.querySelector("#likes");

      clickme.addEventListener("click", () => {
        // const count = parseInt(likes.innerHTML) + 1;
        const count = parseInt(element.likes) + 1;
        likes.innerHTML = count;
        countLikes();
      });
    }
  });
  Lightbox.init();

  const totalLikes = document.querySelector(".total__likes");
  totalLikes.innerHTML = numberLikes;
};

// footer for total likes or le cliché
const countLikes = () => {
  const totalLikes = document.querySelector(".total__likes");
  const likesSpan = document.querySelectorAll(".likes");
  let count = 0;
  likesSpan.forEach((span) => {
    count += parseInt(span.innerHTML);
  });
  totalLikes.innerHTML = count;
};

// lightbox modal carousel
/**
 * @property {HTMLElement} element
 * @property {string[]} gallery lightbox image paths
 * @property {string} url currently displayed images
 */
class Lightbox {
  static init() {
    const links = Array.from(
      document.querySelectorAll(".photographer__artwork__img")
    );
    const gallery = links.map((link) => link.getAttribute("src"));
    // const gallery = links.map((link) => link.getAttribute("data-id"));

    links.forEach((link) => {
      return link.addEventListener("click", (e) => {
        e.preventDefault();

        new Lightbox({
          url: link.getAttribute("src"),
          // url: link.getAttribute("data-id"),
          // title: link.getAttribute("alt", `${title}`),
          gallery,
        });
      });
    });
  }

  /**
   * @param {string} url Url of image
   * @param {string[]} gallery lightbox image paths
   */
  constructor({ url, title, gallery }) {
    this.element = this.buildDOM({ url, title });
    this.images = gallery;
    this.loadImage(url, title);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }

  /**
   * @param {string} url Url de l'image
   */
  loadImage(url, title) {
    this.url = null;
    const image = new Image();
    const container = this.element.querySelector(".lightbox__container");
    container.innerHTML = "";
    image.onload = () => {
      container.innerHTML = `
      <span class="lightbox__container__info">${title}</span>`;
      container.appendChild(image);
      this.url = url;
    };
    image.src = url;
    image.alt = `${title}`;
  }

  /**
   * @param {KeyboardEvent} e
   */

  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close();
    } else if (e.key === "ArrowRight") {
      this.next(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    }
  }

  /**
   * close lightbox
   * @param {MouseEvent|KeyboardEvent} element
   */
  close() {
    const element = document.querySelector(".lightbox");
    element.classList.add("fadeOut");
    window.setTimeout(() => {
      element.parentElement.removeChild(element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  /**
   * next lightbox
   * @param {MouseEvent|KeyboardEvent} element
   */
  next(element) {
    let i = this.images.findIndex((img) => img === this.url);
    if (i === this.images.length - 1) {
      i = -1;
    }
    this.loadImage(this.images[i + 1]);
  }

  /**
   * prev lightbox
   * @param {MouseEvent|KeyboardEvent} element
   */
  prev(element) {
    let i = this.images.findIndex((img) => img === this.url);
    if (i === 0) {
      i = this.images.length;
    }
    this.loadImage(this.images[i - 1]);
  }

  /**
   * @param {object} url & title de l'image
   * @return {HTMLElement}
   */
  buildDOM({ url, title }) {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.innerHTML = `<button class="lightbox__close" aria-label="Close dialog"></button>
    <button class="lightbox__next" aria-label="Next image"></button>
    <button class="lightbox__prev" aria-label="Previous image"></button>
    <div class="lightbox__container" aria-label="image closeup view">
    </div>`;
    dom.querySelector(".lightbox__close").addEventListener("click", () => {
      this.close();
    });
    dom.querySelector(".lightbox__next").addEventListener("click", () => {
      this.next(dom);
    });
    dom.querySelector(".lightbox__prev").addEventListener("click", () => {
      this.prev(dom);
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
        src="./${url}"
        alt="${title}"
      />
      <span class="lightbox__container__info">${title}</span>
    </div>
  </div>
 */
