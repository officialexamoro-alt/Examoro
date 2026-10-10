document.addEventListener("DOMContentLoaded", function () {
  const getElement = (id) => document.getElementById(id);

  // DARK / LIGHT MODE
  const themeToggle = getElement("themeToggle");

  function applyTheme(theme) {
    const isDark = theme === "dark";

    document.body.classList.toggle("dark-theme", isDark);

    if (themeToggle) {
      themeToggle.textContent = isDark ? "☀️" : "🌙";
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
      themeToggle.setAttribute("aria-pressed", String(isDark));
    }

    try {
      localStorage.setItem("examoro-theme", theme);
    } catch (error) {}
  }

  let savedTheme = "light";

  try {
    savedTheme = localStorage.getItem("examoro-theme") || "light";
  } catch (error) {}

  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const isDark = document.body.classList.contains("dark-theme");
      applyTheme(isDark ? "light" : "dark");
    });
  }

  // MOBILE NAVIGATION DRAWER
  const menuToggle = getElement("menuToggle");
  const drawer = getElement("drawer");
  const drawerOverlay = getElement("drawerOverlay");
  const closeDrawerButton = getElement("closeDrawer");

  function openDrawer() {
    if (!drawer || !drawerOverlay) return;

    drawer.classList.add("open");
    drawerOverlay.classList.add("active");
    document.body.classList.add("drawer-open");

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "true");
    }
  }

  function closeDrawer() {
    if (!drawer || !drawerOverlay) return;

    drawer.classList.remove("open");
    drawerOverlay.classList.remove("active");
    document.body.classList.remove("drawer-open");

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", openDrawer);
  }

  if (closeDrawerButton) {
    closeDrawerButton.addEventListener("click", closeDrawer);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener("click", closeDrawer);
  }

  if (drawer) {
    drawer.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeDrawer);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeDrawer();
      closeIndexModal();
    }
  });

  // TOAST MESSAGE
  const toastMessage = getElement("toastMessage");
  let toastTimer;

  function showToast(message) {
    if (!toastMessage) return;

    toastMessage.textContent = message;
    toastMessage.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
      toastMessage.classList.remove("show");
    }, 3000);
  }

  // INDEX PREVIEW MODAL
  const indexModal = getElement("indexModal");
  const modalTitle = getElement("modalTitle");
  const closeIndexButton = getElement("closeIndexModal");
  const closeIndexBottom = getElement("closeIndexModalBottom");

  function openIndexModal(bookName) {
    if (!indexModal) return;

    if (modalTitle && bookName) {
      modalTitle.textContent = bookName;
    }

    indexModal.classList.add("active");
    indexModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeIndexModal() {
    if (!indexModal) return;

    indexModal.classList.remove("active");
    indexModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  document.querySelectorAll(".viewIndex").forEach(function (button) {
    button.addEventListener("click", function () {
      const bookName = button.dataset.book || "EXAMORO™ Smart Series";
      openIndexModal(bookName);
    });
  });

  if (closeIndexButton) {
    closeIndexButton.addEventListener("click", closeIndexModal);
  }

  if (closeIndexBottom) {
    closeIndexBottom.addEventListener("click", closeIndexModal);
  }

  if (indexModal) {
    indexModal.addEventListener("click", function (event) {
      if (event.target === indexModal) {
        closeIndexModal();
      }
    });
  }

  // BUY NOW BUTTONS
  document.querySelectorAll(".buyNow").forEach(function (button) {
    button.addEventListener("click", function () {
      const bookName = button.dataset.book || "E-book";

      showToast(
        bookName + " की खरीदारी के लिए WhatsApp पर संपर्क करें।"
      );

      setTimeout(function () {
        window.open(
          "https://wa.me/919358915420?text=" +
            encodeURIComponent(
              "नमस्ते EXAMORO, मुझे " +
                bookName +
                " के बारे में जानकारी चाहिए।"
            ),
          "_blank",
          "noopener"
        );
      }, 500);
    });
  });

  // COMING SOON BUTTON
  document.querySelectorAll(".notifyButton").forEach(function (button) {
    button.addEventListener("click", function () {
      showToast("नई Smart Series की जानकारी जल्द उपलब्ध होगी!");
    });
  });

  // CART BUTTON
  const cartButton = getElement("cartButton");

  if (cartButton) {
    cartButton.addEventListener("click", function () {
      showToast("खरीदारी के लिए अपनी पसंद की E-book चुनें।");
    });
  }

  // CURRENT YEAR
  const currentYear = getElement("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // SMOOTH SCROLLING
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        closeDrawer();
      }
    });
  });
});
