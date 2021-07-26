import { doesFileExist } from "../utils/index.js";

export const GalleryArtworks = (media) => {
  const mainGallery = document.querySelector(".photographer__artworks");

  // append media image or video to gallery artworks
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
      if (doesFileExist(element.url)) {
        artWork = `
        <a><video controls class="photographer__artwork__img">
          <source src="${element.url}" type="video/mp4">
          <source src="${element.url}" type="video/ogg">
          Your browser does not support the video tag.
        </video></a>
      `;
      }
    } else if (element.type === "image") {
      if (doesFileExist(`${element.url}`)) {
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

    // show image to lightbox when clicked
    const lightbox = div.querySelector(".photographer__artwork__img");

    lightbox.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(media);
      element.display(media);
    });

    // add one like when clicked
    const clickme = div.querySelector(".clickme");
    const likes = div.querySelector("#likes");

    clickme.addEventListener("click", () => {
      // const count = parseInt(likes.innerHTML) + 1;
      const count = parseInt(element.likes) + 1;
      likes.innerHTML = count;
      countLikes();
    });

    mainGallery.appendChild(div);
  });

  // show total likes on footer according to media likes
  countLikes();
};

const countLikes = () => {
  const totalLikes = document.querySelector(".total__likes");
  const likesSpan = document.querySelectorAll(".likes");
  let count = 0;
  likesSpan.forEach((span) => {
    count += parseInt(span.innerHTML);
  });
  totalLikes.innerHTML = count;
};
