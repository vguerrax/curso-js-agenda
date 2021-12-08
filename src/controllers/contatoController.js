const Contato = require('../models/ContatoModel')

exports.index = (req, res) => {
  return res.render('contato', { contato: {} })
};

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register(req.session.user);
    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Contato cadastrado com sucesso.');
    req.session.save(() => res.redirect('/'));
    return;
  } catch (e) {
    return res.render('error');
  }
};

exports.editIndex = async (req, res) => {
  if (!req.params.id) return res.render('error');

  const contato = await Contato.findById(req.params.id);

  if (!contato) return res.render('error');


  res.render('contato', { contato });
};

exports.edit = async (req, res) => {
  if (!req.params.id) return res.render('error');
  try {
    const contato = new Contato(req.body);
    await contato.update(req.params.id);
    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Contato editado com sucesso.');
    req.session.save(() => res.redirect('/'));
    return;
  } catch (e) {
    return res.render('error');
  }
};

exports.delete = async (req, res) => {


  if (!req.params.id) return res.render('error');

  const contato = await Contato.deleteById(req.params.id);

  if (!contato) return res.render('error');


  req.flash('success', 'Contato excluído com sucesso.');
  req.session.save(() => res.redirect('/'));
  return;
};
