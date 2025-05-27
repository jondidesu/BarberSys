const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createAdmin = async (req, res) => {
  try {
    const { nome, telefone, email, senha } = req.body;

    // Validação de email
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      return res.status(400).json({ error: 'Email inválido.' });
    }
// Validação de telefone brasileiro (DDD 2 dígitos + 9 + 8 dígitos)
const telefoneValido = /^\d{2}9\d{8}$/.test(telefone);
if (!telefoneValido) {
  return res.status(400).json({ error: 'Telefone inválido. Deve conter DDD (2 dígitos) + 9 + 8 dígitos.' });
}

// Validação de senha (mínimo 8 caracteres)
if (senha.length < 8) {
  return res.status(400).json({ error: 'A senha deve ter no mínimo 8 caracteres.' });
}


    const novoAdmin = new Admin({
      nome,
      telefone,
      email,
      senha, // bcrypt será aplicado no pre('save') do schema
    });

    await novoAdmin.save();
    res.status(201).json({ message: 'Admin criado com sucesso!' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email já está em uso.' });
    }
    res.status(500).json({ error: 'Erro ao criar admin' });
  }
};

// Login de admin
exports.loginAdmin = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: 'Admin não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, admin.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, adminId: admin._id, nome: admin.nome });
  } catch (error) {
    res.status(500).json({ error: 'Erro no login' });
  }
};

// Lista todos os admins (sem a senha)
exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-senha');
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar admins' });
  }
};

// Deletar admin pelo ID
exports.deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    await Admin.findByIdAndDelete(adminId);
    res.json({ message: 'Admin deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar admin' });
  }
};
