document.addEventListener('DOMContentLoaded', () => {
  setupLanguageToggle();
});

function setupLanguageToggle() {
  const langToggleBtn = document.getElementById('langToggleBtn');
  if (!langToggleBtn) return;

  let currentLang = localStorage.getItem('atheer_lang') || 'ar';
  applyLanguage(currentLang);

  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    applyLanguage(currentLang);
    localStorage.setItem('atheer_lang', currentLang);
  });

  function applyLanguage(lang) {
    const htmlEl = document.documentElement;
    htmlEl.setAttribute('lang', lang);
    htmlEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    langToggleBtn.textContent = lang === 'ar' ? 'English' : 'العربية';

    const titleAr = document.querySelector('title.lang-ar');
    const titleEn = document.querySelector('title.lang-en');
    if (lang === 'ar' && titleAr) {
      document.title = titleAr.textContent;
    } else if (lang === 'en' && titleEn) {
      document.title = titleEn.textContent;
    }
  }
}
