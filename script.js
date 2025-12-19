// Initialize Lucide icons
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
});

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


// form logic

document.addEventListener("DOMContentLoaded", function () {

  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        form.reset(); // Clear all inputs

        // ⭐ Redirect to Web3Forms success page
        window.location.href = "https://web3forms.com/success";
      } else {
        alert("Something went wrong. Please try again!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Network error. Please try again.");
    }
  });

});

// whatsapp functionality

const phoneNumber = "917985016911"; // ← YOUR NUMBER
const message = "Hello"; // auto-filled message

document.getElementById("whatsapp-btn").href =
  `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


// infinite loop testimonial cards

const track = document.querySelector(".testimonials-track");


const slider = document.querySelector(".testimonials-slider");

slider.addEventListener("mouseenter", () => gsap.globalTimeline.pause());
slider.addEventListener("mouseleave", () => gsap.globalTimeline.resume());

slider.addEventListener("touchstart", () => gsap.globalTimeline.pause());
slider.addEventListener("touchend", () => gsap.globalTimeline.resume());

requestAnimationFrame(() => {
  const trackWidth = track.scrollWidth / 2;
  const speed = 100;
  const duration = trackWidth / speed;

  gsap.fromTo(
    track,
    { x: -trackWidth },
    {
      x: 0,
      duration,
      ease: "none",
      repeat: -1
    }
  );
});


if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.globalTimeline.pause();
}

