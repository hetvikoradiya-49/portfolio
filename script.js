document.addEventListener('DOMContentLoaded', () => {
    // Current Year Update
    document.getElementById('year').textContent = new Date().getFullYear();

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // keep commenting to allow repeat or uncomment for one-time
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Category Filter Filtering Logic
    const pills = document.querySelectorAll('.cat-pill');
    const gridItems = document.querySelectorAll('.grid-item');

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelector('.cat-pill.active').classList.remove('active');
            pill.classList.add('active');
            
            const filterValue = pill.getAttribute('data-filter');

            gridItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory.includes(filterValue)) {
                    item.style.display = ''; 
                    setTimeout(() => item.classList.add('visible'), 50);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('visible');
                }
            });
        });
    });

    // Modal Logic
    const modal = document.getElementById('project-modal');
    const modalMediaContainer = document.getElementById('modal-media-container');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.close-modal');

    document.querySelectorAll('.grid-item').forEach(gridItem => {
        gridItem.addEventListener('click', (e) => {
            try {
                const title = gridItem.getAttribute('data-title') || 'Project';
                const description = gridItem.getAttribute('data-description') || 'A beautiful design from Hetvi.';
                
                // Extract media
                const mediaObj = gridItem.querySelector('img, video');
                let innerMediaHtml = '';
                
                if(mediaObj && mediaObj.tagName.toLowerCase() === 'img') {
                    innerMediaHtml = `<img src="${mediaObj.src}" alt="${title}">`;
                } else if(mediaObj) {
                    const sourceObj = mediaObj.querySelector('source');
                    const sourceSrc = sourceObj ? sourceObj.src : mediaObj.src;
                    innerMediaHtml = `
                        <video autoplay muted loop controls playsinline style="max-height: 60vh; width: 100%;">
                            <source src="${sourceSrc}" type="video/mp4">
                        </video>
                    `;
                }

                modalTitle.textContent = title;
                modalDescription.innerHTML = description;
                modalMediaContainer.innerHTML = innerMediaHtml;

                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('show'), 10);
            } catch (error) {
                console.error("Error opening project modal: ", error);
            }
        });
    });

    const closeFunction = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            modalMediaContainer.innerHTML = ''; // clear out inner contents to stop video etc.
        }, 300);
    };

    closeModal.addEventListener('click', closeFunction);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeFunction();
        }
    });

    // Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Subtle pull
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            // Reset position smoothly
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

});
