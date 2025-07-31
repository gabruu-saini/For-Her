// Global variables to prevent conflicts
let isPopupOpen = false;

// Background Music Implementation
let backgroundMusic = null;
let isMusicPlaying = false;
let userHasInteracted = false;

// Initialize background music when page loads
window.addEventListener('load', function() {
  initializeBackgroundMusic();
  
  // Track user interaction for autoplay compliance
  document.addEventListener('click', enableUserInteraction, { once: true });
  document.addEventListener('touchstart', enableUserInteraction, { once: true });
  document.addEventListener('keydown', enableUserInteraction, { once: true });
});

function initializeBackgroundMusic() {
  backgroundMusic = document.getElementById('backgroundMusic');
  
  if (!backgroundMusic) {
    console.warn('Background music element not found');
    return;
  }
  
  // Set initial volume (subtle background music)
  backgroundMusic.volume = 0.3;
  
  // Add event listeners for music events
  backgroundMusic.addEventListener('play', onMusicPlay);
  backgroundMusic.addEventListener('pause', onMusicPause);
  backgroundMusic.addEventListener('error', onMusicError);
  
  // Try to detect if autoplay is possible
  detectAutoplaySupport();
}

function enableUserInteraction() {
  userHasInteracted = true;
  console.log('User interaction detected - audio can now play');
}

function detectAutoplaySupport() {
  // Create a silent test audio to check autoplay policy
  const testAudio = new Audio();
  testAudio.volume = 0;
  testAudio.muted = true;
  
  const playPromise = testAudio.play();
  
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log('Autoplay is supported (muted)');
        testAudio.pause();
      })
      .catch(() => {
        console.log('Autoplay is blocked - user interaction required');
        showMusicPrompt();
      });
  }
}

function showMusicPrompt() {
  // Add a subtle indicator that music is available
  const musicBtn = document.getElementById('musicToggle');
  if (musicBtn) {
    musicBtn.style.animation = 'musicPulse 2s ease-in-out infinite';
    setTimeout(() => {
      musicBtn.style.animation = 'none';
    }, 6000);
  }
}

function toggleBackgroundMusic() {
  if (!backgroundMusic) {
    console.error('Background music not initialized');
    return;
  }
  
  if (!userHasInteracted) {
    enableUserInteraction();
  }
  
  if (isMusicPlaying) {
    pauseBackgroundMusic();
  } else {
    playBackgroundMusic();
  }
}

function playBackgroundMusic() {
  if (!backgroundMusic) return;
  
  const playPromise = backgroundMusic.play();
  
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log('Background music started playing');
      })
      .catch((error) => {
        console.log('Failed to play background music:', error);
      });
  }
}

function pauseBackgroundMusic() {
  if (!backgroundMusic) return;
  backgroundMusic.pause();
  console.log('Background music paused');
}

function onMusicPlay() {
  isMusicPlaying = true;
  updateMusicButton(true);
}

function onMusicPause() {
  isMusicPlaying = false;
  updateMusicButton(false);
}

function onMusicError(error) {
  console.error('Background music error:', error);
}

function updateMusicButton(isPlaying) {
  const musicBtn = document.getElementById('musicToggle');
  const musicIcon = document.getElementById('musicIcon');
  const musicText = document.getElementById('musicText');
  
  if (!musicBtn || !musicIcon || !musicText) return;
  
  if (isPlaying) {
    musicBtn.classList.add('playing');
    musicIcon.textContent = '🎵';
    musicText.textContent = 'Playing';
    musicBtn.title = 'Click to pause music';
  } else {
    musicBtn.classList.remove('playing');
    musicIcon.textContent = '🔇';
    musicText.textContent = 'Music';
    musicBtn.title = 'Click to play romantic music';
  }
}

// Page visibility API to pause music when tab is not active
document.addEventListener('visibilitychange', function() {
  if (!backgroundMusic || !isMusicPlaying) return;
  
  if (document.hidden) {
    backgroundMusic.pause();
  } else {
    setTimeout(() => {
      if (isMusicPlaying && !backgroundMusic.paused) {
        backgroundMusic.play().catch(console.error);
      }
    }, 500);
  }
});


