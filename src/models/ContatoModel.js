const mongoose = require('mongoose');
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: false, default: '' },
  phone: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: String, required: true }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
  }

  static async findById(id) {
    if (typeof id !== 'string') return;
    const contato = await ContatoModel.findById(id);
    return contato;
  }

  static async findAll(user) {
    if(!user) return [];
    const contatos = await ContatoModel.find({ createdBy: user._id })
      .sort({ createdAt: -1 });
    return contatos;
  }

  static async deleteById(id) {
    if (typeof id !== 'string') return;
    const contato = await ContatoModel.findByIdAndDelete(id);
    return contato;
  }

  async update(id) {
    if (typeof id !== 'string') return;

    this.valida();
    if (this.errors.length > 0) return;


    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
    return this.contato;
  }

  async register(user) {
    this.valida();
    if (this.errors.length > 0) return;

    this.body.createdBy = user._id;
    this.contato = await ContatoModel.create(this.body);
  }

  valida() {
    this.cleanUp();
    //Validação
    //nome é obrigatório
    if (!this.body.name) this.errors.push('Nome deve ser preenchido.')
    //email valido
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido.')
    //Telefone ou email precisam ser preenchidos
    if (!this.body.phone && !this.body.email) this.errors.push('Você deve informar ao menos um telefone ou email.')
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') this.body[key] = '';
    }

    this.body = {
      name: this.body.name,
      lastName: this.body.lastName,
      phone: this.body.phone,
      email: this.body.email
    }
  }

}

module.exports = Contato;
