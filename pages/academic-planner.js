/* ==========================================
   ACADEMIC PLANNER
   CRUD + Local Storage + Search + Filters
========================================== */

// ============================
// DOM ELEMENTS
// ============================

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

const taskTitle = document.getElementById("taskTitle");
const course = document.getElementById("course");
const dueDate = document.getElementById("dueDate");
const priority = document.getElementById("priority");

const searchInput = document.getElementById("searchInput");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const highPriority = document.getElementById("highPriority");

const taskCounter = document.getElementById("taskCounter");

const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");

const emptyState = document.getElementById("emptyState");

const filterButtons = document.querySelectorAll(".filter-btn");

const menu = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav-links");

// ============================
// MOBILE MENU
// ============================

if (menu) {
  menu.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
}

// ============================
// APP STATE
// ============================

let tasks = JSON.parse(localStorage.getItem("plannerTasks")) || [];

let editId = null;

let currentFilter = "all";

// ============================
// SAVE
// ============================

function saveTasks() {
  localStorage.setItem("plannerTasks", JSON.stringify(tasks));
}

// ============================
// FORMAT DATE
// ============================

function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",

    month: "short",

    day: "numeric",
  });
}

// ============================
// OVERDUE
// ============================

function isOverdue(task) {
  if (task.completed) return false;

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return new Date(task.dueDate) < today;
}

// ============================
// RENDER TASKS
// ============================

function renderTasks() {
  taskList.innerHTML = "";

  let filtered = [...tasks];

  if (currentFilter === "completed") {
    filtered = filtered.filter((task) => task.completed);
  }

  if (currentFilter === "pending") {
    filtered = filtered.filter((task) => !task.completed);
  }

  if (currentFilter === "high") {
    filtered = filtered.filter((task) => task.priority === "High");
  }

  const keyword = searchInput.value.toLowerCase();

  filtered = filtered.filter(
    (task) =>
      task.title.toLowerCase().includes(keyword) ||
      task.course.toLowerCase().includes(keyword),
  );

  if (filtered.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }

  filtered.forEach((task) => {
    const card = document.createElement("div");

    card.className = `task-card ${task.completed ? "completed" : ""}`;

    const overdue = isOverdue(task)
      ? `<span class="priority high">OVERDUE</span>`
      : "";

    card.innerHTML = `

            <div class="task-info">

                <h3>${task.title}</h3>

                <p><strong>Course:</strong> ${task.course}</p>

                <p><strong>Due:</strong> ${formatDate(task.dueDate)}</p>

                <span class="priority ${task.priority.toLowerCase()}">
                    ${task.priority}
                </span>

                ${overdue}

            </div>

            <div class="task-actions">

                <button
                    class="edit-btn"
                    onclick="editTask(${task.id})">

                    <i class="fa fa-pen"></i>

                </button>

                <button
                    class="complete-btn"
                    onclick="toggleComplete(${task.id})">

                    <i class="fa fa-check"></i>

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})">

                    <i class="fa fa-trash"></i>

                </button>

            </div>

        `;

    taskList.appendChild(card);
  });

  updateDashboard();
}

// ============================
// DASHBOARD
// ============================

function updateDashboard() {
  totalTasks.textContent = tasks.length;

  const completed = tasks.filter((task) => task.completed).length;

  const pending = tasks.length - completed;

  const high = tasks.filter((task) => task.priority === "High").length;

  completedTasks.textContent = completed;

  pendingTasks.textContent = pending;

  highPriority.textContent = high;

  taskCounter.textContent = `${tasks.length} Task(s)`;

  const percent =
    tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

  progressFill.style.width = percent + "%";

  progressPercent.textContent = percent + "%";
}

// ============================
// ADD / UPDATE
// ============================

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const newTask = {
    id: editId || Date.now(),

    title: taskTitle.value.trim(),

    course: course.value.trim(),

    dueDate: dueDate.value,

    priority: priority.value,

    completed: false,
  };

  if (editId) {
    const existing = tasks.find((task) => task.id === editId);

    newTask.completed = existing.completed;

    tasks = tasks.map((task) => (task.id === editId ? newTask : task));

    editId = null;

    document.getElementById("submitBtn").innerHTML =
      `<i class="fa fa-plus"></i> Add Task`;
  } else {
    tasks.unshift(newTask);
  }

  saveTasks();

  renderTasks();

  taskForm.reset();
});

// ============================
// EDIT
// ============================

function editTask(id) {
  const task = tasks.find((task) => task.id === id);

  taskTitle.value = task.title;

  course.value = task.course;

  dueDate.value = task.dueDate;

  priority.value = task.priority;

  editId = id;

  document.getElementById("submitBtn").innerHTML =
    `<i class="fa fa-save"></i> Update Task`;

  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
}

// ============================
// COMPLETE
// ============================

function toggleComplete(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      task.completed = !task.completed;
    }

    return task;
  });

  saveTasks();

  renderTasks();
}

// ============================
// DELETE
// ============================

function deleteTask(id) {
  if (!confirm("Delete this task?")) return;

  tasks = tasks.filter((task) => task.id !== id);

  saveTasks();

  renderTasks();
}

// ============================
// SEARCH
// ============================

searchInput.addEventListener("input", renderTasks);

// ============================
// FILTER
// ============================

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    currentFilter = button.dataset.filter;

    renderTasks();
  });
});

// ============================
// LOAD
// ============================

renderTasks();
