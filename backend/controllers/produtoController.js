const Produto = require('../models/produtos');
const fs = require('fs');
const path = require('path');

exports.criarProduto = async (req, res) => {
  try {
    // Pega dados do body (nome, preco, etc)
    const dadosProduto = req.body;

    // Se enviou foto, adiciona o caminho dela
    if (req.file) {
      dadosProduto.fotoUrl = `/uploads/${req.file.filename}`;
    }

    const novoProduto = new Produto(dadosProduto);
    await novoProduto.save();
    res.status(201).json(novoProduto);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};


exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.atualizarProduto = async (req, res) => {
  try {
    const produto = await Produto.findOne({ id: req.params.id });
    if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });

    // Se veio nova imagem, deleta a antiga e atualiza o caminho
    if (req.file) {
      // Remove imagem antiga se existir
      if (produto.fotoUrl) {
        const caminhoAntigo = path.join(__dirname, '..', produto.fotoUrl);
        fs.unlink(caminhoAntigo, (err) => {
          if (err) console.warn('Erro ao apagar imagem antiga:', err.message);
        });
      }

      req.body.fotoUrl = `/uploads/${req.file.filename}`;
    }

    const produtoAtualizado = await Produto.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );

    res.json(produtoAtualizado);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};




exports.deletarProduto = async (req, res) => {
  try {
    const produto = await Produto.findOne({ id: req.params.id });
    if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });

    // Apaga foto, se existir
    if (produto.fotoUrl) {
      const caminhoFoto = path.join(__dirname, '..', produto.fotoUrl);
      fs.unlink(caminhoFoto, (err) => {
        if (err) console.warn('Erro ao apagar foto:', err.message);
      });
    }

    // Deleta usando o campo customizado 'id'
    await Produto.deleteOne({ id: req.params.id });
    res.json({ mensagem: 'Produto deletado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

