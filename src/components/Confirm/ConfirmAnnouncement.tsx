'use client';

import moment from 'moment';
import { useEffect, useState } from 'react';

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
const ConfirmAnnouncement = () => {
    const [announcements, setAnnouncements] = useState<any[]>([]);

    useEffect(() => {
        const fetchAllData = async () => {
            const fetchedAnnouncements = await fetchData(process.env.NEXT_PUBLIC_EVENTS_URL + '/Announcements');
            setAnnouncements(fetchedAnnouncements);
        };

        fetchAllData();
    }, []);

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl">Создать объявление</h2>
                <button className="bg-blue-400 py-2 px-4 rounded">Подать объявление</button>
            </div>
            <div className="flex flex-col gap-4">
                {announcements.map((announcement) => {
                    return (
                        <div className="border-y-2 p-4" key={announcement.id}>
                            <h2 className="text-xl">{announcement.title}</h2>
                            <div>{moment(announcement.createdAt).calendar()}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ConfirmAnnouncement;
