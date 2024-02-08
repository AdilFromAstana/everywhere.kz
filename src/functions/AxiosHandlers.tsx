'use server';

import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export const GetToken = async () => {
    const { AUTH_URL = '', NEXT_PUBLIC_CLIENT_ID = '', NEXT_PUBLIC_CLIENT_SECRET = '' } = process.env;
    let token = '';

    const AuthData = `client_id=${encodeURIComponent(NEXT_PUBLIC_CLIENT_ID)}&client_secret=${encodeURIComponent(
        NEXT_PUBLIC_CLIENT_SECRET
    )}&grant_type=client_credentials&scope=MarketPlace`;

    await fetch(`${AUTH_URL}/token`, {
        method: 'POST',
        body: AuthData,
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((res) => res.json())
        .then((json) => {
            // cookies().set({ name: 'token', value: json.access_token, maxAge: 60 * 60 * 24 * 365 });
            // setCookie('token', json.access_token, { cookies, maxAge: 60 * 60 * 24 * 365 });
            token = json.access_token;
        });

    return token;
};

export const CheckToken = async () => {
    const { AUTH_URL = '' } = process.env;

    let token = getCookie('token', { cookies });

    await fetch(`${AUTH_URL}/userinfo`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: '*/*',
        },
    })
        .then(async (res) => {
            if (res.status === 401) {
                token = await GetToken();
            }
        })
        .catch(async (err) => {
            token = await GetToken();
            return err;
        });

    return token;
};
