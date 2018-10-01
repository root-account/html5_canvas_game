var ctx = document.getElementById('canvas').getContext('2d');

var cH = ctx.canvas.height;
var cW = ctx.canvas.width;

//game pictures
var thePlayer = new Image();
var gameBackground = new Image();
var gameFloor = new Image();

thePlayer.src = 'img/jet.png';
gameBackground.src = 'img/bg2.jpg';
gameFloor.src = 'img/floor.png';

//Pictures of obstacles
var obstacleImg = new Image();
obstacleImg.src = 'img/obs.jpg';

var alive = true;
var flyDirection = 39;
var cruze = true;
var showFuel = true;
var score = 0;
var obsSpeed = 6;
var plyrSpeed = 5;

//Put obstacles at random locations
var obsY = Math.floor(Math.random() * cH);
var obs2Y = Math.floor(Math.random() * cH);
var obs3Y = Math.floor(Math.random() * cH);

//Game objects
var bg = {x:0 , y:-30};
var floor = {x:0 , y:400};

var player = {x:100, y:300, w:100, h:50};

var obstacle = {x:cW, y:obsY, w:300, h:200};
var obstacleA = {x:cW, y:obstacle.y - 400, w:300, h:200};

var obstacle2 = {x:cW + obstacle.w + 300, y:obs2Y, w:300, h:200};
var obstacleB = {x:obstacle2.x, y:obstacle2.y - 400, w:300, h:200};

var obstacle3 = {x:cW + obstacle2.w + 900, y:obs3Y, w:300, h:200};
var obstacleC = {x:obstacle3.x, y:obstacle3.y - 400, w:300, h:200};

//var fuel = {x:obstacle.x + 400, y:200, w:50, h:50};
var fuel = {x:400, y:200, w:50, h:50};

//Function to produce obstacles
function obstacles(){
	function drawObs(){
		ctx.drawImage(obstacleImg, obstacle.x-=obsSpeed, obstacle.y, obstacle.w, obstacle.h);

		if(obstacle.x <= (0 - 500)){
				obstacle.y = Math.floor(Math.random() * cH);
				obstacle.x = cW + obstacle3.w;
		}
	}

	function drawObsA(){
		ctx.drawImage(obstacleImg, obstacleA.x-=obsSpeed, obstacleA.y, obstacleA.w, obstacleA.h);


		if(obstacleA.x <= (0 - 500)){
				obstacleA.y = obstacle.y - 400;
				obstacleA.x = cW + obstacle3.w;
		}
	}

	function drawObs2(){
		ctx.drawImage(obstacleImg, obstacle2.x-=obsSpeed, obstacle2.y, obstacle2.w, obstacle2.h);

		if(obstacle2.x <= (0 - 500)){
				obstacle2.y = Math.floor(Math.random() * cH);
				obstacle2.x = cW + obstacle.w;
		}
	}


	function drawObsB(){
		ctx.drawImage(obstacleImg, obstacleB.x-=obsSpeed, obstacleB.y, obstacleB.w, obstacleB.h);

		if(obstacleB.x <= (0 - 500)){
				obstacleB.y = obstacle2.y - 400;
				obstacleB.x = obstacle2.x;
		}
	}

	function drawObs3(){
		ctx.drawImage(obstacleImg, obstacle3.x-=obsSpeed, obstacle3.y, obstacle3.w, obstacle3.h);

		if(obstacle3.x <= (0 - 500)){
				obstacle3.y = Math.floor(Math.random() * cH);
				obstacle3.x = cW + obstacle2.w;
		}
	}


	function drawObsC(){
		ctx.drawImage(obstacleImg, obstacleC.x-=obsSpeed, obstacleC.y, obstacleC.w, obstacleC.h);

		if(obstacleC.x <= (0 - 500)){
				obstacleC.y = obstacle3.y - 400;
				obstacleC.x = obstacle3.x;
		}
	}

	drawObs();
	drawObsA();
	drawObsB();
	drawObsC();
	drawObs2();
	drawObs3();
}

//Player Function
function drawPlayer(){
	ctx.drawImage(thePlayer, player.x, player.y, player.w, player.h);

		if(flyDirection == 39){
			cruze = false;
		}

		if(flyDirection == 40 && cruze == true){
			player.y+=plyrSpeed;
		}

		if(flyDirection == 38 && cruze == true){
			player.y-=plyrSpeed;
		}
}

//The background
function background(){
	ctx.drawImage(gameBackground, bg.x-=1.2, bg.y, gameBackground.width, 500);

	if(bg.x <= -999){
		bg.x = 0;
	} 
}

