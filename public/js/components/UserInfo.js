/**
 * Component UserInfo
 * Hiển thị thông tin người dùng trên thanh header
 * 
 * Chức năng:
 * - Lấy và hiển thị thông tin người dùng đang đăng nhập
 * - Hiển thị avatar với chữ cái đầu của tên người dùng
 * - Tự động chuyển hướng khi phiên đăng nhập hết hạn
 */
export class UserInfo {
    /**
     * Khởi tạo component
     * Tìm container và tải thông tin người dùng
     */
    constructor() {
        this.userInfoContainer = document.getElementById('userInfo');
        this.loadUserInfo();
    }

    /**
     * Tải thông tin người dùng từ server
     * Xử lý chuyển hướng nếu chưa đăng nhập
     */
    async loadUserInfo() {
        try {
            const response = await fetch('/user-info');
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('isAuthenticated');
                    window.location.href = '/login.html';
                    return;
                }
                throw new Error('Lỗi tải thông tin người dùng');
            }
            
            const userData = await response.json();
            this.renderUserInfo(userData);
        } catch (error) {
            console.error('Lỗi tải thông tin người dùng:', error);
        }
    }

    /**
     * Hiển thị thông tin người dùng
     * @param {Object} userData Thông tin người dùng từ server
     */
    renderUserInfo(userData) {
        this.userInfoContainer.innerHTML = `
            <div class="user-avatar">
                <span>${userData.TenNguoiDung.charAt(0).toUpperCase()}</span>
            </div>
            <div class="user-name">${userData.TenNguoiDung}</div>
        `;
    }
}