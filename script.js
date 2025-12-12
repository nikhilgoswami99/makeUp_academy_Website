// Initialize Lucide icons
lucide.createIcons();

// Mobile Menu Elements
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileCloseBtn = document.querySelector(".mobile-close-btn");
const navLinks = document.querySelector(".nav-links");
const navContent = document.querySelector(".nav-content"); // parent for menu-open class

// Open Mobile Menu
mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.add("active");
  navContent.classList.add("menu-open"); // hide hamburger
});

// Close Mobile Menu
mobileCloseBtn.addEventListener("click", () => {
  navLinks.classList.remove("active");
  navContent.classList.remove("menu-open");
});

// Close menu when clicking any nav link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    navContent.classList.remove("menu-open");
  });
});

// Sticky Header
const header = document.querySelector(".main-nav");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Animation on Scroll (Intersection Observer)
const observerOptions = { threshold: 0.5 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in, .slide-in-right").forEach((el) => {
  el.style.animationPlayState = "paused";
  observer.observe(el);
});

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async function (event) {
  event.preventDefault(); // Stop normal form submit

  const formData = new FormData(form);

  const response = await fetch(form.action, {
    method: form.method,
    body: formData,
  });

  const result = await response.json();

  if (result.success) {
    status.textContent = "Message sent successfully!";
    form.reset(); // Clear all inputs
  } else {
    status.textContent = "Something went wrong. Please try again!";
  }
});
