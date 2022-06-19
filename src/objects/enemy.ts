export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  public speed: number = 1;
  public onDestroyCallback: Function;
  public outOfBound = false;
  constructor(scene: Phaser.Scene, x: number, speed: number, onDestroyCallback: Function) {
    super(scene, x, 0, "phaser-logo");
    this.onDestroyCallback = onDestroyCallback;
    this.speed = speed;
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  update(): void {
    this.y += this.speed;
    if (this.y > this.scene.cameras.main.height + this.height) {
      this.outOfBound = true;
      this.destroy();
    }
  }

  destroy(): void {
    if (!this.outOfBound) {
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
    this.onDestroyCallback();
    super.destroy();
  }
}
