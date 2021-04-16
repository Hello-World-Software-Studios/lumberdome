

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth*0.8;
canvas.height = window.innerHeight/2;

var c = canvas.getContext('2d');

c.fillRect(100, 100, 50, 60);
c.fillRect(175, 200, 100, 10);
c.fillRect(300, 100, 50, 60);

c.beginPath();
c.moveTo(175,50);
c.lineTo(350, 150);
c.strokeStyle = 'yellow';
c.stroke();
