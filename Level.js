var Level = function(puzzleData) {
	this.puzzleData = puzzleData;	
	this.containers = [];
	this.container1sounds=[], this.container2sounds=[], this.container3sounds=[], this.container4sounds=[], this.container5sounds=[];
	this.containerSounds = [this.container1sounds,this.container2sounds, this.container3sounds, this.container4sounds, this.container5sounds];
	this.meridianKey="Z";
	this.currentKey = "Z";
	this.solvedArray = [0,0,0,0,0];
	this.solvedText;
	this.solvedTextArray=[];
	this.answeredQuiz = false; 
	this.curIndex=0;
	 this.moveCounter = 0;
	this.progress = 0;
	this.percentDone = 0;
	this.level = 0;
	this.numberOfSounds = 5;
	this.completedSounds = [];
	this.solvedColors = [];
	this.nextLevelButton = document.getElementById('next-level-button');



	this.initLevel = function() {
		// background(this.background_color);
		this.loadPuzzleSounds();
		this.initContainers();

	},

	this.loadPuzzleSounds = function() {

			this.puzzleData.sounds.forEach(function(sound){
				 this.container1sounds.push(sound.clips[0]);
				 this.container2sounds.push(sound.clips[1]);
				 this.container3sounds.push(sound.clips[2]);
				 this.container4sounds.push(sound.clips[3]);
				 this.container5sounds.push(sound.clips[4]);
			}, this);
	},

	this.initContainers = function() {
		for (var i = 0; i < gameOptions.numContainers; i++) {
			this.containers[i] = new Container(gameOptions.xStart+(i*100)+gameOptions.spacerX*i,gameOptions.yStart, this.containerSounds[i],i);
		}
		this.containers.forEach(function(container){
			container.init();
			container.checkMeridian();
			container.display();
		});
		console.log("containers init success");
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
		 var solvedObject = this.puzzleData.sounds.filter(function(sound,i,array) {
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
            game.paused = true;
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


	this.cleanupLevel = function() {


			successModal.style.display = "none";
			// this.nextLevelButton.removeEventListener(touchEvent, this.cleanup)
			// this.level= this.level+1;
			this.answeredQuiz = false; 
			this.solvedTextArray=[];

			this.solved = false;
			this.solvedObject = "";
			
			this.currentKey = "Z";
			this.solvedArray=[0,0,0,0,0];
			this.containers.forEach(function(container){
				container.containerSolved=false;
			}, this);
			game.cleanup();
			
	}

	this.showLevelCompleteModal = function() {
		successModal.style.display = "none";
		levelCompleteModal.style.display = "block";		
		 this.addLevelCompleteListener();
		
	},
	this.addLevelCompleteListener = function() {
		this.nextLevelButton.addEventListener(touchEvent, this.resetLevel);	
	}
	

	this.resetBoard = function() {
		this.containers.forEach(function(container){
			container.containerSolved = false;
			container.display();
		});
	},

	this.resetLevel = function() {
		levelCompleteModal.style.display = "none";	
		this.resetBoard();
		game.newLevel();
	}

	this.showLevelCompleteModal = this.showLevelCompleteModal.bind(this);
	this.addLevelCompleteListener = this.addLevelCompleteListener.bind(this);
	this.resetLevel = this.resetLevel.bind(this);
	this.cleanupLevel = this.cleanupLevel.bind(this);


}
