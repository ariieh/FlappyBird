(function (root) {
  var FlappyBird = root.FlappyBird = (root.FlappyBird || {});
  
  var Wall = FlappyBird.Wall = function (dimX, dimY) {
		this.dimX = dimX;
		this.dimY = dimY;
		
    this.xAxis = dimX - 100;
    this.yAxis = (dimY * Math.random()) + 200;
		
    this.vx = -1;
	};
	  
  Wall.prototype.draw = function (ctx) {
    this.xAxis = ((this.xAxis + this.vx));

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(
      this.xAxis,
      this.yAxis,
			100,
			this.dimY - this.yAxis
    );
		ctx.fill();
  };
	
	Wall.prototype.move = function(){
		this.xAxis += this.vx;
	}

  Wall.createWall = function (dimX, dimY){		
    return new Wall(dimX, dimY);
  };
    
})(this);