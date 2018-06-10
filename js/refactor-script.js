var player;
var enemy;
var numberOfBullets = 0;
var enemiesDefeated = 0;
var activeBullets = [];
var activeEnemies = [];
var activeEBullets = [];
var gameHeight = $("#gameScreen").innerHeight();
var gameWidth = $("#gameScreen").innerWidth();
var healthBar = $("#healthbar").width();
var score = 0;
var highScore = 0;
var loopHandle;
var shootHandle;
var spawnHandle;
var gameTime = 0;
var spawnTimer = 3000;
var gameOn = false;
var gamePlayed = false;
var secondPlayer = false;
var activePowerUps = [];
var boost = false;

var GameObject = function(x, y, height, width, color, speed, health, element, trajectory) {
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
	this.trajectory = trajectory;
};

// Boolean array of pressed or not-pressed key states. When true, a movement command is issued.
var move = {
	up: false,
	down: false,
	left: false,
	right: false,
	firing: false
};

var move2 = {
	up: false,
	down: false,
	left: false,
	right: false,
	firing: false
};

// Activates Relevant Keys When Pressed
$(document).keydown(function(e) {
	switch(true) {
		// Player 1 Movement
		case(e.key.toLowerCase() === "w"):
		move.up = true;
			break;
		case(e.key.toLowerCase() === "s"):
		move.down = true;
			break;
		case(e.key.toLowerCase() === "a"):
		move.left = true;
			break;
		case(e.key.toLowerCase() === "d"):
		move.right = true;
			break;
		case(e.key.toLowerCase() === "j"):
		move.firing = true;
			break;
		default:
		// console.log("Incorrect Key")
			break;
	}
	switch(true) {
		// Player 2 Movement
		case(e.key.toLowerCase() === "arrowup"):
		e.preventDefault();
		move2.up = true;
			break;
		case(e.key.toLowerCase() === "arrowdown"):
		e.preventDefault();
		move2.down = true;
			break;
		case(e.key.toLowerCase() === "arrowleft"):
		e.preventDefault();
		move2.left = true;
			break;
		case(e.key.toLowerCase() === "arrowright"):
		e.preventDefault();
		move2.right = true;
			break;
		case(e.key.toLowerCase() === "l"):
		// e.preventDefault();
		move2.firing = true;
			break;
		default:
		// console.log("Incorrect Key")
			break;
	}
});

// Deactivates Activated Keys When Released
$(document).keyup(function(e) {
	switch(true) {
		// Player 1 Movement
		case(e.key.toLowerCase() === "w"):
		move.up = false;
			break;
		case(e.key.toLowerCase() === "s"):
		move.down = false;
			break;
		case(e.key.toLowerCase() === "a"):
		move.left = false;
			break;
		case(e.key.toLowerCase() === "d"):
		move.right = false;
			break;
		case(e.key.toLowerCase() === "j"): 
		move.firing = false;
			break;
		default:
		// console.log("Incorrect Key")
			break;
	}
	switch(true) {
		// Player 2 Movement
		case(e.key.toLowerCase() === "arrowup"):
		move2.up = false;
			break;
		case(e.key.toLowerCase() === "arrowdown"):
		move2.down = false;
			break;
		case(e.key.toLowerCase() === "arrowleft"):
		move2.left = false;
			break;
		case(e.key.toLowerCase() === "arrowright"):
		move2.right = false;
			break;
		case(e.key.toLowerCase() === "l"): 
		move2.firing = false;
			break;
		default:
		// console.log("Incorrect Key")
			break;
	}
});

var createPlayer = function() {
	// Creates a new div
	var playerDiv = $('<div>');
	// Sets the new div's id
	playerDiv.attr("id", "playerShip");
	// Creates a new Game Object for the Player
	player = new GameObject(gameWidth / 2 - 25	, 500, 50, 50, "transparent", 10, 500, playerDiv);
	// Appends the div to the game screen
	$("#gameScreen").append(player.element);
	// Sets the appended div's properties to those of the Player's
	$(player.element).css({"position": "absolute", "left": player.x,
	 "top": player.y, "width": player.width, "height": player.height});
};

