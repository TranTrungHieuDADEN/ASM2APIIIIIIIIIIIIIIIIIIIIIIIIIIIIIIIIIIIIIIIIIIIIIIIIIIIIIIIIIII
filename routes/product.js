var express = require('express');
var router = express.Router();
var product = require("../model/ProductModel");
const JWT = require('jsonwebtoken');
const config = require("../ultil/tokenConFig");

// Lấy tất cả sản phẩm
router.get("/all", async function(req, res) {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, config.SECRETKEY, async function(err, id) {
                if (err) {
                    res.status(403).json({ "status": false, message: "Có lỗi xảy ra: " + err });
                } else {
                    var list = await product.find();
                    res.status(200).json({
                        status: true,
                        message: "Thành công",
                        data: list
                    });
                }
            });
        } else {
            res.status(401).json({ "status": false, message: "Có lỗi xảy ra: Không tìm thấy token" });
        }
    } catch (e) {
        res.status(400).json({ status: false, message: "Không xác thực" });
    }
});

// Thêm sản phẩm
router.post("/add", async function(req, res) {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, config.SECRETKEY, async function(err, id) {
                if (err) {
                    res.status(403).json({ "status": false, message: "Có lỗi xảy ra: " + err });
                } else {
                    const { masp, tensp, gia, soluong } = req.body;
                    const newItem = { masp, tensp, gia, soluong };
                    await product.create(newItem);
                    res.status(200).json({ status: true, message: "Thêm sản phẩm thành công" });
                }
            });
        } else {
            res.status(401).json({ "status": false, message: "Không tìm thấy token" });
        }
    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
});

// Sửa sản phẩm
// Sửa sản phẩm
router.put('/:id', async(req, res) => {
    try {
        const updatedproduct = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedproduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Xóa sản phẩm
router.delete("/delete/:id", async function(req, res) {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, config.SECRETKEY, async function(err, id) {
                if (err) {
                    res.status(403).json({ "status": false, message: "Có lỗi xảy ra: " + err });
                } else {
                    const { id } = req.params;
                    const deletedProduct = await product.findByIdAndDelete(id);

                    if (deletedProduct) {
                        res.status(200).json({ status: true, message: "Xóa sản phẩm thành công" });
                    } else {
                        res.status(404).json({ status: false, message: "Không tìm thấy sản phẩm để xóa" });
                    }
                }
            });
        } else {
            res.status(401).json({ "status": false, message: "Không tìm thấy token" });
        }
    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
});

module.exports = router;