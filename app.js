/**
 * Backend Server Application
 * Xử lý các request từ client và tương tác với cơ sở dữ liệu
 * 
 * Chức năng:
 * - Xác thực và quản lý phiên người dùng
 * - API endpoints cho giao dịch tài chính
 * - Tạo báo cáo tài chính theo ngày/tháng
 * - Bảo mật và xác thực API
 */

const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Cấu hình middleware
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

/**
 * Cấu hình kết nối MySQL
 */
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
    queueLimit: 0
});

// Kiểm tra kết nối database khi khởi động
pool.getConnection()
    .then(connection => {
        console.log('Kết nối database thành công!');
        connection.release();
    })
    .catch(err => {
        console.error('Lỗi kết nối database:', err);
        process.exit(1);
    });

/**
 * Middleware xác thực
 * Kiểm tra session trước khi cho phép truy cập các API được bảo vệ
 */
const authenticateUser = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};

// Routes xác thực
/**
 * API đăng ký người dùng mới
 * POST /register
 */
app.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        // Bỏ mã hóa mật khẩu
        const [result] = await pool.execute(
            'INSERT INTO NguoiDung (TenNguoiDung, MatKhau, Email) VALUES (?, ?, ?)',
            [username, password, email]
        );
        
        res.json({ success: true, message: 'Đăng ký thành công' });
    } catch (error) {
        console.error('Lỗi đăng ký:', error);
        res.status(500).json({ success: false, message: 'Lỗi đăng ký' });
    }
});

/**
 * API đăng nhập
 * POST /login
 */
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const [users] = await pool.execute(
            'SELECT * FROM NguoiDung WHERE TenNguoiDung = ? AND MatKhau = ?',
            [username, password]
        );

        if (users.length === 0) {
            return res.status(401).json({ success: false, message: 'Thông tin đăng nhập không chính xác' });
        }

        const user = users[0];
        req.session.userId = user.MaNguoiDung;
        res.json({ success: true, message: 'Đăng nhập thành công' });
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        res.status(500).json({ success: false, message: 'Lỗi đăng nhập' });
    }
});

/**
 * API đăng xuất
 * POST /logout
 */
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true, message: 'Đăng xuất thành công' });
});

/**
 * API kiểm tra trạng thái xác thực
 * GET /check-auth
 */
app.get('/check-auth', (req, res) => {
    res.json({ authenticated: !!req.session.userId });
});

/**
 * API lấy thông tin người dùng
 * GET /user-info
 */
app.get('/user-info', authenticateUser, async (req, res) => {
    try {
        const [users] = await pool.execute(
            'SELECT MaNguoiDung, TenNguoiDung, Email FROM NguoiDung WHERE MaNguoiDung = ?',
            [req.session.userId]
        );
        
        if (users.length === 0) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
        }

        res.json(users[0]);
    } catch (error) {
        console.error('Lỗi lấy thông tin người dùng:', error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
});

// Routes giao dịch
/**
 * API lấy danh sách giao dịch
 * GET /transactions
 */
app.get('/transactions', authenticateUser, async (req, res) => {
    try {
        const [transactions] = await pool.execute(
            'SELECT * FROM GiaoDich WHERE MaNguoiDung = ? ORDER BY NgayGiaoDich DESC',
            [req.session.userId]
        );
        res.json(transactions);
    } catch (error) {
        console.error('Lỗi lấy danh sách giao dịch:', error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
});

/**
 * API thêm giao dịch mới
 * POST /transactions
 */
app.post('/transactions', authenticateUser, async (req, res) => {
    try {
        const { soTien, danhMuc, loai, ngayGiaoDich, ghiChu } = req.body;
        
        const [result] = await pool.execute(
            'INSERT INTO GiaoDich (MaNguoiDung, SoTien, DanhMuc, Loai, NgayGiaoDich, GhiChu) VALUES (?, ?, ?, ?, ?, ?)',
            [req.session.userId, soTien, danhMuc, loai, ngayGiaoDich, ghiChu]
        );
        
        res.json({ success: true, message: 'Thêm giao dịch thành công' });
    } catch (error) {
        console.error('Lỗi thêm giao dịch:', error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
});

/**
 * API cập nhật giao dịch
 * PUT /transactions/:id
 */
app.put('/transactions/:id', authenticateUser, async (req, res) => {
    try {
        const { soTien, danhMuc, loai, ngayGiaoDich, ghiChu } = req.body;
        
        const [result] = await pool.execute(
            'UPDATE GiaoDich SET SoTien = ?, DanhMuc = ?, Loai = ?, NgayGiaoDich = ?, GhiChu = ? WHERE MaGiaoDich = ? AND MaNguoiDung = ?',
            [soTien, danhMuc, loai, ngayGiaoDich, ghiChu, req.params.id, req.session.userId]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy giao dịch' });
        }
        
        res.json({ success: true, message: 'Cập nhật giao dịch thành công' });
    } catch (error) {
        console.error('Lỗi cập nhật giao dịch:', error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
});

/**
 * API xóa giao dịch
 * DELETE /transactions/:id
 */
app.delete('/transactions/:id', authenticateUser, async (req, res) => {
    try {
        const [result] = await pool.execute(
            'DELETE FROM GiaoDich WHERE MaGiaoDich = ? AND MaNguoiDung = ?',
            [req.params.id, req.session.userId]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy giao dịch' });
        }
        
        res.json({ success: true, message: 'Xóa giao dịch thành công' });
    } catch (error) {
        console.error('Lỗi xóa giao dịch:', error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
});

// Routes báo cáo
/**
 * API lấy báo cáo theo ngày
 * GET /reports/daily
 */
app.get('/reports/daily', authenticateUser, async (req, res) => {
    try {
        const [report] = await pool.execute(`
            SELECT 
                DATE(NgayGiaoDich) as Ngay,
                COALESCE(SUM(CASE WHEN Loai = 'Thu' THEN SoTien ELSE 0 END), 0) as TongThu,
                COALESCE(SUM(CASE WHEN Loai = 'Chi' THEN SoTien ELSE 0 END), 0) as TongChi
            FROM GiaoDich 
            WHERE MaNguoiDung = ?
            GROUP BY DATE(NgayGiaoDich)
            ORDER BY Ngay DESC
        `, [req.session.userId]);
        
        res.json(report || []);
    } catch (error) {
        console.error('Lỗi lấy báo cáo ngày:', error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
});

/**
 * API lấy báo cáo theo tháng
 * GET /reports/monthly
 */
app.get('/reports/monthly', authenticateUser, async (req, res) => {
    try {
        const [report] = await pool.execute(`
            SELECT 
                MONTH(NgayGiaoDich) as Thang,
                YEAR(NgayGiaoDich) as Nam,
                COALESCE(SUM(CASE WHEN Loai = 'Thu' THEN SoTien ELSE 0 END), 0) as TongThu,
                COALESCE(SUM(CASE WHEN Loai = 'Chi' THEN SoTien ELSE 0 END), 0) as TongChi
            FROM GiaoDich 
            WHERE MaNguoiDung = ?
            GROUP BY YEAR(NgayGiaoDich), MONTH(NgayGiaoDich)
            ORDER BY Nam DESC, Thang DESC
        `, [req.session.userId]);
        
        res.json(report || []);
    } catch (error) {
        console.error('Lỗi lấy báo cáo tháng:', error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
});

// Khởi động server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});