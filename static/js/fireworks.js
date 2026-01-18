function confetti() {
    for (let i = 0; i < 120; i++) {
        const d = document.createElement("div");
        d.style.position = "fixed";
        d.style.left = Math.random() * 100 + "vw";
        d.style.top = "-10px";
        d.style.width = "6px";
        d.style.height = "12px";
        d.style.background = `hsl(${Math.random() * 360},100%,50%)`;
        d.style.opacity = "0.8";
        d.style.zIndex = 9999;
        d.style.animation = "fall 3s linear forwards";
        document.body.appendChild(d);
        setTimeout(() => d.remove(), 3000);
    }
}

const style = document.createElement("style");
style.innerHTML = `
@keyframes fall {
  to { transform: translateY(100vh) rotate(360deg); }
}`;
document.head.appendChild(style);
