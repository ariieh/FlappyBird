(function (root) {
  var FlappyBird = root.FlappyBird = (root.FlappyBird || {});
  
  var Bird = FlappyBird.Bird = function (dimX, dimY, vel, img) {
		this.dimX = dimX;
		this.dimY = dimY;
		
    this.xAxis = 100;
    this.yAxis = 100;
    this.vx = vel[0];
    this.vy = vel[1];
	
		this.img = img;
  };
  
  Bird.prototype.draw = function (ctx) {
    this.xAxis = ((this.xAxis + this.vx));
    this.yAxis = ((this.yAxis + this.vy));
  	ctx.drawImage(this.img, this.xAxis, this.yAxis, 300, 225);
		
    ctx.fillStyle = this.col;
    ctx.beginPath();

    ctx.arc(
      this.xAxis + 185,
      this.yAxis + 140,
      25,
      0,
      2 * Math.PI,
      false
    );
		ctx.fill();
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
