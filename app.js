// PWA and App Configuration
const APP_CONFIG = {
    version: '2.0.0',
    cacheName: 'gratitude-journal-v2.0.0',
    storageKeys: {
        entries: 'gratitude_entries',
        streak: 'gratitude_streak',
        lastEntry: 'last_entry_date',
        installDismissed: 'install_dismissed',
        bestStreak: 'best_streak'
    }
};

// Positive Messages from provided data
const POSITIVE_MESSAGES = {
    welcome: [
        "Ready to count your blessings? ✨",
        "What made your heart happy today? 💖",
        "Time to celebrate the good moments! 🌟",
        "Let's capture today's joyful moments! 🎉"
    ],
    encouraging: [
        "Every gratitude counts! 🌸",
        "You're building something beautiful! 🦋",
        "Your positive energy is growing! 🌻", 
        "Keep shining your grateful light! ⭐"
    ],
    milestones: [
        "Amazing! You're on a gratitude streak! 🔥",
        "Look at you building this beautiful habit! 💪",
        "Your grateful heart is inspiring! 🌈",
        "You're a gratitude champion! 👑"
    ]
};

// Inspirational quotes for daily motivation
const INSPIRATIONAL_QUOTES = [
    "Gratitude turns what we have into enough. 💫",
    "The heart that gives thanks is a happy one. 💝",
    "Every day holds a blessing waiting to be discovered. 🌺",
    "Grateful hearts attract more reasons to be grateful. 🧲",
    "Your gratitude is your superpower! ⚡",
    "Small moments, big blessings. 🍃",
    "Gratitude is the music of the heart. 🎵",
    "Today's gratitude is tomorrow's happiness. 🌅",
    "Blessed are those who see beauty in everyday moments. 👁️",
    "Your grateful spirit lights up the world. 🕯️"
];

// Streak milestone messages
const STREAK_MILESTONES = [
    { days: 1, message: "Beautiful start! Your gratitude journey begins! 🌱", icon: "🌱" },
    { days: 3, message: "Three days of joy! You're glowing! 💚", icon: "💚" },
    { days: 7, message: "One magical week! You're on fire! 🔥", icon: "🔥" },
    { days: 14, message: "Two weeks of blessings! You're sparkling! ⭐", icon: "⭐" },
    { days: 21, message: "21 days! You're a habit-building hero! 🎉", icon: "🎉" },
    { days: 30, message: "One month of gratitude magic! Incredible! 🏆", icon: "🏆" },
    { days: 60, message: "Two months! Your light is inspiring everyone! 💫", icon: "💫" },
    { days: 100, message: "100 days! You're a gratitude legend! 👑", icon: "👑" }
];

// Encouraging placeholder texts
const PLACEHOLDER_TEXTS = [
    "Something that made me smile today...",
    "A person who brightened my day...",
    "A moment of pure joy I experienced...",
    "Something beautiful I noticed...",
    "A lesson that lifted my spirits...",
    "An act of kindness that touched my heart...",
    "Something I accomplished that I'm proud of...",
    "A memory that brings me peace...",
    "Something in nature that amazed me...",
    "A blessing I sometimes take for granted..."
];

console.log("✨ Gratitude Journal PWA ✨");
console.log("Developed by: Kaneeshkar");
console.log("Company: AK Industry");
console.log("Made with love and positive vibes! 💝");


// Animation System
class AnimationManager {
    constructor() {
        this.container = document.getElementById('animationContainer');
    }

