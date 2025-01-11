'use client';

import { UUID } from 'crypto';
import { getCookie, setCookie } from 'cookies-next';
import { useState } from 'react';

interface IViewContactPhoneButton {
    id: UUID;
    locale: any;
}

export const ViewContactPhoneButton: React.FC<IViewContactPhoneButton> = ({ id, locale }) => {
    const [isPhoneVisible, setIsPhoneVisible] = useState(false);

    const viewContactPhone = async () => {
        const ViewedAnnouncementPhonesFromCookie = getCookie('ViewedAnnouncementPhones');
        const viewedAnnouncementPhones = JSON.parse(ViewedAnnouncementPhonesFromCookie as string);

        if (viewedAnnouncementPhones?.includes(id)) {
            console.log(`Объявление с ID ${id} уже просмотрено.`);
        } else {
            const res = await fetch(process.env.NEXT_PUBLIC_EVENTS_URL + 'announcements/increasePhoneViewCount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    announcementId: id,
                }),
                cache: 'no-store',
            });

            if (!res.ok) {
                console.log('Increase view count error: ', res);
            }
            viewedAnnouncementPhones.push(id);

            setCookie('ViewedAnnouncementPhones', viewedAnnouncementPhones);
        }

        setIsPhoneVisible(true);
    };

    const showNumber = () => viewContactPhone();

    const callNumber = () => (window.location.href = 'tel:+77761156416');

    return (
        <div className="flex flex-col gap-2 md:border-t-2 dark:border-white border-black md:pt-2 md:w-1/2 lg:w-full">
            <div className={`${isPhoneVisible ? 'flex' : 'hidden'} justify-center font-bold text-red-700`}>
                {locale.EventPage.EventInfo.BewareOfScammers}
            </div>
            <button
                className={`text-lg border-black font-bold p-2 border-2 rounded-xl bg-gray-200 ${
                    isPhoneVisible ? 'text-black' : 'text-gray-400'
                }`}
                onClick={isPhoneVisible ? callNumber : showNumber}
            >
                {isPhoneVisible ? '+7-776-115-64-16' : locale.EventPage.EventInfo.ShowNumber}
            </button>
        </div>
    );
};
