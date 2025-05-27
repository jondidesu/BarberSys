const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicoController');

const multer = require('multer');
const path = require('path');

// Configuração do multer para upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // pasta onde as imagens serão salvas
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, 'servico-' + uniqueSuffix);
  }
});

const upload = multer({ storage });

// Rotas sem repetir /servicos porque já vem do app.use('/servicos', ...)

router.post('/', upload.single('foto'), servicoController.criarServico);
router.get('/', servicoController.listarServicos);
router.put('/:id', upload.single('foto'), servicoController.atualizarServico);
router.delete('/:id', servicoController.deletarServico);

module.exports = router;
