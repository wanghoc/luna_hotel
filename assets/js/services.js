document.addEventListener('DOMContentLoaded', function () {
    // Thêm hiệu ứng fade-in cho các hình ảnh khi cuộn
    const fadeElements = document.querySelectorAll('.service-img-large, .service-img-small, .pool-img-large, .pool-img-small, .restaurant-img, .tour-img, .custom-img-main, .custom-img-sub');

    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const fadeInObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);

    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        fadeInObserver.observe(element);
    });

    // Thêm sự kiện click cho các nút
    const orderButton = document.querySelector('.order-button');
    if (orderButton) {
        orderButton.addEventListener('click', function () {
            window.location.href = 'booking.html';
        });
    }

    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function () {
            // Có thể mở form liên hệ hoặc chuyển hướng đến trang liên hệ
            alert('Vui lòng gọi số hotline: 0123 456 789 để được hỗ trợ');
        });
    }

    const bookNowBtn = document.querySelector('.book-now-btn');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function () {
            window.location.href = 'booking.html';
        });
    }

    const contactNowBtn = document.querySelector('.contact-now-btn');
    if (contactNowBtn) {
        contactNowBtn.addEventListener('click', function () {
            // Có thể mở form liên hệ hoặc chuyển hướng đến trang liên hệ
            alert('Vui lòng gọi số hotline: 0123 456 789 để được hỗ trợ');
        });
    }

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('click', function (e) {
            if (e.target.closest('.newsletter-button')) {
                const placeholder = newsletterForm.querySelector('.newsletter-placeholder');
                if (placeholder && placeholder.textContent === 'Nhập Email để nhận thông tin') {
                    alert('Vui lòng nhập email của bạn trước');
                } else {
                    alert('Cảm ơn bạn đã đăng ký nhận tin!');
                }
            }
        });
    }

    // Thêm hiệu ứng hover cho các mục dịch vụ
    const serviceContainers = document.querySelectorAll('.service-section');
    serviceContainers.forEach(container => {
        container.addEventListener('mouseenter', function () {
            container.style.transform = 'translateY(-5px)';
            container.style.transition = 'transform 0.3s ease';
        });

        container.addEventListener('mouseleave', function () {
            container.style.transform = 'translateY(0)';
        });
    });
});

// Khởi tạo hero section với transform ban đầu là 0 (đứng yên)
window.addEventListener('DOMContentLoaded', function () {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.transform = 'translateY(0)';
    }
}); 