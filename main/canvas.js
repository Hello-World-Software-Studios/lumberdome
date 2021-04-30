//import Player from './player.js';

//Variables and Data Definitions
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

const bg = new Image();
bg.src = 'data/bgs/forest.jpg';
const cf = new Image();
cf.src = 'data/sprites/cf1000780.jpg';

const MUSICBTN = document.querySelector('startButton');
let music = document.querySelector('#music');
addEventListener('click', (event)=> {
    music.play();
})

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const CW = canvas.width;
const CH = canvas.height;
const HALFW = canvas.width/2;
const HALFH = canvas.height/2;
const PXOFFSET = 10;

const SPRITE_W = 180;
const SPRITE_H = 300;

//environmental conditions
var rain = false;
var shelter = false;
var campfire = false;



// Mouse Event Listeners
var mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener('mousemove', 
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    }
)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Game Script
function main(){

    var player = new Player(40.00, 0, 0, 100);
    var hungerClock = new StartClock(player.hunger, intervalRate());
    var rescueClock = new StartClock(80.00, 50); 
    //TODO
    // make an area that, when clicked, can add to player.sticks
    //TODO
    //make this a helper
    //if (rain == true && campfire == true && shelter == false){
    //    campfire = false;
    //}
    animate(hungerClock, rescueClock, player);
    console.log(hungerClock);
    console.log(rescueClock);
    
}
/////////////////////////////////////////////////////////////
//Player Script

function Player(hunger, sticks, logs, axe) {
    //point of control for countdown init
    this.hunger = hunger;
    //player resources
    this.sticks = sticks; //positive integer or 0
    this.logs = logs; //positive integer or 0
    this.axe = axe //number from 0 to 100

}

//////////////////////////////////////////////////////////////////////////////////////
//Canvas
// Animation Loop
function animate(hunger, rescue, player) {
    const terminationArg = 0;
    if (hunger == terminationArg) {
        gameOverScreen();
    }
    else if (rescue == terminationArg){
        textMsg('Success!', '30px Arial', 'black', HALFW, HALFH);
    }
    else {
        requestAnimationFrame(animate(hunger, rescue, player));
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.drawImage(bg, 0, 0, canvas.width*0.8, canvas.height*0.8);
        //c.drawImage(cf, 0, 200, SPRITE_W, SPRITE_H, HALFW, HALFH, SPRITE_W, SPRITE_H);
        UI();
        ToolTip(mouse.x-100, mouse.y+20, 150, 50);
        textMsg(hunger.toString(), '30px Arial', 'black', CW*0.2, CH*0.9);
        textMsg(rescue.toString() + ' days', '30px Arial', 'black', CW*0.6, CH*0.9);
        textMsg(player.sticks, '30px Arial', 'black', CW*0.95, CH*0.3);
        console.log(player.sticks);
    }
}

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
    c.fillText('X' + mouse.x + ',    Y' + mouse.y + tpHelper(), x+5, y+25);
    
}
//tooltip filltext helper
function tpHelper(){
    if (mouse.x > CW*0.4) {
        return 'East';
    }
    else {
        return 'West';
    }
}

function UI() {
    // var rescueBar = new UIBar('grey', 'Days until rescue: ', 
    //                             CW*0.41, CH*0.9, 
    //                             CW*0.4, CH*0.8, CW*0.4, CH*0.2);
    // var starvationBar = new UIBar('palegreen', 'Time until starvation: ',
    //                                 CW*0.01, CH*0.9,
    //                                 0, CH*0.8, CW*0.4, CH*0.2);
    rescueBar();
    StarvationBar('palegreen', 'Time until starvation: ');
    quadrantLines();
    inventoryBar();

}
//TODO Get this working 
//UI Window object
function UIBar(color, textA, tx, ty, fXa, fYa, fXb, fYb){
    this.color = color;
    this.textA = textA;
    c.fillStyle = color;
    c.fillRect(fXa, fYa, fXb, fYb);
    textMsg(textA, '24px Arial', 'black', tx, ty);
    console.log(text);
}
//starvation Bar
function StarvationBar(color, text){
    this.color = color;
    this.text = text;
    c.fillStyle = color;
    c.fillRect(0, CH*0.8, CW*0.4, CH*0.2);
    textMsg(text, '24px Arial', 'black', CW*0.01, CH*0.9);
}
//Rescue bar
function rescueBar(color, text){
    c.fillStyle = 'grey';
    c.fillRect(CW*0.4, CH*0.8, CW*0.4, CH*0.2);
    textMsg('Days until rescue:', '24px Arial', 'black', CW*0.41, CH*0.9);
}
//crafting panel
function inventoryBar(){
    c.fillStyle = 'lightsteelblue';
    c.fillRect(CW*0.8, 0, CW, CH);
    textMsg('Crafting Pane', '24px Arial', 'black', CW*0.85, CH*0.2);
    textMsg('Sticks: ', '24px Arial', 'black', CW*0.85, CH*0.3)
}
//create a grid on top of map
function quadrantLines(){
    c.beginPath();
    c.moveTo(CW*0.4, 0);
    c.lineTo(CW*0.4, CH*0.8);
    c.strokeStyle = 'black';
    c.stroke();

    c.beginPath();
    c.moveTo(0, CW*0.2);
    c.lineTo(CW*0.8, CW*0.2);
    c.strokeStyle = 'black';
    c.stroke();
}

//starts or stops music
function musicFunc(){
    if (isPlaying(music) == true){
        music.pause();
    }
    else music.play();
}

//TODO
//get a working clock that counts down at varying speeds

//Create a clock counting down from set value
function StartClock(startTime, interval){
    this.startTime = startTime; //positive number
    this.interval = interval; //object must evaluate to number
    var endTime = 0.00;
    setInterval(function() {
        var now = startTime;
        if (now > endTime){
            return now - 0.01;
        }
        else { 
            return 'Game Over';
        }
    
    }, interval); 

}
//helper for StartClock
function intervalRate(){
    var interval = 50;

    // if (rain == true){
    //     interval + 25;
    // }
    // else if (campfire == true){
    //     interval - 10;
    // }
    // else if (shelter == true){
    //     interval - 15;
    // }
    return interval;
}
function gameOverScreen() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(bg, 0, 0, canvas.width*0.8, canvas.height*0.8);
    textMsg('Game Over!', '72 px Arial', 'darkred', HALFW, HALFH);
}

// //display countdown clock
// function CDRect(x, y, long, tall){
//     this.x = x;
//     this.y = y;
//     this.long = long;
//     this.tall = tall;
//     //
//     this.time = clock;
//     c.fillStyle = 'yellow';
//     c.fillRect(x, y, long, tall);
//     c.font = '14px Arial';
//     c.fillStyle = 'black';
//     c.fillText(this.time, x+5, y+25);
    
// }



//animate();
main();

///////////////////////////////////////
//abstractions

//text message. takes in font size, 
function textMsg(text, fontMsg, textColor, textX, textY){
    this.text = text; //string or something that returns a string
    this.fontMsg = fontMsg; //follow rules for canvas.font ex. '30px Arial'
    this.textX = textX;
    this.textY = textY;
    this.textColor = textColor; //fillstyle parameter
    c.font = fontMsg;
    c.fillStyle = textColor;
    c.fillText(text, textX, textY);
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
