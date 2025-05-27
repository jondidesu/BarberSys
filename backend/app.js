const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


// Rotas
const servicosRoutes = require('./routes/servicos');
const produtosRoutes = require('./routes/produto');
const clientesRoutes = require('./routes/cliente');
const profissionaisRoutes = require('./routes/profissional');
const agendamentosRoutes = require('./routes/agendamento');
const adminRoutes = require('./routes/admin');


app.use('/servicos', servicosRoutes);
app.use('/produtos', produtosRoutes);
app.use('/clientes', clientesRoutes);
app.use('/profissionais', profissionaisRoutes);
app.use('/agendamentos', agendamentosRoutes);
app.use('/admin', adminRoutes);


module.exports = app;
