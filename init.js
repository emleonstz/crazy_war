var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        StartLevel
      ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    }
};

var game = new Phaser.Game(config);

function resize() {
    var canvas = game.canvas;
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;

    if (windowRatio < gameRatio) {
        canvas.width = windowWidth;
        canvas.height = windowWidth / gameRatio;
    } else {
        canvas.width = windowHeight * gameRatio;
        canvas.height = windowHeight;
    }
}
