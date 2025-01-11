import { getCookie } from 'cookies-next';
import { getDictionary } from 'dictionaries';
import { cookies } from 'next/headers';

import AuthComponent from '@/components/AuthComponent';

export default async function AuthPage() {
    const UserLang = getCookie('UserLang', { cookies });
    const locale = await getDictionary(UserLang?.toLocaleLowerCase() ?? 'ru');
    return (
        <div className="flex flex-col items-center justify-center md:min-h-screen dark:bg-black md:mt-0 mt-[17.5vh]">
            <AuthComponent locale={locale} />
        </div>
    );
}
