document.addEventListener('DOMContentLoaded', function () {
    // Generate calendars
    generateCalendars();

    // Initialize thumbnail gallery
    initGallery();

    // Set up booking panel interactions
    initBookingPanel();
});

/**
 * Initializes the thumbnail gallery
 */
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

/**
 * Sets up the booking panel interactions
 */
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

/**
 * Generates the calendars for the current and next month
 */
function generateCalendars() {
    const month1Calendar = document.getElementById('month1');
    const month2Calendar = document.getElementById('month2');

    if (month1Calendar && month2Calendar) {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        // Generate current month
        generateCalendar(month1Calendar, currentMonth, currentYear);

        // Generate next month
        let nextMonth = currentMonth + 1;
        let nextYear = currentYear;

        if (nextMonth > 11) {
            nextMonth = 0;
            nextYear++;
        }

        generateCalendar(month2Calendar, nextMonth, nextYear);

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
}

/**
 * Generates a calendar for the specified month and year
 */
function generateCalendar(container, month, year) {
    // Clear existing content
    container.innerHTML = '';

    // Create calendar header
    const header = document.createElement('div');
    header.className = 'calendar-header';

    const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    daysOfWeek.forEach(day => {
        const dayEl = document.createElement('div');
        dayEl.className = 'day-name';
        dayEl.textContent = day;
        header.appendChild(dayEl);
    });

    container.appendChild(header);

    // Create calendar grid
    const grid = document.createElement('div');
    grid.className = 'calendar-grid';

    // Get first day of month
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Get number of days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Create blank cells for days before first day of month
    for (let i = 0; i < startDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        grid.appendChild(emptyDay);
    }

    // Create cells for days in month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';

        // Randomly mark some days as booked
        if (Math.random() > 0.7) {
            dayEl.classList.add('booked');
            dayEl.innerHTML = `<span class="day-number">${day}</span>`;
        } else {
            dayEl.classList.add('available');
            dayEl.innerHTML = `
                <span class="day-number">${day}</span>
                <span class="day-price">650K</span>
            `;

            // Add click event to available days
            dayEl.addEventListener('click', function () {
                selectDay(this, day, month, year);
            });
        }

        grid.appendChild(dayEl);
    }

    container.appendChild(grid);
}

/**
 * Handles month navigation
 */
function navigateMonths(direction) {
    const month1Header = document.querySelector('.month:first-child .month-header h3');
    const month2Header = document.querySelector('.month:last-child .month-header h3');

    // Extract current months and years
    const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

    const month1Text = month1Header.textContent;
    const month1Index = monthNames.indexOf(month1Text);

    const month2Text = month2Header.textContent;
    const month2Index = monthNames.indexOf(month2Text);

    // Calculate new months
    let newMonth1Index = month1Index + direction;
    let newMonth2Index = month2Index + direction;
    let year1 = new Date().getFullYear();
    let year2 = year1;

    // Handle year changes
    if (newMonth1Index < 0) {
        newMonth1Index = 11;
        year1--;
    } else if (newMonth1Index > 11) {
        newMonth1Index = 0;
        year1++;
    }

    if (newMonth2Index < 0) {
        newMonth2Index = 11;
        year2--;
    } else if (newMonth2Index > 11) {
        newMonth2Index = 0;
        year2++;
    }

    // Update month names
    month1Header.textContent = monthNames[newMonth1Index];
    month2Header.textContent = monthNames[newMonth2Index];

    // Regenerate calendars
    generateCalendar(document.getElementById('month1'), newMonth1Index, year1);
    generateCalendar(document.getElementById('month2'), newMonth2Index, year2);
}

/**
 * Handles day selection in calendar
 */
function selectDay(dayElement, day, month, year) {
    // Remove selected class from all days
    document.querySelectorAll('.calendar-day.selected').forEach(el => {
        el.classList.remove('selected');
    });

    // Add selected class to clicked day
    dayElement.classList.add('selected');

    // Update booking panel dates
    updateBookingDates(day, month, year);
}

/**
 * Updates booking panel dates when a day is selected
 */
function updateBookingDates(day, month, year) {
    // Format check-in date
    const checkInDate = `14h30p - ${day} / ${month + 1} / ${year}`;

    // Calculate check-out date (day + 2)
    const checkOutDate = new Date(year, month, day + 2);
    const checkOutDay = checkOutDate.getDate();
    const checkOutMonth = checkOutDate.getMonth() + 1;
    const checkOutYear = checkOutDate.getFullYear();

    // Format check-out date
    const checkOutDateFormatted = `12h30p - ${checkOutDay} / ${checkOutMonth} / ${checkOutYear}`;

    // Update booking panel
    const checkInElement = document.querySelector('.check-in .date');
    const checkOutElement = document.querySelector('.check-out .date');

    if (checkInElement && checkOutElement) {
        checkInElement.textContent = checkInDate;
        checkOutElement.textContent = checkOutDateFormatted;
    }

    // Calculate and update price
    const nights = 2;
    const basePrice = 650000;
    const totalBase = basePrice * nights;
    const guestCharge = 300000;
    const guestTotal = guestCharge * 2; // 2 extra guests
    const discount = Math.round(totalBase * 0.1); // 10% discount
    const totalPrice = totalBase + guestTotal - discount;

    // Format as Vietnamese currency
    const formatter = new Intl.NumberFormat('vi-VN');

    // Update price summary
    const summaryRows = document.querySelectorAll('.summary-row');
    if (summaryRows.length >= 3) {
        summaryRows[0].querySelector('span:last-child').textContent = formatter.format(totalBase) + 'đ';
        summaryRows[1].querySelector('span:last-child').textContent = formatter.format(guestTotal) + 'đ';
        summaryRows[2].querySelector('span:last-child').textContent = '-' + formatter.format(discount) + 'đ';
    }

    const totalElement = document.querySelector('.summary-total span:last-child');
    if (totalElement) {
        totalElement.textContent = formatter.format(totalPrice) + 'đ';
    }
}

