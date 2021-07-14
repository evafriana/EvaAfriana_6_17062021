import { getParam, fetchData } from "../utils/index.js";
import { Photographer } from "../model/photographer.js";
import { GalleryCard } from "../components/galleryCard.js";
import { Tags } from "../components/tags.js";

const { photographers } = await fetchData("./assets/data/fisheye_data.json");

export const initHome = () => {
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

  const tagsArray = [
    "Portrait",
    "Art",
    "Fashion",
    "Architecture",
    "Travel",
    "Sport",
    "Animals",
    "Events",
  ];

  appendPhotographerCards(photographersList);
  appendNavTags(tagsArray);
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
