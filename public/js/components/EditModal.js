/**
 * EditModal Component
 * Modal chỉnh sửa thông tin giao dịch
 * 
 * Chức năng:
 * - Hiển thị form chỉnh sửa trong modal
 * - Cập nhật thông tin giao dịch
 * - Quản lý trạng thái hiển thị của modal
 */
export class EditModal {
    /**
     * Khởi tạo component modal
     * @param {Function} onUpdate - Callback function khi cập nhật thành công
     */
    constructor(onUpdate) {
        this.modal = document.getElementById('editModal');
        this.form = document.getElementById('edit-transaction-form');
        this.bindEvents();
    }

    /**
     * Thiết lập các event listener cho form
     */
    bindEvents() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleSubmit();
        });

        // Thêm sự kiện đóng modal khi click ra ngoài
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide();
            }
        });
    }

    /**
     * Hiển thị modal với dữ liệu giao dịch
     * @param {Object} transaction - Thông tin giao dịch cần chỉnh sửa
     */
    show(transaction) {
        // Định dạng ngày tháng đúng chuẩn YYYY-MM-DD
        const date = new Date(transaction.NgayGiaoDich);
        const formattedDate = date.toISOString().split('T')[0];

        document.getElementById('edit-transaction-id').value = transaction.MaGiaoDich;
        document.getElementById('edit-amount').value = transaction.SoTien;
        document.getElementById('edit-category').value = transaction.DanhMuc;
        document.getElementById('edit-type').value = transaction.Loai;
        document.getElementById('edit-date').value = formattedDate;
        document.getElementById('edit-note').value = transaction.GhiChu || '';
        
        this.modal.classList.remove('hidden');
        
        // Focus vào trường đầu tiên
        document.getElementById('edit-amount').focus();
    }

    /**
     * Ẩn modal
     */
    hide() {
        this.modal.classList.add('hidden');
        this.form.reset();
    }

    /**
     * Xử lý sự kiện submit form chỉnh sửa
     */
    async handleSubmit() {
        const maGiaoDich = document.getElementById('edit-transaction-id').value;
        const formData = {
            soTien: document.getElementById('edit-amount').value,
            danhMuc: document.getElementById('edit-category').value.trim(),
            loai: document.getElementById('edit-type').value,
            ngayGiaoDich: document.getElementById('edit-date').value,
            ghiChu: document.getElementById('edit-note').value
        };

        try {
            const response = await fetch(`/transactions/${maGiaoDich}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                this.hide();
                document.dispatchEvent(new CustomEvent('transactionUpdated'));
            } else {
                alert(data.message || 'Cập nhật giao dịch thất bại');
            }
        } catch (error) {
            console.error('Lỗi cập nhật giao dịch:', error);
            alert('Cập nhật giao dịch thất bại');
        }
    }
}