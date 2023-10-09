import Image from 'next/image';
import oasis from '../../../icons/oasis.png';
import { IEvent } from '@/interfaces/Interfaces';
import Modal from '@/app/components/EventPage/Modal/Modal';
import ButtonForMobile from '@/app/components/EventPage/ButtonForMobile';
import PaymentSuccessModal from '@/app/components/EventPage/PaymentSuccessModal/PaymentSuccessModal';
import { InfoTooltip } from '@/app/components/EventPage/Modal/ModalFooter/ModalFooter';
// import EditorState from 'draft-js/lib/EditorState';
// import Editor from 'draft-js/lib/DraftEditor.react';

const DescriptionIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
            <rect y="20" width="45" height="45" rx="10" transform="rotate(-25 0 20)" fill="#1E3E85" />
            <path
                d="M29.6667 40.6951L29.1002 40.9593C24.5687 43.0724 21.7746 42.996 19.1333 37.3316L16.4919 31.6672C14.3788 27.1356 15.588 23.8133 20.1196 21.7002L29.1827 17.4741C33.7142 15.361 37.0365 16.5702 39.1496 21.1017L41.791 26.7661C43.9041 31.2977 42.6948 34.62 38.1633 36.7331L37.5968 36.9972C37.2457 37.161 36.985 37.4894 36.9018 37.873L36.2591 40.9312C35.9762 42.2768 34.7527 42.8473 33.5401 42.199L30.7843 40.7257C30.4868 40.561 29.9725 40.5525 29.6667 40.6951Z"
                stroke="white"
                strokeWidth="2.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M22.1562 29.0259L33.4851 23.7432"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M24.7979 34.6902L31.5952 31.5205"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export async function generateMetadata() {
    return {
        title: 'Название',
        description: 'desc',
    };
}