    createFallingHearts() {
        if (!this.container) return;
        
        const colors = ['💖', '💝', '💗', '💕', '💞', '❤️', '💓', '💘'];
        const heartCount = 12;
        
        for (let i = 0; i < heartCount; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'falling-heart';
                heart.textContent = colors[Math.floor(Math.random() * colors.length)];
                heart.style.left = Math.random() * 100 + '%';
                heart.style.animationDelay = Math.random() * 1 + 's';
                heart.style.animationDuration = (2.5 + Math.random() * 1.5) + 's';
                heart.style.fontSize = (18 + Math.random() * 12) + 'px';
                
                this.container.appendChild(heart);
                
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 4500);
            }, i * 150);
        }
    }

    createSparkles() {
        if (!this.container) return;
        
        const sparkles = ['✨', '⭐', '🌟', '💫', '🔆', '⚡'];
        const sparkleCount = 8;
        
        for (let i = 0; i < sparkleCount; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
                sparkle.style.left = (20 + Math.random() * 60) + '%';
                sparkle.style.top = (20 + Math.random() * 60) + '%';
                sparkle.style.animationDelay = Math.random() * 0.5 + 's';
                sparkle.style.fontSize = (14 + Math.random() * 8) + 'px';
                
                this.container.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 2500);
            }, i * 100);
        }
    }

    createConfetti() {
        if (!this.container) return;
        
        const colors = ['#FF6B9D', '#FFB366', '#FFD93D', '#4ECDC4', '#45B7D1'];
        const shapes = ['square', 'circle', 'triangle'];
        const confettiCount = 15;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                if (shape === 'circle') {
                    confetti.style.borderRadius = '50%';
                } else if (shape === 'triangle') {
                    confetti.style.width = '0';
                    confetti.style.height = '0';
                    confetti.style.borderLeft = '4px solid transparent';
                    confetti.style.borderRight = '4px solid transparent';
                    confetti.style.borderBottom = '8px solid ' + color;
                    confetti.style.background = 'none';
                } else {
                    confetti.style.background = color;
                }
                
                if (shape !== 'triangle') {
                    confetti.style.background = color;
                }
                
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.animationDelay = Math.random() * 0.5 + 's';
                
                this.container.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 3000);
            }, i * 80);
        }
    }

    celebrate(type = 'hearts') {
        switch (type) {
            case 'hearts':
                this.createFallingHearts();
                break;
            case 'sparkles':
                this.createSparkles();
                break;
            case 'confetti':
                this.createConfetti();
                break;
            case 'all':
                this.createFallingHearts();
                setTimeout(() => this.createSparkles(), 1000);
                setTimeout(() => this.createConfetti(), 2000);
                break;
        }
    }
}

// Calendar Manager
class CalendarManager {
    constructor(app) {
        this.app = app;
        this.currentDate = new Date();
        this.selectedDate = null;
        this.initElements();
        this.initEventListeners();
        this.render();
    }

    initElements() {
        this.currentMonthElement = document.getElementById('currentMonth');
        this.calendarDaysElement = document.getElementById('calendarDays');
        this.prevMonthBtn = document.getElementById('prevMonth');
        this.nextMonthBtn = document.getElementById('nextMonth');
        this.calendarModal = document.getElementById('calendarModal');
        this.calendarModalDate = document.getElementById('calendarModalDate');
        this.calendarModalContent = document.getElementById('calendarModalContent');
        this.closeCalendarModalBtn = document.getElementById('closeCalendarModal');
    }

