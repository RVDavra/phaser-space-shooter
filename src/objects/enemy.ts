export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  public speed: number = 1;
  public outOfBound = false;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "phaser-logo");
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  startMoving(x: number, y: number) {
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
  }

  update(): void {
    this.y += this.speed;
    if (this.y > this.scene.cameras.main.height + this.height) {
      this.outOfBound = true;
      this.destroy();
    }
  }

  destroy(): void {
    if (!this.outOfBound && this.scene) {
      var boom = this.scene.add.sprite(this.x, this.y, "explosion");
      boom.setScale(1);
      boom.anims.play("explode");
      var explosion = this.scene.game.sound.add("explosion", {
        volume: 0.5,
      });
      explosion.play();
      this.scene.time.delayedCall(700, function () {
        explosion.pause();
        boom.destroy();
        explosion.destroy();
      });
    }
    super.destroy();
  }
}
