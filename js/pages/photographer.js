import { getParam, fetchData } from "../utils/index.js";
import { photographerFactory } from "../model/photographer.js";
import { mediaFactory } from "../model/media.js";
import { Profil } from "../components/profil.js";
import { GalleryArtworks } from "../components/galleryArtworks.js";
import { ContactModal } from "../components/contactModal.js";
import { FilterDropdown } from "../components/filterDropdown.js";

// get data
const { photographers, media } = await fetchData(
  "./assets/data/fisheye_data.json"
);

// get photographer id from URL param
const photographerId = parseInt(getParam("id"));

// init photographer page
export const initPhotographer = () => {
  // find photographer by id
  const photographerProfil = photographers.find((photographer) => {
    return photographer.id === photographerId;
  });

  // filter photographer's media
  const mediaList = media
    .filter((artWork) => {
      return artWork.photographerId === photographerId;
    })
    .map((artWork) => {
      const { image, video } = artWork;
      const type = image ? "image" : "video";
      const url = image
        ? `assets/images/medias/${image}`
        : `assets/images/medias/${video}`;
      return mediaFactory({ ...artWork, type, url });
    });

  // create Photographer with media
  const photographer = photographerFactory({
    ...photographerProfil,
    media: mediaList,
  });

  // append profil info
  Profil(photographer);

  // append media gallery
  GalleryArtworks(photographer.getMediaSortedBy("likes"));

  // handle contact modal
  ContactModal(photographer);

  // handle filter dropdown
  FilterDropdown(photographer);

  // show photographer price on footer
  const photographerPrice = document.querySelector(".photographer__price");
  photographerPrice.innerHTML = `${photographer.price}€`;
};