const Event: React.FC = () => {
    const data: IEvent = {
        // id: 'c0e7675d-9470-4661-be63-fe239eacd07d',
        id: '6554d003-061e-4230-bf1b-e6d222fd1013',
        // id: 'beb356e8-23a6-45e9-ba01-9eed828ea087',
        name: 'Оазис',
        location: 'string',
        minCost: 2000,
        ageLimit: 18,
        beginDate: new Date(),
        posterFileUrl: oasis,
        serviceFee: 10,
        isRepeatable: true,
        description:
            'Премьера состоялась 24 декабря 1944 года в ГАТОБ им. Абая Премьера в «Астана Опера» – 25 сентября 2015 года ПОСТАНОВОЧНАЯ ГРУППАДирижер-постановщик – Алан Бурибаев, Заслуженный деятель Казахстана, лауреат Государственной премии РКРежиссер-постановщик – Джанкарло дель МонакоКонсультант режиссера – Есмухан Обаев, Народный артист Казахстана',
        // description:
        //   '{"blocks":[{"key":"aocbs","text":"Премьера состоялась 24 декабря 1944 года в ГАТОБ им. Абая","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"color-rgb(53,53,53)"},{"offset":9,"length":48,"style":"color-rgb(53,53,53)"},{"offset":0,"length":8,"style":"bgcolor-rgb(255,255,255)"},{"offset":9,"length":48,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":8,"style":"fontsize-16"},{"offset":9,"length":48,"style":"fontsize-16"},{"offset":0,"length":8,"style":"fontfamily-Roboto"},{"offset":9,"length":48,"style":"fontfamily-Roboto"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"9pcav","text":"Премьера в «Астана Опера» – 25 сентября 2015 года","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":25,"style":"color-rgb(53,53,53)"},{"offset":26,"length":1,"style":"color-rgb(53,53,53)"},{"offset":28,"length":21,"style":"color-rgb(53,53,53)"},{"offset":0,"length":25,"style":"bgcolor-rgb(255,255,255)"},{"offset":26,"length":1,"style":"bgcolor-rgb(255,255,255)"},{"offset":28,"length":21,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":25,"style":"fontsize-16"},{"offset":26,"length":1,"style":"fontsize-16"},{"offset":28,"length":21,"style":"fontsize-16"},{"offset":0,"length":25,"style":"fontfamily-Roboto"},{"offset":26,"length":1,"style":"fontfamily-Roboto"},{"offset":28,"length":21,"style":"fontfamily-Roboto"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"4b8nk","text":" ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"text-align":"center"}},{"key":"amh7e","text":"ПОСТАНОВОЧНАЯ ГРУППА","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":20,"style":"color-rgb(53,53,53)"},{"offset":0,"length":20,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":20,"style":"fontsize-16"},{"offset":0,"length":20,"style":"fontfamily-Roboto"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"f6jt8","text":"Дирижер-постановщик – Алан Бурибаев, Заслуженный деятель Казахстана, лауреат Государственной премии РК","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":21,"style":"color-rgb(53,53,53)"},{"offset":22,"length":14,"style":"color-rgb(53,53,53)"},{"offset":37,"length":65,"style":"color-rgb(53,53,53)"},{"offset":0,"length":21,"style":"bgcolor-rgb(255,255,255)"},{"offset":22,"length":14,"style":"bgcolor-rgb(255,255,255)"},{"offset":37,"length":65,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":21,"style":"fontsize-16"},{"offset":22,"length":14,"style":"fontsize-16"},{"offset":37,"length":65,"style":"fontsize-16"},{"offset":0,"length":21,"style":"fontfamily-Roboto"},{"offset":22,"length":14,"style":"fontfamily-Roboto"},{"offset":37,"length":65,"style":"fontfamily-Roboto"},{"offset":22,"length":13,"style":"BOLD"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"26tia","text":"Режиссер-постановщик – Джанкарло дель Монако","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":22,"style":"color-rgb(53,53,53)"},{"offset":23,"length":21,"style":"color-rgb(53,53,53)"},{"offset":0,"length":22,"style":"bgcolor-rgb(255,255,255)"},{"offset":23,"length":21,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":22,"style":"fontsize-16"},{"offset":23,"length":21,"style":"fontsize-16"},{"offset":0,"length":22,"style":"fontfamily-Roboto"},{"offset":23,"length":21,"style":"fontfamily-Roboto"},{"offset":23,"length":21,"style":"BOLD"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"emdog","text":"Консультант режиссера – Есмухан Обаев, Народный артист Казахстана","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":23,"style":"color-rgb(53,53,53)"},{"offset":24,"length":14,"style":"color-rgb(53,53,53)"},{"offset":39,"length":26,"style":"color-rgb(53,53,53)"},{"offset":0,"length":23,"style":"bgcolor-rgb(255,255,255)"},{"offset":24,"length":14,"style":"bgcolor-rgb(255,255,255)"},{"offset":39,"length":26,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":23,"style":"fontsize-16"},{"offset":24,"length":14,"style":"fontsize-16"},{"offset":39,"length":26,"style":"fontsize-16"},{"offset":0,"length":23,"style":"fontfamily-Roboto"},{"offset":24,"length":14,"style":"fontfamily-Roboto"},{"offset":39,"length":26,"style":"fontfamily-Roboto"},{"offset":24,"length":13,"style":"BOLD"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"8m8o0","text":"Сценограф – Эцио Фриджерио","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":11,"style":"color-rgb(53,53,53)"},{"offset":12,"length":14,"style":"color-rgb(53,53,53)"},{"offset":0,"length":11,"style":"bgcolor-rgb(255,255,255)"},{"offset":12,"length":14,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":11,"style":"fontsize-16"},{"offset":12,"length":14,"style":"fontsize-16"},{"offset":0,"length":11,"style":"fontfamily-Roboto"},{"offset":12,"length":14,"style":"fontfamily-Roboto"},{"offset":12,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"5rami","text":"Художник по костюмам – Франка Скуарчапино","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":22,"style":"color-rgb(53,53,53)"},{"offset":23,"length":18,"style":"color-rgb(53,53,53)"},{"offset":0,"length":22,"style":"bgcolor-rgb(255,255,255)"},{"offset":23,"length":18,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":22,"style":"fontsize-16"},{"offset":23,"length":18,"style":"fontsize-16"},{"offset":0,"length":22,"style":"fontfamily-Roboto"},{"offset":23,"length":18,"style":"fontfamily-Roboto"},{"offset":23,"length":18,"style":"BOLD"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"bgg04","text":"Хормейстер – Ержан Даутов, Заслуженный деятель Казахстана","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":12,"style":"color-rgb(53,53,53)"},{"offset":13,"length":13,"style":"color-rgb(53,53,53)"},{"offset":27,"length":30,"style":"color-rgb(53,53,53)"},{"offset":0,"length":12,"style":"bgcolor-rgb(255,255,255)"},{"offset":13,"length":13,"style":"bgcolor-rgb(255,255,255)"},{"offset":27,"length":30,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":12,"style":"fontsize-16"},{"offset":13,"length":13,"style":"fontsize-16"},{"offset":27,"length":30,"style":"fontsize-16"},{"offset":0,"length":12,"style":"fontfamily-Roboto"},{"offset":13,"length":13,"style":"fontfamily-Roboto"},{"offset":27,"length":30,"style":"fontfamily-Roboto"},{"offset":13,"length":12,"style":"BOLD"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"cm0dk","text":"Художник по проекциям – Серджио Металли","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":23,"style":"color-rgb(53,53,53)"},{"offset":24,"length":15,"style":"color-rgb(53,53,53)"},{"offset":0,"length":23,"style":"bgcolor-rgb(255,255,255)"},{"offset":24,"length":15,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":23,"style":"fontsize-16"},{"offset":24,"length":15,"style":"fontsize-16"},{"offset":0,"length":23,"style":"fontfamily-Roboto"},{"offset":24,"length":15,"style":"fontfamily-Roboto"},{"offset":24,"length":15,"style":"BOLD"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"5su6m","text":"Художник по свету – Виничио Кели","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"color-rgb(53,53,53)"},{"offset":20,"length":12,"style":"color-rgb(53,53,53)"},{"offset":0,"length":19,"style":"bgcolor-rgb(255,255,255)"},{"offset":20,"length":12,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":19,"style":"fontsize-16"},{"offset":20,"length":12,"style":"fontsize-16"},{"offset":0,"length":19,"style":"fontfamily-Roboto"},{"offset":20,"length":12,"style":"fontfamily-Roboto"},{"offset":20,"length":12,"style":"BOLD"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"8esgm","text":"Балетмейстеры-постановщики – Турсынбек Нуркалиев, Заслуженный деятель Казахстана / Галия Бурибаева, Заслуженный деятель Казахстана","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":28,"style":"color-rgb(53,53,53)"},{"offset":29,"length":20,"style":"color-rgb(53,53,53)"},{"offset":50,"length":32,"style":"color-rgb(53,53,53)"},{"offset":83,"length":16,"style":"color-rgb(53,53,53)"},{"offset":100,"length":30,"style":"color-rgb(53,53,53)"},{"offset":0,"length":28,"style":"bgcolor-rgb(255,255,255)"},{"offset":29,"length":20,"style":"bgcolor-rgb(255,255,255)"},{"offset":50,"length":32,"style":"bgcolor-rgb(255,255,255)"},{"offset":83,"length":16,"style":"bgcolor-rgb(255,255,255)"},{"offset":100,"length":30,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":28,"style":"fontsize-16"},{"offset":29,"length":20,"style":"fontsize-16"},{"offset":50,"length":32,"style":"fontsize-16"},{"offset":83,"length":16,"style":"fontsize-16"},{"offset":100,"length":30,"style":"fontsize-16"},{"offset":0,"length":28,"style":"fontfamily-Roboto"},{"offset":29,"length":20,"style":"fontfamily-Roboto"},{"offset":50,"length":32,"style":"fontfamily-Roboto"},{"offset":83,"length":16,"style":"fontfamily-Roboto"},{"offset":100,"length":30,"style":"fontfamily-Roboto"},{"offset":29,"length":19,"style":"BOLD"},{"offset":83,"length":15,"style":"BOLD"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"6nf3p","text":"Директор оперной труппы – Азамат Желтыргузов, Заслуженный деятель Казахстана","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":25,"style":"color-rgb(53,53,53)"},{"offset":26,"length":19,"style":"color-rgb(53,53,53)"},{"offset":46,"length":30,"style":"color-rgb(53,53,53)"},{"offset":0,"length":25,"style":"bgcolor-rgb(255,255,255)"},{"offset":26,"length":19,"style":"bgcolor-rgb(255,255,255)"},{"offset":46,"length":30,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":25,"style":"fontsize-16"},{"offset":26,"length":19,"style":"fontsize-16"},{"offset":46,"length":30,"style":"fontsize-16"},{"offset":0,"length":25,"style":"fontfamily-Roboto"},{"offset":26,"length":19,"style":"fontfamily-Roboto"},{"offset":46,"length":30,"style":"fontfamily-Roboto"},{"offset":26,"length":18,"style":"BOLD"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"eogti","text":"Ассистент дирижера-постановщика – Руслан Баймурзин","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":33,"style":"color-rgb(53,53,53)"},{"offset":34,"length":16,"style":"color-rgb(53,53,53)"},{"offset":0,"length":33,"style":"bgcolor-rgb(255,255,255)"},{"offset":34,"length":16,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":33,"style":"fontsize-16"},{"offset":34,"length":16,"style":"fontsize-16"},{"offset":0,"length":33,"style":"fontfamily-Roboto"},{"offset":34,"length":16,"style":"fontfamily-Roboto"},{"offset":34,"length":16,"style":"BOLD"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"a5tr8","text":"Ассистент режиссера-постановщика – Еренбак Тойкенов","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":34,"style":"color-rgb(53,53,53)"},{"offset":35,"length":16,"style":"color-rgb(53,53,53)"},{"offset":0,"length":34,"style":"bgcolor-rgb(255,255,255)"},{"offset":35,"length":16,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":34,"style":"fontsize-16"},{"offset":35,"length":16,"style":"fontsize-16"},{"offset":0,"length":34,"style":"fontfamily-Roboto"},{"offset":35,"length":16,"style":"fontfamily-Roboto"},{"offset":35,"length":16,"style":"BOLD"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"88kql","text":"Ассистент художника по костюмам – Арасель Досмуратова","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":33,"style":"color-rgb(53,53,53)"},{"offset":34,"length":19,"style":"color-rgb(53,53,53)"},{"offset":0,"length":33,"style":"bgcolor-rgb(255,255,255)"},{"offset":34,"length":19,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":33,"style":"fontsize-16"},{"offset":34,"length":19,"style":"fontsize-16"},{"offset":0,"length":33,"style":"fontfamily-Roboto"},{"offset":34,"length":19,"style":"fontfamily-Roboto"},{"offset":34,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"92rl7","text":" ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"text-align":"center"}},{"key":"en92t","text":"* * * * *","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":9,"style":"color-rgb(53,53,53)"},{"offset":0,"length":9,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":9,"style":"fontsize-16"},{"offset":0,"length":9,"style":"fontfamily-Roboto"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"dimej","text":" ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"text-align":"center"}},{"key":"3ad30","text":"Шедевр национальной классики – опера А. Жубанова и Л. Хамиди «Абай» в новой трактовке дирижера Алана Бурибаева и режиссера Джанкарло дель Монако. Высокий интеллект и уровень культуры, тонкое чувство музыкального материала отличают прочтение партитуры музыкального руководителя постановки – главного дирижера театра Заслуженного деятеля Казахстана Алана Бурибаева. Оркестр под его управлением звучит фантастически!","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":413,"style":"color-rgb(53,53,53)"},{"offset":0,"length":413,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":413,"style":"fontsize-16"},{"offset":0,"length":413,"style":"fontfamily-Roboto"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"8rnfm","text":"Замечательный творческий дуэт выдающегося сценографа современности Эцио Фриджерио и художника по костюмам – лауреата премии «Оскар» Франки Скуарчапино восхищает оригинальностью сценических решений. Так, кабинет Абая наглядно раскрывает многогранный мир поэта: блистающая золотом книг библиотека, глобус, армилляр, бюсты великих философов… А двери кабинета распахиваются прямо в огромный мир!","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":391,"style":"color-rgb(53,53,53)"},{"offset":0,"length":391,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":391,"style":"fontsize-16"},{"offset":0,"length":391,"style":"fontfamily-Roboto"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"d7q4m","text":"Использование в финальной сцене 3D-технологий срабатывает точно, вызывая бурю эмоций, мощный патриотический подъем.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":115,"style":"color-rgb(53,53,53)"},{"offset":0,"length":115,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":115,"style":"fontsize-16"},{"offset":0,"length":115,"style":"fontfamily-Roboto"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"3fals","text":" ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"text-align":"center"}},{"key":"d0g9a","text":"СОЛИСТЫ ОПЕРЫ, ОРКЕСТР, ХОР, БАЛЕТ И МИМАНС ТЕАТРА «АСТАНА ОПЕРА»","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":65,"style":"color-rgb(53,53,53)"},{"offset":0,"length":65,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":65,"style":"fontsize-16"},{"offset":0,"length":65,"style":"fontfamily-Roboto"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"771gv","text":" ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"text-align":"center"}},{"key":"fdag0","text":"Просим учесть: в спектакле принимают участие животные (лошадь)","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":62,"style":"color-rgb(53,53,53)"},{"offset":0,"length":62,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":62,"style":"fontsize-16"},{"offset":0,"length":62,"style":"fontfamily-Roboto"},{"offset":0,"length":62,"style":"BOLD"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"gj29","text":" ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"text-align":"center"}},{"key":"3t6dv","text":"В 2018 году Государственный театр оперы и балета «Астана Опера» за постановку оперы «Абай» А.Жубанова и Л.Хамиди был награжден Государственной премией Республики Казахстан в области литературы и искусства.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":205,"style":"color-rgb(53,53,53)"},{"offset":0,"length":205,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":205,"style":"fontsize-16"},{"offset":0,"length":205,"style":"fontfamily-Roboto"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"6bj7o","text":" ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"text-align":"center"}},{"key":"3d0ic","text":"Билеты, приобретенные в ГТОБ «Астана Опера» подлежат обмену и возврату только в случаях отмены или переноса спектаклей. Во всех иных случаях возврат и обмен не производится. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":173,"style":"color-rgb(53,53,53)"},{"offset":0,"length":173,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":173,"style":"fontsize-16"},{"offset":0,"length":173,"style":"fontfamily-Roboto"},{"offset":0,"length":173,"style":"color-rgb(51,51,51)"}],"entityRanges":[],"data":{"text-align":"center"}}],"entityMap":{}}',
    };

    // function createLinkDecorator() {
    //   return new CompositeDecorator([
    //     {
    //       strategy: (contentBlock, callback, contentState) => {
    //         contentBlock.findEntityRanges((character) => {
    //           const entityKey = character.getEntity();
    //           return (
    //             entityKey !== null &&
    //             contentState.getEntity(entityKey).getType() === 'LINK'
    //           );
    //         }, callback);
    //       },
    //       component: Link,
    //     },
    //   ]);
    // }

    const lgEventWrapper = 'lg:mt-8';
    const EventWrapper = 'flex flex-col gap-10';
    const lgPoster = 'lg:h-[85vh]';

    const lgEventTitle = '';
    const EventTitle = '';

    const descriptionTitle = 'text-xl font-semibold';
    const lgDescriptionTitle = 'lg:text-4xl lg:flex lg:items-center lg:mt-16 lg:mb-8';

    const descriptionWrapper = 'text-base font-normal';
    const lgDescriptionWrapper = 'lg:border-2 lg:p-8 lg:rounded-2xl lg:text-xl';

    // const contentState = convertFromRaw(JSON.parse(data.description));
    // const linkDecorator = createLinkDecorator();
    // const editorState = EditorState.createWithContent(
    //   contentState,
    //   linkDecorator
    // );

    return (
        <main className={`${lgEventWrapper} ${EventWrapper}`}>
            <h1 className="mt-4 flex justify-center">{data.name}</h1>
            <Image className={`w-full ${lgPoster}`} src={data.posterFileUrl} alt="oasis" />
            <Modal />
            {/* <div className='text-xl font-semibold'>{data.name}</div> */}

            {/* <div className='iconsAndInfo'>
        <div />
        <div />
        <div />
      </div> */}

            <div>
                <div className={`${descriptionTitle} ${lgDescriptionTitle}`}>
                    <div className="hidden lg:block">
                        <DescriptionIcon />
                    </div>
                    Описание
                </div>
                <div className={`${descriptionWrapper} ${lgDescriptionWrapper}`}>
                    {/* <Editor
            editorState={editorState}
            // initialContentState={JSON.parse(event.description)}
            readOnly={true}
            toolbarHidden={true}
          /> */}
                    {data.description}
                </div>
            </div>
            <ButtonForMobile />
            <PaymentSuccessModal />
            <InfoTooltip />
            {/* <CardWrapper eventId={data.id} serviceFee={data.serviceFee} /> */}
        </main>
    );
};

export default Event;
