// fetch data from url (e.g. JSON file path)
export const fetchData = async (url) => {
  return await fetch(url)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("error: " + err);
    });
};

// get URL param
export const getParam = (param) => {
  let params = new URLSearchParams(window.location.search);
  return params.get(param);
};

// check if a media exist from url
export const doesFileExist = (urlToFile) => {
  const xhr = new XMLHttpRequest();
  xhr.open("HEAD", urlToFile, false);
  xhr.send();

  if (xhr.status == "404") {
    return false;
  } else {
    return true;
  }
};
