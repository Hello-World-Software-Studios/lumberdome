import { Player } from './player.js';
import { GameState } from './game_state.js';
import { RainDrop } from './rain.js';

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const CW = canvas.width;
const CH = canvas.height;

function main(){
    var rainArray = [];
    makeItCloudy();
    var rescued = false;
    var timeRemaining;
    const fiveMinutes = 300000;
    const twoMinutes = 120000;
    var countDownDate = (Date.now() + twoMinutes);

    var animState0 = { 
        frameCounter: 0,
        frameX: 0,
        frameY: 0,
        time: Date.now(),
    };
    var environment = {
        rain: false,
        shelter: false,
        campfire: false,
        rainArray: rainArray,
    };
    var mouse = {
        x: undefined,
        y: undefined,
        toolTipText: 'String',
    };
    
    var initialHealth = 18000;
    var player0 = new Player(initialHealth, 0, 0, 0, 0);
    var gameState0 = new GameState(animState0, player0, environment, mouse);

    
    window.addEventListener('click',
    function(gameState0){
        addToInventory(gameState0);
    });

    var countDown = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
        if (digitCount(seconds) > 1) {
            timeRemaining = minutes + ":" + seconds;
        }
        else {
            timeRemaining = minutes + ":0" + seconds;
        }
        if (distance < 0) {
            clearInterval(countDown);
            rescued = true;
        }
    }, 1000);
    animateA(gameState0); 


    //FUNCTION DEFINITIONS
    ////////////////////////////////
    function makeItCloudy() {
                
        for (var i = 0; i < 500; i++) {
            rainArray[i] = new RainDrop((Math.random()*3), (Math.random()*CW), Math.random()*CH, Math.round(Math.random()*10+1));
        }
    }

    function addToInventory(gameState0) {
        let {hunger, sticks, logs} = player0;
        let {toolTipText} = mouse;
        let {rain, campfire, shelter} = environment;
        switch (mouse.toolTipText) {
            case 'Gather Firewood +5 Sticks': 
                player0.addSticks(5);
                player0.starve(1500);
                break;
            case 'Chop Trees +5 Logs':
                player0.addLogs(5);
                player0.starve(1500); 
                break;   
            case 'Hunt and Fish -1 Stick':
                if (player0.sticks <= 0) {
                    break;
                }
                else {
                    player0.removeSticks(1)
                    player0.addHealth(500);
                    break;
                }
            case 'Campfire -5 Sticks':
                if (player0.sticks >= 5) {
                    if (campfire == true) {
                        break;
                    }
                    else {
                        player0.removeSticks(5);
                        campFireToTrue(environment.campfire);
                        break;
                    }
                }
            case 'Shelter -20 Logs':
                if (player0.logs >= 20) {
                    if (shelter == true) {
                        break;
                    }
                    else {
                        player0.removeLogs(20);
                        shelterToTrue(environment.shelter);
                        break;
                    }
                }
            default: 
                break;
    }
    function campFireToTrue(campfire) {
        environment.campfire = true;
    }
    function shelterToTrue(shelter) {
        environment.shelter = true;
    }
    }

    //Animation Loop
    function animateA(gameState0) {
        const bg = new Image();
        bg.src = 'data/bgs/forest.jpg';
        const cf = new Image();
        cf.src = 'data/sprites/cf.png';
        const PLAYER = new Image();
        PLAYER.src = 'data/sprites/player.png';
        const SHELTER = new Image();
        SHELTER.src = 'data/sprites/shelter.png';
        const CF_ICON = new Image();
        CF_ICON.src = 'data/sprites/cf_icon.png';
        const RAIN_ICON = new Image();
        RAIN_ICON.src = 'data/sprites/rain_icon.png';
        const SUN_ICON = new Image();
        SUN_ICON.src = 'data/sprites/sun_icon.png';
        const TENT_ICON = new Image();
        TENT_ICON.src = 'data/sprites/tent_icon.png';
        const RAIN_DROP = new Image();
        RAIN_DROP.src = 'data/sprites/raindrop.png';
        
        let  {frameCounter, frameX, frameY, time} = animState0;
        let {hunger, sticks, logs} = player0;
        let {x, y, toolTipText} = mouse;
        let {rain, campfire, shelter, rainArray} = environment;
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        window.addEventListener('mousemove', 
        function(event){
            mouse.x = event.x;
            mouse.y = event.y;
        });
        var now = Date.now();
        var delta = now - animState0.time;
        animState0.time = now;

        //update
        mouse.toolTipText = tTHelp();
        const ANIM_SPEED = 5;
        var hungerRate = hungerRateFunction(environment);
        tickHelper(player0, hungerRate);
        environment.rain = isItRaining();

        //console.log(time, now, delta);

        if (delta > 17) {
            requestAnimationFrame(function() {
                animateA(gameState0);
            });
        }
        else {    
            if (player0.hunger > 0 && rescued == false) { 
                //Draw phase
                screenRefresh();
                UI(player0, timeRemaining, initialHealth);
                campfireAnim();
                drawTent();
                drawPlayer();
                if (environment.rain == true) {
                    makeItRain(environment.rainArray);
                }
                renderIcons(environment.rain, environment.campfire, environment.shelter);
                greySquareFunction(mouse.x, mouse.y);
                toolTip(mouse.x-100, mouse.y+20, 250, 50, mouse.toolTipText);
                //END Phase
                frameXTicker();
                animState0.frameCounter++;

                requestAnimationFrame(function() {
                    animateA(gameState0);
                });
            }
            else {
                requestAnimationFrame(animateB);
            }
        }
        // //Draw phase
        // screenRefresh();
        // UI(player0, timeRemaining, initialHealth);
        // campfireAnim();
        // drawTent();
        // drawPlayer();
        // if (environment.rain == true) {
        //     makeItRain(environment.rainArray);
        // }
        // renderIcons(environment.rain, environment.campfire, environment.shelter);
        // greySquareFunction(mouse.x, mouse.y);
        // toolTip(mouse.x-100, mouse.y+20, 250, 50, mouse.toolTipText);
        // //END Phase
        // frameXTicker();
        // animState0.frameCounter++;
        // if (player0.hunger > 0 && rescued == false) { 
        //     requestAnimationFrame(function() {
        //         animateA(gameState0);
        //     });
        // }
        // else {
        //     requestAnimationFrame(animateB);
        // }
        //advance y position and draw each drop  
        function makeItRain(rainArray) {
            rainArray.map((rainArray) => {
                if (rainArray.dropY >= CH) {
                    rainArray.dropY = 0;
                }
                else {rainArray.dropY += 1*rainArray.fallSpeed;}
            });
            for (var i = 0; i < rainArray.length; i++) {
                c.drawImage(RAIN_DROP, rainArray[i].dropX, rainArray[i].dropY);
            }
            // rainArray.forEach((rainArray) => {
            //     drawRainDrop();
            // });
            // }
        }
        // 50% chance to start or stop raining every interval
        function isItRaining() {
            var num = (Math.random()*100);
            var interval = 600;
            if (rain == false) {
                return animState0.frameCounter%interval == 0 && num <= 50;
            }
            if (rain == true) {
                return !(animState0.frameCounter%interval == 0 && num <= 50);
            }
            else {return false;}
        }

        function screenRefresh() {
            c.clearRect(0, 0, canvas.width, canvas.height);
            c.drawImage(bg, 0, 0, CW*0.8, CH*0.8);
        }
        function frameXTicker() {
            if (animState0.frameCounter % ANIM_SPEED == 0) {
                if (animState0.frameX < 3) {
                    animState0.frameX++;
                }
                else {
                    animState0.frameX = 0;
                }
            }
        }
        function drawPlayer() {
            var spriteX = 64;
            var spriteY = 64;
                c.drawImage(PLAYER, spriteX, 2*spriteY, spriteX, spriteY, CW*0.25, CH*0.06, spriteX, spriteY);
        }
        function drawTent() {
            if (shelter == true) {
                c.drawImage(SHELTER, CW*0.25, CH*0.05, 64, 64);
            }
        }
        function campfireAnim() {
            var spriteX = 32;
            var spriteY = 32;
            if (campfire == true) {
                c.drawImage(cf, frameX * spriteX, 0, spriteX, spriteY,
                    CW*0.25, CH*0.15, 48, 48);
                
            }
        }
        function renderIcons() {
            renderWeather(CW*0.81, CH*0.89);
            renderFire(CW*0.87, CH*0.89);
            renderTent(CW*0.93, CH*0.89);
        
        function renderFire(x, y) {
            if (campfire == true) {
                c.drawImage(CF_ICON, x, y, CH*0.06, CH*0.06);
            }
        }
        function renderWeather(x, y) {
            if (environment.rain == true) {
                c.drawImage(RAIN_ICON, x, y, CH*0.06, CH*0.06);
            }
            else {
                c.drawImage(SUN_ICON, x, y, CH*0.06, CH*0.06);
            }
        }
        function renderTent(x, y) {
            if (environment.shelter == true) {
                c.drawImage(TENT_ICON, x, y, CH*0.06, CH*0.06);
            }
        }
        }
        function animateB() {
            if (rescued == true) {
                victoryScreen();
            }
            else {
                gameOverScreen();
            }
            toolTip(mouse.x-100, mouse.y+20, 150, 50);
            requestAnimationFrame(animateB);
        }
        function victoryScreen() {
            c.clearRect(0, 0, canvas.width, canvas.height);
            c.fillRect(0, 0, CW, CH);
            textMsg('You have been saved!', '100px Arial', 'white', CW*0.12, CH*0.4);
            thankYou();

            function thankYou() {
                c.fillStyle = 'grey';
                c.fillRect(CW*0.2, CH*0.5, CW*0.6, CH*0.3);
                textMsg('Thanks for playing!', '30px Arial', 'black', CW*0.4, CH*0.6);
                textMsg('CTRL-R to retry', '30px Arial', 'black', CW*0.4, CH*0.7);
                
            }

        }
        function gameOverScreen() {
            c.clearRect(0, 0, canvas.width, canvas.height);
            c.fillRect(0, 0, CW, CH);
            textMsg('Game Over!', '100px Arial', 'darkred', CW*0.25, CH/2);
            textMsg('CTRL-R to retry', '30px Arial', 'white', CW*0.4, CH*0.6);
            textMsg('Shelter and fire will counter the rain.', '30px Arial', 'lightgrey', CW*0.3, CH*0.7);
            textMsg('Then hunt until help arrives.', '30px Arial', 'lightgrey', CW*0.3, CH*0.75);

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
            return 'Gather Firewood +5 Sticks';
        }
        else if (mouse.x < CW*0.4 && mouse.y < CH*0.4) {
            return 'Do Nothing';
        }
        else if (mouse.x < CW*0.4 && (mouse.y > CH*0.4 && mouse.y < CH*0.8)){
            return 'Hunt and Fish -1 Stick';
        }
        else if ((mouse.x > CW*0.4 && mouse.x < CW*0.8) && (mouse.y > CH*0.4 && mouse.y < CH*0.8)) {
            return 'Chop Trees +5 Logs';
        }
        else if ((mouse.x > CW*0.82 && mouse.x < CW*0.95) && (mouse.y > CH*0.35 && mouse.y < CH*0.43)) {
            return 'Campfire -5 Sticks';
        }
        else if ((mouse.x > CW*0.82 && mouse.x < CW*0.95) && (mouse.y > CH*0.65 && mouse.y < CH*0.73)) {
            return 'Shelter -20 Logs';
        }
        else {
            return 'Welcome To Lumberdome!';
        }
    }

    //highlights the quadrant player is hovering over
    function greySquareFunction(x, y){
        var alpha = 0.3;
        c.fillStyle = 'rgba(0, 12, 15, ' + alpha + ')';
        if ((x > CW*0.4 && x < CW*0.8) && y < CH*0.4) {
            c.fillRect(CW*0.4, 0, CW*0.4, CH*0.4);
        }
        else if (x < CW*0.4 && y < CH*0.4) {
            c.fillRect(0, 0, CW*0.4, CH*0.4);
        }
        else if (x < CW*0.4 && (y > CH*0.4 && y < CH*0.8)){
            c.fillRect(0, CH*0.4, CW*0.4, CH*0.4);
        }
        else if ((x > CW*0.4 && x < CW*0.8) && (y > CH*0.4 && y < CH*0.8)) {
            c.fillRect(CW*0.4, CH*0.4, CW*0.4, CH*0.4);
        }
    }   
    }
}


