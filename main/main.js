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

const fiveMinutes = 300000;
var countDownDate = (Date.now() + fiveMinutes);
var rescued = false;
var expTwo;
var expiredMsg = 'Game Over';

var player = new Player(18000, 0, 0, 100);
var initialHealth = player.hunger;
var hungerRate = 2; //Best used between (0, ?]
var hungerBar = new HealthBar(player.hunger, hungerRate);

var toolTipText = ' ';

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
window.addEventListener('click', addToInventory);

function addToInventory() {
    if (toolTipText == 'Gather Firewood') {
        player.addSticks(5);
        player.starve(1000);
    }
    if (toolTipText == 'Chop Trees') {
        player.addLogs(5);
        player.starve(2000);    
    }
    if (toolTipText = 'Hunting and Fishing') {
        player.addHealth(1000);
    }
    else {console.log('nothing to report')}
}

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
            rescued = true;
        }
    }, 1000);
    
    if (player.hunger > 0 && rescued == false) {
        animateA();
    }
    else {
        animateB();
    }  
}

main();
////////////////////////////////
//Animation Loop
function animateA() {
    player.hunger = hungerBar.tick(player.hunger, hungerBar.rate);
    //tickHelper();
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(bg, 0, 0, canvas.width*0.8, canvas.height*0.8);
    UI(player.hunger, expTwo);
    interactionFunction();
    tTHelp();
    toolTip(mouse.x-100, mouse.y+20, 250, 50, toolTipText);
    requestAnimationFrame(animateA);

}
function animateB() {
    gameOverScreen();
    toolTip(mouse.x-100, mouse.y+20, 150, 50);
    requestAnimationFrame(animateB);
}
function gameOverScreen() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(bg, 0, 0, canvas.width*0.8, canvas.height*0.8);
    textMsg('Game Over!', '100 px Arial', 'darkred', HALFW, HALFH);
}

/////////////////////////////////////////////
//helpers
function tickHelper() {
    var end = 0;
    if (player.hunger > end)
    player.tick(hungerRate);
}
//converts health to int [0,100]
function oneCent(x) {
    return Math.round((x/initialHealth)*100);
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

function UI(health, time) {
    rescueBar(time);
    healthBar(health); 
    quadrantLines();
    inventoryBar();

}
//health bar object
function healthBar(healthRemaining) {
    //inside
    c.fillStyle = 'palegreen';
    c.fillRect(0, CH*0.8, CW*0.4, CH*0.2);
    c.fillStyle = 'lightcoral'
    c.fillRect(0, CH*0.8, (CW*0.4)*(healthRemaining/initialHealth), CH);
    textMsg('Health Remaining:', '24px Arial', 'black', CW*0.01, CH*0.9);
    textMsg(oneCent(player.hunger) + '/100', '30px Arial', 'black', CW*0.2, CH*0.9);

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
//Rescue bar
function rescueBar(time){
    c.fillStyle = 'grey';
    c.fillRect(CW*0.4, CH*0.8, CW*0.4, CH*0.2);
    textMsg('Time until rescue: ' + time, '24px Arial', 'black', CW*0.41, CH*0.9);
}
//crafting panel
function inventoryBar(){
    c.fillStyle = 'lightsteelblue';
    c.fillRect(CW*0.8, 0, CW*0.2, CH);
    inventoryButtons('Craft Campfire', 'Craft Shelter');
    textMsg('Crafting Pane', '24px Arial', 'black', CW*0.82, CH*0.12);
    textMsg('Sticks: ' + player.sticks, '24px Arial', 'black', CW*0.85, CH*0.3);
    textMsg('Logs: ' + player.logs, '24px Arial', 'black', CW*0.85, CH*0.6);
}
function inventoryButtons(textA, textB) {
    c.fillStyle = 'darkred';
    c.fillRect(CW*0.82, CH*0.35, CW*0.15, CH*0.08);
    c.fillRect(CW*0.82, CH*0.65, CW*0.15, CH*0.08);
    textMsg(textA, '24px Arial', 'white', CW*0.83, CH*0.4);
    textMsg(textB, '24px Arial', 'white', CW*0.83, CH*0.7);
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
    c.moveTo(0, CH*0.4);
    c.lineTo(CW*0.8, CH*0.4);
    c.strokeStyle = 'black';
    c.stroke();
}
//text message template
function textMsg(text, fontMsg, textColor, textX, textY){
    c.font = fontMsg;
    c.fillStyle = textColor;
    c.fillText(text, textX, textY);
}
//produce a rectangle that follows mouse and displays information
function toolTip(x, y, long, tall, text){
    c.fillStyle = 'white';
    c.fillRect(x, y, long, tall);
    c.font = '20px Arial';
    c.fillStyle = 'black';
    c.fillText(text, x+5, y+25);
}
//Tooltip Helper
function tTHelp(){
    if ((mouse.x > CW*0.4 && mouse.x < CW*0.8) && mouse.y < CH*0.4) {
        toolTipText = 'Gather Firewood';
    }
    else if (mouse.x < CW*0.4 && mouse.y < CH*0.4) {
        toolTipText = 'Rest at Camp';
    }
    else if (mouse.x < CW*0.4 && (mouse.y > CH*0.4 && mouse.y < CH*0.8)){
        toolTipText = 'Hunting and Fishing';
    }
    else if ((mouse.x > CW*0.4 && mouse.x < CW*0.8) && (mouse.y > CH*0.4 && mouse.y < CH*0.8)) {
        toolTipText = 'Chop Trees';
    }
    else if ((mouse.x > CW*0.82 && mouse.x < CW*0.97) && (mouse.y > CH*0.35 && mouse.y < CH*0.43)) {
        toolTipText = 'Campfire -5 Sticks';
    }
    else {
        toolTipText = 'Welcome To Lumberdome!';
    }
} 
//adds or removes player resources
function interactionFunction(){
    var alpha = 0.3;
    c.fillStyle = 'rgba(0, 12, 15, ' + alpha + ')';
    if ((mouse.x > CW*0.4 && mouse.x < CW*0.8) && mouse.y < CH*0.4) {
        c.fillRect(CW*0.4, 0, CW*0.4, CH*0.4);
    }
    else if (mouse.x < CW*0.4 && mouse.y < CH*0.4) {
        c.fillRect(0, 0, CW*0.4, CH*0.4);
    }
    else if (mouse.x < CW*0.4 && (mouse.y > CH*0.4 && mouse.y < CH*0.8)){
        c.fillRect(0, CH*0.4, CW*0.4, CH*0.4);
    }
    else if ((mouse.x > CW*0.4 && mouse.x < CW*0.8) && (mouse.y > CH*0.4 && mouse.y < CH*0.8)) {
        c.fillRect(CW*0.4, CH*0.4, CW*0.4, CH*0.4);
    }
} 
function buildFire() {
    return;
}
