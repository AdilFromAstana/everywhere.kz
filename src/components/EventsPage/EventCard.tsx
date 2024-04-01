import { CookieValueTypes } from 'cookies-next';
// import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import EmptyPoster from '@/assets/empty-poster.svg';
import SoldOut from '@/assets/soldout.svg';
import EventStatuses from '@/constants/EventStatuses.json';
import { isEmpty } from '@/functions';
import { EventInList } from '@/types/EventInList';
import EventDateInfo from '../EventDateInfo';

interface EventCardProps {
    data: EventInList;
    UserCityId: CookieValueTypes;
}

const EmptyPlaceholder =
    'UklGRowCAABXRUJQVlA4TH8CAAAv+YAjEMegoG0bafw5z7mHBIGkzft3viOQtHn/zncCgSR/yk3OaoAKVABgfwAVgMqHCsBswbdt21Zb27YVay9dmItxl5qolP7/v6obDiJU+m0MR/R/AvLH/z/+/w/uc9/t7FCbabS/5dpIiz2ORvraJb/aaMbnsqsfOLfTnLva/181566Ivh6x0d24Hq/Zw7IerkAJGI/WFVHzC3FMvsa5bnVGn5m/HZTlhLhutCDWXPD7EendlrpNFkRX0B+Q2f1uo08PSz0ggQ6mbXJ4MOfxmBB1QKnb5Bzornk8lsCca6DbKHNd1tyy/XpEZl5g2mrr5lvgKzNzhOuR+kCfd084rcdphnpvKRiOU2DMh59wOUoToj7KDrFuMH90Qz0aS2DOJ5eC4bUBoh6MHpFPf8Llldnd7lgscH4uPxDrc0u5ZzoUHfp8cS34eC4QPUo9EDPUV/IC0zMj1DyhOxCBMV8fUOqjM4yZV5gOw4ioG6yB7sES6DIzR5R6EJbAnFteYLrXI+rNGugOQo/IbQeUejPCnHcvMB2CBX5ttAZOmbnAkA8HlHoETuhz6yuMuQYiH6+B7gDMUDfLT7gOUJ/IC0ztFxjzGzsUmPLpAaW23ohYv2Mp7vb5/BroGm8pmPNbP+9EfSEvMLVdj8hvHgtdzZcHlNpyC9TvyvW85IZroGu5E/p80wtM7TZDfZccUGqzBcZ82zXQtdqIyDe+wNRmC8zvlANKbbIekW+9BroWW6C+V15garBAn+8+oNTmmqG+3Rromisw5vtf4I/GOiFyDweUj7a6nXdhDffbKs77ODbZ3v5qo7XsUWQjz2V/orZSLlO/s9OaP/7/8f9/dv554AEA';

// const EventDateInfo = dynamic(() => import('@/components/EventDateInfo'), {
//     ssr: false,
//     loading() {
//         return <div className="h-4 w-1/3 rounded-lg mr-1 animate-pulse bg-gray-200"></div>;
//     },
// });

const EventCard = ({ data, UserCityId }: EventCardProps) => {
    return (
        <div key={data.id} className="w-full">
            <Link href={'/event/' + data.code} title={data.name}>
                <div className="flex flex-col gap-2 w-full cursor-pointer rounded-xl">
                    <div className="relative rounded-xl overflow-hidden md:hover:shadow-xl transition duration-200">
                        <Image
                            alt={data.name}
                            width={380}
                            height={220}
                            placeholder={`data:image/webp;base64,${EmptyPlaceholder}`}
                            className="data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-100/10 w-full object-contain hover:scale-105 transition duration-200"
                            src={
                                isEmpty(data.posterFileUrl) || data.posterFileUrl === 'https://NOPOSTER.jpg'
                                    ? EmptyPoster
                                    : data.posterFileUrl
                            }
                        />
                        {data.statusId === EventStatuses.SoldOut && (
                            <Image
                                alt={data.name}
                                height={220}
                                width={380}
                                className="p-1 absolute z-10 top-0 object-contain bg-[rgba(0,0,0,0.3)]"
                                src={SoldOut}
                            />
                        )}
                        {/* <LikeButton eventId={data.id} /> */}
                        <div className="bg-[#FFF] dark:bg-[#000000] shadow-md backdrop-blur-sm px-3 absolute left-3 bottom-3 rounded-md">
                            <span className="text-lg font-medium text-black dark:text-white">
                                от {data.minCost} тг.
                            </span>
                        </div>
                        <div className="bg-[#FFF] dark:bg-[#000000] shadow-md backdrop-blur-sm px-3 absolute right-3 bottom-3 rounded-md">
                            <span className="text-lg font-medium text-black dark:text-white">{data.ageLimit}+</span>
                        </div>
                    </div>
                    <div>
                        <h1 className="mb-1 md:text-2xl text-xl leading-tight font-bold text-[#2F2F38D9] dark:text-white">
                            {data.name}
                        </h1>
                        <h3 className="text-[#00000073] font-medium dark:text-white flex items-center">
                            <EventDateInfo cityTimeZone={data.cityTimeZone} date={data.beginDate} />
                            {isEmpty(UserCityId) || parseInt(UserCityId ?? '0') === 0 ? <> - {data.cityName}</> : ''}
                        </h3>
                    </div>
                </div>
            </Link>
        </div>
    );
};
export default EventCard;
