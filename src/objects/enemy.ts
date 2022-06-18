export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  public speed: number = 1;
  public onDestroyCallback: Function;
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
      this.destroy();
    }
  }

  destroy(): void {
    if (this.active) {
      var particles = this.scene.add.particles("spark");
      particles.createEmitter({
        x: this.x,
        y: this.y,
        speed: 200,
      });
      this.scene.time.delayedCall(700, function () {
        particles.destroy();
      });
      this.onDestroyCallback();
      super.destroy();
    }
  }
}
