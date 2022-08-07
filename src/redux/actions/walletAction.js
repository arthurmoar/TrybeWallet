import {
  DELETE_SPENDING,
  ID_TO_EDIT,
} from './index';

export const fetchDeleteExpense = (id) => ({
  type: DELETE_SPENDING,
  id,
});

export const addIdEdit = (id) => ({
  type: ID_TO_EDIT,
  id,
});
