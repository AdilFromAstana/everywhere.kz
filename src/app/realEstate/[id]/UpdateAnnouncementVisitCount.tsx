'use client';

import { UUID } from 'crypto';
import { getCookie, setCookie } from 'cookies-next';
import { useEffect } from 'react';

export const UpdateRealEstateViewCount = ({ id }: { id: UUID }) => {
    useEffect(() => {
        const ViewedRealEstatesFromCookie = getCookie('ViewedRealEstates');
        const updateRealEstateViewCount = async () => {
            const viewedRealEstates = JSON.parse(ViewedRealEstatesFromCookie as string);

            if (viewedRealEstates?.includes(id)) {
                console.log(`Объявление с ID ${id} уже просмотрено.`);
                return null;
            }

            const res = await fetch(
                process.env.NEXT_PUBLIC_EVENTS_URL + 'realEstates/increaseRealEstateViewCount',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        realEstateId: id,
                    }),
                    cache: 'no-store',
                }
            );

            if (!res.ok) {
                console.log('Increase view count error: ', res);
                return 'error';
            }

            viewedRealEstates.push(id);
            setCookie('ViewedRealEstates', viewedRealEstates);

            return 'success';
        };
        updateRealEstateViewCount();
    }, [id]);

    return null;
};
