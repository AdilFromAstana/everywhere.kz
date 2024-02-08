// import { getCookie } from 'cookies-next';
// import { cookies } from 'next/headers';
import { Metadata } from 'next';

import OfferForm from '@/components/OfferForm';
import Parallax from './components/Parallax';

const services = [
    {
        name: 'Email- рассылка по базе',
        budget: '-',
        conditions: 'Сегментированная emal-рассылка по базе клиентов',
        price: '₸ 10 000',
    },
    {
        name: 'Реклама во всех digital каналах',
        budget: 'До ₸ 500 000',
        conditions: 'Facebook, Instagram, Youtube, Google (КМС: банерная реклама), TikTok, Vkontakte, Odnoklassniki',
        price: '₸ 50 000',
    },
    {
        name: 'Реклама во всех digital каналах',
        budget: 'До ₸ 1 000 000',
        conditions: 'Facebook, Instagram, Youtube, Google (КМС: банерная реклама), TikTok, Vkontakte, Odnoklassniki',
        price: '₸ 100 000',
    },
    {
        name: 'Реклама во всех digital каналах',
        budget: 'От ₸1 000 000 до ₸5 000 000',
        conditions: 'Facebook, Instagram, Youtube, Google (КМС: банерная реклама), TikTok, Vkontakte, Odnoklassniki',
        price: '10% от бюджета',
    },
    {
        name: 'Реклама во всех digital каналах',
        budget: 'От ₸5 000 000',
        conditions: 'Facebook, Instagram, Youtube, Google (КМС: банерная реклама), TikTok, Vkontakte, Odnoklassniki',
        price: '7% от бюджета',
    },
    {
        name: 'Разработка стратегии продвижения',
        budget: '-',
        conditions:
            'Разработка коммуникационной стратегии и подбор нужных площадок, включая СМИ, паблики и инфлюенсеров',
        price: 'от ₸ 100 000',
    },
    {
        name: 'Разработка вижуалов и видеоконтента',
        budget: '-',
        conditions: 'Разработка вижуалов и видеороликов с адаптацией под все площадки',
        price: 'от ₸50 000',
    },
    {
        name: 'Публикации в пабликах',
        budget: '-',
        conditions: 'В стоимость включено взаимодействие с площадками',
        price: '-20% от официальной стоимости',
    },
    {
        name: 'СМИ и инфлюенсеры',
        budget: '-',
        conditions: 'В стоимость включено взаимодействие со СМИ и инфлюенсерами',
        price: '-10% от официальной стоимости',
    },
    {
        name: 'Наружная реклама',
        budget: '-',
        conditions: 'В стоимость включено взаимодействие с площадками',
        price: 'скидки до 50% в зависимости от бюджета',
    },
];

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Kazticket.kz - Информация для Организаторов`,
        description:
            'Kazticket.kz: Присоединяйтесь к ведущему билетному сервису в Казахстане. Узнайте, как наши услуги могут помочь организовать и продвинуть ваше мероприятие. Получите индивидуальное КП, ознакомьтесь с нашими достижениями и свяжитесь с нами для успешного сотрудничества',
    };
}

export default async function OfferPage() {
    // const UserLang = getCookie('UserLang', { cookies });

    return (
        <>
            <Parallax />
            <div className="h100 flex flex-col gap-10 lg:px-20 px-5 mb-10 lg:overflow-x-hidden overflow-x-scroll">
                <table className="font-['Gilroy']  border-spacing-8 border-separate text-xs font-medium">
                    <thead>
                        <tr>
                            <th>Услуга</th>
                            <th>Бюджет рекламных компаний</th>
                            <th>Условия</th>
                            <th>Стоимость услуг</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((x, index) => {
                            return (
                                <tr key={index}>
                                    <td className="w-1/4 text-[#9A9595]">{x.name}</td>
                                    <td className="w-1/4 text-[#9A9595]">{x.budget}</td>
                                    <td className="w-1/4 text-[#9A9595]">{x.conditions}</td>
                                    <td className="w-1/4 text-[#9A9595]">{x.price}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div
                id="form"
                className="h100 flex flex-col gap-10 lg:px-20 px-5 py-10 mb-10 lg:overflow-x-hidden overflow-x-scroll relative"
            >
                <div className="h-40 w-40 absolute left-10 bottom-0 -z-10 bg-[#FFF5DB] rounded-bl-[85px]"></div>
                <svg
                    className="h-40 w-40 absolute right-10 top-0 -z-10"
                    width="175"
                    height="154"
                    viewBox="0 0 175 154"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="3.5" cy="3.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="3.5" cy="24.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="3.5" cy="45.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="3.5" cy="66.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="3.5" cy="87.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="3.5" cy="108.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="3.5" cy="129.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="3.5" cy="150.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="24.5" cy="3.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="24.5" cy="24.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="24.5" cy="45.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="24.5" cy="66.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="24.5" cy="87.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="24.5" cy="108.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="24.5" cy="129.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="24.5" cy="150.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="45.5" cy="3.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="45.5" cy="24.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="45.5" cy="45.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="45.5" cy="66.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="45.5" cy="87.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="45.5" cy="108.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="45.5" cy="129.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="45.5" cy="150.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="66.5" cy="3.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="66.5" cy="24.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="66.5" cy="45.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="66.5" cy="66.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="66.5" cy="87.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="66.5" cy="108.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="66.5" cy="129.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="66.5" cy="150.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="87.5" cy="3.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="87.5" cy="24.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="87.5" cy="45.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="87.5" cy="66.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="87.5" cy="87.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="87.5" cy="108.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="87.5" cy="129.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="87.5" cy="150.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="108.5" cy="3.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="108.5" cy="24.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="108.5" cy="45.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="108.5" cy="66.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="108.5" cy="87.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="108.5" cy="108.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="108.5" cy="129.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="108.5" cy="150.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="129.5" cy="3.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="129.5" cy="24.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="129.5" cy="45.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="129.5" cy="66.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="129.5" cy="87.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="129.5" cy="108.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="129.5" cy="129.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="129.5" cy="150.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="150.5" cy="3.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="150.5" cy="24.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="150.5" cy="45.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="150.5" cy="66.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="150.5" cy="87.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="150.5" cy="108.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="150.5" cy="129.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="150.5" cy="150.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="171.5" cy="3.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="171.5" cy="24.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="171.5" cy="45.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="171.5" cy="66.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="171.5" cy="87.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="171.5" cy="108.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="171.5" cy="129.5" r="3.5" fill="#DFEEFF" />
                    <circle cx="171.5" cy="150.5" r="3.5" fill="#DFEEFF" />
                </svg>

                <div className="font-['Gilroy'] w-full h-80 flex lg:flex-row flex-col justify-between items-center bg-[#F4F9FF] lg:rounded-[75px] rounded-[25px]">
                    <div className="lg:text-5xl text-2xl font-bold lg:mx-20 mx-0 lg:my-0 my-10">Стать партнером</div>
                    <div className="lg:h-80 h-96 bg-[#0490C3] lg:w-2/5 w-full lg:rounded-[75px] rounded-[25px] flex flex-col justify-center items-center">
                        <OfferForm />
                    </div>
                </div>
            </div>
        </>
    );
}
