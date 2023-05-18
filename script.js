var canvas = document.querySelector('canvas')
var rows = 20;
var cols = 20;
var pixelSize = 25;
var c = canvas.getContext('2d');

// snake head //
var sx  = pixelSize*5;
var sy  = pixelSize*5;
var velocityx = 0;
var velocityy = 0;

// food //

var fx ;
var fy ;

class Bodyparts{
    constructor(_x,_y){
        this.x = _x;
        this.y = _y;
    }
}

var snakeBody = [];

window.onload = function(){
    canvas.height = rows*pixelSize;
    canvas.width = cols*pixelSize;
    

    food();
    document.addEventListener("keyup", direction)
    // update();
   var intervel = setInterval(update, 150);
   var intervel1 = setInterval(function gameOver(){
    if(sx<0 || sx> (rows*pixelSize - snakeBody.length) || sy<0 || sy> cols*pixelSize){
        clearInterval(intervel)
        clearInterval(intervel1)
        alert('game over');
    
    }
    for(i=0; i<=snakeBody.length;i++){
        if(sx == snakeBody[i].x && sy == snakeBody[i].y){
            clearInterval(intervel)
            clearInterval(intervel1)
            alert('gameover');
            
        }
    }
}, 10);


}




function update(){

    c.fillStyle = "rgb(19, 19, 19)";
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = 'red';
    c.fillRect(fx, fy, pixelSize, pixelSize);

    if(sx == fx && sy == fy){
        snakeBody.push(new Bodyparts(fx,fy));
        food();
    }

    for(let i = snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1] 
        
    }
    if(snakeBody.length){
        snakeBody[0] = {x:sx, y:sy};

    }
    sx += velocityx;
    sy += velocityy;
    c.fillStyle = 'green';
    c.fillRect(sx, sy, pixelSize, pixelSize);
    for(let i=0; i<= snakeBody.length; i++){
        c.fillRect(snakeBody[i].x, snakeBody[i].y, pixelSize, pixelSize);
    }
}

function food(){
    fx = Math.floor(Math.random()*cols) *pixelSize;
    fy = Math.floor(Math.random()*rows) *pixelSize;
}

function direction(e){
    if(e.code == "ArrowUp" && velocityy != 25){
        velocityx = 0;
        velocityy = -25;
    }
    else if(e.code == "ArrowDown" && velocityy != -25){
        velocityx = 0;
        velocityy = 25;
    }
    else if(e.code == "ArrowLeft" && velocityx != 25){
        velocityx = -25;
        velocityy = 0;
    }
    else if(e.code == "ArrowRight" && velocityx != -25){
        velocityx = 25;
        velocityy = 0;
    }
   
}
