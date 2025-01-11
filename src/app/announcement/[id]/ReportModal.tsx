'use client';

import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';

import { getNameLanguage } from '@/functions/getNameLanguage';

import 'react-phone-input-2/lib/style.css';

import { UUID } from 'crypto';

interface ReportModalInterface {
    reportTypes: any[];
    announcementId: UUID;
    locale: any;
}

export const ReportModal: React.FC<ReportModalInterface> = ({ locale, reportTypes, announcementId }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [reason, setReason] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const handleOpen = () => {
        setIsOpen(true);
        document.documentElement.classList.toggle('overflow-hidden', true);
    };

    const handleClose = () => {
        setIsOpen(false);
        document.documentElement.classList.toggle('overflow-hidden', false);
        setReason(''); // Очистка полей при закрытии
        setDescription('');
        setPhoneNumber('');
        setIsSubmitted(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            reportTypeCode: reason,
            description,
            announcementId,
            contactPhoneNumber: phoneNumber.substring(1),
        };

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_EVENTS_URL + 'reports/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                setIsSubmitted(true);
                setTimeout(() => {
                    handleClose();
                }, 3000);
            }
        } catch (error) {
            console.error('Error uploading announcement:', error);
        } finally {
        }
    };

    const isFormValid = reason && description.length > 10 && phoneNumber.length === 11;

    return (
        <>
            <button onClick={handleOpen} className="border border-white rounded px-1 bg-red-700 text-white">
                {locale.EventPage.Report.Title}
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-black">
                    <div className="bg-white p-5 rounded-md max-w-lg w-full">
                        {!isSubmitted ? (
                            <>
                                <h2 className="text-lg font-bold mb-4">{locale.EventPage.Report.Title}</h2>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                    <div className="mb-4 relative">
                                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                                            {locale.EventPage.Report.Reason}
                                        </label>
                                        <select
                                            id="reason"
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        >
                                            <option value="">{locale.EventPage.Report.SelectTheReason}</option>
                                            {reportTypes.map((reportType) => {
                                                return (
                                                    <option key={reportType.code} value={reportType.code}>
                                                        {reportType[getNameLanguage()]}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        {!reason && (
                                            <p className="text-red-500 text-sm absolute">
                                                {locale.EventPage.Report.Error.NoReason}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-4 relative">
                                        <label
                                            htmlFor="description"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            {locale.EventPage.Report.Description}
                                        </label>
                                        <textarea
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            rows={4}
                                            placeholder={locale.EventPage.Report.DescriptionPlaceholder}
                                            required
                                        />
                                        {description.length <= 10 && (
                                            <p className="text-red-500 text-sm absolute">
                                                {locale.EventPage.Report.Error.ShortDescription}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-4 relative">
                                        <label
                                            htmlFor="phoneNumber"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            {locale.EventPage.Report.ContactNumber}
                                        </label>
                                        <PhoneInput
                                            containerClass="text-black w-full"
                                            onlyCountries={['kz']}
                                            country={'kz'}
                                            value={phoneNumber}
                                            onChange={(phone) => setPhoneNumber(phone)}
                                            placeholder="+7-(776)-115-64-16"
                                            inputProps={{
                                                name: 'phone',
                                                required: true,
                                            }}
                                            disableDropdown
                                            masks={{ kz: '-(...)-...-..-..' }}
                                        />
                                        {phoneNumber.length < 11 && (
                                            <p className="text-red-500 text-sm absolute">
                                                {locale.EventPage.Report.Error.ShortContactNumber}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={handleClose}
                                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                        >
                                            Отмена
                                        </button>
                                        <button
                                            type="submit"
                                            className={`px-4 py-2 rounded-md text-white ${
                                                isFormValid
                                                    ? 'bg-red-600 hover:bg-red-700'
                                                    : 'bg-red-300 cursor-not-allowed'
                                            }`}
                                            disabled={!isFormValid}
                                        >
                                            Отправить
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className="text-center">
                                <p className="text-green-600 font-bold">{locale.EventPage.Report.Success.ReportSend}</p>
                                <p>{locale.EventPage.Report.Success.ContactYou}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
