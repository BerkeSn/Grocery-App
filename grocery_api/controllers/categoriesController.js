const categoryService = require("../services/categoryService");
// const upload = ... (Burada upload çağırmana gerek yok, router'da hallettik)

exports.create = (req, res, next) => {
    var path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

    var model = {
        categoryName: req.body.categoryName,
        categoryDescription: req.body.categoryDescription,
        categoryImage: path != "" ? "/" + path : "",
    };

    categoryService.createCategory(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });
};

exports.findAll = (req, res, next) => {
    var model = {
        categoryName: req.query.categoryName,
        pageSize: req.query.pageSize,
        page: req.query.page,
    };

    // DÜZELTİLEN KISIM BURASI:
    // Eskisi: categoryService.createCategory(...) 
    // Yenisi: categoryService.getCategories(...) 
    // (Service dosyasındaki fonksiyonun adı 'getCategories' varsayıyorum)
    categoryService.getCategories(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });
};

exports.findOne = (req, res, next) => {
    var model = {
        categoryId: req.params.id,
    };

    categoryService.getCategoryById(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });
};

exports.update = (req, res, next) => {
    // BURAYI DA DÜZELTTİK:
    // Upload wrapper'ı kaldırdık ve path değişkenini dışarı aldık.
    
    var path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

    var model = {
        categoryId: req.params.id,
        categoryName: req.body.categoryName,
        categoryDescription: req.body.categoryDescription,
        categoryImage: path != "" ? "/" + path : "",
    };

    categoryService.updateCategory(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });
};

exports.delete = (req, res, next) => {
    var model = {
        categoryId: req.params.id,
    };

    categoryService.deleteCategory(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });
};