 document.addEventListener("DOMContentLoaded", function () {

  /* ---------- HELPER ---------- */

  const getElement = (id) => document.getElementById(id);


  /* ---------- DARK / LIGHT MODE ---------- */

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
    } catch (error) {
      // Website will still work if localStorage is unavailable.
    }
  }

  let savedTheme = "light";

  try {
    savedTheme = localStorage.getItem("examoro-theme") || "light";
  } catch (error) {
    savedTheme = "light";
  }

  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const isDark = document.body.classList.contains("dark-theme");

      applyTheme(isDark ? "light" : "dark");
    });
  }


  /* ---------- MOBILE NAVIGATION DRAWER ---------- */

  const menuToggle = getElement("menuToggle");
  const drawer = getElement("drawer");
  const drawerOverlay = getElement("drawerOverlay");
  const closeDrawerButton = getElement("closeDrawer");

  function openDrawer() {
    if (!drawer || !drawerOverlay) return;

    drawer.classList.add("open");
    drawerOverlay.classList.add("active");
    document.body.classList.add("drawer-open");

    drawer.setAttribute("aria-hidden", "false");

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "true");
    }

    if (closeDrawerButton) {
      closeDrawerButton.focus();
    }
  }

  function closeDrawer() {
    if (!drawer || !drawerOverlay) return;

    drawer.classList.remove("open");
    drawerOverlay.classList.remove("active");
    document.body.classList.remove("drawer-open");

    drawer.setAttribute("aria-hidden", "true");

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
    drawer.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        closeDrawer();
      });
    });
  }


  /* ---------- ESCAPE KEY ---------- */

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeDrawer();
      closeIndexModal();
    }
  });


  /* ---------- BOOK INDEX PREVIEW MODAL ---------- */

  const viewIndexButton = getElement("viewIndex");
  const indexModal = getElement("indexModal");
  const closeIndexButton = getElement("closeIndexModal");
  const closeIndexBottomButton = getElement("closeIndexModalBottom");

  function openIndexModal() {
    if (!indexModal) return;

    indexModal.classList.add("active");
    indexModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    if (closeIndexButton) {
      closeIndexButton.focus();
    }
  }

  function closeIndexModal() {
    if (!indexModal) return;

    indexModal.classList.remove("active");
    indexModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");
  }

  if (viewIndexButton) {
    viewIndexButton.addEventListener("click", openIndexModal);
  }

  if (closeIndexButton) {
    closeIndexButton.addEventListener("click", closeIndexModal);
  }

  if (closeIndexBottomButton) {
    closeIndexBottomButton.addEventListener("click", closeIndexModal);
  }

  if (indexModal) {
    indexModal.addEventListener("click", function (event) {
      if (event.target === indexModal) {
        closeIndexModal();
      }
    });
  }


  /* ---------- TOAST MESSAGE ---------- */

  const toastMessage = getElement("toastMessage");

  let toastTimer;

  function showToast(message) {
    if (!toastMessage) {
      alert(message);
      return;
    }

    toastMessage.textContent = message;
    toastMessage.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
      toastMessage.classList.remove("show");
    }, 3000);
  }


  /* ---------- BUY NOW BUTTON ---------- */

  const buyNowButton = getElement("buyNow");

  if (buyNowButton) {
    buyNowButton.addEventListener("click", function (event) {
      event.preventDefault();

      showToast(
        "📚 खरीदारी जल्द शुरू होगी। कृपया अपडेट के लिए जुड़े रहें!"
      );
    });
  }


  /* ---------- CART BUTTON ---------- */

  const cartButton = getElement("cartButton");

  if (cartButton) {
    cartButton.addEventListener("click", function () {
      showToast(
        "🛒 EXAMORO Store का cart जल्द उपलब्ध होगा!"
      );
    });
  }


  /* ---------- CURRENT YEAR ---------- */

  const currentYear = getElement("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* ---------- CLOSE DRAWER WHEN RESIZED ---------- */

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) {
      closeDrawer();
    }
  });


  /* ---------- SMOOTH SCROLL ---------- */

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
      }
    });
  });


  /* ---------- ACCORDION BEHAVIOUR ---------- */

  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;

      accordionItems.forEach(function (otherItem) {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    });
  });
