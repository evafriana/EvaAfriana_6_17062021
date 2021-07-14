export class Photographer {
  constructor({
    id,
    name,
    city,
    country,
    tags,
    tagline,
    price,
    portrait,
    media,
  }) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.country = country;
    this.tags = tags;
    this.tagline = tagline;
    this.price = price;
    this.portrait = portrait;
    this.media = media;
  }

  sortMediaBy(key) {
    switch (key) {
      case "title":
        this.media = this.media.sort((a, b) => {
          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
          return 0;
        });
        break;
      case "likes":
      case "date":
        this.media = this.media.sort((a, b) => {
          if (a[key] > b[key]) return -1;
          if (a[key] < b[key]) return 1;
          return 0;
        });
        break;
      default:
        break;
    }
  }

  getMediaSortedBy(key) {
    this.sortMediaBy(key);
    return this.media;
  }
}
