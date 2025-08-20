// Enhanced Mobile PWA Gratitude Journal
// Complete with animations, calendar, and positive vibes

class GratitudeJournalPWA {
    constructor() {
        // App configuration
        this.config = {
            version: '2.0.0',
            cacheName: 'gratitude-journal-v2.0.0',
            storageKey: 'gratitude_entries',
            streakKey: 'gratitude_streak_data'
        };
        
        // Positive messaging data
        this.welcomeMessages = [
            "Ready to count your blessings? ✨",
            "What made your heart happy today? 💖",
            "Time to celebrate the good moments! 🌟",
            "Let's capture today's joyful moments! 🎉",
            "Your gratitude journey continues! 🌸",
            "Ready to shine your grateful light? ⭐"
        ];
        
        this.encouragingMessages = [
            "Every gratitude counts! 🌸",
            "You're building something beautiful! 🦋",
            "Your positive energy is growing! 🌻",
            "Keep shining your grateful light! ⭐",
            "Your heart is full of blessings! 💝",
            "You're creating magic with gratitude! ✨"
        ];
        
        this.successMessages = [
            "Beautiful! Your gratitude has been saved! 💝",
            "Wonderful! Another grateful moment captured! 🌟",
            "Amazing! Your positive energy is recorded! ✨",
            "Perfect! Your thankfulness lights up the day! 🌈",
            "Gorgeous! Your blessings are safely stored! 💎",
            "Brilliant! Your grateful heart shines bright! 🌞"
        ];
        
        this.milestoneMessages = [
            { days: 1, message: "Amazing! You've started your gratitude journey! 🌱", icon: "🌱" },
            { days: 3, message: "Three days strong! You're building a beautiful habit! 💚", icon: "💚" },
            { days: 7, message: "One whole week! You're absolutely on fire! 🔥", icon: "🔥" },
            { days: 14, message: "Two weeks! Your positivity is blooming! 🌸", icon: "🌸" },
            { days: 21, message: "21 days! You've built an incredible habit! 🎉", icon: "🎉" },
            { days: 30, message: "One month! You're a gratitude superstar! 🌟", icon: "🌟" },
            { days: 60, message: "Two months! Your grateful heart is inspiring! 💫", icon: "💫" },
            { days: 100, message: "100 days! You're a true gratitude champion! 👑", icon: "👑" }
        ];
        
        this.inspirationalQuotes = [
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
        
        this.placeholderTexts = [
            "Something that made your heart happy today...",
            "A person who brought you joy...",
            "A beautiful moment from today...",
            "Something that made you smile...",
            "A blessing you noticed...",
            "An act of kindness you received...",
            "Something you accomplished...",
            "A memory that brings peace...",
            "Something in nature you appreciated...",
            "A comfort in your life..."
        ];
        
        // App state
        this.currentDate = new Date();
        this.selectedDate = new Date();
        this.entries = this.loadEntries();
        this.streakData = this.loadStreakData();
        this.installPromptEvent = null;
        
        // Initialize app
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.setupPWA();
        this.updateDisplay();
        this.generateCalendar();
        this.updateStats();
        this.setRandomPlaceholders();
        this.setDailyQuote();
        this.setWelcomeMessage();
        this.checkTodayEntry();
    }
    
    cacheElements() {
        this.elements = {
            // Animation containers
            heartsContainer: document.getElementById('hearts-container'),
            sparklesContainer: document.getElementById('sparkles-container'),
            confettiContainer: document.getElementById('confetti-container'),
            
            // Install prompt
            installPrompt: document.getElementById('install-prompt'),
            installBtn: document.getElementById('install-btn'),
            installDismiss: document.getElementById('install-dismiss'),
            
            // Header
            currentStreak: document.getElementById('current-streak'),
            welcomeMessage: document.getElementById('welcome-message'),
            
            // Entry form
            todayDate: document.getElementById('today-date'),
            gratitudeForm: document.getElementById('gratitude-form'),
            gratitude1: document.getElementById('gratitude-1'),
            gratitude2: document.getElementById('gratitude-2'),
            gratitude3: document.getElementById('gratitude-3'),
            saveBtn: document.getElementById('save-btn'),
            entryStatus: document.getElementById('entry-status'),
            
            // Calendar
            calendarTitle: document.getElementById('calendar-title'),
            calendarDays: document.getElementById('calendar-days'),
            prevMonth: document.getElementById('prev-month'),
            nextMonth: document.getElementById('next-month'),
            
            // Stats
            totalEntries: document.getElementById('total-entries'),
            longestStreak: document.getElementById('longest-streak'),
            totalGratitudes: document.getElementById('total-gratitudes'),
            
            // Modal
            entryModal: document.getElementById('entry-modal'),
            modalDate: document.getElementById('modal-date'),
            pastGratitudes: document.getElementById('past-gratitudes'),
            modalQuote: document.getElementById('modal-quote'),
            modalClose: document.getElementById('modal-close'),
            
            // Toast
            toast: document.getElementById('toast'),
            toastIcon: document.getElementById('toast-icon'),
            toastMessage: document.getElementById('toast-message'),
            
            // Footer
            dailyQuote: document.getElementById('daily-quote')
        };
    }
    
    setupEventListeners() {
        // Form submission
        this.elements.gratitudeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveGratitude();
        });
        
