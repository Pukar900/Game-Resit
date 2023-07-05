var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var score = 0;


function keyup(event) {
	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}

	player.className = 'character stand ' + lastPressed;
}


function move() {
	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	if (downPressed) {
		var newTop = positionTop+1;

		var element = document.elementFromPoint(player.offsetLeft, newTop+32);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk down';
			}
		}
	}
	if (upPressed) {
		var newTop = positionTop-1;

		var element = document.elementFromPoint(player.offsetLeft, newTop);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		}
		
		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk up';
			}
		}
	}
	if (leftPressed) {
		var newLeft = positionLeft-1;

		var element = document.elementFromPoint(newLeft, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';	
		}


		player.className = 'character walk left';
	}
	if (rightPressed) {
		var newLeft = positionLeft+1;
		
		var element = document.elementFromPoint(newLeft+32, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';		
		}

		player.className = 'character walk right';
	}

}


function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
}

function start() {
	var element = document.getElementById('start-btn');
	element.style.display = 'none';
	moveAlien();
  
	var dropInterval = 1000; // Initial delay interval for dropping bombs
	var speedIncrease = 2000000; // Amount to increase the falling speed after each bomb
	var numExplosions = 0; // Counter for the number of explosions

	function dropBomb() {
		// Create a new bomb element
		var bomb = document.createElement('div');
		bomb.className = 'bomb';
		bomb.style.left = document.getElementById('alien').offsetLeft + 'px';
		bomb.style.top = document.getElementById('alien').offsetTop + 'px';
		document.body.appendChild(bomb);

		// Animate the bomb's position
		var position = bomb.offsetTop;
		var explosionOffset = Math.floor(Math.random() * (60 - 10 + 1)) + 10; // Random offset between 10-60 pixels
	
		var animationInterval = setInterval(function() {
			position += 5; // Adjust the initial falling speed
			bomb.style.top = position + 'px';
	
			// Check if the bomb is close to the bottom of the screen
			if (position >= window.innerHeight - 70) { // Adjust the threshold as needed
				clearInterval(animationInterval);
	
				// Create an explosion element
				var explosion = document.createElement('div');
				explosion.className = 'explosion';
				document.body.appendChild(explosion);
				
	
				// Position the explosion element near the bomb
				explosion.style.left = bomb.offsetLeft + 'px';
				explosion.style.top = (position - 0 - explosionOffset) + 'px'; // Adjust the offset as needed
	
				// Remove the bomb and explosion elements after a delay
				setTimeout(function() {
					bomb.remove();
					explosion.remove();
				
    					// Increment the score by 1
    					score++;

    					// Update the score on the screen
    					var scoreElement = document.querySelector('.score');
    					scoreElement.textContent = 'Score: ' + score;


	                       // Check if the explosion hits the player
    var playerElement = document.getElementById('player');
    var playerBounds = playerElement.getBoundingClientRect();
    var explosionBounds = explosion.getBoundingClientRect();

    // Check for collision between the player and explosion
    if (explosionBounds.left < playerBounds.right &&
        explosionBounds.right > playerBounds.left &&
        explosionBounds.top < playerBounds.bottom &&
        explosionBounds.bottom > playerBounds.top) {
        createExplosion();
                hitPlayer();
			} else {
                // Create an explosion element
                createExplosion();
            }
					
				}, 500);
				
				// Increase the falling speed for the next bomb
				dropInterval += speedIncrease;
			}
		}, 20); // Adjust the interval for smoother animation
	}
	function createExplosion() {
		// Create an explosion element
		var explosion = document.createElement('div');
		explosion.className = 'explosion';
		document.body.appendChild(explosion);
	
		// Position the explosion element near the bomb
		explosion.style.left = bomb.offsetLeft + 'px';
		explosion.style.top = (position - 0 - explosionOffset) + 'px'; // Adjust the offset as needed
	
		// Remove the explosion element after a delay
		setTimeout(function() {
			
			explosion.remove();
	
			// Increment the number of explosions
			numExplosions++;
	
			// Print "exploded" in the console
			console.log("Exploded");
	
			// Check if the maximum number of explosions reached
			if (numExplosions === 3) {
				// Decrease player's life by one
				var playerLife = document.querySelector('.life:not([data-hit="true"])');
				if (playerLife) {
					playerLife.setAttribute('data-hit', 'true');
					playerLife.classList.remove('hitted');
				}
	
				// Reset the number of explosions
				numExplosions = 0;
			}
		}, 500);
	}
	
	function hitPlayer() {
		// Decrease player's life by one
		var playerLife = document.querySelector('.life:not([data-hit="true"])');
		if (playerLife) {
			playerLife.setAttribute('data-hit', 'true');
			playerLife.classList.remove('hitted');
		}
	}
	
	setInterval(dropBomb, dropInterval); // Adjust the interval as needed
	
}

  
  var direction = 1; // Initial direction of the alien (1 for right, -1 for left)
  var speed = 4; // Speed of the alien's movement
  var alienPosition = 0; // Current position of the alien
  
  function moveAlien() {
	const alien = document.getElementById("alien");
  
	// Update the position of the alien
	alienPosition += direction * speed;
  
	// Set the new position of the alien
	alien.style.left = alienPosition + "px";
  
	// Check if the alien reaches the left or right edge of the screen
	var screenWidth = window.innerWidth || document.documentElement.clientWidth;
	var alienWidth = alien.offsetWidth;
	var maxPosition = screenWidth - alienWidth;
  
	if (alienPosition >= maxPosition || alienPosition <= 0) {
	  // Change the direction when the alien reaches the edge
	  direction *= -1;
	}

	// Repeat the movement in the next animation frame
	requestAnimationFrame(moveAlien);
  }

  
  function myLoadFunction() {
	timeout = setInterval(move, 2);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
  
	var startBtn = document.getElementById('start-btn');
	startBtn.addEventListener('click', start);
  }
  


document.addEventListener('DOMContentLoaded', myLoadFunction);