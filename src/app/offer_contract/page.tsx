import { getCookie } from 'cookies-next';
import moment from 'moment';
import { cookies } from 'next/headers';

export default async function OfferContractPage() {
    const UserLang = getCookie('UserLang', { cookies });

    const ru = (
        <div className="h100">
            <div className="text-4xl my-4">Договор оферты</div>
            <div className="flex flex-col">
                <div className="font-bold text-xl my-3">Публичная оферта</div>
                <div className="text-base my-2">
                    Договор на оказание услуг по реализации и бронировании билетов на театрально-зрелищные, концертные и
                    спортивные мероприятия.
                </div>
                <div className="text-base my-2">
                    Компания ТОО "Kazticket.kz" далее по тексту Исполнитель, посредством сайта:{' '}
                    <a href="https://kazticket.kz/" className="text-sky-500" target="_blank">
                        https://kazticket.kz
                    </a>
                    , публикует настоящий Договор на оказание услуг по реализации и бронированию билетов на
                    театрально-зрелищные, концертные и спортивные мероприятия, являющийся Публичной офертой адресованное
                    всем желающим, как физическим и юридическим лицам далее по тексту Заказчик на заключение договора о
                    нижеследующем:
                </div>
                <div className="font-bold text-xl my-3">Термины и определения:</div>
                <div className="text-base my-2">
                    Оферта - настоящий документ «Публичная оферта» предложение неопределенному кругу лиц о заключении
                    Договора на условиях указанных в договоре;
                    <br />
                    Акцепт - принятие условии договора, путем заказа и оплаты билетов;
                    <br />
                    Услуга - деятельность, направленное на удовлетворение потребностей Заказчика, результаты которого не
                    имеют материального выражения;
                    <br />
                    Мероприятие - концерт, спектакль, а также любое иное театрально-зрелищные и спортивные события;
                    <br />
                    Организатор - физическое или юридическое лицо, предоставляющее квоту мест и другую необходимую
                    информацию, а также являющийся организатором конкретного Мероприятия указанного на сайте
                    Исполнителя, и отвечающего за качество его проведения перед Заказчиком.
                    <br />
                    Заказ - один или несколько билетов на одно Мероприятие, оформленное от одного физического или
                    юридического лица, объединенных единым идентификационным номером;
                    <br />
                    Билет - документ, удостоверяющее право предъявителю на посещение определенного Мероприятия и
                    содержащий всю необходимую информацию о Мероприятии название мероприятия, дата и время проведения,
                    выделенное место и цена билета;
                    <br />
                    Бронь - сформированный заказ, находящийся в режиме ожидания оплаты Заказчиком;
                    <br />
                    Период действия брони - период времени, включающий день оформления Заказа и последующий день.
                    Билеты, включенные в определенный Заказ, недоступны для использования другими лицами, кроме
                    Заказчика в течение всего Периода действия Брони на него;
                    <br />
                    Аннулирование - удаление заказа с переводом их в свободную продажу в системе on-line бронирования на
                    сайте Исполнителя. Если заказ не оплачен, то он аннулируется автоматическии.
                    <br />
                </div>
                <div className="text-base my-2">
                    Сервисный сбор – денежные средства, взимаемые дополнительно с Заказчика\Клиента является
                    вознаграждением Исполнителя за оказанный сервис по бронированию/оформлению заказа, отправки билета,
                    и обработки возврата денег. Сумма сервисного сбора при возврате либо обмене билетов, как в случае
                    возврата по инициативе покупателя, так и в случае отмены, замены или переноса мероприятия возврату
                    не подлежит.
                    <br />
                    Сайт - сайт в сети интернет, размещенный по адресу:{' '}
                    <a href="https://kazticket.kz/" className="text-sky-500" target="_blank">
                        https://kazticket.kz
                    </a>
                </div>
                <div className="text-base my-2">1. Общие положения</div>
                <div className="text-base my-2">
                    1.1. Настоящая Публичная Оферта Договор на оказание услуг по реализации и бронировании билетов на
                    театрально-зрелищные, концертные и спортивные мероприятия далее по тексту — Настоящий договор на
                    оказание услуг, регламентирует условия и порядок реализации билетов на Мероприятие в период их
                    продажи, осуществляемое посредством Сайта и обязательства, возникающие в связи с этим у Исполнителя
                    и Заказчика.
                    <br />
                    1.2. Реализация и бронирование билетов Заказчику производится исключительно на условиях Настоящей
                    договора на оказание услуг и лишь в случае ее полного и безоговорочного акцепта. Частичный акцепт, а
                    равно акцепт на иных условиях не допускается. Заказ услуг Заказчиком у Исполнителя, считается
                    безоговорочным принятием условий Настоящего договора на оказание услуг, и свидетельствует о
                    заключении между ними договора оказание услуг посредством совершения конкретных действий.
                </div>
                <div className="text-base my-2">
                    2. Предмет договора
                    <br />
                    2.1. Предоставление Заказчику услуг по реализации и бронированию билетов на Мероприятия, в порядке и
                    на условиях, предусмотренных Настоящим договором на оказание услуг и в соответствии с действующими
                    тарифами Исполнителя.
                    <br />
                    2.2. Ответственным за качество предоставляемых услуг по Настоящему договору на оказание услуг перед
                    Заказчиком несет Исполнитель.
                </div>
                <div className="text-base my-2">
                    3. Порядок и условия заключения договора.
                    <br />
                    3.1.Заказчик подтверждает и соглашается, что до совершения им действий по акцепту, установленных
                    Настоящим договором на оказание услуг, он ознакомился с условиями договора.Заказчик подтверждает и
                    соглашается с тем, что положения Настоящего договора на оказание услуг ему полностью понятны.
                    <br />
                    3.2.Полным и безоговорочным принятием Заказчиком условий Настоящего договора на оказание услуг
                    признается совершение Заказчиком следующих действий: <br />
                    1. обращение Заказчика к Сайту с целью приобретения билета;
                    <br />
                    2. регистрация Заказчика на Сайте с предоставлением данных о себе: Ф.И.О., номер абонентского номера
                    и адрес электронной почты;
                    <br />
                    3. выбор Мероприятия и билета из имеющихся к моменту обращения к Заказчику ознакомление с возрастным
                    цензом Организатора;
                    <br />
                    4. осуществление заказа посредством Сайта Исполнителя, оплаты и получения билета на Мероприятие.
                    <br />
                    3.3. Совершение всех действий, указанных в п.3.2. Настоящего договора на оказание услуг, означает
                    полное и безоговорочное принятие Исполнителем всех условий Настоящего договора на оказание услуг без
                    каких-либо изъятий или ограничений и равносильно заключению письменного договора.
                </div>
                <div className="text-base my-2">
                    4. Обязанности и права Исполнителя.
                    <br />
                    4.1. Исполнитель обязуется:
                    <br />
                    4.1.1. Исполнитель принимает на себя обязательство по выполнению следующих видов услуг, реализация и
                    бронирование, оформление заказов билетов на Мероприятия по поступившим от Заказчика заявкам через
                    сайт Исполнителя или иным другим образом.
                    <br />
                    4.1.2. Консультирование Заказчика по вопросам реализации и бронирования билетов на Мероприятия,
                    путем телефонных переговоров по телефону, а также посредством электронной почты. Объем консультации
                    ограничивается конкретными вопросами, связанными с предоставлением услуг.
                    <br />
                    4.1.3. Предоставить Заказчику услугу надлежащим образом и качеством, отвечающим всем требованиям
                    Настоящего Договора на оказание услуг.
                    <br />
                    4.1.4. Предоставить Заказчику полную, достоверную и исчерпывающую информацию по вопросам
                    Мероприятий.
                    <br />
                    4.1.5. Соблюдать условия конфиденциальности, т. е. все сведения полученные сторонами в рамках
                    исполнения настоящего договора, конфиденциальны и не подлежат разглашению третьим лицам.
                    <br />
                    4.2. Исполнитель имеет право:
                    <br />
                    4.2.1. Требовать от Заказчика соблюдения и исполнения Настоящего договора на оказание услуг;
                    <br />
                    4.2.2. Имеет право отказать в заключении Настоящего договора на оказание услуг, уведомив об этом
                    Заказчика, без объяснения причин;
                    <br />
                    4.2.3. Изменять Настоящий договор на оказание услуги в одностороннем порядке, помещая их на веб
                    сайте:{' '}
                    <a href="https://kazticket.kz/" className="text-sky-500" target="_blank">
                        https://kazticket.kz
                    </a>{' '}
                    Исполнителя, не менее чем за 7 (Семь) дней, до начала их действия;
                    <br />
                    4.2.4. Аннулировать оформленный Заказ, Бронь, если не будет оплачен Заказчиком билет.
                </div>
                <div className="text-base my-2">
                    5. Обязанности и права Заказчика.
                    <br />
                    5.1. Обязанности Заказчика:
                    <br />
                    5.1.2. До момента заключения настоящего договора ознакомится с содержанием Публичной офертой
                    Договора оказанием услуг по реализации и бронировании билетов на театрально-зрелищные, концертные и
                    спортивные мероприятия и условиями, инструкциями размещенном на сайте: https://kazticket.kz/;
                    <br />
                    5.1.3. Своевременно и в полном объеме оплатить услуги Исполнителя;
                    <br />
                    5.2. Права Заказчика:
                    <br />
                    5.2.1. На свободу заключения настоящего договора и право выбора Исполнителя по договору оказание
                    услуг у третьих лиц;
                    <br />
                    5.2.2. Получить документ, подтверждающий факт оказание услуг.
                    <br />
                    5.2.3. Получить полную и достоверную информацию об оказываемой услуге.
                    <br />
                    5.2.4. Требовать надлежащего исполнения настоящего договора Исполнителем.
                </div>
                <div className="text-base my-2">
                    6. Порядок и условия возврата денег <br />
                    6.1. Возврат Билета, купленного Клиентом на концерты и прочие Зрелищные, Спортивные, Гастрольные,
                    Туристические мероприятия. При запросе Покупателем возврата купленного ранее Билета, оператор имеет
                    право отказать Покупателю, если осталось менее 72 (семидесяти двух) часов до начала Мероприятия.
                    Если иного не предусмотрено Организаторами мероприятия.
                    <br />
                    6.1.1. Удерживаемая компенсационная выплата при возврате Билета, приобретенного на любые категории
                    мероприятий по номинальной стоимости, составляет 5,5% (2,5% - сервисный сбор, 3% банковский
                    эквайринг) от номинальной стоимости Билета или минимально 250 тенге. В случае, если Билеты на
                    мероприятия были приобретены Покупателем с применением Сервисного сбора Оператора, то при возврате
                    Билета удерживается полная сумма сервисного сбора. <br />
                    6.1.2. При возврате стоимости Билета, приобретенного на любые категории мероприятий, на банковскую
                    карту Клиента, возврат денежных средств осуществляется в течение 3-х (трёх) рабочих дней с момента
                    получения Пользователем уведомления об успешном осуществлении отмены заказа Электронного билета.
                    <br />
                    6.2. При отмене, замене или переносе Мероприятия по инициативе Организатора возврат денег
                    осуществляется Исполнителю, зарегистрированному в заказе{' '}
                    <a href="https://kazticket.kz/" target="_blank">
                        https://kazticket.kz/
                    </a>{' '}
                    по предъявлению документа удостоверяющего личность и билета, на основании письменного заявления
                    Заказчика. Срок рассмотрения такого заявления 10 (Десять) рабочих дней с момента получения
                    заявления. <br />
                    6.3. При переносе Мероприятия, Заказчик принимает и соглашается с тем, что деньги подлежат возврату
                    лишь в случае, если они не были перечислены ранее Организатору, возврат осуществляется за минусом
                    10% от номинальной стоимости Билета, сервисный сбор, если применялся, не возвращается. Стоимость
                    доставки также не возвращается. Если Заказчик перечислил деньги Организатору, ответственность по
                    возврату денежных средств Заказчику, переходит к Организатору Мероприятия, при этом Организатор
                    имеет права не возвращать деньги Заказчику, если им уже оплачены все расходы по подготовке
                    предстоящего Мероприятия, при этом он гарантирует проведение Мероприятия на перенесенный срок, ранее
                    купленные билеты являются действительными. <br />
                    6.4. Частичный возврат за минусом 30% от номинальной стоимости билета производится в случаях: <br />
                    6.4.1. за один час до начала Мероприятия; <br />
                    6.5. Билеты не подлежат возврату: <br />
                    6.5.1. После проведения валидации билета; <br />
                    6.5.2. Частичный возврат при покупке двух и более билетов из одного IP адреса (аккаунта); <br />
                    6.5.3. После начала сеанса/мероприятия; <br />
                    6.5.4. Если возврат не предусмотрен правилами Мероприятия; <br />
                    6.5.5. Обмен билета на другой билет; <br />
                </div>
                <div className="text-base my-2">
                    7. Ограничение ответственности <br />
                    7.1. Исполнитель не несет ответственности перед Заказчиком за отказ в доступе на мероприятие в связи
                    с несоответствием его статуса в указанные дни по программе ASHYQ согласно п. 5.1.4, отмену, замену
                    или перенос Мероприятия а равно за любые случае неисполнения и/или ненадлежащего исполнения Договора
                    оказания услуг в связи с тем, что Исполнитель не является обязанным лицом, а равно стороной по такой
                    сделке, заключенной между Организатором и Заказчиком, в связи с приобретением последним Билета.
                    <br />
                    7.2. Исполнитель не несет ответственности за действия Организатора Мероприятии и (или) иных лиц,
                    действующих от его имени и по его поручению либо от своего имени, а также сам факт проведения и
                    содержания Мероприятия.
                    <br />
                    7.3. Заказчик подтверждает и соглашается с тем, что Исполнитель не является ответственным за
                    качество, а равно за иные потребительские и иные свойства (качества) Мероприятия, так как не
                    является стороной по Договору оказания услуг в связи с проведением Мероприятия.
                    <br />
                    7.4. Исполнитель не несет ответственность за любые убытки и моральный вред, понесенные Заказчиком в
                    результате ошибочного понимания или непонимания им информации о порядке оформления и получения
                    Билета, присутствия на Мероприятии, а также получения и использования услуг в рамках Настоящего
                    договора.
                    <br />
                </div>
                <div className="text-base my-2">
                    8. ФОРС – МАЖОР <br />
                    8.1. Стороны освобождаются от ответственности за частичное или полное неисполнение обязательств по
                    настоящему договору, если это неисполнение явилось следствием обстоятельств непреодолимой силы,
                    возникших после заключения договора на условиях настоящей Оферты, в результате событий чрезвычайного
                    характера, которые участник не мог ни предвидеть, ни предотвратить разумными мерами (форс-мажор). .
                    К обстоятельствам непреодолимой силы относятся, в частности забастовки, наводнения, землетрясения,
                    ураганы, эпидемии (пандемия), иные стихийные бедствия и военные действия (локального и
                    международного масштаба), заболевания и (или) недомогания артистов, участвующих в Мероприятии, а
                    равно техногенные и антропогенные катастрофы, акты органов государственной власти и местного
                    самоуправления, а равно действия (бездействие) контрагентов Исполнителя, затрудняющие без
                    несоразмерных потерь надлежащее исполнение договоров, заключенных на условиях настоящей Оферты.
                    <br />
                </div>
                <div className="text-base my-2">
                    9. Порядок совершения платежей <br />
                    9.1. Билет до его полной оплаты не подлежит передаче Заказчику.
                    <br />
                    9.2. Заказчик вправе осуществлять оплату Билета, следующими способами:
                    <br />
                    1. Безналичным денежным способом посредством банковского (кредитной или дебетовой) карты допустимых
                    международных платежных систем;
                    <br />
                    2. Внесением наличных денег в кассу Исполнителя.
                    <br />
                    9.3. В случае отказа, либо не оплаты забронированных Билетов в течение 30 (Тридцати) минут, с
                    момента оформления заявки, согласно п.9.2, это ведет к аннулированию такого заказа, и выставление
                    билета на продажу.
                    <br />
                    9.4. Билет направляются Заказчику лишь при условии соблюдения Заказчиком условий Настоящего договора
                    оказания услуг об оплате Билета.
                </div>
                <div className="text-base my-2">
                    10. Заключительные положения <br />
                    10.1. Постольку поскольку иное не установлено Настоящим договором, к отношениям Сторон также
                    применяются иные правила, опубликованные на Сайте. Указанные правила обязательны к применению.
                    Согласие Заказчика с условиями Настоящего договора и заключение Заказчиком Договоров, указанных в
                    пункте 3.1 означает его полное и информированное согласие на применение таких правил.
                    <br />
                    10.2. Все изменения и (или) дополнения, вносимые в Настоящий договор, подлежат размещению на Сайте и
                    вступают в силу с момента размещения таких изменений и (или) дополнений на Сайте.
                    <br />
                </div>
                <div className="font-bold text-xl my-3">Условия предоставления услуг (оферта)</div>
                <div className="text-base my-2">
                    В соответствии с пунктом 1 статьи 385 Гражданского кодекса Республики Казахстан оферта признается
                    предложение о заключении договора, сделанное одному или нескольким конкретным лицам, если оно
                    достаточно определенно и выражает намерение лица, сделавшего предложение, считать себя связанным в
                    случае его принятия (акцепт). Предложение является достаточно определенным, если в нем указаны
                    существенные условия договора или порядок их определения.
                </div>
                <div className="text-base my-2">
                    Согласно пункта 4 статьи 395 Гражданского кодекса Республики Казахстан реклама и иные предложения,
                    адресованные неопределенному кругу лиц, рассматриваются как приглашение делать оферты, если иное
                    прямо не указано в предложении. <br />
                    На основании пункта 5 статьи 395 Гражданского кодекса Республики Казахстан содержащее все
                    существенные условия договора предложения, из которого усматривается воля лица, делающего
                    предложение, заключить договор на указанных в предложении условиях с любым, кто отзовется,
                    признается офертой (публичная оферта).
                </div>
                <div className="text-base my-2">
                    Текст настоящего договора является публичной офертой в соответствии с пунктом 1 статьи 385
                    Гражданского кодекса Республики Казахстан.
                </div>
                <div className="text-base my-2">
                    ТОО «KAZTICKET.KZ»
                    <br />
                    Республика Казахстан, 010000, г. Астана,
                    <br />
                    Проспект Рақымжан Қошқарбаев, здание 27
                    <br />
                    Расчетный счет № KZ3096503F0010868398.
                    <br />
                    в АО«ForteBank»
                    <br />
                    БИК IRTYKZKA
                    <br />
                    БИН 220140006265
                    <br />© {moment().format('YYYY')} Kazticket.kz
                </div>
            </div>
        </div>
    );

    const en = (
        <div className="h100">
            <div className="text-4xl my-4">Offer agreement</div>
            <div className="flex flex-col">
                <div className="font-bold text-xl my-3">Public offer</div>
                <div className="text-base my-2">
                    Agreement on sales and reservation of tickets for theatrical, entertainment, concert and sporting
                    events.
                </div>
                <div className="text-base my-2">
                    KazTicket Ltd., hereinafter referred to as Contractor, via website:{' '}
                    <a href="https://kazticket.kz/" className="text-sky-500" target="_blank">
                        https://kazticket.kz
                    </a>
                    , publishes this Agreement on sales and reservation of tickets for theatrical, entertainment,
                    concert and sport events, which is a Public offer addressed to all interested individuals and legal
                    entities, hereinafter referred to as Customer, to conclude an agreement on the following:
                </div>
                <div className="font-bold text-xl my-3">Terms and definitions:</div>
                <div className="text-base my-2">
                    Offer - this document is a "Public offer" an offer to an unlimited number of persons to conclude the
                    Agreement on the conditions specified in the Agreement;
                    <br />
                    Acceptance - acceptance of the contract terms by ordering and payment for tickets;
                    <br />
                    Service - activities aimed at meeting the needs of the Customer, the results of which have no
                    material expression;
                    <br />
                    Event - a concert, performance, as well as any other theatrical, entertainment and sports events;
                    <br />
                    Organizer - an individual or legal entity providing a quota of seats and other necessary
                    information, as well as being the organizer of a particular Event specified on the Executor's
                    website, and responsible for the quality of its conduct to the Customer.
                    <br />
                    Order - one or more tickets to one Event, issued by one individual or legal entity, united by a
                    single identification number;
                    <br />
                    Ticket - a document certifying the bearer's right to attend a particular Event and containing all
                    necessary information about the Event, the name of the Event, the date and time of the Event, the
                    allocated seat and ticket price;
                    <br />
                    Booking - an order formed and pending payment by the Customer;
                    <br />
                    Booking Period - the period of time including the day of the Order and the following day. Tickets
                    included in a certain Order are not available for use by persons other than the Customer during the
                    entire Booking Period for it;
                    <br />
                    Cancellation - deletion of the Order with transferring them to the free sale in the system of
                    on-line booking on the Executor's website. If the order is not paid, it is cancelled automatically.
                    <br />
                </div>
                <div className="text-base my-2">
                    Service fee - the money additionally charged from the Customer/Customer is the remuneration of the
                    Executor for the service provided for booking/booking, sending the ticket, and processing the
                    refund. The sum of the service fee for the return or exchange of tickets, as in the case of the
                    return at the initiative of the buyer, and in the case of cancellation, replacement or transfer of
                    the event is not subject to refund.
                    <br />
                    Website - a website on the Internet, located at:{' '}
                    <a href="https://kazticket.kz/" className="text-sky-500" target="_blank">
                        https://kazticket.kz
                    </a>
                </div>
                <div className="text-base my-2">1. General provisions.</div>
                <div className="text-base my-2">
                    1.1 This Public Offer Agreement on the sale and reservation of tickets for theater, entertainment,
                    concert and sporting events, hereinafter referred to as "This Service Agreement", regulates the
                    conditions and procedure of selling tickets for the Event during their sale carried out through the
                    Site and the obligations arising in this regard between the Contractor and the Customer.
                    <br />
                    1.2 The sale and booking of tickets to the Customer shall be made solely on the terms and conditions
                    of this Agreement for the provision of services and only in the case of its full and unconditional
                    acceptance. Partial acceptance as well as acceptance on other terms is not allowed. Ordering
                    services by the Contractor, is considered an unconditional acceptance of the terms of this Service
                    Agreement, and indicates the conclusion of a service contract between them by performing specific
                    actions.
                </div>
                <div className="text-base my-2">
                    2. Subject of the contract
                    <br />
                    2.1 Provision to the Customer of services on sale and reservation of tickets to Events, in the
                    manner and on the terms and conditions provided by this Service Agreement and in accordance with the
                    current tariffs of the Contractor.
                    <br />
                    2.2 Responsibility for the quality of the services provided under this Service Agreement to the
                    Customer bears the responsibility to the Contractor.
                </div>
                <div className="text-base my-2">
                    3. The order and conditions of the contract.
                    <br />
                    3.1 The Customer confirms and agrees that he has read the terms and conditions of the contract
                    before he takes the actions of acceptance as set out in this contract for the provision of services.
                    <br />
                    3.2.The complete and unconditional acceptance of the terms and conditions of this service agreement
                    by the Customer shall be deemed to be the Customer's performance of the following actions:
                    <br />
                    1. the Customer's accessing the Site in order to purchase a ticket;
                    <br />
                    2. registration of the Customer on the Site with providing personal data: full name, subscriber
                    number and e-mail address;
                    <br />
                    3. choosing the Event and the ticket from the available to the moment of the application to the
                    Customer acquaintance with the age limit of the Organizer;
                    <br />
                    4. making an order through the Executor's website, payment and receipt of the ticket for the Event.
                    <br />
                    3.3 Performing all actions specified in clause 3.2 of this Agreement means full and unconditional
                    acceptance of all conditions of this Agreement by the Contractor without any exceptions or
                    limitations and is equal to the conclusion of a written contract.
                </div>
                <div className="text-base my-2">
                    4. Duties and rights of the Contractor.
                    <br />
                    4.1 The Contractor undertakes:
                    <br />
                    4.1.1. Contractor undertakes to perform the following types of services, sales and reservations,
                    ticket orders for Events received from the Customer through the Contractor's website or otherwise.
                    <br />
                    4.1.2 Advising the Customer on the implementation and booking of tickets to the Events, by telephone
                    conversations, as well as by e-mail. The scope of the consultation shall be limited to specific
                    issues related to the provision of services.
                    <br />
                    4.1.3. Provide the Customer with the service in a proper manner and quality that meets all the
                    requirements of this Service Agreement.
                    <br />
                    4.1.4 Provide the Customer with complete, accurate and comprehensive information on the Activities.
                    <br />
                    4.1.5 Observe confidentiality conditions, i.e. all information received by the parties under this
                    Agreement is confidential and shall not be disclosed to third parties.
                    <br />
                    4.2 The Contractor shall be entitled to:
                    <br />
                    4.2.1 demand from the Customer to observe and execute this Service Agreement;
                    <br />
                    4.2.2. has the right to refuse to conclude this Service Agreement by notifying the Customer without
                    explaining the reasons;
                    <br />
                    4.2.3. change this Service Agreement unilaterally by posting them on the website:{' '}
                    <a href="https://kazticket.kz/" className="text-sky-500" target="_blank">
                        https://kazticket.kz
                    </a>{' '}
                    Contractor, at least seven (7) days in advance;
                    <br />
                    4.2.4. To cancel the issued Order, the Booking, if the Customer will not pay for the ticket.
                </div>
                <div className="text-base my-2">
                    5. Duties and rights of the Customer.
                    <br />
                    5.1 The Customer's obligations:
                    <br />
                    5.1.2 To get acquainted with the content of the Public offer of the Agreement on sales and
                    reservation of tickets for theatrical, concert and sports events and the terms, instructions posted
                    on the website: https://park.kz/. Before concluding this Agreement;
                    <br />
                    5.1.3 To pay for the services of the Executor in time and in full;
                    <br />
                    5.2 Rights of the Customer:
                    <br />
                    5.2.1 To the freedom to conclude this Agreement and the right to choose the Contractor under the
                    service contract from third parties;
                    <br />
                    5.2.2. To receive a document certifying the fact of rendering services.
                    <br />
                    5.2.3 Receive complete and accurate information about the service provided.
                    <br />
                    5.2.4 Demand proper execution of this Agreement by the Executor.
                </div>
                <div className="text-base my-2">
                    6. Refund procedure and conditions <br />
                    6.1. Refund of the Ticket purchased by the Client for concerts and other Entertainment, Sports,
                    Touring, Tourist events. When the Buyer requests a refund of a previously purchased Ticket, the
                    operator has the right to refuse the Buyer if there are less than 72 (seventy-two) hours left before
                    the start of the Event. Unless otherwise provided by the organizers of the event. <br />
                    6.1.1. The Service fee charged for the return of the Ticket purchased for any event category shall
                    be 5,5% (2,5% - service fee, 3% - bank acquiring) of the nominal value of the Ticket or 250 tenge,
                    if the deduction amount is less than 250 tenge. <br />
                    6.1.2. When returning the Ticket purchased for any categories of events to the Customer's bank card,
                    the refund shall be made within three (3) working days. If there is a service fee for the concert
                    event, the service fee amount is withheld when returning the Ticket. <br />
                    6.2. In case of the cancellation, replacement or postponement of the Event on the initiative of the
                    Organizer, the refund shall be made to the Executive registered in the order https://kazticket.kz/
                    on presentation of the identification document and the ticket, on the basis of a written application
                    of the Customer. The period of consideration of such an application shall be 10 (Ten) working days
                    from the date of receipt of the application. <br />
                    6.3. When postponing the Event, the Customer accepts and agrees that the money is refundable only if
                    it has not been previously transferred to the Organizer, the refund is made minus 10% of the nominal
                    value of the Ticket, the service charge, if applicable, is not refundable. The delivery fee is not
                    refunded either. If the Customer has transferred the money to the Organizer, the responsibility to
                    return the money to the Customer shall pass to the Event Organizer, and the Organizer shall have the
                    right not to return the money to the Customer if he has already paid all the expenses for the
                    preparation of the upcoming Event, and he guarantees to hold the Event for the postponed period, the
                    previously purchased tickets shall be valid. <br />
                    6.4. A partial refund less than 30% of the nominal ticket price is made in the following cases:
                    6.4.1. one hour before the Event starts; <br />
                    6.5. Tickets are non-refundable: <br />
                    6.5.1. After the валидацииticket has been validated; <br />
                    6.5.2. Partial refund when purchasing two or more tickets from the same IP address (account); <br />
                    6.5.3. After the session/event starts; <br />
                    6.5.4. If the refund is not provided for in the Event rules; <br />
                    6.5.5. Exchange of a ticket for another ticket;
                    <br />
                </div>
                <div className="text-base my-2">
                    7. Limitation of liability
                    <br />
                    7.1 The Contractor shall not be liable to the Customer for refusal of access to the event due to
                    non-compliance of its status on the specified days according to Clause 5.1.4, the cancellation,
                    replacement or postponement of the Event and for any failure and/or improper performance of the
                    Service Agreement due to the fact that the Contractor is not an obliged person, as well as a party
                    to such transaction, concluded between the Organizer and the Customer in connection with the
                    acquisition of Tickets by the latter.
                    <br />
                    7.2 The Executor shall not be responsible for the actions of the Event Organizer and (or) other
                    persons acting on its behalf and on its behalf or in its own name, as well as the very fact of
                    conducting and content of the Event.
                    <br />
                    7.3 The Customer confirms and agrees that the Contractor is not responsible for the quality, as well
                    as for other consumer and other properties (qualities) of the Event, as it is not a party to the
                    Service Agreement in connection with the Event.
                    <br />
                    7.4 The Executor shall not be responsible for any losses and moral damage incurred by the Customer
                    as a result of his misunderstanding or misunderstanding of the information on the procedure of
                    registration and receipt of the Ticket, attendance at the Event, as well as receipt and use of
                    services under the present Contract.
                    <br />
                </div>
                <div className="text-base my-2">
                    8. FORCE - MAJORITY.
                    <br />
                    8.1 The parties shall be exempt from liability for partial or full default on obligations under this
                    contract if that default is a consequence of force majeure arising after the conclusion of the
                    contract on the terms of this Offer, as a result of events of an extraordinary nature, which the
                    participant could neither foresee nor prevent by reasonable measures (force majeure) . Force majeure
                    includes, in particular, strikes, floods, earthquakes, hurricanes, epidemics (pandemics), other
                    natural disasters and military actions (local and international scale), diseases and (or)
                    indisposition of artists participating in the Event, as well as man-made and anthropogenic
                    disasters, acts of public authorities and local government, as well as actions (omissions) of the
                    Contractor's counterparties that complicate without incommensurate loss the proper performance of
                    contracts concluded under the terms of this Offer.
                    <br />
                </div>
                <div className="text-base my-2">
                    9. Procedure of making payments.
                    <br />
                    9.1 The Ticket is not transferable to the Customer until it has been fully paid for.
                    <br />
                    9.2 The Customer has the right to pay for the Ticket in the following ways:
                    <br />
                    1. non-cash payment by bank (credit or debit) card of acceptable international payment systems;
                    <br />
                    2. By depositing cash at the Executor's cash desk. 9.3.
                    <br />
                    9.3 In case of refusal or non-payment for the booked tickets within 30 (thirty) minutes from the
                    moment of application, according to p.9.2, it leads to the cancellation of such order, and putting
                    the ticket on sale.
                    <br />
                    9.4 The Ticket is sent to the Customer only on condition that the Customer fulfills the conditions
                    of the present Agreement about the payment for the Ticket.
                </div>
                <div className="text-base my-2">
                    10. Final provisions
                    <br />
                    10.1 Unless otherwise stipulated by this Agreement, other rules, published on the website, also
                    apply to the relations of the Parties. The said rules are binding. The consent of the Customer to
                    the terms and conditions of this Agreement and the conclusion of the Contracts specified in clause
                    3.1 shall mean his full and informed consent to the application of such rules.
                    <br />
                    10.2 All changes and (or) additions made to this Agreement shall be subject to placement on the
                    Website and shall come into force from the moment of placement of such changes and (or) additions on
                    the Website.
                    <br />
                </div>
                <div className="font-bold text-xl my-3">Terms of services (offer)</div>
                <div className="text-base my-2">
                    In compliance with point 1 of article 385 of the Civil Code of the Republic of Kazakhstan an offer
                    is an offer to conclude a contract made to one or several definite persons if it is definite enough
                    and expresses intention of a person who made offer to consider himself in case of acceptance thereof
                    (acceptance). An offer is sufficiently definite if it specifies the essential terms of the contract
                    or the procedure for determining them.
                </div>
                <div className="text-base my-2">
                    According to Article 395 (4) of the Civil Code of the Republic of Kazakhstan, advertising and other
                    offers addressed to an indefinite circle of people are considered as an invitation of offers unless
                    otherwise specified in the offer.
                    <br />
                    On the basis of paragraph 5 of Article 395 of the Civil Code of the Republic of Kazakhstan an offer
                    that contains all essential terms of a contract and evidences the will of a proposer to conclude a
                    contract on terms specified in the offer with anyone who responds is deemed an offer (a public
                    offer).
                </div>
                <div className="text-base my-2">
                    The text of this agreement is a public offer in accordance with paragraph 1 of Article 385 of the
                    Civil Code of the Republic of Kazakhstan.
                </div>
                <div className="text-base my-2">
                    KAZTICKET.KZ" LTD.
                    <br />
                    Republic of Kazakhstan, 010000 Astana city,
                    <br />
                    Rakhimzhan Koshkarbayev Avenue, building 27
                    <br />
                    Bank account № KZ3096503F0010868398.
                    <br />
                    "ForteBank" JSC
                    <br />
                    BIС: IRTYKZKA
                    <br />
                    Business identification number (BIN) 220140006265
                    <br />© {moment().format('YYYY')} Kazticket.kz
                </div>
            </div>
        </div>
    );

    const kz = (
        <div className="h100">
            <div className="text-4xl my-4">Оферта шарты</div>
            <div className="flex flex-col">
                <div className="font-bold text-xl my-3">Жария оферта</div>
                <div className="text-base my-2">
                    Театр-ойын-сауық, концерттік және спорттық іс-шараларға билеттерді сату және брондау бойынша
                    қызметтер көрсетуге арналған шарт.
                </div>
                <div className="text-base my-2">
                    "Kazticket.kz" ЖШС компаниясы бұдан әрі мәтін бойынша Орындаушы:{' '}
                    <a href="https://kazticket.kz/" className="text-sky-500" target="_blank">
                        https://kazticket.kz
                    </a>
                    , сайты арқылы, жеке және заңды тұлғалар ретінде барлық тілек білдірушілерге бұдан әрі мәтін бойынша
                    Тапсырыс беруші төмендегілер туралы шарт жасасуға арналған жария оферта болып саналатын
                    театр-ойын-сауық, концерттік және спорттық іс-шараларға билеттерді өткізу және брондау жөніндегі
                    қызметтерді көрсетуге арналған осы Шартты жариялайды.
                </div>
                <div className="font-bold text-xl my-3">Терминдер мен анықтамалар:</div>
                <div className="text-base my-2">
                    Оферта - осы құжат "Жария оферта" шартта көрсетілген талаптармен Шарт жасасу туралы белгісіз
                    тұлғалар тобына ұсыныс;
                    <br />
                    Акцепт-билеттерге тапсырыс беру және төлеу арқылы шарт талаптарын қабылдау;
                    <br />
                    Қызмет - нәтижелері материалдық көрінісі жоқ Тапсырыс берушінің қажеттіліктерін қанағаттандыруға
                    бағытталған қызмет;
                    <br />
                    Іс-шара - концерт, спектакль, сондай-ақ кез келген өзге де театр-ойын-сауық және спорттық
                    іс-шаралар;
                    <br />
                    Ұйымдастырушы - орындар квотасын және басқа да қажетті ақпаратты беретін, сондай-ақ Орындаушының
                    сайтында көрсетілген нақты Іс-шараны ұйымдастырушы болып табылатын және Тапсырыс берушінің алдында
                    оны өткізу сапасына жауапты жеке немесе заңды тұлға.
                    <br />
                    Тапсырыс - бірыңғай сәйкестендіру нөмірімен біріктірілген бір жеке немесе заңды тұлғадан ресімделген
                    бір Іс-шараға бір немесе бірнеше билет;
                    <br />
                    Билет - ұсынушының белгілі бір Іс-шараға қатысу құқығын куәландыратын және Іс-шара туралы барлық
                    қажетті ақпаратты, іс-шараның атауы, өткізілетін күні мен уақыты, бөлінген орын және билет бағасын
                    қамтитын құжат;
                    <br />
                    Бронь - Тапсырыс берушінің төлемді күту режиміндегі қалыптасқан тапсырысы;
                    <br />
                    Броньның қолданылу кезеңі-Тапсырысты рәсімдеу күні мен келесі күнді қамтитын уақыт кезеңі. Белгілі
                    бір Тапсырысқа енгізілген билеттерді Тапсырыс берушіден басқа адамдар оған Бронь қолданудың барлық
                    Кезеңінде пайдалана алмайды;
                    <br />
                    Жою - Орындаушының сайтындағы online броньдау жүйесінде оларды еркін сатуға ауыстыра отырып,
                    тапсырысты жою. Егер Тапсырыс төленбесе, ол автоматты түрде жойылады.
                    <br />
                    Сервистік алым - Тапсырыс берушіден\Клиенттен қосымша алынатын ақшалай қаражат тапсырысты
                    броньдау/ресімдеу, билетті жіберу және ақшаны қайтаруды өңдеу бойынша көрсетілген сервис үшін
                    Орындаушының сыйақысы болып саналады. Сатып алушының бастамасы бойынша қайтарылған жағдайда да,
                    іс-шараның күші жойылған, алмастырылған немесе басқа күнге ауыстырылған жағдайда да билеттерді
                    қайтару не айырбастау кезіндегі сервистік алым сомасы қайтаруға жатпайды.
                    <br />
                    Сайт - интернет желісіндегі сайт, мына мекен-жай бойынша орналастырылған:{' '}
                    <a href="https://kazticket.kz/" className="text-sky-500" target="_blank">
                        https://kazticket.kz
                    </a>
                </div>
                <div className="text-base my-2">1. Жалпы ережелер</div>
                <div className="text-base my-2">
                    1.1. Осы жария Оферта театр-ойын-сауық, концерттік және спорттық іс-шараларға билеттерді сату және
                    брондау жөніндегі қызметтер көрсетуге арналған Шарт, бұдан әрі мәтін бойынша - Қызметтер көрсетуге
                    арналған осы шарт, билеттерді сату кезеңінде Сайт арқылы жүзеге асырылатын Іс-шараға өткізу шарттары
                    мен тәртібін және осыған байланысты Орындаушы мен Тапсырыс берушіде туындайтын міндеттемелерді
                    регламенттейді.
                    <br />
                    1.2. Тапсырыс берушіге билеттерді сату және брондау тек Осы қызмет көрсету шартының талаптарында
                    және оның толық және сөзсіз акцепті болған жағдайда ғана жүргізіледі. Ішінара акцептке, сол сияқты
                    өзге шарттарда акцептке жол берілмейді. Тапсырыс берушінің Орындаушыдан қызметтерге тапсырыс беруі
                    Осы қызмет көрсету шартының талаптарын сөзсіз қабылдау болып саналады және олардың арасында нақты
                    іс-әрекеттер жасау арқылы қызметтер көрсету шартын жасасқаны туралы куәландырады.
                </div>
                <div className="text-base my-2">
                    2. Шарттың мәні
                    <br />
                    2.1. Тапсырыс берушіге Іс-шараларға билеттерді сату және брондау жөніндегі қызметтерді Осы қызмет
                    көрсету шартында көзделген тәртіппен және шарттарда және Орындаушының қолданыстағы тарифтеріне
                    сәйкес ұсыну.
                    <br />
                    2.2. Осы Шарт бойынша көрсетілетін қызметтердің сапасына жауапты қызметтерді Тапсырыс берушінің
                    алдында Орындаушы көтереді.
                </div>
                <div className="text-base my-2">
                    3. Шарт жасасу тәртібі мен шарттары.
                    <br />
                    3.1.Тапсырыс беруші Осы қызмет көрсетуге арналған шартта белгіленген акцепт бойынша іс-әрекеттер
                    жасағанға дейін ол шарттың талаптарымен танысқанын растайды және келіседі. Тапсырыс беруші Осы
                    қызмет көрсетуге арналған шарттың ережелері оған толық түсінікті екендігін растайды және келіседі.
                    <br />
                    3.2.Тапсырыс берушінің Осы қызмет көрсету шартының талаптарын толық және сөзсіз қабылдауы Тапсырыс
                    берушінің мынадай әрекеттерді жасауы деп танылады:
                    <br />
                    1. билетті сатып алу мақсатында Тапсырыс берушінің Сайтқа жүгінуі;
                    <br />
                    2. тапсырыс берушіні өзі туралы деректерді ұсына отырып, Сайтта тіркеу: Т. А. Ә., абоненттік
                    нөмірдің нөмірі және электрондық пошта мекенжайы;
                    <br />
                    3. тапсырыс берушіге жүгінген кезде қолда бар Іс шара мен билетті таңдау ұйымдастырушының жас
                    шектелімімен танысу;
                    <br />
                    4. тапсырысты Орындаушының Сайты арқылы жүзеге асыру, Іс-шараға билетті төлеу және алу.
                    <br />
                    3.3. 3.2-тармақта көрсетілген барлық әрекеттерді орындау, қызмет көрсетуге арналған осы Шартты
                    Орындаушының қандай да бір алып қоюсыз немесе шектеусіз қызмет көрсетуге арналған осы Шарттың барлық
                    талаптарын толық және сөзсіз қабылдауын білдіреді және жазбаша шарт жасасуға тең.
                </div>
                <div className="text-base my-2">
                    4. Орындаушының міндеттері мен құқықтары.
                    <br />
                    4.1. Орындаушы міндеттеледі:
                    <br />
                    4.1.1. Орындаушы Орындаушының сайты арқылы немесе өзге де тәсілмен Тапсырыс берушіден келіп түскен
                    өтінімдер бойынша Іс-шараларға тапсырыстарды билеттерді өткізу және брондау, рәсімдеу, келесі қызмет
                    түрлерін орындау бойынша өзіне міндеттеме қабылдайды.
                    <br />
                    4.1.2. Тапсырыс берушіге Іс-шараларға билеттерді сату және брондау мәселелері бойынша телефон
                    арқылы, сондай-ақ электрондық пошта арқылы кеңес беру. Консультациялар көлемі қызмет көрсетуге
                    байланысты нақты мәселелермен шектеледі.
                    <br />
                    4.1.3. Тапсырыс берушіге Осы қызмет көрсетуге арналған Шарттың барлық талаптарына жауап беретін
                    тиісті түрде және сапада қызмет көрсету.
                    <br />
                    4.1.4. Тапсырыс берушіге Іс-шаралар мәселелері бойынша толық, шынайы және толық ақпарат беру.
                    <br />
                    4.1.5. Осы Шартты орындау шеңберінде Тараптар алған барлық мәліметтер құпия болып табылады және
                    үшінші тұлғаларға жария етілмейді.
                    <br />
                    4.2. Орындаушының құқығы бар:
                    <br />
                    4.2.1. Тапсырыс берушіден Осы қызмет көрсету шартының сақталуын және орындалуын талап ету;
                    <br />
                    4.2.2. Тапсырыс берушіге бұл туралы себебін түсіндірмей хабарлай отырып, Осы қызмет көрсету шартын
                    жасасудан бас тартуға құқығы бар;
                    <br />
                    4.2.3. Осы қызмет көрсету шартын Орындаушының:{' '}
                    <a href="https://kazticket.kz/" className="text-sky-500" target="_blank">
                        https://kazticket.kz
                    </a>{' '}
                    веб-сайтына орналастыра отырып, біржақты тәртіппен өзгерту:олардың әрекеті басталғанға дейін кемінде
                    7 (жеті) күн бұрын;
                    <br />
                    4.2.4. Егер Тапсырыс беруші билетті төлемесе, ресімделген тапсырысты, броньды жою.
                </div>
                <div className="text-base my-2">
                    5. Тапсырыс берушінің міндеттері мен құқықтары.
                    <br />
                    5.1. Тапсырыс берушінің міндеттері:
                    <br />
                    5.1.2. Осы Шарт жасалған сәтке дейін Шарттың Жария офертасының театр-ойын-сауық, концерттік және
                    спорттық іс-шараларға билеттерді өткізу және брондау бойынша қызметтер көрсету мазмұнымен және
                    https://park.kz/ сайтында орналастырылған шарттармен, нұсқаулықтармен танысу:;
                    <br />
                    5.1.3. Орындаушының қызметтеріне уақтылы және толық көлемде ақы төлеу;
                    <br />
                    5.2. Тапсырыс берушінің құқықтары:
                    <br />
                    5.2.1. Осы шартты жасасу еркіндігіне және шарт бойынша Орындаушыны таңдау құқығына үшінші тұлғаларда
                    қызметтер көрсету;
                    <br />
                    5.2.2. Қызмет көрсету фактісін растайтын құжатты алу.
                    <br />
                    5.2.3. Көрсетілетін қызмет туралы толық және шынайы ақпарат алу.
                    <br />
                    5.2.4. Требовать надлежащего исполнения настоящего договора Исполнителем.
                </div>
                <div className="text-base my-2">
                    6. Ақшаны қайтару тәртібі мен шарттары <br />
                    6.1. Клиент сатып алған билетті концерттерге және басқа да ойын-сауық, спорттық, гастрольдік,
                    туристік іс-шараларға қайтару. Сатып алушы бұрын сатып алынған билетті қайтаруды сұраған кезде, Егер
                    іс-шара басталғанға дейін 72 (жетпіс екі) сағаттан аз уақыт қалса, оператор Сатып алушыдан бас
                    тартуға құқылы. Егер іс-шараны ұйымдастырушылар басқа ережелер қолданбаса. <br />
                    6.1.1. іс-шаралардың кез келген санатына сатып алынған билетті қайтарған кезде ұсталатын сервистік
                    алым билеттің номиналды құнының 5,5% - ын(2,5% - қызмет ақысы, 3% - банк эквайрингі) немесе ұстап
                    қалу сомасы 250 теңгеден кем болған жағдайда 250 теңгені құрайды. <br />
                    6.1.2. Іс-шаралардың кез келген санатына сатып алынған билетті клиенттің банк картасына қайтарған
                    кезде ақша қаражатын қайтару 3 (үш) жұмыс күні ішінде жүзеге асырылады. Егер концерттік іс-шараға
                    сервистік алым қолданылатын болса, онда билетті қайтару кезінде сервистік алым сомасы ұсталады.{' '}
                    <br />
                    6.2. Ұйымдастырушының бастамасы бойынша Іс-шараның күші жойылған, алмастырылған немесе ауыстырылған
                    кезде ақшаны қайтару https://kazticket.kz/ тапсырысында тіркелген Тапсырыс берушінің жазбаша өтініші
                    негізінде жеке басын куәландыратын құжатты және билетті ұсыну бойынша Орындаушыға жүзеге асырылады.
                    Мұндай өтінішті қарау мерзімі өтінішті алған сәттен бастап 10 (он) жұмыс күні болып саналады. <br />
                    6.3. Іс-шараны ауыстырған кезде Тапсырыс беруші ақша, егер ол бұрын Ұйымдастырушыға аударылмаған
                    жағдайда ғана қайтарылуға жататынын қабылдайды және келіседі, қайтару Билеттің номиналды құнының 10%
                    шегере отырып жүзеге асырылады, егер сервистік алым қолданылған болса, қайтарылмайды. Жеткізу құны
                    да қайтарылмайды. Егер Тапсырыс беруші ұйымдастырушыға ақша аударса, Тапсырыс берушіге ақшалай
                    қаражатты қайтару бойынша жауапкершілік іс-шараны Ұйымдастырушыға өтеді, бұл ретте ұйымдастырушы
                    алдағы Іс-шараны дайындау бойынша барлық шығыстар төленген болса, Тапсырыс берушіге ақшаны
                    қайтармауға құқылы, бұл ретте ол Іс-шараны кейінге қалдырылған мерзімге өткізуге кепілдік береді,
                    бұрын сатып алынған билеттер жарамды болып табылады. <br />
                    6.4. Билеттің номиналдық құнының 30% шегеріле отырып, ішінара қайтару келесі жағдайларда жүзеге
                    асырылады: <br />
                    6.4.1. іс-шараның басталуына бір сағат қалғанда; <br />
                    6.5. Билеттер қайтаруға жатпайды: <br />
                    6.5.1. Кейін өткізу мерзімдері валидациялар билет; <br />
                    6.5.2. Бір билеттен екі немесе одан да көп билет сатып алған жағдайда ішінара қайтару IP мекенжайлар
                    (есептік жазба); <br />
                    6.5.3. Сессия/іс-шара басталғаннан кейін; <br />
                    6.5.4. Егер қайтару Іс-шара ережелерінде көзделмесе; <br />
                    6.5.5. Билетті басқа билетке айырбастау;
                    <br />
                </div>
                <div className="text-base my-2">
                    7. Жауапкершілікті шектеу
                    <br />
                    7.1. Орындаушы 5.1.4-тармаққа сәйкес ASHYQ бағдарламасы бойынша көрсетілген күндері оның
                    мәртебесінің сәйкес келмеуіне байланысты іс-шараға кіруден бас тартқаны, Іс-шараның күшін жойғаны,
                    ауыстырғаны немесе ауыстырғаны үшін, сол сияқты Орындаушы міндетті тұлға болып табылмауына
                    байланысты қызмет көрсету Шартын орындамаған және/немесе тиісінше орындамаған кез келген жағдайда
                    Тапсырыс берушінің алдында жауапты болмайды, ол соңғы Билетті сатып алуға байланысты Ұйымдастырушы
                    мен Тапсырыс беруші арасында жасалған осындай мәміле бойынша тарапқа тең болады.
                    <br />
                    7.2. Орындаушы Іс-шараларды Ұйымдастырушының және (немесе) оның атынан және оның тапсырмасы бойынша
                    не өз атынан әрекет ететін өзге де адамдардың іс-әрекеттері, сондай-ақ іс-шараны өткізу және оның
                    мазмұны фактісі үшін жауапты болмайды.
                    <br />
                    7.3. Тапсырыс беруші Орындаушының Іс-шараның сапасына, сол сияқты өзге де тұтынушылық және өзге де
                    қасиеттеріне (сапаларына) жауаптылығын растайды және келіседі, өйткені Іс-шараны өткізуге байланысты
                    қызметтер көрсету Шарты бойынша тарап болып саналмайды.
                    <br />
                    7.4. Орындаушы Тапсырыс берушінің Билетті ресімдеу және алу, Іс-шараға қатысу, сондай-ақ осы Шарт
                    шеңберінде қызметтерді алу және пайдалану тәртібі туралы ақпаратты қате түсінуі немесе түсінбеуі
                    нәтижесінде келтірілген кез келген залалдар мен моральдық зиян үшін жауапты болмайды.
                    <br />
                </div>
                <div className="text-base my-2">
                    8. ФОРС – МАЖОР <br />
                    8.1. Еңсерілмейтін күш мән-жайларына, атап айтқанда, ереуілдер, су тасқыны, жер сілкінісі, дауыл,
                    індет (пандемия), өзге де дүлей зілзалалар мен әскери іс-қимылдар (жергілікті және халықаралық
                    ауқымдағы), Іс-шараға қатысатын әртістердің аурулары және (немесе) әлсізденулері, сол сияқты
                    техногендік және антропогендік апаттар, мемлекеттік билік және жергілікті өзін-өзі басқару
                    органдарының актілері жатады, осы Офертаның талаптарында жасалған шарттардың тиісінше орындалуын
                    пропорционалды емес шығындарсыз қиындататын Орындаушы контрагенттерінің әрекеттеріне (әрекетсіздігі)
                    тең.
                    <br />
                </div>
                <div className="text-base my-2">
                    9. Төлем жасау тәртібі
                    <br />
                    9.1. Билет толық төленгенге дейін Тапсырыс берушіге берілмейді.
                    <br />
                    9.2. Тапсырыс беруші Билетті төлеуді мынадай тәсілдермен жүзеге асыруға құқылы:
                    <br />
                    1. Рұқсат етілген халықаралық төлем жүйелерінің банктік (кредиттік немесе дебеттік) картасы арқылы
                    қолма-қол ақшасыз тәсілмен;
                    <br />
                    2.Орындаушының кассасына қолма-қол ақша енгізу арқылы.
                    <br />
                    9.3. Тапсырысты ресімдеген сәттен бастап 30 (отыз) минут ішінде броньдалған билеттерден бас
                    тартылған немесе төленбеген жағдайда, 9.2-тармаққа сәйкес, бұл мұндай тапсырыстың күшін жоюға және
                    билетті сатуға қоюға әкеледі.
                    <br />
                    9.4. Билет Тапсырыс берушіге Тапсырыс беруші осы Билетті төлеу туралы қызмет көрсету Шартының
                    талаптарын сақтаған жағдайда ғана жіберіледі.
                </div>
                <div className="text-base my-2">
                    10. Қорытынды ережелер
                    <br />
                    10.1. Басқасы Осы Шартпен өзгеше белгіленбегендіктен, Тараптардың қарым-қатынасына Сайтта
                    жарияланған өзге де ережелер де қолданылады. Көрсетілген ережелерді қолдану міндетті. Тапсырыс
                    берушінің осы Шарттың талаптарымен келісуі және Тапсырыс берушінің 3.1-тармақта көрсетілген
                    Шарттарды жасасуы оның осындай ережелерді қолдануға толық және ақпараттандырылған келісімін
                    білдіреді.
                    <br />
                    10.2. Осы Шартқа енгізілетін барлық өзгерістер және (немесе) толықтырулар Сайтта орналастырылуға
                    жатады және осындай өзгерістер және (немесе) толықтырулар Сайтта орналастырылған кезден бастап
                    күшіне енеді.
                    <br />
                </div>
                <div className="font-bold text-xl my-3">Қызмет көрсету шарттары (оферта)</div>
                <div className="text-base my-2">
                    Қазақстан Республикасы Азаматтық кодексінің 385-бабының 1-тармағына сәйкес оферта, егер ол
                    жеткілікті түрде нақты болса және ұсыныс жасаған адамның оны қабылдаған (акцепт) жағдайда өзін
                    байланысты деп санауға ниетін білдірсе, бір немесе бірнеше нақты тұлғаға жасалған шарт жасасу туралы
                    ұсыныс деп танылады. Егер онда шарттың елеулі талаптары немесе оларды айқындау тәртібі көрсетілсе,
                    ұсыныс жеткілікті айқындалған болып саналады.
                </div>
                <div className="text-base my-2">
                    Қазақстан Республикасы Азаматтық кодексінің 395 - бабының 4-тармағына сәйкес, егер ұсыныста өзгеше
                    тікелей көрсетілмесе, адамдардың белгісіз тобына бағытталған жарнама және өзге де ұсыныстар оферта
                    жасауға шақыру ретінде қаралады.
                </div>
                <div className="text-base my-2">
                    Қазақстан Республикасы Азаматтық кодексінің 395-бабы 5-тармағының негізінде ұсыныс жасайтын адамның
                    ұсыныста көрсетілген шарттарда жауап беретін кез келген адаммен шарт жасасуға еркі көрінетін ұсыныс
                    шартының барлық елеулі талаптары қамтылған оферта (жария оферта) деп танылады.
                </div>
                <div className="text-base my-2">
                    Осы Шарттың мәтіні Қазақстан Республикасы Азаматтық кодексінің 385 бабының 1 тармағына сәйкес жария
                    оферта болып табылады.
                </div>
                <div className="text-base my-2">
                    ТОО «KAZTICKET.KZ»
                    <br />
                    Қазақстан Республикасы, 010000, Нұр-Сұлтан қ,
                    <br />
                    Рахымжан Қошқарбаев даңғылы, 27 ғимарат
                    <br />
                    "ForteBank" АҚ-дағы № KZ3096503F0010868398 есеп айырысу шоты
                    <br />
                    БИК IRTYKZKA
                    <br />
                    БИН 220140006265
                    <br />© {moment().format('YYYY')} Kazticket.kz
                </div>
            </div>
        </div>
    );

    switch (UserLang?.toLocaleLowerCase()) {
        case 'ru':
            return <>{ru}</>;
        case 'en':
            return <>{en}</>;
        default:
            return <>{kz}</>;
    }
}
