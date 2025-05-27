const mongoose = require('mongoose');
const Counter = require('./counter'); // certifique-se de já ter esse modelo criado

const clienteSchema = new mongoose.Schema({
  id: { type: String, unique: true },

  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    validate: {
      validator: function (v) {
        return /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(v);
      },
      message: props => `${props.value} Contém caracteres inválidos. O nome deve conter apenas letras e espaços.`
    }
  },

  telefone: { 
    type: String, 
    unique: true, 
    required: [true, 'Telefone é obrigatório'],
    validate: {
      validator: function (v) {
        return /^(\d{2})9\d{8}$/.test(v);
      },
      message: props => `${props.value} Não é um número de telefone válido. Use o formato DDD + 9 + número (ex: 11998765432).`
    }
  }
});

// Middleware para gerar id sequencial
clienteSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { model: 'Cliente' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq.toString().padStart(5, '0'); // Ex: 00001
  }
  next();
});

// Remove __v na resposta
clienteSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
