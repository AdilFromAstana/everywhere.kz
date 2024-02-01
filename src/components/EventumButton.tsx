'use client';

import React from 'react';

interface EventumProps {
    data: any;
    locale: any;
}

const EventumButton = ({ data, locale }: EventumProps) => {
    const buyTicketFromEventum = () => {
        if (data) {
            //@ts-expect-error: Frontend
            EVENTUM.init(['modal-eventum', data.Id, data?.Mode, data.Reference, data?.SeanceId, 'ru']);
        }
    };
    return (
        <button
            onClick={() => buyTicketFromEventum()}
            className="buy-button z-0 cursor-pointer bg-sky-500 lg:w-56 w-full px-2 py-2 lg:px-6 lg:py-4 rounded-xl text-base lg:text-xl font-bold text-white transition duration-500 hover:shadow-2xl"
        >
            {locale.EventPage.BuyTicket}
        </button>
    );
};

export default EventumButton;
