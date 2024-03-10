class StartLevel extends Phaser.Scene {
  constructor() {
    super('StartLevel'); // Pass the scene key as a string
    this.gameState = {
      player: null,
      cursors: null,
      joystick: null,
      buttonA: null,
      buttonB: null,
      buttonC: null,
      isWalking: false
    };
  }

  preload() {
    this.load.spritesheet('soldia_walk', 'assets/player/Walk.png', {
      frameWidth: 128,
      frameHeight: 128
    }); 
    this.load.spritesheet('soldia_idle', 'assets/player/Idle.png', {
      frameWidth: 128,
      frameHeight: 128
    }); 
    this.load.spritesheet('soldia_kneel', 'assets/player/Shot_2.png', {
      frameWidth: 128,
      frameHeight: 128
    });
    this.load.spritesheet('shoot_low', 'assets/player/Shot_1.png', {
      frameWidth: 128,
      frameHeight: 128
    });
    this.load.spritesheet('shoot_high', 'assets/player/Shot_h.png', {
      frameWidth: 128,
      frameHeight: 128
    });
    this.load.image('tiles', 'assets/map/desert.png');
    this.load.image('bg', 'assets/img/bg.png');
    // Load the joystick plugin
    this.load.plugin('rexvirtualjoystickplugin', 'libs/joystick.js', true);
  }

  create() { 
    const gameWidth = this.cameras.main.width;
    const gameHeight = this.cameras.main.height;
    this.bg = this.add.image(0, 0, 'bg').setOrigin(0, 0).setDisplaySize(gameWidth, gameHeight);

    // Define map data
    const level = [
        [0,0,0,0,0,0,0,0,0,0,0,32,33,34,0,0],
        [0,26,0,24,0,0,0,22,0,0,0,0,38,0,0,0],
        [2,2,2,2,2,2,2,2,2, 2,2,2,2,14,2,2]
    ];

    // Create tilemap
    const map = this.make.tilemap({ data: level, tileWidth: 128, tileHeight: 128 });
    const tiles = map.addTilesetImage("tiles");
    this.gameState.groundlayer = map.createLayer(0, tiles, 0, gameHeight-10);
    this.gameState.groundlayer.setCollisionByExclusion([0,24, 26,22,32,33,34,38]); 

    // Scale ground layer
    const scaleFactor = 0.5;
    this.gameState.groundlayer.setScale(scaleFactor);

    
    this.gameState.player = this.physics.add.sprite(300, 100, 'soldia_walk');
    this.physics.world.enable(this.gameState.player);

  
    this.cameras.main.startFollow(this.gameState.player);

    
    const joystickX = 100; 
    const joystickY = gameHeight - 100; 
    this.joystick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: joystickX,
        y: joystickY,
        radius: 50,
        base: this.add.circle(0, 0, 50, 0x888888).setAlpha(0.7), 
        thumb: this.add.circle(0, 0, 25, 0xcccccc).setAlpha(0.7), 
        dir: '8dir',
        debug: false
    });

    this.joystick.on('update', this.handleJoystick, this);
    this.gameState.cursors = this.input.keyboard.createCursorKeys();

    
    this.bg.setScrollFactor(0);

   
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('soldia_walk', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('soldia_idle', { start: 0, end: 6 }), // Sin
        frameRate: 9,
        repeat: -1
    });

    this.anims.create({
        key: 'shoot_2',
        frames: this.anims.generateFrameNumbers('soldia_kneel', { start: 0, end: 0 }),
        frameRate: 8,
        repeat: -1
    }); 
    this.anims.create({
        key: 'shoot_low',
        frames: this.anims.generateFrameNumbers('shoot_low', { start: 0, end: 3 }),
        frameRate: 20,
        repeat: -1
    });
    
    this.anims.create({
        key: 'shoot_high',
        frames: this.anims.generateFrameNumbers('shoot_high', { start: 0, end: 3 }),
        frameRate: 24,
        repeat: -1
    });
    
    this.gameState.player.anims.play('idle');

    
    this.physics.add.collider(this.gameState.groundlayer, this.gameState.player);

   
    const buttonPadding = 20;
const buttonSize = 35;
const buttonY = gameHeight - 100; 
const margin = 50;


this.gameState.buttonB = this.add.circle(gameWidth - buttonPadding - 2 * (buttonSize + margin), buttonY, buttonSize, 0x00ff00).setAlpha(0.7);
this.gameState.buttonA = this.add.circle(gameWidth - buttonPadding - 3 * (buttonSize + margin), buttonY, buttonSize, 0x0000ff).setAlpha(0.7);


this.gameState.buttonA.setScrollFactor(0);
this.gameState.buttonB.setScrollFactor(0);



this.gameState.buttonA.setInteractive();
this.gameState.buttonB.setInteractive();

   
    
    const style = { font: '12px Arial', fill: '#ffffff' };
    const textA = this.add.text(this.gameState.buttonA.x, this.gameState.buttonA.y, 'A', style).setOrigin(0.5);
    const textB = this.add.text(this.gameState.buttonB.x, this.gameState.buttonB.y, 'B', style).setOrigin(0.5);
    

    textA.setScrollFactor(0);
    textB.setScrollFactor(0);
    this.gameState.buttonA.on('pointerup', () => {
        this.gameState.player.anims.play('idle');
    });
    this.gameState.buttonA.on('pointerdown', () => {
        this.gameState.player.anims.play('shoot_low');
    });
    
   

    this.gameState.buttonB.on('pointerdown', () => {
        if (this.gameState.isWalking) {
          this.gameState.player.anims.play('shoot_high');
        } else {
          this.gameState.player.anims.play('shoot_high');
        }
    });
    
    this.gameState.buttonB.on('pointerup', () => {
        if (this.gameState.isWalking) {
          this.gameState.player.anims.play('idle');
        } else {
          this.gameState.player.anims.play('idle');
        }
    });

    



}



  update() {
    
    
  }

  handleJoystick() {
    const speed = 120;
    const leftStick = this.joystick.left;
    const rightStick = this.joystick.right;
    const downStick = this.joystick.down;

    if (leftStick) {
      this.gameState.player.setVelocityX(-speed);
      this.gameState.player.anims.play('walk', true);
      this.gameState.isWalking = true;
      this.gameState.player.setFlipX(true);
    } else if (rightStick) {
      this.gameState.player.setVelocityX(speed);
      this.gameState.player.anims.play('walk', true);
      this.gameState.isWalking = true;
      this.gameState.player.setFlipX(false);
    } else if (downStick) {
         this.gameState.isWalking = false;
       
      this.gameState.player.anims.play('shoot_2', true);
    }else{ 
      this.gameState.isWalking = false;
      this.gameState.player.setVelocityX(0);
      this.gameState.player.anims.play('idle', true);
    }
  }
  
}