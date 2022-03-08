const screen = document.getElementById('screen');
const sizeOptions = document.querySelectorAll('a');
let gridSize = 16;
let mode = 'monochrome';

const screenDimensions = screen.getBoundingClientRect();
let screenWidth = screenDimensions.width;
let screenHeight = screenDimensions.height;

let pixels = document.querySelectorAll('.pixel');
let pixelWidth = '';
let pixelHeight = '';

const modes = document.querySelectorAll('.modes');
const clearButton = document.getElementById('clear');
const wheels = document.querySelectorAll('.wheels');


clearButton.addEventListener('click', () => {
    clearScreen();
    populateScreen(gridSize);
})


wheels.forEach((wheel) => {
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


function setPixelSize() {
    pixelWidth = screenWidth/gridSize;
    pixelHeight = screenHeight/gridSize;
}

function clearScreen() {
    while (screen.lastElementChild) {
        screen.removeChild(screen.lastElementChild);
    }
}

function changeColor(e) {
    e.target.style.backgroundColor = 'black';
}


function populateScreen(gridSize) {
    clearScreen();
    setPixelSize();
    for (let i = 0; i < gridSize * gridSize; i++) {
        let pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.setAttribute('style',`width: ${pixelWidth}px; height: ${pixelHeight}px`)
        pixel.addEventListener('click', changeColor);
        screen.appendChild(pixel);
    }
}





sizeOptions.forEach((size) => {
    size.addEventListener('click', () => {
        gridSize = size.id;
        populateScreen(gridSize);
    })
});

modes.forEach((option) => {
    option.addEventListener('click', () => {
        mode = `${option.id}`;
    });
});


window.onload = () => {
    populateScreen(gridSize);
}