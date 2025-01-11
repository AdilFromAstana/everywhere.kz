'use client';

import { useState } from 'react';

import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';

// interface Contact {
//     id: number;
//     name: string;
// }

// interface Message {
//     id: number;
//     text: string;
//     sender: string;
//     timestamp: number; // Добавляем поле timestamp для хранения времени сообщения
//     read: boolean; // Добавляем поле read для отображения статуса прочтения
// }

// const contacts: Contact[] = [
//     { id: 1, name: 'Контакт 1' },
//     { id: 2, name: 'Контакт 2' },
//     { id: 3, name: 'Контакт 3' },
// ];

// const initialMessages: Record<number, Message[]> = {
//     1: [
//         { id: 1, text: 'Привет!', sender: 'Контакт 1', timestamp: Date.now() - 10000, read: true },
//         { id: 2, text: 'Как дела?', sender: 'Контакт 1', timestamp: Date.now() - 5000, read: true },
//         { id: 3, text: 'Чем занимаешься?', sender: 'Контакт 1', timestamp: Date.now(), read: false },
//         { id: 4, text: 'Хорошо, а у тебя?', sender: 'Вы', timestamp: Date.now(), read: false },
//         { id: 5, text: 'Сегодня интересный день.', sender: 'Контакт 1', timestamp: Date.now(), read: false },
//         { id: 6, text: 'Да, погода хорошая.', sender: 'Вы', timestamp: Date.now(), read: false },
//         { id: 7, text: 'Что планируешь делать завтра?', sender: 'Контакт 1', timestamp: Date.now(), read: false },
//         { id: 8, text: 'Еще не уверен.', sender: 'Вы', timestamp: Date.now(), read: false },
//     ],
//     2: [
//         { id: 1, text: 'Привет!', sender: 'Контакт 2', timestamp: Date.now() - 20000, read: true },
//         { id: 2, text: 'Как дела?', sender: 'Контакт 2', timestamp: Date.now() - 15000, read: true },
//         { id: 3, text: 'Что нового?', sender: 'Контакт 2', timestamp: Date.now() - 10000, read: true },
//         { id: 4, text: 'Да, у меня все хорошо.', sender: 'Вы', timestamp: Date.now(), read: false },
//         { id: 5, text: 'Планирую сходить в кино.', sender: 'Контакт 2', timestamp: Date.now(), read: false },
//         { id: 6, text: 'Какой фильм собираешься посмотреть?', sender: 'Вы', timestamp: Date.now(), read: false },
//         { id: 7, text: 'Какие планы на выходные?', sender: 'Контакт 2', timestamp: Date.now(), read: false },
//         { id: 8, text: 'Друзья пригласили на пикник.', sender: 'Вы', timestamp: Date.now(), read: false },
//     ],
//     3: [
//         { id: 1, text: 'Привет!', sender: 'Контакт 3', timestamp: Date.now() - 30000, read: true },
//         { id: 2, text: 'Как жизнь?', sender: 'Контакт 3', timestamp: Date.now() - 20000, read: true },
//         { id: 3, text: 'Что нового?', sender: 'Контакт 3', timestamp: Date.now() - 10000, read: true },
//         { id: 4, text: 'Все отлично, спасибо!', sender: 'Вы', timestamp: Date.now(), read: false },
//         { id: 5, text: 'Планирую поехать на море.', sender: 'Контакт 3', timestamp: Date.now(), read: false },
//         { id: 6, text: 'Звучит замечательно.', sender: 'Вы', timestamp: Date.now(), read: false },
//         { id: 7, text: 'Как твои дела?', sender: 'Контакт 3', timestamp: Date.now(), read: false },
//         { id: 8, text: 'Не могу жаловаться.', sender: 'Вы', timestamp: Date.now(), read: false },
//     ],
// };

const Chat: React.FC = () => {
    const [selectedChatId, setSelectedChatId] = useState<any>(null);
    // const [messages, setMessages] = useState<Message[]>([]);
    const [announcementId, setAnnouncementId] = useState<any>(null);
    const [receiverId, setReceiverId] = useState<any>(null);
    const [announcementTitle, setAnnouncementTitle] = useState<any>(null);

    const handleSelectChat = (value: any) => {
        setSelectedChatId(value.id);
        setAnnouncementId(value.Announcement.id);
        setReceiverId(value.Announcement.authorId);
        setAnnouncementTitle(value.Announcement.title);
    };

    // const handleSendMessage = (text: string) => {
    //     if (selectedChatId !== null) {
    //         const newMessage: Message = {
    //             id: Date.now(),
    //             text,
    //             sender: 'Вы',
    //             timestamp: Date.now(),
    //             read: false,
    //         };
    //         setMessages(messages);
    //     }
    // };

    // const getLastMessagePreview = (contactId: number): string => {
    //     const contactMessages = messages[contactId];
    //     const lastMessage = contactMessages ? contactMessages[contactMessages.length - 1] : null;
    //     if (lastMessage) {
    //         return `${lastMessage.sender === 'Вы' ? 'Вы: ' : ''}${lastMessage.text}`;
    //     }
    //     return '';
    // };

    return (
        <div className="md:w-2/3 m-auto">
            <div className="grid md:grid-cols-[30%_1fr] h-[75vh]">
                <ChatList selectedChatId={selectedChatId} handleSelectChat={handleSelectChat} />
                {selectedChatId !== null ? (
                    <ChatWindow
                        isNewChat={false}
                        announcementId={announcementId}
                        receiverId={receiverId}
                        selectedChatId={selectedChatId}
                        announcementTitle={announcementTitle}
                    />
                ) : (
                    <div className="dark:bg-black border-2 dark:border-white flex items-center justify-center text-white">
                        Выберите контакт для начала переписки
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
