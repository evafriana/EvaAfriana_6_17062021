import { dbData, tags, getParam } from "./utils.js";

export const initHome = () => {
  handleGotocontent();
  dbData()
    .then((response) => {
      let res = response.photographers;
      const tag = getParam("tag");
      if (tag) {
        res = res.filter((photographer) => {
          return photographer.tags.includes(tag);
        });
      }

      appendData(res);
    })
    .catch((err) => {
      console.log("error: " + err);
    });
};

// go to content scroll
const handleGotocontent = () => {
  const goToContent = document.querySelector(".gotocontent");
  goToContent.innerHTML = "Passer au contenu";

  window.addEventListener("scroll", () => {
    document.body.dataset.scroll = window.scrollY;
    document.body.dataset.scroll;
  });
};

const appendData = (photographers) => {
  const mainGallery = document.getElementById("photographers");
  photographers.forEach((photographer) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <a tabindex="0" href="photographer__profile.html?id=${photographer.id}">
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

const headerNavList = document.querySelector(".header__nav__list");

if (headerNavList) {
  tagsArray.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <a tabindex="0" href="index.html?tag=${item.toLowerCase()}">#${item}</a>`;
    li.classList.add("header__nav__item");
    li.classList.add("tags");
    if (getParam("tag") === item.toLowerCase()) {
      li.classList.add("active");
    }

    headerNavList.appendChild(li);
  });
}
