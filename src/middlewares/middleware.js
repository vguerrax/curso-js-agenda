exports.middlewareGlobal = (req, res, next) => {
  res.locals.errorCode = 404;
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if(err && 'EBADCSRFTOKEN' === err.code) {
    res.locals.errorCode = err.code;
    return res.render('error');
  }
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.loginRequired = (req, res, next) => {
  if(!req.session.user) {
    req.flash('errors', 'Você precisa entrar para acessar esta funcionalidade.');
    req.session.save(() => res.redirect('/'));
    return;
  }
  next();
};
