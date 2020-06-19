var telas = ["menu", "jogo"];
var larguraJogo = 1366;
var alturaJogo = 768;

function menu() {
	this.preload = function () {
		game.stage.backgroundColor = "#000000";
		game.load.crossOrigin = "anonymous";

		game.load.image('tela', 'menu/fundo 2.png', 1366, 768);
		game.load.spritesheet('btnPlay', 'menu/botao.png');
		game.load.spritesheet('btnPlayOver', 'menu/botao c.png');
		game.load.spritesheet('jogar', 'menu/jogar.png');

	};

	var btnPlay;
	var btnPlayOver;
	var fundo;
	var jogar;

	var somBotao;

	this.create = function () {

		fundo = game.add.tileSprite(1366, 768, 1366, 768, 'tela');
		//fundo.scale.setTo(0.75, 0.75);
		fundo.anchor.setTo(1.0, 1.0);

		jogar = game.add.image(591, 295, 'jogar');

		btnPlay = game.add.image(638, 350, 'btnPlay');
		//btnPlay.scale.setTo(0.666, 0.666);


		btnPlay.inputEnabled = true;
		btnPlay.events.onInputDown.add(clica, this);



		btnPlay.events.onInputOver.add(clicaOverPlay, this);


		btnPlay.events.onInputOut.add(clicaOutPlay, this);


	};

	function clica() {
		game.state.start("jogo");
	}

	function clicaOverPlay() {
		btnPlayOver = game.add.image(638, 350, 'btnPlayOver');
		//btnPlayOver.scale.setTo(0.666, 0.666);
	}

	function clicaOutPlay() {
		btnPlayOver.kill();
	}
}
