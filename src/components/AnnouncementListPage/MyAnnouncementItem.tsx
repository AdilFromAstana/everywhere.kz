import moment from 'moment';
import Link from 'next/link';

import { formatPrice } from '@/functions';
import notFoundImage from '../../assets/image-missing.jpg';

interface IMyAnnouncementItem {
    locale: any;
    selectedStatusCode: any;
    announcement: any;
    getNameLanguage: any;
    getButtons: any;
}

const MyAnnouncementItem: React.FC<IMyAnnouncementItem> = ({
    locale,
    selectedStatusCode,
    announcement,
    getNameLanguage,
    getButtons,
}) => {
    const image = announcement.AnnouncementImages[0]?.imageUrl ?? notFoundImage.src;
    return (
        <div
            className={`md:p-4 p-2 grid ${
                selectedStatusCode === 'active' ? 'grid-cols-[25%_1fr_30%]' : 'grid-cols-[25%_1fr]'
            } border-2 dark:border-white border-black gap-4 rounded`}
        >
            <div className="relative aspect-[3/2] pr-4 border-r-2 border-black dark:border-white">
                <img src={image} alt="Announcement Image" className="object-cover w-full h-full rounded" />
            </div>
            <div className="flex flex-col justify-between">
                <div className="flex flex-col justify-between gap-2">
                    <Link
                        href={`/announcement/${announcement.id}`}
                        target="_blank"
                        onClick={(e) => {
                            if (selectedStatusCode !== 'active') e.preventDefault();
                        }}
                        className={`md:text-xl text-lg md:pb-0 pb-2 md:border-b-0 border-b-2 md:border-transparent dark:border-white border-black ${
                            selectedStatusCode !== 'active' ? 'cursor-default' : 'cursor-pointer'
                        }`}
                    >
                        {announcement.title}
                    </Link>
                    <div className="flex flex-row flex-wrap gap-2 md:pb-0 pb-2 md:border-b-0 border-b-2 md:border-transparent dark:border-white border-black">
                        <div className="md:text-md flex items-center text-sm border-2 dark:border-white border-black rounded px-1 gap-1">
                            <b>{announcement.AnnouncementType[getNameLanguage()]}</b>
                        </div>
                        <div className="md:text-md flex items-center text-sm border-2 dark:border-white border-black rounded px-1 gap-1">
                            <span>{locale.EventListPage.FilterColumn.MethodOfPlacement}:</span>
                            <b>{announcement.AdPlacement[getNameLanguage()]}</b>
                        </div>
                        <div className="md:text-md flex items-center text-sm border-2 dark:border-white border-black rounded px-1 gap-1">
                            <span>{locale.EventListPage.FilterColumn.City}:</span>
                            <b>{announcement.City[getNameLanguage()]}</b>
                        </div>
                    </div>
                    <div className="text-xl flex flex-row items-center gap-2">
                        <span>{locale.EventListPage.FilterColumn.Payment}:</span>
                        <b>{formatPrice(announcement.price)}тг</b>
                    </div>
                    <div className="flex flex-row items-center gap-2 text-sm">
                        <span>{locale.Common.Created}:</span>
                        <b>{moment(announcement.createdAt).format('DD.MM.YYYY')}</b>
                    </div>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-4 gap-2">{getButtons(announcement)}</div>
            </div>
            <div
                className={`${
                    selectedStatusCode === 'active' ? 'block' : 'hidden'
                } pl-4 border-l-2 border-black dark:border-white`}
            >
                <table className="w-full text-sm table-auto border-separate border-spacing-y-2">
                    <thead>
                        <tr>
                            <th className="text-left font-semibold">{locale.MyAnnouncements.AnnouncementStatistics}</th>
                            <th className="text-right font-semibold">{locale.MyAnnouncements.ForAllTime}</th>
                            <th className="text-right font-semibold">{locale.MyAnnouncements.ForToday}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{locale.MyAnnouncements.AnnouncementViews}</td>
                            <td className="text-right">{announcement.announcementViewCount || '-'}</td>
                            <td className="text-right">
                                {announcement.AnnouncementViewCounts.length > 0
                                    ? `+${announcement.AnnouncementViewCounts.length}`
                                    : '-'}
                            </td>
                        </tr>
                        <tr>
                            <td>{locale.MyAnnouncements.AnnouncementNumberViews}</td>
                            <td className="text-right">{announcement.contactPhoneNumberViewCount || '-'}</td>
                            <td className="text-right">
                                {announcement.AnnouncementPhoneViewCounts.length > 0
                                    ? `+${announcement.AnnouncementPhoneViewCounts.length}`
                                    : '-'}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default MyAnnouncementItem;
