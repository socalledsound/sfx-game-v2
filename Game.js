
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
	this.containers = [];
	this.container1sounds=[], this.container2sounds=[], this.container3sounds=[], this.container4sounds=[], this.container5sounds=[];
	this.containerSounds = [this.container1sounds,this.container2sounds, this.container3sounds, this.container4sounds, this.container5sounds];
	this.meridianKey="Z";
	this.currentKey = "Z";
	this.solvedArray = [0,0,0,0,0];
	this.solvedText;
	this.solvedTextArray=[];
	// this.solvedTextSize=60;
	// // this.solvedTextFont='Arial';
	// this.solvedText_x = gameOptions.solvedText_x;
	// this.solvedText_y = gameOptions.solvedText_y;
	// this.solvedText_width = gameOptions.solvedText_width;
	// this.solvedText_height = gameOptions.solvedText_height;
	//this.solved = false;
	this.antiSolveSpell = false;
	this.disablePlayback = false;
	this.noInterface = false;
	this.showRules = true;
	// this.disableInterface = false;
	this.paused=false;
	this.answeredQuiz = false; 
	this.curIndex=0;
	 this.moveCounter = 0;
	this.showRules = true;
	this.hideView = false;
	this.progress = 0;
	this.percentDone = 0;
	this.level = 0;
	this.numberOfSounds = 5;
	this.completedSounds = [];
	this.solvedColors = [];




	this.initGame = function() {
		background(this.background_color);
		this.loadPuzzleSounds();
		this.initContainers();

	},

	this.loadPuzzleSounds = function() {

			puzzleData.sounds.forEach(function(sound){
				 this.container1sounds.push(sound.clips[0]);
				 this.container2sounds.push(sound.clips[1]);
				 this.container3sounds.push(sound.clips[2]);
				 this.container4sounds.push(sound.clips[3]);
				 this.container5sounds.push(sound.clips[4]);
			}, this);
	},

	this.initContainers = function() {
		for (var i = 0; i < gameOptions.numContainers; i++) {
			this.containers[i] = new Container(this.xStart+(i*100)+gameOptions.spacerX*i,this.yStart, this.containerSounds[i],i);
		}
		this.containers.forEach(function(container){
			container.init();
			container.checkMeridian();
			container.display();
		});
	},

	this.updateGame = function() {
		this.checkSolution();
	},


	this.drawGame = function() {
		background(gameOptions.background_color);
		stroke(gameOptions.containerBorderColor);
		strokeWeight(gameOptions.containerStrokeWidth);
		fill(gameOptions.containerBorderColor)
		rect(this.xStart+6,this.yStart,535,410,10);
		if(!this.hideView) {
			this.containers.forEach(function(container){
				container.display();
			});
		};

	},

	this.moveSound = function(index) {
		// this.woodblockSounds[this.moveCounter%2].play();
		// this.moveCounter+=1;
		this.mainClickSound.play();

	},

	this.dragged = function()  {
		this.showRules=false;
		this.containers.forEach(function(container,index) {
			if(container.draggable) {
				container.move();
				container.checkMeridian();
			};
		},this);
	},

	this.unDragged = function()  {
		this.containers.forEach(function(container) {
				container.checkMeridian();
				container.unDragged();
		},this);
	},

	this.clicked = function() {
			this.containers.forEach(function(container){
				if(container.checkClick()) {
						container.draggable=true;
						container.onClick();
					}
			});
	},

	this.drawSolved = function() {
		background(this.background_color);
		this.fullSolvedSound.play();
		this.containers.forEach(function(container,index){
				container.onlyShowSolvedCells();

			},this)
	},

	this.drawGlowing = function() {
		background(this.background_color);
		this.containers.forEach(function(container,index){
				container.onlyShowGlowingCells();
			},this)
	},

	this.checkSolution = function() {
		this.containers.forEach(function(container,index){
			this.meridianKey = container.checkMeridian();
				if (index<1) {
						this.currentKey = this.meridianKey;
					};
			container.checkSolved(this.currentKey);
			if(container.containerSolved) {
					this.solvedArray[index] = 1;
				}
			else {
					this.solvedArray[index]=0;
				}
		},this);
		this.checkEvery();
	},

	this.checkEvery = function() {
		if(this.solvedArray.every(function(el) {
				return el > 0;
			}) && !this.antiSolveSpell) {
			setTimeout(this.onSolved.bind(this),500);
		};
	},

	this.onSolved = function () {
		var possTitles, corrTitle, divColor;
		 var solvedObject = puzzleData.sounds.filter(function(sound,i,array) {
				if(sound.solutionKey === this.currentKey) {
					return sound;
				};
			},this)
			if(!solvedObject[0].alreadySolved) {
				solvedObject[0].alreadySolved = true;
			this.fullSolvedSound = new Howl({ src: solvedObject[0].fullSound });
			possTitles = solvedObject[0].titles;
			corrTitle = solvedObject[0].trueTitle;
			buttonColor = solvedObject[0].color;
			this.solvedColors.push(solvedObject[0].color);

			solvedObject=JSON.stringify(solvedObject[0].trueTitle);
			this.solvedText=solvedObject;	
			this.containers.forEach(function(container){
				container.markSolved(this.currentKey);
			}, this)		
			// this.drawSolvedAnimation();
			// this.quizAppearSound.play();
            this.paused = true;
            this.quiz = new Quiz(possTitles, corrTitle, buttonColor);
            this.completedSounds.push(corrTitle);
            this.quiz.init();
            this.fullSolvedSound.play();
		    quizModal.style.display = "block";
//			this.makeQuiz();
			};
	},

	this.updateSuccessModal = function() {

		this.percentDone = this.percentDone + 20;
		percentDoneField.innerHTML= this.percentDone+"%";

		// this.completedSounds.forEach((completedSound,i) => {
		// 	var listItem = document.createElement("li");
		// 	var listItemText = document.createTextNode(completedSound);
		// 	var itemColor = this.solvedColors[i];
		// 	listItem.style.color = "rgb("+ itemColor[0] + "," + itemColor[1] + ", " + itemColor[2] + ")";
		// 	listItem.appendChild(listItemText);
		// 	completedSoundsList.appendChild(listItem);
		// })

		
		var newListItem = document.createElement("li");
		var newListItemText = document.createTextNode(this.completedSounds[this.progress]);
		var newItemColor = this.solvedColors[this.progress];
		newListItem.style.color = "rgb("+ newItemColor[0] + "," + newItemColor[1] + ", " + newItemColor[2] + ")";
		newListItem.appendChild(newListItemText);
		completedSoundsList.appendChild(newListItem);
		

		this.progress = this.progress+1;
		progressField.innerHTML = "you've found "+(this.progress)+" out of "+ this.numberOfSounds+" sounds:"


		if (this.progress === this.numberOfSounds) {
			setTimeout(this.showLevelCompleteModal,3000);
		}

	}


	this.cleanup = function() {


			successModal.style.display = "none";
			// this.nextLevelButton.removeEventListener(touchEvent, this.cleanup)
			this.level= this.level+1;
			this.answeredQuiz = false; 
			this.solvedTextArray=[];
			this.paused=false;
			this.disablePlayback=false;
			this.solved = false;
			this.solvedObject = "";
			this.antiSolveSpell=false;
			this.currentKey = "Z";
			this.solvedArray=[0,0,0,0,0];
			this.containers.forEach(function(container){
				container.containerSolved=false;
			}, this)

	this.showLevelCompleteModal = function() {
		successModal.style.display = "none";

		levelCompleteModal.style.display = "block";
	}


	}

	this.cleanup = this.cleanup.bind(this);


}


			// this.nextLevelButton = document.createElement("button");
			// // this.nextLevelButton.addEventListener(touchEvent, this.cleanup);
			// this.nextLevelButton.innerHTML = "you completed the level";
			// successModal.appendChild(this.nextLevelButton);
