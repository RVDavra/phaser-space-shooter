export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameOverScene" });
  }

  create() {
    const gameoverMusic = this.sound.add("gameover-music");
    gameoverMusic.play();
    this.add
      .text(0, innerHeight / 2, `Game Over`, {
        color: "#fff",
        fontSize: "120px",
        fontStyle: "bold",
        fixedWidth: innerWidth,
        align: "center",
      })
      .setOrigin(0, 0);
    const retry = this.add
      .text(0, innerHeight / 2 + 140, `Retry`, {
        color: "#fff",
        fontSize: "60px",
        fixedWidth: innerWidth,
        align: "center",
      })
      .setOrigin(0, 0);

    retry.setInteractive();
    retry.on("pointerdown", () => {
      gameoverMusic.pause();
      gameoverMusic.destroy();
      this.scene.start("MainScene");
    });
  }
}
