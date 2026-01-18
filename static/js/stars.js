const canvas = document.getElementById("stars") || document.createElement("canvas");
if (!canvas.parentNode) document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = -1;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const stars = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5,
    v: Math.random() * 0.3 + 0.1
}));

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    stars.forEach(s => {
        s.y += s.v;
        if (s.y > canvas.height) s.y = 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

animate();
