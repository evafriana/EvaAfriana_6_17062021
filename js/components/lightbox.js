import { doesFileExist } from "../utils/index.js";

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

  loadImage({ url, title }) {
    return `<img src="${url}" alt="${title}">`;
  }

  loadVideo({ url, title }) {
    return `<video controls alt="${title}">
    <source src="${url}" type="video/mp4">
    <source src="${url}" type="video/ogg">
    Your browser does not support the video tag.
  </video>`;
  }

  buildDOM() {
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
      this.next();
    });
    dom.querySelector(".lightbox__prev").addEventListener("click", () => {
      this.prev();
    });

    return dom;
  }

  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close();
    } else if (e.key === "ArrowRight") {
      this.next(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    }
  }

  close() {
    const element = document.querySelector(".lightbox");
    element.classList.add("fadeOut");
    window.setTimeout(() => {
      element.parentElement.removeChild(element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }

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
