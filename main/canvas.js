

var canvas = document.querySelector('canvas');

var img = new Image();
<<<<<<< HEAD
img.src = 'data/bgs/bark0.jpg';
=======
img.src = 'data/bgs/bg6x8.png';
>>>>>>> faed2459c13dbd45c50d1eafb310fbdda185145f

var music = new Audio();
music.src = 'data/sounds/slowforest.mp3';

canvas.width = window.innerWidth*0.8;
<<<<<<< HEAD
canvas.height = window.innerHeight*.8;
=======
canvas.height = window.innerHeight/2+1;
>>>>>>> faed2459c13dbd45c50d1eafb310fbdda185145f
const HALFW = canvas.width/2;
const HALFH = canvas.height/2;

var c = canvas.getContext('2d');
c.fillRect(HALFW-50, HALFH-100, 50, 60);
c.fillRect(HALFW+50, HALFH-100, 50, 60);
c.beginPath();
c.moveTo(HALFW-50,HALFH-10);
c.lineTo(HALFW+100, HALFH+10);
c.strokeStyle = 'black';
c.lineWidth = 10;
c.stroke();
//c.fillRect(HALFW-50, HALFH, 150, 10);
c.font = '30px Arial';
c.fillText('Oops, something went horribly wrong.', HALFW-250, HALFH+50);


/*
c.beginPath();
c.arc(180,180,70,0,Math.PI*2,true);
c.moveTo(230,180);
c.arc(180,180,50,0,Math.PI,false);
c.moveTo(155,150);
c.arc(150,150,5,0,Math.PI*2,true);
c.moveTo(215,150);
c.arc(210,150,5,0,Math.PI*2,true);
c.fillText("Hello World!", 165, 270);
c.stroke();
*/

/*
c.beginPath();
c.moveTo(175,50);
c.lineTo(350, 150);
c.strokeStyle = 'yellow';
c.stroke();
*/
