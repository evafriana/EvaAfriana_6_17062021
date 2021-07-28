import { Lightbox } from "../components/lightbox.js";

export const mediaFactory = ({
  id,
  photographerId,
  title,
  tags,
  likes,
  date,
  price,
  type,
  url,
}) => {
  return {
    id,
    photographerId,
    title,
    tags,
    likes,
    date,
    price,
    type,
    url,

    // display this Media in a Lightbox
    display(gallery) {
      new Lightbox({
        artWork: this,
        gallery,
      });
    },
  };
};
