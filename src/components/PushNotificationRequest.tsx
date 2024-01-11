'use client';

import { Transition } from '@headlessui/react';
import { getCookie, setCookie } from 'cookies-next';
import { Fragment, useEffect, useState } from 'react';

interface PushNotificationProps {
    // date: any;
}

const PushNotificationRequest = ({}: PushNotificationProps) => {
    const [serviceWorker, setServiceWorker] = useState<ServiceWorkerRegistration>();
    const [isServiceWorkerRegistered, setIsServiceWorkerRegistered] = useState(false);
    const [IsCanceled, setIsCanceled] = useState(false);
    const IsSubcribed = getCookie('IsSubcribed');

    useEffect(() => {
        setTimeout(
            () => {
                if ('serviceWorker' in navigator && 'PushManager' in window) {
                    navigator.serviceWorker
                        .register('/service-worker.js')
                        .then((registration: ServiceWorkerRegistration) => {
                            console.log('Service Worker зарегистрирован:', registration);
                            setIsServiceWorkerRegistered(true);
                            setServiceWorker(registration);
                            // requestNotificationPermission(registration);
                        })
                        .catch((error: Error) => {
                            console.error('Ошибка регистрации Service Worker:', error);
                        });
                } else {
                    console.warn('Push-уведомления не поддерживаются этим браузером.');
                }
            },
            Math.floor(Math.random() * 5000)
        );
    }, []);

    const requestNotificationPermission = (registration: ServiceWorkerRegistration) => {
        Notification.requestPermission().then((status: NotificationPermission) => {
            console.log('Статус разрешения уведомлений:', status);
            if (status === 'granted') {
                createPushSubscription(registration);
            }
        });
    };

    const createPushSubscription = (registration: ServiceWorkerRegistration) => {
        const options: PushSubscriptionOptionsInit = {
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_KEY ?? ''),
        };

        registration.pushManager
            .subscribe(options)
            .then(async (subscription: PushSubscription) => {
                // Здесь можно отправить подписку на сервер
                const data = {
                    Auth: arrayBufferToBase64(subscription.getKey('auth')),
                    P256dh: arrayBufferToBase64(subscription.getKey('p256dh')),
                    Endpoint: subscription?.endpoint,
                    ApplicationServerKey: JSON.stringify(subscription?.options?.applicationServerKey),
                    UserVisibleOnly: subscription?.options?.userVisibleOnly,
                };

                return fetch(process.env.NEXT_PUBLIC_EVENTUM_TEMP_URL + 'subscribers', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Проблема при отправке подписки на сервер');
                }
                setCookie('IsSubcribed', true, {
                    maxAge: 60 * 60 * 24 * 365,
                });
                setIsCanceled(true);
                console.log('Подписка успешно отправлена на сервер');
            })
            .catch((err: Error) => {
                console.log('Ошибка отправки подписки на сервер:', err);
            });
    };

    if (!IsCanceled && !IsSubcribed && isServiceWorkerRegistered && serviceWorker) {
        return (
            <div className="fixed z-50 lg:right-4 lg:bottom-4 right-2 bottom-2 rounded-lg shadow-xl">
                <Transition
                    as={Fragment}
                    show={isServiceWorkerRegistered}
                    enter="transition fade-in-up duration-500"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-450"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >
                    <div className="flex flex-col gap-4 rounded-lg bg-[#0590C4] leading-6 p-4">
                        <div className="text-white flex flex-col lg:max-w-md max-w-xs">
                            <span className="lg:text-xl text-md">
                                Хотите быть в курсе самых интересных мероприятий?
                            </span>
                            <span className="lg:text-md text-sm">
                                Разрешите уведомления и узнавайте о новых событиях первыми!
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <div
                                onClick={() => requestNotificationPermission(serviceWorker)}
                                className="text-black cursor-pointer bg-white px-5 lg:text-2xl text-lg rounded-lg"
                            >
                                Разрешить
                            </div>
                            <div
                                onClick={() => {
                                    setIsCanceled(true);
                                    setCookie('IsSubcribed', true, {
                                        maxAge: 60 * 60 * 24 * 1,
                                    });
                                }}
                                className="text-white cursor-pointer lg:text-lg text-sm rounded-lg underline"
                            >
                                Нет, спасибо
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        );
    } else {
        return <></>;
    }
};

const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

const arrayBufferToBase64 = (buffer: ArrayBuffer | null) => {
    let binary = '';
    if (buffer) {
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;

        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
};

export default PushNotificationRequest;
