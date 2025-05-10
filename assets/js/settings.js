document.addEventListener('DOMContentLoaded', function () {
    // Form elements
    const profileForm = document.getElementById('profile-form');
    const resetBtn = document.getElementById('reset-btn');
    const saveBtn = document.getElementById('save-btn');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const logoutBtn = document.querySelector('.btn-checkout');
    const bookingRows = document.querySelectorAll('.booking-row');
    const bookingPopup = document.getElementById('booking-detail-popup');
    const closePopupBtn = document.querySelector('.close-popup');

    // Lưu dữ liệu ban đầu để có thể reset về sau
    let initialData = {
        fullname: '',
        email: '',
        phone: ''
    };

    // Kiểm tra xem có dữ liệu đã lưu trước đó trong localStorage không
    function loadUserData() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            fullnameInput.value = userData.fullname || '';
            emailInput.value = userData.email || '';
            phoneInput.value = userData.phone || '';

            // Cập nhật dữ liệu ban đầu
            initialData = {
                fullname: userData.fullname || '',
                email: userData.email || '',
                phone: userData.phone || ''
            };
        }
    }

    // Lưu dữ liệu người dùng vào localStorage
    function saveUserData() {
        const userData = {
            fullname: fullnameInput.value,
            email: emailInput.value,
            phone: phoneInput.value
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        showNotification('Thông tin đã được lưu thành công!');

        // Cập nhật dữ liệu ban đầu
        initialData = { ...userData };
    }

    // Reset form về dữ liệu ban đầu
    function resetForm() {
        fullnameInput.value = initialData.fullname;
        emailInput.value = initialData.email;
        phoneInput.value = initialData.phone;
    }

    // Hiển thị thông báo
    function showNotification(message) {
        // Kiểm tra xem đã có notification chưa
        let notification = document.querySelector('.notification');

        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }

        notification.textContent = message;
        notification.style.display = 'block';

        // CSS cho notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '12px 24px';
        notification.style.background = '#333';
        notification.style.color = 'white';
        notification.style.borderRadius = '4px';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        notification.style.transition = 'opacity 0.3s, transform 0.3s';

        // Animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);

        // Tự động ẩn sau 3 giây
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';

            setTimeout(() => {
                notification.style.display = 'none';
            }, 300);
        }, 3000);
    }

    // Xử lý sự kiện submit form
    if (profileForm) {
        profileForm.addEventListener('submit', function (e) {
            e.preventDefault();
            saveUserData();
        });
    }

    // Xử lý sự kiện reset form
    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            resetForm();
        });
    }

    // Xử lý sự kiện đăng xuất
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            // Giả lập đăng xuất bằng việc xóa dữ liệu và chuyển hướng
            const confirmLogout = confirm('Bạn có chắc chắn muốn đăng xuất?');
            if (confirmLogout) {
                // Xử lý đăng xuất ở đây
                // localStorage.removeItem('userData'); // Uncomment nếu muốn xóa dữ liệu khi đăng xuất
                window.location.href = 'index.html';
            }
        });
    }

    // Xử lý sự kiện khi click vào dòng trong lịch sử đặt phòng
    if (bookingRows.length > 0) {
        bookingRows.forEach(row => {
            row.addEventListener('click', function () {
                const bookingId = this.getAttribute('data-booking-id');
                openBookingDetail(bookingId);
            });
        });
    }

    // Mở popup chi tiết đơn đặt phòng
    function openBookingDetail(bookingId) {
        if (bookingPopup) {
            // Trong thực tế, bạn sẽ lấy dữ liệu từ server dựa trên bookingId
            // Ở đây tôi chỉ hiển thị dữ liệu mẫu

            // Cập nhật dữ liệu trong popup nếu cần
            // document.getElementById('popup-room-id').textContent = bookingId;

            // Hiển thị popup
            bookingPopup.classList.add('active');
            document.body.style.overflow = 'hidden'; // Khóa scroll của trang
        }
    }

    // Đóng popup
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', function () {
            bookingPopup.classList.remove('active');
            document.body.style.overflow = ''; // Mở lại scroll của trang
        });

        // Đóng popup khi click bên ngoài
        bookingPopup.addEventListener('click', function (e) {
            if (e.target === bookingPopup) {
                bookingPopup.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Đóng popup khi nhấn Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && bookingPopup.classList.contains('active')) {
                bookingPopup.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Tải dữ liệu người dùng khi trang được load
    loadUserData();

    // Form đăng ký email
    const emailSignupForm = document.querySelector('.email-signup');
    if (emailSignupForm) {
        const emailInput = emailSignupForm.querySelector('input[type="email"]');
        const submitBtn = emailSignupForm.querySelector('button');

        submitBtn.addEventListener('click', function () {
            if (emailInput.value && emailInput.checkValidity()) {
                showNotification('Cảm ơn bạn đã đăng ký nhận thông tin!');
                emailInput.value = ''; // Xóa input sau khi đăng ký
            } else {
                showNotification('Vui lòng nhập một địa chỉ email hợp lệ!');
            }
        });
    }

    // Hiệu ứng khi cuộn trang
    window.addEventListener('scroll', function () {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        }
    });
}); 