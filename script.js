document.addEventListener('DOMContentLoaded', function() {
    // Music player functionality
    const bgMusic = document.getElementById('bg-music');
    const playBtn = document.getElementById('play-btn');
    const muteBtn = document.getElementById('mute-btn');
    const volumeControl = document.getElementById('volume-control');
    
    // Try to autoplay (may not work due to browser restrictions)
    bgMusic.volume = 0.5;
    const playPromise = bgMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // Autoplay was prevented, show paused state
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
    }
    
    // Play/Pause button
    playBtn.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            bgMusic.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    // Mute button
    muteBtn.addEventListener('click', function() {
        if (bgMusic.muted) {
            bgMusic.muted = false;
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            bgMusic.muted = true;
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
    
    // Volume control
    volumeControl.addEventListener('input', function() {
        bgMusic.volume = this.value;
        
        // Update mute button icon if volume is 0
        if (this.value == 0) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });
    
    // Update play/pause button when music ends (though it should loop)
    bgMusic.addEventListener('play', function() {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });
    
    bgMusic.addEventListener('pause', function() {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
    
    // Rest of your existing code...
    // Load saved letter if exists
    const savedLetter = localStorage.getItem('letterToWafaa');
    if (savedLetter) {
        document.getElementById('letter-text').value = savedLetter;
    }
    
    // Save letter button
    document.getElementById('save-btn').addEventListener('click', function() {
        const letterText = document.getElementById('letter-text').value;
        localStorage.setItem('letterToWafaa', letterText);
        
        // Show confirmation
        this.textContent = 'Saved! 💜';
        setTimeout(() => {
            this.textContent = 'Save Letter 💾';
        }, 2000);
    });
    
    // Theme toggle button
    document.getElementById('theme-btn').addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            this.innerHTML = 'Light Theme ☀️';
        } else {
            this.innerHTML = 'Dark Theme 🌙';
        }
    });
    
    // Add more flowers dynamically
    function addMoreFlowers() {
        const flowerContainer = document.querySelector('.flower-container');
        const emojis = ['🌸', '🌺', '🌼', '🌷', '💮', '🏵️', '🌹', '🌻'];
        
        for (let i = 0; i < 10; i++) {
            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            
            // Random position
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            flower.style.left = `${left}%`;
            flower.style.top = `${top}%`;
            
            // Random size
            const size = 1 + Math.random() * 2;
            flower.style.fontSize = `${size}rem`;
            
            // Random animation
            const duration = 5 + Math.random() * 5;
            const delay = Math.random() * 5;
            flower.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
            
            flowerContainer.appendChild(flower);
        }
    }
    
    // Add flowers after a delay
    setTimeout(addMoreFlowers, 1000);
    
    // Add floating hearts when clicking
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') return;
        
        const heart = document.createElement('div');
        heart.innerHTML = '💜';
        heart.style.position = 'fixed';
        heart.style.left = `${e.clientX}px`;
        heart.style.top = `${e.clientY}px`;
        heart.style.fontSize = '2rem';
        heart.style.pointerEvents = 'none';
        heart.style.animation = 'float-up 2s ease-out forwards';
        
        document.body.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 2000);
    });
    
    // Add keyframe for floating hearts
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float-up {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});
