export default class PhaserLogo extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "phaser-logo");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true)
      .setBounce(0.6)
      .setInteractive()
      .on("pointerdown", () => {
        this.setVelocityY(-400);
      });
  }

  destroy(fromScene?: boolean): void {
    var particles = this.scene.add.particles("spark");
    particles.createEmitter({
      x: this.x,
      y: this.y,
      speed: 200,
    });
    this.scene.time.delayedCall(700, function () {
      particles.destroy();
    });
    super.destroy();
  }
}