// Gallery functionality
document.addEventListener('DOMContentLoaded', function () {
    // Gallery
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail img');
    const viewAllPhotosBtn = document.querySelector('.view-all-photos');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            mainImage.src = thumb.src;
            thumbnails.forEach(t => t.parentElement.classList.remove('active'));
            thumb.parentElement.classList.add('active');
        });
    });

    viewAllPhotosBtn.addEventListener('click', () => {
        // Implement lightbox gallery here
        console.log('View all photos clicked');
    });

    // Calendar
    const calendar = new Calendar({
        element: '.calendar',
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        onDateSelect: (date) => {
            console.log('Selected date:', date);
        }
    });

    // Booking panel
    const bookingPanel = {
        init() {
            this.price = 2500000; // Base price
            this.updateTotal();
            this.bindEvents();
        },

        bindEvents() {
            const guestsSelector = document.querySelector('.guests-selector');
            const voucherInput = document.querySelector('.voucher-code');

            if (guestsSelector) {
                guestsSelector.addEventListener('change', () => this.updateTotal());
            }

            if (voucherInput) {
                voucherInput.addEventListener('input', () => this.updateTotal());
            }
        },

        updateTotal() {
            const nights = this.calculateNights();
            const guests = parseInt(document.querySelector('.guests-selector').value) || 1;
            const voucherCode = document.querySelector('.voucher-code').value;

            let total = this.price * nights * guests;
            let discount = 0;

            // Apply voucher discount if valid
            if (voucherCode === 'WELCOME10') {
                discount = total * 0.1;
            }

            total -= discount;

            // Update UI
            document.querySelector('.summary-total .amount').textContent =
                new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total);
        },

        calculateNights() {
            const checkIn = new Date(document.querySelector('.check-in .date').textContent);
            const checkOut = new Date(document.querySelector('.check-out .date').textContent);
            return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        }
    };

    // Initialize booking panel
    bookingPanel.init();
});

// Calendar class
class Calendar {
    constructor(options) {
        this.element = document.querySelector(options.element);
        this.startDate = options.startDate;
        this.endDate = options.endDate;
        this.onDateSelect = options.onDateSelect;
        this.selectedDates = [];

        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
    }

    render() {
        const months = this.getMonths();
        const monthsHTML = months.map(month => this.renderMonth(month)).join('');
        this.element.innerHTML = monthsHTML;
    }

    getMonths() {
        const months = [];
        let currentDate = new Date(this.startDate);

        while (currentDate <= this.endDate) {
            months.push(new Date(currentDate));
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        return months;
    }

    renderMonth(date) {
        const monthName = date.toLocaleString('vi-VN', { month: 'long' });
        const year = date.getFullYear();
        const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

        let daysHTML = '';

        // Add empty cells for days before first day of month
        for (let i = 0; i < firstDay; i++) {
            daysHTML += '<div class="calendar-day empty"></div>';
        }

        // Add days of month
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
            const isAvailable = this.isDateAvailable(currentDate);
            const isSelected = this.isDateSelected(currentDate);

            daysHTML += `
                <div class="calendar-day ${isAvailable ? 'available' : 'booked'} ${isSelected ? 'selected' : ''}"
                     data-date="${currentDate.toISOString()}">
                    <span class="day-number">${day}</span>
                    ${isAvailable ? `<span class="day-price">2.500.000đ</span>` : ''}
                </div>
            `;
        }

        return `
            <div class="month">
                <div class="month-header">
                    <button class="prev-month">&lt;</button>
                    <h3>${monthName} ${year}</h3>
                    <button class="next-month">&gt;</button>
                </div>
                <div class="calendar">
                    <div class="calendar-header">
                        <div class="day-name">CN</div>
                        <div class="day-name">T2</div>
                        <div class="day-name">T3</div>
                        <div class="day-name">T4</div>
                        <div class="day-name">T5</div>
                        <div class="day-name">T6</div>
                        <div class="day-name">T7</div>
                    </div>
                    <div class="calendar-grid">
                        ${daysHTML}
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        this.element.addEventListener('click', (e) => {
            const day = e.target.closest('.calendar-day');
            if (!day || !day.classList.contains('available')) return;

            const date = new Date(day.dataset.date);
            this.toggleDate(date);
            this.onDateSelect(date);
        });
    }

    isDateAvailable(date) {
        // Implement availability logic here
        return true;
    }

    isDateSelected(date) {
        return this.selectedDates.some(d =>
            d.getFullYear() === date.getFullYear() &&
            d.getMonth() === date.getMonth() &&
            d.getDate() === date.getDate()
        );
    }

    toggleDate(date) {
        const index = this.selectedDates.findIndex(d =>
            d.getFullYear() === date.getFullYear() &&
            d.getMonth() === date.getMonth() &&
            d.getDate() === date.getDate()
        );

        if (index === -1) {
            this.selectedDates.push(date);
        } else {
            this.selectedDates.splice(index, 1);
        }

        this.render();
    }
}
