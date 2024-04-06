import { CookieValueTypes } from 'cookies-next';
import Link from 'next/link';

import { isEmpty } from '@/functions';
import { EventInList } from '@/types/EventInList';
import EventCard from './EventCard';

import 'swiper/css';
import 'swiper/css/pagination';

import EventsByCategoryDesktop from './EventsByCategoryDesktop';

interface EventsByCategoryProps {
    UserLang: CookieValueTypes;
    UserCityId: CookieValueTypes;
    startDate: string;
    period: string;
    category: any;
    GetEvents: (startDate: string, period: string, categoryCode?: string) => Promise<EventInList[] | undefined>;
}

const EventsByCategory = async ({
    UserLang,
    UserCityId,
    category,
    GetEvents,
    startDate,
    period,
}: EventsByCategoryProps) => {
    const data = await GetEvents(startDate, period, category?.code);

    if (data && !isEmpty(data)) {
        return (
            <>
                <div className="lg:hidden flex flex-col gap-4 -mx-4">
                    <div className="flex w-full gap-2 justify-between items-center px-4">
                        <div className="flex gap-2 items-center">
                            {category.icon && <div>{category.icon}</div>}
                            <h6 className="text-lg font-semibold dark:text-white">{category.name}</h6>
                        </div>
                        <Link
                            href={'/category/' + category.code}
                            className="bg-white border-[1px] px-3 py-1 border-[#D9D9D9] h-fit rounded-2xl text-sm"
                        >
                            Показать все
                        </Link>
                    </div>
                    <div className="flex w-full overflow-x-auto gap-6 px-4">
                        {data.map((event, i: number) => {
                            return <EventCard key={i} UserLang={UserLang} UserCityId={UserCityId} data={event} />;
                        })}
                    </div>
                </div>
                <div className="lg:block hidden">
                    <EventsByCategoryDesktop
                        category={category}
                        data={data}
                        UserLang={UserLang}
                        UserCityId={UserCityId}
                    />
                </div>
            </>
        );
    } else {
        return <></>;
    }
};
export default EventsByCategory;
