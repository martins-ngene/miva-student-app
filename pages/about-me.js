const menu = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav-links");

menu.addEventListener("click", () => {
  nav.classList.toggle("show");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

document
  .querySelectorAll(".timeline-item, .career-card, .hobby, .skill")
  .forEach((item) => observer.observe(item));
