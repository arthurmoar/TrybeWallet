// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_SPENDING,
  DELETE_SPENDING,
  CATCH_CURRENCY,
  ID_TO_EDIT,
  UPDATE_SPENDING,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  editedID: null,
  expenseId: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CATCH_CURRENCY:
    return { ...state, currencies: action.currency };

  case ADD_SPENDING:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.expenseId,
          ...action.expense,
          exchangeRates: action.data,
        },
      ],
      expenseId: state.expenseId + 1,
    };

  case DELETE_SPENDING:
    return {
      ...state,
      expenses: [...state.expenses].filter(
        (expense) => expense.id !== action.id,
      ),
    };

  case UPDATE_SPENDING:
    return {
      ...state,
      expenses: [...action.expenses],
      editor: false,
      editedID: null,
    };

  case ID_TO_EDIT:
    return { ...state, editedID: action.id, editor: true };

  default:
    return state;
  }
};

export default wallet;
