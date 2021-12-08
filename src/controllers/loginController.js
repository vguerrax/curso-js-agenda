
const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    if (req.session.user) return res.render('login-logado')
    return res.render('login')
};

exports.register = async (req, res) => {
    const login = new Login(req.body);

    try {
        const login = new Login(req.body);
        await login.register();
    
        if(login.errors.length > 0) {
          req.flash('errors', login.errors);
          req.session.save(function() {
            return res.redirect('back');
          });
          return;
        }
    
        req.flash('success', 'Seu usuário foi criado com sucesso.');
        
        req.session.save(function() {
          return res.redirect('back');
        });
      } catch(e) {
        console.log(e);
        return res.render('error');
      }
};

exports.login = async (req, res) => {
    const login = new Login(req.body);

    try {
        const login = new Login(req.body);
        await login.login();
    
        if(login.errors.length > 0) {
          req.flash('errors', login.errors);
          req.session.save(function() {
            return res.redirect('back');
          });
          return;
        }
    
        req.session.user = login.user;
        req.flash('success', 'Você entrou com sucesso no sistema.');
        req.session.save(function() {
          return res.redirect('/');
        });
      } catch(e) {
        console.log(e);
        return res.render('error');
      }
};

exports.logout = (req, res) => {
    req.flash('success', 'Você saiu com sucesso do sistema.');
    req.session.destroy();
    return res.redirect('/');
}
