var express = require('express');
var router = express.Router();
var product = require("../model/ProductModel");
const JWT = require('jsonwebtoken');
const config = require("../ultil/tokenConFig");



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



router.get("/sp-lon-hon-X", async function(req, res) {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, config.SECRETKEY, async function(err, id) {
                if (err) {
                    res.status(403).json({ "status": false, message: "có lỗi xảy ra" + err });
                } else {
                    const { soluong } = req.query;
                    var list = await product.find({ soluong: { $gt: Number(soluong) } });
                    res.status(200).json(list);
                }
            });
        } else {
            res.status(401).json({ "status": false, message: "có lỗi xảy ra" + err });
        }

    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
});


router.get("/sp-trong-khoang-gia", async function(req, res) {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, config.SECRETKEY, async function(err, id) {
                if (err) {
                    res.status(403).json({ "status": false, message: "có lỗi xảy ra" + err });
                } else {
                    const { min, max } = req.query;
                    var list = await product.find({ gia: { $gte: Number(min), $lte: Number(max) } });
                    res.status(200).json(list);
                }
            });
        } else {
            res.status(401).json({ "status": false, message: "có lỗi xảy ra" + err });
        }

    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
});


router.get("/so-sanh", async function(req, res) {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, config.SECRETKEY, async function(err, id) {
                if (err) {
                    res.status(403).json({ "status": false, message: "có lỗi xảy ra" + err });
                } else {
                    const { soluong, gia } = req.query;
                    var list = await product.find({ $or: [{ soluong: { $lt: Number(soluong) } }, { gia: { $gt: Number(gia) } }], });
                    res.status(200).json(list);
                }
            });
        } else {
            res.status(401).json({ "status": false, message: "có lỗi xảy ra" + err });
        }

    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
});


router.get("/chi-tiet-sp/:id", async function(req, res) {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, config.SECRETKEY, async function(err, id) {
                if (err) {
                    res.status(403).json({ "status": false, message: "có lỗi xảy ra" + err });
                } else {
                    const { id } = req.params;
                    var detail = await product.findById(id);
                    res.status(200).json(detail);
                }
            });
        } else {
            res.status(401).json({ "status": false, message: "có lỗi xảy ra" + err });
        }

    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
        s
    }
});


router.post("/add", async function(req, res) {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, config.SECRETKEY, async function(err, id) {
                if (err) {
                    res.status(403).json({ "status": false, message: "có lỗi xảy ra" + err });
                } else {
                    const { ten, gia, soluong } = req.body;
                    const newItem = { ten, gia, soluong };
                    await product.create(newItem);
                    res.status(200).json({ status: true, message: "Thành công" });
                }
            });
        } else {
            res.status(401).json({ "status": false, message: "có lỗi xảy ra" + err });
        }

    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
})


router.put("/edit/:id", async function(req, res) {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, config.SECRETKEY, async function(err, id) {
                if (err) {
                    res.status(403).json({ "status": false, message: "có lỗi xảy ra" + err });
                } else {
                    const { id, ten, gia, soluong } = req.body;
                    const findProduct = await product.findById(id);
                    if (findProduct) {
                        findProduct.ten = ten ? ten : findProduct.ten;
                        findProduct.gia = gia ? gia : findProduct.gia;
                        findProduct.soluong = soluong ? soluong : findProduct.soluong;
                        await findProduct.save();
                        res.status(200).json({ status: true, message: "Thành công" });
                    } else {
                        res.status(400).json({ status: false, message: "Không tìm thấy sp" });
                    }
                }
            });
        } else {
            res.status(401).json({ "status": false, message: "có lỗi xảy ra" + err });
        }

    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
})


router.delete("/delete/:id", async function(req, res) {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, config.SECRETKEY, async function(err, id) {
                if (err) {
                    res.status(403).json({ "status": false, message: "có lỗi xảy ra" + err });
                } else {
                    const { id } = req.params;
                    await product.findByIdAndDelete(id);
                    res.status(200).json({ status: true, message: "Thành công" });
                }
            });
        } else {
            res.status(401).json({ "status": false, message: "có lỗi xảy ra" + err });
        }

    } catch (e) {
        res.status(400).json({ status: false, message: "Có lỗi xảy ra" });
    }
});


module.exports = router;