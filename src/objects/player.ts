export default class Player extends Phaser.Physics.Arcade.Sprite {
  public keys: any;
  public playerInMotion = { left: false, right: false };
  public onDestroy: Function | undefined;

  constructor(scene: Phaser.Scene) {
    super(scene, scene.cameras.main.width / 2, scene.cameras.main.height, "player");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.keys = scene.input.keyboard.addKeys("LEFT,RIGHT");

    this.setCollideWorldBounds(true);
    this.setInteractive();
    this.on('pointermove', (pointer: any) => {
      this.x = pointer.x;
    });
  }

  public setOnDestroy(onDestroy: Function) {
    this.onDestroy = onDestroy;
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
    this.onDestroy && this.onDestroy();
    super.destroy();
  }

  update(): void {
    if (this.keys.LEFT.isDown) {
      this.move("left");
    }
    if (this.keys.RIGHT.isDown) {
      this.move("right");
    }
    if (this.keys.LEFT.isUp && this.playerInMotion.left) {
      this.stopMotion("left");
    }
    if (this.keys.RIGHT.isUp && this.playerInMotion.right) {
      this.stopMotion("right");
    }
  }

  move(direction: "left" | "right") {
    const sign = direction === "left" ? -1 : 1;
    this.setVelocityX(1000 * sign);
    this.setAccelerationX(100 * sign);
    this.playerInMotion[direction] = true;
  }

  stopMotion(direction: "left" | "right") {
    this.playerInMotion[direction] = false;
    this.setVelocityX(0);
    this.setAccelerationX(0);
  }

  public setGameOverCollider(obj: any) {
    this.scene.physics.add.collider(this, obj, () => {
      this.destroy();
    });
  }
}
