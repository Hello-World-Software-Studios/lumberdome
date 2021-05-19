export class UI{
    constructor(player, initialHealth, time) {
        this.player = player;
        this.initialHealth = initialHealth;
        this.time = time;
    }
    

//health bar object
healthBar(healthRemaining, initialHealth, player) {
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
rescueBar(time){
    c.fillStyle = 'grey';
    c.fillRect(CW*0.4, CH*0.8, CW*0.4, CH*0.2);
    textMsg('Time until rescue: ' + time, '24px Arial', 'black', CW*0.41, CH*0.9);
    //outline
    //TODO make strokeRect instead!
    c.beginPath();
    c.moveTo((CW*0.4 + 5), CH*0.8);
    c.lineTo((CW*0.4 + 5), CH);
    c.lineTo(CW*0.8, CH);
    c.lineTo(CW*0.8, CH*0.8);
    c.lineTo((CW*0.4 + 5), CH*0.8);
    c.strokeStyle = 'black';
    c.lineWidth = 10;
    c.stroke();
}
//crafting panel
inventoryBar(player){
    c.fillStyle = 'lightsteelblue';
    c.fillRect(CW*0.8, 0, CW*0.2, CH);
    inventoryButtons('Craft Campfire', 'Craft Shelter');
    textMsg('Crafting Pane', '24px Arial', 'black', CW*0.82, CH*0.12);
    textMsg('Sticks: ' + player.sticks, '24px Arial', 'black', CW*0.85, CH*0.3);
    textMsg('Logs: ' + player.logs, '24px Arial', 'black', CW*0.85, CH*0.6);
}
inventoryButtons(textA, textB) {
    c.fillStyle = 'darkred';
    c.fillRect(CW*0.82, CH*0.35, CW*0.15, CH*0.08);
    c.fillRect(CW*0.82, CH*0.65, CW*0.15, CH*0.08);
    textMsg(textA, '24px Arial', 'white', CW*0.83, CH*0.4);
    textMsg(textB, '24px Arial', 'white', CW*0.83, CH*0.7);
}
//create a grid on top of map
quadrantLines(){
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
textMsg(text, fontMsg, textColor, textX, textY){
    c.font = fontMsg;
    c.fillStyle = textColor;
    c.fillText(text, textX, textY);
}
//produce a rectangle that follows mouse and displays information
toolTip(x, y, long, tall, text){
    c.fillStyle = 'white';
    c.fillRect(x, y, long, tall);
    c.font = '20px Arial';
    c.fillStyle = 'black';
    c.fillText(text, x+5, y+25);
}
//Tooltip Helper
tTHelp(){
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
greySquareFunction(){
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

}