        // Calendar navigation
        this.elements.prevMonth.addEventListener('click', () => this.previousMonth());
        this.elements.nextMonth.addEventListener('click', () => this.nextMonth());
        
        // Modal
        this.elements.modalClose.addEventListener('click', () => this.closeModal());
        this.elements.entryModal.addEventListener('click', (e) => {
            if (e.target === this.elements.entryModal) {
                this.closeModal();
            }
        });
        
        // Install prompt
        this.elements.installBtn.addEventListener('click', () => this.installApp());
        this.elements.installDismiss.addEventListener('click', () => this.dismissInstallPrompt());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
        
        // Input animations
        [this.elements.gratitude1, this.elements.gratitude2, this.elements.gratitude3].forEach(input => {
            input.addEventListener('focus', () => {
                this.clearEntryStatus();
                this.addInputFocusAnimation(input);
            });
            
            input.addEventListener('blur', () => {
                this.removeInputFocusAnimation(input);
            });
        });
    }
    
    setupPWA() {
        // Register service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered:', registration);
                })
                .catch(error => {
                    console.log('SW registration failed:', error);
                });
        }
        
        // Handle install prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.installPromptEvent = e;
            this.showInstallPrompt();
        });
        
        // Handle successful installation
        window.addEventListener('appinstalled', () => {
            this.hideInstallPrompt();
            this.showToast('🎉 App installed successfully! Welcome to your gratitude journey!');
        });
    }
    
    updateDisplay() {
        // Update today's date
        const options = { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric'
        };
        this.elements.todayDate.textContent = this.currentDate.toLocaleDateString('en-US', options);
        
        // Update streak
        const currentStreak = this.calculateCurrentStreak();
        this.elements.currentStreak.textContent = currentStreak;
        
        // Animate streak if it's greater than 0
        if (currentStreak > 0) {
            this.elements.currentStreak.parentElement.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.elements.currentStreak.parentElement.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    saveGratitude() {
        const gratitudes = [
            this.elements.gratitude1.value.trim(),
            this.elements.gratitude2.value.trim(),
            this.elements.gratitude3.value.trim()
        ].filter(g => g.length > 0);
        
        if (gratitudes.length === 0) {
            this.showEntryStatus('Please share at least one thing you\'re grateful for! 💕', 'warning');
            this.addShakeAnimation(this.elements.gratitude1);
            return;
        }
        
        const dateKey = this.formatDateKey(this.currentDate);
        
        // Check if entry already exists
        if (this.entries[dateKey]) {
            this.showEntryStatus('You\'ve already captured today\'s blessings! ✨ Check your calendar to see them.', 'exists');
            return;
        }
        
        // Save entry
        this.entries[dateKey] = {
            gratitudes: gratitudes,
            timestamp: new Date().toISOString(),
            date: this.currentDate.toDateString()
        };
        
        this.saveEntries();
        this.updateStreakData();
        this.clearForm();
        this.updateDisplay();
        this.generateCalendar();
        this.updateStats();
        
        // Show success with animations
        const randomMessage = this.successMessages[Math.floor(Math.random() * this.successMessages.length)];
        this.showEntryStatus(randomMessage, 'success');
        this.showToast(randomMessage);
        
        // Celebrate with animations
        this.triggerSaveAnimations();
        
        // Check for milestone
        this.checkStreakMilestone();
        
        // Update save button
        this.updateSaveButtonState('saved');
        
        // Disable form after successful save
        this.disableForm();
    }
    
    triggerSaveAnimations() {
        // Falling hearts
        this.createFallingHearts();
        
        // Sparkles
        setTimeout(() => this.createSparkles(), 300);
        
        // Button animation
        this.elements.saveBtn.classList.add('saved');
        setTimeout(() => {
            this.elements.saveBtn.classList.remove('saved');
        }, 600);
        
        // Haptic feedback simulation
        this.triggerHapticFeedback();
    }
    
    createFallingHearts() {
        const heartEmojis = ['💝', '💖', '💕', '💗', '❤️', '💛', '💚', '💙', '💜'];
        const container = this.elements.heartsContainer;
        
        for (let i = 0; i < 12; i++) {
            const heart = document.createElement('div');
            heart.className = 'falling-heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heart.style.animationDuration = (3 + Math.random() * 2) + 's';
            
            container.appendChild(heart);
            
            // Clean up after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 5000);
        }
    }
    
    createSparkles() {
        const container = this.elements.sparklesContainer;
        const saveBtn = this.elements.saveBtn;
        const rect = saveBtn.getBoundingClientRect();
        
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = (rect.left + rect.width / 2 + (Math.random() - 0.5) * 200) + 'px';
            sparkle.style.top = (rect.top + rect.height / 2 + (Math.random() - 0.5) * 200) + 'px';
            sparkle.style.animationDelay = Math.random() * 0.5 + 's';
            
            container.appendChild(sparkle);
            
            // Clean up after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 3000);
        }
    }
    
    createConfetti() {
        const container = this.elements.confettiContainer;
        const shapes = ['square', 'circle', 'triangle'];
        
        for (let i = 0; i < 15; i++) {
            const confetti = document.createElement('div');
            confetti.className = `confetti ${shapes[Math.floor(Math.random() * shapes.length)]}`;
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '100%';
            confetti.style.animationDelay = Math.random() * 1 + 's';
            
            container.appendChild(confetti);
            
            // Clean up after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 4000);
        }
    }
    
    calculateCurrentStreak() {
        const today = new Date();
        let streak = 0;
        let currentDate = new Date(today);
        
        // Check if today has an entry
        const todayKey = this.formatDateKey(today);
        if (!this.entries[todayKey]) {
            // If no entry today, check from yesterday
            currentDate.setDate(currentDate.getDate() - 1);
        }
        
        // Count consecutive days backwards
        while (true) {
            const dateKey = this.formatDateKey(currentDate);
            if (this.entries[dateKey]) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }
        
        return streak;
    }
    
    generateCalendar() {
        const year = this.selectedDate.getFullYear();
        const month = this.selectedDate.getMonth();
        
        // Update calendar title
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        this.elements.calendarTitle.textContent = `${monthNames[month]} ${year}`;
        
        // Clear existing days
        this.elements.calendarDays.innerHTML = '';
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        // Add empty cells for previous month
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayElement = this.createCalendarDay(
                daysInPrevMonth - i,
                new Date(year, month - 1, daysInPrevMonth - i),
                true
            );
            this.elements.calendarDays.appendChild(dayElement);
        }
        
        // Add days of current month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dayElement = this.createCalendarDay(day, date, false);
            this.elements.calendarDays.appendChild(dayElement);
        }
        
        // Add days from next month to fill the grid
        const totalCells = this.elements.calendarDays.children.length;
        const remainingCells = 42 - totalCells;
        
        for (let day = 1; day <= remainingCells && totalCells < 42; day++) {
            const dayElement = this.createCalendarDay(
                day,
                new Date(year, month + 1, day),
                true
            );
            this.elements.calendarDays.appendChild(dayElement);
        }
    }
    
    createCalendarDay(day, date, isOtherMonth) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        dayElement.setAttribute('tabindex', '0');
        
        if (isOtherMonth) {
            dayElement.classList.add('other-month');
        }
        
        // Check if this is today
        if (this.isSameDate(date, this.currentDate)) {
            dayElement.classList.add('today');
        }
        
        // Check if this date has an entry
        const dateKey = this.formatDateKey(date);
        if (this.entries[dateKey]) {
            dayElement.classList.add('has-entry');
        }
        
        // Add click listener
        if (!isOtherMonth) {
            dayElement.addEventListener('click', () => {
                this.showDayEntry(date);
                this.addTapAnimation(dayElement);
            });
            
            // Touch feedback
            dayElement.addEventListener('touchstart', () => {
                this.triggerHapticFeedback();
            });
        }
        
        return dayElement;
    }
    
    showDayEntry(date) {
        const dateKey = this.formatDateKey(date);
        const entry = this.entries[dateKey];
        
        if (!entry) {
            this.showToast('No gratitude entry for this day yet! 📅 Tap today to start!');
            return;
        }
        
        // Update modal content
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        this.elements.modalDate.textContent = date.toLocaleDateString('en-US', options);
        
        // Display gratitudes
        this.elements.pastGratitudes.innerHTML = '';
        entry.gratitudes.forEach((gratitude, index) => {
            const gratitudeElement = document.createElement('div');
            gratitudeElement.className = 'past-gratitude';
            gratitudeElement.textContent = `${index + 1}. ${gratitude}`;
            this.elements.pastGratitudes.appendChild(gratitudeElement);
        });
        
        // Set random inspirational quote
        const randomQuote = this.inspirationalQuotes[Math.floor(Math.random() * this.inspirationalQuotes.length)];
        this.elements.modalQuote.textContent = `"${randomQuote}"`;
        
        // Show modal
        this.elements.entryModal.classList.add('show');
    }
    
    closeModal() {
        this.elements.entryModal.classList.remove('show');
    }
    
    updateStats() {
        const totalEntries = Object.keys(this.entries).length;
        const longestStreak = this.calculateLongestStreak();
        const totalGratitudes = this.calculateTotalGratitudes();
        
        this.animateNumber(this.elements.totalEntries, totalEntries);
        this.animateNumber(this.elements.longestStreak, longestStreak);
        this.animateNumber(this.elements.totalGratitudes, totalGratitudes);
    }
    
    animateNumber(element, targetValue) {
        const startValue = parseInt(element.textContent) || 0;
        const duration = 1000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    calculateLongestStreak() {
        if (Object.keys(this.entries).length === 0) return 0;
        
        const dates = Object.keys(this.entries)
            .map(key => new Date(key))
            .sort((a, b) => a - b);
        
        let maxStreak = 1;
        let currentStreak = 1;
        
        for (let i = 1; i < dates.length; i++) {
            const prevDate = dates[i - 1];
            const currentDate = dates[i];
            
            const diffTime = currentDate - prevDate;
            const diffDays = diffTime / (1000 * 60 * 60 * 24);
            
            if (diffDays === 1) {
                currentStreak++;
                maxStreak = Math.max(maxStreak, currentStreak);
            } else {
                currentStreak = 1;
            }
        }
        
        return maxStreak;
    }
    
    calculateTotalGratitudes() {
        return Object.values(this.entries).reduce((total, entry) => {
            return total + entry.gratitudes.length;
        }, 0);
    }
    
    checkStreakMilestone() {
        const currentStreak = this.calculateCurrentStreak();
        const milestone = this.milestoneMessages.find(m => m.days === currentStreak);
        
        if (milestone) {
            setTimeout(() => {
                this.showToast(`${milestone.message} ${milestone.icon}`);
                this.createConfetti();
            }, 1000);
        }
    }
    
    checkTodayEntry() {
        const todayKey = this.formatDateKey(this.currentDate);
        if (this.entries[todayKey]) {
            this.showEntryStatus('You\'ve already captured today\'s blessings! ✨ What a beautiful day it\'s been.', 'exists');
            this.disableForm();
        }
    }
    
    disableForm() {
        [this.elements.gratitude1, this.elements.gratitude2, this.elements.gratitude3].forEach(input => {
            input.disabled = true;
            input.placeholder = 'Today\'s gratitude complete! 😊';
        });
        
        this.updateSaveButtonState('completed');
    }
    
    updateSaveButtonState(state) {
        const btn = this.elements.saveBtn;
        
        switch (state) {
            case 'completed':
                btn.disabled = true;
                btn.innerHTML = '<span class="btn-icon">✨</span><span class="btn-text">Today\'s Blessings Saved</span>';
                btn.style.background = 'linear-gradient(135deg, #4ECDC4, #44A08D)';
                break;
            case 'saved':
                btn.innerHTML = '<span class="btn-icon">💝</span><span class="btn-text">Gratitude Saved!</span>';
                break;
            default:
                btn.innerHTML = '<span class="btn-icon">💝</span><span class="btn-text">Save My Gratitude</span>';
                break;
        }
    }
    
    previousMonth() {
        this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);
        this.generateCalendar();
        this.addSlideAnimation(this.elements.calendarDays, 'right');
    }
    
    nextMonth() {
        this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);
        this.generateCalendar();
        this.addSlideAnimation(this.elements.calendarDays, 'left');
    }
    
    clearForm() {
        this.elements.gratitude1.value = '';
        this.elements.gratitude2.value = '';
        this.elements.gratitude3.value = '';
    }
    
    showEntryStatus(message, type) {
        this.elements.entryStatus.textContent = message;
        this.elements.entryStatus.className = `entry-status ${type} show`;
        
        setTimeout(() => {
            this.clearEntryStatus();
        }, 5000);
    }
    
    clearEntryStatus() {
        this.elements.entryStatus.classList.remove('show');
        setTimeout(() => {
            this.elements.entryStatus.className = 'entry-status';
            this.elements.entryStatus.textContent = '';
        }, 300);
    }
    
    showToast(message, duration = 3000) {
        this.elements.toastMessage.textContent = message;
        this.elements.toast.classList.add('show');
        
        setTimeout(() => {
            this.elements.toast.classList.remove('show');
        }, duration);
    }
    
    setRandomPlaceholders() {
        const shuffled = [...this.placeholderTexts].sort(() => 0.5 - Math.random());
        this.elements.gratitude1.placeholder = shuffled[0];
        this.elements.gratitude2.placeholder = shuffled[1];
        this.elements.gratitude3.placeholder = shuffled[2];
    }
    
    setDailyQuote() {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        const quoteIndex = dayOfYear % this.inspirationalQuotes.length;
        this.elements.dailyQuote.textContent = `"${this.inspirationalQuotes[quoteIndex]}"`;
    }
    
    setWelcomeMessage() {
        const randomMessage = this.welcomeMessages[Math.floor(Math.random() * this.welcomeMessages.length)];
        this.elements.welcomeMessage.textContent = randomMessage;
    }
    
    // Animation helpers
    addTapAnimation(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 150);
    }
    
    addShakeAnimation(element) {
        element.style.animation = 'none';
        element.offsetHeight; // Force reflow
        element.style.animation = 'shake 0.5s ease-out';
        
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }
    
    addSlideAnimation(element, direction) {
        const transform = direction === 'left' ? 'translateX(-20px)' : 'translateX(20px)';
        element.style.transform = transform;
        element.style.opacity = '0.7';
        
        setTimeout(() => {
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        }, 150);
    }
    
    addInputFocusAnimation(input) {
        input.parentElement.style.transform = 'translateY(-2px)';
    }
    
    removeInputFocusAnimation(input) {
        input.parentElement.style.transform = 'translateY(0)';
    }
    
    triggerHapticFeedback() {
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }
    
    // PWA functionality
    showInstallPrompt() {
        if (!localStorage.getItem('install_dismissed')) {
            this.elements.installPrompt.classList.add('show');
        }
    }
    
    hideInstallPrompt() {
        this.elements.installPrompt.classList.remove('show');
    }
    
    installApp() {
        if (this.installPromptEvent) {
            this.installPromptEvent.prompt();
            this.installPromptEvent.userChoice.then((result) => {
                if (result.outcome === 'accepted') {
                    console.log('User accepted install prompt');
                }
                this.installPromptEvent = null;
                this.hideInstallPrompt();
            });
        }
    }
    
    dismissInstallPrompt() {
        this.hideInstallPrompt();
        localStorage.setItem('install_dismissed', 'true');
    }
    
    // Storage helpers
    updateStreakData() {
        const todayKey = this.formatDateKey(this.currentDate);
        const currentStreak = this.calculateCurrentStreak();
        const longestStreak = this.calculateLongestStreak();
        
        this.streakData = {
            current: currentStreak,
            longest: longestStreak,
            lastEntry: todayKey,
            updated: new Date().toISOString()
        };
        
        this.saveStreakData();
    }
    
    // Utility functions
    formatDateKey(date) {
        return date.toISOString().split('T')[0];
    }
    
    isSameDate(date1, date2) {
        return this.formatDateKey(date1) === this.formatDateKey(date2);
    }
    
    loadEntries() {
        try {
            const saved = localStorage.getItem(this.config.storageKey);
            return saved ? JSON.parse(saved) : {};
        } catch (error) {
            console.error('Error loading entries:', error);
            return {};
        }
    }
    
    saveEntries() {
        try {
            localStorage.setItem(this.config.storageKey, JSON.stringify(this.entries));
        } catch (error) {
            console.error('Error saving entries:', error);
        }
    }
    
    loadStreakData() {
        try {
            const saved = localStorage.getItem(this.config.streakKey);
            return saved ? JSON.parse(saved) : { current: 0, longest: 0 };
        } catch (error) {
            console.error('Error loading streak data:', error);
            return { current: 0, longest: 0 };
        }
    }
    
    saveStreakData() {
        try {
            localStorage.setItem(this.config.streakKey, JSON.stringify(this.streakData));
        } catch (error) {
            console.error('Error saving streak data:', error);
        }
    }
}

// Add shake animation to CSS dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gratitudeApp = new GratitudeJournalPWA();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.gratitudeApp) {
        // Refresh data when user returns to app
        window.gratitudeApp.updateDisplay();
        window.gratitudeApp.updateStats();
    }
});
