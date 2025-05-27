const mongoose = require('mongoose');

const agendamentoSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  servicos: [ // array de serviços
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Servico',
      required: true
    }
  ],
  profissional: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profissional',
    required: true
  },
  data: {
    type: Date,
    required: true
  },
  horario: {
    type: String, // Ex: "14:30"
    required: true
  },
  status: {
    type: String,
    enum: ['pendente', 'confirmado', 'concluído', 'cancelado'],
    default: 'pendente'
  }
});

const Agendamento = mongoose.model('Agendamento', agendamentoSchema);
module.exports = Agendamento;
