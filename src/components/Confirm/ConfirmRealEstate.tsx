'use client';

import moment from 'moment';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';

type ImageFile = File & {
    preview: string;
};

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
const ConfirmRealEstate = () => {
    const [realEstates, setRealEstates] = useState<any[]>([]);

    useEffect(() => {
        const fetchAllData = async () => {
            const fetchedRealEstates = await fetchData(process.env.NEXT_PUBLIC_EVENTS_URL + '/RealEstates');
            setRealEstates(fetchedRealEstates);
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
                {realEstates.map((realEstate) => {
                    return (
                        <div className="border-y-2 p-4">
                            <h2 className="text-xl">{realEstate.title}</h2>
                            <div>{moment(realEstate.createdAt).calendar()}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ConfirmRealEstate;
