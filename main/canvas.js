import { Player } from './player.js';
import { HealthBar } from './health_bar.js';
//////////////////////////////////////////////////////
//Variables and Data Definitions
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

const bg = new Image();
bg.src = 'data/bgs/forest.jpg';
const cf = new Image();
cf.src = 'data/sprites/cf1000780.jpg';

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

/////////////////////////////////////////////////////////////////////////
// Set the date we're counting down to
var fiveMinutes = 300000;
var countDownDate = (Date.now() + fiveMinutes)
//var countDownDate = new Date("Jan 5, 2022 15:37:25").getTime();
var expired = false;
var expTwo;
var expiredMsg = 'Game Over'

////////////////////////////////////////////////////////////////

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
var player = new Player(18000, 0, 0, 100);
var initialHealth = player.hunger;
var hungerBar = new HealthBar(player.hunger, 1);

const STRTBTN = document.querySelector('startButton');
let music = document.querySelector('#music');
addEventListener('click', (event)=> {
    //main();
    //music.play();
})
main();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Game Script
function main(){
    
    // Update the count down every 1 second
var x = setInterval(function() {
    // Get today's date and time
    var now = new Date().getTime();
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    // Time calculations for days, hours, minutes and seconds
    //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    if (digitCount(seconds) > 1) {
        expTwo = minutes + ":" + seconds;
    }
    else {
        expTwo = minutes + ":0" + seconds;
    }
    //console.log(expTwo);
  
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      expired = true;
    }
  }, 1000);

    if (player.hunger > 0 && expired == false) {
        animateA();
    }
    else {
        animateB();
    }
    //TODO
    // make an area that, when clicked, can add to player.sticks
    //TODO
    //make this a helper
    //if (rain == true && campfire == true && shelter == false){
    //    campfire = false;
    //}  
}

//////////////////////////////////////////////////////////////////////////////////////
//Canvas
// Animation Loop
function animateA() {
    //if (player.hunger > 0 && expired == false) {
        player.hunger = hungerBar.tick(player.hunger);
        //console.log(player.hunger);
        healthBar(player.hunger);
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.drawImage(bg, 0, 0, canvas.width*0.8, canvas.height*0.8);
        //c.drawImage(cf, 0, 200, SPRITE_W, SPRITE_H, HALFW, HALFH, SPRITE_W, SPRITE_H);
        //UI();
        toolTip(mouse.x-100, mouse.y+20, 150, 50);
        //textMsg(expTwo, '30px Arial', 'black', CW*0.6, CH*0.9);
        //textMsg(oneCent(player.hunger) + '/100', '30px Arial', 'black', CW*0.6, CH*0.9);
        //textMsg(player.sticks, '30px Arial', 'black', CW*0.95, CH*0.3);
        requestAnimationFrame(animateA());
        
    //}
    //else {
    //     //console.log(expiredMsg);
    //     gameOverScreen();
    //     toolTip(mouse.x-100, mouse.y+20, 150, 50);
    //     requestAnimationFrame(animate());
    // }
    
}
function animateB() {
    gameOverScreen();
    toolTip(mouse.x-100, mouse.y+20, 150, 50);
    requestAnimationFrame(animateB());
}

//health bar object
function healthBar(healthRemaining) {

    //outline
    //TODO make strokeRect instead!
    c.beginPath();
    c.moveTo(5, CH*0.8);
    c.lineTo(5, CH);
    c.lineTo(CW*0.4, CH);
    c.lineTo(CW*0.4, CH*0.8);
    c.lineTo(0, CH*0.8);
    c.strokeStyle = 'black';
    c.lineWidth = 10;
    c.stroke();

    //inside
    c.fillStyle = 'red'
    c.fillRect(0, CH*0.8, (CW*0.4)*(healthRemaining/initialHealth), CH);
}

//converts health to int [0,100]
function oneCent(x) {
    parseInt((x/initialHealth)*100);
    return x;
}

//produce a rectangle that follows mouse and displays information
function toolTip(x, y, long, tall){
    c.fillStyle = 'lightblue';
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
    starvationBar('palegreen', 'Time until starvation: ');
    quadrantLines();
    inventoryBar();

}
//TODO Get this working 
//UI Window object
// function UIBar(color, textA, tx, ty, fXa, fYa, fXb, fYb){
//     this.color = color;
//     this.textA = textA;
//     c.fillStyle = this.color;
//     c.fillRect(this.fXa, this.fYa, this.fXb, this.fYb);
//     TextMsg(this.textA, '24px Arial', 'black', this.tx, this.ty);
//     console.log(this.text);
// }
//starvation Bar
function starvationBar(color, text){
    c.fillStyle = color;
    c.fillRect(0, CH*0.8, CW*0.4, CH*0.2);
    textMsg(text, '24px Arial', 'black', CW*0.01, CH*0.9);
}
//Rescue bar
function rescueBar(){
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



function gameOverScreen() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(bg, 0, 0, canvas.width*0.8, canvas.height*0.8);
    textMsg('Game Over!', '100 px Arial', 'darkred', HALFW, HALFH);
}

function digitCount(n) {
    var count = 0;
    if (n >= 1) ++count;
  
    while (n / 10 >= 1) {
      n /= 10;
      ++count;
    }
  
    return count;
  }

///////////////////////////////////////
//abstractions

//text message template
function textMsg(text, fontMsg, textColor, textX, textY){
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
