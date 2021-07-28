import { GalleryArtworks } from "./galleryArtworks.js";

export const FilterDropdown = (photographer) => {
  const toggleButton = document.querySelector(".toggle__button");
  const toggleList = document.querySelector(".toggle__list");

  toggleButton.addEventListener("click", () => {
    toggleList.classList.toggle("open");
    toggleButton.classList.toggle("arrow-down");
    toggleButton.classList.toggle("arrow-up");
    appendLi(toggleList, toggleButton);
  });

  // append dropdown options
  const appendLi = (toggleList, toggleButton) => {
    // filter dropdown options
    const dropdownOptions = [
      { key: "likes", value: "Popularité" },
      { key: "date", value: "Date" },
      { key: "title", value: "Titre" },
    ];

    // remove li
    toggleList.innerText = "";

    // add a ghost li
    const li = document.createElement("li");
    li.appendChild(document.createTextNode("_"));
    toggleList.appendChild(li);

    // add li
    dropdownOptions.forEach(({ key, value }) => {
      if (value !== toggleButton.textContent) {
        const li = document.createElement("li");
        li.setAttribute("role", "option");
        li.appendChild(document.createTextNode(value));
        li.classList.add("toggle__border");
        toggleList.appendChild(li);

        li.addEventListener("click", () => {
          toggleButton.textContent = value;
          toggleList.classList.remove("open");
          toggleButton.classList.toggle("arrow-down");
          toggleButton.classList.toggle("arrow-up");
          document.querySelector(".photographer__artworks").innerText = "";
          GalleryArtworks(photographer.getMediaSortedBy(key.toLowerCase()));
        });
      }
    });
  };
};
