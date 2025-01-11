'use client';

import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getCookie } from '@/functions';
import { getNameLanguage } from '@/functions/getNameLanguage';
import { IMyAnnouncement } from '@/interfaces/Announcement';
import ConfirmModal from './ConfirmModal';
import MyAnnouncementItem from './MyAnnouncementItem';

const MyAnnouncementList: React.FC<any> = ({ locale, lookingFor }) => {
    const [announcements, setAnnouncements] = useState<IMyAnnouncement[]>([]);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>({});
    const [statuses, setStatuses] = useState<any[]>([]);
    const [selectedStatusCode, setSelectedStatusCode] = useState<string>('active');
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const getUserId = () => {
        const token = getCookie('accessToken');
        if (token) {
            const decodedToken: any = jwtDecode(token);
            return decodedToken.id;
        } else {
            return null;
        }
    };

    const getButtons = (announcement: any) => {
        switch (selectedStatusCode) {
            case 'active':
                return (
                    <>
                        <button
                            className="text-center border-2 rounded w-full dark:border-white bg-blue-600 text-white border-transparent"
                            onClick={() => (window.location.href = `edit/${announcement.id}`)}
                        >
                            {locale.Common.ToEdit}
                        </button>
                        <button
                            className="border-2 rounded w-full dark:border-white bg-red-700 text-white border-transparent"
                            onClick={() => handleFilterToggle(announcement)}
                        >
                            {locale.Common.ToArhibve}
                        </button>
                    </>
                );
            case 'archived':
                return (
                    <>
                        <button
                            className="border-2 rounded w-full dark:border-white bg-green-600 text-white border-transparent"
                            onClick={() => toPublish(announcement)}
                        >
                            {locale.Common.ToPublic}
                        </button>
                        <button
                            className="border-2 rounded w-full dark:border-white bg-blue-600 text-white border-transparent"
                            onClick={() => (window.location.href = `edit/${announcement.id}`)}
                        >
                            {locale.Common.ToEdit}
                        </button>
                    </>
                );
            case 'pending':
                return (
                    <button
                        className="border-2 rounded w-full dark:border-white bg-blue-600 text-white border-transparent"
                        onClick={() => (window.location.href = `edit/${announcement.id}`)}
                    >
                        {locale.Common.ToEdit}
                    </button>
                );
            case 'rejected':
                return (
                    <button
                        className="border-2 rounded w-full dark:border-white bg-blue-600 text-white border-transparent"
                        onClick={() => (window.location.href = `edit/${announcement.id}`)}
                    >
                        {locale.Common.ToEdit}
                    </button>
                );
        }
    };

    const handleFilterToggle = (announcement: any) => {
        setIsModalVisible(true);
        setSelectedAnnouncement(announcement);
        document.documentElement.classList.toggle('overflow-hidden', true);
    };

    const closeModal = () => {
        document.documentElement.classList.toggle('overflow-hidden', false);
        setIsModalVisible(false);
    };

    const createStatusArray = (announcementList: any[]) => {
        let statusList: any[] = [];
        announcementList.forEach((announcement, i) => {
            if (i === 0) setSelectedStatusCode(announcement.AnnouncementStatus.code);
            const status = statusList?.find((s) => s?.code === announcement?.statusCode);
            if (status) {
                status.count += 1;
            } else {
                statusList.push({
                    code: announcement.AnnouncementStatus.code,
                    title: announcement.AnnouncementStatus[getNameLanguage()],
                    count: 1,
                });
            }
        });
        setStatuses(statusList);
    };

    const fetchAnnouncements = async () => {
        try {
            setLoading(true);
            const res = await fetch(
                process.env.NEXT_PUBLIC_EVENTS_URL + `/announcements/getAllForAuthor/${getUserId()}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getCookie('accessToken')}`,
                        'Cache-Control': 'no-store',
                        Accept: 'application/json',
                    },
                    credentials: 'include',
                }
            );

            if (!res.ok) {
                if (res.status === 401) {
                    // window.location.href = '/';
                }
                throw new Error(`Failed to fetch data. Status: ${res.status}`);
            }

            const data = await res.json();
            createStatusArray(data);
            setAnnouncements(data);
        } catch (error) {
            console.error(`Error while taking data:`, error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const toPublish = async (announcement: any) => {
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_EVENTS_URL + `/announcements`, {
                method: 'PUT',
                body: JSON.stringify({
                    id: announcement.id,
                    statusCode: 'active',
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getCookie('accessToken')}`,
                },
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch data. Status: ${res.status}`);
            }

            const data = await res.json();
        } catch (error) {
            console.error(`Error while taking data:`, error);
            return [];
        } finally {
            fetchAnnouncements();
        }
    };

    const toArchivate = async () => {
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_EVENTS_URL + `/announcements`, {
                method: 'PUT',
                body: JSON.stringify({
                    id: selectedAnnouncement.id,
                    statusCode: 'archived',
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getCookie('accessToken')}`,
                },
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch data. Status: ${res.status}`);
            }

            const data = await res.json();
        } catch (error) {
            console.error(`Error while taking data:`, error);
            return [];
        } finally {
            fetchAnnouncements();
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2 md:justify-between">
                <div className="flex gap-2">
                    <h2 className="text-xl">{locale.MyAnnouncements.Title}</h2>
                </div>
                <button className="bg-blue-600 rounded text-white text-lg w-10 h-10 md:w-fit md:h-fit md:px-4 md:py-1">
                    <Link href="/announcement/create">
                        <span className="md:hidden flex text-center items-center justify-center">+</span>
                        <span className="md:flex hidden">{locale.Common.CreateAnnouncement}</span>
                    </Link>
                </button>
            </div>
            {loading ? (
                <div className="flex items-center gap-4">
                    {Array.from({ length: 3 }).map((_, i) => {
                        return (
                            <div key={i} className="bg-gray-300 dark:bg-gray-700 rounded w-28 h-10 animate-pulse"></div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-row flex-nowrap items-center justify-start gap-4 overflow-x-auto scrollbar-hide w-full">
                    {statuses.map((status, index) => (
                        <button
                            key={index}
                            className={`text-white text-nowrap px-4 py-2 rounded whitespace-nowrap ${
                                status.code === selectedStatusCode ? 'bg-gray-700' : 'bg-gray-400'
                            }`}
                            onClick={() => setSelectedStatusCode(status.code)}
                        >
                            {status.title} - {status.count}
                        </button>
                    ))}
                </div>
            )}
            {loading ? (
                <div className="flex flex-col gap-4">
                    {Array.from({ length: 10 }).map((_, i) => {
                        return (
                            <div
                                key={i}
                                className="border-2 p-4 flex justify-between md:flex-row flex-col gap-2 dark:border-white border-black animate-pulse rounded"
                            >
                                <div className="flex flex-col justify-between gap-2 w-full">
                                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                                    <div className="flex flex-row gap-2 flex-wrap">
                                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                                    </div>
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                                </div>
                                <div className="flex flex-col gap-2 w-full md:w-1/6">
                                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {announcements
                        .filter((x) => x.statusCode === selectedStatusCode)
                        .map((announcement) => {
                            return (
                                <MyAnnouncementItem
                                    key={announcement.id}
                                    getButtons={getButtons}
                                    selectedStatusCode={selectedStatusCode}
                                    getNameLanguage={getNameLanguage}
                                    announcement={announcement}
                                    locale={locale}
                                />
                            );
                        })}
                </div>
            )}
            {isModalVisible && <ConfirmModal locale={locale} closeModal={closeModal} toArchivate={toArchivate} />}
        </div>
    );
};

export default MyAnnouncementList;
