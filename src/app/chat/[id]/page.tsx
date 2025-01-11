import { getCookie } from 'cookies-next';
import { getDictionary } from 'dictionaries';
import { cookies } from 'next/headers';
import Link from 'next/link';

import Chat from '@/components/ChatPage/Chat';
import NewChat from '@/components/ChatPage/NewChat';

export default async function ChatPage() {
    const UserLang = getCookie('UserLang', { cookies });
    const locale = await getDictionary(UserLang?.toLocaleLowerCase() ?? 'ru');

    return (
        <section className="dark:bg-black bg-white">
            <NewChat />
        </section>
    );
}
