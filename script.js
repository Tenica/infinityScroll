const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 30;
let photosArray = [];
let initialLoad = true;

const InitialCount = 5;

const apiKey = config.SECRET_API_KEY
let apiUrl = `https://api.unsplash.com/photos/random/?
client_id=${apiKey}&count=${InitialCount}`;


// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) 
  ready = true;
  loader.hidden = true
  console.log("ready =", ready);
  CurrentCount = 30
  apiUrl = `https://api.unsplash.com/photos/random/?
client_id=${apiKey}&count=${CurrentCount}`;
}

// Helper function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for links & Photos, Add to DOM
function displayPhotos(params) {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("total images", totalImages);
  //run function for each object in photosArray
  photosArray.forEach((photo) => {
    //create <a> to link to Unsplash
    const item = document.createElement("a");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    //Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event listner
    img.addEventListener("load", imageLoaded);
    //put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//Get Photos from Unsplash API

async function getPhotos(params) {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    console.log(photosArray);
  } catch (error) {}
}

getPhotos();

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});


