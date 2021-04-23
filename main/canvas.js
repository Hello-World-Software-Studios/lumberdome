

var canvas = document.querySelector('canvas');

var img = new Image();
img.src = 'data/bgs/bark0.jpg';

var music = new Audio();
music.src = 'data/sounds/slowforest.mp3';


canvas.width = window.innerWidth*0.8;
canvas.height = window.innerHeight*0.8;
const HALFW = canvas.width/2;
const HALFH = canvas.height/2;

var c = canvas.getContext('2d');

//starts or stops music
function musicFunc(){
    if (isPlaying(music) == true){
        music.pause();
    }
    else music.play();
}

// Event Listeners
addEventListener('mouseover', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

//produce a rectangle that follows mouse and displays information
function ToolTip(x, y, long, tall){
    this.x = x;
    this.y = y;
    this.long = long;
    this.tall = tall;
    c.fillStyle('white');
    c.fillRect(x, y, long, tall);
    c.font = '14px Arial';
    c.fillText('Oops, something went horribly wrong.', x, y);
    
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.onmouseover(canvas) = ToolTip(clientX, clientY, 50, 100);
}

//simple face with 3 rectangles
function face(){
    c.fillRect(HALFW-50, HALFH-100, 50, 60);
    c.fillRect(HALFW+50, HALFH-100, 50, 60);
    c.beginPath();
    c.moveTo(HALFW-50,HALFH-10);
    c.lineTo(HALFW+100, HALFH+10);
    c.strokeStyle = 'black';
    c.lineWidth = 10;
    c.stroke();
}

//display face and error message
function oops(){
    face();
    c.font = '30px Arial';
    c.fillText('Oops, something went horribly wrong.', HALFW-250, HALFH+50);
}
oops();
onmousedown(canvas) = musicFunc();