    initEventListeners() {
        if (this.prevMonthBtn) {
            this.prevMonthBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                this.render();
                console.log('Previous month clicked');
            });
        }

        if (this.nextMonthBtn) {
            this.nextMonthBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                this.render();
                console.log('Next month clicked');
            });
        }

        if (this.closeCalendarModalBtn) {
            this.closeCalendarModalBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.hideModal();
            });
        }

        // Close modal on overlay click
        if (this.calendarModal) {
            this.calendarModal.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal-overlay')) {
                    this.hideModal();
                }
            });
        }
    }

    render() {
        this.renderHeader();
        this.renderDays();
    }

    renderHeader() {
        if (!this.currentMonthElement) return;
        
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        const monthName = monthNames[this.currentDate.getMonth()];
        const year = this.currentDate.getFullYear();
        this.currentMonthElement.textContent = `${monthName} ${year}`;
    }

    renderDays() {
        if (!this.calendarDaysElement) return;

        this.calendarDaysElement.innerHTML = '';
        
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // First day of the month
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        // Start from Sunday of the first week
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        // Generate 6 weeks (42 days)
        for (let i = 0; i < 42; i++) {
            const currentDay = new Date(startDate);
            currentDay.setDate(startDate.getDate() + i);
            
            const dayElement = this.createDayElement(currentDay, month);
            this.calendarDaysElement.appendChild(dayElement);
        }
    }

    createDayElement(date, currentMonth) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = date.getDate();
        
        // Add classes
        if (date.getMonth() !== currentMonth) {
            dayElement.classList.add('other-month');
        }
        
        if (this.isToday(date)) {
            dayElement.classList.add('today');
        }
        
        if (this.hasEntry(date)) {
            dayElement.classList.add('has-entry');
        }
        
        // Add click listener
        dayElement.addEventListener('click', (e) => {
            e.preventDefault();
            this.selectDate(date);
            console.log('Calendar date clicked:', date.toDateString());
        });
        
        return dayElement;
    }

    isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }

    hasEntry(date) {
        const dateString = date.toDateString();
        return this.app.entries.some(entry => entry.date === dateString);
    }

    selectDate(date) {
        this.selectedDate = date;
        this.showModal(date);
    }

    showModal(date) {
        if (!this.calendarModal) return;

        const dateString = date.toDateString();
        const entry = this.app.entries.find(e => e.date === dateString);
        
        // Format date nicely
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        if (this.calendarModalDate) {
            this.calendarModalDate.textContent = formattedDate;
        }
        
        if (this.calendarModalContent) {
            if (entry) {
                this.calendarModalContent.innerHTML = `
                    <div class="calendar-entry-display">
                        ${this.escapeHtml(entry.content)}
                    </div>
                `;
            } else {
                this.calendarModalContent.innerHTML = `
                    <div class="no-entry-message">
                        <div style="font-size: 2rem; margin-bottom: 1rem;">🌱</div>
                        <p>No gratitude entry for this day.</p>
                        <small>Every day is a new opportunity to find something beautiful to appreciate! ✨</small>
                    </div>
                `;
            }
        }
        
        this.calendarModal.classList.remove('hidden');
        console.log('Calendar modal shown for:', formattedDate);
    }

    hideModal() {
        if (this.calendarModal) {
            this.calendarModal.classList.add('hidden');
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// PWA Installation Management
class PWAInstaller {
    constructor() {
        this.deferredPrompt = null;
        this.installBanner = document.getElementById('installBanner');
        this.installBtn = document.getElementById('installBtn');
        this.dismissBtn = document.getElementById('dismissBtn');
        
        this.init();
    }

    init() {
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('PWA install prompt available');
            e.preventDefault();
            this.deferredPrompt = e;
            
            // Only show if not dismissed
            const dismissed = localStorage.getItem(APP_CONFIG.storageKeys.installDismissed);
            if (!dismissed) {
                this.showInstallBanner();
            }
        });

        window.addEventListener('appinstalled', () => {
            console.log('PWA installed successfully');
            this.hideInstallBanner();
            this.deferredPrompt = null;
        });

        if (this.installBtn) {
            this.installBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.install();
            });
        }

        if (this.dismissBtn) {
            this.dismissBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.dismissInstallBanner();
            });
        }

        // Hide banner if app is already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            this.hideInstallBanner();
            localStorage.setItem(APP_CONFIG.storageKeys.installDismissed, 'true');
        }
        
        // Check if previously dismissed
        const dismissed = localStorage.getItem(APP_CONFIG.storageKeys.installDismissed);
        if (dismissed) {
            this.hideInstallBanner();
        }
    }

    showInstallBanner() {
        if (this.installBanner) {
            this.installBanner.classList.remove('hidden');
            console.log('Install banner shown');
        }
    }

    hideInstallBanner() {
        if (this.installBanner) {
            this.installBanner.classList.add('hidden');
            console.log('Install banner hidden');
        }
    }

    dismissInstallBanner() {
        this.hideInstallBanner();
        localStorage.setItem(APP_CONFIG.storageKeys.installDismissed, 'true');
        console.log('Install banner dismissed permanently');
    }

    async install() {
        if (!this.deferredPrompt) {
            alert('✨ Add to home screen from your browser menu for the best experience!');
            return;
        }

        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            this.hideInstallBanner();
            localStorage.setItem(APP_CONFIG.storageKeys.installDismissed, 'true');
        }
        
        this.deferredPrompt = null;
    }
}

