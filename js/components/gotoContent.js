export const handleGotocontent = () => {
  const goToContent = document.querySelector(".gotocontent");
  goToContent.innerHTML = "Passer au contenu";

  window.addEventListener("scroll", () => {
    document.body.dataset.scroll = window.scrollY;
    document.body.dataset.scroll;
  });
};
