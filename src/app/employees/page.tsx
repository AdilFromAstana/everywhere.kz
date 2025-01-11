import moment from 'moment';
import { cookies } from 'next/headers';

async function GetEmployeesData() {
    const { NEXT_PUBLIC_EVENTS_URL = '' } = process.env;

    const cookieStore = cookies();
    const token = cookieStore.get('accessToken')?.value;

    const res = await fetch(NEXT_PUBLIC_EVENTS_URL + 'users/getById', {
        headers: {
            // 'Accept-Language': acceptLanguage,
            // 'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        console.log('GetEventData Error: ', res);
        return null;
    }

    return res.json();
}

type Props = {
    params: { id: string };
};

export default async function EmployeesPage({ params }: Props) {
    const data = await GetEmployeesData();

    return (
        <div className="md:w-3/4 m-auto">
            <div className="flex flex-col gap-2 py-2 border-t-2 dark:border-white mb-2">
                <div className="flex justify-between items-center">
                    <div className="dark:text-white text-xl">Личная информация</div>
                    <div className="text-gray-400 text-xs">
                        Вы зарегистрировались: {moment(data.createdAt).format('DD.MM.YYYY')}
                    </div>
                </div>
                <div className="grid grid-cols-[1fr_15%] gap-4"></div>
            </div>
            <div className="flex flex-col gap-2 py-2 border-t-2 dark:border-white mb-2">
                <div className="dark:text-white text-xl">Изменить пароль</div>
            </div>
        </div>
    );
}
