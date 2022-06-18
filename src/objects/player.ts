export default class Player extends Phaser.Physics.Arcade.Sprite {
  public keys: any;
  constructor(scene: Phaser.Scene) {
    super(scene, scene.cameras.main.width / 2, scene.cameras.main.height, "player");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.keys = scene.input.keyboard.addKeys("LEFT,RIGHT");
    console.log(this.keys);

    this.setCollideWorldBounds(true);
    this.setInteractive();
  }

  destroy(fromScene?: boolean): void {
    var particles = this.scene.add.particles("spark");
    particles.createEmitter({
      x: this.x,
      y: this.y,
      speed: 200
    });
    this.scene.time.delayedCall(700, function () {
      particles.destroy();
    });
    super.destroy();
  }

  update(): void {
    if (this.keys.LEFT.isDown) {
      console.log("PLeft")
      this.setVelocityX(-100);
    }
    if (this.keys.LEFT.isUp) {
      console.log("PLeftUP")
      this.setVelocityX(0);
    }
    if (this.keys.RIGHT.isDown) {
      console.log("PRight")
      this.setVelocityX(100);
    }
  }
}
