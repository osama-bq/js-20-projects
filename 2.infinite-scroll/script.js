const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = []
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(
            item,
            {
                'href': photo.links.html,
                'target': '_blank'
            });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(
            img,
            {
                'src': photo.urls.regular,
                'alt': photo.alt_description,
                'title': photo.alt_description}
            );

        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Unsplash API
const count = 30;
const apiKey = 'YOUR_API_KEY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`



// Get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {
        console.log(error)
    }
}


window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

getPhotos();