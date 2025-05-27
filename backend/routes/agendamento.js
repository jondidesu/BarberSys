const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');

// Criar um novo agendamento
router.post('/agendamentos', agendamentoController.criarAgendamento);

// Listar todos os agendamentos
router.get('/agendamentos', agendamentoController.listarAgendamentos);

// Atualizar um agendamento existente
router.put('/agendamentos/:id', agendamentoController.atualizarAgendamento);

// Deletar um agendamento
router.delete('/agendamentos/:id', agendamentoController.deletarAgendamento);

// Listar horários disponíveis para agendamento
router.get('/horarios', agendamentoController.listarHorariosDisponiveis);

// Rota para listar serviços agendados por data
router.get('/servicos-por-data', agendamentoController.listarAgendamentosPorData);
router.get('/agendamentos-por-hora', agendamentoController.listarAgendamentosPorHora);


module.exports = router;


module.exports = router;
