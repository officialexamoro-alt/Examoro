document.addEventListener("DOMContentLoaded", function () {

  const themeToggle = document.getElementById("themeToggle");
  const cartButton = document.getElementById("cartButton");

  const menuToggle = document.getElementById("menuToggle");
  const closeDrawer = document.getElementById("closeDrawer");
  const drawer = document.getElementById("drawer");
  const drawerOverlay = document.getElementById("drawerOverlay");

  const buyNow = document.getElementById("buyNow");
  const viewIndex = document.getElementById("viewIndex");

  const indexModal = document.getElementById("indexModal");
  const closeIndexModal = document.getElementById("closeIndexModal");
  const closeIndexModalBottom = document.getElementById("closeIndexModalBottom");

  const toastMessage = document.getElementById("toastMessage");
  const currentYear = document.getElementById("currentYear");

  let toastTimer;

  // CURRENT YEAR
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // TOAST MESSAGE
  function showToast(message) {
    if (!toastMessage) return;

    toastMessage.textContent = message;
    toastMessage.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
      toastMessage.classList.remove("show");
    }, 3000);
  }

  // DARK MODE
  function updateThemeButton() {
    if (!themeToggle) return;

    const isDark = document.body.classList.contains("dark-theme");

    themeToggle.textContent = isDark ? "☀️" : "🌙";

    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
  }

  try {
    const savedTheme = localStorage.getItem("examoro-theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
    }
  } catch (error) {
    // Theme still works if localStorage is unavailable.
  }

  updateThemeButton();

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-theme");

      const isDark = document.body.classList.contains("dark-theme");

      try {
        localStorage.setItem(
          "examoro-theme",
          isDark ? "dark" : "light"
        );
      } catch (error) {
        // Continue without saving the preference.
      }

      updateThemeButton();
    });
  }

  // MOBILE MENU
  function openDrawer() {
    if (!drawer || !drawerOverlay) return;

    drawer.classList.add("active");
    drawerOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "true");
    }
  }

  function closeMobileDrawer() {
    if (!drawer || !drawerOverlay) return;

    drawer.classList.remove("active");
    drawerOverlay.classList.remove("active");

    document.body.style.overflow = "";

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  }

  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.addEventListener("click", openDrawer);
  }

  if (closeDrawer) {
    closeDrawer.addEventListener("click", closeMobileDrawer);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener("click", closeMobileDrawer);
  }

  if (drawer) {
    drawer.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", closeMobileDrawer);
    });
  }

  // BOOK INDEX MODAL
  function openIndexModal() {
    if (!indexModal) return;

    indexModal.classList.add("active");
    indexModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    if (closeIndexModal) {
      closeIndexModal.focus();
    }
  }

  function closeIndexPreview() {
    if (!indexModal) return;

    indexModal.classList.remove("active");
    indexModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    if (viewIndex) {
      viewIndex.focus();
    }
  }

  if (viewIndex) {
    viewIndex.addEventListener("click", openIndexModal);
  }

  if (closeIndexModal) {
    closeIndexModal.addEventListener("click", closeIndexPreview);
  }

  if (closeIndexModalBottom) {
    closeIndexModalBottom.addEventListener("click", closeIndexPreview);
  }

  if (indexModal) {
    indexModal.addEventListener("click", function (event) {
      if (event.target === indexModal) {
        closeIndexPreview();
      }
    });
  }

  // ESCAPE KEY
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMobileDrawer();

      if (indexModal && indexModal.classList.contains("active")) {
        closeIndexPreview();
      }
    }
  });

  // BOOK BUTTON
  if (buyNow) {
    buyNow.addEventListener("click", function () {
      showToast(
        "Online payment abhi enable nahi hai. Purchase ke liye WhatsApp par contact karein."
      );

      setTimeout(function () {
        window.open(
          "https://wa.me/919358915420?text=" +
          encodeURIComponent(
            "Hello EXAMORO, mujhe RRB Group D PYQ Data Analysis e-book ₹39 mein kharidni hai."
          ),
          "_blank",
          "noopener,noreferrer"
        );
      }, 500);
    });
  }

  // CART BUTTON
  if (cartButton) {
    cartButton.addEventListener("click", function () {
      const booksSection = document.getElementById("books");

      if (booksSection) {
        booksSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        showToast("EXAMORO Smart Series — RRB Group D e-book");
      }
    });
  }

});