// Floating hearts animation
function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.innerHTML = ['💖', '💕', '💗', '💓'][Math.floor(Math.random() * 4)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDelay = Math.random() * 2 + 's';
  heart.style.animationDuration = (Math.random() * 2 + 4) + 's';

  document.getElementById('heartsContainer').appendChild(heart);

  setTimeout(() => {
    if (heart.parentNode) {
      heart.remove();
    }
  }, 6000);
}

// Flower petals animation
function createPetal() {
  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.innerHTML = ['🌸', '🌺', '🌼', '🌻'][Math.floor(Math.random() * 4)];
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.fontSize = (Math.random() * 15 + 20) + 'px';
  petal.style.animationDuration = (Math.random() * 3 + 5) + 's';

  document.body.appendChild(petal);

  setTimeout(() => {
    if (petal.parentNode) {
      petal.remove();
    }
  }, 8000);
}

// Reveal poem animation
function revealPoem() {
  const button = document.querySelector('.unlock-button');
  const container = document.getElementById('poemContainer');

  button.style.transform = 'scale(0.9)';
  button.innerHTML = '💕 Opening my heart... 💕';

  setTimeout(() => {
    container.style.display = 'block';

    const stanzas = container.querySelectorAll('.stanza');
    stanzas.forEach((stanza, index) => {
      stanza.style.animationDelay = index * 0.5 + 's';
    });

    button.style.display = 'none';

    // Create extra hearts for the reveal
    for (let i = 0; i < 20; i++) {
      setTimeout(createFloatingHeart, i * 100);
    }
  }, 500);
}

// FIXED: Show memory detail tooltip - completely rewritten to ensure unique content
function showMemoryDetail(element, messageText) {
  // Prevent any other click handlers
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  // Remove any existing tooltips from all elements
  document.querySelectorAll('.memory-tooltip').forEach(tooltip => tooltip.remove());

  // Create new tooltip with the specific message text
  const tooltip = document.createElement('div');
  tooltip.className = 'memory-tooltip';
  tooltip.textContent = messageText; // Use the passed messageText parameter
  
  // Position relative to the clicked element
  element.style.position = 'relative';
  element.appendChild(tooltip);

  // Auto-remove tooltip after 4 seconds
  setTimeout(() => {
    if (tooltip && tooltip.parentNode) {
      tooltip.remove();
    }
  }, 4000);
}

