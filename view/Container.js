var Container = function(x,y,sounds,index) {
	this._x = x;
	this._y = y;
	this.currentX = x;
	this.currentY = y;
	this.containerWidth = gameOptions.containerWidth;
	this.containerHeight = gameOptions.containerHeight;
	this.triangleHeight = 60;
	this.spacerX = gameOptions.spacerX;
	this.spacerY = gameOptions.spacerY;
	this.numCells = gameOptions.numCells;
	this.containerNumber = index;
	this.containerBorderColor = gameOptions.containerBorderColor;
	this.containerStrokeWidth = gameOptions.containerStrokeWidth;
	this.sounds = sounds;
	this.colors = gameOptions.cellHiddenColors;
	this.meridianKey = "Z";
	this.containerSolved = false;
	this.cells=[];


	this.init = function () {
		
			this.initUpperTriangle(this._x+this.spacerX,this._y);
			this.initLowerTriangle(this._x+this.spacerX,this._y);
			this.initCells();
			console.log(this.sounds);
	}


	this.initCells = function() {
		
			var initialKeys = Object.keys(this.sounds);
			// console.log(initialKeys);
			var scrambledOrder = initialKeys.sort(function(){return Math.random() * 2 -1;});
	
			for ( var i=0; i < this.numCells; i++) {
				var x = this._x + (this.containerWidth/20)+(this.spacerX);
				var y = this._y + ((this.containerHeight/this.numCells)*i) + (this.spacerY*i);
				var hiddenColor = this.colors[scrambledOrder[i]];
				var cellSound = this.sounds[scrambledOrder[i]];
				var cellRow = i;
				this.cells[i] = new Cell(x, y, hiddenColor, cellSound, cellRow);			 
			}
	},

	this.initUpperTriangle = function(x,y) {
			
		var a = x + 20;
		var b = y - 20;
		var c = x + 50;
		var d = y - 40;
		var e = x + 80;
		var f = y  -20;		
		// console.log(b);
		this.upperTriangle = new Triangle(a,b,c,d,e,f,"upper");			
	}, 

	this.initLowerTriangle = function(x,y) {	
		var a = x + 20;
		var b = y + this.containerHeight + 40;
		var c = x + 50;
		var d = y + this.containerHeight+40+20;
		var e = x + 80;
		var f = y + this.containerHeight+40;
		this.lowerTriangle = new Triangle(a,b,c,d,e,f,"lower");
						
	},
	

	this.display = function () {

			this.upperTriangle.display();
			this.lowerTriangle.display();
			this.cells.forEach(function(cell,index){
				cell.displayCell();
			});	


	},

	this.checkClick = function () {
		return (mouseX > this._x && mouseX < this._x + this.containerWidth && mouseY > this._y - this.triangleHeight && mouseY < this._y + this.containerHeight + this.triangleHeight)	
	},

	this.onClick = function () {	
			var clickedTriangle = this.upperTriangle.checkTriangleClick(this._y);
			console.log(clickedTriangle);
			this.draggable = true;		

			if (this.upperTriangle.checkTriangleClick(this._y)) {
					this.moveOneRow(gameOptions.containerHeight/gameOptions.numCells + 5);
			};
			
			if (this.lowerTriangle.checkTriangleClick(this._y)) {
					this.moveOneRow(-1 * gameOptions.containerHeight/gameOptions.numCells - 5);
			};
			

			this.cells.forEach(function(cell,index){
				cell.checkCellClick();
			});	
	},

	this.checkMeridian = function() {
		this.cells.forEach(function(cell,index){
					if((cell.y > (gameOptions.meridian-50)) && (cell.y < (gameOptions.meridian+40))) {
						cell.markAsMeridian();
						this.meridianKey = cell.key;
					}
					else {
						cell.markUnMeridian();
					}
						 
		}, this)	
		return this.meridianKey
		

	},

	this.move = function() {
		var distanceMoved;
		var begin_y = this._y;
		var new_y = mouseY;
		if(new_y > 0 && new_y < (1000)) {
			this._y = this.settleInGrid(new_y);
			this.cells.forEach(function(cell){
				cell.move(this._y);
			},this);
		};
		
		distanceMoved =  this._y - begin_y;

		this.upperTriangle.move(this._y, distanceMoved);
		this.lowerTriangle.move(this._y, distanceMoved);
		
		if (Math.abs(distanceMoved) > 30) {
			game.moveSound(index);
		}
	},

	this.moveOneRow = function(moveDistance) {
		var distanceMoved;
		var begin_y = this._y;
		this._y = begin_y - moveDistance;
		if(this._y > 0 && this._y < (1000)) {
			// this._y = this.settleInGrid(new_y);
			this.cells.forEach(function(cell){
				cell.move(this._y);
			},this);
		};
		
		distanceMoved =  this._y - begin_y;

		this.upperTriangle.move(this._y, distanceMoved);
		this.lowerTriangle.move(this._y, distanceMoved);
		
		if (Math.abs(distanceMoved) > 30) {
			game.moveSound(index);
		}
	},	

	this.settleInGrid = function(val) {
		if (val < 30) {val = 36};
		if(val > 30 && val < 120 )  {val = 36};
		if(val > 110 && val <200 ) 	{val = 118};
		if(val > 200 && val <280 ) 	{val = 200};			
		if(val > 280 && val <360 ) 	{val = 282};
		if(val > 350 ) 	{val = 365};
		return val	
	},

	this.settleInGrid = function(val) {
		if (val < 50) {val = 56};
		if(val > 50 && val < 140 )  {val = 56};
		if(val > 130 && val <220 ) 	{val = 138};
		if(val > 220 && val <300 ) 	{val = 220};			
		if(val > 300 && val <380 ) 	{val = 302};
		if(val > 370 ) 	{val = 385};
		return val	
	},

	this.unDragged = function() {
		this.draggable = false;
		this.cells.forEach(function(cell) {
			cell.moving=false;
		})
	},	

	this.checkSolved = function(key) {
			this.cells.forEach(function(cell,index){				
				if(!cell.solved) {
						if(cell.key != key && !cell.onMeridian && !cell.playing) {
							cell.resetCell();
							 // cell.unHighlight();
						}
						if(cell.key === key && cell.onMeridian && !cell.solved) {
							// cell.markHighlighted();							 
							 this.containerSolved = true;
						}
						if (cell.key === key && !cell.onMeridian){
							this.containerSolved = false;
							// cell.unHighlight();
						}	
				}		
			}, this)
	},

	this.markSolved = function(key) {
			this.cells.forEach(function(cell,index){
				cell.markUnGlowing();
				if(cell.key === key) {
					cell.markSolved();				
				};
			});	
	},

	this.markGlowing = function(key) {
			this.cells.forEach(function(cell,index){
				if(cell.key===key) {
					cell.markGlowing();				
				}				
			},this);	
	},



	this.onlyShowGlowingCells = function() {
			this.cells.forEach(function(cell){
			console.log(this.containerNumber);				
				if (cell.glowing) {
					setTimeout(cell.showSolvedGlowing.bind(cell),300*this.containerNumber);
					//cell.showSolvedGlowing();
				}
				
			}.bind(this)) 		
	},

	this.onlyShowSolvedCells = function() {

			this.cells.forEach(function(cell){
				if (cell.solved) {
					cell.displayCell();
				}				
			}) 		
	}				
	
// this.onlyShowGlowingCells =this.onlyShowGlowingCells.bind(this);

}