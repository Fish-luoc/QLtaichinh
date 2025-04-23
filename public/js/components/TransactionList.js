/**
 * Component TransactionList
 * Hiển thị và quản lý danh sách các giao dịch
 * 
 * Chức năng:
 * - Hiển thị danh sách giao dịch
 * - Tính toán và hiển thị tổng thu, chi, số dư
 * - Xử lý xóa giao dịch
 * - Cập nhật tự động khi có thay đổi
 */
export class TransactionList {
    /**
     * Khởi tạo component
     * Tìm các element cần thiết và thiết lập event listener
     */
    constructor() {
        this.transactionList = document.getElementById('transactionList');
        this.totalIncome = document.getElementById('totalIncome');
        this.totalExpense = document.getElementById('totalExpense');
        this.balance = document.getElementById('balance');
        this.bindEvents();
    }

    /**
     * Thiết lập các event listener
     * Lắng nghe sự kiện cập nhật từ các component khác
     */
    bindEvents() {
        document.addEventListener('transactionUpdated', () => {
            this.loadTransactions();
        });
    }

    /**
     * Tải danh sách giao dịch từ server
     * Xử lý chuyển hướng nếu chưa đăng nhập
     */
    async loadTransactions() {
        try {
            const response = await fetch('/transactions');
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('isAuthenticated');
                    window.location.href = '/login.html';
                    return;
                }
                throw new Error('Lỗi tải giao dịch');
            }
            
            const transactions = await response.json();
            this.renderTransactions(transactions);
        } catch (error) {
            console.error('Lỗi tải giao dịch:', error);
        }
    }

    /**
     * Hiển thị danh sách giao dịch và tính toán thống kê
     * @param {Array} transactions Mảng các giao dịch
     */
    renderTransactions(transactions) {
        let totalIncome = 0;
        let totalExpense = 0;
        let html = '';

        transactions.forEach(transaction => {
            if (transaction.Loai === 'Thu') {
                totalIncome += parseFloat(transaction.SoTien);
            } else {
                totalExpense += parseFloat(transaction.SoTien);
            }

            html += `
                <tr>
                    <td>${new Date(transaction.NgayGiaoDich).toLocaleDateString('vi-VN')}</td>
                    <td>${transaction.DanhMuc}</td>
                    <td>${transaction.Loai}</td>
                    <td>${parseFloat(transaction.SoTien).toLocaleString('vi-VN')} VNĐ</td>
                    <td>${transaction.GhiChu || ''}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="edit-btn" onclick="window.handleEdit(${transaction.MaGiaoDich})">Sửa</button>
                            <button class="delete-btn" onclick="window.transactionList.deleteTransaction(${transaction.MaGiaoDich})">Xóa</button>
                        </div>
                    </td>
                </tr>
            `;
        });

        this.transactionList.innerHTML = html;
        this.totalIncome.textContent = totalIncome.toLocaleString('vi-VN') + ' VNĐ';
        this.totalExpense.textContent = totalExpense.toLocaleString('vi-VN') + ' VNĐ';
        this.balance.textContent = (totalIncome - totalExpense).toLocaleString('vi-VN') + ' VNĐ';
        
        // Lưu transactions để sử dụng khi edit
        window.transactions = transactions;
    }

    /**
     * Xử lý xóa một giao dịch
     * @param {number} maGiaoDich ID của giao dịch cần xóa
     */
    async deleteTransaction(maGiaoDich) {
        if (!confirm('Bạn có chắc chắn muốn xóa giao dịch này?')) {
            return;
        }

        try {
            const response = await fetch(`/transactions/${maGiaoDich}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            if (data.success) {
                document.dispatchEvent(new CustomEvent('transactionUpdated'));
            } else {
                alert(data.message || 'Xóa giao dịch thất bại');
            }
        } catch (error) {
            console.error('Lỗi xóa giao dịch:', error);
            alert('Xóa giao dịch thất bại');
        }
    }
}