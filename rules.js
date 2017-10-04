
///need to make a sequence of rules 
//where the first screen is just click to make sounds
//secodn says, "good. your goal is to match sounds up"
//there are five columns of sounds that move up and down.
//drag any box up or down and you'll see that the five boxes that make up a column move together.  got it?  good.
//now drag the column at the far left.  see how the boxes change color when they line up with the bright blue line at the right?
//that's the solution line.  
//click on the box that's on the solution line.
//now try to find a box in each column that matches that sound and line them all up on the solution line to solve a sound and see what it's called.
//solve all five sounds to move to the next level!!

				// "good"
				// "There are five sounds split up into five fragments each."
				// "One fragment of each sound is in each vertical column."
				// "Got it?"
				// "yes" "not really"



var Rules = function(x,y,height,width,bgColor,textColor) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.rulesBGcolor = bgColor;
	this.textColor = textColor;
	this.rule1 = "Click on any box to hear a fragment of sound";
	this.rule2 = "Move boxes vertically by clicking and dragging";
	this.rule3 = "";
	this.rule4 = "Line up five similar sounds along the middle band"; 
	this.rule5 = "to find out what that sound is called";
	this.rule6 = "";
	this.rule7 = "'Solve' all five sounds to go to the next level";
	this.rule8 = "";
	this.rule9 = "(more levels coming soon)";
	this.fontSize = 22;
	this.rulesFont = rulesFont;




	this.initRules = function() {
		// fill(this.rulesBGcolor);
		// rect(this.x, this.y, this.width,this.height);
		stroke(this.textColor);
		strokeWeight(1);
		textSize(this.fontSize);
		// textFont('Sans');
		textFont(rulesFont);
		fill(this.textColor);

		text(this.rule1,this.x+20,this.y+20,this.width,this.height);

		text(this.rule2,this.x+20,this.y+80,this.width,this.height);
		text(this.rule3,this.x+20,this.y+110,this.width,this.height);

		text(this.rule4,this.x+20,this.y+130,this.width,this.height);
		text(this.rule5,this.x+20,this.y+160,this.width,this.height);
		text(this.rule6,this.x+20,this.y+230,this.width,this.height);

		text(this.rule7,this.x+20,this.y+220,this.width,this.height);
		text(this.rule8,this.x+20,this.y+330,this.width,this.height);

		text(this.rule9,this.x+20,this.y+280,this.width,this.height);

		
	}



	this.rulesCloseText_x = function() {

	}


	this.hideRules = function() {

	}


}

