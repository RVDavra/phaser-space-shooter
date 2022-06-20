export function flashEl(
  scene: Phaser.Scene,
  element: any,
  repeat = true,
  easing = "Linear",
  overallDuration = 1500,
  visiblePauseDuration = 500
) {
  if (scene && element) {
    let flashDuration = overallDuration - visiblePauseDuration / 2;

    scene.tweens.timeline({
      tweens: [
        {
          targets: element,
          duration: 0,
          alpha: 0,
          ease: easing,
        },
        {
          targets: element,
          duration: flashDuration,
          alpha: 1,
          ease: easing,
        },
        {
          targets: element,
          duration: visiblePauseDuration,
          alpha: 1,
          ease: easing,
        },
        {
          targets: element,
          duration: flashDuration,
          alpha: 0,
          ease: easing,
          onComplete: () => {
            if (repeat === true) {
              flashEl(scene, element);
            }
          },
        },
      ],
    });
  }
}

export function blink(scene: Phaser.Scene, el: any) {
  flashEl(scene, el, false, "Linear", 10, 10);
}