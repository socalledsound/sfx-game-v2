var gameView;
var gameOptions;


var modal = document.getElementById('quiz-modal');
var span = document.getElementsByClassName('close')[0];


// disable default touch behavior on touchscreens
document.addEventListener('touchstart', this.touchstart);
document.addEventListener('touchmove', this.touchmove);

function touchstart(e) {
    e.preventDefault()
}

function touchmove(e) {
    e.preventDefault()
}


//init game
function setup() {
	createCanvas(windowWidth,windowHeight);
	game = new Game();
	game.initGame();
	// game.showText(puzzleData.sounds[0].titles);
}



function draw () {
  	if(!game.paused) {
  		game.updateGame();
		game.drawGame();
	}	
}


function mousePressed() {
 	if(!game.paused) {
 		game.clicked();
 	}
}

function mouseDragged() {
	if(!game.paused) {
		game.dragged();
	}
}


function mouseReleased() {
	if(!game.paused) {
		game.unDragged();	
	}
}



span.onclick = function() {
	modal.style.display= "none";
	game.cleanup();
}

window.onclick = function() {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}