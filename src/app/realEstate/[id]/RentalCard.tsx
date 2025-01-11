'use client';

import { CalendarOutlined, CreditCardOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, DatePicker, Divider, Input, Modal, Select, Steps, TimePicker, Typography } from 'antd';
import { getCookie } from 'cookies-next';
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';

import GuestInforamation from './GuestInformation';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Almaty");

const { Text } = Typography;
const { Step } = Steps;

interface IRentalCard {
    realEstate: any;
    token: any;
    busyDates: any[];
}

const RentalCard: React.FC<IRentalCard> = ({ realEstate, token, busyDates }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [checkInOutDate, setCheckInOutDate] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
    const [checkInTime, setCheckInTime] = useState<string | null>(null);
    const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirmPhoneNumber, setConfirmPhoneNumber] = useState('');
    const [agreeWithPolicy, setAgreeWithPolicy] = useState(false);
    const [agreeWithSavingData, setAgreeWithSavingData] = useState(false);
    const clientId = 'debd4a08-0e25-440b-a68d-6b48da8a3a80';
    const router = useRouter();
    const isRealEstateAvailable = realEstate.Sessions.length === 0;
    const totalGuests = adultCount + childCount;

    const next = () => setCurrentStep(currentStep + 1);
    const prev = () => setCurrentStep(currentStep - 1);

    const handleOpenModal = (instantCheckIn = false) => {
        if (token) {
            document.documentElement.classList.toggle('overflow-hidden', true);
            if (instantCheckIn) {
                const today = dayjs(); // Текущая дата и время
                const checkOutDateTime = getCheckOutTime(); // Время выезда, рассчитанное заранее

                setCheckInOutDate([today, checkOutDateTime]);
                setCheckInTime('сейчас');
                setCheckOutTime(checkOutDateTime.format('DD.MM.YYYY в HH:00'));
            }
            setIsModalVisible(true);
            setCurrentStep(0);
        } else {
            router.push('/auth');
        }
    };

    const createSession = async () => {
        const formatedCheckInTime = dayjs(checkInTime).format('YYYY-MM-DD HH:mm:ss.SSSZ');
        const formatedCheckOutTime = dayjs(checkOutTime).format('YYYY-MM-DD HH:mm:ss.SSSZ');

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_EVENTS_URL + 'sessions', {
                method: 'POST',
                body: JSON.stringify({
                    realEstateId: realEstate.id,
                    adultCount,
                    childCount,
                    checkInTime: formatedCheckInTime,
                    checkOutTime: formatedCheckOutTime,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getCookie('accessToken')}`,
                },
                credentials: 'include',
            });
            const result = await res.json();

            if (result.success) {
                throw new Error('Failed to upload realEstate.');
            }
        } catch (e) {
        } finally {
        }
    };

    const steps = [
        {
            title: 'Даты, время и гости',
            content: (
                <GuestInforamation
                    setCheckInOutDate={setCheckInOutDate}
                    setCheckInTime={setCheckInTime}
                    setCheckOutTime={setCheckOutTime}
                    checkInTime={checkInTime}
                    checkOutTime={checkOutTime}
                    checkInOutDate={checkInOutDate}
                    setAdultCount={setAdultCount}
                    adultCount={adultCount}
                    setChildCount={setChildCount}
                    childCount={childCount}
                    realEstate={realEstate}
                    busyDates={busyDates}
                />
            ),
        },
        {
            title: 'Контакты',
            content: (
                <>
                    <PhoneInput
                        containerClass="text-black w-full"
                        onChange={(e) => setPhoneNumber(e)}
                        value={phoneNumber}
                        onlyCountries={['kz']}
                        placeholder="+7-(776)-115-64-16"
                        country={'kz'}
                        inputClass="PhoneInput"
                        disableDropdown
                        masks={{ kz: '-(...)-...-..-..' }}
                    />
                    <PhoneInput
                        containerClass="text-black w-full"
                        onChange={(e) => setConfirmPhoneNumber(e)}
                        value={confirmPhoneNumber}
                        onlyCountries={['kz']}
                        placeholder="+7-(776)-115-64-16"
                        country={'kz'}
                        inputClass="PhoneInput"
                        disableDropdown
                        masks={{ kz: '-(...)-...-..-..' }}
                    />

                    <Checkbox checked={agreeWithPolicy} onChange={() => setAgreeWithPolicy(!agreeWithPolicy)}>
                        Я согласен с условиями компании
                    </Checkbox>
                    <Checkbox
                        checked={agreeWithSavingData}
                        onChange={() => setAgreeWithSavingData(!agreeWithSavingData)}
                    >
                        Я согласен на сборку и обработку данных
                    </Checkbox>
                </>
            ),
        },
        {
            title: 'Оплата',
            content: (
                <>
                    <Text>Выберите способ оплаты:</Text>
                    <Button
                        type="primary"
                        onClick={createSession}
                        icon={<CreditCardOutlined />}
                        style={{ width: '100%', marginTop: 16, backgroundColor: '#28a745', borderColor: '#28a745' }}
                    >
                        Оплатить {realEstate.price * totalGuests}₽
                    </Button>
                </>
            ),
        },
    ];

    const getCheckOutTime = () => {
        const checkInTime = dayjs();
        let checkOutTime;

        if (checkInTime.hour() < 12) {
            checkOutTime = checkInTime.hour(12).minute(0);
        } else {
            checkOutTime = checkInTime.add(1, 'day').hour(12).minute(0);
        }
        return checkOutTime;
    };

    const isNextButtonDisabled = () => {
        switch (currentStep) {
            case 0:
                return !(checkInOutDate && checkInTime && checkOutTime && totalGuests > 0);
            default:
                return false;
        }
    };

    return (
        <Card className="lg:flex hidden flex-col w-full rounded-md shadow-xl p-4 bg-white h-fit">
            <div className="mb-4">
                <span className="text-lg font-bold">{realEstate.price}₽</span>
                <span>Ночь</span>
            </div>

            <div className="flex flex-col items-center">
                <Button
                    disabled={!isRealEstateAvailable}
                    onClick={() => handleOpenModal(true)}
                    className="bg-red-500 text-xl text-white w-full mb-4"
                >
                    {isRealEstateAvailable ? 'Заехать сейчас' : 'Занято'}
                </Button>
                <Text>
                    до{' '}
                    {isRealEstateAvailable
                        ? getCheckOutTime().format('DD.MM.YYYY HH:mm')
                        : realEstate.Sessions[0].rentEndTime.format('DD.MM.YYYY HH:mm')}
                </Text>
            </div>

            <Divider>или</Divider>

            <Button
                type="primary"
                onClick={() => handleOpenModal(false)}
                icon={<CalendarOutlined />}
                className="w-full bg-[#1677ff]"
            >
                Выбрать другие даты
            </Button>

            <Divider>или</Divider>

            <Link
                className="w-full"
                target="blank_"
                href={`https://passport.test.supreme-team.tech/oauth2/auth?response_type=code&client_id=${clientId}&state=aizhanov&redirect_uri=http://localhost:3000&scope=first_name%20last_name%20sign.297355%20birth_date`}
            >
                Ссылка
            </Link>

            <Modal
                title="Бронирование"
                open={isModalVisible}
                width={'50vw'}
                onCancel={() => {
                    document.documentElement.classList.toggle('overflow-hidden', false);
                    setIsModalVisible(false);
                }}
                footer={null}
            >
                <div>
                    <Steps current={currentStep} size="small" style={{ marginBottom: 24 }}>
                        {steps.map((item, index) => (
                            <Step key={index} title={item.title} />
                        ))}
                    </Steps>
                    <div className="flex flex-col gap-4">{steps[currentStep].content}</div>
                </div>
                <div>
                    <div>
                        <span></span>
                        <span></span>
                    </div>
                    <div>
                        <span></span>
                        <span></span>
                    </div>
                    <div>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="relative w-full h-8">
                    <Button onClick={prev} className={`left-0 absolute ${currentStep > 0 ? 'flex' : 'hidden'}`}>
                        Назад
                    </Button>
                    <Button
                        className={`bg-[#1677ff] absolute right-0 ${
                            currentStep < steps.length - 1 ? 'flex' : 'hidden'
                        }`}
                        type="primary"
                        disabled={isNextButtonDisabled()}
                        onClick={next}
                    >
                        Далее
                    </Button>
                </div>
            </Modal>
        </Card>
    );
};

export default RentalCard;
