var gameView;
var gameOptions;

function setup() {

	createCanvas(windowWidth,windowHeight);
	game = new Game();
	game.initGame();

}



function draw () {
  	if(!game.paused) {
  		game.updateGame();
		game.drawGame();
	}	
}


// so I guess the mouse functions are essentially the controller??

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

