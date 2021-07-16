export const ContactModal = (photographer) => {
  const modal = document.getElementById("modal");
  const modalBtn = document.querySelectorAll(".modalBtn");
  const modalClose = document.querySelectorAll(".close");

  modal.setAttribute("aria-labelledby", `Contact me ${photographer.name}`);

  // launch modal
  modalBtn.forEach((btn) =>
    btn.addEventListener("click", () => (modal.style.display = "flex"))
  );

  // close modal
  modalClose.forEach((btn) =>
    btn.addEventListener("click", () => (modal.style.display = "none"))
  );

  // when the user clicks anywhere outside of the modal, close it
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // close modal when escape key is pressed
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      //if esc key was not pressed in combination with ctrl or alt or shift
      const isNotCombinedKey = !(
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      );
      if (isNotCombinedKey) {
        modal.style.display = "none";
      }
    }
  });
};
