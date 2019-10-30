/*
var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

var pupmkin = new Image();
var bg1 = new Image();
var bg2 = new Image();
var bg3 = new Image();

pupmkin.src = "img/pumpkin.png";
bg1.src = "img/halloween.png";
bg2.src = "img/witch1.png";
bg3.src = "img/witch2.png";

function draw() {
   ctx.drawImage(bg1, 0, 0);
}

bg3.onload = draw();
*/

const backsound = document.getElementById("audio-welcome");
window.onload = function() {
    backsound.play();
};


// var visitor = prompt("Well hello there...What's your name?");
// var message = 'Well, well, do you want to get out of here alive?, visitor';
// document.write(massage);
