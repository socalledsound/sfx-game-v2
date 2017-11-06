
// is this list of properties way too long? best way to deal with that?
var Game = function() {
	this.mainClickSound = new Howl({ src: gameOptions.mainClickSoundPath, html5: false, volume:0.5});
	this.woodblock1Sound = new Howl({src:gameOptions.woodblock1SoundPath, html5: false,volume:0.5});
	this.woodblock2Sound = new Howl({src:gameOptions.woodblock2SoundPath, html5: false,volume:0.5});
	this.woodblock3Sound = new Howl({src:gameOptions.woodblock3SoundPath, html5: false,volume:0.5});
	this.woodblock4Sound = new Howl({src:gameOptions.woodblock4SoundPath, html5: false,volume:0.5});
	this.woodblock5Sound = new Howl({src:gameOptions.woodblock5SoundPath, html5: false,volume:0.5});
	this.woodblockSounds = [this.woodblock1Sound, this.woodblock2Sound, this. woodblock3Sound, this.woodblock4Sound, this.woodblock5Sound];
	this.background_color = gameOptions.background_color;
	this.interfaceColor = gameOptions.interfaceColor;
	this.interfaceStrokeColor = gameOptions.interfaceStrokeColor;
	this.xStart = gameOptions.xStart;
	this.yStart = gameOptions.yStart;
	// this.antiSolveSpell = false;
	// this.disablePlayback = false;
	// this.noInterface = false;

	this.paused=false;
	this.level;
	this.levelNumber = 0;
	this.puzzles = [introPuzzleData, secondPuzzleData, thirdPuzzleData];
	this.puzzleData = this.puzzles[this.levelNumber];
	this.levelName = this.puzzleData.levelName;

	

	// this.hideView = false;





	this.initGame = function() {
		background(this.background_color);
		this.newLevel();

	},


	this.newLevel = function() {
		 // game.cleanup();

		
		this.puzzleData = this.puzzles[this.levelNumber];		
		levelField.innerHTML = "level : "+this.levelNumber+" : "+this.levelName+" ";
		this.level = new Level(this.puzzleData);
		this.level.initLevel();
		levelCompleteModal.style.display = "none";
		
	}


	this.updateGame = function() {
		this.level.checkSolution();
	},


	this.drawGame = function() {
		background(gameOptions.background_color);
		stroke(gameOptions.containerBorderColor);
		strokeWeight(gameOptions.containerStrokeWidth);
		fill(gameOptions.containerBorderColor)
		rect(this.xStart+6,this.yStart,535,410,10);

			this.level.containers.forEach(function(container){
				container.display();
			});

	},

	this.moveSound = function(index) {
		// this.woodblockSounds[this.moveCounter%2].play();
		// this.moveCounter+=1;
		this.mainClickSound.play();

	},

	this.dragged = function()  {
		this.level.containers.forEach(function(container,index) {
			if(container.draggable) {
				container.move();
				container.checkMeridian();
			};
		},this);
	},

	this.unDragged = function()  {
		this.level.containers.forEach(function(container) {
				container.checkMeridian();
				container.unDragged();
		},this);
	},

	this.clicked = function() {
			this.level.containers.forEach(function(container){
				if(container.checkClick()) {
						container.draggable=true;
						container.onClick();
					}
			});
	},

	this.drawSolved = function() {
		background(this.background_color);
		this.fullSolvedSound.play();
		this.level.containers.forEach(function(container,index){
				container.onlyShowSolvedCells();

			},this)
	},

	this.drawGlowing = function() {
		background(this.background_color);
		this.level.containers.forEach(function(container,index){
				container.onlyShowGlowingCells();
			},this)
	},

// 	this.checkSolution = function() {
// 		this.level.containers.forEach(function(container,index){
// 			this.meridianKey = container.checkMeridian();
// 				if (index<1) {
// 						this.currentKey = this.meridianKey;
// 					};
// 			container.checkSolved(this.currentKey);
// 			if(container.containerSolved) {
// 					this.solvedArray[index] = 1;
// 				}
// 			else {
// 					this.solvedArray[index]=0;
// 				}
// 		},this);
// 		this.checkEvery();
// 	},

// 	this.checkEvery = function() {
// 		if(this.solvedArray.every(function(el) {
// 				return el > 0;
// 			}) && !this.antiSolveSpell) {
// 			setTimeout(this.onSolved.bind(this),500);
// 		};
// 	},

// 	this.onSolved = function () {
// 		var possTitles, corrTitle, divColor;
// 		 var solvedObject = puzzleData.sounds.filter(function(sound,i,array) {
// 				if(sound.solutionKey === this.currentKey) {
// 					return sound;
// 				};
// 			},this)
// 			if(!solvedObject[0].alreadySolved) {
// 				solvedObject[0].alreadySolved = true;
// 			this.fullSolvedSound = new Howl({ src: solvedObject[0].fullSound });
// 			possTitles = solvedObject[0].titles;
// 			corrTitle = solvedObject[0].trueTitle;
// 			buttonColor = solvedObject[0].color;
// 			this.solvedColors.push(solvedObject[0].color);

// 			solvedObject=JSON.stringify(solvedObject[0].trueTitle);
// 			this.solvedText=solvedObject;	
// 			this.containers.forEach(function(container){
// 				container.markSolved(this.currentKey);
// 			}, this)		
// 			// this.drawSolvedAnimation();
// 			// this.quizAppearSound.play();
//             this.paused = true;
//             this.quiz = new Quiz(possTitles, corrTitle, buttonColor);
//             this.completedSounds.push(corrTitle);
//             this.quiz.init();
//             this.fullSolvedSound.play();
// 		    quizModal.style.display = "block";
// //			this.makeQuiz();
// 			};
// 	},

// 	this.updateSuccessModal = function() {

// 		this.percentDone = this.percentDone + 20;
// 		percentDoneField.innerHTML= this.percentDone+"%";

// 		// this.completedSounds.forEach((completedSound,i) => {
// 		// 	var listItem = document.createElement("li");
// 		// 	var listItemText = document.createTextNode(completedSound);
// 		// 	var itemColor = this.solvedColors[i];
// 		// 	listItem.style.color = "rgb("+ itemColor[0] + "," + itemColor[1] + ", " + itemColor[2] + ")";
// 		// 	listItem.appendChild(listItemText);
// 		// 	completedSoundsList.appendChild(listItem);
// 		// })

		
// 		var newListItem = document.createElement("li");
// 		var newListItemText = document.createTextNode(this.completedSounds[this.progress]);
// 		var newItemColor = this.solvedColors[this.progress];
// 		newListItem.style.color = "rgb("+ newItemColor[0] + "," + newItemColor[1] + ", " + newItemColor[2] + ")";
// 		newListItem.appendChild(newListItemText);
// 		completedSoundsList.appendChild(newListItem);
		

// 		this.progress = this.progress+1;
// 		progressField.innerHTML = "you've found "+(this.progress)+" out of "+ this.numberOfSounds+" sounds:"


// 		if (this.progress === this.numberOfSounds) {
// 			setTimeout(this.showLevelCompleteModal,3000);
// 		}

// 	}


	this.cleanup = function() {
			this.paused=false;
			this.disablePlayback=false;
			this.antiSolveSpell=false;
			// this.nextLevel();
			// this.level= this.level+1;

		}	

	this.cleanup = this.cleanup.bind(this);





}


			// this.nextLevelButton = document.createElement("button");
			// // this.nextLevelButton.addEventListener(touchEvent, this.cleanup);
			// this.nextLevelButton.innerHTML = "you completed the level";
			// successModal.appendChild(this.nextLevelButton);
