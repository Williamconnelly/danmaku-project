var Ship = function(x, y, height, width, color, speed, element) {
	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
	this.color = color;
	this.speed = speed;
	this.element = element;
};

var gameHeight = $("#gameScreen").innerHeight();
var gameWidth = $("#gameScreen").innerWidth();
console.log(gameHeight);
console.log(gameWidth);

var move = {
	up: false,
	down: false,
	left: false,
	right: false,
	firing: false
};

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
	player = new Ship(100, 100, 50, 50, "blue", 10, playerDiv);
	// Appends the new element to the gameScreen
	$("#gameScreen").append(player.element);
	// Alters the associated element's css properties with the values in the object
	$(player.element).css({"background-color": player.color, "position": "absolute", "left": player.x,
	 "top": player.y, "width": player.width, "height": player.height});
}

$(document).ready(function(){
	createPlayer();
	requestAnimationFrame(loopGame);
});