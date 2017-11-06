var gameView;
var gameOptions;
var touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

var quizModal = document.getElementById('quiz-modal');
var successModal = document.getElementById('success-modal');
var levelCompleteModal = document.getElementById('level-complete-modal');


var levelField = document.getElementById('level');
var percentDoneField = document.getElementById('completion-percentage');
var completedSoundsList = document.getElementById('completed-sounds-list');

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
	createCanvas(750,850);
	game = new Game();
	game.initGame();
	// game.showText(puzzleData.sounds[0].titles);
}



function draw () {

	
  	if(!game.paused) {
  		game.updateGame();
		game.drawGame();
	}	
	// ellipse(10,10,100,100);
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



// span.onclick = function() {
// 	modal.style.display= "none";
// 	game.cleanup();
// }

// window.onclick = function() {
// 	if (event.target == modal) {
// 		modal.style.display = "none";
// 	}
// }