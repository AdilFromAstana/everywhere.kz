'use client';

import { UUID } from 'crypto';
import moment from 'moment';
import { useEffect, useState } from 'react';

import { getCookie } from '@/functions';

const fetchData = async (url: any) => {
    try {
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getCookie('accessToken')}`,
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch data. Status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return [];
    }
};

const ChatList: React.FC<{
    selectedChatId: UUID | null;
    handleSelectChat: (id: string) => void;
}> = ({ selectedChatId, handleSelectChat }) => {
    const [chats, setChats] = useState<any[]>([]);

    useEffect(() => {
        const fetchAllData = async () => {
            const fetchedContacts = await fetchData(NEXT_PUBLIC_EVENTS_URL + 'ats/');
            setChats(fetchedContacts);
        };

        fetchAllData();
    }, []);

    const getMessageDate = (createdAt: Date | string | number): string => {
        const now = moment();
        const messageDate = moment(createdAt);

        if (messageDate.isSame(now, 'day')) {
            return messageDate.format('HH:mm');
        } else if (messageDate.isSame(now.clone().subtract(1, 'days'), 'day')) {
            return 'вчера';
        } else if (messageDate.isAfter(now.clone().subtract(7, 'days'))) {
            return messageDate.format('dddd');
        } else if (messageDate.isSame(now, 'year')) {
            return messageDate.format('DD.MM');
        } else {
            return messageDate.format('DD.MM.YYYY');
        }
    };

    return (
        <div className="dark:bg-black overflow-y-auto border-2 border-black dark:border-white">
            {chats.map((chat) => (
                <div
                    key={chat.id}
                    className={`p-2 flex flex-col cursor-pointer dark:text-white border-b gap-2 ${
                        selectedChatId === chat.id ? 'bg-[#3A3A3C] text-white' : ''
                    }`}
                    onClick={() => handleSelectChat(chat)}
                >
                    <div className="flex justify-between gap-2">
                        <div className="text-sm text-nowrap overflow-hidden text-ellipsis whitespace-nowrap">
                            {chat.chatTitle}
                        </div>
                        <div className="text-sm text-nowrap text-gray-400">
                            {getMessageDate(chat.Messages[0].createdAt)}
                        </div>
                    </div>
                    <div className="text-xs text-nowrap overflow-hidden text-ellipsis whitespace-nowrap">
                        {chat.Messages[0].content}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default ChatList;