var createPlayer2 = function () {
	var playerDiv = $('<div>');
	playerDiv.attr("id", "player2Ship");
	player2 = new GameObject(gameWidth / 2 + 100, 500, 50, 50, "transparent", 10, 500, playerDiv);
	$("#gameScreen").append(player2.element);
	$(player2.element).css({"position": "absolute", "left": player2.x,
	 "top": player2.y, "width": player2.width, "height": player2.height});
};

var fireBullet = function() {
	if (boost === false) {
		var bulletColor = "#FF0000";
		var bulletWidth = 5;
		var bulletHeight = 5;
	} else {
		var bulletColor = getRandomColor;
		var bulletWidth = 5;
		var bulletHeight = 20;
	};
	if (player.health > 0) {
		numberOfBullets += 1;
		var bulletDiv = $('<div>');
		bulletDiv.attr("class", "playerBullet");
		var bullet = new GameObject(player.x + 23, player.y - 16, bulletHeight, bulletWidth, bulletColor, 10, 0, bulletDiv);
		$("#gameScreen").append(bullet.element);
		$(bullet.element).css({"background-color": bullet.color, "position": "absolute", "left": bullet.x,
		 "top": bullet.y, "width": bullet.width, "height": bullet.height});
		activeBullets.push(bullet);
	}
};

var fireBullet2 = function() {
	if (boost === false) {
		var bulletColor = "#0059FF";
		var bulletWidth = 5;
		var bulletHeight = 5;
	} else {
		var bulletColor = getRandomColor;
		var bulletWidth = 5;
		var bulletHeight = 20;
	};
	if (player2.health > 0) {
		numberOfBullets += 1;
		var bulletDiv = $('<div>');
		bulletDiv.attr("class", "player2Bullet");
		var bullet = new GameObject(player2.x + 23, player2.y - 16, bulletHeight, bulletWidth, bulletColor, 10, 0, bulletDiv);
		$("#gameScreen").append(bullet.element);
		$(bullet.element).css({"background-color": bullet.color, "position": "absolute", "left": bullet.x,
		 "top": bullet.y, "width": bullet.width, "height": bullet.height});
		activeBullets.push(bullet);
	}
};

var getRandomNumber = function(min, max) {
	return Math.floor(Math.random() * max) + min;
};

var getRandomColor = function() {
	var rainbow = ["#ADD5F7", "#FFFFFF"]
	let randomColor = Math.floor(Math.random() * rainbow.length);
	return rainbow[randomColor];
};

var addFireRate = function () {
	var index = activeEnemies.length -1;
	shootHandle = setInterval(function() {
		activeEnemies[index].fire();
	}, getRandomNumber(1000, 3000));
};

var createEnemy = function() {
	var enemyDiv = $('<div>');
	enemyDiv.attr("class", "enemy");
	enemy = new GameObject(getRandomNumber(80, gameWidth - 160), 0, 60, 70, "transparent", 0.5, 500, enemyDiv);
	$("#gameScreen").append(enemy.element);
	$(enemy.element).css({"position": "absolute", "left": enemy.x,
	 "top": enemy.y, "width":enemy.width, "height": enemy.height});
	activeEnemies.push(enemy);
	addFireRate();
	spawnHandle = setTimeout(createEnemy, spawnTimer);
};

var enemyShoot = function(id) {
	if (gameTime < 1500) {
		var randomBullet = 1;
	} else {
		var randomBullet = Math.floor(Math.random() * 3) + 1;
	}
	var bulletDiv = $('<div>');
	bulletDiv.attr("class", "eBullet");
		var eBullet = new GameObject(id.x + 40, id.y + 60, 10, 5, "#71f442", 10, 0, bulletDiv, randomBullet);
		$("#gameScreen").append(eBullet.element);
		$(eBullet.element).css({"background-color": eBullet.color, "position": "absolute", "left": eBullet.x,
	 "top": eBullet.y, "width": eBullet.width, "height": eBullet.height});
	activeEBullets.push(eBullet);
};

var createPowerUp = function() {
	var powerDiv = $('<div>');
	powerDiv.attr("class", "powerUp");
	powerUp = new GameObject(getRandomNumber(80, gameWidth - 160), 0, 50, 50, "transparent", 0.5, 5000, powerDiv);
	$("#gameScreen").append(powerUp.element);
	$(powerUp.element).css({"position": "absolute", "left": powerUp.x,
	 "top": powerUp.y, "width":powerUp.width, "height": powerUp.height});
	activePowerUps.push(powerUp);
};

