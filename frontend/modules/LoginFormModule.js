import validator from 'validator';
import Form from './FormModule'

export default class LoginForm extends Form{
    constructor(formSelector) {
        super(formSelector);
    }

    init() {
        this.events(this.validate);
    }

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        const errors = [];

        if (!validator.isEmail(emailInput.value)) {
            errors.push({
                el: emailInput,
                error: 'E-mail inválido'
            })
        }

        if (!passwordInput.value) {
            errors.push({
                el: passwordInput,
                error: 'Senha inválida.'
            })
        }

        if (errors.length > 0) Form.feedbackErrors(errors);
        else {
            el.classList.add('was-validated');
            el.submit();
        }
    }
}