import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import Link from 'next/link';

import Chat from '@/components/ChatPage/Chat';

export default async function ChatPage() {
    const token = getCookie('accessToken', { cookies });

    return (
        <section className="dark:bg-black bg-white">
            {token ? (
                <Chat />
            ) : (
                <div className="md:w-2/3 m-auto h-[75vh]">
                    <div className="h-full flex flex-col justify-center items-center dark:text-white gap-24">
                        <div className="text-4xl text-center">Войдите в свой аккаунт чтобы начать переписки!</div>
                        <Link href="/auth" className="border rounded dark:border-white border-black px-2 py-1 text-2xl">
                            Войти в аккаунт
                        </Link>
                    </div>
                </div>
            )}
        </section>
    );
}
