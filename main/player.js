/////////////////////////////////////////////////////////////
//Player Script

export class Player{
    constructor(hunger, sticks, logs, axe) {
    //point of control for countdown init
    this.hunger = hunger;
    //player resources
    this.sticks = sticks; //positive integer or 0
    this.logs = logs; //positive integer or 0
    this.axe = axe //number from 0 to 100
    }
    addSticks(x) {
        this.sticks += x;
    }
    getSticks() {
        return this.sticks;
    }
}