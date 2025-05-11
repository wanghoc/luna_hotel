document.addEventListener('DOMContentLoaded', function () {
    // Add hover effects for buttons
    const buttons = document.querySelectorAll('.view-now-btn, .newsletter-button, .order-button-inner');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        });
        button.addEventListener('mouseleave', function () {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Fade-in animation for elements
    const fadeElements = document.querySelectorAll('.fade-in');

    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;

            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    }

    // Run once on load
    checkFade();

    // Run on scroll
    window.addEventListener('scroll', checkFade);

    // Make room images load with a slight delay for a nice effect
    const roomImages = document.querySelectorAll('[class*="-img"]');
    roomImages.forEach((img, index) => {
        setTimeout(() => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease-in-out';

            if (img.complete) {
                img.style.opacity = '1';
            } else {
                img.onload = function () {
                    img.style.opacity = '1';
                };
            }
        }, index * 100);
    });

    // Add click event for the "Đặt ngay" button
    const orderButton = document.querySelector('.order-button-inner');
    if (orderButton) {
        orderButton.addEventListener('click', function () {
            alert('Chức năng đặt phòng ngay đang được phát triển!');
        });
    }

    // Add click event for the "Xem ngay" buttons
    const viewButtons = document.querySelectorAll('.view-now-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function () {
            alert('Chức năng xem chi tiết phòng đang được phát triển!');
        });
    });

    // Newsletter signup button click event
    const newsletterButton = document.querySelector('.newsletter-button');
    if (newsletterButton) {
        newsletterButton.addEventListener('click', function () {
            alert('Cảm ơn bạn đã đăng ký nhận thông tin!');
        });
    }

    // Add hover effects to navigation items
    const navItems = document.querySelectorAll('.home-nav, .services-nav, .profile-nav');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        item.addEventListener('mouseleave', function () {
            this.style.backgroundColor = '';
        });
    });
});