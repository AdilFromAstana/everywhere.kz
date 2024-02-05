import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export default async function PaymentSecurityPage() {
    const UserLang = getCookie('UserLang', { cookies });

    const en = (
        <>
            <div className="text-4xl my-6">Online Payment Security</div>
            <div className="flex flex-col">
                <div className="text-xl my-3 font-bold">Payments. Payment by bank card online</div>
                <div className="text-base my-2">
                    Our site is connected to the Internet acquiring, and you can pay for the Service bank card Visa or
                    Mastercard. After confirming the selected Product or Service, a secure window will open with a
                    payment page processing center CloudPayments, where you will need to enter your bank card details.
                    For additional authentication of the card holder protocol is used 3-D Secure. If your issuing bank
                    supports this technology, you will be redirected to its server for additional identification. For
                    information about the rules and methods of additional identification please contact the Bank that
                    issued your bank card.
                </div>

                <div className="text-base my-2">
                    Online payment service is carried out in accordance with the rules of the International payment
                    systems Visa and MasterCard on the principles of confidentiality and security of payment, for this
                    purpose the most advanced methods of verification, encryption, and data transmission over closed
                    communication channels are used. Entering data bank card is made in a secure window on the payment
                    page CloudPayments.
                </div>

                <div className="text-base my-2">
                    In the fields on the payment page is required to enter a card number, cardholder name, card
                    expiration date, 3-digit security code (CVV2 for VISA or CVC2 for MasterCard). All the necessary
                    data is displayed on the surface of the bank card.
                </div>

                <div className="text-base my-2">CVV2/ CVC2 is a three-digit security code on the back of the card.</div>

                <div className="text-base my-2">
                    Then in the same window you will open the page of your issuing bank for entering the 3-D Secure
                    code. If you do not have a static 3-D Secure code configured, it will be sent to your phone number
                    via SMS. If the 3-D Secure code did not come to you, you should contact your issuing bank.
                </div>

                <div className="text-base my-2">
                    3-D Secure is the most advanced card payment security technology on the Internet. It allows you to
                    uniquely identify the authenticity of the cardholder making a transaction and minimize the risk of
                    fraudulent card transactions.
                </div>

                <div className="text-xl my-3 font-bold">Security guarantees</div>
                <div className="text-base my-2">
                    CloudPayments processing center protects and processes your bank card data according to PCI DSS 3.0
                    security standard. Transmission of information to the payment gateway is made using SSL encryption
                    technology. Further transmission of information occurs over closed banking networks of the highest
                    level of security. CloudPayments does not transfer your card details to us or any other third party.
                    For additional authentication of the card holder 3-D Secure protocol is used.
                </div>

                <div className="text-base my-2">
                    In case you have any questions about the payment you made, you can contact the customer support
                    service of the payment service by e-mail support@cloudpayments.kz
                </div>

                <div className="text-xl my-3 font-bold">Security of online payments</div>
                <div className="text-base my-2">
                    Personal information you provide (name, address, phone number, e-mail, credit card number) is
                    confidential and will not be disclosed. Your credit card information is encrypted and is not stored
                    on our Web server.
                </div>

                <div className="text-base my-2">
                    Security of processing Internet-payments is guaranteed by CloudPayments Kazakhstan LLP. All
                    operations with payment cards are performed in accordance with the requirements of VISA
                    International, MasterCard and other payment systems. When transmitting information, specialized
                    security technologies of online card payments are used; data processing is performed on a secure
                    high-tech server of the processing company.
                </div>

                <div className="text-base my-2">Payment card payments are secure because:</div>

                <div className="text-base my-2">
                    The authorization system guarantees the buyer that the payment details of his payment card (number,
                    expiration date, CVV2/CVC2) will not fall into the hands of fraudsters, as this data is not stored
                    on the authorization server and cannot be stolen.
                </div>
                <div className="text-base my-2">
                    The buyer enters his payment information directly in the authorization system CloudPayments, and not
                    on the site of the online store, therefore, the payment details of the buyer's card will not be
                    available to third parties.
                </div>
                <div className="text-xl my-3 font-bold">Refunds</div>

                <div className="text-base my-2">
                    When you make online payments via credit cards it is not allowed to return the money in cash. The
                    return procedure is regulated by the rules of international payment systems:
                </div>

                <div className="text-base my-2">
                    The consumer has the right to refuse the goods at any time before the transfer of the goods, after
                    the transfer of the goods, the refusal must be executed within 14 days;
                </div>
                <div className="text-base my-2">
                    Return of goods of proper quality is possible if its trade dress, consumer properties, as well as
                    the document confirming the fact and conditions of purchase of the specified goods are preserved;
                </div>
                <div className="text-base my-2">
                    The consumer has no right to refuse goods of proper quality, which have individually specific
                    properties, if the specified goods can be used exclusively by the person who acquires it;
                </div>
                <div className="text-base my-2">
                    When a consumer rejects a product, the seller must return the money paid by the consumer no later
                    than ten days from the day the consumer makes the relevant demand.
                </div>
                <div className="text-base my-2">
                    To get a refund to your bank card, you must complete the "Application for Money Refund", which is
                    sent upon request by the company to your e-mail address, and send it, along with a copy of your
                    identification document, to the e-mail address.
                </div>

                <div className="text-base my-2">
                    The refund will be made to the bank card within _ working day from the date of receipt of
                    "Application for refund" by the Company.
                </div>

                <div className="text-base my-2">
                    To get the refund for transactions made in error, you must apply in writing and enclose a copy of
                    your identification document and receipts/receipts confirming the erroneous debit. This application
                    should be sent to the e-mail address.
                </div>

                <div className="text-base my-2">
                    The amount of refund will be equal to the amount of purchase. The period of consideration of the
                    Application and refund begins to be calculated from the moment the Company receives the Application
                    and is calculated in working days excluding holidays/weekends.
                </div>

                <div className="text-xl my-3 font-bold">Privacy</div>

                <div className="text-base my-2">1. Definitions</div>
                <div className="text-base my-2">
                    Internet Project https://kazticket.kz (hereinafter referred to as URL, "we") takes seriously the
                    issue of privacy of its customers and visitors to https://kazticket.kz (hereinafter referred to as
                    "you", "site visitors"). We refer to information that contains personally identifiable information
                    (e.g., your full name, username, or company name) of a website visitor, and information about the
                    actions you take on the URL. (for example: the site visitor's order with his or her contact
                    information). Anonymous we call data that cannot be uniquely identified with a particular visitor to
                    the site (for example: statistics of site traffic).{' '}
                </div>

                <div className="text-base my-2">2. Use of information</div>
                <div className="text-base my-2">
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

                <div className="text-base my-2">3. Links</div>
                <div className="text-base my-2">
                    The https://kazticket.kz website may contain links to other websites that are not related to our
                    company and belong to third parties. We are not responsible for the accuracy, completeness or
                    reliability of any information posted on such third-party sites and we make no commitment that any
                    information you provide on such sites will be kept confidential.
                </div>

                <div className="text-base my-2">4 Limitation of Liability</div>
                <div className="text-base my-2">
                    While we will do our best to comply with this privacy policy, we cannot guarantee the security of
                    your information in the event of factors beyond our control which would result in such disclosure.
                    The https://kazticket.kz site and all information contained therein is provided on an "as is" basis
                    without warranty of any kind. We will not be liable for any disadvantages or damages arising from
                    any restriction of access to the URL, or from your visiting the site and using the information
                    posted on it.
                </div>

                <div className="text-base my-2">5. Contact</div>
                <div className="text-base my-2">
                    If you have any questions about this policy, please contact us at info@kazticket.kz.
                </div>
                <div className="text-base">“KAZTICKET.KZ" LTD.</div>
                <div className="text-base">Republic of Kazakhstan, 010000 Astana city,</div>
                <div className="text-base">Rakhimzhan Koshkarbayev Avenue, building 27</div>
                <div className="text-base">Bank account: № KZ3096503F0010868398.</div>
                <div className="text-base"> "ForteBank" JSC»</div>
                <div className="text-base">BIC: IRTYKZKA</div>
                <div className="text-base">Business identification number (BIN) 220140006265</div>
            </div>
        </>
    );

    const ru = (
        <>
            <div className="text-4xl my-6">Безопасность онлайн платежей</div>
            <div className="flex flex-col">
                <div className="text-xl my-3 font-bold">Платежи. Оплата банковской картой онлайн</div>
                <div className="text-base my-2">
                    Наш сайт подключен к интернет-эквайрингу, и Вы можете оплатить Услугу банковской картой Visa или
                    Mastercard. После подтверждения выбранного Товара либо услуги откроется защищенное окно с платежной
                    страницей процессингового центра CloudPayments или Oxy Pay, где Вам необходимо ввести данные Вашей
                    банковской карты. Для дополнительной аутентификации держателя карты используется протокол 3-D
                    Secure. Если Ваш Банк-эмитент поддерживает данную технологию, Вы будете перенаправлены на его сервер
                    для прохождения дополнительной идентификации. Информацию о правилах и методах дополнительной
                    идентификации уточняйте в Банке, выдавшем Вам банковскую карту.
                </div>

                <div className="text-base my-2">
                    Услуга онлайн-оплаты осуществляется в соответствии с правилами Международных платежных систем Visa и
                    MasterCard на принципах соблюдения конфиденциальности и безопасности совершения платежа, для этого
                    используются самые актуальные методы проверки, шифрования и передачи данных по закрытым каналам
                    связи. Ввод данных банковской карты осуществляется в защищенном окне на платежной странице
                    CloudPayments или Oxy Pay.
                </div>

                <div className="text-base my-2">
                    В поля на платежной странице требуется ввести номер карты, имя владельца карты, срок действия карты,
                    трёхзначный код безопасности (CVV2 для VISA или CVC2 для MasterCard). Все необходимые данные
                    отображены на поверхности банковской карты.
                </div>

                <div className="text-base my-2">
                    CVV2/ CVC2 — это трёхзначный код безопасности, находящийся на оборотной стороне карты.
                </div>

                <div className="text-base my-2">
                    Далее в том же окне откроется страница Вашего банка-эмитента для ввода 3-D Secure кода. В случае,
                    если у вас не настроен статичный 3-D Secure, он будет отправлен на ваш номер телефона посредством
                    SMS. Если 3-D Secure код к Вам не пришел, то следует обратится в ваш банк-эмитент.
                </div>

                <div className="text-base my-2">
                    3-D Secure — это самая современная технология обеспечения безопасности платежей по картам в сети
                    интернет. Позволяет однозначно идентифицировать подлинность держателя карты, осуществляющего
                    операцию, и максимально снизить риск мошеннических операций по карте.
                </div>

                <div className="text-xl my-3 font-bold">Гарантии безопасности</div>
                <div className="text-base my-2">
                    Процессинговый центры CloudPayments и Oxy Pay защищают и обрабатывают данные Вашей банковской карты
                    по стандарту безопасности PCI DSS 3.0. Передача информации в платежный шлюз происходит с применением
                    технологии шифрования SSL. Дальнейшая передача информации происходит по закрытым банковским сетям,
                    имеющим наивысший уровень надежности. CloudPayments и Oxy Pay не передают данные Вашей карты нам и
                    иным третьим лицам. Для дополнительной аутентификации держателя карты используется протокол 3-D
                    Secure.
                </div>

                <div className="text-base my-2">
                    В случае, если у Вас есть вопросы по совершенному платежу, Вы можете обратиться в службу поддержки
                    клиентов платежного сервиса по электронной почте support@cloudpayments.kz или info@oxypay.kz.
                </div>

                <div className="text-xl my-3 font-bold">Безопасность онлайн-платежей</div>
                <div className="text-base my-2">
                    Предоставляемая Вами персональная информация (имя, адрес, телефон, e-mail, номер кредитной карты)
                    является конфиденциальной и не подлежит разглашению. Данные Вашей кредитной карты передаются только
                    в зашифрованном виде и не сохраняются на нашем Web-сервере.
                </div>

                <div className="text-base my-2">
                    Безопасность обработки Интернет-платежей гарантируют ТОО «CloudPayments Kazakhstan» и ТОО «OXY PAY
                    (ОКСИ ПЭЙ)» . Все операции с платежными картами происходят в соответствии с требованиями VISA
                    International, MasterCard и других платежных систем. При передаче информации используются
                    специализированные технологии безопасности карточных онлайн-платежей, обработка данных ведется на
                    безопасном высокотехнологичном сервере процессинговой компании.
                </div>

                <div className="text-base my-2">Оплата платежными картами безопасна, потому что:</div>

                <div className="text-base my-2">
                    Система авторизации гарантирует покупателю, что платежные реквизиты его платежной карты (номер, срок
                    действия, CVV2/CVC2) не попадут в руки мошенников, так как эти данные не хранятся на сервере
                    авторизации и не могут быть похищены.
                </div>
                <div className="text-base my-2">
                    Покупатель вводит свои платежные данные непосредственно в системе авторизации CloudPayments или в
                    системе авторизации Oxy Pay, а не на сайте интернет-магазина, следовательно, платежные реквизиты
                    карточки покупателя не будут доступны третьим лицам.
                </div>
                <div className="text-xl my-3 font-bold">Возврат денежных средств</div>

                <div className="text-base my-2">
                    При проведении онлайн-оплаты посредством платежных карт не допускается возврат наличными денежными
                    средствами. Порядок возврата регулируется правилами международных платежных систем:
                </div>

                <div className="text-base my-2">
                    Потребитель вправе отказаться от товара в любое время до его передачи, после передачи товара отказ
                    необходимо оформить в течение 14 дней;
                </div>
                <div className="text-base my-2">
                    Возврат товара надлежащего качества возможен в случае, если сохранены его товарный вид,
                    потребительские свойства, а также документ, подтверждающий факт и условия покупки указанного товара;
                </div>
                <div className="text-base my-2">
                    Потребитель не вправе отказаться от товара надлежащего качества, имеющего индивидуально-определенные
                    свойства, если указанный товар может быть использован исключительно приобретающим его человеком;
                </div>
                <div className="text-base my-2">
                    При отказе от товара со стороны потребителя продавец должен вернуть ему денежную сумму, уплаченную
                    потребителем, не позднее чем через десять дней со дня предъявления потребителем соответствующего
                    требования.
                </div>
                <div className="text-base my-2">
                    Для возврата денежных средств на банковскую карту необходимо заполнить «Заявление о возврате
                    денежных средств», которое высылается по требованию компанией на электронный адрес, и отправить его
                    вместе с приложением копии документа, удостоверяющего личность, по адресу E-MAIL адрес.
                </div>
                <div className="text-base my-2">
                    Возврат денежных средств будет осуществлен на банковскую карту в течение _ рабочего дня со дня
                    получения «Заявление о возврате денежных средств» Компанией.
                </div>

                <div className="text-base my-2">
                    Для возврата денежных средств по операциям, проведенным с ошибками, необходимо обратиться с
                    письменным заявлением и приложением копии документа, удостоверяющего личность, и чеков/квитанций,
                    подтверждающих ошибочное списание. Данное заявление необходимо направить по адресу E-MAIL адрес.
                </div>

                <div className="text-base my-2">
                    Сумма возврата будет равняться сумме покупки. Срок рассмотрения Заявления и возврата денежных
                    средств начинает исчисляться с момента получения Компанией Заявления и рассчитывается в рабочих днях
                    без учета праздников/выходных дней.
                </div>

                <div className="text-xl my-3 font-bold">Конфиденциальность</div>

                <div className="text-base my-2">1. Определения</div>
                <div className="text-base my-2">
                    Интернет проект https://kazticket.kz (далее — URL, «мы») серьезно относится к вопросу
                    конфиденциальности информации своих клиентов и посетителей сайта https://kazticket.kz (далее — «Вы»,
                    «посетители сайта»). Персонифицированной мы называем информацию, содержащую персональные данные
                    (например: ФИО, логин или название компании) посетителя сайта, а также информацию о действиях,
                    совершаемых вами на сайте URL. (например: заказ посетителя сайта с его контактной информацией).
                    Анонимными мы называем данные, которые невозможно однозначно идентифицировать с конкретным
                    посетителем сайта (например: статистика посещаемости сайта).
                </div>

                <div className="text-base my-2">2. Использование информации</div>
                <div className="text-base my-2">
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

                <div className="text-base my-2">3. Ссылки</div>
                <div className="text-base my-2">
                    Сайт https://kazticket.kz может содержать ссылки на другие сайты, не имеющие отношения к нашей
                    компании и принадлежащие третьим лицам. Мы не несем ответственности за точность, полноту и
                    достоверность сведений, размещенных на сайтах третьих лиц, и не берем на себя никаких обязательств
                    по сохранению конфиденциальности информации, оставленной вами на таких сайтах.
                </div>

                <div className="text-base my-2">4. Ограничение ответственности</div>
                <div className="text-base my-2">
                    Мы делаем все возможное для соблюдения настоящей политики конфиденциальности, однако, мы не можем
                    гарантировать сохранность информации в случае воздействия факторов находящихся вне нашего влияния,
                    результатом действия которых станет раскрытие информации. Сайт https://kazticket.kz и вся
                    размещенная на нем информация представлены по принципу «как есть» без каких-либо гарантий. Мы не
                    несем ответственности за неблагоприятные последствия, а также за любые убытки, причиненные
                    вследствие ограничения доступа к сайту URL или вследствие посещения сайта и использования
                    размещенной на нем информации.
                </div>

                <div className="text-base my-2">5. Контакты</div>
                <div className="text-base my-2">
                    По вопросам, касающимся настоящей политики, просьба обращаться по адресу info@kazticket.kz
                </div>
                <div className="text-base">ТОО «KAZTICKET.KZ»</div>
                <div className="text-base">Республика Казахстан, 010000, г. Астана,</div>
                <div className="text-base">Проспект Рақымжан Қошқарбаев, здание 27</div>
                <div className="text-base">Расчетный счет № KZ3096503F0010868398.</div>
                <div className="text-base">в АО«ForteBank»</div>
                <div className="text-base">БИК IRTYKZKA</div>
                <div className="text-base">БИН 220140006265</div>
            </div>
        </>
    );

    const kz = (
        <>
            <div className="text-4xl my-6">Онлайн төлем қауіпсіздігі</div>
            <div className="flex flex-col">
                <div className="text-xl my-3 font-bold">Төлемдер. Банктік картамен онлайн төлеу</div>
                <div className="text-base my-2">
                    Біздің сайт интернет-эквайрингке қосылған және Сіз қызметті Visa немесе Mastercard банк картасымен
                    төлей аласыз. Таңдалған тауарды немесе қызметті растағаннан кейін CloudPayments процессинг
                    орталығының төлем беті бар қорғалған терезе ашылады, онда Сізге банк картасының деректерін енгізу
                    қажет. Карта ұстаушысының қосымша сәйкестендіруі үшін 3-D Secure хаттамасы қолданылады. Егер Сіздің
                    Шығарушы-банкіңіз осы технологияны қолдаса, Сіз қосымша сәйкестендіруден өту үшін оның серверіне
                    бағытталасыз. Қосымша сәйкестендіру ережелері мен әдістері туралы ақпаратты Сізге Банк картасын
                    берген Банктен анықтаныз.
                </div>

                <div className="text-base my-2">
                    Онлайн төлем қызметі Visa және MasterCard Халықаралық төлем жүйелерінің ережелеріне сәйкес төлемнің
                    құпиялылығы мен қауіпсіздігін сақтау қағидаттарында жүзеге асырылады, бұл үшін жабық байланыс
                    арналары арқылы деректерді тексеру, шифрлау және берудің ең өзекті әдістері пайдаланылады. Банк
                    картасының деректерін енгізу CloudPayments төлем бетіндегі қорғалған терезеде жүзеге асырылады.
                </div>

                <div className="text-base my-2">
                    Төлем бетіндегі өрістерге карта нөмірін, карта иесінің атын, картаның жарамдылық мерзімін, үш
                    таңбалы қауіпсіздік кодын (VISA үшін CVV2 немесе MasterCard үшін CVC2) енгізу қажет. Барлық қажетті
                    деректер банк картасының бетінде көрсетіледі.
                </div>

                <div className="text-base my-2">
                    CVV2 / CVC2-картаның артқы жағында орналасқан үш таңбалы қауіпсіздік коды.
                </div>

                <div className="text-base my-2">
                    Содан кейін сол терезеде 3-D Secure кодын енгізу үшін Сіздің шығарушы-банктің беті ашылады. Егер
                    Сізде статикалық 3-D Secure орнатылмаған болса, ол сіздің телефон нөміріңізге SMS арқылы жіберіледі.
                    Егер 3-D Secure коды сізге келмесе, онда сіз шығарушы-банкке хабарласуыңыз керек.
                </div>

                <div className="text-base my-2">
                    3—D Secure-бұл интернет желісіндегі карталар бойынша төлемдердің қауіпсіздігін қамтамасыз етудің ең
                    заманауи технологиясы. Операцияны жүзеге асыратын карта ұстаушының түпнұсқалығын біржақты анықтауға
                    және алаяқтық карта операцияларының қаупін барынша азайтуға мүмкіндік береді.
                </div>

                <div className="text-xl my-3 font-bold">Қауіпсіздік кепілдіктері</div>
                <div className="text-base my-2">
                    CloudPayments процессингтік орталығы Сіздің банктік картаңыздың деректерін PCI DSS 3.0 қауіпсіздік
                    стандарты бойынша қорғайды және өңдейді. Ақпаратты төлем шлюзіне беру SSL шифрлау технологиясын
                    қолдану арқылы жүзеге асырылады. Ақпаратты одан әрі беру сенімділіктің ең жоғары деңгейіне ие жабық
                    банктік желілер арқылы жүзеге асырылады. CloudPayments Сіздің картаңыздың деректерін бізге және
                    басқа үшінші тұлғаларға бермейді. Карта ұстаушысының қосымша сәйкестендіруі үшін 3-D Secure
                    хаттамасы қолданылады.
                </div>

                <div className="text-base my-2">
                    Егер Сізде жасалған төлем бойынша сұрақтарыңыз болса, төлем сервисінің клиенттерді қолдау қызметіне
                    support@cloudpayments.kz. электрондық поштасы арқылы хабарласа аласыз.
                </div>

                <div className="text-xl my-3 font-bold">Онлайн төлем қауіпсіздігі</div>
                <div className="text-base my-2">
                    Сіз ұсынатын жеке ақпарат (аты-жөні, мекен-жайы, телефоны, E-mail, несие картасының нөмірі) құпия
                    болып табылады және жария етілмейді. Сіздің несие картаңыздың деректері тек шифрланған түрде
                    беріледі және біздің Web-серверде сақталмайды.
                </div>

                <div className="text-base my-2">
                    Интернет-төлемдерді өңдеу қауіпсіздігіне "CloudPayments Kazakhstan" ЖШС кепілдік береді.Төлем
                    карталарының барлық операциялары VISA International, MasterCard және басқа төлем жүйелерінің
                    талаптарына сәйкес жүзеге асырылады. Ақпаратты беру кезінде онлайн-карточкалық төлемдер
                    қауіпсіздігінің мамандандырылған технологиялары пайдаланылады, деректерді өңдеу процессингтік
                    компанияның қауіпсіз жоғары технологиялық серверінде жүргізіледі.
                </div>

                <div className="text-base my-2">Төлем карталарымен төлеу қауіпсіз, себебі:</div>

                <div className="text-base my-2">
                    Авторизация жүйесі сатып алушыға оның төлем картасының төлем деректемелері (нөмірі, жарамдылық
                    мерзімі, CVV2/CVC2) алаяқтардың қолына түспеуін қамтамасыз етеді, өйткені бұл деректер авторизация
                    серверінде сақталмайды және ұрланбайды.
                </div>
                <div className="text-base my-2">
                    Сатып алушы төлем деректерін интернет-дүкеннің веб-сайтына емес, CloudPayments авторизация жүйесіне
                    тікелей енгізеді, сондықтан сатып алушы картасының төлем деректемелері үшінші тұлғаларға қол жетімді
                    болмайды.
                </div>
                <div className="text-xl my-3 font-bold">Ақшаны қайтару</div>

                <div className="text-base my-2">
                    Төлем карталары арқылы онлайн-төлем жүргізу кезінде қолма-қол ақшамен қайтаруға жол берілмейді.
                    Қайтару тәртібі халықаралық төлем жүйелерінің ережелерімен реттеледі:
                </div>

                <div className="text-base my-2">
                    Тұтынушы тауарды бергенге дейін кез келген уақытта бас тартуға құқылы, тауарды бергеннен кейін бас
                    тартуды 14 күн ішінде ресімдеу қажет;
                </div>
                <div className="text-base my-2">
                    Егер оның тауарлық түрі, тұтыну қасиеттері, сондай-ақ аталған тауарды сатып алу фактісі мен
                    шарттарын растайтын құжат сақталған жағдайда, тиісті сападағы тауарды қайтару мүмкін болады;
                </div>
                <div className="text-base my-2">
                    Егер көрсетілген тауарды тек оны сатып алатын адам ғана пайдалана алатын болса, тұтынушы
                    жеке-белгілі бір қасиеттері бар тиісті сападағы тауардан бас тартуға құқылы емес;
                </div>
                <div className="text-base my-2">
                    Тұтынушы тарапынан тауардан бас тартқан кезде сатушы тұтынушы тиісті талап қойған күннен бастап он
                    күннен кешіктірмей тұтынушы төлеген ақшалай соманы оған қайтаруға тиіс.
                </div>
                <div className="text-base my-2">
                    Банк картасына ақша қаражатын қайтару үшін компанияның талабы бойынша электрондық мекенжайға
                    жіберілетін "Ақша қаражатын қайтару туралы өтінішті" толтыру және оны жеке басын куәландыратын
                    құжаттың көшірмесімен бірге Е-MAIL мекенжайына жіберу қажет.
                </div>
                <div className="text-base my-2">
                    Ақша қаражатын қайтару компанияның "Ақша қаражатын қайтару туралы өтінішін" алған күннен бастап _
                    жұмыс күні ішінде банк картасына жүзеге асырылады.
                </div>

                <div className="text-base my-2">
                    Қателіктермен жүргізілген операциялар бойынша ақшалай қаражатты қайтару үшін жазбаша өтінішпен және
                    жеке басын куәландыратын құжаттың көшірмесімен және қате есептен шығарылғанын растайтын
                    түбіртектермен/төлемқағазымен жүгіну қажет. Бұл өтінішті E-MAIL мекенжайына жолдау қажет.
                </div>

                <div className="text-base my-2">
                    Қайтару сомасы сатып алу сомасына тең болады. Өтінішті қарау және ақшалай қаражатты қайтару мерзімі
                    Компания Өтінішті алған сәттен бастап есептеле бастайды және мереке/демалыс күндерін есептемегенде
                    жұмыс күндерінде есептеледі.
                </div>

                <div className="text-xl my-3 font-bold">Құпиялылық</div>

                <div className="text-base my-2">1. Анықтамалар</div>
                <div className="text-base my-2">
                    https://kazticket.kz интернет жобасы (бұдан әрі - URL, "біз") өз клиенттері мен https://kazticket.kz
                    (бұдан әрі - "сіз","сайтқа кірушілер") сайтына кірушілердің ақпаратының құпиялылығы мәселесіне
                    байыпты қарайды. Біз сайтқа кірушінің жеке деректері бар ақпаратты (мысалы: аты-жөні, логині немесе
                    компания атауы), сондай-ақ, URL сайтында сіздің жасаған әрекеттеріңіз туралы ақпаратты
                    дербестендірілген деп атаймыз. (мысалы: сайтқа кірушінің оның байланыс ақпаратымен тапсырыс беру).
                    Анонимді деп біз белгілі бір сайтқа кірушімен нақты сәйкестендірілмейтін деректерді атаймыз (мысалы:
                    сайтқа кіру статистикасы).
                </div>

                <div className="text-base my-2">2. Ақпаратты пайдалану</div>
                <div className="text-base my-2">
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

                <div className="text-base my-2">3. Сілтемелер</div>
                <div className="text-base my-2">
                    https://kazticket.kz сайтында біздің компанияға қатысы жоқ және үшінші тұлғаларға тиесілі басқа
                    сайттарға сілтемелер болуы мүмкін. Біз үшінші тұлғалардың сайттарында орналастырылған мәліметтердің
                    дәлдігі, толықтығы және дұрыстығы үшін жауап бермейміз және өзімізге осындай сайттарда сіз қалдырған
                    ақпараттың құпиялылығын сақтау бойынша ешқандай міндеттеме алмаймыз.
                </div>

                <div className="text-base my-2">4. Жауапкершілікті шектеу</div>
                <div className="text-base my-2">
                    Біз осы құпиялылық саясатын сақтау үшін қолдан келгеннің бәрін жасаймыз, алайда, біздің ықпалымыздан
                    тыс факторлардың әсерінен ақпараттың сақталуына кепілдік бере алмаймыз, оның нәтижесі ақпаратты ашу
                    болады. https://kazticket.kz сайты және онда орналастырылған барлық ақпарат ешқандай кепілдіксіз
                    "сол қалпында" қағидаты бойынша ұсынылады. Біз қолайсыз салдарлар үшін, сондай-ақ URL сайтына кіруді
                    шектеу немесе сайтқа кіру және онда орналастырылған ақпаратты пайдалану салдарынан келтірілген кез
                    келген залалдар үшін жауап бермейміз.
                </div>

                <div className="text-base my-2">5. Байланыс</div>
                <div className="text-base my-2">
                    Осы саясатқа қатысты мәселелер бойынша мына мекен-жайға хабарласыңыз info@kazticket.kz
                </div>
                <div className="text-base">ТОО «KAZTICKET.KZ»</div>
                <div className="text-base">Қазақстан Республикасы, 010000,Нұр-Сұлтан,</div>
                <div className="text-base">Рахымжан Қошқарбаев даңғылы, 27 ғимарат</div>
                <div className="text-base">«ForteBank» АҚ-дағы № KZ3096503F0010868398 есеп айырысу шоты</div>
                <div className="text-base">БИК IRTYKZKA</div>
                <div className="text-base">БИН 220140006265</div>
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
