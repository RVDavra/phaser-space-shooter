export default class HelloScene extends Phaser.Scene {
  constructor() {
    super({ key: "HelloScene" });
  }

  create() {
    const gameMusic = this.sound.add("game-music");
    gameMusic.play();
    this.add
      .text(0, innerHeight / 2, `Space Shooter`, {
        color: "#fff",
        fontSize: "120px",
        fontStyle: "bold",
        fixedWidth: innerWidth,
        align: "center",
      })
      .setOrigin(0, 0);
    const start = this.add
      .text(0, innerHeight / 2 + 140, `Start`, {
        color: "black",
        backgroundColor: "green",
        fontSize: "60px",
        fixedWidth: innerWidth,
        align: "center",
      })
      .setOrigin(0, 0);
    const leaderBoader = this.add
      .text(0, innerHeight / 2 + 200, `Leader Board`, {
        color: "black",
        backgroundColor: "yellow",
        fontSize: "60px",
        fixedWidth: innerWidth,
        align: "center",
      })
      .setOrigin(0, 0);

    start.setInteractive();
    start.on("pointerdown", () => {
      gameMusic.pause();
      gameMusic.destroy();
      this.scene.start("MainScene");
    });
    start.on("pointerover", () => {
      start.setBackgroundColor("lightgreen");
    });
    start.on("pointerout", () => {
      start.setBackgroundColor("green");
    });
    leaderBoader.setInteractive();
    leaderBoader.on("pointerdown", () => {
      gameMusic.pause();
      gameMusic.destroy();
      this.scene.start("LeaderBoardScene");
    });
    leaderBoader.on("pointerover", () => {
      leaderBoader.setBackgroundColor("lightyellow");
    });
    leaderBoader.on("pointerout", () => {
      leaderBoader.setBackgroundColor("yellow");
    });
  }
}
