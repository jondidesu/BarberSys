const mongoose = require('mongoose');

const profissionalSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  nome: { type: String, required: [true, 'Nome é obrigatório']  },
});

// Middleware para gerar ID numérico com 5 dígitos automaticamente
profissionalSchema.pre('save', async function (next) {
  if (!this.id) {
    const ultimaEntrada = await mongoose.model('Profissional').findOne().sort({ id: -1 });
    this.id = ultimaEntrada ? ultimaEntrada.id + 1 : 10000; // Começa em 10000
  }
  next();
});

const Profissional = mongoose.model('Profissional', profissionalSchema);
module.exports = Profissional;
