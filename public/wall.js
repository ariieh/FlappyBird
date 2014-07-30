(function (root) {
  var FlappyBird = root.FlappyBird = (root.FlappyBird || {});
  
  var Wall = FlappyBird.Wall = function (dimX, dimY, type, img) {
		this.dimX = dimX;
		this.dimY = dimY;
		this.xAxis = dimX;
		this.width = 100;
		this.type = type;
		this.img = img;
		
		if (type === "bottom"){
			this.yAxis = Math.random() * (dimY - dimY / 2 + 50) + dimY / 2 + 50;
		} else {
			this.yAxis = Math.random() * (dimY / 2) - 100;
		}
		
    this.vx = -1;
	};
	  
  Wall.prototype.draw = function (ctx) {
    this.xAxis = (this.xAxis + this.vx);

    ctx.fillStyle = "brown";
    ctx.beginPath();
		
		if (this.type === "bottom"){
	  	// ctx.rect(this.xAxis, this.yAxis, this.width, this.dimY - this.yAxis);
	  	ctx.drawImage(this.img, this.xAxis - 100, this.yAxis, 283, 360);
		} else {
			// ctx.rect(this.xAxis, 0, this.width, this.yAxis);
	  	ctx.drawImage(this.img, this.xAxis - 50, this.yAxis - 479, 227, 479);
		}

		ctx.fill();
  };
	
	Wall.prototype.move = function(){
		this.xAxis += this.vx;
	}

  Wall.createBottomWall = function (dimX, dimY, img){		
    return new Wall(dimX, dimY, "bottom", img);
  };
	
  Wall.createTopWall = function (dimX, dimY, img){		
    return new Wall(dimX, dimY, "top", img);
  };
    
})(this);