var deactivatePowerUp = function() {
	setTimeout(function() {
		boost = false;
	}, 10000)
}

// Checks for collision between the Player's bullets and the enemy positions
var checkGoodCollision = function() {
	if (activeBullets.length > 0 && activeEnemies.length > 0) {
		activeBullets.forEach(function(bulletItem, i) { 
			activeEnemies.forEach(function(enemyItem, o) {
				if (bulletItem.x + bulletItem.width < enemyItem.x ||
					bulletItem.x > enemyItem.x + enemyItem.width ||
					bulletItem.y + bulletItem.height < enemyItem.y ||
					bulletItem.y > enemyItem.y + enemyItem.height) {
						return false;
				} else {
					bulletItem.element.remove();
					activeBullets.splice(i, 1);
					if (boost === false) {
						enemyItem.health -= 50;
					} else {
						enemyItem.health -= 80;
					}
					if (enemyItem.health <= 0) {
						enemyItem.element.remove();
						activeEnemies.splice(o, 1);
						clearInterval(shootHandle);
						score += 100;
						enemiesDefeated +=1;
					}
				}
			}) 
		})
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
			} else if (player.health > 0) {
				player.health -= 50;
				activeEBullets[i].element.remove();
				activeEBullets.splice(i, 1);
			}
		}
	}
};

var checkBadCollision2 = function() {
	if (activeEBullets.length > 0 && secondPlayer === true) {
		for (var i=0; i < activeEBullets.length; i++) {
			if (activeEBullets[i].x + activeEBullets[i].width < player2.x ||
				activeEBullets[i].x > player2.x + player2.width ||
				activeEBullets[i].y + activeEBullets[i].height < player2.y ||
				activeEBullets[i].y > player2.y + player2.height) {
				// do nothing
			} else if (player2.health > 0) {
				player2.health -= 50;
				activeEBullets[i].element.remove();
				activeEBullets.splice(i, 1);
			}
		}
	}
};

var checkPowerCollision = function() {
	if (activePowerUps.length > 0) {
		for (var i=0; i < activePowerUps.length; i++) {
			if (activePowerUps[i].x + activePowerUps[i].width < player.x ||
				activePowerUps[i].x > player.x + player.width ||
				activePowerUps[i].y + activePowerUps[i].height < player.y ||
				activePowerUps[i].y > player.y + player.height) {
					return false;
			} else if (player.health > 0) {
				boost = true;
				deactivatePowerUp();
				activePowerUps[i].element.remove();
				activePowerUps.splice(i, 1);
			}
		}
	};	
};

var checkPowerCollision2 = function () {
	if (activePowerUps.length > 0 && secondPlayer === true) {
		console.log("working");
		for (var i=0; i < activePowerUps.length; i++) {
			if (activePowerUps[i].x + activePowerUps[i].width < player2.x ||
				activePowerUps[i].x > player2.x + player2.width ||
				activePowerUps[i].y + activePowerUps[i].height < player2.y ||
				activePowerUps[i].y > player2.y + player2.height) {
					return false;
			} else if (player2.health > 0) {
				boost = true;
				deactivatePowerUp();
				activePowerUps[i].element.remove();
				activePowerUps.splice(i, 1);
			}
		}
	}
};

var scrollBackground = function() {

};

var endGame = function() {
	window.cancelAnimationFrame(loopHandle);
	clearInterval(shootHandle);
	clearTimeout(spawnHandle);
	if (score >= highScore) {
		$("#newScore").removeClass("removeDisplay");
	}
	$("#gameOver").removeClass("removeDisplay");
	$("#endstats").removeClass("removeDisplay");
	$("#endtime").removeClass("removeDisplay").text("Time-Count: " + gameTime);
	$("#endkill").removeClass("removeDisplay").text("Enemies Defeated: " + enemiesDefeated);
	$("#endshot").removeClass("removeDisplay").text("Bullets Shot: " + numberOfBullets);
	$("#replayButton").removeClass("removeDisplay");
	$("#gameScreen").append("")
	boost = false;
	gamePlayed = true;
};

