

var canvas = document.querySelector('canvas');


canvas.width = window.innerWidth*0.8;
canvas.height = window.innerHeight/2;
const HALFW = canvas.width/2;
const HALFH = canvas.height/2;

var c = canvas.getContext('2d');

c.fillRect(HALFW-50, HALFH, 50, 60);
c.fillRect(HALFW-50, HALFH+100, 150, 10);
c.fillRect(HALFW+50, HALFH, 50, 60);
/*
c.beginPath();
c.moveTo(175,50);
c.lineTo(350, 150);
c.strokeStyle = 'yellow';
c.stroke();
*/
c.font = '30px Arial';
c.fillText('Oops, something went horribly wrong. :/', HALFW-300, HALFH+200);
