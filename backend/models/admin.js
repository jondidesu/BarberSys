const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const adminSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
    minlength: [10, 'O nome deve ter no mínimo 10 caracteres']
  },
  telefone: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        // DDD 2 dígitos + 9 + 8 dígitos
        return /^(\d{2})9\d{8}$/.test(v);
      },
      message: props => `${props.value} não é um número de celular válido no formato brasileiro`
    }
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} não é um email válido`
    }
  },
  senha: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    validate: {
      validator: function (v) {
        return v.length >= 8;
      },
      message: 'A senha deve ter no mínimo 8 caracteres'
    }
  }
});


// Hash da senha antes de salvar
adminSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
