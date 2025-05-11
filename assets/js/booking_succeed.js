document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            const href = this.getAttribute('href');
            window.location.href = href;
        });
    });

    // Home button functionality
    const homeButton = document.querySelector('.home-button');
    if (homeButton) {
        homeButton.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }

    // Details button functionality
    const detailsButton = document.querySelector('.details-button');
    if (detailsButton) {
        detailsButton.addEventListener('click', function() {
            alert('Showing order details');
        });
    }

    // Email subscription form
    const emailForm = document.querySelector('.email-subscription');
    const emailInput = document.querySelector('.email-input');
    const subscribeButton = document.querySelector('.subscribe-button');

    if (subscribeButton) {
        subscribeButton.addEventListener('click', function(e) {
            e.preventDefault();
            const email = emailInput.value.trim();
            if (email) {
                alert(`Thank you for subscribing with email: ${email}`);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address');
            }
        });
    }

    // Simulating a loading effect for the background blur section
    const backgroundBlur = document.querySelector('.background-blur');
    if (backgroundBlur) {
        backgroundBlur.style.opacity = '0';
        setTimeout(() => {
            backgroundBlur.style.transition = 'opacity 1s ease-in-out';
            backgroundBlur.style.opacity = '1';
        }, 500);
    }

    // Add a scroll effect to show the address
    const addressElement = document.querySelector('.address');
    if (addressElement) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const addressPosition = addressElement.offsetTop;

            if (scrollPosition > addressPosition - windowHeight + 100) {
                addressElement.style.opacity = '1';
                addressElement.style.transform = 'translateY(0)';
            }
        });

        // Initialize address element as hidden
        addressElement.style.opacity = '0';
        addressElement.style.transform = 'translateY(20px)';
        addressElement.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
    }
});