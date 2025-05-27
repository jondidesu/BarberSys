const Profissional = require('../models/profissionais');

exports.criarProfissional = async (req, res) => {
  try {
    const novoProfissional = new Profissional(req.body);
    await novoProfissional.save();
    res.status(201).json(novoProfissional);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.listarProfissionais = async (req, res) => {
  try {
    const profissionais = await Profissional.find();
    res.json(profissionais);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.atualizarProfissional = async (req, res) => {
  try {
    const profissionalAtualizado = await Profissional.findOneAndUpdate(
      { id: req.params.id },  // busca pelo campo customizado 'id'
      req.body,
      { new: true }
    );
    if (!profissionalAtualizado) {
      return res.status(404).json({ erro: 'Profissional não encontrado' });
    }
    res.json(profissionalAtualizado);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.deletarProfissional = async (req, res) => {
  try {
    const resultado = await Profissional.deleteOne({ id: req.params.id });
    if (resultado.deletedCount === 0) {
      return res.status(404).json({ erro: 'Profissional não encontrado' });
    }
    res.json({ mensagem: 'Profissional deletado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
