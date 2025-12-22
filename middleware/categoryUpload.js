const multer = require('multer');
const Path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        // DİKKAT: Ana dizinde 'uploads' klasörünün içinde 'categories' 
        // diye bir klasör olduğundan emin ol. Yoksa hata verir!
        // Eğer yoksa şimdilik sadece "./uploads" yapabilirsin.
        cb(null, "./uploads/categories");
    },
    filename: function(req, file, cb){
        // Windows uyumu için dosya adındaki boşlukları temizledim
        cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, '-'));
    }
});

const fileFilter = (req, file, cb) => {
    const acceptableExt = ["png", "jpg", "jpeg"];
    if(!acceptableExt.includes(file.mimetype.split("/")[1])){
        return cb(new Error("Only .png, .jpg and .jpeg format allowed!"), false);
    }
    cb(null, true);
}

let upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    // DİKKAT: fileSize limiti 'limits' objesi içinde olmalı
    limits: {
        fileSize: 1048576 // 1 MB
    }
});

// --- DÜZELTİLEN KISIM BURASI ---
// Eskisi: module.exports = upload.single("categoryImage"); 
// Yenisi: Sadece 'upload' nesnesini dışarı atıyoruz.
module.exports = upload;