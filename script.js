/* ==========================================================================
   EXAMORO™ ENGINE MANAGEMENT LOGIC SYSTEM (script.js)
   ========================================================================== */

const menuOpenBtn = document.getElementById('menuOpen');
const menuCloseBtn = document.getElementById('menuClose');
const menuOverlay = document.getElementById('menuOverlay');
const menuDrawer = document.getElementById('menuDrawer');
const browseButton = document.getElementById('browseButton');
const categoryList = document.getElementById('categoryList');
const searchForm = document.getElementById('searchForm');
const bookSearchInput = document.getElementById('bookSearch');
const noResultsMessage = document.getElementById('noResults');
const themeToggle = document.getElementById('themeToggle');
const salesAlert = document.getElementById('salesAlert');
const salesAlertText = document.getElementById('salesAlertText');

// 1. 🌙 DARK MODE SAVING CONSOLE (पॉइंट 20 - छात्र की पसंद याद रखना)
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
  if (themeToggle) themeToggle.textContent = '☀️';
}
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
      themeToggle.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggle.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  });
}

// 2. 🚨 ANTI-PIRACY SECURITY HANDLERS (पॉइंट 21 - चोरी से सुरक्षा लॉक)
document.addEventListener('contextmenu', e => e.preventDefault()); // राइट क्लिक ब्लॉक
document.addEventListener('keydown', e => {
  if (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'c' || e.key === 'p')) e.preventDefault(); // सोर्स कोड और कॉपी ब्लॉक
});

// 3. 📱 NAV ROUTING MANAGEMENT (मेन्यू ओपन-क्लोज और होम रीसेट)
function openMenu() { if (menuDrawer && menuOverlay) { menuDrawer.classList.add('open'); menuOverlay.classList.add('open'); } }
function closeMenu() { if (menuDrawer && menuOverlay) { menuDrawer.classList.remove('open'); menuOverlay.classList.remove('open'); } }
if (menuOpenBtn) menuOpenBtn.addEventListener('click', openMenu);
if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);
if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

function showHome() {
  document.querySelectorAll('.info-page').forEach(p => p.style.display = 'none');
  const homeView = document.getElementById('home');
  if (homeView) homeView.style.display = 'block';
  document.querySelectorAll('.book-card').forEach(c => { if (!c.hasAttribute('hidden')) c.style.display = 'block'; });
  if (noResultsMessage) noResultsMessage.style.display = 'none';
  if (bookSearchInput) bookSearchInput.value = '';
  closeMenu();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function triggerCategoryRoute(keyword) {
  showHome();
  if (bookSearchInput) { bookSearchInput.value = keyword; performSearch(); }
  closeMenu();
}

function showPage(pageId) {
  const homeView = document.getElementById('home');
  if (homeView) homeView.style.display = 'none';
  document.querySelectorAll('.info-page').forEach(p => p.style.display = 'none');
  const target = document.getElementById(pageId);
  if (target) { target.style.display = 'block'; window.scrollTo({ top: 0, behavior: 'smooth' }); }
  closeMenu();
}

if (browseButton && categoryList) { browseButton.addEventListener('click', () => categoryList.classList.toggle('open')); }

// 4. 📄 PREVIEW GALLERY CONSOLE (पॉइंट 16 - विषय-सूची ज़ूमर मोड)
window.openPreview = function(src) {
  const modal = document.getElementById('previewModal');
  const modalImg = document.getElementById('modalImg');
  if (modal && modalImg) { modal.style.display = 'grid'; modalImg.src = src; }
}
window.closePreview = function() { const modal = document.getElementById('previewModal'); if (modal) modal.style.display = 'none'; }

// 5. 🔍 CLIENT SIDE FILTER ENGINE (पॉइंट 18 - कमिंग सून सर्च फ़िल्टर)
function performSearch() {
  const filter = bookSearchInput.value.toLowerCase().trim();
  const bookCards = document.querySelectorAll('.book-card');
  let visibleCount = 0;

  bookCards.forEach(card => {
    if (!card.hasAttribute('hidden')) {
      const searchKeywords = card.getAttribute('data-search') || '';
      const titleText = card.querySelector('.book-title')?.textContent || '';
      const categoryText = card.querySelector('.book-category')?.textContent || '';
      const combinedText = (searchKeywords + ' ' + titleText + ' ' + categoryText).toLowerCase();

      if (combinedText.includes(filter)) { card.style.display = 'block'; visibleCount++; }
      else { card.style.display = 'none'; }
    }
  });
  if (noResultsMessage) noResultsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
}
if (bookSearchInput) bookSearchInput.addEventListener('input', performSearch);
if (searchForm) { searchForm.addEventListener('submit', e => { e.preventDefault(); performSearch(); }); }

// 6. 🔔 MULTI-REGION SALES NOTIFICATION (पॉइंट 19 - लाइव बिक्री अलर्ट)
const users = ["अमित (उत्तर प्रदेश)", "रोहित (राजस्थान)", "विक्रम (बिहार)", "दीपक (मध्य प्रदेश)", "संदीप (हरियाणा)", "मनीष (पंजाब)", "राहुल (झारखंड)", "संजय (गुजरात)"];
function triggerSalesAlert() {
  if (salesAlertText && salesAlert) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    salesAlertText.innerHTML = `🔥 <strong>${randomUser}</strong> ne abhi-abhi RRB Group D Data Analysis E-book kharidi! ⚡`;
    salesAlert.classList.add('show');
    setTimeout(() => { salesAlert.classList.remove('show'); }, 4000);
  }
}
// पहली बार पेज खुलने पर 5 सेकंड बाद अलर्ट दिखाएं, फिर हर 35 सेकंड में रिपीट करें
setTimeout(() => {
  triggerSalesAlert();
  setInterval(triggerSalesAlert, 35000);
}, 5000);

// 7. 📥 PWA LIVING WEB ENGINE (पॉइंट 9 - मोबाइल होमस्क्रीन ऐप इंस्टॉल)
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); deferredPrompt = e;
  const pwaBtn = document.getElementById('pwaInstall');
  if (pwaBtn) pwaBtn.style.display = 'block';
});
const pwaBtn = document.getElementById('pwaInstall');
if (pwaBtn) {
  pwaBtn.addEventListener('click', (e) => {
    e.preventDefault(); pwaBtn.style.display = 'none';
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => { deferredPrompt = null; });
    }
  });
}
