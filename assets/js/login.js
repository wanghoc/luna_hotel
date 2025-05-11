document.addEventListener('DOMContentLoaded', function () {
    // Setup for full page behavior

    // Handle login page close (return to home)
    const loginClose = document.getElementById('login-close');
    if (loginClose) {
        loginClose.addEventListener('click', function (e) {
            // No need to handle click as it now has an anchor tag
        });
    }

    // Handle register page close (return to home)
    const registerClose = document.getElementById('register-close');
    if (registerClose) {
        registerClose.addEventListener('click', function (e) {
            // No need to handle click as it now has an anchor tag
        });
    }

    // Form submission logic for login
    const loginButton = document.querySelector('.submit-button');
    if (loginButton && window.location.href.includes('login.html')) {
        loginButton.addEventListener('click', function () {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            // Validate form fields
            if (!email || !password) {
                alert('Vui lòng điền đầy đủ thông tin đăng nhập');
                return;
            }

            // Placeholder for actual login logic
            console.log('Login attempt with:', email);
            alert('Đăng nhập thành công!');

            // Get the referring page from URL parameter, or default to index.html
            const urlParams = new URLSearchParams(window.location.search);
            const referrer = urlParams.get('ref') || 'index.html';

            // Redirect to referring page after successful login
            window.location.href = referrer;
        });
    }

    // Form submission logic for registration
    const registerButton = document.querySelector('.submit-button');
    if (registerButton && window.location.href.includes('register.html')) {
        registerButton.addEventListener('click', function () {
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;

            // Validate form fields
            if (!email || !password || !confirmPassword) {
                alert('Vui lòng điền đầy đủ thông tin đăng ký');
                return;
            }

            // Check password matches
            if (password !== confirmPassword) {
                alert('Mật khẩu không khớp!');
                return;
            }

            // Placeholder for actual registration logic
            console.log('Registration attempt with:', email);
            alert('Đăng ký thành công!');

            // Get the referring URL parameter from login page if it exists
            const urlParams = new URLSearchParams(window.location.search);
            const referrer = urlParams.get('ref');

            // Redirect to login page with the same referrer
            if (referrer) {
                window.location.href = `login.html?ref=${encodeURIComponent(referrer)}`;
            } else {
                window.location.href = 'login.html';
            }
        });
    }

    // Google login logic
    const googleButton = document.querySelector('.google-button');
    if (googleButton) {
        googleButton.addEventListener('click', function () {
            // Placeholder for Google login logic
            alert('Đăng nhập với Google đang được phát triển!');
        });
    }

    // Handle "Forgot Password" clicks
    const forgotPassword = document.getElementById('forgot-password');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', function () {
            alert('Chức năng quên mật khẩu đang được phát triển!');
        });
    }

    // Set focus on the first input field
    const firstInput = document.querySelector('input');
    if (firstInput) {
        firstInput.focus();
    }
}); 