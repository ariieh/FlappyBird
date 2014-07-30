(function (root) {
  var FlappyBird = root.FlappyBird = (root.FlappyBird || {});
  
  var Bird = FlappyBird.Bird = function (dimX, dimY, vel, img) {
		this.dimX = dimX;
		this.dimY = dimY;
		
    this.xAxis = 100;
    this.yAxis = 100;
		
		this.xOffset = 160;
		this.yOffset = 115;
		this.side = 50;
		
    this.vx = vel[0];
    this.vy = vel[1];
	
		this.img = img;
  };
  
  Bird.prototype.draw = function (ctx) {
    this.xAxis = ((this.xAxis + this.vx));
    this.yAxis = ((this.yAxis + this.vy));
  	ctx.drawImage(this.img, this.xAxis, this.yAxis, 300, 225);
		
    ctx.fillStyle = "black";
    ctx.beginPath();

    ctx.rect(
      this.xAxis + this.xOffset,
      this.yAxis + this.yOffset,
      this.side,
      this.side
    );
		// ctx.fill();
  };

  Bird.createBird = function (dimX, dimY){
    return new Bird(dimX, dimY, [0, 0], FlappyBird.Game.birdImage);
  };
    
  Bird.prototype.move = function(dir){
		this.xAxis += dir[0];
		this.yAxis += dir[1];
  };
	
  Bird.prototype.power = function(impulse){
    this.vx += impulse[0];
    this.vy += impulse[1];
  }
	
  
})(this);