// FIXED: Show memory image popup - completely rewritten with proper event handling
function showMemoryImage(element, imageUrl, imageCaption) {
  // Prevent any other handlers and bubbling
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  if (isPopupOpen) return;
  isPopupOpen = true;

  // Remove any existing popups
  const existingPopup = document.getElementById('memoryImagePopup');
  if (existingPopup) {
    existingPopup.remove();
  }

  // Create popup overlay
  const overlay = document.createElement('div');
  overlay.id = 'memoryImagePopup';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-out;
  `;

  // Create popup content
  const content = document.createElement('div');
  content.style.cssText = `
    background: #fff;
    border-radius: 20px;
    padding: 20px;
    max-width: 90vw;
    max-height: 90vh;
    position: relative;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    transform: scale(0.8);
    transition: transform 0.3s ease-out;
    text-align: center;
  `;

  // Create image
  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = imageCaption;
  img.style.cssText = `
    max-width: 80vw;
    max-height: 60vh;
    border-radius: 12px;
    display: block;
    margin: 0 auto 15px auto;
  `;

  // Create caption
  const caption = document.createElement('div');
  caption.textContent = imageCaption;
  caption.style.cssText = `
    font-size: 1.1rem;
    color: #c2185b;
    margin-bottom: 10px;
    text-align: center;
  `;

  // Create close button
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '×';
  closeBtn.style.cssText = `
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    font-size: 2.5rem;
    color: #e91e63;
    cursor: pointer;
    transition: color 0.2s;
  `;

  // Close function
  const closePopup = () => {
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    content.style.transform = 'scale(0.8)';
    isPopupOpen = false;
    
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.remove();
      }
    }, 300);
  };

  // Event handlers
  closeBtn.onclick = closePopup;
  closeBtn.onmouseover = () => closeBtn.style.color = '#ad1457';
  closeBtn.onmouseout = () => closeBtn.style.color = '#e91e63';
  overlay.onclick = (e) => {
    if (e.target === overlay) closePopup();
  };

  // Assemble popup
  content.appendChild(closeBtn);
  content.appendChild(img);
  content.appendChild(caption);
  overlay.appendChild(content);
  document.body.appendChild(overlay);

  // Show with animation
  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
    overlay.style.visibility = 'visible';
    content.style.transform = 'scale(1)';
  });

  // Close on Escape key
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closePopup();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);
}

// FIXED: Feature detail overlay - completely rewritten with proper functionality
function showFeatureDetail(featureTitle, featureText, featureEmoji) {
  // Prevent any other handlers
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  // Remove any existing overlays
  const existingOverlay = document.querySelector('.feature-overlay-bg');
  if (existingOverlay) {
    existingOverlay.remove();
  }

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'feature-overlay-bg';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    background: linear-gradient(120deg, rgba(247,153,205,0.17) 0%, rgba(255,255,255,0.35) 45%, rgba(255,240,245,0.7) 100%), rgba(255,255,255, 0.18);
    backdrop-filter: blur(36px) saturate(180%) brightness(1.13);
    -webkit-backdrop-filter: blur(36px) saturate(180%) brightness(1.13);
    border-top: 1.7px solid rgba(255,255,255,0.22);
    border-bottom: 1.7px solid rgba(233,30,99,0.12);
    box-shadow: 0 8px 40px 0 rgba(233,30,99,0.14), 0 2px 14px 0 rgba(220,70,150,0.10);
    animation: fadeInOverlay 0.5s;
  `;

  // Create content container
  const content = document.createElement('div');
  content.className = 'feature-overlay-content';
  content.style.cssText = `
    background: rgba(255,255,255,0.52);
    border-radius: 24px;
    box-shadow: 0 12px 40px 0 rgba(233,30,99,0.11);
    padding: 22px 40px 30px 40px;
    border: 1.8px solid rgba(255,183,213,0.20);
    backdrop-filter: blur(14px) brightness(1.14);
    -webkit-backdrop-filter: blur(14px) brightness(1.14);
    position: relative;
    text-align: center;
    max-width: 90vw;
  `;

  // Create title
  const title = document.createElement('div');
  title.className = 'feature-title-big';
  title.textContent = featureTitle;
  title.style.cssText = `
    font-size: 2.3rem;
    color: #e91e63;
    font-weight: 700;
    margin-bottom: 22px;
    opacity: 0;
    animation: titleAnim 0.8s forwards;
  `;

  // Create text
  const text = document.createElement('div');
  text.className = 'feature-text-big';
  text.textContent = featureText;
  text.style.cssText = `
    font-size: 1.3rem;
    color: #d81b60;
    margin-top: 18px;
    opacity: 0;
    animation: textAnim 0.7s 0.7s forwards;
  `;

  // Create close button
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '×';
  closeBtn.style.cssText = `
    position: absolute;
    top: 18px;
    right: 18px;
    background: none;
    border: none;
    font-size: 2rem;
    color: #e91e63;
    cursor: pointer;
    transition: color 0.2s;
    z-index: 4;
  `;

  // Close function
  const closeOverlay = () => {
    overlay.remove();
    const emojiRain = document.getElementById('emojiRainOverlay');
    if (emojiRain) emojiRain.remove();
  };

  // Event handlers
  closeBtn.onclick = closeOverlay;
  closeBtn.onmouseover = () => closeBtn.style.color = '#ad1457';
  closeBtn.onmouseout = () => closeBtn.style.color = '#e91e63';
  overlay.onclick = (e) => {
    if (e.target === overlay) closeOverlay();
  };

  // Assemble overlay
  content.appendChild(closeBtn);
  content.appendChild(title);
  content.appendChild(text);
  overlay.appendChild(content);
  document.body.appendChild(overlay);

  // Start emoji rain
  createEmojiRain(featureEmoji);
}

