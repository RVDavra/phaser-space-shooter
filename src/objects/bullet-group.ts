import Bullet from "./bullet";

export default class BulletGroup extends Phaser.Physics.Arcade.Group {
  public lastFire = 0;

  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: Bullet,
      frameQuantity: 30,
      active: false,
      visible: false,
      key: "bullet",
    });
  }

  public fire(x: number, y: number) {
    const current = Date.now();
    if (current - this.lastFire >= 100) {
      this.lastFire = current;
      const laser = this.getFirstDead(true);
      if (laser) {
        laser.fire(x, y);
      }
    }
  }
}
