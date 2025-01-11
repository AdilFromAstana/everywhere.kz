'use client';

import { UUID } from 'crypto';
import { getCookie, setCookie } from 'cookies-next';
import { useEffect } from 'react';

export const UpdateAnnouncementViewCount = ({ id }: { id: UUID }) => {
    useEffect(() => {
        const ViewedAnnouncementsFromCookie = getCookie('ViewedAnnouncements');
        const updateAnnouncementViewCount = async () => {
            const viewedAnnouncements = JSON.parse(ViewedAnnouncementsFromCookie as string);

            if (viewedAnnouncements?.includes(id)) {
                console.log(`Объявление с ID ${id} уже просмотрено.`);
                return null;
            }

            const res = await fetch(
                process.env.NEXT_PUBLIC_EVENTS_URL + 'announcements/increaseAnnouncementViewCount',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        announcementId: id,
                    }),
                    cache: 'no-store',
                }
            );

            if (!res.ok) {
                console.log('Increase view count error: ', res);
                return 'error';
            }

            viewedAnnouncements.push(id);
            setCookie('ViewedAnnouncements', viewedAnnouncements);

            return 'success';
        };
        updateAnnouncementViewCount();
    }, [id]);

    return null;
};
