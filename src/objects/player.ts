import BulletGroup from "./bullet-group";
import EnemyGroup from "./enimy-group";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  public keys: any;
  public playerInMotion = { left: false, right: false };
  // public onDestroy: Function | undefined;
  public gameMusic?: Phaser.Sound.BaseSound;
  public mouseDown = false;
  public bulletGroup: BulletGroup;
  public activeTargets: any[] = [];

  constructor(scene: Phaser.Scene) {
    super(scene, scene.cameras.main.width / 2, scene.cameras.main.height, "player");
    this.setScale(3);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.gameMusic = scene.sound.add("game-music");
    this.gameMusic.play();

    this.addMovement();
    this.bulletGroup = new BulletGroup(this.scene);
  }

  public addMovement() {
    this.keys = this.scene.input.keyboard.addKeys("LEFT,RIGHT,SPACE,ENTER");
    this.setCollideWorldBounds(true);
    this.setInteractive();
    this.on("pointermove", (pointer: any) => {
      if (this.mouseDown) {
        this.x = pointer.x;
        this.fireBullets();
      }
    });
    this.on("pointerdown", () => {
      this.mouseDown = true;
    });
    this.on("pointerup", () => {
      this.mouseDown = false;
    });
  }

  public fireBullets() {
    this.bulletGroup.fire(this.x, this.y);
  }

  destroy(): void {
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
    this.gameMusic?.pause();
    this.gameMusic?.destroy();
    super.destroy();
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
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
    if (this.keys.SPACE.isDown) {
      this.bulletGroup.fire(this.x, this.y);
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

  public setGameOverCollider(obj: any, onGameOver: Function) {
    this.scene.physics.add.collider(this, obj, () => {
      onGameOver();
      this.destroy();
    });
  }

  public setBulletCollider(enemies: EnemyGroup) {
    this.scene.physics.add.overlap(enemies, this.bulletGroup, function (enemy, projectile) {
      enemy.destroy();
      projectile.destroy();
    });
  }
}
