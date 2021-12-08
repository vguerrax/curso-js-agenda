const Contato = require('../models/ContatoModel')

exports.index = async (req, res) => {
  const contatos = await Contato.findAll(req.session.user);
  res.render('index', { contatos });
};
