import { CSRF_TOKEN_KEY, CSRF_TOKEN_LENGTH } from '@/constants';

export const generateCSRFToken = () => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let counter = 0;
  while (counter < CSRF_TOKEN_LENGTH) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  return result;
};

export const storeCSRFToken = (token: string) => {
  try {
    localStorage.setItem(CSRF_TOKEN_KEY, token);
  } catch (e) {
    console.error(e);
  }
};

export const getCSRFToken = () => {
  try {
    const token = localStorage.getItem(CSRF_TOKEN_KEY);
    return token;
  } catch {
    return null;
  }
};

export const clearCSRFToken = () => {
  try {
    localStorage.removeItem(CSRF_TOKEN_KEY);
  } catch (e) {
    console.error(e);
  }
};
