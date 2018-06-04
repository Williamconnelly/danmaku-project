var playerPosition;
var speed = 10;

var move = {
	up: false,
	down: false,
	left: false,
	right: false,
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
		case(move.down && !move.left && !move.right && y < 584):
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
		case(move.down && move.right && y < 584 && x < 965):
		y += speed;
		x += speed;
			break;
		case(move.down && move.left && y < 584 && x > 5.5):
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
			case(e.key === "j" || "j" && "w" || "j" && "s" || "j" && "a" || "j" && "d" ||
			 "j" && "w" && "a" || "j" && "w" && "d" || "j" && "s" && "a" || "j" && "s" && "d"):
			numberOfBullets +=1;
			allyBullet();
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
			default:
			// console.log("Incorrect Key")
				break;
		}
	});
	requestAnimationFrame(loopGame);
});