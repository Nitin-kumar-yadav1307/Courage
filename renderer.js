let canvas = document.querySelector('#window');

let ctx = canvas.getContext('2d');

ctx.fillStyle = 'red';

ctx.fillRect(50, 50, 200, 100);

ctx.fillStyle = 'blue';
ctx.font = ' 24px sans-serif';

ctx.fillText('shree ganesh',100,100)