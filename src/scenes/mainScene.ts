import EnemyGroup from "../objects/enimy-group";
// import FpsText from "../objects/fpsText";
import Player from "../objects/player";

export default class MainScene extends Phaser.Scene {
  // fpsText: FpsText | undefined;
  public keys: any;
  public player: Player | undefined;
  public enemies?: EnemyGroup;

  constructor() {
    super({ key: "MainScene" });
  }

  create() {
    this.player = new Player(this);
    this.enemies = new EnemyGroup(this);
    const interval = setInterval(() => {
      this.addEnemy();
    }, 2000);
    this.player.setGameOverCollider(this.enemies, () => {
      clearInterval(interval);
      this.time.delayedCall(1000, () => {
        this.scene.start("GameOverScene");
      });
    });
    this.player.setBulletCollider(this.enemies);
  }

  addEnemy() {
    const x = Phaser.Math.Between(0, this.cameras.main.width);
    this.enemies?.generateNew(x, 0);
  }
}