//Draw the floor
function drawFloor(){
	ctx.drawImage(gameFloor, floor.x-=11, floor.y+50, gameFloor.width, 100);

	if(floor.x <= -999){
		floor.x = 0;
	} 
}

//Draw the fuel
function drawFuel(){
	if(showFuel){
		ctx.fillStyle = "red";
		ctx.fillRect(fuel.x-=6, fuel.y, fuel.w, fuel.h);
	}
}

//Detect collusions
function collusions(){
	//check if player hits top or bottom of canvas
	if(player.y >= 450){
		thePlayer.src = 'img/rMan.png';
		alive = false;	
	}

	if(player.y <= 0){
		alive = false;
	}
	//Obstacle 1
	if(player.y + player.h >= obstacle.y && 
		player.y <= obstacle.y + obstacle.h && 
		player.x + player.w >= obstacle.x && 
		player.x < obstacle.x + obstacle.w)
	{
		alive = false;
	}

	//Obstacle A
	if(player.y + player.h >= obstacleA.y && 
		player.y <= obstacleA.y + obstacleA.h && 
		player.x + player.w >= obstacleA.x && 
		player.x < obstacleA.x + obstacleA.w)
	{
		alive = false;
	}

	//Obstacle 2
	if(player.y + player.h >= obstacle2.y && 
		player.y <= obstacle2.y + obstacle2.h && 
		player.x + player.w >= obstacle2.x && 
		player.x < obstacle2.x + obstacle2.w)
	{
		alive = false;
	}

	//Obstacle B
	if(player.y + player.h >= obstacleB.y && 
		player.y <= obstacleB.y + obstacleB.h && 
		player.x + player.w >= obstacleB.x && 
		player.x < obstacleB.x + obstacleB.w)
	{
		alive = false;
	}

	//Obstacle 3
	if(player.y + player.h >= obstacle3.y && 
		player.y <= obstacle3.y + obstacle3.h && 
		player.x + player.w >= obstacle3.x && 
		player.x < obstacle3.x + obstacle3.w)
	{
		alive = false;
	}

	//Obstacle C
	if(player.y + player.h >= obstacleC.y && 
		player.y <= obstacleC.y + obstacleC.h && 
		player.x + player.w >= obstacleC.x && 
		player.x < obstacleC.x + obstacleC.w)
	{
		alive = false;
	}

	//Detect collusion with the fuel
	if(player.y + player.h >= fuel.y && 
		player.y <= fuel.y + fuel.h && 
		player.x + player.w >= fuel.x && 
		player.x < fuel.x + fuel.w)
	{
		showFuel = false;
	}
}

//Count the player's score
function countScore(){
	if(player.x == obstacle.x + obstacle.w)
	{
		score++;
	}

	if(player.x == obstacle2.x + obstacle2.w)
	{
		score++;
	}

	if(player.x == obstacle3.x + obstacle3.w)
	{
		score++;
	}
}

/*
var count = 0;
function set(){
	count++;

	if(count == 3)
	{
		alert(count);
		count = 0;
	}

	setTimeout(set, 1000);	
}
set();
*/

//aniFuel();


//Animate the canvas
function animate(){
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	countScore()
	background();
	obstacles();
	drawFloor();
	drawPlayer();
	collusions();

	if(alive)
	{
		requestAnimationFrame(animate);
	}
	else
	{
		ctx.globalAlpha = 0.95;
		ctx.fillStyle = 'black';
		ctx.fillRect(0,0, cW, cH);

		ctx.font = "50px comic sans MS";
		ctx.fillStyle = 'red';
		ctx.fillText("You Crashed!!", cW/2 - 170, cH/2);

		ctx.font = "30px comic sans MS";
		ctx.fillStyle = '#679860';
		ctx.fillText("Score : " + score, (cW/2 - 130) + 50, (cH/2) + 50);

		ctx.font = "20px comic sans MS";
		ctx.fillStyle = 'green';
		ctx.fillText("Press F5 to play again", cW/2 - 130, (cH/2) + 90);
	}

	document.getElementById('score').innerHTML = score;
}

//Event Listner to move the player
window.addEventListener('keydown', function(event){
	var key = event.keyCode;

	if(key == 38 || key == 87){
		cruze = true;
		flyDirection = 38;
	}

	if(key == 40 || key == 83){
		cruze = true;
		flyDirection = 40;
	}

	if(key == 32){
		goingStraight = 39;
		score = score - 1;
		cruze = false;
	}
})


animate();
