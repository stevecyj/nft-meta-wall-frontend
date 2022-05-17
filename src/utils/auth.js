import Cookies from 'js-cookie';

const TokenKey = 'Token';

export function getCookiesToken() {
  return Cookies.get(TokenKey);
}

export function setCookiesToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeCookiesToken() {
  return Cookies.remove(TokenKey);
}

export function getLocalStorageToken() {
  return localStorage.getItem(TokenKey);
}

export function setLocalStorageToken(token) {
  return localStorage.setItem(TokenKey, token);
}

export function removeLocalStorageToken() {
  return localStorage.clear();
}