'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import ChatWindow from './components/ChatWindow';

// interface Contact {
//     id: number;
//     name: string;
// }

// interface Message {
//     id: number;
//     text: string;
//     sender: string;
//     timestamp: number;
//     read: boolean;
// }

// const contacts: Contact[] = [
//     { id: 1, name: 'Контакт 1' },
//     { id: 2, name: 'Контакт 2' },
//     { id: 3, name: 'Контакт 3' },
// ];

const fetchData = async (url: any) => {
    try {
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
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

const NewChat: React.FC = () => {
    const [announcement, setAnnouncement] = useState<any>({});
    const { id } = useParams();

    useEffect(() => {
        const fetchAllData = async () => {
            const fetchedAnnouncement = await fetchData(process.env.NEXT_PUBLIC_EVENTS_URL + '/announcements/' + id);
            setAnnouncement(fetchedAnnouncement);
        };

        fetchAllData();
    }, []);

    return (
        <div className="md:w-2/3 m-auto h-[75vh]">
            <ChatWindow
                isNewChat={true}
                receiverId={announcement.authorId}
                selectedChatId={null}
                announcementId={announcement.id}
                announcementTitle={announcement.title}
            />
        </div>
    );
};

export default NewChat;
