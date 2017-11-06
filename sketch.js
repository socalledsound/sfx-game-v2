var gameView;
var gameOptions;
var game;
var touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

var helpPage = document.getElementById('help-page');

var introModal = document.getElementById('intro-modal-1');
var helpModal = document.getElementById('help-modal');
var quizModal = document.getElementById('quiz-modal');
var successModal = document.getElementById('success-modal');
var levelCompleteModal = document.getElementById('level-complete-modal');


var beginButton = document.getElementById('begin-button');


var levelField = document.getElementById('level');
var percentDoneField = document.getElementById('completion-percentage');
var progressField = document.getElementById('progress');
var completedSoundsList = document.getElementById('completed-sounds-list');

var beginBellSound = new Howl({ src: gameOptions.beginBellSoundPath });

// levelField.innerHTML = "this is some text";
// disable default touch behavior on touchscreens
document.addEventListener('touchstart', this.touchstart);
document.addEventListener('touchmove', this.touchmove);

beginButton.addEventListener(touchEvent, removeIntroModal);
helpPage.addEventListener(touchEvent, showHelpModal);

function removeIntroModal() {
	beginBellSound.play();
	introModal.style.display = "none";
}

function showHelpModal() {
	helpModal.style.display = "none";
}

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