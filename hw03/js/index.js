/**
 * 
 * -------------------------------------
 * DOM Manipulation / Traversal Activity
 * -------------------------------------
 * 
 * 1. Create and attach an event handler (function) to each ".image" 
 * element so that when the ".image" element is clicked, the corresponding 
 * image loads in the .featured image element.
 * 
 * 2. Create event handlers for the next and previous buttons. The next button should
 *    show the next image in the thumbnail list. The previous should show the previous.
 * 
 * 3. If you get to the end, start at the beginning. 
 * 
 * 4. If you get to the beginning, loop around to the end.
 * 
 * 
 */

const images = [
    'images/field1.jpg',
    'images/purple.jpg',
    'images/jar.jpg',
    'images/green.jpg',
    'images/green1.jpg',
    'images/purple1.jpg',
    'images/magnolias.jpg',
    'images/daisy1.jpg'
];

const initScreen = () => {
    images.forEach((image, idx) => {
        document.querySelector('.cards').innerHTML += `
            <li class="card">
                <div class="image" 
                    style="background-image:url('${image}')"
                    data-index="${idx}"></div>
            </li>`;
    });
};

initScreen();

//Thumbnail Click Event Handler:
let imageIndex = 0;

const featureImage = (ev) => {
    const elem = ev.currentTarget;
    imageIndex = parseInt(elem.dataset.index);
    console.log(elem.style.backgroundImage);

    document.querySelector(".featured_image").style.backgroundImage = elem.style.backgroundImage;
};

const imageElements = document.querySelectorAll('.image');
for (const elem of imageElements){
    elem.onclick = featureImage;
};

//Next and Previous Event Handlers

const featureNext = (ev) => {
    if (imageIndex === 7) {
        imageIndex = 0;
    } else {
        imageIndex += 1;
    };
    console.log("currentIndex:", imageIndex);
    console.log(images[1]);
    const elem = images[imageIndex];
    document.querySelector(".featured_image").style.backgroundImage = `url('${elem}')`;
};

const featurePrevious = (ev) => {
    if (imageIndex === 0) {
        imageIndex = 7;
    } else {
        imageIndex -= 1;
    };
    console.log("currentIndex:", imageIndex);
    const elem = images[imageIndex];
    document.querySelector(".featured_image").style.backgroundImage = `url('${elem}')`;
};


document.querySelector('.next').onclick = featureNext;
document.querySelector('.prev').onclick = featurePrevious;
document.querySelector('.featured_image').onclick = featureNext;


