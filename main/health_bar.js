import { Player } from './player.js';
////////////////////////////////////////////////////////////////////////
//Health bar class
export class HealthBar {
    constructor(health, rate){
    this.health = health;
    this.rate = rate;
    }
    tick(now){
        var endTime = 0;
        this.now = this.health;    
        if (this.now > endTime) {
            this.now -= (1*this.rate);
            return this.now;
        }
        else {
            this.now = 0;
            return this.now;
        }       
    }   
    
    getNow() {
        return this.now;
    }
    getRate() {
        return this.rate;
    }
}


// //helper for StartClock
// function intervalRate(){
//     var interval = 50;

//     // if (rain == true){
//     //     interval + 25;
//     // }
//     // else if (campfire == true){
//     //     interval - 10;
//     // }
//     // else if (shelter == true){
//     //     interval - 15;
//     // }
//     return interval;
// }