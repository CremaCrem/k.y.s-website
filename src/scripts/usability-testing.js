// Initialize AOS
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS if it exists
  if (typeof AOS !== "undefined") {
    AOS.init();
  }

  // Initialize Lucide icons if it exists
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Collapsible functionality for task list and scenarios
  const collapsibleButtons = document.querySelectorAll(".collapsible-btn");
  if (collapsibleButtons.length > 0) {
    collapsibleButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        const content = button.nextElementSibling;
        if (!content) return;

        const isExpanded = button.getAttribute("aria-expanded") === "true";

        // Toggle aria-expanded
        button.setAttribute("aria-expanded", !isExpanded);

        // Toggle content visibility
        if (!isExpanded) {
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          content.style.maxHeight = "0";
        }
      });
    });
  }

  // Chart.js initialization
  const chartCanvas = document.getElementById("taskCompletionChart");
  if (chartCanvas && typeof Chart !== "undefined") {
    const ctx = chartCanvas.getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Add Password",
          "View Password",
          "Delete Password",
          "Edit Password",
          "Copy Password",
        ],
        datasets: [
          {
            label: "Average Time (seconds)",
            data: [28.3, 3.2, 4.4, 21.3, 1.9],
            backgroundColor: "#E3750C",
            borderColor: "#FF9232",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Time (seconds)",
              color: "#000000",
            },
            ticks: { color: "#000000" },
            grid: { color: "#D1D5DB" },
          },
          x: {
            title: { display: true, text: "Tasks", color: "#000000" },
            ticks: { color: "#000000" },
          },
        },
        plugins: { legend: { display: false } },
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        layout: {
          padding: {
            top: 10,
            right: 20,
            bottom: 20,
            left: 20,
          },
        },
      },
    });

    // Update chart colors for dark mode
    function updateChartColors() {
      const isDark = document.documentElement.classList.contains("dark");
      const textColor = isDark ? "#FFFFFF" : "#000000";
      chart.options.scales.y.title.color = textColor;
      chart.options.scales.y.ticks.color = textColor;
      chart.options.scales.x.title.color = textColor;
      chart.options.scales.x.ticks.color = textColor;
      chart.update();
    }

    // Add theme toggle listeners for chart updates
    const themeToggle = document.getElementById("theme-toggle");
    const mobileThemeToggle = document.getElementById("mobile-theme-toggle");

    if (themeToggle) {
      themeToggle.addEventListener("click", updateChartColors);
    }
    if (mobileThemeToggle) {
      mobileThemeToggle.addEventListener("click", updateChartColors);
    }
  }

  // Scrollspy Menu Toggle
  const scrollspyToggle = document.getElementById("scrollspy-toggle");
  const scrollspyContainer = document.querySelector(".scrollspy-container");
  const scrollspyMenu = document.querySelector(".scrollspy-menu");

  if (scrollspyToggle && scrollspyContainer) {
    // Start with menu collapsed
    scrollspyContainer.style.transform = "translateX(calc(100% - 3rem))";

    // Toggle menu on click
    scrollspyToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isCollapsed =
        scrollspyContainer.style.transform === "translateX(calc(100% - 3rem))";
      scrollspyContainer.style.transform = isCollapsed
        ? "translateX(0)"
        : "translateX(calc(100% - 3rem))";
      scrollspyToggle.setAttribute("aria-expanded", isCollapsed);
    });

    // Show menu on hover
    scrollspyContainer.addEventListener("mouseenter", () => {
      scrollspyContainer.style.transform = "translateX(0)";
    });

    // Hide menu when mouse leaves
    scrollspyContainer.addEventListener("mouseleave", () => {
      if (scrollspyToggle.getAttribute("aria-expanded") !== "true") {
        scrollspyContainer.style.transform = "translateX(calc(100% - 3rem))";
      }
    });
  }

  // Update active link based on scroll position
  function updateScrollspy() {
    const sections = document.querySelectorAll("section[id]");
    const scrollspyLinks = document.querySelectorAll(".scrollspy-link");

    if (sections.length === 0 || scrollspyLinks.length === 0) return;

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        currentSection = section.getAttribute("id");
      }
    });

    scrollspyLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("data-section") === currentSection) {
        link.classList.add("active");
      }
    });
  }

  // Update scrollspy on scroll and page load
  window.addEventListener("scroll", updateScrollspy);
  window.addEventListener("load", updateScrollspy);

  // Smooth scroll for scrollspy links
  const scrollspyLinks = document.querySelectorAll(".scrollspy-link");
  if (scrollspyLinks.length > 0) {
    scrollspyLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        const navbar = document.querySelector("nav");

        if (targetSection && navbar) {
          window.scrollTo({
            top: targetSection.offsetTop - navbar.offsetHeight,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // Mobile menu functionality
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const closeMenuBtn = document.getElementById("close-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (hamburgerBtn && closeMenuBtn && mobileMenu) {
    function toggleMobileMenu() {
      mobileMenu.classList.toggle("active");
      hamburgerBtn.setAttribute(
        "aria-expanded",
        mobileMenu.classList.contains("active")
      );
    }

    hamburgerBtn.addEventListener("click", toggleMobileMenu);
    closeMenuBtn.addEventListener("click", toggleMobileMenu);

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        mobileMenu.classList.contains("active") &&
        !mobileMenu.contains(e.target) &&
        !hamburgerBtn.contains(e.target)
      ) {
        toggleMobileMenu();
      }
    });
  }

  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle");
  const mobileThemeToggle = document.getElementById("mobile-theme-toggle");

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    if (typeof updateChartColors === "function") {
      updateChartColors();
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener("click", toggleTheme);
  }
});
