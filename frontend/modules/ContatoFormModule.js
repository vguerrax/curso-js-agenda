import validator from 'validator';
import Form from './FormModule'

export default class ContatoForm extends Form {
    constructor(formSelector) {
        super(formSelector);
    }

    init() {
        this.events(this.validate);
    }

    validate(e) {
        const el = e.target;
        const nameInput = el.querySelector('input[name="name"]');
        const lastNameInput = el.querySelector('input[name="lastName"]');
        const phoneInput = el.querySelector('input[name="phone"]');
        const emailInput = el.querySelector('input[name="email"]');
        const errors = [];

        //Validação
        //nome deve ser preenchido
        if (!nameInput.value) errors.push({ el: nameInput, error: 'O nome deve ser preenchido.' })

        if (emailInput.value && !validator.isEmail(emailInput.value)) {
            errors.push({
                el: emailInput,
                error: 'E-mail inválido'
            })
        }

        //Telefone ou email precisam ser preenchidos
        if (!phoneInput.value && !emailInput.value) {
            errors.push({
                el: phoneInput,
                error: 'Você deve informar ao menos um telefone ou email.'
            });
            errors.push({
                el: emailInput,
                error: 'Você deve informar ao menos um telefone ou email.'
            })
        }

        if (errors.length > 0) Form.feedbackErrors(errors);
        else {
            el.classList.add('was-validated');
            el.submit();
        }
    }
}