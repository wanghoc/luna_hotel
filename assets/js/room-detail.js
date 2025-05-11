document.addEventListener('DOMContentLoaded', function () {
    generateCalendars();
    initGallery();
    initBookingPanel();
});

function initGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail img');
    const mainImage = document.querySelector('.main-image img');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            const tempSrc = mainImage.src;
            mainImage.src = this.src;
            this.src = tempSrc;
        });
    });

    const viewAllBtn = document.querySelector('.view-all-photos');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function () {
            alert('Tính năng xem tất cả ảnh sẽ được triển khai sau!');
        });
    }
}

function initBookingPanel() {
    const amenitiesBtn = document.querySelector('.amenities-button');
    if (amenitiesBtn) {
        amenitiesBtn.addEventListener('click', function () {
            alert('Tính năng xem tất cả tiện ích sẽ được triển khai sau!');
        });
    }

    const reviewsBtn = document.querySelector('.reviews-button');
    if (reviewsBtn) {
        reviewsBtn.addEventListener('click', function () {
            alert('Tính năng xem tất cả đánh giá sẽ được triển khai sau!');
        });
    }

    const bookingBtn = document.querySelector('.booking-btn');
    if (bookingBtn) {
        bookingBtn.addEventListener('click', function () {
            alert('Tính năng thanh toán sẽ được triển khai sau!');
        });
    }

    const guestsSelector = document.querySelector('.guests-selector');
    if (guestsSelector) {
        guestsSelector.addEventListener('click', function () {
            alert('Tính năng chọn số lượng khách sẽ được triển khai sau!');
        });
    }
}

function generateCalendars() {
    const month1 = document.getElementById('month1');
    const month2 = document.getElementById('month2');

    const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

    // Generate April 2025
    const month1Header = document.createElement('h3');
    month1Header.textContent = 'Tháng 4 2025';
    month1.appendChild(month1Header);
    generateCalendar(month1, 3, 2025);

    // Generate May 2025
    const month2Header = document.createElement('h3');
    month2Header.textContent = 'Tháng 5 2025';
    month2.appendChild(month2Header);
    generateCalendar(month2, 4, 2025);

    // Pre-select days 20 and 21 in April
    setTimeout(() => {
        const day20 = month1.querySelector(`.calendar-day[data-day="20"]`);
        const day21 = month1.querySelector(`.calendar-day[data-day="21"]`);
        if (day20) day20.classList.add('selected');
        if (day21) day21.classList.add('selected');
    }, 0);

    // Set up navigation
    const prevBtn = document.querySelector('.prev-month');
    const nextBtn = document.querySelector('.next-month');

    prevBtn.addEventListener('click', function () {
        navigateMonths(-1);
    });

    nextBtn.addEventListener('click', function () {
        navigateMonths(1);
    });
}

function generateCalendar(container, month, year) {
    const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const grid = document.createElement('div');
    grid.className = 'calendar-grid';

    // Add day names
    daysOfWeek.forEach(day => {
        const dayName = document.createElement('div');
        dayName.className = 'day-name';
        dayName.textContent = day;
        grid.appendChild(dayName);
    });

    // Get first day of month
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();

    // Get number of days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add empty cells before the first day
    for (let i = 0; i < startDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        grid.appendChild(emptyDay);
    }

    // Add days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.setAttribute('data-day', day);

        // Randomly assign availability and price
        if (Math.random() > 0.3 || (month === 3 && (day === 20 || day === 21))) {
            dayElement.classList.add('available');
            const price = Math.floor(Math.random() * 1000 + 650) + 'K';
            dayElement.innerHTML = `<span class="day-number">${day}</span><span class="day-price">${price}</span>`;
            dayElement.addEventListener('click', function () {
                selectDay(dayElement, day, month, year);
            });
        } else {
            dayElement.classList.add('booked');
            dayElement.innerHTML = `<span class="day-number">${day}</span>`;
        }

        grid.appendChild(dayElement);
    }

    container.appendChild(grid);
}

function navigateMonths(direction) {
    const month1 = document.getElementById('month1');
    const month2 = document.getElementById('month2');
    const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

    let month1Header = month1.querySelector('h3').textContent.split(' ');
    let month2Header = month2.querySelector('h3').textContent.split(' ');
    let month1Index = monthNames.indexOf(month1Header[0]);
    let month2Index = monthNames.indexOf(month2Header[0]);
    let year1 = parseInt(month1Header[1]);
    let year2 = parseInt(month2Header[1]);

    month1Index += direction;
    month2Index += direction;

    if (month1Index < 0) {
        month1Index = 11;
        year1--;
    } else if (month1Index > 11) {
        month1Index = 0;
        year1++;
    }

    if (month2Index < 0) {
        month2Index = 11;
        year2--;
    } else if (month2Index > 11) {
        month2Index = 0;
        year2++;
    }

    month1.innerHTML = `<h3>${monthNames[month1Index]} ${year1}</h3>`;
    month2.innerHTML = `<h3>${monthNames[month2Index]} ${year2}</h3>`;
    generateCalendar(month1, month1Index, year1);
    generateCalendar(month2, month2Index, year2);
}

function selectDay(dayElement, day, month, year) {
    document.querySelectorAll('.calendar-day.selected').forEach(el => {
        el.classList.remove('selected');
    });
    dayElement.classList.add('selected');

    const checkInDate = `14h30p - ${day} / ${month + 1} / ${year}`;
    const checkOutDate = new Date(year, month, day + 2);
    const checkOutDay = checkOutDate.getDate();
    const checkOutMonth = checkOutDate.getMonth() + 1;
    const checkOutYear = checkOutDate.getFullYear();
    const checkOutDateFormatted = `12h30p - ${checkOutDay} / ${checkOutMonth} / ${checkOutYear}`;

    const checkInElement = document.querySelector('.check-in .date');
    const checkOutElement = document.querySelector('.check-out .date');
    checkInElement.textContent = checkInDate;
    checkOutElement.textContent = checkOutDateFormatted;

    const nights = 2;
    const basePrice = 650000;
    const totalBase = basePrice * nights;
    const guestCharge = 300000;
    const guestTotal = guestCharge * 2;
    const discount = Math.round(totalBase * 0.1);
    const totalPrice = totalBase + guestTotal - discount;

    const formatter = new Intl.NumberFormat('vi-VN');
    document.querySelectorAll('.summary-row')[0].querySelector('span:last-child').textContent = formatter.format(totalBase) + 'đ';
    document.querySelectorAll('.summary-row')[1].querySelector('span:last-child').textContent = formatter.format(guestTotal) + 'đ';
    document.querySelectorAll('.summary-row')[2].querySelector('span:last-child').textContent = '-' + formatter.format(discount) + 'đ';
    document.querySelector('.summary-total span:last-child').textContent = formatter.format(totalPrice) + 'đ';
}