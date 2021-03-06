var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


var angleSlider = document.getElementById("angle");
var angleOffsetSlider = document.getElementById("angleOffset");
var lengthFractionSlider = document.getElementById("lengthFraction");
var splitNumSlider = document.getElementById("splitNum");
var baseHeightSlider = document.getElementById("baseHeight");
var realTimeBox = document.getElementById("realTime");


var angle = 0.1;
var angleOffset = 0;
var lengthFraction = 0.4;
var splitNum = 4;
var baseHeight = 600;
var timeout = false;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
redraw();


function drawTree(x, y, angle, angleOffset, split, splitNum, length, lengthFraction, threshHold){
    line(x, y, x+Math.cos(angle)*length, y+Math.sin(angle)*length);
    if(length > threshHold){
        if(timeout){
            setTimeout(function(){
                for(var i = 0; i < splitNum; i++){
                    drawTree(x+Math.cos(angle)*length, y+Math.sin(angle)*length, angle-split*(splitNum-1)/2+split*i+angleOffset, angleOffset, split, splitNum, length*lengthFraction, lengthFraction, threshHold);
                }
            }, 0);
        }
        else{
            for(var i = 0; i < splitNum; i++){
                drawTree(x+Math.cos(angle)*length, y+Math.sin(angle)*length, angle-split*(splitNum-1)/2+split*i+angleOffset, angleOffset, split, splitNum, length*lengthFraction, lengthFraction, threshHold);
            }
        }
    }
}

function line(x1, y1, x2, y2){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

angleSlider.oninput = function(){
    angle = this.value/100
    redraw();
}
angleOffsetSlider.oninput = function(){
    angleOffset = this.value/100
    redraw();
}
lengthFractionSlider.oninput = function(){
    lengthFraction = this.value/1000;
    redraw();
}
splitNumSlider.oninput = function(){
    splitNum = this.value;
    redraw();
}
baseHeightSlider.oninput = function(){
    baseHeight = this.value;
    redraw();
}

realTimeBox.oninput = function(){
    timeout = !timeout;
    redraw();
}

function redraw(){
    var id = window.setTimeout(function() {}, 0);

while (id--) {
    window.clearTimeout(id);
}
    ctx.fillStyle = "#77FFAA";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = "#003322";
    drawTree(canvas.width/2, canvas.height, -Math.PI/2, angleOffset, angle, splitNum, baseHeight, lengthFraction, 1);
}