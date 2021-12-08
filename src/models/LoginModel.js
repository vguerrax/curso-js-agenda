const mongoose = require('mongoose');
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.use
  }
  async login() {
    this.validaLogin();
    if (this.errors.length > 0) return;

    const userExists = await this.userExists();
    if (!userExists) {
      this.errors.push('Usuário não encontrado.')
      return;
    }

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha inválida.')
      this.user = null;
      return;
    }
  }

  async register() {
    this.valida();
    if (this.errors.length > 0) return;

    const userExists = await this.userExists();
    if (userExists) {
      this.errors.push('Usuário já existe.')
      return;
    }

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);
    delete this.body.confirmPassword;

    this.user = await LoginModel.create(this.body);
  }

  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email });
    return (this.user);
  }

  valida() {
    this.cleanUp();
    //Validação
    //nome deve ser preenchido
    if(!this.body.name) this.errors.push('O nome deve ser preenchido.')
    //email valido
    if (!validator.isEmail(this.body.email)) this.errors.push('Email inválido.')

    //senha entre 6 e 10 caracteres
    if (this.body.password.length < 6 || this.body.password.length > 10) this.errors.push('A senha deve ter entre 6 e 10 caracteres.')

    //senha e confirmaSenha devem ser iguais
    if (this.body.confirmPassword) {
      if (this.body.password !== this.body.confirmPassword) this.errors.push('A senha e a confirmação de senha não conferem.')
    }
  }

  validaLogin() {
    this.cleanUp();
    //Validação
    //email valido
    if (!validator.isEmail(this.body.email)) this.errors.push('Email inválido.')
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') this.body[key] = '';
    }

    this.body = {
      name: this.body.name,
      email: this.body.email,
      password: this.body.password,
      confirmPassword: this.body.confirmPassword
    }
  }
}

module.exports = Login;
