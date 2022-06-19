export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super({ key: "LeaderBoardScene" });
  }

  create() {
    const gameMusic = this.sound.add("game-music");
    gameMusic.play();
    this.add
      .text(0, 20, `Leader Board`, {
        color: "#fff",
        fontSize: "120px",
        fontStyle: "bold",
        fixedWidth: innerWidth,
        align: "center",
      })
      .setOrigin(0, 0);

    const mainmenu = this.add
      .text(0, innerHeight / 2 + 140, `Main Menu`, {
        color: "black",
        backgroundColor: "green",
        fontSize: "60px",
        fixedWidth: innerWidth,
        align: "center",
      })
      .setOrigin(0, 0);

    mainmenu.setInteractive();
    mainmenu.on("pointerdown", () => {
      gameMusic.pause();
      gameMusic.destroy();
      this.scene.start("HelloScene");
    });
  }
}
