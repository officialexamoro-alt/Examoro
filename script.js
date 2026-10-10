/* ==========================================================================
   EXAMORO™ ENGINE MANAGEMENT LOGIC SYSTEM (script.js)
   ========================================================================== */

const menuToggle = document.getElementById('menuToggle');
const closeDrawer = document.getElementById('closeDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawer = document.getElementById('drawer');
const viewIndexBtn = document.getElementById('viewIndex');
const closeIndexModal = document.getElementById('closeIndexModal');
const closeIndexModalBottom = document.getElementById('closeIndexModalBottom');
const indexModal = document.getElementById('indexModal');
const themeToggle = document.getElementById('themeToggle');
const toastMessage = document.getElementById('toastMessage');

// 1. 🌙 DARK MODE SAVING CONSOLE (पॉइंट 20 - छात्र की पसंद को हमेशा याद रखना)
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

// 2. 🚨 ANTI-PIRACY SECURITY REINFORCEMENTS (पॉइंट 21 - चोरी से सुरक्षा शील्ड)
document.addEventListener('contextmenu', e => e.preventDefault()); // राइट-क्लिक ब्लॉक
document.addEventListener('keydown', e => {
  if (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'c' || e.key === 'p')) e.preventDefault(); // कोड चोरी ब्लॉक
});

// 3. 📱 NAVIGATION ROUTER SHIELD (मेन्यू ओपन-क्लोज और रिस्पॉन्सिव पेजेस)
function openMenu() { if (drawer && drawerOverlay) { drawer.classList.add('open'); drawerOverlay.classList.add('open'); } }
function closeMenu() { if (drawer && drawerOverlay) { drawer.classList.remove('open'); drawerOverlay.classList.remove('open'); } }
if (menuToggle) menuToggle.addEventListener('click', openMenu);
if (closeDrawer) closeDrawer.addEventListener('click', closeMenu);
if (drawerOverlay) drawerOverlay.addEventListener('click', closeMenu);

window.showHome = function() {
  document.querySelectorAll('.info-page').forEach(p => p.style.display = 'none');
  const mainView = document.getElementById('home');
  if (mainView) mainView.style.display = 'block';
  closeMenu();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.showPage = function(pageId) {
  const mainView = document.getElementById('home');
  if (mainView) mainView.style.display = 'none';
  document.querySelectorAll('.info-page').forEach(p => p.style.display = 'none');
  const target = document.getElementById(pageId);
  if (target) { target.style.display = 'block'; window.scrollTo({ top: 0, behavior: 'smooth' }); }
  closeMenu();
}

window.triggerCategoryRoute = function(keyword) {
  window.showHome();
  alert(`New analytical smart e-books for ${keyword} are coming soon! (जल्द आ रही है)`);
}

// 4. 📑 INDEX PREVIEW MODAL WINDOW CONSOLE (विषय-सूची पॉप-अप लॉजिक)
if (viewIndexBtn) viewIndexBtn.addEventListener('click', () => { if (indexModal) indexModal.classList.add('open'); });
function closePreviewWindow() { if (indexModal) indexModal.classList.remove('open'); }
if (closeIndexModal) closeIndexModal.addEventListener('click', closePreviewWindow);
if (closeIndexModalBottom) closeIndexModalBottom.addEventListener('click', closePreviewWindow);

// 5. 🔔 ROBOTIC FREE SALES INJECTOR (पॉइंट 19 - लाइव बिक्री अलर्ट)
const users = ["अमित (उत्तर प्रदेश)", "रोहित (राजस्थान)", "विक्रम (बिहार)", "दीपक (मध्य प्रदेश)", "संदीप (हरियाणा)", "मनीष (पंजाब)", "राहुल (झारखंड)", "संजय (गुजरात)"];
function triggerSalesAlert() {
  if (toastMessage) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    toastMessage.innerHTML = `🔔 <strong>${randomUser}</strong> ne abhi-abhi RRB Group D E-book kharidi! ⚡`;
    toastMessage.classList.add('show');
    setTimeout(() => { toastMessage.classList.remove('show'); }, 4000);
  }
}
// पहली बार पेज खुलने पर 5 सेकंड बाद अलर्ट दिखाएं, फिर हर 35 सेकंड में रिपीट करें
setTimeout(() => { triggerSalesAlert(); setInterval(triggerSalesAlert, 35000); }, 5000);
    
