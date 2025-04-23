/**
 * Main Frontend Application Logic
 * Xử lý tương tác người dùng và quản lý giao diện
 * 
 * Chức năng:
 * - Khởi tạo và quản lý các components
 * - Xử lý sự kiện người dùng
 * - Tương tác với backend API
 * - Hiển thị và cập nhật dữ liệu
 */

import { TransactionForm } from './components/TransactionForm.js';
import { TransactionList } from './components/TransactionList.js';
import { EditModal } from './components/EditModal.js';
import { Reports } from './components/Reports.js';
import { UserInfo } from './components/UserInfo.js';

// Hàm xử lý sửa giao dịch toàn cục
window.handleEdit = function(maGiaoDich) {
    const transaction = window.transactions.find(t => t.MaGiaoDich === maGiaoDich);
    if (transaction) {
        window.editModal.show(transaction);
    }
};

// Hàm đóng modal toàn cục
window.closeEditModal = function() {
    if (window.editModal) {
        window.editModal.hide();
    }
};

/**
 * Khởi tạo ứng dụng khi DOM đã sẵn sàng
 * - Kiểm tra xác thực
 * - Khởi tạo các component
 * - Thiết lập xử lý đăng xuất
 */
document.addEventListener('DOMContentLoaded', async () => {
    // Kiểm tra trạng thái đăng nhập
    try {
        const response = await fetch('/check-auth');
        const data = await response.json();
        if (!data.authenticated) {
            localStorage.removeItem('isAuthenticated');
            window.location.href = '/login.html';
            return;
        }
        localStorage.setItem('isAuthenticated', 'true');
    } catch (error) {
        console.error('Lỗi kiểm tra xác thực:', error);
        localStorage.removeItem('isAuthenticated');
        window.location.href = '/login.html';
        return;
    }

    // Khởi tạo các component
    const transactionForm = new TransactionForm('transaction-form');
    window.transactionList = new TransactionList();
    window.editModal = new EditModal();
    const reports = new Reports();
    const userInfo = new UserInfo();

    // Xử lý đăng xuất
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
            });

            const data = await response.json();
            if (data.success) {
                localStorage.removeItem('isAuthenticated');
                window.location.href = '/login.html';
            }
        } catch (error) {
            console.error('Lỗi đăng xuất:', error);
        }
    });

    // Kích hoạt sự kiện để tải dữ liệu ban đầu
    document.dispatchEvent(new CustomEvent('transactionUpdated'));
});