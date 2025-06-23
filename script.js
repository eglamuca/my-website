document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Toggle current item
            item.classList.toggle('active');
            // Close other items when opening this one
            if (item.classList.contains('active')) {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to game cards and feature cards when they come into view
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.game-card, .feature-card').forEach(card => {
        observer.observe(card);
    });

    // Game data with emojis
    const games = [
        {
            id: '26908',
            title: 'After Night Falls',
            emoji: '🕵️‍♂️',
            iframe: 'https://egamings-c2ss.betsoftgaming.com/cwguestlogin.do?gameId=295&lang=en&bankId=792',
            category: 'Slots'
        },
        {
            id: '26901',
            title: '2 Million B.C',
            emoji: '🦴',
            iframe: 'https://egamings-c2ss.betsoftgaming.com/cwguestlogin.do?gameId=224&lang=en&bankId=792',
            category: 'Slots'
        },
        {
            id: '26900',
            title: 'Arrival',
            emoji: '👽',
            iframe: 'https://egamings-c2ss.betsoftgaming.com/cwguestlogin.do?gameId=226&lang=en&bankId=792',
            category: 'Slots'
        },
        {
            id: '27950',
            title: 'At The Copa',
            emoji: '💃',
            iframe: 'https://egamings-c2ss.betsoftgaming.com/cwguestlogin.do?gameId=300&lang=en&bankId=792',
            category: 'Slots'
        }
    ];

    // Initialize games in the DOM
    function initializeGames() {
        const gamesGrid = document.querySelector('.games-grid');
        if (!gamesGrid) return;
        gamesGrid.innerHTML = '';
        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            gameCard.dataset.id = game.id;
            gameCard.innerHTML = `
                <div class="game-icon" style="font-size:2.5rem;">${game.emoji}</div>
                <h3>${game.title}</h3>
                <p>Try this unique ${game.category.toLowerCase()} adventure—always free, always fun.</p>
                <button class="btn-game" data-id="${game.id}">Play Now</button>
            `;
            gamesGrid.appendChild(gameCard);
        });
    }

    // Game modal functionality
    function setupGameModal() {
        const body = document.body;
        const modal = document.createElement('div');
        modal.className = 'game-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal">&times;</button>
                <div class="game-frame-container">
                    <iframe class="game-iframe" frameborder="0" allowfullscreen></iframe>
                </div>
                <div class="modal-disclaimer">
                    <p>This is a free-to-play demo version. No real money gambling or prizes are offered.</p>
                </div>
            </div>
        `;
        body.appendChild(modal);

        // Open modal when game button is clicked
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn-game')) {
                const gameId = e.target.dataset.id;
                const game = games.find(g => g.id === gameId);
                if (game) {
                    const iframe = modal.querySelector('.game-iframe');
                    iframe.src = game.iframe;
                    modal.classList.add('active');
                    body.classList.add('modal-open');
                }
            }
            // Close modal
            if (e.target.classList.contains('close-modal') || e.target === modal) {
                const iframe = modal.querySelector('.game-iframe');
                iframe.src = '';
                modal.classList.remove('active');
                body.classList.remove('modal-open');
            }
        });
    }

    // Add CSS for modal
    function addModalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .game-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                z-index: 1000;
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
            }
            .game-modal.active {
                opacity: 1;
                pointer-events: all;
            }
            .modal-content {
                background-color: white;
                border-radius: 8px;
                width: 90%;
                max-width: 900px;
                max-height: 90vh;
                padding: 20px;
                position: relative;
            }
            .close-modal {
                position: absolute;
                top: 10px;
                right: 10px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #333;
            }
            .game-frame-container {
                position: relative;
                padding-bottom: 56.25%; /* 16:9 aspect ratio */
                height: 0;
                overflow: hidden;
            }
            .game-iframe {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border: none;
            }
            .modal-disclaimer {
                margin-top: 15px;
                font-size: 0.8rem;
                color: #888;
                text-align: center;
            }
            body.modal-open {
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize games and modal
    initializeGames();
    addModalStyles();
    setupGameModal();
});

