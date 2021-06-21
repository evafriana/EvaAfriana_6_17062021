export const dbData = () => {
  return fetch("./assets/data/fisheye_data.json")
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("error: " + err);
    });
};

export const getParam = (param) => {
  let params = new URLSearchParams(window.location.search);
  return params.get(param);
};

export const tags = (tags) => {
  const labels = tags.map(
    (tag) => `<a><span class="tags" aria-label="Tag">#${tag}</span></a>`
  );
  return `${labels.join("")}`;
};