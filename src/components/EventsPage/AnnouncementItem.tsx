'use client';

import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

import { formatPrice } from '@/functions';
import { getNameLanguage } from '@/functions/getNameLanguage';
import notFoundImage from '../../assets/image-missing.jpg';

interface AnnouncementItemComponentProps {
    announcement: any;
    locale: any;
    lookingFor: any;
    userLang: any;
}

const AnnouncementItem: React.FC<AnnouncementItemComponentProps> = ({ announcement, locale }) => {
    const image = announcement.AnnouncementImages[0]?.imageUrl ?? notFoundImage.src;
    return (
        <Link
            href={`/announcement/${announcement.id}`}
            target="_blank"
            className="dark:text-white dark:border-white border-black border-2 p-2 rounded"
        >
            <div className="md:hidden flex flex-row text-xl items-center gap-2">
                <b>{formatPrice(announcement.price)}тг</b>
            </div>
            <div className="md:hidden flex text-base pb-2 border-b-2 dark:border-white border-black">
                {announcement.title}
            </div>
            <div className="grid md:grid-cols-[30%_1fr] grid-cols-[40%_1fr] md:gap-4 gap-2 pt-2 md:pt-0">
                <div className="relative aspect-[3/2] md:pr-4 pr-2 border-r-2 border-black dark:border-white">
                    <img src={image} alt="Announcement Image" className="object-cover w-full h-full rounded" />
                </div>
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="md:flex hidden text-xl pb-0 border-b-0 border-transparent dark:border-white">
                            {announcement.title}
                        </div>
                        <div className="flex flex-row flex-wrap gap-2 md:pb-0 md:border-b-0 border-black dark:border-white">
                            <div className="md:text-base text-xs flex md:flex-row flex-col items-center border-2 dark:border-white border-black rounded px-1 gap-1">
                                <span className="hidden md:flex">
                                    {locale.EventListPage.FilterColumn.MethodOfPlacement}:
                                </span>
                                <b>{announcement.AdPlacement[getNameLanguage()]}</b>
                            </div>
                            <div className="md:text-base text-xs flex md:flex-row flex-col items-center border-2 dark:border-white border-black rounded px-1 gap-1">
                                <span className="hidden md:flex">{locale.EventListPage.FilterColumn.City}:</span>
                                <b>{announcement.City[getNameLanguage()]}</b>
                            </div>
                            {announcement.announcementTypeCode !== 'promoter' ? (
                                <div className="md:text-base flex md:flex-row flex-col items-center text-xs border-2 dark:border-white border-black rounded px-1 gap-1">
                                    <span className="hidden md:flex">
                                        {locale.EventListPage.FilterColumn.Industry}:
                                    </span>
                                    <b>{announcement.BusinessField[getNameLanguage()]}</b>
                                </div>
                            ) : null}
                        </div>
                        <div className="md:flex hidden flex-row md:text-xl text-sm items-center gap-2">
                            <span>{locale.EventListPage.FilterColumn.Payment}:</span>
                            <b>{formatPrice(announcement.price)}тг</b>
                        </div>
                    </div>
                    <div className="md:flex hidden justify-between">
                        <div className="flex flex-row gap-2 items-center">
                            <div className="md:text-base text-sm">{announcement.User.name}</div>
                            <Image
                                src={announcement.User.imageUrl}
                                width={20}
                                height={20}
                                alt="company logo"
                                className="rounded-full h-6 w-6 border border-black"
                            />
                        </div>
                        <div className="text-sm text-gray-600">
                            {moment(announcement.createdAt).format('DD.MM.YYYY')}
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-2 mt-2 border-t-2 border-black dark:border-white flex md:hidden justify-between">
                <div className="flex flex-row gap-2 items-center">
                    <div className="md:text-base text-sm">{announcement.User.name}</div>
                    <Image
                        src={announcement.User.imageUrl}
                        width={20}
                        height={20}
                        alt="company logo"
                        className="rounded-full h-6 w-6 border border-black"
                    />
                </div>
                <div className="text-sm text-gray-600">{moment(announcement.createdAt).format('DD.MM.YYYY')}</div>
            </div>
        </Link>
    );
};

export default AnnouncementItem;
