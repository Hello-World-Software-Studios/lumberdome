

var canvas = document.querySelector('canvas');

var img = new Image();
img.src = 'data/bgs/bark0.jpg';

var music = new Audio();
music.src = 'data/sounds/slowforest.mp3';


canvas.width = window.innerWidth*0.8;
canvas.height = window.innerHeight*0.8;
const HALFW = canvas.width/2;
const HALFH = canvas.height/2;

var c = canvas.getContext('2d');

function face(){
    c.fillRect(HALFW-50, HALFH-100, 50, 60);
    c.fillRect(HALFW+50, HALFH-100, 50, 60);
    c.beginPath();
    c.moveTo(HALFW-50,HALFH-10);
    c.lineTo(HALFW+100, HALFH+10);
    c.strokeStyle = 'black';
    c.lineWidth = 10;
    c.stroke();
}
function oops(){
    face();
    c.font = '30px Arial';
    c.fillText('Oops, something went horribly wrong.', HALFW-250, HALFH+50);
}
oops();
function musicFunc(){
    if (isPlaying(music) == true){
        music.pause();
    }
    else music.play();
}
onmousedown = musicFunc();



