(function (root) {
  var FlappyBird = root.FlappyBird = (root.FlappyBird || {});
  
  var Wall = FlappyBird.Wall = function (dimX, dimY) {
		this.dimX = dimX;
		this.dimY = dimY;
		
    this.xAxis = dimX + 100;
    this.yAxis = dimY / 2;
    this.vx = -1;
	};
  
  Wall.prototype.draw = function (ctx) {
    this.xAxis = ((this.xAxis + this.vx));
    this.yAxis = ((this.yAxis + this.vy));
  	ctx.drawImage(this.img, this.xAxis, this.yAxis, 300, 225);
  };

  Wall.createWall = function (dimX, dimY){
    return new Wall(100, 100, [0, 0], FlappyBird.Game.birdImage);
  };
    
  Wall.prototype.move = function(dir){
		this.xAxis += dir[0];
		this.yAxis += dir[1];
  };
	
  Wall.prototype.power = function(impulse){
    this.vx += impulse[0];
    this.vy += impulse[1];
  }
	
  
})(this);