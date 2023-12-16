import Link from 'next/link';

export default async function ContactsPage() {
    return (
        <section className="py-12 bg-white overflow-hidden">
            {/* <div className="relative container px-4 mx-auto"> */}
            <h2 className="mb-5 text-5xl md:text-6xl xl:text-6xl text-center font-bold font-heading tracking-px-n leading-none">
                Контакты и реквизиты
            </h2>
            <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                    <div className="p-11 h-full text-center bg-white bg-opacity-90 border border-blueGray-100 rounded-xl shadow-11xl">
                        <div className="mb-6 relative mx-auto w-16 h-16 bg-white border border-blueGray-200 rounded-full flex items-center justify-center">
                            <svg
                                width="32"
                                height="33"
                                viewBox="0 0 32 33"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4 7.16667C4 5.69391 5.19391 4.5 6.66667 4.5H11.039C11.6129 4.5 12.1224 4.86724 12.3039 5.4117L14.301 11.4029C14.5108 12.0324 14.2258 12.7204 13.6324 13.0172L10.6227 14.522C12.0923 17.7816 14.7184 20.4077 17.978 21.8773L19.4828 18.8676C19.7796 18.2742 20.4676 17.9892 21.0971 18.199L27.0883 20.1961C27.6328 20.3776 28 20.8871 28 21.461V25.8333C28 27.3061 26.8061 28.5 25.3333 28.5H24C12.9543 28.5 4 19.5457 4 8.5V7.16667Z"
                                    stroke="#4F46E5"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-3 text-xl font-bold font-heading leading-snug">Организация мероприятий</h3>
                        <p className="font-medium text-gray-600">По вопросам организации мероприятий</p>
                        <p className="font-medium leading-relaxed">+7 708 143 74 69</p>
                        <Link className="my-2" href="tel:+77081437469">
                            <div className="text-white mt-2 rounded-md bg-sky-500 px-3 py-2 ">Позвонить</div>
                        </Link>
                        <Link className="my-2" target="_blank" href="https://wa.me/77081437469">
                            <div className="text-white mt-2 rounded-md bg-emerald-500 px-3 py-2 ">WhatsApp</div>
                        </Link>
                    </div>
                </div>
                <div className="w-full md:w-1/3 p-3">
                    <div className="p-11 h-full text-center bg-white bg-opacity-90 border border-blueGray-100 rounded-xl shadow-11xl">
                        <div className="mb-6 relative mx-auto w-16 h-16 bg-white border border-blueGray-200 rounded-full flex items-center justify-center">
                            <svg
                                width="32"
                                height="33"
                                viewBox="0 0 32 33"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4 7.16667C4 5.69391 5.19391 4.5 6.66667 4.5H11.039C11.6129 4.5 12.1224 4.86724 12.3039 5.4117L14.301 11.4029C14.5108 12.0324 14.2258 12.7204 13.6324 13.0172L10.6227 14.522C12.0923 17.7816 14.7184 20.4077 17.978 21.8773L19.4828 18.8676C19.7796 18.2742 20.4676 17.9892 21.0971 18.199L27.0883 20.1961C27.6328 20.3776 28 20.8871 28 21.461V25.8333C28 27.3061 26.8061 28.5 25.3333 28.5H24C12.9543 28.5 4 19.5457 4 8.5V7.16667Z"
                                    stroke="#4F46E5"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-3 text-xl font-bold font-heading leading-snug">Покупка и возврат</h3>
                        <p className="font-medium text-gray-600">По вопросам покупки и возврата билетов</p>
                        <p className="font-medium leading-relaxed">+7-771-247-67-48</p>
                        <Link className="my-2" href="tel:+77712476748">
                            <div className="text-white mt-2 rounded-md bg-sky-500 px-3 py-2 ">Позвонить</div>
                        </Link>
                        <Link className="my-2" target="_blank" href="https://wa.me/77712476748">
                            <div className="text-white mt-2 rounded-md bg-emerald-500 px-3 py-2 ">WhatsApp</div>
                        </Link>
                    </div>
                </div>
                <div className="w-full md:w-1/3 p-3">
                    <div className="p-11 h-full text-center bg-white bg-opacity-90 border border-blueGray-100 rounded-xl shadow-11xl">
                        <div className="mb-6 relative mx-auto w-16 h-16 bg-white border border-blueGray-200 rounded-full flex items-center justify-center">
                            <svg
                                width="32"
                                height="33"
                                viewBox="0 0 32 33"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M23.5431 22.7091C22.1797 24.0725 19.192 27.0602 17.4133 28.8389C16.6323 29.62 15.3693 29.6203 14.5883 28.8392C12.8393 27.0903 9.91373 24.1647 8.45818 22.7091C4.29259 18.5435 4.29259 11.7898 8.45818 7.62419C12.6238 3.4586 19.3775 3.4586 23.5431 7.62419C27.7087 11.7898 27.7087 18.5435 23.5431 22.7091Z"
                                    stroke="#4F46E5"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M20.0007 15.1667C20.0007 17.3758 18.2098 19.1667 16.0007 19.1667C13.7915 19.1667 12.0007 17.3758 12.0007 15.1667C12.0007 12.9575 13.7915 11.1667 16.0007 11.1667C18.2098 11.1667 20.0007 12.9575 20.0007 15.1667Z"
                                    stroke="#4F46E5"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-3 text-xl font-bold font-heading leading-snug">ТОО «KAZTICKET.KZ»</h3>
                        <p className="font-medium mx-auto leading-relaxed">БИН 220140006265</p>
                        <p className="font-medium mx-auto leading-relaxed">БИК IRTYKZKA</p>
                        <p className="font-medium mx-auto leading-relaxed">АО«ForteBank»</p>
                        <p className="font-medium mx-auto leading-relaxed">Расчетный счет № KZ3096503F0010868398</p>
                        <p className="font-medium mx-auto leading-relaxed">
                            Республика Казахстан, 010000, г. Астана, Проспект Рақымжан Қошқарбаев, здание 27
                        </p>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </section>
    );
}
