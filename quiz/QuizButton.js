var QuizButton = function(title, buttonColor, index) {
    this.button;
    this.title = title;
    this.index = index;
    this.isCorrectAnswer =false;
   


    this.init =function() {


    		// this.button = document.getElementById("answer"+index);

    		// this.button = document.createElement('button');
    		// this.button.classlist.add("answer"+this.index);
    		// this.button.id = index;
    		// this.button = document.getElementById("answer"+index);
	     //    this.button.innerHTML = this.title;
	     //    this.button.style.backgroundColor = "rgb("+ buttonColor[0] + "," + buttonColor[1] + ", " + buttonColor[2] + ")";

	        console.log(this.button);

    },



	// this.updateButton = function() {


	// 	if(quiz.solved) {
	// 			this.setSolvedButtons();
	// 	}
	// 	else {
	// 		this.buttons[index].innerHTML = "nope.  guess again!";
	// 		this.buttons[index].style.backgroundColor = "rgb(60, 23, 66)";
	// 		this.wrongAnswerSound.play();
	// 	}

	// },

	this.setSolvedButtons = function() {
			if(this.isCorrectAnswer) {

				this.button.innerHTML = "correct answer!";        			
				this.button.style.backgroundColor = "rgb(60, 23, 66)";
				game.fullSolvedSound.fade(1.0,0.0,1000);
				this.rightAnswerSound.play();
				this.childrenYaySound.play();
				// button.removeEventListener(touchEvent,function() { this.updateButton(answer,correctAnswer,index); }.bind(this));
				setTimeout(quiz.cleanup,3000);
	        
			}
			else 
			{
				button.style.backgroundColor = "rgb(60, 23, 66)";
				button.innerHTML = "";
			
			};
	}



    
//            this.buttons[i] = document.getElementById("answer"+i);
//        this.buttons[i].innerHTML = this.buttons[i].title;
//        this.buttons[i].style.backgroundColor = "rgb("+ buttonColor[0] + "," + buttonColor[1] + ", " + buttonColor[2] + ")";
//        /// bind this to
//        this.buttons[i].addEventListener(touchEvent, this.buttons[i].updateButton);
//    
}