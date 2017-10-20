var Cell = function(x, y,hiddenColor,sound, cellRow) {
	this.x 			= 	x;
	this.y 			= 	y;
	this.row 		= cellRow;
	this.reset_x 	= x;
	this.reset_y 	= y;
	this.hiddenColor = hiddenColor;
	this.key 		= 	Object.keys(sound);
	this.sound		=	new Howl({src:[sound[this.key]],html5: false});
	this.key 		= 	Object.keys(sound)[0].charAt(0);
	this.width 		=	gameOptions.containerWidth;
	this.height 	= 	gameOptions.containerHeight/gameOptions.numCells;
	this.reset_height = gameOptions.containerHeight/gameOptions.numCells;
	this.reset_width =	gameOptions.containerWidth;
	this.spacer  	= gameOptions.spacer; 
	this.cellStartColor = gameOptions.cellStartColor;
	this.cellColor = gameOptions.cellStartColor;
	this.cellBorderColor = gameOptions.cellBorderColor;
	this.cellRingColor = gameOptions.cellRingColor;
	this.cellBorderStartColor = gameOptions.cellBorderColor;
	this.cellBorderHighlightColor = gameOptions.cellBorderHighlightColor;
	this.highlightColor = gameOptions.cellHighlightColor;
	this.cellMeridianColor = gameOptions.cellMeridianColor;
	this.glowingColor = gameOptions.cellGlowingColor;
	this.solvedColor =	gameOptions.cellSolvedColor; 			
	// this.moving 	= 	false;
	this.playing	=	false;
	this.moveSoundPlaying = false;
	this.clicked 	=	false;
	this.highlight  = 	false;
	this.onMeridian = 	false;
	this.revealed 	= 	false;
	this.glowing 	=	false;
	this.solved 	= 	false;
	this.visible    = 	true;
	this.trig 		= 	1;

	// this.key 		= 	Object.keys(sound);
	// this.init = function() {
	



	// },

	this.displayCell = function() {

		this.visible === true ? strokeWeight(0.5) : strokeWeight(0.0);	

		fill(this.cellBorderColor);
		rect(this.x-5,this.y,this.width,this.height,10);
		strokeWeight(3);
		stroke(this.cellRingColor)
		rect(this.x,this.y+5,this.width-10,this.height-10,10);
		fill(this.cellColor);		
		rect(this.x+5,this.y+10,this.width-20,this.height-20,10);
	},

	this.checkCellClick = function(){
		if( mouseX > this.x && mouseX < this.x +80 && mouseY > this.y && mouseY < this.y +80) {
				this.clicked = true;
				if(this.clicked && !this.playing && !game.disablePlayback && !this.solved && !this.moving) {
				 this.trigSoundAnimation();						
				}
		}	
	},

	this.move = function(containerY) {
		var distanceMoved = containerY-this.y;	
		// console.log(distanceMoved);
		this.y = containerY + (this.height * this.row) + (this.spacer * this.row);
		// this.moving = true;
	},

	this.markAsMeridian = function() {
		this.onMeridian = true;
		this.cellBorderColor = this.cellBorderHighlightColor;
		if(!this.solved && !this.glowing ) {
		 this.cellColor = this.hiddenColor;
		}
	},

	this.markUnMeridian = function() {
		this.onMeridian = false;
		this.cellBorderColor = this.cellBorderStartColor;
		if(!this.solved) {
			 this.cellColor = this.hiddenColor;
		}
		this.resetCellMeridian();
	},

	// this.markHighlighted = function() {
	// 	if(!this.solved) {
	// 	this.highlight = true;
	// 	// this.cellColor=this.highlightColor;
	// 	}
	// },

	// this.unHighlight = function() {
	// 	this.highlight = false;
	// 	// this.cellColor=this.cellStartColor;
	// },	

	this.markSolved = function() {
		this.solved = true;
		this.glowing = false;
		// this.cellBorderColor = this.solvedColor;
		this.cellColor = this.solvedColor;
	},

	this.markUnSolved = function() {
		this.solved = false;
	},
	this.markGlowing = function() {
		this.glowing = true;
		this.cellColor = this.glowingColor;
	},

	this.markUnGlowing = function() {
		this.glowing = false;
	},

	this.resetCell = function() {
		this.clicked = false;
	},

	this.resetCellMeridian = function() {
		if(!this.solved && !this.onMeridian && !this.playing) {
			this.cellBorderColor = this.cellBorderStartColor;
			this.cellColor = this.cellStartColor;
		}
	},

	this.resetCellPlaying = function() {
		this.clicked = false;
		this.playing = false;
		 if(!this.solved) {
		 	this.cellColor = this.cellStartColor;
			};
	},

	this.resetMoveSoundPlaying = function() {
		this.moveSoundPlaying = false;
	},

	this.trigSoundAnimation = function(){
		 this.oldColor = this.cellColor;
		this.revealed = true;
		this.cellColor = this.hiddenColor;
		this.playSound();
		setTimeout(this.resetCellPlaying.bind(this),10000);
	},

	this.playSound = function(){
		this.playing = true;
		this.sound.play();
		setTimeout(this.cellPlayingFalse.bind(this),2000);
	},		
	
	this.cellPlayingFalse = function() {
		this.playing =false;
		this.clicked = false;
	},

	this.showSolvedGlowing =function() {

	}

}