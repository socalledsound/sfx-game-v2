var Quiz = function(titles,answer, buttonColor) {
    
    this.titles = titles;
    this.answer = answer;
    this.buttonColor = buttonColor;
    this.answeredQuiz = false;	
	this.button0,this.button1,this.button2,this.button3;
	this.buttons = [];
	this.continueGameButton = document.getElementById('continue-button');
    this.numButtons = 4;
    this.solved=false;
	this.wrongAnswerSound = new Howl({ src:gameOptions.wrongAnswerSoundPath });    
	this.rightAnswerSound = new Howl({ src: gameOptions.rightAnswerSoundPath });
	this.childrenYaySound = new Howl({ src: gameOptions.childrenYaySoundPath });
	this.quizAppearSound = new Howl({ src: gameOptions.quizAppearSoundPath });
	
    
    this.init = function() {
    console.log("in here");
    this.quizAppearSound.play();
 
	    for(var i=0;i<this.numButtons; i++) {
	        // this.buttons[i] = new QuizButton(this.titles[i], this.buttonColor,i);
	        //  this.buttons[i].init();
	        this.buttons[i] = document.getElementById("answer"+i);
	        this.buttons[i].innerHTML = this.titles[i];
	        this.buttons[i].style.backgroundColor = "rgb("+ buttonColor[0] + "," + buttonColor[1] + ", " + buttonColor[2] + ")";
	        this.buttons[i].addEventListener(touchEvent, this.buttonClicked);
	        console.log(this.buttons);
	        console.log(this.titles);
	    };
    },


    
    this.buttonClicked = function() {

    	var index = event.target.id.slice(-1);
		this.solved = this.checkAnswer(this.titles[index],this.answer);

		if(this.solved) {
			 // this.setSolvedButtons(index);
			 this.showSuccessModal();
		}
		else 
		{
			this.buttons[index].innerHTML = "nope.  guess again!";
			this.buttons[index].style.backgroundColor = "rgb(60, 23, 66)";
			this.buttons[index].style.color = "rgb(122, 218, 160)";
			this.wrongAnswerSound.play();
		}			


    	// this.buttons.forEach((button) => {
    	// 	button.updateButton();	
    	// })


    },

	this.buttonClicked = this.buttonClicked.bind(this);

	this.checkAnswer = function(title, answer) {
		if (title === answer) {
			return true
		}
		else {
			return false
		};
	},

	this.showSuccessModal = function() {
		quizModal.style.display = "none";	
		successModal.style.display = "block";	
		game.level.updateSuccessModal();
		game.level.fullSolvedSound.fade(1.0,0.0,1000);
		this.rightAnswerSound.play();
		this.childrenYaySound.play();
		this.continueGameButton.addEventListener(touchEvent, this.cleanupQuiz);
		setTimeout(this.cleanupQuiz.bind(this),9000);
	},


	// this.setSolvedButtons = function(correctIndex) {

	// 	for(var i=0;i<this.numButtons; i++) {
	// 		console.log(correctIndex == i);
	// 		if(i == correctIndex) {

	// 			this.buttons[i].innerHTML = "correct answer!";        			
	// 			this.buttons[i].style.backgroundColor = "rgb(60, 23, 66)";
	// 			// this.buttons[i].style.fontSize = "30px";;

	// 			successModal.style.display = "none";	


	// 			game.fullSolvedSound.fade(1.0,0.0,1000);
	// 			this.rightAnswerSound.play();
	// 			this.childrenYaySound.play();
	// 			// button.removeEventListener(touchEvent,function() { this.updateButton(answer,correctAnswer,index); }.bind(this));
	// 			setTimeout(this.cleanup.bind(this),3000);
	        
	// 		}
	// 		else 
	// 		{
	// 			this.buttons[i].style.backgroundColor = "rgb(60, 23, 66)";
	// 			this.buttons[i].innerHTML = "";
			
	// 		};
	// 	};	
	// },

	this.removeContinueButtonListener = function() {
		this.continueGameButton.removeEventListener(touchEvent, this.cleanupQuiz);
	},

    this.cleanupQuiz  = function() {
		setTimeout(this.removeContinueButtonListener,1000);
		// this.quizAppearSound.play();
		game.level.cleanupLevel();
    	for(var i=0;i<this.numButtons; i++) {
    		this.buttons[i].style.color = "rgb(0, 0, 0)";
    		this.buttons[i].removeEventListener(touchEvent,this.buttonClicked);
    	};
    	 
    }

	this.removeContinueButtonListener = this.removeContinueButtonListener.bind(this);
	this.cleanupQuiz = this.cleanupQuiz.bind(this);


//		this.buttons.forEach((button,index)=>{
//
//			
//			// button.onclick = function() { this.updateButton(_titles[index],correctAnswer,index ); }.bind(this);
//	
//		},this);

    
    




	}