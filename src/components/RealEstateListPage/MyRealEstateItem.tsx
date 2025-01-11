import moment from 'moment';
import Link from 'next/link';

import { formatPrice } from '@/functions';
import notFoundImage from '../../assets/image-missing.jpg';

interface IMyRealEstateItem {
    locale: any;
    selectedStatusCode: any;
    realEstate: any;
    getNameLanguage: any;
    getButtons: any;
}

const MyRealEstateItem: React.FC<IMyRealEstateItem> = ({
    locale,
    selectedStatusCode,
    realEstate,
    getNameLanguage,
    getButtons,
}) => {
    const image = realEstate.RealEstateImages[0]?.imageUrl ?? notFoundImage.src;
    return (
        <div
            className={`md:p-4 p-2 grid ${
                selectedStatusCode === 'active' ? 'grid-cols-[25%_1fr_30%]' : 'grid-cols-[25%_1fr]'
            } border-2 dark:border-white border-black gap-4 rounded`}
        >
            <div className="relative aspect-[3/2] pr-4 border-r-2 border-black dark:border-white">
                <img src={image} alt="RealEstate Image" className="object-cover w-full h-full rounded" />
            </div>
            <div className="flex flex-col justify-between">
                <div className="flex flex-col justify-between gap-2">
                    <Link
                        href={`/realEstate/${realEstate.id}`}
                        target="_blank"
                        onClick={(e) => {
                            if (selectedStatusCode !== 'active') e.preventDefault();
                        }}
                        className={`md:text-xl text-lg md:pb-0 pb-2 md:border-b-0 border-b-2 md:border-transparent dark:border-white border-black ${
                            selectedStatusCode !== 'active' ? 'cursor-default' : 'cursor-pointer'
                        }`}
                    >
                        {realEstate.title}
                    </Link>
                    <div className="flex flex-row flex-wrap gap-2 md:pb-0 pb-2 md:border-b-0 border-b-2 md:border-transparent dark:border-white border-black">
                        <div className="md:text-md flex items-center text-sm border-2 dark:border-white border-black rounded px-1 gap-1">
                            <span>{locale.EventListPage.FilterColumn.City}:</span>
                            <b>{realEstate.City[getNameLanguage()]}</b>
                        </div>
                    </div>
                    <div className="text-xl flex flex-row items-center gap-2">
                        <span>{locale.EventListPage.FilterColumn.Payment}:</span>
                        <b>{formatPrice(realEstate.price)}тг</b>
                    </div>
                    <div className="flex flex-row items-center gap-2 text-sm">
                        <span>{locale.Common.Created}:</span>
                        <b>{moment(realEstate.createdAt).format('DD.MM.YYYY')}</b>
                    </div>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-4 gap-2">{getButtons(realEstate)}</div>
            </div>
            <div
                className={`${
                    selectedStatusCode === 'active' ? 'block' : 'hidden'
                } pl-4 border-l-2 border-black dark:border-white`}
            >
                <table className="w-full text-sm table-auto border-separate border-spacing-y-2">
                    <thead>
                        <tr>
                            <th className="text-left font-semibold">{locale.MyRealEstates.RealEstateStatistics}</th>
                            <th className="text-right font-semibold">{locale.MyRealEstates.ForAllTime}</th>
                            <th className="text-right font-semibold">{locale.MyRealEstates.ForToday}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{locale.MyRealEstates.RealEstateViews}</td>
                            <td className="text-right">{realEstate.realEstateViewCount || '-'}</td>
                            <td className="text-right">
                                {realEstate.RealEstateViewCounts.length > 0
                                    ? `+${realEstate.RealEstateViewCounts.length}`
                                    : '-'}
                            </td>
                        </tr>
                        <tr>
                            <td>{locale.MyRealEstates.RealEstateNumberViews}</td>
                            <td className="text-right">{realEstate.contactPhoneNumberViewCount || '-'}</td>
                            <td className="text-right">
                                {realEstate.RealEstatePhoneViewCounts.length > 0
                                    ? `+${realEstate.RealEstatePhoneViewCounts.length}`
                                    : '-'}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default MyRealEstateItem;
