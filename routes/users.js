var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var usermodel = require("../model/usermodel");
const JWT = require('jsonwebtoken');
const config = require("../ultil/tokenConFig");

// Lấy danh sách người dùng
router.get("/all", async function(req, res) {
    try {
        const list = await usermodel.find();
        res.json(list);
    } catch (error) {
        res.status(500).json({ status: false, message: "Lỗi server", error: error.message });
    }
});

// Đăng nhập
router.post("/login", async function(req, res) {
    try {
        const { name, password } = req.body;

        // Kiểm tra đầu vào
        if (!name || !password) {
            return res.status(400).json({ status: false, message: "Tên và mật khẩu là bắt buộc" });
        }

        // Tìm người dùng theo tên
        const checkUser = await usermodel.findOne({ name: name });
        if (!checkUser) {
            return res.status(401).json({ status: false, message: "Đăng nhập không thành công" });
        }

        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, checkUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: false, message: "Đăng nhập không thành công" });
        }

        // Tạo token và refresh token
        const token = JWT.sign({ name: name }, config.SECRETKEY, { expiresIn: '1h' });
        const refreshToken = JWT.sign({ name: name }, config.SECRETKEY, { expiresIn: '7d' });

        res.status(200).json({ status: true, message: "Đăng nhập thành công", token: token, refreshToken: refreshToken });
    } catch (e) {
        res.status(500).json({ status: false, message: "Có lỗi xảy ra trên server", error: e.message });
    }
});

module.exports = router;