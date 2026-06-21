window.addEventListener("pageshow", () => {
  function play() {
    bird.currentTime = Math.random() * bird.duration;
    bird.volume = 0;
    bird.play().catch(() => {
      document.addEventListener(
        "click",
        () => {
          play();
        },
        { once: true },
      );
    });
    fadeIn();
  }

  function fadeIn() {
    const cible = 0.6;
    const duree = 1500;
    const steps = 50;
    const increment = cible / steps;
    const interval = duree / steps;

    const fade = setInterval(() => {
      if (bird.volume < cible - increment) {
        bird.volume = Math.min(bird.volume + increment, cible);
      } else {
        bird.volume = cible;
        clearInterval(fade);
      }
    }, interval);
  }

  if (bird.readyState >= 1) {
    play();
  } else {
    bird.addEventListener("loadedmetadata", () => play());
  }
});
