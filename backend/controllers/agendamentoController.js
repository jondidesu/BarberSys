const Agendamento = require('../models/agendamento');
const Servico = require('../models/servicos');

// Função para converter string "HH:mm" para minutos do dia
function horarioParaMinutos(horario) {
  const [h, m] = horario.split(':').map(Number);
  return h * 60 + m;
}

// Função para converter minutos do dia para string "HH:mm"
function minutosParaHorario(minutos) {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

// Horários de expediente
const horariosTrabalho = {
  0: { inicio: '08:00', fim: '12:00' }, // Domingo
  1: { inicio: '17:30', fim: '20:00' }, // Segunda
  2: { inicio: '17:30', fim: '20:00' }, // Terça
  3: { inicio: '17:30', fim: '20:00' }, // Quarta
  4: { inicio: '17:30', fim: '20:00' }, // Quinta
  5: { inicio: '17:30', fim: '20:00' }, // Sexta
  6: { inicio: '14:00', fim: '20:00' }  // Sábado
};

// Criar agendamento
// Criar agendamento
exports.criarAgendamento = async (req, res) => {
  try {
    const { cliente, profissional, data, horario, servicos } = req.body;

    if (!cliente || !profissional || !data || !horario || !Array.isArray(servicos) || servicos.length === 0) {
      return res.status(400).json({ erro: 'Dados incompletos para agendamento' });
    }

    // Validação de serviços
    const servicosObj = await Servico.find({ _id: { $in: servicos } });
    if (servicosObj.length !== servicos.length) {
      return res.status(400).json({ erro: 'Algum serviço informado não existe' });
    }

    // Cálculo de duração total
    const duracaoTotal = servicosObj.reduce((acc, s) => acc + (s.duracao || 0), 0);
    if (duracaoTotal <= 0) {
      return res.status(400).json({ erro: 'Duração total inválida' });
    }

    // Corrigir fuso horário: garantir data local sem UTC
    const [ano, mes, dia] = data.split('-').map(Number);
    const dataObj = new Date(ano, mes - 1, dia); // cria no horário local

    const diaSemana = dataObj.getDay();
    const horarioInicio = horarioParaMinutos(horario);
    const horarioFim = horarioInicio + duracaoTotal;

    if (!horariosTrabalho[diaSemana]) {
      return res.status(400).json({ erro: 'Profissional não trabalha neste dia' });
    }

    const inicioExpediente = horarioParaMinutos(horariosTrabalho[diaSemana].inicio);
    const fimExpediente = horarioParaMinutos(horariosTrabalho[diaSemana].fim);

    if (horarioInicio < inicioExpediente || horarioFim > fimExpediente) {
      return res.status(400).json({ erro: 'Horário fora do expediente do profissional' });
    }

    // Criar limites de busca do dia (início e fim em horário local)
    const inicioDia = new Date(ano, mes - 1, dia, 0, 0, 0);
    const fimDia = new Date(ano, mes - 1, dia, 23, 59, 59, 999);

    // Buscar agendamentos do dia
    const agendamentosDoDia = await Agendamento.find({
      profissional,
      data: { $gte: inicioDia, $lte: fimDia },
      status: { $in: ['pendente', 'confirmado'] }
    }).populate('servicos', 'duracao');

    // Verificação de conflitos
    for (const agendamento of agendamentosDoDia) {
      const agInicio = horarioParaMinutos(agendamento.horario);
      const agDuracao = agendamento.servicos.reduce((acc, s) => acc + (s.duracao || 0), 0);
      const agFim = agInicio + agDuracao;

      if (horarioInicio < agFim && agInicio < horarioFim) {
        return res.status(400).json({ erro: 'Horário já reservado para outro agendamento' });
      }
    }

    // Criar e salvar agendamento
    const novoAgendamento = new Agendamento({
      cliente,
      profissional,
      data: dataObj,
      horario,
      servicos,
      status: 'pendente'
    });

    await novoAgendamento.save();
    res.status(201).json(novoAgendamento);

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


// Listar horários disponíveis
exports.listarHorariosDisponiveis = async (req, res) => {
  try {
    const { profissionalId, data, servicosIds } = req.query;

    if (!profissionalId || !data || !servicosIds) {
      return res.status(400).json({ erro: 'Faltam parâmetros obrigatórios' });
    }

    const servicosArray = servicosIds.split(',');
    const servicos = await Servico.find({ _id: { $in: servicosArray } });

    if (servicos.length === 0) {
      return res.status(400).json({ erro: 'Nenhum serviço válido encontrado' });
    }

    const duracaoTotal = servicos.reduce((acc, s) => acc + (s.duracao || 0), 0);
    if (duracaoTotal <= 0) {
      return res.status(400).json({ erro: 'Duração total inválida' });
    }

    const dataObj = new Date(data);
    const diaSemana = dataObj.getDay();

    if (!horariosTrabalho[diaSemana]) {
      return res.status(400).json({ erro: 'Profissional não trabalha neste dia' });
    }

    const inicioExpediente = horarioParaMinutos(horariosTrabalho[diaSemana].inicio);
    const fimExpediente = horarioParaMinutos(horariosTrabalho[diaSemana].fim);

    const agendamentos = await Agendamento.find({
      profissional: profissionalId,
      data: {
        $gte: new Date(dataObj.setHours(0, 0, 0, 0)),
        $lt: new Date(dataObj.setHours(23, 59, 59, 999))
      },
      status: { $in: ['pendente', 'confirmado'] }
    }).populate('servicos', 'duracao');

    const intervalosOcupados = agendamentos.map(ag => {
      const inicio = horarioParaMinutos(ag.horario);
      const duracao = ag.servicos.reduce((acc, s) => acc + (s.duracao || 0), 0);
      return [inicio, inicio + duracao];
    });

    const estaDisponivel = (inicio) => {
      return !intervalosOcupados.some(([ocInicio, ocFim]) =>
        inicio < ocFim && ocInicio < inicio + duracaoTotal
      );
    };

    const horariosDisponiveis = [];
    for (let minuto = inicioExpediente; minuto + duracaoTotal <= fimExpediente; minuto += 10) {
      if (estaDisponivel(minuto)) {
        horariosDisponiveis.push(minutosParaHorario(minuto));
      }
    }

    res.json({ horariosDisponiveis });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Listar agendamentos
exports.listarAgendamentos = async (req, res) => {
  try {
    const { profissional, cliente, data } = req.query;
    const filtro = {};

    if (profissional) filtro.profissional = profissional;
    if (cliente) filtro.cliente = cliente;
    if (data) {
      const dataObj = new Date(data);
      filtro.data = {
        $gte: new Date(dataObj.setHours(0, 0, 0, 0)),
        $lt: new Date(dataObj.setHours(23, 59, 59, 999))
      };
    }

    const agendamentos = await Agendamento.find(filtro)
      .populate('cliente', 'nome')
      .populate('profissional', 'nome')
      .populate('servicos', 'nome duracao')
      .sort({ data: 1, horario: 1 });

    res.json(agendamentos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Deletar agendamento por ID
exports.deletarAgendamento = async (req, res) => {
  try {
    const { id } = req.params;

    const agendamento = await Agendamento.findByIdAndDelete(id);

    if (!agendamento) {
      return res.status(404).json({ erro: 'Agendamento não encontrado' });
    }

    res.json({ mensagem: 'Agendamento deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.atualizarAgendamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { cliente, profissional, data, horario, servicos, status } = req.body;

    // Buscar agendamento existente
    const agendamento = await Agendamento.findById(id).populate('servicos', 'duracao');
    if (!agendamento) {
      return res.status(404).json({ erro: 'Agendamento não encontrado' });
    }

    // Usar valores atuais se não forem atualizados
    const novoCliente = cliente || agendamento.cliente;
    const novoProfissional = profissional || agendamento.profissional;
    const novaData = data ? new Date(data) : agendamento.data;
    const novoHorario = horario || agendamento.horario;
    const novosServicosIds = servicos && servicos.length > 0 ? servicos : agendamento.servicos.map(s => s._id);

    // Buscar objetos dos serviços atualizados
    const servicosObj = await Servico.find({ _id: { $in: novosServicosIds } });
    if (servicosObj.length !== novosServicosIds.length) {
      return res.status(400).json({ erro: 'Algum serviço informado não existe' });
    }

    // Calcular duração total
    const duracaoTotal = servicosObj.reduce((acc, s) => acc + (s.duracao || 0), 0);
    if (duracaoTotal <= 0) {
      return res.status(400).json({ erro: 'Duração total inválida' });
    }

    // Validar expediente do profissional
    const diaSemana = novaData.getDay();

    if (!horariosTrabalho[diaSemana]) {
      return res.status(400).json({ erro: 'Profissional não trabalha neste dia' });
    }

    const horarioParaMinutos = (h) => {
      const [hh, mm] = h.split(':').map(Number);
      return hh * 60 + mm;
    };
    const minutosParaHorario = (min) => {
      const hh = Math.floor(min / 60);
      const mm = min % 60;
      return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`;
    };

    const inicioExpediente = horarioParaMinutos(horariosTrabalho[diaSemana].inicio);
    const fimExpediente = horarioParaMinutos(horariosTrabalho[diaSemana].fim);

    const horarioInicio = horarioParaMinutos(novoHorario);
    const horarioFim = horarioInicio + duracaoTotal;

    if (horarioInicio < inicioExpediente || horarioFim > fimExpediente) {
      return res.status(400).json({ erro: 'Horário fora do expediente do profissional' });
    }

    // Validar conflitos com outros agendamentos
    const inicioDia = new Date(novaData.setHours(0, 0, 0, 0));
    const fimDia = new Date(novaData.setHours(23, 59, 59, 999));

    const agendamentosDoDia = await Agendamento.find({
      _id: { $ne: id }, // Excluir o próprio agendamento que está sendo atualizado
      profissional: novoProfissional,
      data: { $gte: inicioDia, $lt: fimDia },
      status: { $in: ['pendente', 'confirmado'] }
    }).populate('servicos', 'duracao');

    for (const ag of agendamentosDoDia) {
      const agInicio = horarioParaMinutos(ag.horario);
      const agDuracao = ag.servicos.reduce((acc, s) => acc + (s.duracao || 0), 0);
      const agFim = agInicio + agDuracao;

      if (horarioInicio < agFim && agInicio < horarioFim) {
        return res.status(400).json({ erro: 'Horário já reservado para outro agendamento' });
      }
    }

    // Atualizar campos
    agendamento.cliente = novoCliente;
    agendamento.profissional = novoProfissional;
    agendamento.data = novaData;
    agendamento.horario = novoHorario;
    agendamento.servicos = novosServicosIds;
    if (status) agendamento.status = status;

    await agendamento.save();

    res.json(agendamento);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.listarAgendamentosPorData = async (req, res) => {
  try {
    const { data } = req.query;
    if (!data) {
      return res.status(400).json({ erro: 'Data é obrigatória' });
    }

    // Converte a data para objeto Date e zera horário
    const dataObj = new Date(data);
    dataObj.setHours(0, 0, 0, 0);

    // Define intervalo do dia
    const inicioDia = new Date(dataObj);
    const fimDia = new Date(dataObj);
    fimDia.setHours(23, 59, 59, 999);

    // Busca agendamentos nesse intervalo, status pendente ou confirmado
    const agendamentos = await Agendamento.find({
      data: { $gte: inicioDia, $lt: fimDia },
      status: { $in: ['pendente', 'confirmado'] }
    })
    .populate('cliente', 'nome')
    .populate('profissional', 'nome')
    .populate('servicos', 'nome duracao');

    res.json(agendamentos);

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


exports.listarAgendamentosPorHora = async (req, res) => {
  try {
    const { data, profissional } = req.query;

    if (!data) {
      return res.status(400).json({ erro: 'Data é obrigatória' });
    }

    // Converter "2025-12-24" para data local sem fuso horário
    const [ano, mes, dia] = data.split('-');
    const inicioDia = new Date(ano, mes - 1, dia, 0, 0, 0);
    const fimDia = new Date(ano, mes - 1, dia, 23, 59, 59, 999);

    // Filtro base
    const filtro = {
      data: { $gte: inicioDia, $lte: fimDia },
      status: { $in: ['pendente', 'confirmado'] }
    };

    // Filtro opcional por profissional
    if (profissional) {
      filtro.profissional = profissional;
    }

    // Buscar agendamentos com populates
    const agendamentos = await Agendamento.find(filtro)
      .populate('cliente', 'nome')
      .populate('servicos', 'nome duracao')
      .sort({ horario: 1 });

    // Agrupar por horário
    const agrupadosPorHora = {};
    agendamentos.forEach(ag => {
      if (!agrupadosPorHora[ag.horario]) {
        agrupadosPorHora[ag.horario] = [];
      }
      agrupadosPorHora[ag.horario].push(ag);
    });

    res.json(agrupadosPorHora);

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

  


