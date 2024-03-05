var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Splash , StartLevel
      ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
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
window.addEventListener('load', function() {
  if (window.innerHeight > window.innerWidth) {
    PleaseRotate({
      onlyMobile: true,
      message: "Please rotate your device to landscape mode."
    });
  }
});

window.addEventListener('orientationchange', function() {
      window.location.reload();
    });
