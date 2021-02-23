// API endpoints
const imgURL = "https://dog.ceo/api/breeds/image/random/4";
const breedURL = "https://dog.ceo/api/breeds/list/all";

let allBreeds;

document.addEventListener("DOMContentLoaded", () => {
  fetchDogImages();
  fetchDogBreeds();
  let filterChoice = document.getElementById("breed-dropdown");
  filterChoice.addEventListener("change", (e) => {
    filterBreeds(e.target.value);
  });
});

// Fetches 4 random photos to render
function fetchDogImages() {
  fetch(imgURL)
    .then((res) => res.json())
    .then((imageData) => {
      const images = imageData.message;
      renderDogImages(images);
    });
}

// Renders images to the page
function renderDogImages(imagesArray) {
  const imgCont = document.getElementById("dog-image-container");
  imagesArray.forEach((image) => {
    const imgDiv = document.createElement("div");
    const img = document.createElement("img");
    imgDiv.classList.add("card");
    img.src = image;
    imgDiv.append(img);
    imgCont.append(imgDiv);
  });
}

function fetchDogBreeds() {
  fetch(breedURL)
    .then((res) => res.json())
    .then((breedsData) => {
      allBreeds = Object.keys(breedsData.message);
      renderDogBreeds(allBreeds);
    });
}

function renderDogBreeds(breedsArray) {
  let dogList = document.getElementById("dog-breeds");
  dogList.innerHTML = "";
  breedsArray.forEach( breed => {
    let li = document.createElement("li");
    li.innerText = breed;
    li.addEventListener("mouseover", () => {
      li.style.color = "blue";
    });
    li.addEventListener("click", () => {
      li.style.color = "red";
    });
    dogList.append(li);
  })
}

function filterBreeds(filtLetter) {
  renderDogBreeds(allBreeds.filter( breed => breed.charAt(0) == filtLetter))
}
