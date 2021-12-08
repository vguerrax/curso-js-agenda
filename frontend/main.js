import 'core-js/stable';
import 'regenerator-runtime/runtime';

import LoginForm from './modules/LoginFormModule';
import CadastroUsuario from './modules/CadastroUsuarioFormModule';
import Contato from './modules/ContatoFormModule';

const login = new LoginForm('.loginForm');
const cadastroUsuario = new CadastroUsuario('.cadastroUsuarioForm');
const contato = new Contato('.contatoForm');

login.init();
cadastroUsuario.init();
contato.init();

// import './assets/css/style.css';
