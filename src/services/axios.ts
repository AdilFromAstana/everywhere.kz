import axios, { AxiosInstance } from 'axios';

function createAxiosInstance(baseURL: string): AxiosInstance {
  const instance = axios.create({
    baseURL,
  });

  instance.defaults.withCredentials = true;

  const userLang = document.cookie.replace(
    /(?:(?:^|.*;\s*)userLang\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
  );

  switch (userLang ?? '') {
    case 'kz':
      instance.defaults.headers.common['accept-language'] = 'kz-KZ';
      break;
    case 'en':
      instance.defaults.headers.common['accept-language'] = 'en-US';
      break;
    default:
      instance.defaults.headers.common['accept-language'] = 'ru-RU';
      break;
  }
  instance.defaults.headers.common['Authorization'] =
    'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjM0ODIzMjdENzM5MDE4RUJGODVDQTE1NDBCOUMzQTI1IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2OTUzMTM4MzQsImV4cCI6MTcyNjg0OTgzNCwiaXNzIjoiaHR0cHM6Ly9kZXYtYXV0aC5rYXp0aWNrZXQua3oiLCJjbGllbnRfaWQiOiJLYXp0aWNrZXQuQ29tbWVyY2lhbC5XZWIiLCJjbGllbnRfSXNNYXJrZXRQbGFjZSI6InRydWUiLCJpYXQiOjE2OTUzMTM4MzQsInNjb3BlIjpbIk1hcmtldFBsYWNlIl19.ft7MBGsO9CD4i73matb5e9ObGu_VSKJepd1rvHTR8FOAzycvrZGPz38GjPP_WMkBUc18UqJZXmbkK7NBCXstUOY_nQnfVvDYPemB4Nyx1DjZCowGfJbhOwQyO8gLYXvtPLoyP5qnQpoJsloEZu_GOYLAJrKcUac45gjNPRFvQZKtBYfT9NbP_PSSmtF5apT7IqYuak9Jr7vBlNaaeErIJ8hmlH3cDURbt495tk3W6Q5PGWHMogkMh2lB-X4XiJRSmk90COG6iBQAJ3uou9y_B4_KeD3bEFR5_JV_ymD8Qe8PHd63lxm0y9U9r3ogjJtEMsLnhYzWSPs4pbOl90_hvQ';

  return instance;
}

export function Events() {
  const baseURL =
    process.env.API_URL || 'https://dev-api.kazticket.kz/events/commercial/'; // Provide a default value of ''
  return createAxiosInstance(baseURL);
}

export function Orders() {
  const baseURL =
    process.env.ORDERS_API || 'https://dev-api.kazticket.kz/orders/commercial/'; // Provide a default value of ''
  return createAxiosInstance(baseURL);
}

export function Managment() {
  const baseURL =
    process.env.MANAGMENT_API ||
    'https://dev-api.kazticket.kz/management/console/'; // Provide a default value of ''
  return createAxiosInstance(baseURL);
}
