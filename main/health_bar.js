//Health bar class
export class HealthBar {
    constructor(health, rate){
    this.health = health;
    this.rate = rate;
    }
    tick(now){
        var endTime = 0;
        //this.health = now;    
        if (now > endTime) {
            this.health -= (1*this.rate);
            return this.health;
        }
        else {
            this.health = 0;
            return this.health;
        } 
    }   
    
    getNow() {
        return this.health;
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