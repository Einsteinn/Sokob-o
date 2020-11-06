var platforms;

function preload() {
    this.load.image('fundo', 'assets/topdownrpg_indoor1.jpg');
    this.load.image('local', 'assets/tile_01.png');
    this.load.image('obstaculo', 'assets/tile_300.png');
    this.load.image('player', 'assets/survivor1_hold.png'); //direita
    this.load.image('player_e', 'assets/survivor1_hold_esquerda.png'); //esquerda
    this.load.image('player_t','assets/survivor1_hold_tras.png');//tras
    this.load.image('player_f', 'assets/survivor1_hold_frente.png'); //frente
    this.load.image('caixa', 'assets/caixa.png');
}

function create() {

    this.add.image(1280/2,720/2, 'fundo').setScale(2.8, 1.7)

    this.data.set('level', 1);
    this.data.set('tempo', "10 min");

    var text = this.add.text(600, 40, '', { font: '24px Courier', fill: '#00ff00' });

    text.setText([
        'Level: ' + this.data.get('level'),
        'Tempo: ' + this.data.get('tempo')
    ]);

    platforms = this.physics.add.staticGroup({
      immovable: true
    });
    platforms.create(110, 200, 'obstaculo').setScale(1,6).refreshBody();
    platforms.create(700, 620, 'obstaculo').setScale(1,9).refreshBody();
    platforms.create(480, 300, 'obstaculo').setScale(1,7).refreshBody();
    platforms.create(265, 365, 'obstaculo').setScale(1,4).refreshBody();

    this.add.image(40, 40, 'local');
    this.add.image(400, 465, 'local');
    this.add.image(260, 40, 'local');
    this.add.image(630, 680, 'local');
    this.add.image(765, 465, 'local');

    var caixas = this.physics.add.group({
        defaultKey: 'caixa',
        setFrictionX: 1,
    });

    caixas.create(40, 340).setFrictionX(0.1).setScale(0.65).setCollideWorldBounds(true).setMaxVelocity(0.1);
    caixas.create(262, 108).setFrictionX(0.1).setScale(0.65).setCollideWorldBounds(true).setMaxVelocity(0.1);
    caixas.create(400, 340).setFrictionX(0.1).setScale(0.65).setCollideWorldBounds(true).setMaxVelocity(0.1);
    caixas.create(800, 250).setFrictionX(0.1).setScale(0.65).setCollideWorldBounds(true).setMaxVelocity(0.1);

    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

    this.player = this.physics.add.image(config.width / 2, config.height / 2, 'player').setScale(1.5, 1.5).setMass(0.1);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(caixas, this.player);
    this.physics.add.collider(caixas, platforms);
    this.physics.add.collider(caixas, caixas);
    this.physics.add.collider(this.player, platforms);

}

function update() {
    let cursors = this.input.keyboard.createCursorKeys();
    
    if ((cursors.left.isDown || this.a.isDown) || (cursors.right.isDown || this.d.isDown)) {
    this.player.setTexture(cursors.left.isDown || this.a.isDown ? 'player_e': 'player');
     this.player.setVelocityX(cursors.left.isDown || this.a.isDown ? -260 : 260); 
    }
    else {
      this.player.setVelocityX(0);
    }
    if ((cursors.up.isDown || this.w.isDown) || (cursors.down.isDown || this.s.isDown)){
      this.player.setTexture(cursors.up.isDown || this.w.isDown ? 'player_f': 'player_t');
      this.player.setVelocityY(cursors.up.isDown || this.w.isDown ? -260 : 260);
    } else {
      this.player.setVelocityY(0);
    }

}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: '#f9f9f9',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    physics: {
        default: 'arcade', // impact
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);