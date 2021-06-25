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

const tag = (item) => {
  return `<span class="tags" aria-label="Tag">#${item}</span>`;
};

export const tags = (tags) => {
  const labels = tags.map((item) => tag(item));
  return `${labels.join("")}`;
};

export const checkFileExist = (urlToFile) => {
  const xhr = new XMLHttpRequest();
  xhr.open("HEAD", urlToFile, false);
  xhr.send();

  if (xhr.status == "404") {
    return false;
  } else {
    return true;
  }
};
