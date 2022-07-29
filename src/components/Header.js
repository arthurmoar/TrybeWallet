import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
  render() {
    const { expenses, email } = this.props;
    const totalSpend = expenses.reduce((total, expense) => (
      total + Number(expense.value) * Number(expense.exchangeRates[expense.currency].ask)
    ), 0);
    return (
      <header className="header-field">
        <div className="header-title">TrybeWallet</div>
        <div className="left-size-currency">
          <p data-testid="email-field" className="email-field">{email}</p>
          <div className="currency">
            <p data-testid="total-field" className="money-spend">
              {totalSpend.toFixed(2)}
            </p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
