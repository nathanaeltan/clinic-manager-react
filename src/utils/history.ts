import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const redirectToLogin = () => {
  history.push('/login');
};