var numberOfBullets = 0;
var activeBullets = [];
var numberOfEnemies = 0;
var activeEnemies = []
var gameHeight = $("#gameScreen").innerHeight();
var gameWidth = $("#gameScreen").innerWidth();

var GameObject = function(x, y, height, width, color, speed, element) {
	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
	this.color = color;
	this.speed = speed;
	this.element = element;
};

// var testArray = []
// testArray[0] = 1;
// testArray[1] = 2;
// console.log(testArray);
// testArray.splice(0, 1);
// console.log(testArray);

// Array of pressed or not-pressed key states
var move = {
	up: false,
	down: false,
	left: false,
	right: false,
	firing: false
};

// Activates Relevant Keys When Pressed
$(document).keydown(function(e) {
	switch(true) {
		case(e.key === "w"):
		move.up = true;
			break;
		case(e.key === "s"):
		move.down = true;
			break;
		case(e.key === "a"):
		move.left = true;
			break;
		case(e.key === "d"):
		move.right = true;
			break;
		case(e.key === "j"):
		move.firing = true;
			break;
		default:
		// console.log("Incorrect Key")
			break;
	}
});

// Deactivates Activated Keys When Released
$(document).keyup(function(e) {
	switch(true) {
		case(e.key === "w"):
		move.up = false;
			break;
		case(e.key === "s"):
		move.down = false;
			break;
		case(e.key === "a"):
		move.left = false;
			break;
		case(e.key === "d"):
		move.right = false;
			break;
		case(e.key === "j"): 
		move.firing = false;
			default:
		// console.log("Incorrect Key")
			break;
	}
});

var loopGame = function() {
	//Player Input
	// console.log(player.x, player.y);
	switch(true) {
		case(move.up && !move.left && !move.right && player.y > 0):
		player.y -= player.speed;
			break;
		case(move.down && !move.left && !move.right && player.y + player.height < gameHeight): 
		player.y += player.speed;
			break;
		case(move.left && !move.up && !move.down && player.x > 0):
		player.x -= player.speed;
			break;
		case(move.right && !move.up && !move.down && player.x + player.width < gameWidth):
		player.x += player.speed;
			break;
		case(move.up && move.right && player.y > 0 && player.x + player.width < gameWidth):
		player.y -= player.speed;
		player.x += player.speed;
			break;
		case(move.up && move.left && player.y > 0 && player.x > 0):
		player.y -= player.speed;
		player.x -= player.speed;
			break;
		case(move.down && move.right && player.y + player.height < gameHeight && player.x + player.width < gameWidth):
		player.y += player.speed;
		player.x += player.speed;
			break;
		case(move.down && move.left && player.y + player.height < gameHeight && player.x > 0):
		player.y += player.speed;
		player.x -= player.speed;
			break;
		default:
		// console.log("Something is wrong");
			break;
	}
	//Update All Positions
	$(player.element).css({"left": player.x, "top": player.y});

	if (activeBullets.length > 0) {
		$.each($('.allyBullet'), function(i, item){
			if (activeBullets[i].y < -20) {
				$(item).hide();
			} else if (activeBullets[i].y < gameHeight) {
				activeBullets[i].y -= activeBullets[i].speed;	
				$(item).css({'top': activeBullets[i].y})
			}
		})
	};
	if (activeEnemies.length > 0) {
		$.each($(".enemy"), function(i, item){
			if (activeEnemies[i].y > gameHeight) {
				$(item).hide();
			} else if (activeEnemies[i].y < gameHeight) {
				console.log(activeEnemies[i].y)
				console.log(gameHeight);
				activeEnemies[i].y += activeEnemies[i].speed;
				$(item).css({"top": activeEnemies[i].y})
			}
		})
	};
	//Check for collisions

	//Update Game State
	if (move.firing) {
		fireBullet();
	};

	//Loop 
	requestAnimationFrame(loopGame);
};

var createPlayer = function() {
	// Makes a new div and stores in playerDiv
	var playerDiv = $('<div>');
	// Sets the playerDiv's ID
	playerDiv.attr("id", "playerShip");
	// Instantiates a new Game object and stores in "player"
	player = new GameObject(gameWidth / 2 - 25	, 500, 50, 50, "blue", 10, playerDiv);
	// Appends the new element to the gameScreen
	$("#gameScreen").append(player.element);
	// Alters the associated element's css properties with the values in the object
	$(player.element).css({"background-color": player.color, "position": "absolute", "left": player.x,
	 "top": player.y, "width": player.width, "height": player.height});
}

var fireBullet = function() {
	var bulletDiv = $('<div>');
	bulletDiv.attr("class", "allyBullet");
	var bullet = new GameObject(player.x + 23, player.y - 16, 20, 5, "red", 10, bulletDiv);
	$("#gameScreen").append(bullet.element);
	$(bullet.element).css({"background-color": bullet.color, "position": "absolute", "left": bullet.x,
	 "top": bullet.y, "width":bullet.width, "height": bullet.height});
	activeBullets.push(bullet);
};

var createEnemy = function() {
	var enemyDiv = $('<div>');
	enemyDiv.attr("class", "enemy");
	var enemy = new GameObject(Math.floor(Math.random() * gameWidth), 0, 50, 80, "purple", 0.5, enemyDiv);
	$("#gameScreen").append(enemy.element);
	$(enemy.element).css({"background-color": enemy.color, "position": "absolute", "left": enemy.x,
	 "top": enemy.y, "width":enemy.width, "height": enemy.height});
	setTimeout(createEnemy, 3000);
	activeEnemies.push(enemy);
};

$(document).ready(function(){
	createPlayer();
	createEnemy();
	requestAnimationFrame(loopGame);
});