import Enemy from "./enemy";

export default class EnemyGroup extends Phaser.Physics.Arcade.Group {
  public lastFire = 0;

  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: Enemy,
      frameQuantity: 30,
      active: false,
      visible: false,
      key: "enemy",
    });
  }

  public generateNew(x: number, y: number) {
    const current = Date.now();
    if (current - this.lastFire >= 100) {
      this.lastFire = current;
      const enemy = this.getFirstDead(true);
      if (enemy) {
        enemy.startMoving(x, y);
      }
    }
  }
}
