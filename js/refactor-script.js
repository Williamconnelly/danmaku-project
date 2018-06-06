var numberOfBullets = 0;
var activeBullets = [];
var numberOfEnemies = 0;
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
		fireBullet();
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
			activeBullets[i].y -= activeBullets[i].speed;	
			$(item).css({'top': activeBullets[i].y})
		})
	}
	//Check for collisions

	//Update Game State

	//Loop 
	requestAnimationFrame(loopGame);
};

var createPlayer = function() {
	// Makes a new div and stores in playerDiv
	var playerDiv = $('<div>');
	// Sets the playerDiv's ID
	playerDiv.attr("id", "playerShip");
	// Instantiates a new Ship object and stores in "player"
	player = new GameObject(100, 100, 50, 50, "blue", 10, playerDiv);
	// Appends the new element to the gameScreen
	$("#gameScreen").append(player.element);
	// Alters the associated element's css properties with the values in the object
	$(player.element).css({"background-color": player.color, "position": "absolute", "left": player.x,
	 "top": player.y, "width": player.width, "height": player.height});
}

var fireBullet = function() {
	var bulletDiv = $('<div>');
	bulletDiv.attr("class", "allyBullet");
	var bullet = new GameObject(player.x + 23, player.y - 16, 10, 5, "red", 4, bulletDiv)
	$("#gameScreen").append(bullet.element);
	$(bullet.element).css({"background-color": bullet.color, "position": "absolute", "left": bullet.x,
	 "top": bullet.y, "width":bullet.width, "height": bullet.height});
	activeBullets.push(bullet);
};

$(document).ready(function(){
	createPlayer();
	requestAnimationFrame(loopGame);
});