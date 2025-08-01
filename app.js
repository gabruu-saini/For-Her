// ==========================================
// GLOBAL VARIABLES - Prevent conflicts
// ==========================================
let isPopupOpen = false;
let backgroundMusic = null;
let isMusicPlaying = false;
let loadingComplete = false;
let musicStarted = false;

// ==========================================
// BACKGROUND MUSIC & LOADING SCREEN
// ==========================================

// Initialize everything when page loads
window.addEventListener('load', function () {
    initializeBackgroundMusic();
    startLoadingSequence();
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
    backgroundMusic.addEventListener('canplaythrough', onMusicLoaded);
}

function startLoadingSequence() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.querySelector('.progress-fill');
    const welcomeText = document.querySelector('.welcome-text');

    if (!loadingScreen) {
        console.error('Loading screen not found');
        return;
    }

    // Start progress bar animation
    if (progressBar) {
        progressBar.style.width = '100%';
    }

    // Animate welcome text
    if (welcomeText) {
        setTimeout(() => {
            welcomeText.style.opacity = '1';
            welcomeText.style.transform = 'translateY(0)';
        }, 500);
    }

    // After 4 seconds, complete loading and start music
    setTimeout(() => {
        completeLoading();
    }, 4000);
}

function completeLoading() {
    const loadingScreen = document.getElementById('loadingScreen');

    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            loadingComplete = true;
            startBackgroundMusic();
        }, 800);
    } else {
        loadingComplete = true;
        startBackgroundMusic();
    }
}

function startBackgroundMusic() {
    if (!backgroundMusic || musicStarted) return;

    console.log('Attempting to start background music...');

    const playPromise = backgroundMusic.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log('Background music started successfully!');
                musicStarted = true;
                celebrateWithHearts();
                hideMusicButton();
            })
            .catch((error) => {
                console.log('Autoplay prevented by browser:', error.message);
                showMusicButton();
            });
    }
}

function celebrateWithHearts() {
    // Create a burst of floating hearts when music starts
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 100);
    }
}

function showMusicButton() {
    const musicControls = document.querySelector('.music-controls');
    if (musicControls) {
        musicControls.style.display = 'block';
        musicControls.style.animation = 'musicControlsSlideIn 1s ease-out';

        const musicBtn = document.getElementById('musicToggle');
        if (musicBtn) {
            musicBtn.style.animation = 'musicPulse 2s ease-in-out infinite';
            setTimeout(() => {
                musicBtn.style.animation = 'none';
            }, 10000);
        }
    }
}

function hideMusicButton() {
    const musicControls = document.querySelector('.music-controls');
    if (musicControls) {
        musicControls.style.display = 'none';
    }
}

