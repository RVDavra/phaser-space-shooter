import PhaserLogo from "../objects/phaserLogo";
import FpsText from "../objects/fpsText";
import Player from "../objects/player";

export default class MainScene extends Phaser.Scene {
  // fpsText: FpsText | undefined;
  public keys: any;
  public player: Player | undefined;

  constructor() {
    super({ key: "MainScene" });
  }

  create() {
    const logo = new PhaserLogo(this, this.cameras.main.width / 2, 0);
    // const logo2 = new PhaserLogo(this, this.cameras.main.width / 2, 350);
    // this.physics.add.collider(logo, logo2, () => {
    //   logo.destroy();
    //   logo2.destroy();
    // })
    this.player = new Player(this);
    // this.fpsText = new FpsText(this);

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: "#000000",
        fontSize: "24px",
      })
      .setOrigin(1, 0);
  }

  update() {
    // this.fpsText?.update();
    this.player?.update();
  }
}
