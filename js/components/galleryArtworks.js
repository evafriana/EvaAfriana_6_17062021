import { checkFileExists } from "../utils/index.js";

export const GalleryArtworks = (media) => {
  const mainGallery = document.querySelector(".photographer__artworks");

  media.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add("photographer__artwork");
    let artWork = `
      <a>
        <img
          class="photographer__artwork__img"
          src="assets/images/medias/not_found.jpeg"
          alt="${element.title}"
        />
      </a>
    `;

    if (element.type === "video") {
      if (checkFileExists(element.url)) {
        artWork = `
        <a><video controls class="photographer__artwork__img">
          <source src="${element.url}" type="video/mp4">
          <source src="${element.url}" type="video/ogg">
          Your browser does not support the video tag.
        </video></a>
      `;
      }
    } else if (element.type === "image") {
      if (checkFileExists(`${element.url}`)) {
        artWork = `
        <a><img
          class="photographer__artwork__img"
          src="${element.url}"
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

    div.addEventListener("click", (e) => {
      e.preventDefault();
      element.display(media);
    });

    mainGallery.appendChild(div);
  });
};
