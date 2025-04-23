/**
 * Reports Component
 * Phân tích và hiển thị báo cáo tài chính
 * 
 * Chức năng:
 * - Thống kê chi tiêu theo danh mục
 * - Hiển thị biểu đồ phân tích
 * - Tính toán xu hướng chi tiêu
 */

export class Reports {
    /**
     * Khởi tạo component báo cáo
     */
    constructor() {
        this.dailyReport = document.getElementById('dailyReport');
        this.monthlyReport = document.getElementById('monthlyReport');
        this.reportTabs = document.querySelectorAll('.tab-btn');
        this.bindEvents();
        
        // Tải dữ liệu báo cáo khi khởi tạo
        this.loadReports();
    }

    /**
     * Thiết lập các event listener
     * - Xử lý chuyển tab
     * - Lắng nghe sự kiện cập nhật từ các component khác
     */
    bindEvents() {
        this.reportTabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab));
        });

        document.addEventListener('transactionUpdated', () => {
            this.loadReports();
        });
    }

    /**
     * Xử lý chuyển đổi giữa các tab báo cáo
     * @param {HTMLElement} activeTab Tab được chọn
     */
    switchTab(activeTab) {
        this.reportTabs.forEach(t => t.classList.remove('active'));
        activeTab.classList.add('active');
        
        const type = activeTab.dataset.tab;
        document.querySelectorAll('.report-content').forEach(content => {
            content.classList.remove('active');
            content.classList.add('hidden');
        });
        const activeContent = document.getElementById(`${type}Report`);
        activeContent.classList.remove('hidden');
        activeContent.classList.add('active');
    }

    /**
     * Tải dữ liệu báo cáo từ server
     */
    async loadReports() {
        try {
            await Promise.all([
                this.loadDailyReport(),
                this.loadMonthlyReport()
            ]);
        } catch (error) {
            console.error('Lỗi tải báo cáo:', error);
        }
    }

    /**
     * Tải và hiển thị báo cáo theo ngày
     */
    async loadDailyReport() {
        const response = await fetch('/reports/daily');
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('isAuthenticated');
                window.location.href = '/login.html';
                return;
            }
            throw new Error('Lỗi tải báo cáo ngày');
        }
        
        const dailyData = await response.json();
        this.renderDailyReport(dailyData);
    }

    /**
     * Tải và hiển thị báo cáo theo tháng
     */
    async loadMonthlyReport() {
        const response = await fetch('/reports/monthly');
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('isAuthenticated');
                window.location.href = '/login.html';
                return;
            }
            throw new Error('Lỗi tải báo cáo tháng');
        }
        
        const monthlyData = await response.json();
        this.renderMonthlyReport(monthlyData);
    }

    /**
     * Hiển thị báo cáo theo ngày
     * @param {Array} data Dữ liệu báo cáo theo ngày
     */
    renderDailyReport(data) {
        if (!data || data.length === 0) {
            this.dailyReport.innerHTML = '<div class="no-data">Chưa có dữ liệu giao dịch</div>';
            return;
        }

        let html = '<table><thead><tr><th>Ngày</th><th>Tổng Thu</th><th>Tổng Chi</th><th>Số Dư</th></tr></thead><tbody>';
        
        data.forEach(report => {
            const soDu = parseFloat(report.TongThu) - parseFloat(report.TongChi);
            html += `
                <tr>
                    <td>${new Date(report.Ngay).toLocaleDateString('vi-VN')}</td>
                    <td class="money-plus">${parseFloat(report.TongThu).toLocaleString('vi-VN')} VNĐ</td>
                    <td class="money-minus">${parseFloat(report.TongChi).toLocaleString('vi-VN')} VNĐ</td>
                    <td class="${soDu >= 0 ? 'money-plus' : 'money-minus'}">${soDu.toLocaleString('vi-VN')} VNĐ</td>
                </tr>
            `;
        });
        html += '</tbody></table>';
        this.dailyReport.innerHTML = html;
    }

    /**
     * Hiển thị báo cáo theo tháng
     * @param {Array} data Dữ liệu báo cáo theo tháng
     */
    renderMonthlyReport(data) {
        if (!data || data.length === 0) {
            this.monthlyReport.innerHTML = '<div class="no-data">Chưa có dữ liệu giao dịch</div>';
            return;
        }

        let html = '<table><thead><tr><th>Tháng</th><th>Năm</th><th>Tổng Thu</th><th>Tổng Chi</th><th>Số Dư</th></tr></thead><tbody>';
        
        data.forEach(report => {
            const soDu = parseFloat(report.TongThu) - parseFloat(report.TongChi);
            html += `
                <tr>
                    <td>${report.Thang}</td>
                    <td>${report.Nam}</td>
                    <td class="money-plus">${parseFloat(report.TongThu).toLocaleString('vi-VN')} VNĐ</td>
                    <td class="money-minus">${parseFloat(report.TongChi).toLocaleString('vi-VN')} VNĐ</td>
                    <td class="${soDu >= 0 ? 'money-plus' : 'money-minus'}">${soDu.toLocaleString('vi-VN')} VNĐ</td>
                </tr>
            `;
        });
        html += '</tbody></table>';
        this.monthlyReport.innerHTML = html;
    }

    /**
     * Tải dữ liệu giao dịch và tạo báo cáo
     * @param {string} startDate - Ngày bắt đầu thống kê
     * @param {string} endDate - Ngày kết thúc thống kê
     */
    async loadData(startDate, endDate) {
        // ...existing code...
    }

    /**
     * Tạo biểu đồ phân tích chi tiêu theo danh mục
     * @param {Array} data - Dữ liệu giao dịch đã được nhóm theo danh mục
     */
    createCharts(data) {
        // ...existing code...
    }

    /**
     * Tính toán số liệu thống kê tổng quan
     * @param {Array} transactions - Danh sách giao dịch
     * @returns {Object} Các chỉ số thống kê
     */
    calculateStatistics(transactions) {
        // ...existing code...
    }
}