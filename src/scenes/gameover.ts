export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameOverScene" });
  }

  create() {
    this.add
      .text(0, innerHeight / 2, `Game Over`, {
        color: "#000000",
        fontSize: "120px",
        fontStyle: "bold",
        fixedWidth: innerWidth,
        align: "center",
      })
      .setOrigin(0, 0);
    const retry = this.add
      .text(0, innerHeight / 2 + 140, `Retry`, {
        color: "#000000",
        fontSize: "60px",
        fixedWidth: innerWidth,
        align: "center",
      })
      .setOrigin(0, 0);

    retry.setInteractive();
    retry.on("pointerdown", () => {
      this.scene.start("MainScene");
    });
    // this.scene.start("MainScene");
  }
}
