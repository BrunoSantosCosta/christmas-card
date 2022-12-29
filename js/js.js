// Variables
var timer = 300;
var sky = document.querySelector('.sky');
var canvas = document.createElement('canvas');
var snow = canvas.getContext('2d');
var width = sky.clientWidth;
var height = sky.clientHeight;
var i = 0;
var active = false;

// Function onResize
function onResize() {
    width = sky.clientWidth;
    height - sky.clientHeight;
    canvas.width = width;
    canvas.height = height;
    snow.fillStyle = '#FFF';

    var wasActive = active;
    active = width > 420;

    if(!wasActive && active)
    anmationFrame(update);

}

// Function var Flake
var Flake = function () {
    this.x = 0;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
    this.r = 0;

    this.reset();
}

// Flake reset function
Flake.prototype.reset = function () {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vy = 1 + Math.random() *3;
    this.vx = 0.5 - Math.random();
    this.r = 1 + Math.random() * 2;
    this.o = 0.5 + Math.random() * 0.5;
}

canvas.style.position = 'absolute';
canvas.style.left = canvas.style.top = '0';

var flakes = [], flake;
for (i =0; i < timer; i++) {
    flake = new Flake();
    flake.reset();
    flakes.push(flake);
}

// Function update
function update() {
    snow.clearRect(0, 0, width, height);

    if(!active)
    return;

    for (i =0; i < timer; i++) {
        flake = flakes[i];
        flake.y += flake.vy;
        flake.x += flake.vx;

        snow.globalAlpha = flake.o;
        snow.beginPath();
        snow.arc(flake.x, flake.y, flake.r, 0, Math.PI *2, false);
        snow.closePath();
        snow.fill();

        if (flake.y > height) {
            flake.reset();
        }
    }
    anmationFrame(update)
}


// Function anmationFrame
window.anmationFrame = (function () {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           function ( callback ) {
            window.setTimeout(callback, 1000 / 60);
           }
})();

onResize();

window.addEventListener('resize', onResize, false);
sky.appendChild(canvas);
