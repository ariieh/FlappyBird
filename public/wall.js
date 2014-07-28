(function (root) {
  var FlappyBird = root.FlappyBird = (root.FlappyBird || {});
  
  var Wall = FlappyBird.Wall = function (dimX, dimY, type) {
		this.dimX = dimX;
		this.dimY = dimY;
		this.xAxis = dimX;
		this.type = type;
		
		if (type === "bottom"){
			this.yAxis = Math.random() * (dimY + 100 - dimY / 2) + dimY / 2;
		} else {
			this.yAxis = Math.random() * (dimY / 2 - 100);
		}
		
    this.vx = -1;
	};
	  
  Wall.prototype.draw = function (ctx) {
    this.xAxis = ((this.xAxis + this.vx));

    ctx.fillStyle = "black";
    ctx.beginPath();
		
		if (this.type === "bottom"){
	  	ctx.rect(this.xAxis, this.yAxis, 100, this.dimY - this.yAxis);
		} else {
			ctx.rect(this.xAxis, 0, 100, this.yAxis);
		}

		ctx.fill();
  };
	
	Wall.prototype.move = function(){
		this.xAxis += this.vx;
	}

  Wall.createBottomWall = function (dimX, dimY){		
    return new Wall(dimX, dimY, "bottom");
  };
	
  Wall.createTopWall = function (dimX, dimY){		
    return new Wall(dimX, dimY, "top");
  };
    
})(this);