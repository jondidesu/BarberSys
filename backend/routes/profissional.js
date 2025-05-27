const express = require('express');
const router = express.Router();
const profissionalController = require('../controllers/profissionalController');

router.post('/profissionais', profissionalController.criarProfissional);
router.get('/profissionais', profissionalController.listarProfissionais);
router.put('/profissionais/:id', profissionalController.atualizarProfissional);
router.delete('/profissionais/:id', profissionalController.deletarProfissional);

module.exports = router;