// Create emoji rain effect
function createEmojiRain(emoji) {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  
  // Create rain container
  const emojiRain = document.createElement('div');
  emojiRain.id = 'emojiRainOverlay';
  emojiRain.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 10000;
    overflow: hidden;
  `;
  
  document.body.appendChild(emojiRain);

  const emojiCount = isMobile ? 15 : 30;
  let dropped = 0;

  function dropNextEmoji() {
    if (dropped >= emojiCount) return;

    const drop = document.createElement('div');
    drop.textContent = emoji;
    drop.style.cssText = `
      position: absolute;
      top: -60px;
      opacity: 0.92;
      user-select: none;
      pointer-events: none;
      filter: drop-shadow(0 1.5px 5px rgba(233,30,99,0.28));
      animation: emojiDrop 6s cubic-bezier(.55,.22,.64,1) forwards;
    `;
    
    // Random positioning and size
    drop.style.left = Math.random() * (isMobile ? 90 : 95) + 'vw';
    drop.style.fontSize = (isMobile ? 16 + Math.random() * 8 : 24 + Math.random() * 16) + 'px';
    drop.style.animationDelay = (Math.random() * 1.5) + 's';
    
    const drift = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 15 + 5);
    drop.style.setProperty('--drift', drift + 'vw');

    emojiRain.appendChild(drop);

    setTimeout(() => {
      if (drop.parentNode) drop.remove();
    }, 8000);

    dropped++;
    setTimeout(dropNextEmoji, 100 + Math.random() * 200);
  }

  dropNextEmoji();

  // Clean up container
  setTimeout(() => {
    if (emojiRain.parentNode) emojiRain.remove();
  }, (isMobile ? 8 : 10) * 1000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set up memory message boxes with unique content
  const memoryMessages = [
    "The night we watched the stars, hand in hand, and promised forever. 🌌",
    "When you hugged me after a rough day, my world felt at peace. 🤗", 
    "Laughing until midnight on our first road trip. 🚗💨"
  ];

  const memoryPhotos = [
    { url: "memory1.jpg", caption: "Our first selfie together!" },
    { url: "memory2.jpg", caption: "Your smile lights up my world." },
    { url: "memory3.mp4", caption: "Unforgettable day at the beach." }
  ];

  const featureData = [
    { title: "Your Beauty", text: "Inside and out, you are absolutely stunning", emoji: "🌹" },
    { title: "Your Heart", text: "So pure, loving and full of kindness", emoji: "💝" },
    { title: "Your Smile", text: "It brightens up even my darkest days", emoji: "✨" },
    { title: "Your Spirit", text: "Free, beautiful and absolutely captivating", emoji: "🦋" },
    { title: "Your Dreams", text: "I want to support every single one", emoji: "💫" },
    { title: "Our Bond", text: "Unbreakable, real and forever strong", emoji: "🔒" }
  ];

  // Set up memory message boxes
  const messageBoxes = document.querySelectorAll('.memory-message');
  messageBoxes.forEach((box, index) => {
    box.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      showMemoryDetail(box, memoryMessages[index]);
    };
  });

  // Set up memory photo boxes
  const photoBoxes = document.querySelectorAll('.memory-photo');
  photoBoxes.forEach((box, index) => {
    box.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      showMemoryImage(box, memoryPhotos[index].url, memoryPhotos[index].caption);
    };
  });

  // Set up feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    card.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const data = featureData[index];
      showFeatureDetail(data.title, data.text, data.emoji);
    };
  });

  // Initial animations
  for (let i = 0; i < 5; i++) {
    setTimeout(createFloatingHeart, i * 1000);
  }
  
  for (let i = 0; i < 3; i++) {
    setTimeout(createPetal, i * 1500);
  }
});

// Set up continuous animations
setInterval(createFloatingHeart, 3000);
setInterval(createPetal, 4000);