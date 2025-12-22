const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoriesController");
// Middleware dosyanın adı categoryUpload ise doğru, değilse düzelt:
const upload = require("../middleware/categoryUpload"); 

// --- DİKKAT: Değişiklik Burada ---
// Araya 'upload.single' ekledik. Bu sayede resim işlenir ve req.body dolar.
router.post("/category", upload.single('categoryImage'), categoryController.create);

router.get("/category", categoryController.findAll);
router.get("/category/:id", categoryController.findOne);

// Güncelleme işlemine de ekleyelim, orada da resim değişebilir:
router.put("/category/:id", upload.single('categoryImage'), categoryController.update);

router.delete("/category/:id", categoryController.delete);

module.exports = router;