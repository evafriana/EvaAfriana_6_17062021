import { getParam, fetchData } from "../utils/index.js";
import { Photographer } from "../model/photographer.js";
import { GalleryCard } from "../components/galleryCard.js";
import { Tags } from "../components/tags.js";
import { handleGotocontent } from "../components/gotoContent.js";

// get data
const { photographers } = await fetchData("./assets/data/fisheye_data.json");

// init home page
export const initHome = () => {
  // get photographers to show
  const photographersList = photographers
    // filter photographers if there is a tag param
    .filter((photographer) => {
      const tag = getParam("tag");
      if (tag) {
        return photographer.tags.includes(tag);
      }
      return true;
    })
    .map((photographer) => {
      return new Photographer(photographer);
    });

  // list of tags for nav tags header
  // create an empty Set for photographers tags
  const allTags = new Set();

  // add photographers tags to allTags Set (tags will be unique)
  photographers.forEach((photographer) => {
    const tags = photographer.tags || [];
    tags.forEach((tag) => allTags.add(tag));
  });

  // change allTags Set to Array (to have access to Array methods)
  const tagsArray = Array.from(allTags);

  // append photographers gallery
  appendPhotographerCards(photographersList);

  // append nav tags header
  appendNavTags(tagsArray);

  // handle go to content feature on scroll
  handleGotocontent();
};

const appendPhotographerCards = (list) => {
  const mainGallery = document.getElementById("photographers");
  list.forEach((photographer) => {
    const div = GalleryCard(photographer);
    mainGallery.appendChild(div);
  });
};

const appendNavTags = (tagsArray) => {
  const headerNavList = document.querySelector(".header__nav");
  headerNavList.innerHTML = Tags(tagsArray, "header__nav__list");
};
