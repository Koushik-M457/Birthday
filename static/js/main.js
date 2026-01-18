const music = document.getElementById("music");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const overlay = document.getElementById("overlay");
const player = document.getElementById("player");

function startExperience() {
    overlay.style.opacity = 0;
    setTimeout(() => overlay.style.display = "none", 1000);

    player.classList.remove("hidden");
    music.volume = 0;
    music.play();

    // Fade-in music
    let vol = 0;
    const fade = setInterval(() => {
        vol += 0.02;
        music.volume = Math.min(vol, 1);
        if (vol >= 1) clearInterval(fade);
    }, 100);
}

music.addEventListener("loadedmetadata", () => {
    duration.textContent = format(music.duration);
});

music.addEventListener("timeupdate", () => {
    progress.value = (music.currentTime / music.duration) * 100;
    current.textContent = format(music.currentTime);
});

progress.addEventListener("input", () => {
    music.currentTime = (progress.value / 100) * music.duration;
});

function format(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}
