var Quiz = function(titles,answer, buttonColor) {
    
    this.titles = titles;
    this.answer = answer;
    this.answeredQuiz = false;	
	this.button0,this.button1,this.button2,this.button3;
	this.buttons = [];
    this.numButtons = 4;
    
    for(var i=0;i<this.numButtons; i++) {
        this.buttons[i] = new QuizButton(this.titles[i],buttonColor,i);
        this.buttons[i] = document.getElementById("answer"+i);
        this.buttons[i].innerHTML = this.titles[i];
        this.buttons[i].style.backgroundColor = "rgb("+ buttonColor[0] + "," + buttonColor[1] + ", " + buttonColor[2] + ")";
        /// this is the fucked up part!!!
        this.buttons[i].addEventListener(touchEvent, this.updateButtons);
    };
    

//		this.buttons.forEach((button,index)=>{
//
//			
//			// button.onclick = function() { this.updateButton(_titles[index],correctAnswer,index ); }.bind(this);
//	
//		},this);


	},
    
    




	this.updateButtons = function() {
		this.answeredQuiz = false; 
//		console.log(answer);
//		console.log(correctAnswer);
//		console.log(this.answeredQuiz);
        
		this.answeredQuiz = this.checkAnswer();

		console.log(this.answeredQuiz);
		if(this.answeredQuiz) {
			console.log(index);
			this.buttons.forEach(function(button,i){
				if(i===index) {
					button.innerHTML = "correct answer!";
					button.style.backgroundColor = "rgb(60, 23, 66)";
					this.fullSolvedSound.fade(1.0,0.0,1000);
					this.rightAnswerSound.play();
					this.childrenYaySound.play();
					button.removeEventListener(touchEvent,function() { this.updateButton(answer,correctAnswer,index); }.bind(this));
					setTimeout(this.cleanup,3000);
				}
				else {
					button.style.backgroundColor = "rgb(60, 23, 66)";
					button.innerHTML = "";
					button.removeEventListener(touchEvent,function() { this.updateButton(answer,correctAnswer,index); }.bind(this));
				}
			},this);


		}
		else {
			this.buttons[index].innerHTML = "nope.  guess again!";
			this.buttons[index].style.backgroundColor = "rgb(60, 23, 66)";
			this.wrongAnswerSound.play();
		}

	},

	this.checkAnswer = function() {
		if (answer === correctAnswer) {
			return true
		}
		else {
			return false
		};
	},