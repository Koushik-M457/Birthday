const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");

playBtn.onclick = () => {
    audio.play();
};

audio.onloadedmetadata = () => {
    progress.max = audio.duration;
    duration.textContent = format(audio.duration);
};

audio.ontimeupdate = () => {
    progress.value = audio.currentTime;
    current.textContent = format(audio.currentTime);
};

progress.oninput = () => {
    audio.currentTime = progress.value;
};
playBtn.onclick = () => {
    audio.volume = 0;
    audio.play();

    let v = 0;
    const fade = setInterval(() => {
        v += 0.02;
        audio.volume = Math.min(v, 1);
        if (v >= 1) clearInterval(fade);
    }, 100);
};
document.body.addEventListener("touchstart", () => {
    if (audio.paused) audio.play();
}, { once: true });

audio.onended = () => {
    confetti();
};


function format(time) {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}
