'use client';

import React from 'react';

interface ButtonProps {
    eventId: string;
    eventCode: string;
    locale: any;
}

const KazticketButton = ({ eventId, eventCode, locale }: ButtonProps) => {
    const buyTicketFromKazticket = () => {
        if (eventId && eventCode) {
            //@ts-expect-error: Frontend
            window.kztw.create([eventId, eventCode]);
        }
    };
    return (
        <button
            onClick={() => buyTicketFromKazticket()}
            className="kazticket-buy-button z-0 cursor-pointer bg-sky-500 lg:w-56 w-full px-2 py-2 lg:px-6 lg:py-4 rounded-xl text-base lg:text-xl font-bold text-white transition duration-500 hover:shadow-2xl"
        >
            {locale.EventPage.BuyTicket}
        </button>
    );
};

export default KazticketButton;
