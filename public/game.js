(function (root) {
  var FlappyBird = root.FlappyBird = (root.FlappyBird || {});
  
  var Game = FlappyBird.Game = function (dimX, dimY, birdImage) {
    Game.birdImage = birdImage;
		
    this.dimX = dimX;
    this.dimY = dimY;
    this.bird = FlappyBird.Bird.createBird(dimX, dimY);
		
		this.gravObjects = [this.bird];
		this.walls = [];
  }
  
  Game.prototype.genWall = function(){
    this.walls.push(FlappyBird.Wall.createWall(this.dimX, this.dimY));
  }
	
  Game.prototype.removeWalls = function(){
		for (var i = 0; i < this.walls.length; i++){
			if (this.walls[i].xAxis < 0){
				this.walls.splice(i, 1);
			}
		}
  }
	
  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.dimX, this.dimY);
    this.bird.draw(ctx);
		
		this.walls.forEach(function(wall){
			wall.draw(ctx);
		});
  };

  Game.prototype.gravity = function () {
		var that = this;
		var vel = 50000;
		
		this.gravObjects.forEach(function(obj){
			if (obj.yAxis < -70){
				obj.vy = 0;
				obj.yAxis = -70;
			} else if ((that.dimY - obj.yAxis) > 150){
					obj.vy += vel / Math.pow((that.dimY - obj.yAxis + obj.img.height / 2), 2);
			} else {			
					obj.vy = 0;
					obj.yAxis = that.dimY - 150;
			}
		});
  };
  
	Game.prototype.move = function(){
    this.walls.forEach(function (wall) {
      wall.move();
    });
	}
	
  Game.prototype.start = function (canvasEl) {		
    this.bindKeyHandlers();
    this.step(canvasEl.getContext("2d"));
  };
  
  Game.prototype.stopGame = function () {
    window.clearInterval(this.gameIntervalID);
    window.clearInterval(this.wallIntervalID);
  };
  
  Game.prototype.step = function (ctx) {
    var game = this;
		
    this.gameIntervalID = window.setInterval(function() {
      game.gravity();
      game.draw(ctx);
    }, 5);
		
    this.wallIntervalID = window.setInterval(function() {
			game.genWall();
			game.removeWalls();
    }, 2000);
  };
  
  Game.prototype.bindKeyHandlers = function () {
    var game = this;
    key('up', function(){ game.bird.vy = 0; game.bird.move([0,-2]); game.bird.power([0,-5]) });
    key('right', function(){ game.bird.move([50,0]) });
    key('left', function(){ game.bird.move([-50,0]) });
  };
  
})(this);
