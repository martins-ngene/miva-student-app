/* ==========================================
   CONTACT PAGE JAVASCRIPT
   contact.js
   Form Validation + Toast + Character Counter
========================================== */

// =============================
// MOBILE NAVIGATION
// =============================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// =============================
// DOM ELEMENTS
// =============================

const form = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

const submitBtn = document.getElementById("submitBtn");

const charCount = document.getElementById("charCount");

const successBox = document.getElementById("successMessage");

const toast = document.getElementById("toast");

// =============================
// REGULAR EXPRESSIONS
// =============================

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phoneRegex = /^(?:\+234|0)[789][01]\d{8}$/;

// =============================
// ERROR HANDLING
// =============================

function showError(input, message) {
  input.classList.remove("input-success");
  input.classList.add("input-error");

  const error = input.parentElement.querySelector(".error");

  if (error) {
    error.textContent = message;
  }
}

function showSuccess(input) {
  input.classList.remove("input-error");
  input.classList.add("input-success");

  const error = input.parentElement.querySelector(".error");

  if (error) {
    error.textContent = "";
  }
}

function clearValidation(input) {
  input.classList.remove("input-error", "input-success");

  const error = input.parentElement.querySelector(".error");

  if (error) {
    error.textContent = "";
  }
}

// =============================
// VALIDATION FUNCTIONS
// =============================

function validateName() {
  const value = nameInput.value.trim();

  if (value === "") {
    showError(nameInput, "Name is required.");

    return false;
  }

  if (value.length < 3) {
    showError(nameInput, "Name is too short.");

    return false;
  }

  showSuccess(nameInput);

  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();

  if (value === "") {
    showError(emailInput, "Email is required.");

    return false;
  }

  if (!emailRegex.test(value)) {
    showError(emailInput, "Enter a valid email.");

    return false;
  }

  showSuccess(emailInput);

  return true;
}

function validatePhone() {
  const value = phoneInput.value.trim();

  if (value === "") {
    showError(phoneInput, "Phone number is required.");

    return false;
  }

  if (!phoneRegex.test(value)) {
    showError(phoneInput, "Enter a valid Nigerian phone number.");

    return false;
  }

  showSuccess(phoneInput);

  return true;
}

function validateSubject() {
  const value = subjectInput.value.trim();

  if (value === "") {
    showError(subjectInput, "Subject is required.");

    return false;
  }

  showSuccess(subjectInput);

  return true;
}

function validateMessage() {
  const value = messageInput.value.trim();

  if (value === "") {
    showError(messageInput, "Message cannot be empty.");

    return false;
  }

  if (value.length < 20) {
    showError(messageInput, "Message should contain at least 20 characters.");

    return false;
  }

  showSuccess(messageInput);

  return true;
}

// =============================
// LIVE VALIDATION
// =============================

nameInput.addEventListener("input", validateName);

emailInput.addEventListener("input", validateEmail);

phoneInput.addEventListener("input", validatePhone);

subjectInput.addEventListener("input", validateSubject);

messageInput.addEventListener("input", () => {
  validateMessage();

  charCount.textContent = `${messageInput.value.length} / 500`;
});

// =============================
// TOAST NOTIFICATION
// =============================

function showToast(message, color = "#16a34a") {
  toast.textContent = message;

  toast.style.background = color;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// =============================
// FORM SUBMISSION
// =============================

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const valid =
    validateName() &&
    validateEmail() &&
    validatePhone() &&
    validateSubject() &&
    validateMessage();

  if (!valid) {
    showToast("Please fix the highlighted fields.", "#dc2626");

    return;
  }

  submitBtn.disabled = true;

  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i>
         Sending...`;

  setTimeout(() => {
    successBox.style.display = "block";

    form.reset();

    charCount.textContent = "0 / 500";

    [nameInput, emailInput, phoneInput, subjectInput, messageInput].forEach(
      clearValidation,
    );

    submitBtn.disabled = false;

    submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i>
             Send Message`;

    showToast("Message sent successfully!");

    successBox.scrollIntoView({
      behavior: "smooth",
    });
  }, 1800);
});

// =============================
// OPTIONAL FAQ ACCORDION
// =============================

document.querySelectorAll(".faq-item h3").forEach((item) => {
  item.style.cursor = "pointer";

  item.addEventListener("click", () => {
    const answer = item.nextElementSibling;

    answer.style.display = answer.style.display === "none" ? "block" : "none";
  });
});

// Hide FAQ answers initially

document.querySelectorAll(".faq-item p").forEach((answer) => {
  answer.style.display = "none";
});

// =============================
// PAGE LOAD ANIMATION
// =============================

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// =============================
// SCROLL REVEAL
// =============================

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";

        entry.target.style.transform = "translateY(0)";
      }
    });
  },

  {
    threshold: 0.15,
  },
);

document
  .querySelectorAll(".info-card, .contact-form, .sidebar-card, .faq-item")
  .forEach((element) => {
    element.style.opacity = "0";

    element.style.transform = "translateY(30px)";

    element.style.transition = "all .6s ease";

    observer.observe(element);
  });