// Network Status Monitor
class NetworkMonitor {
    constructor() {
        this.networkStatus = document.getElementById('networkStatus');
        this.networkText = document.getElementById('networkText');
        this.init();
    }

    init() {
        this.updateNetworkStatus();

        window.addEventListener('online', () => {
            this.updateNetworkStatus();
        });

        window.addEventListener('offline', () => {
            this.updateNetworkStatus();
        });
    }

    updateNetworkStatus() {
        if (navigator.onLine) {
            this.hideOfflineMessage();
        } else {
            this.showOfflineMessage();
        }
    }

    showOfflineMessage() {
        if (this.networkText) {
            this.networkText.textContent = "💫 You're offline, but your gratitude is still saving locally!";
        }
        if (this.networkStatus) {
            this.networkStatus.classList.remove('hidden');
        }
    }

    hideOfflineMessage() {
        if (this.networkStatus) {
            this.networkStatus.classList.add('hidden');
        }
    }
}

// Service Worker Manager
class ServiceWorkerManager {
    constructor() {
        this.init();
    }

    async init() {
        if ('serviceWorker' in navigator) {
            try {
                const swCode = this.getServiceWorkerCode();
                const blob = new Blob([swCode], { type: 'application/javascript' });
                const swUrl = URL.createObjectURL(blob);
                
                const registration = await navigator.serviceWorker.register(swUrl);
                console.log('Service Worker registered successfully');

                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                this.showUpdateNotification();
                            }
                        });
                    }
                });

            } catch (error) {
                console.error('Service Worker registration failed:', error);
            }
        }
    }

    getServiceWorkerCode() {
        return `
const CACHE_NAME = '${APP_CONFIG.cacheName}';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './app.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request).catch(() => {
                    if (event.request.destination === 'document') {
                        return caches.match('./index.html');
                    }
                });
            })
    );
});
        `;
    }

    showUpdateNotification() {
        if (confirm('✨ A new version is available! Refresh to enjoy the latest features?')) {
            window.location.reload();
        }
    }
}

// Main Gratitude Journal App
class GratitudeJournal {
    constructor() {
        this.entries = [];
        this.currentStreak = 0;
        this.bestStreak = 0;
        this.lastEntryDate = null;
        
        this.animationManager = new AnimationManager();
        this.initElements();
        this.loadData();
        this.initEventListeners();
        this.updateDisplay();
        this.setDailyQuote();
        this.setRandomPlaceholder();
        this.setWelcomeMessage();
        
        // Initialize calendar after everything is loaded
        setTimeout(() => {
            this.calendar = new CalendarManager(this);
        }, 100);
    }

    initElements() {
        // Form elements
        this.entryTextarea = document.getElementById('gratitudeEntry');
        this.saveBtn = document.getElementById('saveEntry');
        this.charCount = document.getElementById('charCount');
        this.clearAllBtn = document.getElementById('clearAll');

        // Display elements
        this.entriesList = document.getElementById('entriesList');
        this.streakCount = document.getElementById('streakCount');
        this.dailyQuote = document.getElementById('dailyQuote');
        this.welcomeMessage = document.getElementById('welcomeMessage');
        this.totalEntries = document.getElementById('totalEntries');
        this.thisMonth = document.getElementById('thisMonth');
        this.bestStreakElement = document.getElementById('bestStreak');

        // Modal elements
        this.achievementModal = document.getElementById('achievementModal');
        this.achievementTitle = document.getElementById('achievementTitle');
        this.achievementMessage = document.getElementById('achievementMessage');
        this.closeAchievementBtn = document.getElementById('closeAchievement');
        this.confirmModal = document.getElementById('confirmModal');
        this.confirmClearBtn = document.getElementById('confirmClear');
        this.cancelClearBtn = document.getElementById('cancelClear');
    }

