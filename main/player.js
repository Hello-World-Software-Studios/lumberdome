/////////////////////////////////////////////////////////////
//Player Script

export class Player{
    constructor(hunger, sticks, logs, pFrameX, pFrameY) {
    //point of control for countdown init
    this.hunger = hunger;
    //player resources
    this.sticks = sticks; //positive integer or 0
    this.logs = logs; //positive integer or 0
    //animation
    this.pFrameX = pFrameX;
    this.pFrameY = pFrameY;
    //TODO create durability for axe
    //this.axe = axe //number from 0 to 100
    }
    tick(rate){
        this.hunger -= (0.75*rate);
    }
    addHealth(x) {
        this.hunger += x;
    }
    addSticks(x) {
        this.sticks += x;
        //this.starve(1000);
    }
    addLogs(x) {
        this.logs += x;
        //this.starve(2000);
    }
    starve(x) {
        this.hunger -= x;
    }
    removeSticks(x) {
        this.sticks -= x;
    }
    removeLogs(x) {
        this.logs -= x;
    }
    getSticks() {
        return this.sticks;
    }
    getLogs() {
        return this.logs;
    }
}