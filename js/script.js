var playerPosition;
var speed = 10;
var numberOfBullets = 0;
var bulletSpeed = 4;
var numberOfEnemies = 0;

var move = {
	up: false,
	down: false,
	left: false,
	right: false,
	firing: false
};

var loopGame = function() {
	playerPosition = $("#playerChar").position();
	let x = playerPosition.left;
	let y = playerPosition.top;
	// console.log(playerPosition)
	switch(true) {
		case(move.up && !move.left && !move.right && y > 5.3):
		y -= speed;
			break;
		case(move.down && !move.left && !move.right && y < 640): //584
		y += speed;
			break;
		case(move.left && !move.up && !move.down && x > 5.5):
		x -= speed;
			break;
		case(move.right && !move.up && !move.down && x < 965):
		x += speed;
			break;
		case(move.up && move.right && y > 5.3 && x < 965):
		y -= speed;
		x += speed;
			break;
		case(move.up && move.left && y > 5.3 && x > 5.5):
		y -= speed;
		x -= speed;
			break;
		case(move.down && move.right && y < 640 && x < 965):
		y += speed;
		x += speed;
			break;
		case(move.down && move.left && y < 640 && x > 5.5):
		y += speed;
		x -= speed;
			break;
		default:
		// console.log("Something is wrong");
			break;
	}
	$("#playerChar").css({left: x, top: y});
	requestAnimationFrame(loopGame);
};

$(document).ready(function() {
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
			numberOfBullets +=1;
			// autoFire();
			allyBullet();
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
	createEnemy();
	requestAnimationFrame(loopGame);
});

var allyBullet = function() {
	playerPosition = $("#playerChar").position();
	$("#gameScreen").append("<div class='allyBullet' id='bullet" + numberOfBullets + "'>");
	var idString = "#bullet" + numberOfBullets;
	$(idString).css({left: playerPosition.left + 15, top: playerPosition.top - 20});
	bulletMove(idString, 17);
};	

var bulletMove = function(bulletId, timing) {
	var bulletLocation = $(bulletId).position().top;
	var enemyLocation = $(".enemy").position()
	if (collision($(bulletId), $(".enemy")) === true) {
		$(".enemy").css("background-color", "gray");
		$(bulletId).remove();
	}
	if (bulletLocation > 3) {
		bulletLocation -= bulletSpeed;
		$(bulletId).css({top: bulletLocation});
	} else if (bulletLocation < 3) {
		$(bulletId).remove();
	}
	setTimeout(bulletMove, timing, bulletId);
}; 

var autoFire = function () {
	if (move.firing === true) {
		allyBullet();
		var shoot = setTimeout(autoFire);
	} else {
		clearTimeout(shoot);
	}
};

var collision = function ($div1, $div2) {
    let xcoord1 = $div1.offset().left;
    let ycoord1 = $div1.offset().top;
    let height1 = $div1.outerHeight(true);
    let width1 = $div1.outerWidth(true);
    let side1 = ycoord1 + height1;
    let base1 = xcoord1 + width1;
    let xcoord2 = $div2.offset().left;
    let ycoord2 = $div2.offset().top;
    let height2 = $div2.outerHeight(true);
    let width2 = $div2.outerWidth(true);
    let side2 = ycoord2 + height2;
    let base2 = xcoord2 + width2;

    if (side1 < ycoord2 || ycoord1 > side2 || base1 < xcoord2 || xcoord1 > base2) return false;
    return true;
};

var createEnemy = function () {
	$("#gameScreen").append("<div class='enemy' id='enemy" + numberOfEnemies + "'>");
	var idString = "#enemy" + numberOfEnemies;
	$(idString).css({left: Math.floor(Math.random() * $("#gameScreen").width()) - 50, top: 10});
	moveEnemy(idString, 17);
};

var moveEnemy = function(enemyId, timing) {
	let y = $(enemyId).position().top;
	y += 0.5;
	$(enemyId).css({top: y});
	setTimeout(moveEnemy, timing, enemyId);
};



