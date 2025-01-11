'use client';

import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';

import { getCookie } from '@/functions';

interface Message {
    id: number;
    content: string;
    chatId: string;
    createdAt: string;
    read: boolean;
    userId: string;
}
const ChatWindow: React.FC<{
    isNewChat: boolean;
    selectedChatId: string | null;
    realEstateTitle: string;
    realEstateId: any;
    receiverId: any;
}> = ({ selectedChatId, realEstateId, realEstateTitle, receiverId, isNewChat = false }) => {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const accessToken = getCookie('accessToken');
    const decodedToken: any = accessToken ? jwtDecode(accessToken) : null;

    const fetchMessages = async (page: number) => {
        setLoading(true);
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_EVENTS_URL + `/chats/${selectedChatId}?offset=${messages.length}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const data = await response.json();
            if (messagesContainerRef.current) messagesContainerRef.current.scrollTop = 0;
            setMessages((prevMessages) => [...data.Messages, ...prevMessages]); // Add new messages at the top
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isNewChat && selectedChatId) {
            fetchMessages(page);
        }
    }, [selectedChatId, isNewChat, page]);

    const handleScroll = () => {
        if (messagesContainerRef.current) {
            if (messagesContainerRef.current.scrollTop === 0 && hasMore && !loading) {
                setPage((prevPage) => prevPage + 1);
            }
        }
    };

    const sendMessage = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_EVENTS_URL + '/chats/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    realEstateId: realEstateId,
                    userId: decodedToken?.id,
                    receiverId: receiverId,
                    content: newMessage,
                }),
            });
            const data = await response.json();
            setNewMessage('');
            setMessages((prevMessages) => [data, ...prevMessages]); // Add new message at the top
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="flex flex-col h-[75vh]">
            <div className="p-4 dark:text-white font-bold border-l-0 border-2 dark:border-white border-black">
                {realEstateTitle}
            </div>
            <div
                className="overflow-y-auto py-2 px-4 flex-1 border-0 border-r-2 border-black flex flex-col"
                onScroll={handleScroll}
                ref={messagesContainerRef}
            >
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`mb-2 ${message.userId === decodedToken?.id ? 'text-right' : 'text-left'}`}
                    >
                        <div
                            className={`inline-block text-white p-2 max-w-xs break-words rounded-2xl ${
                                message.userId === decodedToken?.id
                                    ? 'bg-blue-500 rounded-br-none'
                                    : 'rounded-bl-none bg-[#262629]'
                            }`}
                        >
                            <div className="text-sm">{message.content}</div>
                            <div className="flex justify-end gap-1">
                                <div className="text-xs text-white">{moment(message.createdAt).format('HH:mm')}</div>
                                <div className="text-xs">
                                    {message.userId === decodedToken?.id ? (
                                        message.read ? (
                                            <span className="text-green-500">✔️</span>
                                        ) : (
                                            <span className="text-gray-500">✉️</span>
                                        )
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 flex border-l-0 border-t-0 border-2 dark:border-white border-black">
                <input
                    type="text"
                    className="flex-1 p-2 rounded-l-lg border"
                    placeholder="Введите сообщение..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className="bg-blue-500 text-white p-2 rounded-r-lg" onClick={sendMessage}>
                    Отправить
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
