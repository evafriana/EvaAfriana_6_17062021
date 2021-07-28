import { doesFileExist } from "../utils/index.js";

// lightbox modal carousel
export class Lightbox {
  constructor({ artWork, gallery }) {
    this.element = this.buildDOM();
    this.gallery = gallery;
    this.currentArtWork = artWork;
    this.loadMedia(artWork);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }

  // load media: image, video and by default if media doesn't exist
  loadMedia({ url, title, type }) {
    const artWorkTitle = `<span class="lightbox__container__info">${title}</span>`;
    const container = this.element.querySelector(".lightbox__container");
    container.innerHTML = "";
    if (doesFileExist(url)) {
      if (type === "image") {
        container.innerHTML = this.loadImage({ url, title }) + artWorkTitle;
      }

      if (type === "video") {
        container.innerHTML = this.loadVideo({ url, title }) + artWorkTitle;
      }
    } else {
      container.innerHTML =
        this.loadImage({ url: "assets/images/medias/not_found.jpeg", title }) +
        artWorkTitle;
    }
  }

  // load image
  loadImage({ url, title }) {
    return `<img src="${url}" alt="${title}">`;
  }

  //load video
  loadVideo({ url, title }) {
    return `<video controls alt="${title}">
    <source src="${url}" type="video/mp4">
    <source src="${url}" type="video/ogg">
    Your browser does not support the video tag.
  </video>`;
  }

  // append lightbox modal
  buildDOM() {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.innerHTML = `<button class="lightbox__close" aria-label="Close dialog" tabindex="0"></button>
      <button class="lightbox__next" aria-label="Next image"></button>
      <button class="lightbox__prev" aria-label="Previous image"></button>
      <div class="lightbox__container" aria-label="image closeup view" tabindex="0">
      </div>`;
    dom.querySelector(".lightbox__close").addEventListener("click", () => {
      this.close();
    });
    dom.querySelector(".lightbox__next").addEventListener("click", () => {
      this.next();
    });
    dom.querySelector(".lightbox__prev").addEventListener("click", () => {
      this.prev();
    });

    return dom;
  }

  // accessibilty for next, prev and close btn
  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close();
    } else if (e.key === "ArrowRight") {
      this.next(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    }
  }

  // close lightbox
  close() {
    const element = document.querySelector(".lightbox");
    element.classList.add("fadeOut");
    window.setTimeout(() => {
      element.parentElement.removeChild(element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  // acces to next image lightbox
  next() {
    let i = this.gallery.findIndex(
      (artWork) => artWork === this.currentArtWork
    );
    if (i === this.gallery.length - 1) {
      i = -1;
    }
    this.currentArtWork = this.gallery[i + 1];
    this.loadMedia(this.gallery[i + 1]);
  }

  // acces to prev image lightbox
  prev() {
    let i = this.gallery.findIndex(
      (artWork) => artWork === this.currentArtWork
    );
    if (i === 0) {
      i = this.gallery.length;
    }
    this.currentArtWork = this.gallery[i - 1];
    this.loadMedia(this.gallery[i - 1]);
  }
}
