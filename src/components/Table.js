import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDeleteExpense, addIdEdit } from '../redux/actions/walletAction';
import './Table.css';

class Table extends Component {
  spendDelete = (id) => {
    const { deleteExpense } = this.props;
    deleteExpense(id);
  };

  spendEdit = (id) => {
    const { editExpense } = this.props;
    editExpense(id);
  };

  render() {
    const heading = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];
    const { expenses } = this.props;
    return (
      <table className="table-conteiner">
        <thead className="table-heading">
          <tr>
            {heading.map((column) => (
              <th key={ column } className="heading-column">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>
                {Math.round(
                  Number(expense.exchangeRates[expense.currency].ask) * 100,
                ) / 100}
              </td>
              <td>
                {Math.round(
                  Number(expense.value)
                    * Number(expense.exchangeRates[expense.currency].ask)
                    * 100,
                ) / 100}
              </td>
              <td>BRL</td>
              <td>
                <button
                  className="btn-generic"
                  type="button"
                  onClick={ () => this.spendDelete(expense.id) }
                  data-testid="delete-btn"
                >
                  Excluir
                </button>
                <button
                  className="btn-generic"
                  type="button"
                  onClick={ () => this.spendEdit(expense.id) }
                  data-testid="edit-btn"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(fetchDeleteExpense(id)),
  editExpense: (id) => dispatch(addIdEdit(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
