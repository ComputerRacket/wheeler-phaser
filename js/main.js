//This sets the variable for the spacebar.
var spaceKey;

var ground;
var player;
var obstacle;

//This sets the score to start at -1.
var score = -1;


var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var GAME_CONTAINER_ID = 'gameDiv';

//This is the object which runs the game.
function preload(){
game.load.image('player', 'assets/Halo.png');
game.load.image('ground', 'assets/wallHorizontal.png');
game.load.image('obstacle', 'assets/wallVertical.png');
game.stage.backgroundColor='#1f30b7';
};
function create(){
	scoreText = game.add.text(16, 16, 'score: 0',{ fontSize: '32px', fill: '#000'});
	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	game.physics.startSystem(Phaser.Physics.ARCADE);
	player = game.add.sprite(game.width/8, game.world.height*(3.3/4.5
	), 'player');
	player.scale.setTo(0.4,0.4);
	game.physics.arcade.enable(player);
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 600;

	obstacle = game.add.sprite(700,game.world.height, 'obstacle');
	obstacle.scale.setTo(1,1);
	obstacle.anchor.setTo(0,1);
	game.physics.arcade.enable(obstacle);
	obstacle.body.immovable = true;


	


	platforms = game.add.group();
	platforms.enableBody = true;

	ground = platforms.create(0, GAME_HEIGHT, 'ground');
	ground.anchor.setTo(0,1);
	ground.scale.setTo(4,1);
	game.physics.arcade.enable(ground);
	ground.body.immovable = true;
};

function update(){
	if (obstacle.x < 5 && player.x > 5){
		score++;
		scoreText.text = 'score: ' + score;
		if (player.x < 0){
			scoreText = game.add.text(350,200, 'You Lose!', {fill: '#ff0000'});
			obstacle.kill();
			player.kill();
		}
	}
	game.physics.arcade.collide(player, ground);
	game.physics.arcade.collide(player, obstacle);
	if (obstacle.x < 0) {
		obstacle.kill();
		obstacle = game.add.sprite(900, GAME_HEIGHT, 'obstacle');
		obstacle.scale.setTo(1,1);
		obstacle.anchor.setTo(0,1);
		game.physics.arcade.enable(obstacle);
		obstacle.body.immovable = true;
	}
	if (obstacle.x > 600) {
		obstacle.x -= 0.05;
	}
	if(spaceKey.isDown) {
	player.body.velocity.y = -300;
   }
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, update: update, create: create });
 
game.state.start();