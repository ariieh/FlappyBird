(function (root) {
  var FlappyBird = root.FlappyBird = (root.FlappyBird || {});
  
  var Game = FlappyBird.Game = function (dimX, dimY, birdImage, palmImage, vineImage, scoreBox) {
    Game.birdImage = birdImage;
		Game.palmImage = palmImage;
		Game.vineImage = vineImage;
		Game.scoreBox = scoreBox;
		Game.speed = 1500;
		
		this.score = 0;
		
    this.dimX = dimX;
    this.dimY = dimY;
    this.bird = FlappyBird.Bird.createBird(dimX, dimY);
		
		this.gravObjects = [this.bird];
		this.walls = [];
  }
  
  Game.prototype.genBottomWall = function(){
    this.walls.push(FlappyBird.Wall.createBottomWall(this.dimX, this.dimY, Game.palmImage));
  }
	
  Game.prototype.genTopWall = function(){
    this.walls.push(FlappyBird.Wall.createTopWall(this.dimX, this.dimY, Game.vineImage));
  }
	
  Game.prototype.removeWalls = function(){
		for (var i = 0; i < this.walls.length; i++){
			if (this.walls[i].xAxis < -100){
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
					obj.vy += vel / Math.pow((that.dimY - obj.yAxis + obj.img.height / 2), 2.1);
			} else {			
					obj.vy = 0;
					obj.yAxis = that.dimY - 150;
			}
		});
  };
  
	Game.prototype.checkXBounds = function(){
		var game = this;
				
		this.gravObjects.forEach(function(obj){
			if (obj.xAxis < -150){
				obj.vx = 0;
				obj.xAxis = -150;
			} else if(obj.xAxis > game.dimX - 250){
				obj.vx = 0;
				obj.xAxis = game.dimX - 250;
			}
		});
	}
	
	Game.prototype.checkCollisions = function(){
		var bird = this.bird;
		var game = this;
		
		this.walls.forEach(function(wall){
			if (bird.xAxis + bird.xOffset + bird.side > wall.xAxis &&
				  bird.xAxis + bird.xOffset < wall.xAxis + wall.width){
					if (wall.type === "bottom"){
						if (bird.yAxis + bird.yOffset + bird.side > wall.yAxis){
							game.stopGame();
						}
					} else {
						if (bird.yAxis + bird.yOffset < wall.yAxis){
							game.stopGame();
						}
					}
			}
		});
	};
	
  Game.prototype.start = function (canvasEl) {		
    this.bindKeyHandlers();
    this.step(canvasEl.getContext("2d"));
  };
  
  Game.prototype.stopGame = function () {
    window.clearInterval(this.gameIntervalID);
    window.clearInterval(this.wallIntervalID);
		$("#game-over-modal").addClass("active");
  };
	
	Game.prototype.setScore = function(){
		this.score += 1;
		$(Game.scoreBox).html("Score: " + this.score)
	}
	
	Game.prototype.increaseDifficulty = function(){
		if (FlappyBird.Wall.bottomOffset > 50){ FlappyBird.Wall.bottomOffset -= 1; }
		if (FlappyBird.Wall.topOffset > 50){ FlappyBird.Wall.topOffset -= 1; }		
	}
  
  Game.prototype.step = function (ctx) {
    var game = this;
		
    this.gameIntervalID = window.setInterval(function() {
			game.setScore();
      game.gravity();
      game.draw(ctx);
			game.checkXBounds();
      game.checkCollisions();
    }, 5);
		
    this.wallIntervalID = window.setInterval(function() {
			game.genBottomWall();
			game.genTopWall();
			game.removeWalls();
			game.increaseDifficulty();
    }, Game.speed);
  };
  
  Game.prototype.bindKeyHandlers = function () {
    var game = this;
    key('up', function(){ 
			game.bird.vy = 0;
			if (game.bird.yAxis >= game.dimY - 150){
				game.bird.move([0,-100]);
				game.bird.power([0,-3]);
			}
			game.bird.power([0,-3]);
		});
    key('right', function(){ game.bird.power([0.5,0]) });
    key('left', function(){ game.bird.power([-0.5,0]) });
  };
  
})(this);
