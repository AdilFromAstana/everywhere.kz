import moment from 'moment';

import ChangePasswordComponent from './components/ChangePasswordComponent';
import ImageComponent from './components/ImageComponent';
import PersonalDataComponent from './components/PersonalDataComponent';

import './styles.css';

import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

async function GetProfileData() {
    const { NEXT_PUBLIC_EVENTS_URL = '' } = process.env;
    const token = getCookie('accessToken', { cookies });
    const decodedToken: any = token ? jwtDecode(token) : null;
    const userId = decodedToken?.id;

    const res = await fetch(NEXT_PUBLIC_EVENTS_URL + 'users/getById/' + userId, {
        headers: {
            Cookie: cookies().toString(),
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('accessToken', { cookies })}`,
        },
        cache: 'no-cache',
        credentials: 'include',
    });

    return res.json();
}

export default async function ProfilePage() {
    const data = await GetProfileData();

    return (
        <div className="md:w-3/4 m-auto">
            <div className="flex flex-col gap-2 py-2 border-t-2 dark:border-white mb-2">
                <div className="flex justify-between items-center">
                    <div className="dark:text-white text-xl">Личная информация</div>
                    <div className="text-gray-400 text-xs">
                        Вы зарегистрировались: {moment(data.createdAt).format('DD.MM.YYYY')}
                    </div>
                </div>
                <div className="grid grid-cols-[1fr_15%] gap-4">
                    <PersonalDataComponent data={data} />
                    <ImageComponent imageUrl={data.imageUrl} />
                </div>
            </div>
            <div className="flex flex-col gap-2 py-2 border-t-2 dark:border-white mb-2">
                <div className="dark:text-white text-xl">Изменить пароль</div>
                <ChangePasswordComponent />
            </div>
        </div>
    );
}
