const router = require('express').Router();
const multer = require('multer');
const TesseractController = require('../adapters/controllers/tesseractController');

const upload = multer({ dest: 'uploads/' });
const tesseractController = new TesseractController();

router.post('/processar-imagem', upload.single('imagem'), tesseractController.processarImagem);

module.exports = router;
