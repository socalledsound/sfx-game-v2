// this whole idea of a view component seems superfluous now, should I roll it back in?
// is this list of properties way too long? best way to deal with that?
var Game = function() {
	this.mainClickSound = new Howl({ src: gameOptions.mainClickSoundPath, html5: false, volume:0.5});
	this.woodblock1Sound = new Howl({src:gameOptions.woodblock1SoundPath, html5: false,volume:0.5});
	this.woodblock2Sound = new Howl({src:gameOptions.woodblock2SoundPath, html5: false,volume:0.5});
	this.woodblock3Sound = new Howl({src:gameOptions.woodblock3SoundPath, html5: false,volume:0.5});
	this.woodblock4Sound = new Howl({src:gameOptions.woodblock4SoundPath, html5: false,volume:0.5});
	this.woodblock5Sound = new Howl({src:gameOptions.woodblock5SoundPath, html5: false,volume:0.5});
	this.woodblockSounds = [this.woodblock1Sound, this.woodblock2Sound, this. woodblock3Sound, this.woodblock4Sound, this.woodblock5Sound];
	this.magicSolvedSound = new Howl({src:gameOptions.magicSolvedSoundPath});
	this.wrongAnswerSound = new Howl({ src:gameOptions.wrongAnswerSoundPath });
	this.rightAnswerSound = new Howl({ src: gameOptions.rightAnswerSoundPath });
	this.childrenYaySound = new Howl({ src: gameOptions.childrenYaySoundPath });
	this.quizAppearSound = new Howl({ src: gameOptions.quizAppearSoundPath });
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
	this.solvedTextSize=60;
	// this.solvedTextFont='Arial';
	this.solvedText_x = gameOptions.solvedText_x;
	this.solvedText_y = gameOptions.solvedText_y;
	this.solvedText_width = gameOptions.solvedText_width;
	this.solvedText_height = gameOptions.solvedText_height;
	//this.solved = false;
	this.antiSolveSpell = false;
	this.disablePlayback = false;
	this.noInterface = false;
	this.showRules = true;
	// this.disableInterface = false;
	this.paused=false;
	this.curIndex=0;
	 this.moveCounter = 0;
	this.showRules = true;
	this.hideView = false;
	this.button0,this.button1,this.button2,this.button3;
	this.buttons;


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
		 	console.log(solvedObject.index);
			if(!solvedObject[0].alreadySolved) {
				solvedObject[0].alreadySolved = true;
			this.fullSolvedSound = new Howl({ src: solvedObject[0].fullSound });
			possTitles = solvedObject[0].titles;
			corrTitle = solvedObject[0].trueTitle;
			buttonColor = solvedObject[0].color;

			solvedObject=JSON.stringify(solvedObject[0].trueTitle);
			this.solvedText=solvedObject;	
			this.containers.forEach(function(container){
				container.markSolved(this.currentKey);
			}, this)		
			// this.drawSolvedAnimation();
			this.quizAppearSound.play();
			this.makeQuiz(possTitles, corrTitle, buttonColor);
			};
	},




	this.makeQuiz = function(titles, correctAnswer, buttonColor) {
		var _titles = titles;
		// var divColor = soundColor;
		console.log(buttonColor);
		this.paused = true;

		this.button0 = document.getElementById("answer0");
		this.button1 = document.getElementById("answer1");
		this.button2 = document.getElementById("answer2");
		this.button3 = document.getElementById("answer3");
		this.buttons = [this.button0, this.button1, this.button2, this.button3];


		this.buttons.forEach((button,index)=>{
			button.innerHTML = _titles[index];
			button.style.backgroundColor = "rgb("+ buttonColor[0] + "," + buttonColor[1] + ", " + buttonColor[2] + ")";
			// button.style.color = "rgb(66, 102, 249)";
			button.onclick = function() { this.updateButton(_titles[index],correctAnswer,index ); }.bind(this);
	
		},this);

		this.fullSolvedSound.play();
		modal.style.display = "block";
	},

	this.clickedButton = function() {
		 
	},


	this.updateButton = function(answer, correctAnswer, index) {
		var answered = this.checkAnswer(answer, correctAnswer);

		
		if(answered) {
			this.buttons.forEach(function(button,i){
				if(i===index) {
					button.innerHTML = "correct answer!";
					button.style.backgroundColor = "rgb(60, 23, 66)";
					this.fullSolvedSound.fade(1.0,0.0,1000);
					this.rightAnswerSound.play();
					this.childrenYaySound.play();
					setTimeout(this.cleanup,3000);
				}
				else {
					button.style.backgroundColor = "rgb(60, 23, 66)";
					button.innerHTML = "";
				}
			},this);


		}
		else {
			this.buttons[index].innerHTML = "nope.  guess again!";
			this.buttons[index].style.backgroundColor = "rgb(60, 23, 66)";
			this.wrongAnswerSound.play();
		}

	},

	this.checkAnswer = function(answer, correctAnswer) {
		if (answer === correctAnswer) {
			return true
		};
	},
	// this.showText = function () {
 // 		background(this.background_color);
	// 	 if(!this.disablePlayback) {
	// 			this.fullSolvedSound.play();
	// 			this.disablePlayback = true;
	// 			};
	// 	textSize(this.solvedTextSize);
	// 	textFont(gameOptions.solvedTextFont);
	// 	strokeWeight(3);
	// 	textAlign(CENTER);
	// 	fill(gameOptions.solvedTextColor);
	// 	this.solvedText = this.solvedText.split(" ");
	// 	console.log(this.solvedText);
	// 	for (var i=0; i<this.solvedText.length; i++) {
	// 		this.solvedTextArray.push(this.solvedText[i]);
	// 		};
	// 	this.solvedTextArray.forEach(function(item,index) {
	// 		text(item,this.solvedText_x,this.solvedText_y+60*index,this.solvedText_width,this.solvedText_height);
	// 	},this)

	// this.drawSolvedAnimation = function() {
	// 	this.paused = true;
	// 	this.containers.forEach(function(container){
	// 			container.markGlowing(this.currentKey);
	// 		}, this)

	// 	// this.magicSolvedSound.play();
	// 	this.drawGlowing();
	// 	setTimeout(this.solvedAnimationGrey.bind(this),1500);
	// },

	// this.solvedAnimationGrey = function() {
	// 	this.containers.forEach(function(container){
	// 		container.markSolved(this.currentKey);
	// 	}, this)
	// 	 //this.drawSolved();
	// 	//this.showText();this.showText();	
	// 	// setTimeout(this.showText.bind(this),1000);
	// },


	// 	setTimeout(this.cleanup,14000);
	// 	this.fullSolvedSound.fade(1.0,0.0,12000);

	// },

	this.cleanup = function() {
		modal.style.display = "none";
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
	}

	this.cleanup = this.cleanup.bind(this);


}
