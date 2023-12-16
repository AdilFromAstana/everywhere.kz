import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export default async function SecurityPolicyPage() {
    const UserLang = getCookie('UserLang', { cookies });

    const en = (
        <>
            <div className="text-4xl my-6">Privacy Policy</div>
            <div className="flex flex-col">
                <div className="text-base">1. Definitions</div>
                <div className="text-base">
                    Internet Project https://kazticket.kz (hereinafter referred to as URL, "we") takes seriously the
                    issue of privacy of its customers and visitors to https://kazticket.kz (hereinafter referred to as
                    "you", "site visitors"). We refer to information that contains personally identifiable information
                    (e.g., your full name, username, or company name) of a website visitor, and information about the
                    actions you take on the URL. (for example: the site visitor's order with his or her contact
                    information). Anonymous we call data that cannot be uniquely identified with a particular visitor to
                    the site (for example: statistics of site traffic).{' '}
                </div>

                <div className="text-base">2. Use of information</div>
                <div className="text-base">
                    We use personally identifiable information of specific site visitors solely for the purpose of
                    providing them with quality service and its accounting. We do not disclose the personally
                    identifiable information of certain URL visitors to other website visitors. We never make personally
                    identifiable information publicly available or share it with third parties. The only exceptions are
                    situations when provision of such information to authorized governmental bodies is prescribed by the
                    current legislation of the Republic of Kazakhstan. We publish and distribute only reports based on
                    anonymous data collected. The reports do not contain any information that would make it possible to
                    identify the personal data of service users. We also use anonymous data for internal analysis, which
                    aims to develop the products and services of the URL
                </div>

                <div className="text-base">3. Links</div>
                <div className="text-base">
                    The https://kazticket.kz website may contain links to other websites that are not related to our
                    company and belong to third parties. We are not responsible for the accuracy, completeness or
                    reliability of any information posted on such third-party sites and we make no commitment that any
                    information you provide on such sites will be kept confidential.
                </div>

                <div className="text-base">4 Limitation of Liability</div>
                <div className="text-base">
                    While we will do our best to comply with this privacy policy, we cannot guarantee the security of
                    your information in the event of factors beyond our control which would result in such disclosure.
                    The https://kazticket.kz site and all information contained therein is provided on an "as is" basis
                    without warranty of any kind. We will not be liable for any disadvantages or damages arising from
                    any restriction of access to the URL, or from your visiting the site and using the information
                    posted on it.
                </div>

                <div className="text-base">5. Contact</div>
                <div className="text-base">If you have any questions about this policy, please contact us at:</div>
                <div className="text-base">Republic of Kazakhstan, 010000 Astana city,</div>
                <div className="text-base">Rakhimzhan Koshkarbayev Avenue, building 27</div>
            </div>
        </>
    );

    const ru = (
        <>
            <div className="text-4xl my-6">Политика конфиденциальности</div>
            <div className="flex flex-col">
                <div className="text-base">1. Определения</div>
                <div className="text-base">
                    Интернет проект https://kazticket.kz (далее — URL, «мы») серьезно относится к вопросу
                    конфиденциальности информации своих клиентов и посетителей сайта https://kazticket.kz (далее — «Вы»,
                    «посетители сайта»). Персонифицированной мы называем информацию, содержащую персональные данные
                    (например: ФИО, логин или название компании) посетителя сайта, а также информацию о действиях,
                    совершаемых вами на сайте URL. (например: заказ посетителя сайта с его контактной информацией).
                    Анонимными мы называем данные, которые невозможно однозначно идентифицировать с конкретным
                    посетителем сайта (например: статистика посещаемости сайта).
                </div>

                <div className="text-base">2. Использование информации</div>
                <div className="text-base">
                    Мы используем персонифицированную информацию конкретного посетителя сайта исключительно для
                    обеспечения ему качественного оказания услуг и их учета. Мы не раскрываем персонифицированных данных
                    одних посетителей сайта URL другим посетителям сайта. Мы никогда не публикуем персонифицированную
                    информацию в открытом доступе и не передаем ее третьим лицам. Исключением являются лишь ситуации,
                    когда предоставление такой информации уполномоченным государственным органам предписано действующим
                    законодательством Республики Казахстан. Мы публикуем и распространяем только отчеты, построенные на
                    основании собранных анонимных данных. При этом отчеты не содержат информацию, по которой было бы
                    возможным идентифицировать персонифицированные данные пользователей услуг. Мы также используем
                    анонимные данные для внутреннего анализа, целью которого является развитие продуктов и услуг URL
                </div>

                <div className="text-base">3. Ссылки</div>
                <div className="text-base">
                    Сайт https://kazticket.kz может содержать ссылки на другие сайты, не имеющие отношения к нашей
                    компании и принадлежащие третьим лицам. Мы не несем ответственности за точность, полноту и
                    достоверность сведений, размещенных на сайтах третьих лиц, и не берем на себя никаких обязательств
                    по сохранению конфиденциальности информации, оставленной вами на таких сайтах.
                </div>

                <div className="text-base">4. Ограничение ответственности</div>
                <div className="text-base">
                    Мы делаем все возможное для соблюдения настоящей политики конфиденциальности, однако, мы не можем
                    гарантировать сохранность информации в случае воздействия факторов находящихся вне нашего влияния,
                    результатом действия которых станет раскрытие информации. Сайт https://kazticket.kz и вся
                    размещенная на нем информация представлены по принципу «как есть» без каких-либо гарантий. Мы не
                    несем ответственности за неблагоприятные последствия, а также за любые убытки, причиненные
                    вследствие ограничения доступа к сайту URL или вследствие посещения сайта и использования
                    размещенной на нем информации.
                </div>

                <div className="text-base">5. Контакты</div>
                <div className="text-base">
                    По вопросам, касающимся настоящей политики, просьба обращаться по адресу:
                </div>
                <div className="text-base">Республика Казахстан, 010000, г. Астана,</div>
                <div className="text-base">Проспект Рақымжан Қошқарбаев, здание 27</div>
            </div>
        </>
    );

    const kz = (
        <>
            <div className="text-4xl my-6">Қауіпсіздік саясаты</div>
            <div className="flex flex-col">
                <div className="text-base">1. Анықтамалар</div>
                <div className="text-base">
                    https://kazticket.kz интернет жобасы (бұдан әрі - URL, "біз") өз клиенттері мен https://kazticket.kz
                    (бұдан әрі - "сіз","сайтқа кірушілер") сайтына кірушілердің ақпаратының құпиялылығы мәселесіне
                    байыпты қарайды. Біз сайтқа кірушінің жеке деректері бар ақпаратты (мысалы: аты-жөні, логині немесе
                    компания атауы), сондай-ақ, URL сайтында сіздің жасаған әрекеттеріңіз туралы ақпаратты
                    дербестендірілген деп атаймыз. (мысалы: сайтқа кірушінің оның байланыс ақпаратымен тапсырыс беру).
                    Анонимді деп біз белгілі бір сайтқа кірушімен нақты сәйкестендірілмейтін деректерді атаймыз (мысалы:
                    сайтқа кіру статистикасы).
                </div>

                <div className="text-base">2. Ақпаратты пайдалану</div>
                <div className="text-base">
                    Біз сайттың белгілі бір келушісінің дербестендірілген ақпаратын тек оған сапалы қызмет көрсетуді
                    және оларды есепке алуды қамтамасыз ету үшін пайдаланамыз. Біз URL сайтына кірушілердің жеке
                    деректерін басқа сайтқа кірушілерге ашпаймыз. Біз ешқашан жеке ақпаратты көпшілікке жарияламаймыз
                    және оны үшінші тұлғаларға бермейміз. Мұндай ақпаратты уәкілетті мемлекеттік органдарға беру
                    Қазақстан Республикасының қолданыстағы заңнамасында белгіленген жағдайлар ғана ерекшелік болып
                    саналады. Біз жиналған анонимді деректерге негізделген есептерді ғана жариялаймыз және таратамыз.
                    Бұл ретте есептерде қызметтерді пайдаланушылардың дербестендірілген деректерін сәйкестендіруге
                    болатын ақпарат жоқ. Біз сондай-ақ URL өнімдері мен қызметтерін дамыту мақсатында ішкі талдау үшін
                    анонимді деректерді пайдаланамыз
                </div>

                <div className="text-base">3. Сілтемелер</div>
                <div className="text-base">
                    https://kazticket.kz сайтында біздің компанияға қатысы жоқ және үшінші тұлғаларға тиесілі басқа
                    сайттарға сілтемелер болуы мүмкін. Біз үшінші тұлғалардың сайттарында орналастырылған мәліметтердің
                    дәлдігі, толықтығы және дұрыстығы үшін жауап бермейміз және өзімізге осындай сайттарда сіз қалдырған
                    ақпараттың құпиялылығын сақтау бойынша ешқандай міндеттеме алмаймыз.
                </div>

                <div className="text-base">4. Жауапкершілікті шектеу</div>
                <div className="text-base">
                    Біз осы құпиялылық саясатын сақтау үшін қолдан келгеннің бәрін жасаймыз, алайда, біздің ықпалымыздан
                    тыс факторлардың әсерінен ақпараттың сақталуына кепілдік бере алмаймыз, оның нәтижесі ақпаратты ашу
                    болады. https://kazticket.kz сайты және онда орналастырылған барлық ақпарат ешқандай кепілдіксіз
                    "сол қалпында" қағидаты бойынша ұсынылады. Біз қолайсыз салдарлар үшін, сондай-ақ URL сайтына кіруді
                    шектеу немесе сайтқа кіру және онда орналастырылған ақпаратты пайдалану салдарынан келтірілген кез
                    келген залалдар үшін жауап бермейміз.
                </div>

                <div className="text-base">5. Байланыс</div>
                <div className="text-base">Осы саясатқа қатысты мәселелер бойынша мына мекен-жайға хабарласыңыз: </div>
                <div className="text-base">Қазақстан Республикасы, 010000, Астана,</div>
                <div className="text-base">Рахымжан Қошқарбаев даңғылы, 27 ғимарат</div>
            </div>
        </>
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
