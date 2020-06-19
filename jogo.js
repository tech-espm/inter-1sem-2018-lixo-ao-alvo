function jogo() {

	this.preload = function () {
		game.stage.backgroundColor = "#000000";
		game.load.baseURL = "";
		game.load.crossOrigin = "anonymous";

		game.load.spritesheet("papel", "Objetos/papel.png");
		game.load.spritesheet("papel2", "Objetos/papel2.png");
		game.load.spritesheet("papel3", "Objetos/papel3.png");

		game.load.spritesheet("lata", "Objetos/lata.png");
		game.load.spritesheet("lata2", "Objetos/metal2.png");
		game.load.spritesheet("lata3", "Objetos/metal3.png");

		game.load.spritesheet("garrafa", "Objetos/garrafa.png");
		game.load.spritesheet("plast2", "Objetos/plastico2.png");
		game.load.spritesheet("plast3", "Objetos/plastico3.png");

		game.load.spritesheet("lampada", "Objetos/lampada.png");
		game.load.spritesheet("vidro2", "Objetos/vidro2.png");
		game.load.spritesheet("vidro3", "Objetos/vidro3.png");

		game.load.spritesheet("tutorial", "Fundos/tutorial.png");
		game.load.spritesheet("certo", "Fundos/certo.png");
		game.load.spritesheet("errado", "Fundos/errado.png");
		game.load.spritesheet("evidro", "Fundos/evidro.png");
		game.load.spritesheet("emetal", "Fundos/emetal.png");
		game.load.spritesheet("epapel", "Fundos/epapel.png");
		game.load.spritesheet("eplastico", "Fundos/eplastico.png");

		game.load.image("vida1", "Objetos/vida1.png");
		game.load.image("vida2", "Objetos/vida2.png");
		game.load.image("vida3", "Objetos/vida3.png");
		game.load.image("vida4", "Objetos/vida4.png");
		game.load.image("vida5", "Objetos/vida5.png");

		game.load.image("background", "Fundos/Background.png");
		game.load.image("telao", "Fundos/telao.png")
		game.load.image("bola", "Objetos/bola.png");
		game.load.image("balao", "Objetos/balao.png");
		game.load.image("heart", "Fundos/heart.png");
		game.load.spritesheet("barra", "Objetos/Barra.png", 275, 17);
		game.load.spritesheet("pont", "Objetos/Ponteiro.png", 6, 17);
		game.load.spritesheet("cannon", "Objetos/cannonG.png", 138, 136);
		game.load.spritesheet("amarela", "Objetos/Amarelo.png");
		game.load.spritesheet("azul", "Objetos/Azul.png");
		game.load.spritesheet("verde", "Objetos/Verde.png");
		game.load.spritesheet("vermelho", "Objetos/Vermelho.png");
		game.load.spritesheet("tampa", "Objetos/Tampa.png");
		game.load.spritesheet("hitleft", "Objetos/hitbox.png");
		game.load.spritesheet("hitright", "Objetos/hitbox.png");

		game.load.audio('boom', 'Sons/boom.mp3');
		game.load.audio('som', 'Sons/fundo.mp3');
		game.load.audio('correct', 'Sons/certo.mp3');
		game.load.audio('wrong', 'Sons/errado.mp3')
	};

	var cannon, tipoLixo, lixos, barra, pont = 30, selecionar, vida1, vida2, vida3, vida4, vida5,
		balao, minilixo, tampas, tampaAmarela, tampaAzul, tampaVerde, tampaVermelha, score = 0, som, boom, final,
		lixeiras, hitbox, lixeiraAmarela, lixeiraAzul, lixeiraVerde, lixeiraVermelha, scoreText, counter, status, heart,
		verdeleft, verderight, azulleft, azulright, amareloleft, amareloright, vermelholeft, vermelhoright, lixoAtual, telao, tela, correct, wrong;
	var tlixos;

	var bola0, bola1, bola2, bola3, bola4, bola5, bola6, jaClicou;
	var jaAtravessou, jaApertou;
	var gravidade;
	var loc;
	var px, py, fx, t0;
	var distanciaDaRodaAteCanhao, distanciaAteExtremidadeCanhao, // Fixo
		distanciaMaximaBolas, // Fixo
		anguloLixo, vLixo, // Ajustados pelo jogador
		xInicialLixo, yInicialLixo, vxLixo, vyLixo;

	function posicionarBolas() {
		var theta = anguloLixo;

		var c = Math.cos(theta);
		var s = Math.sin(theta);

		var xCentralCanhao = px - (distanciaDaRodaAteCanhao * s);
		var yCentralCanhao = py - (distanciaDaRodaAteCanhao * c);

		xInicialLixo = xCentralCanhao + (distanciaAteExtremidadeCanhao * c);
		yInicialLixo = yCentralCanhao - (distanciaAteExtremidadeCanhao * s);
		vxLixo = vLixo * c;
		vyLixo = -vLixo * s;

		//var tTopo = -vyLixo / gravidade; // Aqui era o tempo até chegar no topo da parábola
		var tTopo = distanciaMaximaBolas / vxLixo;

		var tCada = tTopo / 6;
		var t0 = tCada * 0;
		var t1 = tCada * 1;
		var t2 = tCada * 2;
		var t3 = tCada * 3;
		var t4 = tCada * 4;
		var t5 = tCada * 5;
		var t6 = tCada * 6;

		bola0.body.position.x = xInicialLixo + (vxLixo * t0);
		bola1.body.position.x = xInicialLixo + (vxLixo * t1);
		bola2.body.position.x = xInicialLixo + (vxLixo * t2);
		bola3.body.position.x = xInicialLixo + (vxLixo * t3);
		bola4.body.position.x = xInicialLixo + (vxLixo * t4);
		bola5.body.position.x = xInicialLixo + (vxLixo * t5);
		bola6.body.position.x = xInicialLixo + (vxLixo * t6);

		bola0.body.position.y = yInicialLixo + (vyLixo * t0) + (gravidade * t0 * t0 * 0.5);
		bola1.body.position.y = yInicialLixo + (vyLixo * t1) + (gravidade * t1 * t1 * 0.5);
		bola2.body.position.y = yInicialLixo + (vyLixo * t2) + (gravidade * t2 * t2 * 0.5);
		bola3.body.position.y = yInicialLixo + (vyLixo * t3) + (gravidade * t3 * t3 * 0.5);
		bola4.body.position.y = yInicialLixo + (vyLixo * t4) + (gravidade * t4 * t4 * 0.5);
		bola5.body.position.y = yInicialLixo + (vyLixo * t5) + (gravidade * t5 * t5 * 0.5);
		bola6.body.position.y = yInicialLixo + (vyLixo * t6) + (gravidade * t6 * t6 * 0.5);
		bola6.body.position.y = yInicialLixo + (vyLixo * t6) + (gravidade * t6 * t6 * 0.5);
		bola6.body.position.y = yInicialLixo + (vyLixo * t6) + (gravidade * t6 * t6 * 0.5);
		bola6.body.position.y = yInicialLixo + (vyLixo * t6) + (gravidade * t6 * t6 * 0.5);
	}

	function Atirar() {
		var lixo = game.add.sprite(xInicialLixo, yInicialLixo, tipoLixo);
		lixos.push(lixo);
		game.physics.arcade.enable(lixo);
		lixo.enableBody = true;
		//lixo.checkWorldBounds = true;
		lixo.body.collideWorldBounds = true;
		game.world.bringToTop(lixeiras);
		//lixo.events.onOutOfBounds.add(lixoSaiuDaTela);
		lixo.anchor.x = 0.5;
		lixo.anchor.y = 0.5;
		lixo.body.bounce.set(0.3);
		lixo.body.friction = 0.2;
		lixo.body.velocity.x = vxLixo;
		lixo.body.velocity.y = vyLixo;
		lixo.body.gravity.y = gravidade;
		selecionar = false;
		lixoAtual = tipoLixo;
		removerLixo(minilixo);
	}

	this.create = function () {
		pont = 30;
		score = 0;
		tlixos = ["lampada", "vidro2", "vidro3", "papel", "papel2", "papel3", "lata", "lata2", "lata3", "garrafa", "plast2", "plast3"];
		jaAtravessou = false;
		jaApertou = false;
		gravidade = 2000;
		loc = 30;
		px = 150;
		py = 703;
		fx = 110;
		distanciaDaRodaAteCanhao = 35;
		distanciaAteExtremidadeCanhao = 100; // Fixo
		distanciaMaximaBolas = 200; // Fixo
		anguloLixo = 60;
		vLixo = 1000; // Ajustados pelo jogador

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.setBoundsToWorld();
		game.add.tileSprite(0, 0, 1366, 768, "background");
		telao = game.add.sprite(600, 230, "telao");
		cannon = game.add.sprite(px, py, "cannon");
		balao = game.add.sprite(5, 570, "balao");
		barra = game.add.sprite(30, 745, "barra");
		pont = game.add.sprite(pont, 745, "pont");
		heart = game.add.sprite(1220, 0, "heart");
		vida5 = game.add.sprite(1245, 20, "vida5");
		/*vida1 = game.add.sprite(1250, 0, "vida");
		vida2 = game.add.sprite(1100, 0, "vida");
		vida3 = game.add.sprite(950, 0, "vida");*/
		scoreText = this.add.text(16, 16, "Pontuação: 0", { fontSize: '32px', fill: '#000' });

		lixeiras = game.add.group();
		lixeiraAmarela = lixeiras.create(630, 620, "amarela");
		lixeiraAzul = lixeiras.create(810, 620, "azul");
		lixeiraVerde = lixeiras.create(990, 620, "verde");
		lixeiraVermelha = lixeiras.create(1170, 620, "vermelho");

		hitbox = game.add.group();
		amareloleft = hitbox.create(630, 620, "hitleft");
		amareloright = hitbox.create(725, 617, "hitright");
		azulleft = hitbox.create(810, 620, "hitleft");
		azulright = hitbox.create(905, 617, "hitright");
		verdeleft = hitbox.create(990, 620, "hitleft");
		verderight = hitbox.create(1085, 617, "hitright");
		vermelholeft = hitbox.create(1170, 620, "hitleft");
		vermelhoright = hitbox.create(1265, 617, "hitright");

		tampas = game.add.group();
		tampaAmarela = tampas.create(645, 690, "tampa");
		tampaAzul = tampas.create(825, 690, "tampa");
		tampaVerde = tampas.create(1005, 690, "tampa");
		tampaVermelha = tampas.create(1185, 690, "tampa");


		game.physics.arcade.enable(pont);
		game.physics.arcade.enable(verdeleft);
		game.physics.arcade.enable(verderight);
		game.physics.arcade.enable(amareloleft);
		game.physics.arcade.enable(amareloright);
		game.physics.arcade.enable(azulleft);
		game.physics.arcade.enable(azulright);
		game.physics.arcade.enable(vermelholeft);
		game.physics.arcade.enable(vermelhoright);

		game.physics.arcade.enable(tampaAmarela);
		game.physics.arcade.enable(tampaAzul);
		game.physics.arcade.enable(tampaVerde);
		game.physics.arcade.enable(tampaVermelha);

		var atrito = 5;
		amareloleft.body.friction.set(atrito);
		amareloright.body.friction.set(atrito);
		azulleft.body.friction.set(atrito);
		azulright.body.friction.set(atrito);
		verdeleft.body.friction.set(atrito);
		verderight.body.friction.set(atrito);
		vermelholeft.body.friction.set(atrito);
		vermelhoright.body.friction.set(atrito);

		amareloleft.body.immovable = true;
		amareloright.body.immovable = true;
		azulleft.body.immovable = true;
		azulright.body.immovable = true;
		verdeleft.body.immovable = true;
		verderight.body.immovable = true;
		vermelholeft.body.immovable = true;
		vermelhoright.body.immovable = true;

		tampaAmarela.body.immovable = true;
		tampaAzul.body.immovable = true;
		tampaVerde.body.immovable = true;
		tampaVermelha.body.immovable = true;

		bola0 = game.add.sprite(0, 0, "bola");
		bola1 = game.add.sprite(0, 0, "bola");
		bola2 = game.add.sprite(0, 0, "bola");
		bola3 = game.add.sprite(0, 0, "bola");
		bola4 = game.add.sprite(0, 0, "bola");
		bola5 = game.add.sprite(0, 0, "bola");
		bola6 = game.add.sprite(0, 0, "bola");

		game.physics.arcade.enable(cannon);
		game.physics.arcade.enable(bola0);
		game.physics.arcade.enable(bola1);
		game.physics.arcade.enable(bola2);
		game.physics.arcade.enable(bola3);
		game.physics.arcade.enable(bola4);
		game.physics.arcade.enable(bola5);
		game.physics.arcade.enable(bola6);
		tela = game.add.sprite(610, 240, "tutorial");
		game.time.events.add(Phaser.Timer.SECOND * 2, ApagaTela, this);

		boom = game.add.audio('boom');
		som = game.add.audio('som');
		correct = game.add.audio('correct');
		wrong = game.add.audio('wrong');

		//cannon.body.collideWorldBounds = true;
		//cannon.body.allowRotation = false;
		cannon.anchor.set(49 / 138, 91 / 136);

		bola0.anchor.x = 0.5;
		bola1.anchor.x = 0.5;
		bola2.anchor.x = 0.5;
		bola3.anchor.x = 0.5;
		bola4.anchor.x = 0.5;
		bola5.anchor.x = 0.5;
		bola6.anchor.x = 0.5;
		bola0.anchor.y = 0.5;
		bola1.anchor.y = 0.5;
		bola2.anchor.y = 0.5;
		bola3.anchor.y = 0.5;
		bola4.anchor.y = 0.5;
		bola5.anchor.y = 0.5;
		bola6.anchor.y = 0.5;

		bola0.alpha = 0.7;
		bola1.alpha = 0.6;
		bola2.alpha = 0.5;
		bola3.alpha = 0.4;
		bola4.alpha = 0.3;
		bola5.alpha = 0.2;
		bola6.alpha = 0.1;

		jaClicou = false;
		selecionar = false;
		lixos = [];

		game.sound.setDecodedCallback(som, start, this);
	};

	this.update = function () {
		posicionarBolas();

		if (pont.body.position.x <= 30) {
			pont.body.velocity.x = 300;
		} else if (pont.body.position.x >= 300) {
			pont.body.velocity.x = -300;
		}

		vLixo = pont.body.position.x * 6;
		if (selecionar == false) {
			tipoLixo = this.game.rnd.pick(tlixos);
			selecionar = true;
			minilixo = game.add.sprite(0, 590, tipoLixo);
			minilixo.position.x = (balao.width / 2) - (minilixo.width / 2);
			minilixo.position.y = (balao.position.y) + balao.height / 2 - (minilixo.height / 2); // (minilixo.height/2);
		}

		cannon.rotation = game.physics.arcade.angleToPointer(cannon);
		if (cannon.rotation < -1.2) {
			cannon.rotation = -1.2;
		} else if (cannon.rotation > 0) {
			cannon.rotation = 0;
		}
		anguloLixo = -cannon.rotation;

		if (game.input.mousePointer.isDown) {
			if (!jaClicou && !lixo) {
				boom.play();
				jaClicou = true;
				Atirar();
			}
		} else {
			jaClicou = false;
		}

		if (!game.physics.arcade.overlap(lixos, tampas, lixoAcertouTampa, null, this)) {
			game.physics.arcade.collide(lixos, hitbox, lixoAcertouLixeira, null, this);
		}

		for (var i = 0; i < lixos.length; i++) {
			var lixo = lixos[i];
			if (lixo.body.onFloor()) {
				if (!lixo.processado) {
					lixo.processado = true;
					lixoSaiuDaTela(lixo);
				}
			}
		}
	};

	function start() {
		som.loopFull(0.6);
		//som.onLoop.add();

	}

	function lixoAcertouTampa(lixo, tampa) {
		//som.play();
		removerLixo(lixo);

		if (tampa === tampaAmarela) {
			if (lixoAtual === "lata" || lixoAtual === "lata2" || lixoAtual === "lata3") {
				status = game.add.sprite(610, 240, "certo");
				correct.play();
				game.time.events.add(Phaser.Timer.SECOND * 1, ApagaTela2, this);
				score += 100;
				scoreText.setText('Pontuação: ' + score);
			} else {
				tela = game.add.sprite(610, 240, "emetal");
				wrong.play();
				game.time.events.add(Phaser.Timer.SECOND * 3, ApagaTela, this);
				status = game.add.sprite(610, 240, "errado");
				game.time.events.add(Phaser.Timer.SECOND * 1, ApagaTela2, this);
				if (score <= 0) {
					Errooouu();
				} else {
					score -= 10;
					scoreText.setText('Pontuação: ' + score);
				}

			}
		} else if (tampa === tampaAzul) {
			if (lixoAtual === "papel" || lixoAtual === "papel2" || lixoAtual === "papel3") {
				status = game.add.sprite(610, 240, "certo");
				correct.play();
				game.time.events.add(Phaser.Timer.SECOND * 1, ApagaTela2, this);
				score += 100;
				scoreText.setText('Pontuação: ' + score);
			} else {
				tela = game.add.sprite(610, 240, "epapel");
				wrong.play();
				game.time.events.add(Phaser.Timer.SECOND * 3, ApagaTela, this);
				status = game.add.sprite(610, 240, "errado");
				game.time.events.add(Phaser.Timer.SECOND * 1, ApagaTela2, this);
				if (score <= 0) {
					Errooouu();
				} else {
					score -= 10;
					scoreText.setText('Pontuação: ' + score);
				}
			}
		} else if (tampa === tampaVerde) {
			if (lixoAtual === "lampada" || lixoAtual === "vidro2" || lixoAtual === "vidro3") {
				status = game.add.sprite(610, 240, "certo");
				correct.play();
				game.time.events.add(Phaser.Timer.SECOND * 1, ApagaTela2, this);
				score += 100;
				scoreText.setText('Pontuação: ' + score);
			} else {
				tela = game.add.sprite(610, 240, "evidro");
				wrong.play();
				game.time.events.add(Phaser.Timer.SECOND * 3, ApagaTela, this);
				status = game.add.sprite(610, 240, "errado");
				game.time.events.add(Phaser.Timer.SECOND * 1, ApagaTela2, this);
				if (score <= 0) {
					Errooouu();
				} else {

					score -= 10;
					scoreText.setText('Pontuação: ' + score);
				}
			}
		} else if (tampa === tampaVermelha) {
			if (lixoAtual == "garrafa" || lixoAtual === "plast2" || lixoAtual === "plast3") {
				status = game.add.sprite(610, 240, "certo");
				correct.play();
				game.time.events.add(Phaser.Timer.SECOND * 1, ApagaTela2, this);
				score += 100;
				scoreText.setText('Pontuação: ' + score);
			} else {
				tela = game.add.sprite(610, 240, "eplastico");
				wrong.play();
				game.time.events.add(Phaser.Timer.SECOND * 3, ApagaTela, this);
				status = game.add.sprite(610, 240, "errado");
				game.time.events.add(Phaser.Timer.SECOND * 1, ApagaTela2, this);
				if (score <= 0) {
					Errooouu();
				} else {
					score -= 10;
					scoreText.setText('Pontuação: ' + score);
				}
			}
		}
		lixoAtual = "";

	}

	function ApagaTela() {
		tela.kill();
	}

	function ApagaTela2() {
		status.kill();
	}

	function lixoAcertouLixeira(lixo, lixeira) {
		//lixo.kill();
		//lixo = null;
		fadeOutLixo(lixo);
	}

	function Errooouu() {
		if (vida5 != "morto") {
			vida5.kill();
			vida5 = "morto";
			vida4 = game.add.sprite(1245, 20, "vida4");
		} else if (vida4 != "morto") {
			vida4.kill();
			vida4 = "morto";
			vida3 = game.add.sprite(1245, 20, "vida3");
		} else if (vida3 != "morto") {
			vida3.kill();
			vida3 = "morto";
			vida2 = game.add.sprite(1245, 20, "vida2");
		} else if (vida2 != "morto") {
			vida2.kill();
			vida2 = "morto";
			vida1 = game.add.sprite(1245, 20, "vida1");
		} else if (vida1 != "morto") {
			vida1.kill();
			vida1 = "morto";
			som.stop();
			var modal = document.querySelector('.modal-wrapper');
			modal.style.display = "block";
			document.getElementById("pontos").innerHTML = score;
			var btn = document.querySelector('.jogar-btn');
			btn.addEventListener("click", function (event) {
				event.preventDefault();
				game.state.start("menu");
				modal.style.display = "none";
			})
		}
		/*
		if(vida5 != "morto"){
			vida5.kill();
			vida5 = "morto";
		}else if(vida4 != "morto"){
			vida4.kill();
			vida4 = "morto";
		}else if(vida3 != "morto"){
			vida3.kill();
			vida3 = "morto";
		}else if(vida2 != "morto"){
			vida2.kill();
			vida2 = "morto";
		}else if(vida1 != "morto"){
			vida1.kill();
			var modal = document.querySelector('.modal-wrapper');
			modal.style.display = "block";
			var btn = document.querySelector('.jogar-btn');
			btn.addEventListener("click",function(event){
				event.preventDefault();
				game.state.start("menu");
				modal.style.display = "none";
			})
		}
		*/
	}

	function fadeOutLixo(lixo) {
		var lixoAntigo = lixo;
		game.add.tween(lixoAntigo).to({ alpha: 0 }, 2000, "Linear", true).onComplete.add(function () {
			removerLixo(lixoAntigo);
		});
	}

	function lixoSaiuDaTela(lixo) {
		Errooouu();
		fadeOutLixo(lixo);
	}

	function removerLixo(lixo) {
		lixo.kill();
		for (var i = 0; i < lixos.length; i++) {
			if (lixos[i] === lixo) {
				lixos.splice(i, 1);
				return;
			}
		}
	}
}
