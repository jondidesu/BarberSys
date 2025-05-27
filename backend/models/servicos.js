const mongoose = require('mongoose');
const Counter = require('./counter');

const servicoSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  nome: { type: String, required: true },
  preco: { type: Number, required: true },
  duracao: { type: Number, required: true },
  descricao: String,
   fotoUrl: String, // campo para guardar o caminho da imagem
});

// Middleware antes de salvar: gera o id sequencial
servicoSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { model: 'Servico' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq.toString().padStart(5, '0'); // Ex: 00001
  }
  next();
});

// Configuração para transformar o JSON retornado
servicoSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;   // só remove o __v
    return ret;
  }
});


const Servico = mongoose.model('Servico', servicoSchema);

module.exports = Servico;
