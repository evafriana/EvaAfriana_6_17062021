export const ContactModal = (photographer) => {
  const modal = document.getElementById("modal");
  const modalBtn = document.querySelectorAll(".modalBtn");
  const modalClose = document.querySelectorAll(".close");
  const modalInput = document.querySelectorAll("input[type='text'], textarea");
  const form = document.querySelector("form");

  modal.setAttribute("aria-labelledby", `Contact me ${photographer.name}`);

  // launch modal
  modalBtn.forEach((btn) =>
    btn.addEventListener("click", () => (modal.style.display = "flex"))
  );

  // by clicking on the Send button, display the form data in the console
  let first, last, email, textarea;

  const firstName = (value) => {
    first = value;
  };

  const lastName = (value) => {
    last = value;
  };

  const emailChecker = (value) => {
    email = value;
  };

  const message = (value) => {
    textarea = value;
  };

  modalInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      switch (e.target.id) {
        case "first":
          firstName(e.target.value);
          break;
        case "last":
          lastName(e.target.value);
          break;
        case "email":
          emailChecker(e.target.value);
          break;
        case "textarea":
          message(e.target.value);
          break;
        default:
          null;
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      firstName: first,
      lastName: last,
      email: email,
      message: textarea,
    };
    console.log(data);

    modalInput.forEach((input) => (input.value = ""));
  });

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
