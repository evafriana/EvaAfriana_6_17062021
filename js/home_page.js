import { dbData, tags } from "./utils.js";

export const initHome = () => {
  dbData()
    .then((response) => {
      appendData(response);
    })
    .catch((err) => {
      console.log("error: " + err);
    });
};

const appendData = (response) => {
  const mainGallery = document.getElementById("photographers");
  response.photographers.forEach((photographer) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <a tabindex="0" href="photographer_page.html?id=${photographer.id}&name=${
      photographer.name
    }">
      <img
        class="photographers__profil"
        src="assets/images/photographers/${photographer.portrait}"
        aria-label="${photographer.name}"
      />
      <h2>${photographer.name}</h2>
    </a>
    <div class=photographers__info>
      <h4>${photographer.city}, ${photographer.country}</h4>
      <p>${photographer.tagline}</p>
      <p class="photographers__price">${photographer.price}/jour</p> 
    <div>
    ${tags(photographer.tags)}
  `;
    mainGallery.appendChild(div);
  });
};
