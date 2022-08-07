import {
  CATCH_CURRENCY,
  ADD_SPENDING,
  UPDATE_SPENDING,
  ENDPONIT,
} from './index';

export const fetchCatchCurrency = () => async (dispatch) => {
  const response = await fetch(ENDPONIT);
  const data = await response.json();
  const currency = Object.keys(data).filter((code) => code !== 'USDT');
  dispatch({ type: CATCH_CURRENCY, currency });
};

export const fetchAddExpense = (expense) => async (dispatch) => {
  const response = await fetch(ENDPONIT);
  const data = await response.json();
  dispatch({ type: ADD_SPENDING, expense, data });
};

export const updateExpense = (expenses) => ({
  type: UPDATE_SPENDING,
  expenses,
});
