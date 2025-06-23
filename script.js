document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
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
    
    // Add animation to game cards when they come into view
    const observerOptions = {
        threshold: 0.1
    };
    
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
    
    // Mobile menu toggle (would be added if mobile menu is implemented)
    // const mobileMenuButton = document.createElement('button');
    // mobileMenuButton.classList.add('mobile-menu-toggle');
    // Implement mobile menu functionality as needed
});
document.addEventListener('DOMContentLoaded', function() {
    // Game data
    const games = [
        {
            id: '26908',
            title: 'After Night Falls',
            img: 'images/night2.jpg',
            iframe: 'https://egamings-c2ss.betsoftgaming.com/cwguestlogin.do?gameId=295&amp;lang=en&amp;bankId=792',
            category: 'Slots'
        },
        {
            id: '26901',
            title: '2 Million B.C',
            img: 'images/milion.jpg',
            iframe: 'https://egamings-c2ss.betsoftgaming.com/cwguestlogin.do?gameId=224&amp;lang=en&amp;bankId=792',
            category: 'Slots'
        },
        {
            id: '26900',
            title: 'Arrival',
            img: 'images/arival.jpg',
            iframe: 'https://egamings-c2ss.betsoftgaming.com/cwguestlogin.do?gameId=226&amp;lang=en&amp;bankId=792',
            category: 'Slots'
        },
        {
            id: '27950',
            title: 'At The Copa',
            img: 'images/copa.jpg',
            iframe: 'https://egamings-c2ss.betsoftgaming.com/cwguestlogin.do?gameId=300&amp;lang=en&amp;bankId=792',
            category: 'Slots'
        }
    ];

    // Initialize games in the DOM
    function initializeGames() {
        const gamesGrid = document.querySelector('.games-grid');
        
        // Clear existing placeholder content
        gamesGrid.innerHTML = '';
        
        // Create game cards for each game
        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            gameCard.dataset.id = game.id;
            
            gameCard.innerHTML = `
                <div class="game-icon">
                    <img src="${game.img}" alt="${game.title}">
                </div>
                <h3>${game.title}</h3>
                <p>Enjoy this exciting ${game.category.toLowerCase()} game completely free with no deposit required.</p>
                <button class="btn-game" data-id="${game.id}">Play Free</button>
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
                color: var(--dark-color);
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
                color: var(--gray-color);
                text-align: center;
            }
            
            body.modal-open {
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    }

   
    
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
    
    // Initialize games and modal
    initializeGames();
    addModalStyles();
    setupGameModal();
});
// Update the gameCard.innerHTML in the initializeGames() function to:
gameCard.innerHTML = `
    <div class="game-icon">
        <img src="${game.img}" alt="${game.title}">
    </div>
    <h3>${game.title}</h3>
    <p>Enjoy this exciting ${game.category.toLowerCase()} game completely free with no deposit required.</p>
    <button class="btn-game" data-id="${game.id}">Play Now</button>
`;
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

