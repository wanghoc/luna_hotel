document.addEventListener('DOMContentLoaded', function () {
    // Thêm icons cho form tìm kiếm
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

    // Animation for heading elements
    const smallHeading = document.querySelector('.small-heading');
    const mainHeading = document.querySelector('.ch-m-v-o-thi-n-nhi-n');
    const navbar = document.querySelector('.navbar');

    if (smallHeading) smallHeading.classList.add('animate');
    if (mainHeading) mainHeading.classList.add('animate');
    if (navbar) navbar.classList.add('animate');

    // Xử lý nút "Đặt ngay" mới
    const orderButton = document.querySelector('.order-button');
    if (orderButton) {
        orderButton.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 7px 14px rgba(0, 0, 0, 0.15)';
        });

        orderButton.addEventListener('mouseleave', function () {
            this.style.transform = '';
            this.style.boxShadow = '';
        });

        orderButton.addEventListener('click', function () {
            const currentPage = window.location.href;
            window.location.href = `login.html?ref=${encodeURIComponent(currentPage)}`;
        });
    }

    // Add click event for the "Đặt ngay" button in the promotion section
    const promotionOrderBtn = document.getElementById('promotion-order-btn');
    if (promotionOrderBtn) {
        promotionOrderBtn.addEventListener('click', function () {
            const currentPage = window.location.href;
            window.location.href = `login.html?ref=${encodeURIComponent(currentPage)}`;
        });
    }

    // Hiệu ứng hover cho các phần tử điều hướng
    const navItems = document.querySelectorAll('.home-nav, .services-nav, .profile-nav');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.backgroundColor = '';
        });
    });

    // Thêm một preview phòng vào vòng tròn 
    const ellipseElement = document.querySelector('.ellipse');
    if (ellipseElement) {
        const roomPreview = document.createElement('div');
        roomPreview.className = 'room-preview';
        const img = document.createElement('img');
        img.src = 'assets/images/Rectangle 98.png';
        roomPreview.appendChild(img);
        ellipseElement.appendChild(roomPreview);
    }

    // Fade in animation for images
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

    // Hover effects for room type selection
    const roomTypes = document.querySelectorAll('.text-wrapper, .text-wrapper-2, .text-wrapper-3');
    const roomDots = document.querySelectorAll('.ellipse-2, .ellipse-3, .ellipse-4');
    const roomPreviewImg = document.querySelector('.room-preview img');

    roomTypes.forEach((roomType, index) => {
        roomType.addEventListener('mouseenter', function () {
            // Reset all opacities
            roomTypes.forEach(item => item.style.opacity = '0.7');
            roomTypes.forEach(item => item.style.fontWeight = '400');

            // Highlight the current room type
            this.style.opacity = '1';
            this.style.fontWeight = '700';

            // Reset all dots
            roomDots.forEach(dot => dot.style.transform = 'scale(1)');

            // Enlarge the current dot
            if (roomDots[index]) {
                roomDots[index].style.transform = 'scale(1.2)';
            }

            // Change the room preview image based on the selected room type
            if (roomPreviewImg) {
                const imagePaths = [
                    'assets/images/Rectangle 96.png',
                    'assets/images/Rectangle 97.png',
                    'assets/images/Rectangle 98.png'
                ];

                if (imagePaths[index]) {
                    roomPreviewImg.src = imagePaths[index];
                }
            }
        });
    });

    // NEW: Click effects for room type selection to change circle-img and hero-bg
    const circleImg = document.querySelector('.circle-img');
    const heroBgImg = document.querySelector('.hero-bg');

    // Define image paths for each room type
    const roomImageMap = {
        'Delux room': {
            circle: 'assets/images/image3.png',
            hero: 'assets/images/image5.png'
        },
        'Presidential Suite': {
            circle: 'assets/images/image2.png',
            hero: 'assets/images/image4.png'
        },
        'Penthouse Suite': {
            circle: 'assets/images/house.png',
            hero: 'assets/images/Heading.png'
        }
    };

    roomTypes.forEach((roomType, index) => {
        roomType.addEventListener('click', function () {
            // Get the room type text
            const roomTypeText = this.textContent;

            // Update images based on room type
            if (roomImageMap[roomTypeText] && circleImg && heroBgImg) {
                circleImg.src = roomImageMap[roomTypeText].circle;
                heroBgImg.src = roomImageMap[roomTypeText].hero;

                // Update visual styles for clicked room type
                roomTypes.forEach(item => {
                    item.style.opacity = '0.7';
                    item.style.fontWeight = '400';
                });
                this.style.opacity = '1';
                this.style.fontWeight = '700';

                // Update dots
                roomDots.forEach(dot => dot.style.transform = 'scale(1)');
                if (roomDots[index]) {
                    roomDots[index].style.transform = 'scale(1.2)';
                }
            }
        });
    });

    // NEW: Hover effects for room-type-item to change background image
    const roomItems = document.querySelectorAll('.room-type-item');
    const roomBackgroundMap = {
        'Deluxe Room': 'assets/images/dl.png',
        'Executive Suite': 'assets/images/ex.png',
        'Presidential Suite': 'assets/images/pr.png',
        'Royal Suite': 'assets/images/ro.png',
        'Penthouse Suite': 'assets/images/pen.png'
    };

    roomItems.forEach(item => {
        const roomTitle = item.querySelector('h3').textContent;

        item.addEventListener('mouseenter', function () {
            if (roomBackgroundMap[roomTitle]) {
                this.style.backgroundImage = `url(${roomBackgroundMap[roomTitle]})`;
                this.style.backgroundSize = 'cover';
                this.style.backgroundPosition = 'center';
                // Updated: Reduce overlay opacity to make background image bolder
                this.style.backgroundColor = 'rgba(255, 250, 246, 0.3)'; // Lower opacity for bolder image
                this.style.backgroundBlendMode = 'overlay';
                // Make text more readable
                const textElements = this.querySelectorAll('h3, p, .room-specs span');
                textElements.forEach(el => {
                    el.style.color = '#fff';
                    el.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.5)';
                });
            }
        });

        item.addEventListener('mouseleave', function () {
            this.style.backgroundImage = '';
            this.style.backgroundColor = '#FFFAF6';
            this.style.backgroundBlendMode = 'normal';
            // Reset text styles
            const textElements = this.querySelectorAll('h3, p, .room-specs span');
            textElements.forEach(el => {
                el.style.color = '';
                el.style.textShadow = '';
            });
        });
    });

    // Calendar functionality
    const calendarDays = document.querySelectorAll('.calendar-day:not(.disabled):not(.day-name)');

    calendarDays.forEach(day => {
        day.addEventListener('click', function () {
            const dayNumber = parseInt(this.textContent);

            // If already selected, deselect
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                return;
            }

            // Find already selected days
            const selectedDays = document.querySelectorAll('.calendar-day.selected');

            // If no days selected or more than 1 already selected, just select this one
            if (selectedDays.length === 0 || selectedDays.length > 1) {
                selectedDays.forEach(selected => selected.classList.remove('selected'));
                this.classList.add('selected');
                return;
            }

            // If one day already selected, select range
            const selectedDay = parseInt(selectedDays[0].textContent);
            const min = Math.min(dayNumber, selectedDay);
            const max = Math.max(dayNumber, selectedDay);

            // Remove all selections first
            document.querySelectorAll('.calendar-day').forEach(d => {
                d.classList.remove('selected');
                d.classList.remove('selected-middle');
            });

            // Select the range
            calendarDays.forEach(d => {
                const num = parseInt(d.textContent);
                if (num >= min && num <= max) {
                    d.classList.add('selected');

                    // Add special class for days in the middle of the range
                    if (num !== min && num !== max) {
                        d.classList.add('selected-middle');
                    }
                }
            });
        });
    });

    // Month navigation
    const prevMonthBtn = document.querySelector('.arrow.prev');
    const nextMonthBtn = document.querySelector('.arrow.next');
    const monthDisplay = document.querySelector('.month');

    const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    let currentMonthIndex = 3; // April is default

    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function () {
            currentMonthIndex = (currentMonthIndex - 1 + 12) % 12;
            if (monthDisplay) {
                monthDisplay.textContent = months[currentMonthIndex];
            }
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function () {
            currentMonthIndex = (currentMonthIndex + 1) % 12;
            if (monthDisplay) {
                monthDisplay.textContent = months[currentMonthIndex];
            }
        });
    }

    // Form animations
    const searchForm = document.querySelector('.search-form');

    if (searchForm) {
        window.addEventListener('scroll', function () {
            const scrollY = window.scrollY;
            if (scrollY > 300) {
                searchForm.style.opacity = '0.7';
                searchForm.style.pointerEvents = 'none';
            } else {
                searchForm.style.opacity = '1';
                searchForm.style.pointerEvents = 'auto';
            }
        });
    }

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary, .btn-view-more');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.classList.add('hover');
        });

        button.addEventListener('mouseleave', function () {
            this.classList.remove('hover');
        });
    });

    // Animation for images in service and nature sections
    const serviceImages = document.querySelectorAll('.service-images img, .nature-gallery img');

    serviceImages.forEach((img, index) => {
        setTimeout(() => {
            img.classList.add('visible');
        }, index * 100);

        img.addEventListener('mouseenter', function () {
            this.classList.add('hover');
        });

        img.addEventListener('mouseleave', function () {
            this.classList.remove('hover');
        });
    });

    // Add click handler for search button
    const searchButton = document.querySelector('.search-button');
    if (searchButton) {
        searchButton.addEventListener('click', function () {
            window.location.href = 'booking.html';
        });
    }
});