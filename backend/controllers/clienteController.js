const Cliente = require('../models/clientes');

exports.criarCliente = async (req, res) => {
  try {
    const { nome, telefone } = req.body;

    const nomeValido = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nome);
    if (!nomeValido) {
      return res.status(400).json({ erro: 'Nome inválido. Use apenas letras e espaços.' });
    }

    const telefoneValido = /^(\d{2})9\d{8}$/.test(telefone);
    if (!telefoneValido) {
      return res.status(400).json({ erro: 'Telefone inválido. Use o formato DDD + 9 + número (ex: 11998765432).' });
    }

    const novoCliente = new Cliente({ nome, telefone });
    await novoCliente.save();
    res.status(201).json(novoCliente);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ erro: 'Telefone já está em uso.' });
    }
    res.status(400).json({ erro: err.message });
  }
};

exports.listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.atualizarCliente = async (req, res) => {
  try {
    const { telefone } = req.body;

    if (telefone && !/^(\d{2})9\d{8}$/.test(telefone)) {
      return res.status(400).json({ erro: 'Telefone inválido. Use o formato DDD + 9 + número (ex: 11998765432).' });
    }

    const clienteAtualizado = await Cliente.findOneAndUpdate(
      { id: req.params.id }, // <- usando o ID customizado
      req.body,
      { new: true }
    );

    if (!clienteAtualizado) {
      return res.status(404).json({ erro: 'Cliente não encontrado.' });
    }

    res.json(clienteAtualizado);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.deletarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findOneAndDelete({ id: req.params.id }); // <- usando o ID customizado
    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado.' });
    }
    res.json({ mensagem: 'Cliente deletado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
