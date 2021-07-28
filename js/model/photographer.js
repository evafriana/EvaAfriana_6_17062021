export const photographerFactory = ({
  id,
  name,
  city,
  country,
  tags,
  tagline,
  price,
  portrait,
  media,
}) => {
  return {
    id,
    name,
    city,
    country,
    tags,
    tagline,
    price,
    portrait,
    media,

    sortMediaBy(key) {
      switch (key) {
        case "title":
          media = media.sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
          });
          break;
        case "likes":
        case "date":
          media = media.sort((a, b) => {
            if (a[key] > b[key]) return -1;
            if (a[key] < b[key]) return 1;
            return 0;
          });
          break;
        default:
          break;
      }
    },

    getMediaSortedBy(key) {
      this.sortMediaBy(key);
      return media;
    },
  };
};
