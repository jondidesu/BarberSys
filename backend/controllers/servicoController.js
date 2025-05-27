const Servico = require('../models/servicos');
const fs = require('fs');
const path = require('path');

exports.criarServico = async (req, res) => {
  try {
    const dadosServico = req.body;

    // Garantir que duracao seja number
    if (dadosServico.duracao) {
      dadosServico.duracao = Number(dadosServico.duracao);
      if (isNaN(dadosServico.duracao)) {
        return res.status(400).json({ erro: "Duração inválida" });
      }
    }

    if (req.file) {
      dadosServico.fotoUrl = `/uploads/${req.file.filename}`;
    }

    const novoServico = new Servico(dadosServico);
    await novoServico.save();

    res.status(201).json(novoServico);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.listarServicos = async (req, res) => {
  try {
    const servicos = await Servico.find();
    res.json(servicos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.atualizarServico = async (req, res) => {
  try {
    // Verifica se o serviço existe
    const servico = await Servico.findOne({ id: req.params.id });
    if (!servico) {
      return res.status(404).json({ erro: 'Serviço não encontrado' });
    }

    // Verifica e converte duração, se fornecida
    if ('duracao' in req.body) {
      req.body.duracao = Number(req.body.duracao);
      if (isNaN(req.body.duracao)) {
        return res.status(400).json({ erro: "Duração inválida" });
      }
    }

    // Se nova imagem for enviada
    if (req.file) {
      // Remove imagem antiga se existir
      if (servico.fotoUrl) {
        const caminhoAntigo = path.join(__dirname, '..', servico.fotoUrl);
        fs.unlink(caminhoAntigo, (err) => {
          if (err) console.warn('Erro ao apagar imagem antiga:', err.message);
        });
      }

      // Atualiza o caminho da nova imagem
      req.body.fotoUrl = `/uploads/${req.file.filename}`;
    }

    // Atualiza com os dados do body (incluindo possivelmente a nova foto)
    const servicoAtualizado = await Servico.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );

    res.json(servicoAtualizado);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};


exports.deletarServico = async (req, res) => {
  try {
    const servico = await Servico.findOne({ id: req.params.id });
    if (!servico) return res.status(404).json({ error: 'Serviço não encontrado' });

    if (servico.fotoUrl) {
      const nomeArquivo = servico.fotoUrl.replace('/uploads/', '');
      const caminhoFoto = path.join(__dirname, '..', 'uploads', nomeArquivo);

      fs.unlink(caminhoFoto, (err) => {
        if (err) console.warn('Erro ao remover imagem:', err.message);
      });
    }

    await Servico.deleteOne({ id: req.params.id });
    res.json({ message: 'Serviço deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar serviço' });
  }
};
