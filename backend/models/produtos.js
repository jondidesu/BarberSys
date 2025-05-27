const mongoose = require('mongoose');
const Counter = require('./counter');

const produtoSchema = new mongoose.Schema({
  id: { type: String, unique: true }, // ID sequencial com 5 dígitos
  nome: { type: String, required: true },
  preco: { type: Number, required: true },
  descricao: String,
  fotoUrl: String,  // adiciona aqui
});
// Middleware para gerar ID sequencial antes de salvar
produtoSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { model: 'Produto' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq.toString().padStart(5, '0'); // Ex: 00001
  }
  next();
});

produtoSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;   // só remove o __v
    return ret;
  }
});

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto;