// Manual music toggle function (fallback)
function toggleBackgroundMusic() {
    if (!backgroundMusic) {
        console.error('Background music not initialized');
        return;
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
                console.log('Background music started playing (manual)');
                musicStarted = true;
                celebrateWithHearts();
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
    showMusicButton();
}

function onMusicLoaded() {
    console.log('Background music loaded and ready to play');
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

// ==========================================
// FLOATING ANIMATIONS
// ==========================================

// Single, consistent floating heart function
function createFloatingHeart() {
    const heartsContainer = document.getElementById('heartsContainer');
    if (!heartsContainer) return;

    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = ['💖', '💕', '💗', '💓', '💝'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heart.style.animationDuration = (Math.random() * 2 + 4) + 's';
    heart.style.fontSize = (Math.random() * 10 + 18) + 'px';

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        if (heart && heart.parentNode) {
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
        if (petal && petal.parentNode) {
            petal.remove();
        }
    }, 8000);
}

// ==========================================
// INTERACTIVE FEATURES
// ==========================================

// Reveal poem animation
function revealPoem() {
    const button = document.querySelector('.unlock-button');
    const container = document.getElementById('poemContainer');

    if (!button || !container) return;

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

// Memory message tooltip
function showMemoryDetail(element, messageText) {
    if (!element || !messageText) return;

    // Remove any existing tooltips
    document.querySelectorAll('.memory-tooltip').forEach(tooltip => tooltip.remove());

    // Create new tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'memory-tooltip';
    tooltip.textContent = messageText;

    // Position relative to the clicked element
    element.style.position = 'relative';
    element.appendChild(tooltip);

    // Auto-remove tooltip after 3.5 seconds
    setTimeout(() => {
        if (tooltip && tooltip.parentNode) {
            tooltip.remove();
        }
    }, 3500);
}

// Memory image popup
function showMemoryImage(element, imageUrl, imageCaption) {
    if (!element || !imageUrl || !imageCaption) return;

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
    overlay.className = 'image-popup-overlay fade-in';

    // Create popup content
    const content = document.createElement('div');
    content.className = 'image-popup-content';

    // Create image
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = imageCaption;
    img.className = 'popup-image';

    // Handle image load error
    img.onerror = () => {
        console.warn(`Failed to load image: ${imageUrl}`);
        caption.textContent = 'Image not available - ' + imageCaption;
    };

    // Create caption
    const caption = document.createElement('div');
    caption.textContent = imageCaption;
    caption.className = 'popup-caption';

    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.className = 'popup-close-btn';

    // Close function
    const closePopup = () => {
        overlay.classList.remove('fade-in');
        overlay.classList.add('fade-out');
        isPopupOpen = false;

        setTimeout(() => {
            if (overlay && overlay.parentNode) {
                overlay.remove();
            }
        }, 300);
    };

    // Event handlers
    closeBtn.onclick = closePopup;
    overlay.onclick = (e) => {
        if (e.target === overlay) closePopup();
    };

    // Assemble popup
    content.appendChild(closeBtn);
    content.appendChild(img);
    content.appendChild(caption);
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closePopup();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Feature detail overlay
function showFeatureDetail(card) {
    if (!card) return;

    const title = card.querySelector('.feature-title')?.textContent || 'Feature';
    const text = card.querySelector('.feature-text')?.textContent || 'Description';
    const emoji = card.querySelector('.feature-icon')?.textContent || '💖';

    // Remove any existing overlays
    const existingOverlay = document.querySelector('.feature-overlay-bg');
    if (existingOverlay) {
        existingOverlay.remove();
    }

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'feature-overlay-bg';

    // Create content container
    const content = document.createElement('div');
    content.className = 'feature-overlay-content';

    // Create title
    const titleElem = document.createElement('div');
    titleElem.className = 'feature-title-big';
    titleElem.textContent = title;

    // Create text
    const textElem = document.createElement('div');
    textElem.className = 'feature-text-big';
    textElem.textContent = text;

    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.className = 'feature-overlay-close';

    // Close function
    const closeOverlay = () => {
        overlay.remove();
        const emojiRain = document.getElementById('emojiRainOverlay');
        if (emojiRain) emojiRain.remove();
    };

    // Event handlers
    closeBtn.onclick = closeOverlay;
    overlay.onclick = (e) => {
        if (e.target === overlay) closeOverlay();
    };

    // Assemble overlay
    content.appendChild(closeBtn);
    content.appendChild(titleElem);
    content.appendChild(textElem);
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    // Start emoji rain
    createEmojiRain(emoji);
}

// Create emoji rain effect
function createEmojiRain(emoji) {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Create rain container
    const emojiRain = document.createElement('div');
    emojiRain.id = 'emojiRainOverlay';
    emojiRain.className = 'emoji-rain';

    document.body.appendChild(emojiRain);

    const emojiCount = isMobile ? 15 : 30;
    let dropped = 0;

    function dropNextEmoji() {
        if (dropped >= emojiCount) return;

        const drop = document.createElement('div');
        drop.textContent = emoji;
        drop.className = 'emoji-raindrop';

        // Random positioning and properties
        drop.style.left = Math.random() * (isMobile ? 90 : 95) + 'vw';
        drop.style.fontSize = (isMobile ? 16 + Math.random() * 8 : 24 + Math.random() * 16) + 'px';
        drop.style.animationDelay = (Math.random() * 1.5) + 's';

        const drift = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 15 + 5);
        drop.style.setProperty('--drift', drift + 'vw');

        emojiRain.appendChild(drop);

        setTimeout(() => {
            if (drop && drop.parentNode) drop.remove();
        }, 8000);

        dropped++;
        setTimeout(dropNextEmoji, 100 + Math.random() * 200);
    }

    dropNextEmoji();

    // Clean up container
    setTimeout(() => {
        if (emojiRain && emojiRain.parentNode) emojiRain.remove();
    }, (isMobile ? 8 : 10) * 1000);
}

// ==========================================
// PAGE VISIBILITY & INITIALIZATION
// ==========================================

// Page visibility API to handle tab switching
document.addEventListener('visibilitychange', function () {
    if (!backgroundMusic || !isMusicPlaying || !musicStarted) return;

    if (document.hidden) {
        backgroundMusic.pause();
    } else {
        setTimeout(() => {
            if (isMusicPlaying && backgroundMusic.paused) {
                backgroundMusic.play().catch(console.error);
            }
        }, 300);
    }
});

// Ensure music starts even if loading screen is skipped
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        if (!loadingComplete && !musicStarted) {
            startBackgroundMusic();
        }
    }, 5000);
});

// Initialize everything when DOM is loaded
window.addEventListener('DOMContentLoaded', function () {
    // Set up memory data
    const memoryMessages = [
        "The day I proposed you with the ring, we both were lost in each other. 🌌",
        "When I had a rough day, You gave me a paper kiss. Made my day! 🤗",
        "Like your way of caring for me by asking me to sleep, which made me creep. 😴"
    ];

    const memoryPhotos = [
        { url: "memory1.jpg", caption: "Our first selfie together!" },
        { url: "memory2.jpg", caption: "Your words, as a lovely order." },
        { url: "memory3.jpg", caption: "The cringe day 🤤" }
    ];
    

    // Set up memory message boxes
    const messageBoxes = document.querySelectorAll('.memory-message');
    messageBoxes.forEach((box, index) => {
        if (memoryMessages[index]) {
            box.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                showMemoryDetail(box, memoryMessages[index]);
            });
        }
    });

    // Set up memory photo boxes
    const photoBoxes = document.querySelectorAll('.memory-photo');
    photoBoxes.forEach((box, index) => {
        if (memoryPhotos[index]) {
            box.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                showMemoryImage(box, memoryPhotos[index].url, memoryPhotos[index].caption);
            });
        }
    });

    // Set up feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card) => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showFeatureDetail(card);
        });
    });

    const featureData = [
        { title: "Your Beauty", text: "Inside and out, you are absolutely stunning", emoji: "🌹" },
        { title: "Your Heart", text: "So pure, loving and full of kindness", emoji: "💝" },
        { title: "Your Smile", text: "It brightens up even my darkest days", emoji: "✨" },
        { title: "Your Spirit", text: "Free, beautiful and absolutely captivating", emoji: "🦋" },
        { title: "Your Dreams", text: "I want to support every single one", emoji: "💫" },
        { title: "Our Bond", text: "Unbreakable, real and forever strong", emoji: "🔒" }
    ];

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
