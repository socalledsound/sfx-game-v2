var Container = function(x,y,sounds) {
	this._x = x;
	this._y = y;
	this.currentX = x;
	this.currentY = y;
	this.containerWidth = gameOptions.containerWidth;
	this.containerHeight = gameOptions.containerHeight;
	this.triangleHeight = 60;
	this.spacer = gameOptions.spacer;
	this.numCells = gameOptions.numCells;
	this.currentColumn = 0;
	this.sounds = sounds;
	this.meridianKey = "Z";
	this.containerSolved = false;
	this.cells=[];


	this.init = function () {
		
			this.initUpperTriangle(this._x,this._y);
			this.initLowerTriangle(this._x,this._y);
			this.initCells();
	}


	this.initCells = function() {
		
			var initialKeys = Object.keys(this.sounds);
			var scrambledOrder = initialKeys.sort(function(){return Math.random() * 2 -1;});
	
			for ( var i=0; i < this.numCells; i++) {
				var x = this._x + (this.containerWidth/20);
				var y = this._y + ((this.containerHeight/this.numCells)*i) + (this.spacer*i);
				var hiddenColor = gameOptions.cellHiddenColors[scrambledOrder[i]];
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
			if(!cell.solved) {
					if((cell.y > (gameOptions.meridian-50)) && (cell.y < (gameOptions.meridian+40))) {
						cell.markAsMeridian();
						this.meridianKey = cell.key;
					}
					else {
						cell.markUnMeridian();
					}
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
			game.moveSound.play();
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
			game.moveSound.play();
		}
	},	

	this.settleInGrid = function(val) {
		if (val < 30) {val = 30};
		if(val > 30 && val < 120 )  {val = 30};
		if(val > 110 && val <200 ) 	{val = 115};
		if(val > 200 && val <280 ) 	{val = 200};			
		if(val > 280 && val <360 ) 	{val = 285};
		if(val > 350 ) 	{val = 370};
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
			this.cells.forEach(function(cell,index){				
				if (cell.glowing) {
					setTimeout(cell.showSolvedGlowing.bind(cell),1000*index);
				}
				
			}) 		
	},

	this.onlyShowSolvedCells = function() {

			this.cells.forEach(function(cell){
				if (cell.solved) {
					cell.displayCell();
				}				
			}) 		
	}				
	


}