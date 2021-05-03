
////////////////////////////////////////////////////////////////////////
//Timer class
export class CountDownTimer {
    constructor(startTime, rate){
    this.startTime = startTime;
    this.rate = rate;
    }
    // timer(now){
    //     var endTime = 0;
    //     this.now = now;    
    //     if (this.now > endTime) {
    //         this.now -= (1*this.rate);
    //         return this.now;
    //     }
    //     else {
    //         this.now = 0;
    //         return this.now;
    //     }       
    // }
    timer(now){
        var endTime = 0;
        this.now = now;   
        setInterval(function() { 
            if (this.now > endTime) {
                this.now -= (1*this.rate);
                return this.now;
            }
            else {
                this.now = 0;
                return this.now;
            }
        }, this.rate);   
    }
    getNow() {
        return this.now;
    }
    getRate() {
        return this.rate;
    }
}

// //TODO
// //get a working clock that counts down at varying speeds
// //TODO class functionality?
// //Create a clock counting down from set value
// function StartClock(startTime, interval){
//     this.startTime = startTime;
//     this.now = now; //positive number
//     console.log(this.startTime);
//     this.interval = interval; //object must evaluate to number
//     var endTime = 0.00;
//     setInterval(function() {
//         var now = startTime;
//         console.log(now);
//         if (now > endTime){
//             return now -= 0.01;
//         }
//         else { 
//             return 'Game Over';
//         }
    
//     }, interval); 

//  function getNow() {
//     return this.now;
//  }
// }

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