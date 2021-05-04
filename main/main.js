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

var fiveMinutes = 300000;
var countDownDate = (Date.now() + fiveMinutes)
var expired = false;
var expTwo;
var expiredMsg = 'Game Over'

var player = new Player(18000, 0, 0, 100);
var initialHealth = player.hunger;
var hungerBar = new HealthBar(player.hunger, 1);

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

function main(){
    
    var countDown = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
        if (digitCount(seconds) > 1) {
            expTwo = minutes + ":" + seconds;
        }
        else {
            expTwo = minutes + ":0" + seconds;
        }
        //console.log(expTwo);
        if (distance < 0) {
            clearInterval(countDown);
            expired = true;
        }
    }, 1000);

    if (player.hunger > 0 && expired == false) {
        animateA();
    }
    else {
        animateB();
    }  
}

main();

function animateA() {
    player.hunger = hungerBar.tick(player.hunger);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(bg, 0, 0, canvas.width*0.8, canvas.height*0.8);
    UI();
    healthBar(player.hunger);
    textMsg(oneCent(player.hunger) + '/100', '30px Arial', 'black', CW*0.2, CH*0.9);
    textMsg(expTwo, '30px Arial', 'black', CW*0.6, CH*0.9);
    toolTip(mouse.x-100, mouse.y+20, 150, 50);
    requestAnimationFrame(animateA);

}
function animateB() {
    gameOverScreen();
    toolTip(mouse.x-100, mouse.y+20, 150, 50);
    requestAnimationFrame(animateB);
}

/////////////////////////////////////////////
//helpers
//converts health to int [0,100]
function oneCent(x) {
    parseInt((x/initialHealth)*100);
    return x;
}
//adds 0 to seconds when below 10
function digitCount(n) {
    var count = 0;
    if (n >= 1) ++count;
  
    while (n / 10 >= 1) {
      n /= 10;
      ++count;
    }
  
    return count;
}
//health bar object
function healthBar(healthRemaining) {
    //inside
    c.fillStyle = 'lightcoral'
    c.fillRect(0, CH*0.8, (CW*0.4)*(healthRemaining/initialHealth), CH);
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
    textMsg('Time until rescue:', '24px Arial', 'black', CW*0.41, CH*0.9);
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
    c.lineWidth = 2;
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

//produce a rectangle that follows mouse and displays information
function toolTip(x, y, long, tall){
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

//text message template
function textMsg(text, fontMsg, textColor, textX, textY){
    c.font = fontMsg;
    c.fillStyle = textColor;
    c.fillText(text, textX, textY);
}