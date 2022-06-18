import Enemy from "../objects/enemy";
// import FpsText from "../objects/fpsText";
import Player from "../objects/player";

export default class MainScene extends Phaser.Scene {
  // fpsText: FpsText | undefined;
  public keys: any;
  public player: Player | undefined;
  public enemies: Record<string, Enemy> = {};

  constructor() {
    super({ key: "MainScene" });
  }

  create() {
    this.player = new Player(this);
    const interval = setInterval(() => {
      this.addEnemy();
    }, 2000);
    this.player.setOnDestroy(() => {
      clearInterval(interval);
      this.time.delayedCall(1000, () => {
        this.scene.start("GameOverScene");
      });
    });
  }

  addEnemy() {
    const x = Phaser.Math.Between(0, this.cameras.main.width);
    const speed = Phaser.Math.Between(1, 3);
    const uniqId = Math.random() + " " + Date.now();
    const enemy = new Enemy(this, x, speed, () => {
      delete this.enemies[uniqId];
    });
    if (this.player?.active) {
      this.player?.setGameOverCollider(enemy);
    }
    this.enemies[uniqId] = enemy;
  }

  update() {
    // this.fpsText?.update();
    if (this.player?.active) {
      this.player?.update();
    }
    for (const key in this.enemies) {
      this.enemies[key].update();
    }
  }
}