main();
/////////////////////////////////////////////
//helpers
function tickHelper(player0, rate) {
    var end = 0;
    if (player0.hunger > end)
    player0.tick(rate);
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

function UI(player, time, initialHealth) {
    rescueBar(time);
    healthBar(player, initialHealth); 
    quadrantLines();
    inventoryBar(player);
    

//health bar object
function healthBar(player0, initialHealth) {
    //inside
    c.fillStyle = 'lightcoral';
    c.fillRect(0, CH*0.8, CW*0.4, CH*0.2);
    c.fillStyle = 'palegreen';
    c.fillRect(0, CH*0.8, (CW*0.4)*(player0.hunger/initialHealth), CH);
    textMsg('Health Remaining:', '24px Arial', 'black', CW*0.01, CH*0.9);
    textMsg(oneCent(player0.hunger) + '/100', '30px Arial', 'black', CW*0.2, CH*0.9);

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
//converts health to int [0,100]
function oneCent(x) {
    return Math.round((x/initialHealth)*100);
}
//Rescue bar
function rescueBar(time){
    c.fillStyle = 'grey';
    c.fillRect(CW*0.4, CH*0.8, CW*0.4, CH*0.2);
    textMsg('Time until rescue: ' + time, '24px Arial', 'black', CW*0.41, CH*0.9);
}
//crafting panel
function inventoryBar(player){
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


}

//text message template
function textMsg(text, fontMsg, textColor, textX, textY){
    c.font = fontMsg;
    c.fillStyle = textColor;
    c.fillText(text, textX, textY);
}


//TODO 
//replace with more arithmetic than conditions
function hungerRateFunction(environment) {
    let hungerRate = 5;
    if (environment.rain == true) {
        hungerRate += 4;
    }
    if (environment.campfire == true) {
        hungerRate -= 2;
    }
    if (environment.shelter == true) {
        hungerRate -= 2;
    }
    return hungerRate;
}
// function hungerRateFunction(environment) {
//     if (environment.rain == false && environment.campfire == false && environment.shelter == false) {
//         return 2;
//     }
//     if (environment.rain == false && environment.campfire == false && environment.shelter == true) {
//         return 1.5;
//     }
//     if (environment.rain == false && environment.campfire == true && environment.shelter == false) {
//         return 1.5;
//     }
//     if (environment.rain == false && environment.campfire == true && environment.shelter == true) {
//         return 1;
//     }
//     if (environment.rain == true && environment.campfire == true && environment.shelter == true) {
//         return 2;
//     }
//     if (environment.rain == true && environment.campfire == false && environment.shelter == false) {
//         return 8;
//     }
//     if (environment.rain == true && environment.campfire == false && environment.shelter == true) {
//         return 4;
//     }
//     if (environment.rain == true && environment.campfire == true && environment.shelter == false) {
//         return 6;
//     }
//     else {return 2;}
// }
