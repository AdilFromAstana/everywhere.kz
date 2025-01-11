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
        const ViewedRealEstatePhonesFromCookie = getCookie('ViewedRealEstatePhones');
        const viewedRealEstatePhones = JSON.parse(ViewedRealEstatePhonesFromCookie as string);

        if (viewedRealEstatePhones?.includes(id)) {
            console.log(`Объявление с ID ${id} уже просмотрено.`);
        } else {
            const res = await fetch(process.env.NEXT_PUBLIC_EVENTS_URL + 'realEstates/increasePhoneViewCount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    realEstateId: id,
                }),
                cache: 'no-store',
            });

            if (!res.ok) {
                console.log('Increase view count error: ', res);
            }
            viewedRealEstatePhones.push(id);

            setCookie('ViewedRealEstatePhones', viewedRealEstatePhones);
        }

        setIsPhoneVisible(true);
    };

    const showNumber = () => viewContactPhone();

    const callNumber = () => (window.location.href = 'tel:+77761156416');

    return (
        <div className="flex flex-col gap-2 md:border-t-2 dark:border-white border-black md:pt-2 md:w-1/2 lg:w-full">
            <button
                className={'text-lg border-black font-bold p-2 border-2 rounded-xl bg-gray-200 text-black'}
                onClick={callNumber}
            >
                {locale.EventPage.EventInfo.ShowNumber}
            </button>
        </div>
    );
};
