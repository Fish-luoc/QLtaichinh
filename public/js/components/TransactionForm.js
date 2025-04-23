/**
 * TransactionForm Component
 * Form nhập liệu cho giao dịch tài chính
 * 
 * Chức năng:
 * - Thêm giao dịch mới
 * - Xác thực dữ liệu đầu vào
 * - Gửi dữ liệu lên server
 */

export class TransactionForm {
    /**
     * Khởi tạo form giao dịch
     * @param {string} containerId - ID của phần tử chứa form
     */
    constructor(containerId) {
        this.form = document.getElementById(containerId);
        this.bindEvents();
    }

    /**
     * Thiết lập các event listener cho form
     */
    bindEvents() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleSubmit(e);
        });
    }

    /**
     * Xác thực dữ liệu form trước khi gửi
     * @param {Object} formData - Dữ liệu form cần xác thực
     * @returns {boolean} Kết quả xác thực
     */
    validateForm(formData) {
        // ...existing code...
    }

    /**
     * Gửi dữ liệu form lên server
     * @param {Event} event - Sự kiện submit form 
     */
    async handleSubmit(event) {
        const formData = {
            soTien: document.getElementById('amount').value,
            danhMuc: document.getElementById('category').value.trim(),
            loai: document.getElementById('type').value,
            ngayGiaoDich: document.getElementById('date').value,
            ghiChu: document.getElementById('note').value
        };

        try {
            const response = await fetch('/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                this.resetForm();
                // Kích hoạt sự kiện để cập nhật danh sách
                document.dispatchEvent(new CustomEvent('transactionUpdated'));
            } else {
                alert(data.message || 'Thêm giao dịch thất bại');
            }
        } catch (error) {
            console.error('Lỗi thêm giao dịch:', error);
            alert('Thêm giao dịch thất bại');
        }
    }

    /**
     * Reset form về trạng thái ban đầu
     */
    resetForm() {
        this.form.reset();
    }

    /**
     * Cập nhật danh sách danh mục trong form
     * @param {Array} categories - Danh sách danh mục
     */
    updateCategories(categories) {
        // ...existing code...
    }

    /**
     * Render form component
     */
    render() {
        // ...existing code...
    }
}