var resetGame = function() {
	numberOfBullets = 0;
	enemiesDefeated = 0;
	activeEnemies = [];
	activeBullets = [];
	activeEBullets = [];
	gameTime = 0;
	score = 0;
	spawnTimer = 3000;
	player.health = 500;
	boost = false;
	$("#playerhealth").text(player.health);
	$("#healthbar").css("width", healthBar * (player.health / 500));
	$("#player2health").text(player.health);
	$("#p2healthbar").css("width", healthBar * (player.health / 500));
	$("#highscore").css("color", "white")
	$("#playerscore").text(score);
	$("#newScore").addClass("removeDisplay");
	$("#replayButton").addClass("removeDisplay");
	$("#gameOver").addClass("removeDisplay");
	$("#gameScreen").empty();
	$("#gameScreen").append("<div id='gameOver' class='removeDisplay'><h1>Game Over</h1></div>");
	gamePlayed = false;
	startGame();
};

// update healthbar width by percentage of player.heatlh
var updateHealth = function() {
	$("#playerhealth").text(player.health);
	$("#healthbar").css("width", healthBar * (player.health / 500));
	if (secondPlayer === true) {
		$("#player2health").text(player2.health);
		$("#p2healthbar").css("width", healthBar * (player2.health / 500));
	};
};

var updateScore = function() {
	$("#playerscore").text(score);
	if (score > highScore) {
		highScore = score;
		$("#highscore").css("color", "#13B619").text(highScore);
	}
};

// Increments the gameTime each loop, changes time display, and governs enemy spawn rate based on the game's length.
var updateTime = function() {
	gameTime += 1;
	$("#gametime").text(gameTime);
	if (gameTime > 1000) {
		spawnTimer = 1000;
	} else if (gameTime > 3000) {
		spawnTimer = 500;
	} else if (gameTime > 6000) {
		spawnTimer = 300;
	}
};

var startGame = function() {
	$("#instructions").addClass("removeDisplay");
	$("#startButton").addClass("removeDisplay");
	$("#instructions").removeClass("gridclass");
	$("#gameScreen").removeClass("removeDisplay");
	$("#player2-information").addClass("removeDisplay");
	$("#join-button").addClass("removeDisplay");

	createPlayer();
	if (secondPlayer === true) {
		createPlayer2();
	};
	createEnemy();
	loopHandle = requestAnimationFrame(loopGame);
	$("#highscore").text(highScore);
};

