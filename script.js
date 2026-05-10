const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");
let width = 0;
let height = 0;
let pointerX = 0.5;
let pointerY = 0.5;

function resize() {
  width = canvas.width = window.innerWidth * devicePixelRatio;
  height = canvas.height = window.innerHeight * devicePixelRatio;
}

window.addEventListener("resize", resize);
window.addEventListener("pointermove", (event) => {
  pointerX = event.clientX / window.innerWidth;
  pointerY = event.clientY / window.innerHeight;
});
resize();

function draw(time) {
  const t = time * 0.00008;
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < 78; i += 1) {
    const x = ((i * 131 + t * width * 0.35) % width) + (pointerX - 0.5) * 22;
    const y = ((i * 89 + t * height * 0.22) % height) + (pointerY - 0.5) * 18;
    ctx.beginPath();
    ctx.fillStyle = i % 6 === 0 ? "rgba(248,196,79,.34)" : "rgba(255,255,255,.12)";
    ctx.arc(x, y, i % 6 === 0 ? 2.5 : 1.3, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < 7; i += 1) {
    const p = (t * 0.42 + i * 0.15) % 1;
    const x = width * p;
    const y = height * (0.13 + i * 0.11);
    const gradient = ctx.createLinearGradient(x - width * 0.22, y, x + width * 0.2, y + height * 0.08);
    gradient.addColorStop(0, "rgba(248,196,79,0)");
    gradient.addColorStop(0.5, "rgba(248,196,79,.22)");
    gradient.addColorStop(1, "rgba(125,227,255,0)");
    ctx.strokeStyle = gradient;
    ctx.lineWidth = i % 2 === 0 ? 7 : 3;
    ctx.beginPath();
    ctx.moveTo(x - width * 0.22, y);
    ctx.lineTo(x + width * 0.2, y + height * 0.08);
    ctx.stroke();
  }

  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

const modal = document.getElementById("searchModal");
document.getElementById("searchBtn").addEventListener("click", () => modal.classList.add("open"));
document.getElementById("closeSearch").addEventListener("click", () => modal.classList.remove("open"));
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.classList.remove("open");
});

let selectedProgram = "AI Engineering";
document.querySelectorAll(".program").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".program").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    selectedProgram = button.textContent;
  });
});

document.getElementById("applyHero").addEventListener("click", () => {
  document.querySelector(".admission").scrollIntoView({ behavior: "smooth", block: "center" });
});

document.getElementById("admissionForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("studentName").value.trim();
  const email = document.getElementById("studentEmail").value.trim();
  document.getElementById("formResult").textContent =
    `${name}, your interest for ${selectedProgram} is saved. We will contact you at ${email}.`;
});
