import { Lightbox } from "../components/lightbox.js";

export class Media {
  constructor({
    id,
    photographerId,
    title,
    tags,
    likes,
    date,
    price,
    type,
    url,
  }) {
    this.id = id;
    this.photographerId = photographerId;
    this.title = title;
    this.tags = tags;
    this.likes = likes;
    this.date = date;
    this.price = price;
    this.type = type;
    this.url = url;
  }

  // display this Media in a Lightbox
  display(gallery) {
    new Lightbox({
      artWork: this,
      gallery,
    });
  }
}
