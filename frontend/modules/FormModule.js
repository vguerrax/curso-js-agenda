import validator from 'validator';

export default class Form {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector)
    }

    events(validate) {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.removeFeedbacks()
            validate(e);
        });
    }

    static feedbackErrors(errors) {
        errors.forEach(err => {
            const feedback = document.createElement('div');
            feedback.className = 'feedback text-danger';
            feedback.innerHTML = err.error;
            err.el.parentElement.append(feedback);
        });
    }

    removeFeedbacks() {
        const feedbacks = this.form.querySelectorAll('.feedback');
        feedbacks.forEach(feedback => feedback.remove());
    }
}