import 'player.js';

function main(){
    //environmental conditions
    var rain = false;
    var shelter = false;
    var campfire = false;
    if (rain == true && campfire == true && shelter == false){
        campfire = false;
    }

    //init player
    var newPlayer = new player();

    function start(){
        var endTime = 0.00;
        var clock = new setInterval(function() {
            var now = player.hunger,
            if (now > 0.00){
                now-0.01;
            }  
        
        }, intervalRate()); 
    }

    function intervalRate(){
        var interval = 50;


        if (rain == true){
            interval + 25;
        }
        else if (campfire == true){
            interval - 10;
        }
        else if (shelter == true){
            interval - 15;
        }
    }
}