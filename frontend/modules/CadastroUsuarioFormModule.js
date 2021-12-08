import validator from 'validator';
import Form from './FormModule'

export default class CadastroUsuarioForm extends Form {
    constructor(formSelector) {
        super(formSelector);
    }

    init() {
        this.events(this.validate);
    }

    validate(e) {
        const el = e.target;
        const nameInput = el.querySelector('input[name="name"]');
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        const confirmPasswordInput = el.querySelector('input[name="confirmPassword"]');
        const errors = [];

        //Validação
        //nome deve ser preenchido
        if (!nameInput.value) errors.push({ el: nameInput, error: 'O nome deve ser preenchido.' })
        
        //email valido
        if (!validator.isEmail(emailInput.value)) errors.push({ el: emailInput, error: 'Email inválido.' })

        //senha entre 6 e 10 caracteres
        if (passwordInput.value.length < 6 || passwordInput.value.length > 10)
            errors.push({ el: passwordInput, error: 'A senha deve ter entre 6 e 10 caracteres.' })

        //senha e confirmaSenha devem ser iguais
        if (confirmPasswordInput.value) {
            if (passwordInput.value !== confirmPasswordInput.value)
                errors.push({ el: confirmPasswordInput, error: 'A senha e a confirmação de senha não conferem.'})
        }

        if (errors.length > 0) Form.feedbackErrors(errors);
        else {
            el.classList.add('was-validated');
            el.submit();
        }
    }
}