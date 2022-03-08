const wheels = document.querySelectorAll('.wheels');

wheels.forEach( (wheel) => {
    let wheelBounds = wheel.getBoundingClientRect();
    let wheelCenter = {
        x: wheelBounds.left + wheelBounds.width/2,
        y: wheelBounds.top + wheelBounds.height/2
    };
    document.addEventListener('mousemove', e => {
        let angle = Math.atan2(e.pageX - wheelCenter.x, - (e.pageY - wheelCenter.y)) * (180 / Math.PI);
        wheel.style.transform = `rotate(${angle}deg)`;
        })
});


const screen = document.getElementById('screen');
const sizeOptions = document.querySelectorAll('a');
let gridSize = 16;

const screenDimensions = screen.getBoundingClientRect();
let screenWidth = screenDimensions.width;
let screenHeight = screenDimensions.height;

let pixelWidth = '';
let pixelHeight = '';


function setPixelSize () {
    pixelWidth = screenWidth/gridSize;
    pixelHeight = screenHeight/gridSize;
}


function populateScreen (gridSize) {
    setPixelSize();
    for (let i = 0; i < gridSize * gridSize; i++) {
        let pixel = document.createElement('div');
        pixel.classList.add('pixel');
        screen.appendChild(pixel);
    }
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => {
        pixel.setAttribute('style',`width: ${pixelWidth}px; height: ${pixelHeight}px`);
    })
}


sizeOptions.forEach((size) => {
    size.addEventListener('click', () => {
        gridSize = size.id;
        populateScreen(gridSize);
    })
});


window.onload = () => {
    populateScreen(gridSize);
}