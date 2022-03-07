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
const sizes = document.querySelectorAll('a');
let gridSize = 16;

function fillScreen (gridSize) {
    for (let i = 0; i < gridSize**2; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        screen.appendChild(square);
    }
    
}

sizes.forEach( (size) => {
    size.addEventListener('click', () => {
        gridSize = size.id;
        fillScreen(gridSize);
    })
});

window.onload = () => {
    fillScreen(gridSize);
}