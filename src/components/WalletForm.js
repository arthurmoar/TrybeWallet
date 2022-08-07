import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchAddExpense,
  fetchCatchCurrency,
  updateExpense,
} from '../redux/actions/walletThunk';
import './WalletForm.css';

class WalletForm extends Component {
  constructor() {
    super();
    this.initialState = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    const { getCurrency } = this.props;
    getCurrency();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { addExpense } = this.props;
    addExpense(this.state);
    this.setState(this.initialState);
  };

  handleEdit = () => {
    const { expenses, editedID, updateExpenses } = this.props;
    const index = expenses.map((expense) => expense.id).indexOf(editedID);
    expenses[index] = {
      id: expenses[index].id,
      ...this.state,
      exchangeRates: expenses[index].exchangeRates,
    };
    updateExpenses(expenses);
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    const paymentMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const spendList = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form className="form-wallet">
        <label htmlFor="value" className="label-wallet-form">
          <p className="title-form">Valor:</p>
          <input
            type="number"
            id="value"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            placeholder="Valor"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="value" className="label-wallet-form">
          <p className="title-form">Descrição:</p>
          <input
            type="text"
            id="description"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            placeholder="Descrição"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency" className="label-wallet-form">
          <p className="title-form">Moeda:</p>
          <select
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
            data-testid="currency-input"
          >
            {currencies.map((curr) => (
              <option value={ curr } key={ curr }>
                {curr}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method" className="label-wallet-form">
          <p className="title-form">Método de pagamento:</p>
          <select
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            {paymentMethod.map((payments) => (
              <option value={ payments } key={ payments }>
                {payments}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="tag" className="label-wallet-form">
          <p className="title-form">Serviço:</p>
          <select
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            {spendList.map((spend) => (
              <option value={ spend } key={ spend }>
                {spend}
              </option>
            ))}
          </select>
        </label>
        {editor ? (
          <button
            className="btn-generic"
            type="button"
            onClick={ this.handleEdit }
          >
            Editar despesa
          </button>
        ) : (
          <button
            className="btn-generic"
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        )}
      </form>
    );
  }
}

WalletForm.propTypes = {
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  getCurrency: PropTypes.func.isRequired,
  editedID: PropTypes.number,
  updateExpenses: PropTypes.func.isRequired,
};

WalletForm.defaultProps = {
  editedID: null,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  expenses: state.wallet.expenses,
  editedID: state.wallet.editedID,
});
const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(fetchCatchCurrency()),
  addExpense: (expense) => dispatch(fetchAddExpense(expense)),
  updateExpenses: (expenses) => dispatch(updateExpense(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
