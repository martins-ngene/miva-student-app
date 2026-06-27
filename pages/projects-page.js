const projects = [
  {
    title: "Student Portfolio",
    category: "html",
    image: "assets/images/project1.jpg",
    description:
      "Responsive personal portfolio website developed using semantic HTML and modern CSS.",
    github: "#",
    demo: "#",
  },

  {
    title: "Academic Planner",
    category: "javascript",
    image: "assets/images/project2.jpg",
    description:
      "Interactive planner for tracking assignments, deadlines and completed tasks.",
    github: "#",
    demo: "#",
  },

  {
    title: "Weather Dashboard",
    category: "javascript",
    image: "assets/images/project3.jpg",
    description: "Weather application using JavaScript and API integration.",
    github: "#",
    demo: "#",
  },

  {
    title: "Restaurant Landing Page",
    category: "css",
    image: "assets/images/project4.jpg",
    description:
      "Responsive landing page built with Flexbox, Grid and CSS animations.",
    github: "#",
    demo: "#",
  },

  {
    title: "University Registration Form",
    category: "html",
    image: "assets/images/project5.jpg",
    description: "Accessible registration form with semantic HTML elements.",
    github: "#",
    demo: "#",
  },

  {
    title: "Animated Login Screen",
    category: "css",
    image: "assets/images/project6.jpg",
    description:
      "Modern authentication page featuring transitions and animations.",
    github: "#",
    demo: "#",
  },
];

const container = document.getElementById("projectsContainer");

function displayProjects(category) {
  container.innerHTML = "";

  const filtered =
    category === "all"
      ? projects
      : projects.filter((project) => project.category === category);

  filtered.forEach((project) => {
    container.innerHTML += `

<div class="project-card fade">

<img src="${project.image}" alt="${project.title}">

<div class="project-content">

<span class="tech">${project.category.toUpperCase()}</span>

<h3>${project.title}</h3>

<p>${project.description}</p>

<div class="buttons">

<a class="github" href="${project.github}" target="_blank">

GitHub

</a>

<a class="demo" href="${project.demo}" target="_blank">

Live Demo

</a>

</div>

</div>

</div>

`;
  });
}

displayProjects("all");

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");

    button.classList.add("active");

    displayProjects(button.dataset.filter);
  });
});

const menu = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav-links");

menu.addEventListener("click", () => {
  nav.classList.toggle("show");
});
