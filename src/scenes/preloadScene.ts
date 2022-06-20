export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    this.load.image("phaser-logo", "assets/img/enemy.png");
    this.load.image("player-outer", "assets/img/ship-outer.png");
    this.load.image("player-gun", "assets/img/ship-gun.png");
    this.load.image("player", "assets/img/ship.png");
    this.load.image("bullet", "assets/img/bullet.png");
    this.load.image("fire-light", "assets/img/fire-light.png");
    this.load.spritesheet("explosion", "assets/img/explosion.png", { frameWidth: 64, frameHeight: 64 });
    this.load.audio("shoot", ["assets/audio/shoot.m4a"]);
    this.load.audio("explosion", ["assets/audio/explosion.mp3"]);
    this.load.audio("game-music", ["assets/audio/game.mp3"]);
    this.load.audio("gameover-music", ["assets/audio/gameover.ogg"]);
  }

  create() {
    this.add
      .text(this.cameras.main.width - 15, this.cameras.main.height - 30, `Loading...`, {
        color: "#fff",
        fontSize: "24px",
      })
      .setOrigin(1, 0);
    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion", { start: 0, end: 23, first: 23 }),
      frameRate: 20,
    });
    this.scene.start("HelloScene");

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
