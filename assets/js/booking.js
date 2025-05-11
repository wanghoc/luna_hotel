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

    // Add icons for the search form and buttons
    const calendarIcon1 = document.querySelector('.calendar-icon-1');
    if (calendarIcon1) {
        calendarIcon1.innerHTML = '<i class="fas fa-calendar-alt"></i>';
    }

    const calendarIcon2 = document.querySelector('.calendar-icon-2');
    if (calendarIcon2) {
        calendarIcon2.innerHTML = '<i class="fas fa-calendar-alt"></i>';
    }

    const peopleIcon = document.querySelector('.people-icon');
    if (peopleIcon) {
        peopleIcon.innerHTML = '<i class="fas fa-user"></i>';
    }

    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.innerHTML = '<i class="fas fa-search"></i>';
    }

    const arrowIcon = document.querySelector('.arrow-icon');
    if (arrowIcon) {
        arrowIcon.innerHTML = '<i class="fas fa-arrow-right"></i>';
    }

    // Make room images load with a slight delay for a nice effect
    const roomImages = document.querySelectorAll('[class*="-img"]');
    roomImages.forEach((img, index) => {
        setTimeout(() => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease-in-out';

            // Ensure the image is loaded
            if (img.complete) {
                img.style.opacity = '1';
            } else {
                img.onload = function () {
                    img.style.opacity = '1';
                };
            }
        }, index * 100); // Staggered delay
    });

    // Get current page URL
    const currentPage = window.location.href;

    // Add click event for the "Đặt ngay" button in the top right
    const orderButton = document.querySelector('.order-button-inner');
    if (orderButton) {
        orderButton.addEventListener('click', function () {
            // Redirect to login page with current page as referrer
            window.location.href = `login.html?ref=${encodeURIComponent(currentPage)}`;
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
}); 