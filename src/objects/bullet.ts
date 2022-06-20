import { blink } from "../helper/flash-el";

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "bullet");
  }

  fire(x: number, y: number) {
    this.body.reset(x, y - 47);
    const fireLight = this.scene.add.sprite(x + 5, y - 47, "fire-light").setOrigin(0.5);
    blink(this.scene, fireLight);
    const shootMusic = this.scene.sound.add("shoot");
    shootMusic.play();
    this.scene.time.delayedCall(300, () => {
      fireLight.destroy();
      shootMusic.pause();
      shootMusic.destroy();
    });
    this.setActive(true);
    this.setVisible(true);
    this.setVelocityY(-900);
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    if (this.y < 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}
