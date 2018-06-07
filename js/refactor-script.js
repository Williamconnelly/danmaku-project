var player;
var enemy;
var numberOfBullets = 0;
var activeBullets = [];
var numberOfEnemies = 0;
var activeEnemies = [];
var activeEBullets = [];
var gameHeight = $("#gameScreen").innerHeight();
var gameWidth = $("#gameScreen").innerWidth();
var healthBar = $("#healthbar").width();
console.log(healthBar);

var GameObject = function(x, y, height, width, color, speed, health, element) {
	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
	this.color = color;
	this.speed = speed;
	this.element = element;
	this.health = health;
	this.fire = function() {
		enemyShoot(this);
	}
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

var createPlayer = function() {
	// Makes a new div and stores in playerDiv
	var playerDiv = $('<div>');
	// Sets the playerDiv's ID
	playerDiv.attr("id", "playerShip");
	// Instantiates a new Game object and stores in "player"
	player = new GameObject(gameWidth / 2 - 25	, 500, 50, 50, "transparent", 10, 500, playerDiv);
	// Appends the new element to the gameScreen
	$("#gameScreen").append(player.element);
	// Alters the associated element's css properties with the values in the object
	$(player.element).css({"position": "absolute", "left": player.x,
	 "top": player.y, "width": player.width, "height": player.height});
}

var fireBullet = function() {
	var bulletDiv = $('<div>');
	bulletDiv.attr("class", "allyBullet");
	var bullet = new GameObject(player.x + 23, player.y - 16, 5, 5, "red", 10, 0, bulletDiv);
	$("#gameScreen").append(bullet.element);
	$(bullet.element).css({"background-color": bullet.color, "position": "absolute", "left": bullet.x,
	 "top": bullet.y, "width": bullet.width, "height": bullet.height});
	activeBullets.push(bullet);
};

var getRandomNumber = function(min, max) {
	return Math.floor(Math.random() * max) + min;
};

var addFireRate = function () {
	var index = activeEnemies.length -1;
	setInterval(function() {
		activeEnemies[index].fire();
	}, getRandomNumber(1000, 4000));
};

var createEnemy = function() {
	var enemyDiv = $('<div>');
	enemyDiv.attr("class", "enemy");
	// Math.floor(Math.random() * gameWidth
	enemy = new GameObject(getRandomNumber(80, gameWidth - 160), 0, 50, 80, "purple", 0.5, 500, enemyDiv);
	$("#gameScreen").append(enemy.element);
	$(enemy.element).css({"position": "absolute", "left": enemy.x,
	 "top": enemy.y, "width":enemy.width, "height": enemy.height});
	activeEnemies.push(enemy);
	addFireRate();
	setTimeout(createEnemy, 3000);
};

var enemyShoot = function(id) {
	var bulletDiv = $('<div>');
	bulletDiv.attr("class", "eBullet");
		var eBullet = new GameObject(id.x + 40, id.y + 60, 5, 5, "#71f442", 10, 0, bulletDiv);
		$("#gameScreen").append(eBullet.element);
		$(eBullet.element).css({"background-color": eBullet.color, "position": "absolute", "left": eBullet.x,
	 "top": eBullet.y, "width": eBullet.width, "height": eBullet.height});
	activeEBullets.push(eBullet);
};

// Checks for collision between the Player's bullets and the enemy positions
var checkGoodCollision = function() {
	if (activeBullets.length > 0 && activeEnemies.length > 0) {
		for (var i=0; i < activeBullets.length; i++) {
			for (var o=0; o < activeEnemies.length; o++) {
				if (activeBullets[i].x + activeBullets[i].width < activeEnemies[o].x ||
					activeBullets[i].x > activeEnemies[o].x + activeEnemies[o].width ||
					activeBullets[i].y + activeBullets[i].height < activeEnemies[o].y ||
					activeBullets[i].y > activeEnemies[o].y + activeEnemies[o].height) {
					// do nothing
				} else {
					console.log(activeEnemies);
					activeEnemies[o].element.remove();
					activeEnemies.splice(o, 1);
					console.log(activeEnemies);
					// activeBullets[i].element.remove();
					// activeBullets.splice(i, 1);
				}
			}
		}
	}
};

// Checks for collisions between the enemies' bullets and the Player's position
var checkBadCollision = function() {
	if (activeEBullets.length > 0) {
		for (var i=0; i < activeEBullets.length; i++) {
			if (activeEBullets[i].x + activeEBullets[i].width < player.x ||
				activeEBullets[i].x > player.x + player.width ||
				activeEBullets[i].y + activeEBullets[i].height < player.y ||
				activeEBullets[i].y > player.y + player.height) {
				// do nothing
			} else {
				player.health -= 20;
				activeEBullets[i].element.remove();
				activeEBullets.splice(i, 1);
			}
		}
	}
};

var scrollBackground = function() {

};

// update healthbar width by percentage of player.heatlh
var updateHealth = function() {
	if (player.health <= 0) {
		player.health = 0;
	}
	$("#playerhealth").text(player.health);
	$("#healthbar").css("width", healthBar / (player.health / 500));
};

var loopGame = function() {
	//Player Input
	// console.log(player.x, player.y);
	switch(true) {
		case(move.up && !move.left && !move.right && player.y > 0):
		player.y -= player.speed;
			break;
		case(move.down && !move.left && !move.right && player.y + player.height < gameHeight - 3): 
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
		case(move.down && move.right && player.y + player.height < gameHeight - 3 && player.x + player.width < gameWidth):
		player.y += player.speed;
		player.x += player.speed;
			break;
		case(move.down && move.left && player.y + player.height < gameHeight - 3 && player.x > 0):
		player.y += player.speed;
		player.x -= player.speed;
			break;
		default:
		// console.log("Something is wrong");
			break;
	}

	//Update All Positions 

	// Update Player Position
	$(player.element).css({"left": player.x, "top": player.y});
	// Update Player Bullets
	if (activeBullets.length > 0) {
		$.each($('.allyBullet'), function(i, item){
			if (activeBullets[i].y < 5) {
				$(item).hide();
			} else if (activeBullets[i].y < gameHeight) {
				activeBullets[i].y -= activeBullets[i].speed;	
				$(item).css({'top': activeBullets[i].y})
			}
		})
	};
	// Update Positions
	if (activeEnemies.length > 0) {
		$.each($(".enemy"), function(i, item){
			if (activeEnemies[i].y > gameHeight - 50) {
				$(item).hide();
			} else if (activeEnemies[i].y < gameHeight) {
				activeEnemies[i].y += activeEnemies[i].speed;
				$(item).css({"top": activeEnemies[i].y})
			}
		})
	};
	// Update Enemy Bullets
	if (activeEBullets.length > 0) {
		$.each($('.eBullet'), function(i, item){
			if (activeEBullets[i].y > gameHeight) {
				$(item).hide();
			} else if (activeEBullets[i].y < gameHeight) {
				activeEBullets[i].y += activeEBullets[i].speed;	
				$(item).css({'top': activeEBullets[i].y})
			}
		})
	};
	//Check for collisions
	checkGoodCollision();
	checkBadCollision();
	//Update Game State
	if (move.firing) {
		fireBullet();
	};
	if (player.health < 500) {
		updateHealth();
	};
	// if (score > 0) {
	// 	updateScore();
	// };
	//Loop 
	requestAnimationFrame(loopGame);
};

$(document).ready(function(){
	createPlayer();
	createEnemy();
	requestAnimationFrame(loopGame);
});