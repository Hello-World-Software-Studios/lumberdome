//////////////////////////////////////////////////////////////////////////////////////
//Variables and Data Definitions
var canvas = document.querySelector('canvas');

var img = new Image();
img.src = 'data/bgs/D2CVQg.jpg';

// const MUSICBTN = document.querySelector('startButton');
// let music = document.querySelector('#music');
// addEventListener('click', (event)=> {
//     music.play();
// });

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

canvas.width = 800;
canvas.height = 600;
const HALFW = canvas.width/2;
const HALFH = canvas.height/2;

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
    c.fillText(tpHelper(), x+5, y+25);
    
}
//tooltip helper
function tpHelper(){
    if (mouse.x > window.innerWidth/2) {
        return 'East';
    }
    else {
        return 'West';
    }
}


// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(img, 0, 0,);
    ToolTip(mouse.x-100, mouse.y+20, 150, 50);
    console.log(mouse.x);
}


animate();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Game Script
function main(){
    //environmental conditions
    var rain = false;
    var shelter = false;
    var campfire = false;
    
    if (rain == true && campfire == true && shelter == false){
        campfire = false;
    }
    //init player
    var player = new Player();

    animate();

}

//starts or stops music
function musicFunc(){
    if (isPlaying(music) == true){
        music.pause();
    }
    else music.play();
}

function start(){
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
var Player = {

    //point of control for countdown init
    hunger: 40.00,
    
    //player resources
    sticks: 0,
    logs: 0,
    axe: 100,
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//Map Script
function WorldMap(){
    this.x = x; //map X value
    this.y = y; //map Y value
    this.imageSource = imageSource; //string
}
//each map square will contain a biome name, an amount of resources, maybe random event?
function MapSquare(){
    this.biome = biome; //String
    this.stickRange = stickRange; //integer [0, i]
    this.logRange = logRange; //integer [0, j]
    this.riskReward = this.riskReward; //String
    
}

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
