setTimeout(() => {
  document.querySelector(".intro").style.display = "none";
  const message = document.querySelector(".message");
  message.classList.remove("hidden");
  message.classList.add("fade-in");
}, 5000);

function startExperience() {
  const music = document.getElementById("bgMusic");
  const startScreen = document.getElementById("startScreen");
  const intro = document.getElementById("intro");

  music.play();

  startScreen.style.display = "none";
  intro.classList.remove("hidden");

  // Optional: fade next scene
  setTimeout(() => {
    console.log("Cinematic experience started 🎬");
  }, 3000);
}
