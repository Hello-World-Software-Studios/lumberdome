import { Player } from './player.js';
//import { HealthBar } from './health_bar.js';
//////////////////////////////////////////////////////
//Variables and Data Definitions
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

const bg = new Image();
bg.src = 'data/bgs/forest.jpg';
const cf = new Image();
cf.src = 'data/sprites/cf.png';
const CF_ICON = new Image();
CF_ICON.src = 'data/sprites/cf_icon.png';
const RAIN_ICON = new Image();
RAIN_ICON.src = 'data/sprites/rain_icon.png';
const SUN_ICON = new Image();
SUN_ICON.src = 'data/sprites/sun_icon.png';
const TENT_ICON = new Image();
TENT_ICON.src = 'data/sprites/tent_icon.png';

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
//var hungerRate = 2; //Best used between (0, ?]

var campfire = false;
var rain = false;
var shelter = false;

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
    switch (toolTipText) {
        case 'Gather Firewood': 
            player.addSticks(5);
            player.starve(2000);
            break;
        case 'Chop Trees':
            player.addLogs(5);
            player.starve(2000); 
            break;   
        case 'Hunting and Fishing':
            if (player.sticks <= 0) {
                break;
            }
            else {
                player.removeSticks(1)
                player.addHealth(500);
                break;
            }
        case 'Campfire -5 Sticks':
            if (player.sticks >= 5) {
                if (campfire == true) {
                    break;
                }
                else {
                    player.removeSticks(5);
                    campFireToTrue();
                    break;
                }
            }
        case 'Shelter -20 Logs':
            if (player.logs >= 20) {
                if (shelter == true) {
                    break;
                }
                else {
                    player.removeLogs(20);
                    shelterToTrue();
                    break;
                }
            }
        default: 
            console.log('switch statement working!');
    }
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
        if (distance < 0) {
            clearInterval(countDown);
            rescued = true;
        }
    }, 1000);
    animateA(); 
}

main();
////////////////////////////////
//Animation Loop
function animateA() {
    //rainFunction();
    var hungerRate = hungerRateFunction();
    tickHelper(hungerRate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(bg, 0, 0, canvas.width*0.8, canvas.height*0.8);
    UI(player.hunger, expTwo);
    campfireAnim();
    renderIcons();
    greySquareFunction();
    tTHelp();
    toolTip(mouse.x-100, mouse.y+20, 250, 50, toolTipText);
    
    if (player.hunger > 0 && rescued == false) {
        requestAnimationFrame(animateA);
    }
    else {
        requestAnimationFrame(animateB);
    }

}
function animateB() {
    gameOverScreen();
    toolTip(mouse.x-100, mouse.y+20, 150, 50);
    requestAnimationFrame(animateB);
}
function gameOverScreen() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillRect(0, 0, CW, CH);
    textMsg('Game Over!', '100px Arial', 'darkred', CW*0.25, HALFH);
}

/////////////////////////////////////////////
//helpers
function tickHelper(rate) {
    var end = 0;
    if (player.hunger > end)
    player.tick(rate);
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
    c.fillStyle = 'lightcoral';
    c.fillRect(0, CH*0.8, CW*0.4, CH*0.2);
    c.fillStyle = 'palegreen';
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
    else if ((mouse.x > CW*0.82 && mouse.x < CW*0.95) && (mouse.y > CH*0.35 && mouse.y < CH*0.43)) {
        toolTipText = 'Campfire -5 Sticks';
    }
    else if ((mouse.x > CW*0.82 && mouse.x < CW*0.95) && (mouse.y > CH*0.65 && mouse.y < CH*0.73)) {
        toolTipText = 'Shelter -20 Logs';
    }
    else {
        toolTipText = 'Welcome To Lumberdome!';
    }
} 
//highlights the quadrant player is hovering over
function greySquareFunction(){
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

function campFireToTrue() {
    campfire = true;
}
function shelterToTrue() {
    shelter = true;
}

function campfireAnim() {
    if (campfire == true) {
        c.drawImage(cf, 0, 0, 32, 32, CW*0.15, CH*0.2, CW*0.1, CH*0.2);
    }
}


function renderIcons(campfire, shelter, rain) {
    renderWeather(CW*0.81, CH*0.89);
    renderFire(CW*0.87, CH*0.89);
    renderTent(CW*0.93, CH*0.89);
}
function renderFire(x, y) {
    if (campfire == true) {
        c.drawImage(CF_ICON, x, y, CH*0.06, CH*0.06);
    }
}
function renderWeather(x, y) {
    if (rain == true) {
        c.drawImage(RAIN_ICON, x, y, CH*0.06, CH*0.06);
    }
    else {
        c.drawImage(SUN_ICON, x, y, CH*0.06, CH*0.06);
    }
}
function renderTent(x, y) {
    if (shelter == true) {
        c.drawImage(TENT_ICON, x, y, CH*0.06, CH*0.06);
    }
}
function hungerRateFunction() {
    if (rain == false && campfire == false && shelter == false) {
        return 2;
    }
    if (rain == false && campfire == false && shelter == true) {
        return 1.5;
    }
    if (rain == false && campfire == true && shelter == true) {
        return 1;
    }
    if (rain == true && campfire == true && shelter == true) {
        return 2;
    }
    if (rain == true && campfire == false && shelter == false) {
        return 4;
    }
    if (rain == true && campfire == false && shelter == true) {
        return 2;
    }
    if (rain == true && campfire == true && shelter == false) {
        return 3;
    }
    else {return 2;}
}
// function rainFunction() {
//     if (player.hunger%2000 == 0 && rain == false) {
//         rain = true;
//     }
// }