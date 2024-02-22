class StartLevel extends Phaser.Scene {
  constructor() {
    super('StartLevel'); // Pass the scene key as a string
    this.gameState = {
      player: null,
      cursors: null,
      joystick: null,
      buttonA: null,
      buttonB: null,
      buttonC: null
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
    this.load.image('tiles', 'assets/map/desert.png');
    this.load.image('bg', 'assets/img/bg.png');
    // Load the joystick plugin
    this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
  }

  create() { 
    this.add.image(0, 0, 'bg').setOrigin(0,0);
    const level = [[0, 2,2,2,2,2,2,2,2,3]];
    
    const map = this.make.tilemap({ data: level, tileWidth: 128, tileHeight: 128 });
    const tiles = map.addTilesetImage("tiles");
    this.gameState.groundlayer = map.createLayer(0, tiles, 0, this.cameras.main.height - 128);
    
    this.gameState.groundlayer.setCollisionByExclusion([0]);
    const scaleFactor = 0.5;
    this.gameState.groundlayer.setScale(scaleFactor);
    //tembea
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('soldia_walk', { start: 0, end: 6 }),
      frameRate: 10,
      repeat: -1
    });
  
    //simama
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('soldia_idle', { start: 0, end: 6 }),
      frameRate: 10,
      repeat: -1
    });
    //piga
    this.anims.create({
      key: 'shoot_2',
      frames: this.anims.generateFrameNumbers('soldia_kneel', { start: 0, end: 0 }),
      frameRate: 8,
      repeat: -1
    });
    // Create player sprite
    this.gameState.player = this.physics.add.sprite(300, 0, 'soldia_walk');
    //this.gameState.player.setScale(0.96);
    this.gameState.player.anims.play('idle');
    
    this.physics.world.enable(this.gameState.player);
    //this.gameState.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.gameState.groundlayer,this.gameState.player, function(param) {
      console.log("colide")
    });

  
    const joystickX = 100; 
    const joystickY = this.cameras.main.height - 100; 

    // Create the joystick
    this.joystick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
      x: joystickX,
      y: joystickY,
      radius: 50,
      base: this.add.circle(0, 0, 50, 0x888888),
      thumb: this.add.circle(0, 0, 25, 0xcccccc),
      // joystick events
      dir: '8dir',
      // Enable for debug
      debug: false
    });

    // joystick input for player movement
    this.joystick.on('update', this.handleJoystick, this);
    this.gameState.cursors = this.input.keyboard.createCursorKeys();
    

  }

  update() {
    
  }

  handleJoystick() {
    const speed = 100;
    const leftStick = this.joystick.left;
    const rightStick = this.joystick.right;
    const downStick = this.joystick.down;

    if (leftStick) {
      this.gameState.player.setVelocityX(-speed);
      this.gameState.player.anims.play('walk', true);
      this.gameState.player.setFlipX(true);
    } else if (rightStick) {
      this.gameState.player.setVelocityX(speed);
      this.gameState.player.anims.play('walk', true);
      this.gameState.player.setFlipX(false);
    } else if (downStick) {
       this.gameState.player.setVelocityX(0);
      this.gameState.player.anims.play('shoot_2', true);
    }else{
      this.gameState.player.setVelocityX(0);
      this.gameState.player.anims.play('idle', true);
    }
  }
  
}