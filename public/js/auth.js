/**
 * Authentication Module
 * Xử lý xác thực người dùng phía client
 */

document.addEventListener('DOMContentLoaded', () => {
    const isLoginPage = window.location.pathname.includes('login.html');
    const isRegisterPage = window.location.pathname.includes('register.html');
    
    // Kiểm tra và chuyển hướng trang nếu cần
    if (!isLoginPage && !isRegisterPage && !localStorage.getItem('isAuthenticated')) {
        window.location.href = '/login.html';
        return;
    }

    if ((isLoginPage || isRegisterPage) && localStorage.getItem('isAuthenticated')) {
        window.location.href = '/';
        return;
    }

    // Thiết lập xử lý form
    if (isLoginPage) {
        setupLoginForm();
    } else if (isRegisterPage) {
        setupRegisterForm();
    }
});

function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem('isAuthenticated', 'true');
                window.location.href = '/';
            } else {
                alert(data.message || 'Đăng nhập thất bại');
            }
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            alert('Đăng nhập thất bại');
        }
    });
}

function setupRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            });

            const data = await response.json();
            if (data.success) {
                alert('Đăng ký thành công! Vui lòng đăng nhập.');
                window.location.href = '/login.html';
            } else {
                alert(data.message || 'Đăng ký thất bại');
            }
        } catch (error) {
            console.error('Lỗi đăng ký:', error);
            alert('Đăng ký thất bại');
        }
    });
}