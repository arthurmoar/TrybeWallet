import { LOGIN } from '.';

const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export default loginAction;
