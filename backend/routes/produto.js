const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const multer = require('multer');
const path = require('path');

// Configuração do multer para upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // pasta onde as imagens serão salvas
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, 'produto-' + uniqueSuffix);
  }
});

const upload = multer({ storage });

// Rota para criar produto com upload de foto
router.post('/produtos', upload.single('foto'), produtoController.criarProduto);

router.get('/produtos', produtoController.listarProdutos);
router.put('/produtos/:id', upload.single('foto'), produtoController.atualizarProduto);
router.delete('/produtos/:id', produtoController.deletarProduto);

module.exports = router;