var loopGame = function() {
	//Player Input
	switch(true) {
		// Player 1 Movement
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
	};
	// Player 2 Movement
	if (secondPlayer === true) {
		switch(true) {
			case(move2.up && !move2.left && !move2.right && player2.y > 0):
			player2.y -= player2.speed;
				break;
			case(move2.down && !move2.left && !move2.right && player2.y + player2.height < gameHeight - 3): 
			player2.y += player2.speed;
				break;
			case(move2.left && !move2.up && !move2.down && player2.x > 0):
			player2.x -= player2.speed;
				break;
			case(move2.right && !move2.up && !move2.down && player2.x + player2.width < gameWidth):
			player2.x += player2.speed;
				break;
			case(move2.up && move2.right && player2.y > 0 && player2.x + player2.width < gameWidth):
			player2.y -= player2.speed;
			player2.x += player2.speed;
				break;
			case(move2.up && move2.left && player2.y > 0 && player2.x > 0):
			player2.y -= player2.speed;
			player2.x -= player2.speed;
				break;
			case(move2.down && move2.right && player2.y + player2.height < gameHeight - 3 && player2.x + player2.width < gameWidth):
			player2.y += player2.speed;
			player2.x += player2.speed;
				break;
			case(move2.down && move2.left && player2.y + player2.height < gameHeight - 3 && player2.x > 0):
			player2.y += player2.speed;
			player2.x -= player2.speed;
				break;
			default:
			// console.log("Something is wrong");
				break;
		};
	}

	//Update All Positions 

	// Update Player Positions
	$(player.element).css({"left": player.x, "top": player.y});
	if (secondPlayer === true) {
		$(player2.element).css({"left": player2.x, "top": player2.y});
	}
	// Update Player Bullets
	if (activeBullets.length > 0) {
		for (let i=0; i < activeBullets.length; i++) {
			if (activeBullets[i].y < 5) {
				activeBullets[i].element.remove();
				activeBullets.splice(i, 1);
			} else if (activeBullets[i].y < gameHeight) {
				activeBullets[i].y -= activeBullets[i].speed;	
				activeBullets[i].element.css({'top': activeBullets[i].y})
			}
		}
	};
	// Update Positions
	if (activeEnemies.length > 0) {
		for (let i=0; i < activeEnemies.length; i++) {
			if (activeEnemies[i].y > gameHeight - 50) {
				activeEnemies[i].element.remove();
				activeEnemies.splice(i, 1);
			} else if (activeEnemies[i].y < gameHeight) {
				activeEnemies[i].y += activeEnemies[i].speed;
				activeEnemies[i].element.css({"top": activeEnemies[i].y})
			}
		}
	};
	// Update Enemy Bullets
	if (activeEBullets.length > 0) {
		for (let i=0; i < activeEBullets.length; i++) {
			if (activeEBullets[i].y > gameHeight - 20 || activeEBullets[i].x < 0 || activeEBullets[i].x > gameWidth) {
				activeEBullets[i].element.remove();
				activeEBullets.splice(i, 1);
			} else if (activeEBullets[i].y < gameHeight) {
				if (activeEBullets[i].trajectory === 1) {
					activeEBullets[i].y += activeEBullets[i].speed;
				} else if (activeEBullets[i].trajectory === 2) {
					activeEBullets[i].y += activeEBullets[i].speed;
					activeEBullets[i].x -= activeEBullets[i].speed / 2;
				} else {
					activeEBullets[i].y += activeEBullets[i].speed;
					activeEBullets[i].x += activeEBullets[i].speed / 2;
				}
				activeEBullets[i].element.css({'top': activeEBullets[i].y, "left": activeEBullets[i].x})
			}
		}
	};
	// Update Power-Ups
	if (activePowerUps.length > 0) {
		for (let i=0; i < activePowerUps.length; i++) {
			if (activePowerUps[i].y > gameHeight - 50) {
				activePowerUps[i].element.remove();
				activePowerUps.splice(i, 1);
			} else if (activePowerUps[i].y < gameHeight) {
				activePowerUps[i].y += activePowerUps[i].speed;
				activePowerUps[i].element.css({"top": activePowerUps[i].y})
			}
		}
	};

	//Check for collisions
	checkGoodCollision();
	checkBadCollision();
	checkBadCollision2();
	checkPowerCollision();
	checkPowerCollision2();
	//Update Game State
	updateTime();
	if (move.firing) {
		fireBullet();
	};
	if (move2.firing) {
		fireBullet2();
	}
	if (secondPlayer === true) {
		if (player.health < 500 || player2.health < 500) {
			updateHealth();
		}
	} else {
		if (player.health < 500) {
			updateHealth();
		}
	};
	if (gameTime === 2000) {
		createPowerUp();
	} else if (gameTime === 4000) {
		createPowerUp();
	} else if (gameTime === 6000) {
		createPowerUp();
	} else if (gameTime === 8000) {
		createPowerUp();
	};
	if (score > 0) {
		updateScore();
	};
	//Loop 
	loopHandle = requestAnimationFrame(loopGame);
	if (secondPlayer === true) {
		if (player.health <= 0 && player2.health > 0) {
			player.element.remove();
		} else if (player.health > 0 && player2.health <= 0) {
			player2.element.remove();
		} else if (player.health <= 0 && player2.health <= 0) {
			player.health = 0;
			player2.health = 0;
			window.cancelAnimationFrame(loopHandle);
			endGame();
		}
	} else if (player.health <= 0) {
		player.health = 0;
		window.cancelAnimationFrame(loopHandle);
		endGame();
	};
};

$(document).ready(function(){
	$(document).on("keypress", function(e) {
		if (e.key === "Enter" && gameOn === false) {
			gameOn = true;
			startGame();
		} else if (e.key === "Enter" && gamePlayed === true) {
			resetGame();
		} else if (e.key.toLowerCase() === "p" && gameOn === false) {
			secondPlayer = true;
			$("#p2healthbar").removeClass("removeDisplay");
			$("#player2health").removeClass("removeDisplay");
			$("#player2-information").removeClass("removeDisplay");
			$("#join-button").css("animation", "glow 2000ms infinite").text("Player 2 READY!");
			$("#join-button").css({"padding-top": "18%"});
		}
	});
	console.log("ready");
});