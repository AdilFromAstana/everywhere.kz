'use client';

import { useEffect, useRef, useState } from 'react';

import FileUploadComponent from '../FileUploadComponent';
import NotificationComponent from '../NotificationComponent';

import 'react-phone-input-2/lib/style.css';

import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import PhoneInput from 'react-phone-input-2';

import { formatPrice } from '@/functions';
import { getNameLanguage } from '@/functions/getNameLanguage';
import Dropdown from '@/interfaces/Dropdown';

type ImageFile = File & {
    preview: string;
};

interface CreateRealEstateProps {
    realEstate: any;
    cities: Dropdown[];
    realEstateTypes: Dropdown[];
    locale: any;
}

const CreateRealEstate: React.FC<CreateRealEstateProps> = ({ realEstateTypes, cities, realEstate, locale }) => {
    const [images, setImages] = useState<ImageFile[]>(realEstate?.RealEstateImages ?? []);
    const [modalText, setModalText] = useState('');
    const [cityCode, setCityCode] = useState(realEstate?.cityCode);
    const [typeCode, setTypeCode] = useState(realEstate?.typeCode);
    const [contactPhoneNumber, setContactPhoneNumber] = useState(realEstate?.contactPhoneNumber);
    const [price, setPrice] = useState(realEstate?.price);
    const [square, setSquare] = useState(realEstate?.square);
    const [pricePerHour, setPricePerHour] = useState(realEstate?.pricePerHour);
    const [rooms, setRooms] = useState(realEstate?.rooms);
    const [apartmentNumber, setApartmentNumber] = useState(realEstate?.apartmentNumber);
    const [floor, setFloor] = useState(realEstate?.floor);
    const [street, setStreet] = useState(realEstate?.street);
    const [constructionYear, setConstructionYear] = useState(realEstate?.constructionYear);
    const [houseNumber, setHouseNumber] = useState(realEstate?.houseNumber);
    const [loading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [description, setDescription] = useState<string>(realEstate?.description);
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
        return (
            price &&
            cityCode &&
            description &&
            square &&
            street &&
            typeCode &&
            contactPhoneNumber &&
            constructionYear &&
            floor &&
            houseNumber &&
            pricePerHour &&
            rooms
        );
    };

    const createRealEstate = async () => {
        setIsLoading(true);
        const parseNumbers = (p: any) => parseInt(p.replace(/\s+/g, ''), 10);
        const requestData: any = {
            description: description.replace(/\r\n/g, '\n'),
            price: parseNumbers(price),
            cityCode,
            typeCode,
            square: parseNumbers(square),
            street,
            houseNumber,
            constructionYear,
            floor,
            pricePerHour: parseNumbers(pricePerHour),
            rooms: parseNumbers(rooms),
            contactPhoneNumber: contactPhoneNumber.substring(1),
            statusCode: 'pending',
            imageOrder: JSON.stringify(images.map((_, index) => index)),
        };

        const formData = new FormData();
        for (const key in requestData) {
            if (Object.prototype.hasOwnProperty.call(requestData, key)) {
                formData.append(key, requestData[key]);
            }
        }
        images.forEach((image: any, index: any) => {
            formData.append('image', image.file);
        });

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_EVENTS_URL + 'realEstates', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`,
                },
                credentials: 'include',
            });

            const result = await res.json();

            if (result.success) {
                throw new Error('Failed to upload realEstate.');
            }
            setModalText('Объявление успешно создано!');
            setIsModalVisible(true);
            document.documentElement.classList.toggle('overflow-hidden', true);
        } catch (error) {
            console.error('Error uploading realEstate:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col">
            <div className="w-full flex flex-col gap-2">
                <h2 className="text-2xl">{locale.Common.CreateRealEstate}</h2>
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
            <div className="w-full mt-4">
                <label className="block text-lg font-medium mb-2">{locale.EventPage.Fields.Type}</label>
                <select
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    value={typeCode}
                    onChange={(e) => setTypeCode(e.target.value)}
                    placeholder={locale.EventPage.Fields.SelectCity}
                >
                    <option value="">{locale.EventPage.Fields.SelectType}</option>
                    {realEstateTypes.map((c: any) => (
                        <option key={c.code} value={c.code}>
                            {c[getNameLanguage()]}
                        </option>
                    ))}
                </select>
            </div>
            <div className="w-full mt-4 flex justify-between gap-4">
                <div className="w-full">
                    <label className="block text-lg font-medium mb-2">
                        {locale.EventPage.Fields.ContactPhoneNumber}
                    </label>
                    <PhoneInput
                        containerClass="text-black w-full p-0.5 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        inputStyle={{ width: '100%', border: 'transparent' }}
                        buttonStyle={{ border: 'transparent' }}
                        onlyCountries={['kz']}
                        country={'kz'}
                        value={contactPhoneNumber}
                        onChange={(phone) => setContactPhoneNumber(phone)}
                        placeholder="+7-(776)-115-64-16"
                        inputProps={{
                            name: 'phone',
                            required: true,
                        }}
                        disableDropdown
                        masks={{ kz: '-(...)-...-..-..' }}
                    />
                </div>
                <div className="w-full">
                    <label className="block text-lg font-medium mb-2">{locale.EventPage.Fields.Square}</label>
                    <div className="relative">
                        <span className="absolute right-3 bottom-2">м²</span>
                        <input
                            value={square}
                            onChange={(e) => setSquare(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder={locale.EventPage.Fields.Square}
                        />
                    </div>
                </div>
            </div>
            <div className="w-full mt-4 flex justify-between gap-4">
                <div className="w-full">
                    <label className="block text-lg font-medium mb-2">{locale.EventPage.Fields.Price}</label>
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
                <div className="w-full">
                    <label className="block text-lg font-medium mb-2">{locale.EventPage.Fields.PricePerHour}</label>
                    <div className="relative">
                        <span className="absolute right-3 bottom-2">₸.</span>
                        <input
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            value={pricePerHour}
                            type="tel"
                            placeholder={locale.EventPage.Fields.PricePerHour}
                            onChange={(e) => {
                                if (e.target.value) {
                                    const filteredValue: number = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
                                    setPricePerHour(formatPrice(filteredValue));
                                } else {
                                    setPricePerHour(formatPrice(0));
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="w-full mt-4 flex justify-between gap-4">
                <div className="w-full">
                    <label className="block text-lg font-medium mb-2">{locale.EventPage.Fields.ConstructionYear}</label>
                    <div className="relative">
                        <span className="absolute right-3 bottom-2">гг.</span>
                        <input
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            value={constructionYear}
                            type="tel"
                            placeholder={locale.EventPage.Fields.ConstructionYear}
                            onChange={(e) => {
                                if (e.target.value) {
                                    const filteredValue: number = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
                                    setConstructionYear(formatPrice(filteredValue));
                                } else {
                                    setConstructionYear(formatPrice(0));
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="w-full">
                    <label className="block text-lg font-medium mb-2">{locale.EventPage.Fields.Rooms}</label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        value={rooms}
                        type="tel"
                        placeholder={locale.EventPage.Fields.Rooms}
                        onChange={(e) => {
                            if (e.target.value) {
                                const filteredValue: number = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
                                setRooms(formatPrice(filteredValue));
                            } else {
                                setRooms(formatPrice(0));
                            }
                        }}
                    />
                </div>
            </div>
            <div className="w-full mt-4 flex justify-between gap-4">
                <div className="w-full">
                    <label className="block text-lg font-medium mb-2">{locale.EventPage.Fields.Street}</label>
                    <div className="relative">
                        <input
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            value={street}
                            placeholder={locale.EventPage.Fields.Street}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                    </div>
                </div>
                <div className="w-full">
                    <label className="block text-lg font-medium mb-2">{locale.EventPage.Fields.HouseNumber}</label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        value={houseNumber}
                        placeholder={locale.EventPage.Fields.HouseNumber}
                        onChange={(e) => setHouseNumber(e.target.value)}
                    />
                </div>
            </div>
            <div className="w-full mt-4 flex justify-between gap-4">
                <div className="w-full">
                    <label className="block text-lg font-medium mb-2">{locale.EventPage.Fields.Floor}</label>
                    <div className="relative">
                        <input
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            value={floor}
                            placeholder={locale.EventPage.Fields.Floor}
                            onChange={(e) => setFloor(e.target.value)}
                        />
                    </div>
                </div>
                <div className="w-full">
                    <label className="block text-lg font-medium mb-2">{locale.EventPage.Fields.ApartmentNumber}</label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        value={apartmentNumber}
                        type="tel"
                        placeholder={locale.EventPage.Fields.ApartmentNumber}
                        onChange={(e) => {
                            if (e.target.value) {
                                const filteredValue: number = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
                                setApartmentNumber(formatPrice(filteredValue));
                            } else {
                                setApartmentNumber(formatPrice(0));
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
                    onClick={createRealEstate}
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

export default CreateRealEstate;
