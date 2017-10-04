var GameView = function () {
	this.clickSound = new Howl({src:gameOptions.mainClickSoundPath,html5: false,volume:0.5});
	this.magicSolvedSound = new Howl({src:gameOptions.magicSolvedSoundPath})
	this.background_color = gameOptions.background_color;
	this.interfaceColor = gameOptions.interfaceColor;
	this.interfaceStrokeColor = gameOptions.interfaceStrokeColor;
	// this.vertColor = gameOptions.vertColor;
	// this.playHeadColor = gameOptions.playHeadColor;
	this.showRules = true;
	this.hideView = false;


	this.initView = function() {

		//initialize containers
		

	}
	

	// this.checkClick = function() {

	// 	// check triangles
	// 	// check containers
	// 	// check cells

	// 	// if clicked then return clicked 
  
	// },

	this.onClicked = function() {
			
		//this is where cells are triggered

	}

	this.onDragged = function() {
		// determine the new positions after dragging
	},



	this.updateView = function() {

		// also known as drawing the view


		if(!game.hideView) {

		
			// if the game isn't hidden then draw the game

			//updateContainers and cells
			this.drawMeridianBox();
		}
	},


}