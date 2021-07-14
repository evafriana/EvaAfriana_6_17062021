import { getParam, fetchData } from "../utils/index.js";
import { Photographer } from "../model/photographer.js";
import { Media } from "../model/media.js";
import { Profil } from "../components/profil.js";
import { GalleryArtworks } from "../components/galleryArtworks.js";

const { photographers, media } = await fetchData(
  "./assets/data/fisheye_data.json"
);

const photographerId = parseInt(getParam("id"));

export const initPhotographer = () => {
  const photographerProfil = new Photographer(
    photographers
      // find photographer by id
      .find((photographer) => {
        return photographer.id === photographerId;
      })
  );

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
      return new Media({ ...artWork, type, url });
    });

  appendPhotographerProfil(photographerProfil);
  appendMedia(mediaList);
};

const appendPhotographerProfil = (photographer) => {
  Profil(photographer);
};

const appendMedia = (media) => {
  GalleryArtworks(media);
};
