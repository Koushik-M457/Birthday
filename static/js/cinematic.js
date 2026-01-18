document.addEventListener("DOMContentLoaded", () => {
    const enterOverlay = document.getElementById("enter-overlay");
    const mainContent = document.querySelector(".glass-panel");
    const audio = document.getElementById("bg-music");
    const playBtn = document.getElementById("playBtn");
    const messageBox = document.getElementById("message");

    // Check if audio file exists by trying to load it
    audio.addEventListener('error', (e) => {
        console.error("Audio file missing or error:", e);
        // Fallback or alert if needed, but we'll just log for now to avoid breaking the UI
    });

    // 1. Enter Experience (Solves Autoplay)
    enterOverlay.addEventListener("click", () => {
        // Fade out overlay
        enterOverlay.style.opacity = "0";
        setTimeout(() => enterOverlay.style.display = "none", 1500);

        // Fade in main content
        mainContent.style.opacity = "1";

        // Try playing music
        audio.volume = 0;
        audio.play().then(() => {
            // Fade in volume
            let vol = 0;
            const fade = setInterval(() => {
                vol += 0.05;
                if (vol >= 1) {
                    vol = 1;
                    clearInterval(fade);
                }
                audio.volume = vol;
            }, 200);
            updatePlayButton(true);
        }).catch(err => {
            console.log("Autoplay prevented or no file:", err);
            updatePlayButton(false);
        });

        // Start Text Sequence
        startMessageSequence();

        // Start Timer (visual only, real expiration is backend)
        startVisualTimer();
    });

    // 2. Play/Pause Toggle
    playBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            updatePlayButton(true);
        } else {
            audio.pause();
            updatePlayButton(false);
        }
    });

    function updatePlayButton(isPlaying) {
        playBtn.innerText = isPlaying ? "⏸" : "▶";
    }

    // 3. Cinematic Text Sequence
    const lines = [
        "Welcome...",
        "To a moment suspended in time",
        "Happy Birthday, Koush",
        "May your year be as bright as the stars",
        "Make a wish... ✨"
    ];

    function startMessageSequence() {
        let i = 0;

        function showNext() {
            if (i >= lines.length) return; // Stop after last line or loop? Let's stop.

            // Fade out old
            messageBox.style.opacity = 0;

            setTimeout(() => {
                messageBox.innerHTML = `<p class="line">${lines[i]}</p>`;
                messageBox.style.opacity = 1;
                i++;
                setTimeout(showNext, 4000); // 4 seconds per line
            }, 1000); // Wait for fade out
        }

        showNext();
    }

    // 4. Visual Timer (matches backend roughly)
    function startVisualTimer() {
        // We could fetch real remaining time, but for 'cinematic' feel we just show it ticking
        // If exact sync runs out, we rely on the refresh/redirect.
    }
});
