import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import loginAction from '../redux/actions/loginAction';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputEmail: '',
      password: '',
      buttonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        const { inputEmail, password } = this.state;
        const regex = /\S+@\S+\.\S+/;
        const passwordLength = 6;
        this.setState({
          buttonDisabled: !(regex.test(inputEmail) && password.length >= passwordLength),
        });
      },
    );
  };

  login = () => {
    const { saveEmail, history } = this.props;
    const { inputEmail } = this.state;

    saveEmail(inputEmail);
    history.push('/carteira');
  };

  render() {
    const { inputEmail, password, buttonDisabled } = this.state;

    return (
      <div className="login-conteiner">
        <div className="App">TrybeWallet</div>
        <div className="form-conteiner">
          <label htmlFor="inputEmail">
            <input
              type="text"
              className="inputEmail"
              data-testid="email-input"
              name="inputEmail"
              value={ inputEmail }
              onChange={ this.handleChange }
              placeholder="E-mail"
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              className="password"
              data-testid="password-input"
              value={ password }
              onChange={ this.handleChange }
              name="password"
              placeholder="Senha"
            />
          </label>
          <button
            type="button"
            className="button-login"
            onClick={ this.login }
            disabled={ buttonDisabled }
          >
            Entrar
          </button>
        </div>
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
  saveEmail: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
