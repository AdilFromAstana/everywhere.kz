import axios, { AxiosInstance } from 'axios';

function createAxiosInstance(baseURL: string): AxiosInstance {
    const instance = axios.create({
        baseURL,
    });

    instance.defaults.withCredentials = true;

    const userLang = document.cookie.replace(/(?:(?:^|.*;\s*)userLang\s*=\s*([^;]*).*$)|^.*$/, '$1');

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
        'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2RjYxOUU3RkEzQ0IwRjY0NzZGNzA5RjQxNTlBMjM3IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2OTY4NDY5MzcsImV4cCI6MTcyODM4MjkzNywiaXNzIjoiaHR0cHM6Ly9kZXYtYXV0aC5rYXp0aWNrZXQua3oiLCJjbGllbnRfaWQiOiJLYXp0aWNrZXQuQ29tbWVyY2lhbC5XZWIiLCJjbGllbnRfSXNNYXJrZXRQbGFjZSI6InRydWUiLCJpYXQiOjE2OTY4NDY5MzcsInNjb3BlIjpbIk1hcmtldFBsYWNlIl19.eubKeXVGEJiT4jVWp2VpWy4OeDxvj7zcgRiec8M30Psr1c5emXq203yLA1RTooFxZrBOn47pawp4h7ERXUKhr77MN2p8UtKwFRz2iEFnNB04BoYOVxPPkfvFknouNzizVH57sMbsIMCHPNJzZXc3aFJg8Odp3FgLJT4IqhBWJpDPMETMrTnSjHs2hM9B3rX9thcouz9tDOwCRpbTx6dOyF-cFH8cx2dfxXfO9hKkDfbfD0vE7fE2tUbgZZQFLr-_5tRf_aFIyhOzAfrEvSHqTcC8fl7OZ8fT2x0wiYy0HGzUm_qITnoYQsrQyGAM-Z0ljlt7n81MXWIkdtGup0uWHg';

    return instance;
}

export function Events() {
    const baseURL = process.env.API_URL || 'https://dev-api.kazticket.kz/events/commercial/'; // Provide a default value of ''
    return createAxiosInstance(baseURL);
}

export function Orders() {
    const baseURL = process.env.ORDERS_API || 'https://dev-api.kazticket.kz/orders/commercial/'; // Provide a default value of ''
    return createAxiosInstance(baseURL);
}

export function Managment() {
    const baseURL = process.env.MANAGMENT_API || 'https://dev-api.kazticket.kz/management/console/'; // Provide a default value of ''
    return createAxiosInstance(baseURL);
}
