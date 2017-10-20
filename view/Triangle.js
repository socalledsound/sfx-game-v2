var Triangle = function(a,b,c,d,e,f,type) {
			this.a = a;
			this.b = b;
			this.c = c;
			this.d = d;
			this.e = e;
			this.f = f;
			this.fillColor=gameOptions.triangleColor;
			this.strokeColor = gameOptions.triangleStrokeColor;
			this.type = type;

	this.display = function() {
			fill(this.fillColor);
			stroke(this.strokeColor);
			strokeWeight(3);
			triangle(this.a,this.b,this.c,this.d,this.e,this.f);
			triangle(this.a,this.b,this.c,this.d,this.e,this.f);
			
		},

	this.checkTriangleClick = function(containerY) {
		console.log('checking');
		var v0 = [this.e-this.a,this.f-this.b];
		var v1 = [this.c-this.a,this.d-this.b];
		var v2 = [mouseX-this.a,mouseY-this.b];

		var dot00 = (v0[0]*v0[0]) + (v0[1]*v0[1]);
		var dot01 = (v0[0]*v1[0]) + (v0[1]*v1[1]);
		var dot02 = (v0[0]*v2[0]) + (v0[1]*v2[1]);	
		var dot11 = (v1[0]*v1[0]) + (v1[1]*v1[1]);
		var dot12 = (v1[0]*v2[0]) + (v1[1]*v2[1]);

		var invDenom = 1/ (dot00 * dot11 - dot01 * dot01);

		var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
		var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

		if ((u >= 0) && (v >= 0) && (u + v < 1)) {
			console.log('clicked');
			// this.move(gameOptions.containerHeight/gameOptions.numCells);
			return true
		}


	},


	this.move = function(containerY, distance) {
			this.b = this.b + distance;
			this.d = this.d + distance;
			this.f = this.f + distance;
		}

};