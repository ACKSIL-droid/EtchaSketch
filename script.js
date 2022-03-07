const wheel1 = document.querySelector('#wheel1');
const wheel2 = document.querySelector('#wheel2');

const wheel1Bounds = wheel1.getBoundingClientRect();
const wheel2Bounds = wheel2.getBoundingClientRect();

const wheel1Center = {
    x: wheel1Bounds.left + wheel1Bounds.width/2,
    y: wheel1Bounds.top + wheel1Bounds.height/2
};

const wheel2Center = {
    x: wheel2Bounds.left + wheel2Bounds.width/2,
    y: wheel2Bounds.top + wheel2Bounds.height/2
};

document.addEventListener('mousemove', e => {
    let angle1 = Math.atan2(e.pageX - wheel1Center.x, - (e.pageY - wheel1Center.y)) * (180 / Math.PI);
    let angle2 = Math.atan2(e.pageX - wheel2Center.x, - (e.pageY - wheel2Center.y)) * (180 / Math.PI);
    wheel1.style.transform = `rotate(${angle1}deg)`;
    wheel2.style.transform = `rotate(${angle2}deg)`;
});