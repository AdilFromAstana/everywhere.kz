'use client';

import { useEffect, useRef, useState } from 'react';

import NotificationComponent from '../NotificationComponent';
import FileUploadComponent from './../FileUploadComponent';

import 'react-quill/dist/quill.snow.css';

import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';

import { formatPrice } from '@/functions';
import { getNameLanguage } from '@/functions/getNameLanguage';
import Dropdown from '@/interfaces/Dropdown';

type ImageFile = File & {
    preview: string;
};

interface CreateAnnouncementProps {
    announcement: any;
    cities: Dropdown[];
    businessFields: Dropdown[];
    adPlacements: Dropdown[];
    announcementTypes: Dropdown[];
    locale: any;
}

const CreateAnnouncement: React.FC<CreateAnnouncementProps> = ({
    announcementTypes,
    cities,
    businessFields,
    adPlacements,
    announcement,
    locale,
}) => {
    const getUserId = () => {
        const token = getCookie('accessToken');
        if (token) {
            const decodedToken: any = jwtDecode(token);
            return decodedToken.id;
        } else {
            return null;
        }
    };

    const [images, setImages] = useState<ImageFile[]>(announcement?.AnnouncementImages ?? []);
    const [title, setTitle] = useState(announcement?.title);
    const [modalText, setModalText] = useState('');
    const [cityCode, setCityCode] = useState(announcement?.cityCode);
    const [announcementTypeCode, setAnnouncementTypeCode] = useState(announcementTypes[0].code);
    const [businessFieldCode, setBusinessFieldCode] = useState(announcement?.businessFieldCode);
    const [adPlacementCode, setAdPlacementCode] = useState(announcement?.adPlacementCode);
    const [price, setPrice] = useState(announcement?.price);
    const [loading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [description, setDescription] = useState<string>(announcement?.description);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 10}px`;
        }
    }, [description]);

    const getIsButtonDisabled = () => {
        switch (announcementTypeCode) {
            case 'advertiser':
                return price && adPlacementCode && title && cityCode && businessFieldCode && description;
            case 'promoter':
                return price && adPlacementCode && title && cityCode && description;
            default:
                return false;
        }
    };

    const handleTitleChange = (e: any) => {
        const input = e.target.value;
        if (input.length <= 64) {
            setTitle(input);
        }
    };

    const createAnnouncement = async () => {
        setIsLoading(true);
        const priceToNumber = parseInt(price.replace(/\s+/g, ''), 10);
        const requestData: any = {
            title,
            description: description.replace(/\r\n/g, '\n'),
            price: priceToNumber,
            announcementTypeCode,
            businessFieldCode,
            cityCode,
            adPlacementCode,
            statusCode: 'pending',
            authorId: getUserId(),
            imageOrder: JSON.stringify(images.map((_, index) => index)),
        };

        if (announcementTypeCode === 'promoter') {
            delete requestData.businessFieldCode;
        }

        const formData = new FormData();
        for (const key in requestData) {
            if (Object.prototype.hasOwnProperty.call(requestData, key)) {
                formData.append(key, requestData[key]);
            }
        }
        images.forEach((image: any) => {
            formData.append('image', image.file);
        });

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_EVENTS_URL + 'announcements', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`,
                },
                credentials: 'include',
            });

            const result = await res.json();

            if (result.success) {
                throw new Error('Failed to upload announcement.');
            }
            setModalText('Объявление успешно создано!');
            setIsModalVisible(true);
            document.documentElement.classList.toggle('overflow-hidden', true);
        } catch (error) {
            console.error('Error uploading announcement:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col">
            <div className="w-full flex flex-col gap-2">
                <h2 className="text-2xl">{locale.Common.CreateAnnouncement}</h2>
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {announcementTypes.map((announcementType) => {
                        const isThisButtonSeleted = announcementType.code === announcementTypeCode;
                        return (
                            <button
                                key={announcementType.code}
                                className={`dark:text-white md:px-4 md:py-2 px-2 py-1 rounded text-nowrap capitalize ${
                                    isThisButtonSeleted
                                        ? 'dark:bg-gray-700 bg-blue-600 text-white'
                                        : 'dark:bg-gray-400 bg-white border border-black'
                                }`}
                                onClick={() => {
                                    if (!isThisButtonSeleted) setAnnouncementTypeCode(announcementType.code);
                                }}
                            >
                                Я {announcementType[getNameLanguage()]}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="w-full mt-4 relative">
                <label className="block text-lg font-medium mb-2">{locale.EventPage.Fields.Title}</label>
                <input
                    placeholder="Например: 100k просмотров в TikTok для фитнес зала ..."
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    value={title}
                    onChange={handleTitleChange}
                />
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 absolute right-0">
                    {title?.length} / 64
                </div>
            </div>
            <div className="w-full mt-4">
                <label className="block text-lg font-medium mb-2">{locale.EventPage.Fields.City}</label>
                <select
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    value={cityCode}
                    onChange={(e) => setCityCode(e.target.value)}
                    placeholder={locale.EventPage.Fields.SelectCity}
                >
                    <option value="">{locale.EventPage.Fields.SelectCity}</option>
                    {cities.map((c: any) => (
                        <option key={c.code} value={c.code}>
                            {c[getNameLanguage()]}
                        </option>
                    ))}
                </select>
            </div>
            {announcementTypeCode === 'advertiser' && (
                <div className="w-full mt-4">
                    <label className="block text-lg font-medium mb-2">{locale.EventPage.Fields.BusinessField}</label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        value={businessFieldCode}
                        onChange={(e) => setBusinessFieldCode(e.target.value)}
                        placeholder={locale.EventPage.Fields.SelectBusinessField}
                    >
                        <option value="">{locale.EventPage.Fields.SelectBusinessField}</option>
                        {businessFields.map((f: any) => (
                            <option key={f.code} value={f.code}>
                                {f[getNameLanguage()]}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <div className="w-full mt-4">
                <label className="block text-lg font-medium mb-2">{locale.EventPage.Fields.AdPlacement}</label>
                <select
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    value={adPlacementCode}
                    onChange={(e) => setAdPlacementCode(e.target.value)}
                    placeholder={locale.EventPage.Fields.SelectAdPlacement}
                >
                    <option value="">{locale.EventPage.Fields.SelectAdPlacement}</option>
                    {adPlacements.map((p: any) => (
                        <option key={p.code} value={p.code}>
                            {p[getNameLanguage()]}
                        </option>
                    ))}
                </select>
            </div>
            <div className="w-full mt-4">
                <label className="block text-lg font-medium mb-2">{locale.EventPage.Fields.Payment}</label>
                <div className="relative">
                    <span className="absolute right-3 bottom-2">₸.</span>
                    <input
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        value={price}
                        type="tel"
                        placeholder={locale.EventPage.Fields.PaymentPlaceholder}
                        onChange={(e) => {
                            if (e.target.value) {
                                const filteredValue: number = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
                                setPrice(formatPrice(filteredValue));
                            } else {
                                setPrice(formatPrice(0));
                            }
                        }}
                    />
                </div>
            </div>
            <div className="w-full mt-4 relative">
                <label className="block text-lg font-medium mb-2">{locale.EventPage.Fields.Description}</label>
                <textarea
                    ref={textareaRef}
                    value={description}
                    onChange={handleTextareaChange}
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder={locale.EventPage.Fields.DescriptionPlaceholder}
                    rows={5} // Set the initial row count to 1
                />
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 absolute right-0">
                    {description?.length} / 1000
                </div>
            </div>
            <FileUploadComponent setImages={setImages} images={images} />
            <div className="w-full mt-4 flex justify-end gap-4">
                <button
                    className={`bg-blue-500 text-white px-2 py-1 rounded ${
                        !getIsButtonDisabled() || loading ? 'bg-gray-300 cursor-not-allowed' : ''
                    }`}
                    onClick={createAnnouncement}
                    disabled={!getIsButtonDisabled() || loading}
                >
                    <div className="flex items-center justify-center">
                        {locale.EventPage.Fields.Post}
                        {loading ? <div className="spinner ml-2"></div> : null}
                    </div>
                </button>
            </div>
            <NotificationComponent
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                text={modalText}
            />
        </div>
    );
};

export default CreateAnnouncement;
