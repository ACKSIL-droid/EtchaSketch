const screen = document.getElementById('screen');
const sizeOptions = document.querySelectorAll('a');
let gridSize = 64;
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

let mouseDown = false;
document.body.onmousedown = () => mouseDown = true;
document.body.onmouseup = () => mouseDown = false;





function clearScreen() {
    while (screen.lastElementChild) {
        screen.removeChild(screen.lastElementChild);
    }
}

function setPixelSize() {
    pixelWidth = screenWidth/gridSize;
    pixelHeight = screenHeight/gridSize;
}

function preventDrag () {
    const divs = document.querySelectorAll('div');
    divs.forEach((div) => {
        div.addEventListener('dragstart', (e) => {
            e.preventDefault()
        })
    });
}

function populateScreen(gridSize) {
    clearScreen();
    setPixelSize();
    preventDrag();
    for (let i = 0; i < gridSize * gridSize; i++) {
        let pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.setAttribute('style',`width: ${pixelWidth}px; height: ${pixelHeight}px`)
        pixel.addEventListener('mouseover', changeColor);
        screen.appendChild(pixel);
    }
}

function changeColor(e) {
    if (!mouseDown) {
        return;
    }
    else if (mode == 'monochrome') {
        e.target.style.backgroundColor = 'rgb(93, 93, 93)';
    }
    else if (mode == 'rainbow') {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
}





modes.forEach((option) => {
    option.addEventListener('click', () => {
        mode = `${option.id}`;
    });
});

clearButton.addEventListener('click', () => {
    clearScreen();
    populateScreen(gridSize);
})

sizeOptions.forEach((size) => {
    size.addEventListener('click', () => {
        gridSize = size.id;
        populateScreen(gridSize);
    })
});

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





window.onload = () => {
    populateScreen(gridSize);
}