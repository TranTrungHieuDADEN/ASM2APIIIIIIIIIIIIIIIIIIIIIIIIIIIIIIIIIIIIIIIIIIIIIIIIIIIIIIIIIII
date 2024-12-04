var express = require('express');
var router = express.Router();

var usermodel = require("../model/usermodel");
const JWT = require('jsonwebtoken');
const config = require("../ultil/tokenConFig");

//Đăng nhập
router.get("/all", async function(req, res) {
    var list = await userModel.find();
    res.json(list);
});

router.post("/login", async function(req, res) {
    try {
        const { name, password } = req.body;
        const checkUser = await userModel.findOne({ name: name, password: password });

        if (checkUser == null) {
            res.status(401).json({ status: false, message: "Đăng nhập không thành công" });
        } else {
            const token = JWT.sign({ name: name }, config.SECRETKEY, { expiresIn: '30s' });
            const refreshToken = JWT.sign({ name: name }, config.SECRETKEY, { expiresIn: '1d' });

            res.status(200).json({ status: true, message: "Đăng nhập thành công", token: token, refreshToken: refreshToken });
        }
    } catch (e) {
        res.status(500).json({ status: false, message: "Có lỗi xảy ra trên server" });
    }
});
module.exports = router;