    initEventListeners() {
        // Character counter
        if (this.entryTextarea) {
            this.entryTextarea.addEventListener('input', () => {
                this.updateCharCounter();
            });
            
            // Add focus animation
            this.entryTextarea.addEventListener('focus', () => {
                this.entryTextarea.style.transform = 'translateY(-2px)';
            });
            
            this.entryTextarea.addEventListener('blur', () => {
                this.entryTextarea.style.transform = '';
            });
        }

        // Save entry
        if (this.saveBtn) {
            this.saveBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Save button clicked');
                this.saveEntry();
            });
        }

        // Clear all entries
        if (this.clearAllBtn) {
            this.clearAllBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showConfirmModal();
            });
        }

        // Modal handlers
        if (this.closeAchievementBtn) {
            this.closeAchievementBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.hideAchievementModal();
            });
        }

        if (this.confirmClearBtn) {
            this.confirmClearBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.clearAllEntries();
                this.hideConfirmModal();
            });
        }

        if (this.cancelClearBtn) {
            this.cancelClearBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.hideConfirmModal();
            });
        }

        // Close modals on overlay click
        [this.achievementModal, this.confirmModal].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target.classList.contains('modal-overlay')) {
                        modal.classList.add('hidden');
                    }
                });
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.saveEntry();
                }
            }
            
            // ESC to close modals
            if (e.key === 'Escape') {
                [this.achievementModal, this.confirmModal].forEach(modal => {
                    if (modal && !modal.classList.contains('hidden')) {
                        modal.classList.add('hidden');
                    }
                });
                if (this.calendar && this.calendar.calendarModal) {
                    this.calendar.hideModal();
                }
            }
        });
    }

    loadData() {
        try {
            const savedEntries = localStorage.getItem(APP_CONFIG.storageKeys.entries);
            this.entries = savedEntries ? JSON.parse(savedEntries) : [];

            const savedStreak = localStorage.getItem(APP_CONFIG.storageKeys.streak);
            this.currentStreak = savedStreak ? parseInt(savedStreak) : 0;

            const savedBestStreak = localStorage.getItem(APP_CONFIG.storageKeys.bestStreak);
            this.bestStreak = savedBestStreak ? parseInt(savedBestStreak) : 0;

            this.lastEntryDate = localStorage.getItem(APP_CONFIG.storageKeys.lastEntry);
            this.updateStreak();

            console.log('📊 Data loaded:', {
                entries: this.entries.length,
                streak: this.currentStreak,
                bestStreak: this.bestStreak
            });
        } catch (error) {
            console.error('Error loading data:', error);
            this.entries = [];
            this.currentStreak = 0;
            this.bestStreak = 0;
            this.lastEntryDate = null;
        }
    }

    saveData() {
        try {
            localStorage.setItem(APP_CONFIG.storageKeys.entries, JSON.stringify(this.entries));
            localStorage.setItem(APP_CONFIG.storageKeys.streak, this.currentStreak.toString());
            localStorage.setItem(APP_CONFIG.storageKeys.bestStreak, this.bestStreak.toString());
            if (this.lastEntryDate) {
                localStorage.setItem(APP_CONFIG.storageKeys.lastEntry, this.lastEntryDate);
            }
            console.log('💾 Data saved successfully');
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Unable to save your beautiful entry. Please check your storage settings. 💔');
        }
    }

    updateCharCounter() {
        if (!this.entryTextarea || !this.charCount) return;
        
        const count = this.entryTextarea.value.length;
        this.charCount.textContent = count;
        
        if (count > 450) {
            this.charCount.style.color = 'var(--color-error)';
        } else if (count > 400) {
            this.charCount.style.color = 'var(--color-warning)';
        } else {
            this.charCount.style.color = 'var(--color-text-secondary)';
        }
    }

    saveEntry() {
        if (!this.entryTextarea) return;

        const content = this.entryTextarea.value.trim();
        
        if (!content) {
            alert("Your heart has beautiful things to share! Please write something you're grateful for ✨");
            return;
        }

        const today = new Date().toDateString();
        const now = new Date();

        // Check if entry already exists for today
        const existingEntryIndex = this.entries.findIndex(entry => entry.date === today);
        
        if (existingEntryIndex !== -1) {
            if (confirm('💖 You already shared your gratitude today. Would you like to add more blessings to it?')) {
                this.entries[existingEntryIndex].content = content;
                this.entries[existingEntryIndex].timestamp = now.getTime();
            } else {
                return;
            }
        } else {
            const newEntry = {
                id: Date.now(),
                content: content,
                date: today,
                timestamp: now.getTime()
            };
            
            this.entries.unshift(newEntry);
            this.updateStreakForNewEntry();
        }

        // Save and update display
        this.saveData();
        this.updateDisplay();
        
        // Clear form with encouraging message
        this.entryTextarea.value = '';
        this.updateCharCounter();
        this.setRandomPlaceholder();
        this.setEncouragingMessage();
        
        // Beautiful save animations
        this.celebrateSave();
        
        // Refresh calendar
        if (this.calendar) {
            setTimeout(() => {
                this.calendar.render();
            }, 100);
        }

        console.log('✅ Entry saved successfully');
    }

    celebrateSave() {
        console.log('🎉 Starting celebration animations');
        
        // Button animation
        if (this.saveBtn) {
            this.saveBtn.style.transform = 'scale(0.95)';
            this.saveBtn.style.background = 'var(--color-success)';
            
            setTimeout(() => {
                this.saveBtn.style.transform = 'scale(1)';
                this.saveBtn.style.background = '';
            }, 300);
        }

        // Start falling hearts animation immediately
        this.animationManager.celebrate('hearts');
        
        // Sparkles after short delay
        setTimeout(() => {
            this.animationManager.celebrate('sparkles');
        }, 800);

        // Haptic feedback
        this.hapticFeedback('medium');
    }

    updateStreakForNewEntry() {
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        if (this.lastEntryDate === today) return;
        
        if (!this.lastEntryDate || this.lastEntryDate === yesterday || this.currentStreak === 0) {
            const oldStreak = this.currentStreak;
            this.currentStreak++;
            this.lastEntryDate = today;
            
            // Update best streak
            if (this.currentStreak > this.bestStreak) {
                this.bestStreak = this.currentStreak;
            }
            
            // Check for milestone achievement
            const milestone = STREAK_MILESTONES.find(m => m.days === this.currentStreak);
            if (milestone) {
                setTimeout(() => {
                    this.showAchievementModal(milestone.message, milestone.icon);
                    this.animationManager.celebrate('confetti');
                }, 2500);
            }
        } else {
            this.currentStreak = 1;
            this.lastEntryDate = today;
            
            // Update best streak even for new starts
            if (this.currentStreak > this.bestStreak) {
                this.bestStreak = this.currentStreak;
            }
        }
    }

    updateStreak() {
        if (!this.lastEntryDate) return;
        
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        if (this.lastEntryDate !== today && this.lastEntryDate !== yesterday) {
            this.currentStreak = 0;
            this.lastEntryDate = null;
        }
    }

    deleteEntry(id) {
        this.entries = this.entries.filter(entry => entry.id !== id);
        this.saveData();
        this.updateDisplay();
        if (this.calendar) {
            this.calendar.render();
        }
    }

    clearAllEntries() {
        this.entries = [];
        this.currentStreak = 0;
        this.lastEntryDate = null;
        this.saveData();
        this.updateDisplay();
        if (this.calendar) {
            this.calendar.render();
        }
    }

    updateDisplay() {
        this.updateStreakDisplay();
        this.updateEntriesList();
        this.updateStats();
    }

    updateStreakDisplay() {
        if (this.streakCount) {
            this.streakCount.textContent = this.currentStreak;
        }
    }

    updateStats() {
        if (this.totalEntries) {
            this.totalEntries.textContent = this.entries.length;
        }
        
        if (this.bestStreakElement) {
            this.bestStreakElement.textContent = this.bestStreak;
        }
        
        if (this.thisMonth) {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            const thisMonthCount = this.entries.filter(entry => {
                const entryDate = new Date(entry.timestamp);
                return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
            }).length;
            this.thisMonth.textContent = thisMonthCount;
        }
    }

    updateEntriesList() {
        if (!this.entriesList) return;

        if (this.entries.length === 0) {
            this.entriesList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🌱</div>
                    <p>Your beautiful gratitude moments will bloom here</p>
                    <small>Start by writing something that made you smile today! 😊</small>
                </div>
            `;
            return;
        }

        // Show only recent entries (last 5)
        const recentEntries = this.entries.slice(0, 5);
        
        this.entriesList.innerHTML = recentEntries
            .map(entry => this.createEntryHTML(entry))
            .join('');

        // Add delete event listeners
        this.entriesList.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = parseInt(e.target.dataset.id || e.target.closest('.delete-btn').dataset.id);
                if (confirm('💔 Are you sure you want to delete this beautiful memory?')) {
                    this.deleteEntry(id);
                }
            });
        });
    }

    createEntryHTML(entry) {
        const date = new Date(entry.timestamp);
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return `
            <div class="entry-item">
                <div class="entry-header">
                    <div class="entry-date">${formattedDate}</div>
                    <div class="entry-actions">
                        <button class="delete-btn" data-id="${entry.id}" title="Delete entry">
                            🗑️
                        </button>
                    </div>
                </div>
                <p class="entry-content">${this.escapeHtml(entry.content)}</p>
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    setDailyQuote() {
        if (!this.dailyQuote) return;

        const today = new Date();
        const dateString = today.toDateString();
        const seed = this.hashCode(dateString);
        const quoteIndex = Math.abs(seed) % INSPIRATIONAL_QUOTES.length;
        
        this.dailyQuote.textContent = INSPIRATIONAL_QUOTES[quoteIndex];
    }

    setRandomPlaceholder() {
        if (!this.entryTextarea) return;
        const randomIndex = Math.floor(Math.random() * PLACEHOLDER_TEXTS.length);
        this.entryTextarea.placeholder = PLACEHOLDER_TEXTS[randomIndex];
    }

    setWelcomeMessage() {
        if (!this.welcomeMessage) return;
        const randomIndex = Math.floor(Math.random() * POSITIVE_MESSAGES.welcome.length);
        this.welcomeMessage.textContent = POSITIVE_MESSAGES.welcome[randomIndex];
    }

    setEncouragingMessage() {
        if (!this.welcomeMessage) return;
        const randomIndex = Math.floor(Math.random() * POSITIVE_MESSAGES.encouraging.length);
        this.welcomeMessage.textContent = POSITIVE_MESSAGES.encouraging[randomIndex];
    }

    hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }

    showAchievementModal(message, icon = "🏆") {
        if (this.achievementMessage) {
            this.achievementMessage.textContent = message;
        }
        if (this.achievementModal) {
            // Update icon
            const iconElement = this.achievementModal.querySelector('.achievement-icon');
            if (iconElement) {
                iconElement.textContent = icon;
            }
            this.achievementModal.classList.remove('hidden');
        }
        this.hapticFeedback('heavy');
    }

    hideAchievementModal() {
        if (this.achievementModal) {
            this.achievementModal.classList.add('hidden');
        }
    }

    showConfirmModal() {
        if (this.confirmModal) {
            this.confirmModal.classList.remove('hidden');
        }
    }

    hideConfirmModal() {
        if (this.confirmModal) {
            this.confirmModal.classList.add('hidden');
        }
    }

    hapticFeedback(type = 'light') {
        if ('vibrate' in navigator) {
            switch (type) {
                case 'light':
                    navigator.vibrate(10);
                    break;
                case 'medium':
                    navigator.vibrate(50);
                    break;
                case 'heavy':
                    navigator.vibrate([50, 30, 50]);
                    break;
            }
        }
    }
}

// Initialize App when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 Initializing Enhanced Gratitude Journal...');
    
    // Initialize PWA features
    new PWAInstaller();
    new NetworkMonitor();
    new ServiceWorkerManager();
    
    // Initialize main app
    window.gratitudeJournal = new GratitudeJournal();
    
    console.log('✨ Gratitude Journal ready to spread joy!');
});

// Handle app lifecycle events
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.gratitudeJournal) {
        window.gratitudeJournal.updateStreak();
        window.gratitudeJournal.updateDisplay();
        window.gratitudeJournal.setWelcomeMessage();
    }
});

// Prevent zoom on double tap for better mobile experience
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Export for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GratitudeJournal, PWAInstaller, NetworkMonitor, CalendarManager, AnimationManager };
}