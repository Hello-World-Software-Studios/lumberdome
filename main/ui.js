export class UI {
    constructor(){
        
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