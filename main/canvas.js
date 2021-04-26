//////////////////////////////////////////////////////////////////////////////////////
//Variables and Data Definitions
var canvas = document.querySelector('canvas');

var img = new Image();
img.src = 'data/bgs/D2CVQg.jpg';

const MUSICBTN = document.querySelector('startButton');
let music = document.querySelector('#music');
addEventListener('click', (event)=> {
    music.play();
});

// Mouse Event Listeners
var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', 
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
        //console.log(event);
    }
)

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const CW = canvas.width;
const CH = canvas.height;
const HALFW = canvas.width/2;
const HALFH = canvas.height/2;
const PXOFFSET = 10;
var c = canvas.getContext('2d');

//////////////////////////////////////////////////////////////////////////////////////
//Canvas

//produce a rectangle that follows mouse and displays information
function ToolTip(x, y, long, tall){
    this.x = x;
    this.y = y;
    this.long = long;
    this.tall = tall;
    c.fillStyle = 'white';
    c.fillRect(x, y, long, tall);
    c.font = '14px Arial';
    c.fillStyle = 'black';
    c.fillText('X' + mouse.x + ',    Y' + mouse.y, x+5, y+25);
    
}
//tooltip filltext helper
function tpHelper(){
    if (mouse.x > canvas.width*0.4) {
        return 'East';
    }
    else {
        return 'West';
    }
}

//display countdown clock
function CDRect(){
    this.x = x;
    this.y = y;
    this.long = long;
    this.tall = tall;
    this.time = startClock(now);
    c.fillStyle = 'white';
    c.fillRect(x, y, long, tall);
    c.font = '14px Arial';
    c.fillStyle = 'black';
    c.fillText(time, x+5, y+25);
}
//temporary
function tempHelp(){
    c.beginPath();
    c.moveTo(HALFW, 0);
    c.lineTo(HALFW, canvas.height);
    c.strokeStyle = 'black';
    c.stroke();

    c.beginPath();
    c.moveTo(0, HALFH);
    c.lineTo(canvas.width, HALFH);
    c.strokeStyle = 'black';
    c.stroke();
    

}
//Countdown Bar
function countDownBar(){
    c.fillStyle = 'white';
    c.fillRect(0, CH*0.8, CW*0.2, CH*0.2);
    c.font = '14px Arial';
    c.fillStyle = 'black';
    c.fillText('Time until starvation', CW*0.01, CH*0.9);
}
// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(img, 0, 0, canvas.width*0.8, canvas.height*0.8);
    countDownBar();
    tempHelp();
    ToolTip(mouse.x-100, mouse.y+20, 150, 50);
    console.log('nothing');
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Game Script
function main(){
    //environmental conditions
    var rain = false;
    var shelter = false;
    var campfire = false;
    
    //TODO
    //make this a helper
    //if (rain == true && campfire == true && shelter == false){
    //    campfire = false;
    //}

    //init player
    var player = new Player(40.00, 0, 0, 100);
    //init clock
    startClock();
    
}


//starts or stops music
function musicFunc(){
    if (isPlaying(music) == true){
        music.pause();
    }
    else music.play();
}

//Create a clock counting down from predefined player hunger property
function startClock(){
    var endTime = 0.00;
    var clock = new setInterval(function() {
        var now = player.hunger;
        if (now > 0.00){
            now-0.01;
        }  
    
    }, intervalRate()); 
}

function intervalRate(){
    var interval = 50;


    if (rain == true){
        interval + 25;
    }
    else if (campfire == true){
        interval - 10;
    }
    else if (shelter == true){
        interval - 15;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//Player Script
function Player(hunger, sticks, logs, axe) {
    //point of control for countdown init
    this.hunger = hunger;
    //player resources
    this.sticks = sticks; //positive integer or 0
    this.logs = logs; //positive integer or 0
    this.axe = axe //number from 0 to 100

}

animate();
main();






///////////////////////////////////////////////
//error function

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
