// import {
//   ADD_EXPENSE,
//   DELETE_EXPENSE,
//   CATCH_CURRENCY,
//   ID_TO_EDIT,
//   UPDATE_EXPENSE,
//   LOGIN,
// } from './index';

// export const userLogin = (email) => ({
//   type: LOGIN,
//   email,
// });
// export const fetchCatchCurrency = () => async (dispatch) => {
//   const response = await fetch('https://economia.awesomeapi.com.br/json/all');
//   const data = await response.json();
//   const currency = Object.keys(data).filter((curr) => curr !== 'USDT');
//   dispatch({ type: CATCH_CURRENCY, currency });
// };
// export const fetchAddExpense = (expense) => async (dispatch) => {
//   const response = await fetch('https://economia.awesomeapi.com.br/json/all');
//   const data = await response.json();
//   dispatch({ type: ADD_EXPENSE, expense, data });
// };

// export const fetchDeleteExpense = (id) => ({
//   type: DELETE_EXPENSE,
//   id,
// });

// export const setIdToEdit = (id) => ({
//   type: ID_TO_EDIT,
//   id,
// });

// export const updateExpense = (expenses) => ({
//   type: UPDATE_EXPENSE,
//   expenses,
// });
