document.addEventListener('DOMContentLoaded', () => {
  setupLanguageToggle();
  setupMobileMenu();
  setupVoiceChatSimulation();
  setupDictationSimulation();
  setupCardInteractions();
});

// 1. Mobile Navigation Menu Toggle
function setupMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      // Simple toggle animation for burger lines
      const spans = menuToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }
}

// 2. Interactive AI Voice Chat Simulation
function setupVoiceChatSimulation() {
  const chatArea = document.getElementById('mockupChatArea');
  const micBtn = document.getElementById('mockupMicBtn');
  const visualizer = document.getElementById('mockupVisualizer');
  const appStatus = document.getElementById('mockupStatus');
  
  if (!chatArea || !micBtn || !visualizer) return;

  const chatMessages = [
    { sender: 'user', text: 'Hi! I need help with my pronunciation.' },
    { sender: 'ai', text: 'Hello! I can help you with that. Are you ready for a quick test?' },
    { sender: 'user', text: 'Yes! I want to practice English pronunciation.' },
    { sender: 'ai', text: 'Great! Let\'s start by repeating this phrase after me: "The quick brown fox."' }
  ];

  let stepIndex = 0;
  let isChatRunning = false;
  let chatTimeout = null;

  // Visualizer Bars Animation Control
  const waveBars = visualizer.querySelectorAll('.wave-bar');
  
  function startVisualizer() {
    waveBars.forEach(bar => bar.classList.add('active'));
  }

  function stopVisualizer() {
    waveBars.forEach(bar => bar.classList.remove('active'));
  }

  function addChatBubble(sender, text) {
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble', sender);
    bubble.textContent = text;
    chatArea.appendChild(bubble);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  function getStatusText(key) {
    const isEn = document.documentElement.getAttribute('lang') === 'en';
    const texts = {
      connected: isEn ? 'Connected' : 'متصل',
      speaking: isEn ? 'System is speaking...' : 'النظام يتحدث...',
      listening: isEn ? 'Listening...' : 'يستمع...'
    };
    return texts[key];
  }

  function runNextStep() {
    if (stepIndex >= chatMessages.length) {
      // Loop or stop
      appStatus.innerHTML = `<span class="logo-dot"></span> ${getStatusText('connected')}`;
      micBtn.classList.remove('recording');
      stopVisualizer();
      isChatRunning = false;
      stepIndex = 0; // reset for next tap
      return;
    }

    const current = chatMessages[stepIndex];
    
    if (current.sender === 'ai') {
      appStatus.innerHTML = `<span class="logo-dot"></span> ${getStatusText('speaking')}`;
      startVisualizer();
      micBtn.classList.remove('recording');
      
      chatTimeout = setTimeout(() => {
        addChatBubble('ai', current.text);
        stopVisualizer();
        appStatus.innerHTML = `<span class="logo-dot"></span> ${getStatusText('connected')}`;
        stepIndex++;
        
        // Auto trigger next user step after a brief delay
        chatTimeout = setTimeout(runNextStep, 1500);
      }, 2000);
    } else {
      appStatus.innerHTML = `<span class="logo-dot" style="background-color: #ef4444; box-shadow: 0 0 10px #ef4444;"></span> ${getStatusText('listening')}`;
      micBtn.classList.add('recording');
      stopVisualizer();
      
      chatTimeout = setTimeout(() => {
        addChatBubble('user', current.text);
        micBtn.classList.remove('recording');
        stepIndex++;
        
        // Trigger AI reply
        chatTimeout = setTimeout(runNextStep, 1200);
      }, 2500);
    }
  }

  micBtn.addEventListener('click', () => {
    if (isChatRunning) {
      // Clear timeout, stop, and reset
      clearTimeout(chatTimeout);
      chatArea.innerHTML = '';
      stopVisualizer();
      micBtn.classList.remove('recording');
      appStatus.innerHTML = `<span class="logo-dot"></span> ${getStatusText('connected')}`;
      isChatRunning = false;
      stepIndex = 0;
    } else {
      isChatRunning = true;
      chatArea.innerHTML = '';
      runNextStep();
    }
  });
}

// 3. Interactive Dictation/Spelling Game Simulation
function setupDictationSimulation() {
  const dictationWords = document.querySelectorAll('.dictation-word');
  const mockTextEl = document.querySelector('.dictation-mock-text');
  
  if (!dictationWords.length || !mockTextEl) return;

  const targetSentence = "Learning English is fun and easy with Atheer";
  const wordsArray = targetSentence.split(" ");
  let wordIndex = 0;
  let charIndex = 0;

  function typeMockText() {
    if (wordIndex >= wordsArray.length) {
      // Reset after a delay
      setTimeout(() => {
        dictationWords.forEach(w => {
          w.classList.remove('filled', 'incorrect');
          w.textContent = '';
        });
        mockTextEl.innerHTML = '<span class="dictation-cursor"></span>';
        wordIndex = 0;
        charIndex = 0;
        setTimeout(typeMockText, 1000);
      }, 4000);
      return;
    }

    const currentWord = wordsArray[wordIndex];
    
    // Simulate user typing word character by character
    if (charIndex < currentWord.length) {
      // Add character to the typing input display
      const currentVal = mockTextEl.textContent;
      mockTextEl.innerHTML = currentVal + currentWord[charIndex] + '<span class="dictation-cursor"></span>';
      charIndex++;
      setTimeout(typeMockText, 150 + Math.random() * 100);
    } else {
      // Finished spelling current word, hit space
      setTimeout(() => {
        // Render word in its correct placeholder slot
        const targetSlot = dictationWords[wordIndex];
        if (targetSlot) {
          targetSlot.textContent = currentWord;
          targetSlot.classList.add('filled');
          
          // Introduce a simulated mistake occasionally to look natural
          if (currentWord.toLowerCase() === 'easy' && Math.random() > 0.7) {
             targetSlot.textContent = 'eazy';
             targetSlot.classList.add('incorrect');
             // Fix it after 1 sec
             setTimeout(() => {
               targetSlot.classList.remove('incorrect');
               targetSlot.textContent = 'easy';
             }, 800);
          }
        }

        // Clear typing line for next word
        mockTextEl.innerHTML = '<span class="dictation-cursor"></span>';
        wordIndex++;
        charIndex = 0;
        setTimeout(typeMockText, 600);
      }, 300);
    }
  }

  // Start the typing loop
  setTimeout(typeMockText, 1500);
}

// 4. App Mockup Grid Card Interactions
function setupCardInteractions() {
  const cardSpeaking = document.getElementById('mockupCardSpeaking');
  const cardDictation = document.getElementById('mockupCardDictation');
  const cardLevel = document.getElementById('mockupCardLevel');
  const cardStories = document.getElementById('mockupCardStories');

  if (cardSpeaking) {
    cardSpeaking.addEventListener('click', () => {
      const target = document.getElementById('hero');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // Highlight mic button inside hero mockup
        const micBtn = document.getElementById('mockupMicBtn');
        if (micBtn) {
          micBtn.style.transform = 'scale(1.2)';
          setTimeout(() => {
            micBtn.style.transform = 'none';
          }, 600);
        }
      }
    });
  }

  if (cardDictation) {
    cardDictation.addEventListener('click', () => {
      const target = document.getElementById('preview');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // Highlight dictation box
        const demoBox = document.querySelector('.dictation-demo-box');
        if (demoBox) {
          demoBox.style.boxShadow = '0 0 20px rgba(20, 184, 166, 0.4)';
          setTimeout(() => {
            demoBox.style.boxShadow = 'none';
          }, 1500);
        }
      }
    });
  }

  if (cardLevel) {
    cardLevel.addEventListener('click', () => {
      // Find features section and highlight the Level Tracking card
      const featureCards = document.querySelectorAll('.feature-card');
      const featuresSection = document.getElementById('features');
      if (featureCards.length >= 3 && featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const levelCard = featureCards[2];
          levelCard.style.transition = 'all 0.5s ease';
          levelCard.style.transform = 'scale(1.05)';
          levelCard.style.borderColor = 'var(--accent-teal)';
          levelCard.style.boxShadow = '0 10px 30px rgba(20, 184, 166, 0.2)';
          
          setTimeout(() => {
            levelCard.style.transform = '';
            levelCard.style.borderColor = '';
            levelCard.style.boxShadow = '';
          }, 1500);
        }, 800);
      }
    });
  }

  if (cardStories) {
    cardStories.addEventListener('click', () => {
      const target = document.getElementById('preview');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

// 5. Bilingual Language Switcher Setup
function setupLanguageToggle() {
  const langToggleBtn = document.getElementById('langToggleBtn');
  if (!langToggleBtn) return;

  // Read saved language preference or default to Arabic
  let currentLang = localStorage.getItem('atheer_lang') || 'ar';
  setLanguage(currentLang);

  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    setLanguage(currentLang);
    localStorage.setItem('atheer_lang', currentLang);
  });

  function setLanguage(lang) {
    const htmlEl = document.documentElement;
    htmlEl.setAttribute('lang', lang);
    htmlEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    langToggleBtn.textContent = lang === 'ar' ? 'EN' : 'AR';
    
    // Dynamically update document title based on language classes
    const titleAr = document.querySelector('title.lang-ar');
    const titleEn = document.querySelector('title.lang-en');
    if (lang === 'ar' && titleAr) {
      document.title = titleAr.textContent;
    } else if (lang === 'en' && titleEn) {
      document.title = titleEn.textContent;
    }
  }
}
