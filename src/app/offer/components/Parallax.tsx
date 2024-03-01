'use client';

import { getCookie } from 'cookies-next';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import WhiteMonoLogo from '@/assets/kazticket-logo-white-mono.svg';
import Logo from '@/assets/kazticket-logo.svg';
import AboutImage from '@/assets/offer/about.png';
import MainImage from '@/assets/offer/main.png';
import { isEmpty } from '@/functions';

const CardVariant: Variants = {
    offscreen: {
        translateX: '-500%',
        transition: {
            type: 'spring',
            bounce: 0.5,
            duration: 2,
        },
    },
    onscreen: {
        translateX: '0%',
        rotate: 0,
        transition: {
            type: 'spring',
            bounce: 0.5,
            duration: 2,
        },
    },
};

const KeyBenefitsVariants: Variants = {
    offscreen: {
        scale: 0.1,
        opacity: 0,
        translateY: '50%',
    },
    onscreen: {
        translateY: '0%',
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            bounce: 0.25,
            duration: 2,
        },
    },
    exit: {
        // scale: 0.5,
        // opacity: 0,
        translateY: '-250%',
        transition: {
            duration: 5, // Длительность анимации ухода
            // ease: 'easeInOut',
        },
    },
};

const AdditionalServicesVariants: Variants = {
    offscreen: {
        scale: 0.1,
        rotate: 180,
    },
    onscreen: {
        rotate: 0,
        scale: 1,
        transition: {
            type: 'spring',
            bounce: 0.5,
            duration: 1,
        },
    },
};

const ParallaxComponent = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        if (
            getCookie('theme') === 'dark' ||
            (isEmpty(getCookie('theme')) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, [!isDarkMode]);

    return (
        <AnimatePresence>
            <div className="dark:text-white lg:h-[120vh] h-[90vh] w-full flex flex-col justify-start mb-10 lg:gap-0 gap-10">
                <div className="flex flex-row justify-start lg:mx-20 mx-4 mt-10">
                    <Link href="/">
                        <Image
                            src={isDarkMode ? WhiteMonoLogo : Logo}
                            alt="Kazticket.kz Logo"
                            className="h-14 w-auto z-10 cursor-pointer"
                            priority
                        />
                    </Link>
                </div>
                <div className="flex lg:flex-row flex-col lg:gap-0 gap-20 lg:my-0 my-4 justify-between items-center w-full">
                    <div className="flex flex-col lg:mx-20 mx-4">
                        <div className="font-bold text-2xl uppercase lg:text-left text-center">
                            Пропуск к ярким событиям!
                        </div>
                        <div className="font-bold text-2xl uppercase lg:text-left text-center">
                            Жарық оғиғаларға өту!
                        </div>
                    </div>
                    <Image src={MainImage} alt="Main image" className="h-fit lg:w-1/2 w-full z-20" priority />
                </div>
                <svg
                    className="lg:h-[120vh] h-[90vh] w-full absolute z-[-1]"
                    width="1440"
                    height="907"
                    viewBox="0 0 1440 907"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M1142 546H1320V624C1320 679.228 1275.23 724 1220 724H1142V546Z" fill="#FFF5DB" />
                    <circle cx="687.5" cy="180.5" r="64.5" fill="#DAE9FF" />
                    <path d="M139 358L-39 358L-39 280C-39 224.772 5.77155 180 61 180L139 180L139 358Z" fill="#FFF5DB" />
                    <circle cx="211.5" cy="519.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="211.5" cy="540.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="211.5" cy="561.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="211.5" cy="582.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="211.5" cy="603.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="211.5" cy="624.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="211.5" cy="645.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="211.5" cy="666.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="232.5" cy="519.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="232.5" cy="540.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="232.5" cy="561.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="232.5" cy="582.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="232.5" cy="603.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="232.5" cy="624.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="232.5" cy="645.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="232.5" cy="666.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="253.5" cy="519.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="253.5" cy="540.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="253.5" cy="561.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="253.5" cy="582.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="253.5" cy="603.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="253.5" cy="624.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="253.5" cy="645.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="253.5" cy="666.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="274.5" cy="519.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="274.5" cy="540.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="274.5" cy="561.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="274.5" cy="582.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="274.5" cy="603.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="274.5" cy="624.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="274.5" cy="645.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="274.5" cy="666.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="295.5" cy="519.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="295.5" cy="540.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="295.5" cy="561.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="295.5" cy="582.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="295.5" cy="603.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="295.5" cy="624.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="295.5" cy="645.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="295.5" cy="666.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="316.5" cy="519.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="316.5" cy="540.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="316.5" cy="561.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="316.5" cy="582.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="316.5" cy="603.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="316.5" cy="624.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="316.5" cy="645.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="316.5" cy="666.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="337.5" cy="519.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="337.5" cy="540.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="337.5" cy="561.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="337.5" cy="582.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="337.5" cy="603.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="337.5" cy="624.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="337.5" cy="645.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="337.5" cy="666.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="358.5" cy="519.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="358.5" cy="540.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="358.5" cy="561.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="358.5" cy="582.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="358.5" cy="603.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="358.5" cy="624.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="358.5" cy="645.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="358.5" cy="666.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="379.5" cy="519.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="379.5" cy="540.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="379.5" cy="561.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="379.5" cy="582.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="379.5" cy="603.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="379.5" cy="624.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="379.5" cy="645.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="379.5" cy="666.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="400.5" cy="519.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="400.5" cy="540.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="400.5" cy="561.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="400.5" cy="582.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="400.5" cy="603.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="400.5" cy="624.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="400.5" cy="645.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="400.5" cy="666.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="3.5" cy="519.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="3.5" cy="540.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="3.5" cy="561.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="3.5" cy="582.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="3.5" cy="603.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="3.5" cy="624.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="3.5" cy="645.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="3.5" cy="666.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="24.5" cy="519.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="24.5" cy="540.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="24.5" cy="561.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="24.5" cy="582.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="24.5" cy="603.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="24.5" cy="624.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="24.5" cy="645.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="24.5" cy="666.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="45.5" cy="519.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="45.5" cy="540.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="45.5" cy="561.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="45.5" cy="582.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="45.5" cy="603.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="45.5" cy="624.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="45.5" cy="645.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="45.5" cy="666.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="66.5" cy="519.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="66.5" cy="540.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="66.5" cy="561.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="66.5" cy="582.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="66.5" cy="603.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="66.5" cy="624.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="66.5" cy="645.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="66.5" cy="666.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="87.5" cy="519.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="87.5" cy="540.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="87.5" cy="561.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="87.5" cy="582.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="87.5" cy="603.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="87.5" cy="624.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="87.5" cy="645.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="87.5" cy="666.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="108.5" cy="519.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="108.5" cy="540.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="108.5" cy="561.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="108.5" cy="582.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="108.5" cy="603.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="108.5" cy="624.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="108.5" cy="645.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="108.5" cy="666.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="129.5" cy="519.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="129.5" cy="540.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="129.5" cy="561.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="129.5" cy="582.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="129.5" cy="603.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="129.5" cy="624.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="129.5" cy="645.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="129.5" cy="666.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="150.5" cy="519.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="150.5" cy="540.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="150.5" cy="561.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="150.5" cy="582.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="150.5" cy="603.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="150.5" cy="624.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="150.5" cy="645.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="150.5" cy="666.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="171.5" cy="519.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="171.5" cy="540.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="171.5" cy="561.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="171.5" cy="582.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="171.5" cy="603.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="171.5" cy="624.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="171.5" cy="645.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="171.5" cy="666.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="192.5" cy="519.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="192.5" cy="540.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="192.5" cy="561.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="192.5" cy="582.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="192.5" cy="603.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="192.5" cy="624.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="192.5" cy="645.5" r="3.5" fill="#F4F4F4" />
                    <circle cx="192.5" cy="666.5" r="3.5" fill="#F4F4F4" />
                    <line y1="803.5" x2="1440" y2="803.5" stroke="#E8E8E8" />
                </svg>
            </div>
            <div className="dark:text-white h100 flex flex-col gap-10 mb-10">
                <div className="text-4xl text-center font-['Gilroy'] font-bold">О Нас</div>
                <div className="flex lg:flex-row flex-col items-center justify-center py-4">
                    <div className="lg:w-2/5 w-11/12 font-medium text-2xl lg:text-left text-center">
                        KAZTICKET.KZ - важный посредник между организатором и целевой аудиторией, который помогает
                        продавать большую часть билетов нужным людям в нужные сроки.
                    </div>
                    <img src={AboutImage.src} />
                </div>
            </div>
            <div className="dark:text-white h100 flex flex-col gap-10 mb-10">
                <motion.div
                    className="card-container"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: false, amount: 0.1 }}
                >
                    <motion.div
                        className="card"
                        variants={{
                            offscreen: {
                                scale: 0.1,
                            },
                            onscreen: {
                                scale: 1,
                                transition: {
                                    type: 'spring',
                                    bounce: 0.5,
                                    duration: 1,
                                },
                            },
                        }}
                    >
                        <div className="text-4xl text-center font-['Gilroy'] font-bold">Kazticket.kz в цифрах</div>
                    </motion.div>
                </motion.div>
                <div className="flex flex-col gap-10 py-10">
                    <div className="flex lg:flex-row flex-col items-center justify-center gap-10">
                        <div className="flex flex-row">
                            <motion.div
                                className="card-container"
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: false, amount: 0.1 }}
                            >
                                <motion.div className="card" variants={CardVariant}>
                                    <div className="flex flex-col justify-center items-center rounded-3xl p-4 bg-[#0490C3] w-80 h-80 shadow-xl">
                                        <div className="text-white font-['Gilroy'] text-7xl font-extrabold">3</div>
                                        <div className="text-white font-['Gilroy'] text-xs uppercase font-bold">
                                            Года на рынке Астаны
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                        <div className="flex flex-row">
                            <motion.div
                                className="card-container"
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: false, amount: 0.1 }}
                            >
                                <motion.div className="card" variants={CardVariant}>
                                    <div className="flex flex-col justify-center items-center rounded-3xl p-4 bg-[#DCAC33] w-80 h-80 shadow-xl">
                                        <div className="text-white font-['Gilroy'] text-6xl font-extrabold">
                                            250 000
                                        </div>
                                        <div className="text-white font-['Gilroy'] text-xs text-center uppercase font-bold">
                                            РЕЛЕВАНТНЫХ ПОЛЬЗОВАТЕЛЕЙ ЕЖЕМЕСЯЧНО ПОСЕЩАЮТ НАШИ РЕСУРСЫ
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                        <div className="flex flex-row">
                            <motion.div
                                className="card-container"
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: false, amount: 0.1 }}
                            >
                                <motion.div className="card" variants={CardVariant}>
                                    <div className="flex flex-col justify-center items-center rounded-3xl p-4 bg-[#1E3F86] w-80 h-80 shadow-xl">
                                        <div className="text-white font-['Gilroy'] text-6xl font-extrabold">
                                            311 008
                                        </div>
                                        <div className="text-white font-['Gilroy'] text-xs text-center uppercase font-bold">
                                            ЛОЯЛЬНАЯ БАЗА КЛИЕНТОВ
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                    <div className="flex lg:flex-row flex-col items-center justify-center gap-10">
                        <div className="flex flex-row">
                            <motion.div
                                className="card-container"
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: false, amount: 0.1 }}
                            >
                                <motion.div className="card" variants={CardVariant}>
                                    <div className="flex flex-col justify-center items-center rounded-3xl p-4 bg-[#3D3F3E] w-80 h-80 shadow-xl">
                                        <div className="text-white font-['Gilroy'] text-7xl font-extrabold">365</div>
                                        <div className="text-white font-['Gilroy'] text-xs uppercase font-bold">
                                            <div className="text-center">ДНЕЙ</div>
                                            <div className="text-center">24/7 КРУГЛОСУТОЧНОЙ ПОДДЕРЖКИ</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                        <div className="flex flex-row">
                            <motion.div
                                className="card-container"
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: false, amount: 0.1 }}
                            >
                                <motion.div className="card" variants={CardVariant}>
                                    <div className="flex flex-col justify-center items-center rounded-3xl p-4 bg-[#1D6387] w-80 h-80 shadow-xl">
                                        <div className="text-white font-['Gilroy'] text-6xl font-extrabold">
                                            2 074 500
                                        </div>
                                        <div className="text-white font-['Gilroy'] text-xs text-center uppercase font-bold">
                                            <div className="text-center">ПРОДАНО БИЛЕТОВ</div>
                                            <div className="text-center">С МОМЕНТА ОСНОВАНИЯ</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dark:text-white h100 flex flex-col gap-10 mb-10">
                <motion.div
                    className="card-container"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: false, amount: 0.1 }}
                >
                    <motion.div
                        className="card"
                        variants={{
                            offscreen: {
                                scale: 0.1,
                            },
                            onscreen: {
                                scale: 1,
                                transition: {
                                    type: 'spring',
                                    bounce: 0.5,
                                    duration: 1,
                                },
                            },
                        }}
                    >
                        <div className="text-4xl text-center font-['Gilroy'] font-bold">
                            Ключевые преимущества сотрудничества с <span className="text-[#0590C2]">Kazticket.kz</span>
                        </div>
                    </motion.div>
                </motion.div>
                <div className="flex flex-col justify-center gap-10">
                    <div className="flex lg:flex-row flex-col justify-center items-center gap-10">
                        <motion.div
                            className="lg:w-2/5 w-80 h-80"
                            initial="offscreen"
                            whileInView="onscreen"
                            exit="exit"
                            viewport={{ once: false, amount: 0.1 }}
                        >
                            <motion.div
                                className="flex flex-col h-80 justify-center items-start gap-5 rounded-3xl border-[#E8E8E8] border-[1px] p-8 shadow-xl shadow-[#00000006]"
                                variants={KeyBenefitsVariants}
                            >
                                <div className="text-[#0590C2] font-['Gilroy'] text-4xl font-extrabold">01</div>
                                <div className="dark:text-white text-black font-['Gilroy'] text-xl font-extrabold">
                                    ГЛУБОКОЕ ПОНИМАНИЕ АУДИТОРИИ
                                </div>
                                <div className="dark:text-white text-black font-['Gilroy'] text-xs ">
                                    Экспертиза продвижения в области досугового времяпрепровождения позволяет нам
                                    эффективно продвигать продукты партнеров, создавая нестандартные рекламные кампании
                                    и маркетинговые активности
                                </div>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className="lg:w-2/5 w-80 h-80"
                            initial="offscreen"
                            whileInView="onscreen"
                            exit="exit"
                            viewport={{ once: false, amount: 0.1 }}
                        >
                            <motion.div
                                className="flex flex-col h-80 justify-center items-start gap-5 rounded-3xl border-[#E8E8E8] border-[1px] p-8 shadow-xl shadow-[#00000006]"
                                variants={KeyBenefitsVariants}
                            >
                                <div className="text-[#0590C2] font-['Gilroy'] text-4xl font-extrabold">02</div>
                                <div className="dark:text-white text-black font-['Gilroy'] text-xl font-extrabold">
                                    КУЛЬТУРА ДАННЫХ
                                </div>
                                <div className="dark:text-white text-black font-['Gilroy'] text-xs ">
                                    Аналитическая культура KAZTICKET.KZ позволяет находить креативные решения в
                                    неожиданных местах. Анализ данных и поиск решений для улучшения сервиса и
                                    максимизации прибыли важнейший приоритет нашей команды
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                    <div className="flex lg:flex-row flex-col justify-center items-center gap-10">
                        <motion.div
                            className="lg:w-2/5 w-80 h-80"
                            initial="offscreen"
                            whileInView="onscreen"
                            exit="exit"
                            viewport={{ once: false, amount: 0.1 }}
                        >
                            <motion.div
                                className="flex flex-col h-80 justify-center items-start gap-5 rounded-3xl border-[#E8E8E8] border-[1px] p-8 shadow-xl shadow-[#00000006]"
                                variants={KeyBenefitsVariants}
                            >
                                <div className="text-[#0590C2] font-['Gilroy'] text-4xl font-extrabold">03</div>
                                <div className="dark:text-white text-black font-['Gilroy'] text-xl font-extrabold">
                                    ПРОДУКТОВАЯ КОМАНДА
                                </div>
                                <div className="dark:text-white text-black font-['Gilroy'] text-xs ">
                                    Налаженный процесс формирования гипотез и внедрение новых функций как для партнеров,
                                    так и для конечных пользователей.
                                </div>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className="lg:w-2/5 w-80 h-80"
                            initial="offscreen"
                            whileInView="onscreen"
                            exit="exit"
                            viewport={{ once: false, amount: 0.1 }}
                        >
                            <motion.div
                                className="flex flex-col h-80 justify-center items-start gap-5 rounded-3xl border-[#E8E8E8] border-[1px] p-8 shadow-xl shadow-[#00000006]"
                                variants={KeyBenefitsVariants}
                            >
                                <div className="text-[#0590C2] font-['Gilroy'] text-4xl font-extrabold">04</div>
                                <div className="dark:text-white text-black font-['Gilroy'] text-xl font-extrabold">
                                    ЭВОЛЮЦИЯ ПЛАТФОРМЫ
                                </div>
                                <div className="dark:text-white text-black font-['Gilroy'] text-xs ">
                                    Многолетний опыт в event индустрии и возможности современных технологий позволяют
                                    нам создать лучший продукт. Мы обновляем все ресурсы платформы: веб-сайт,
                                    приложения, личный кабинет организатора.
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="dark:text-white h100 flex flex-col gap-10 mb-10">
                <motion.div
                    className="card-container"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: false, amount: 0.1 }}
                >
                    <motion.div
                        className="card"
                        variants={{
                            offscreen: {
                                scale: 0.1,
                            },
                            onscreen: {
                                scale: 1,
                                transition: {
                                    type: 'spring',
                                    bounce: 0.5,
                                    duration: 1,
                                },
                            },
                        }}
                    >
                        <div className="text-4xl text-center font-['Gilroy'] font-bold">Как мы работаем</div>
                    </motion.div>
                </motion.div>
                <div className="flex lg:flex-row flex-col justify-center items-center gap-10">
                    <div className="flex flex-col px-6 justify-start items-center lg:w-1/5 w-80 gap-4 h-80">
                        <div className="w-24 h-24 bg-[rgba(5,142,192,0.05)] rounded-full flex flex-col justify-center items-center">
                            <div className="text-[#058EC0] text-2xl font-extrabold">01</div>
                        </div>
                        <div className="text-black font-['Gilroy'] text-xl font-semibold">Заявка</div>
                        <div className="dark:text-white text-black font-['Gilroy'] text-xs text-center">
                            <div>Свяжитесь с нами удобным для вас способом:</div>
                            <div className="underline">
                                <Link href="tel:+77080808999">закажите обратный звонок или позвоните по номеру:</Link>
                            </div>
                            <div className="underline">
                                <Link href="tel:+77080808999">+7 708 08-08-999</Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col px-6 justify-start items-center lg:w-1/5 w-80 gap-4 h-80">
                        <div className="w-24 h-24 bg-[rgba(216,169,51,0.05)] rounded-full flex flex-col justify-center items-center">
                            <div className="text-[#D8A933] text-2xl font-extrabold">02</div>
                        </div>
                        <div className="text-black font-['Gilroy'] text-xl font-semibold">Договор</div>
                        <div className="dark:text-white text-black font-['Gilroy'] text-xs text-center">
                            Заключаем договор на индивидуальных условиях
                        </div>
                    </div>
                    <div className="flex flex-col px-6 justify-start items-center lg:w-1/5 w-80 gap-4 h-80">
                        <div className="w-24 h-24 bg-[rgba(30,63,134,0.05)] rounded-full flex flex-col justify-center items-center">
                            <div className="text-[#1E3F86] text-2xl font-extrabold">03</div>
                        </div>
                        <div className="text-black font-['Gilroy'] text-xl font-semibold">Организация продаж</div>
                        <div className="dark:text-white text-black font-['Gilroy'] text-xs text-center">
                            Реализация всех необходимых мероприятий по организации продаж
                        </div>
                    </div>
                    <div className="flex flex-col px-6 justify-start items-center lg:w-1/5 w-80 gap-4 h-80">
                        <div className="w-24 h-24 bg-[rgba(29,100,135,0.05)] rounded-full flex flex-col justify-center items-center">
                            <div className="text-[#1D6387] text-2xl font-extrabold">04</div>
                        </div>
                        <div className="text-black font-['Gilroy'] text-xl font-semibold">Выплата средств</div>
                        <div className="dark:text-white text-black font-['Gilroy'] text-xs text-center">
                            После мероприятия мы подписываем акт сверки и выплачиваем заработанные вами средства в
                            течение трех дней.
                        </div>
                    </div>
                </div>
            </div>
            <div className="dark:text-white h100 flex flex-col gap-10 mb-10">
                <motion.div
                    className="card-container"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: false, amount: 0.1 }}
                >
                    <motion.div
                        className="card"
                        variants={{
                            offscreen: {
                                scale: 0.1,
                            },
                            onscreen: {
                                scale: 1,
                                transition: {
                                    type: 'spring',
                                    bounce: 0.5,
                                    duration: 1,
                                },
                            },
                        }}
                    >
                        <div className="text-4xl text-center font-['Gilroy'] font-bold">Дополнительные услуги</div>
                    </motion.div>
                </motion.div>
                <div className="flex flex-col justify-center gap-10">
                    <div className="flex lg:flex-row flex-col px-6 justify-around items-center">
                        <motion.div
                            className="card-container"
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: false, amount: 0.1 }}
                        >
                            <motion.div className="card" variants={AdditionalServicesVariants}>
                                <div className="flex flex-col justify-center items-center gap-5 rounded-3xl border-[#0490c373] border-[1px] p-10 lg:w-96 lg:h-96 w-80 h-80 shadow-xl shadow-[#0000000D]">
                                    <div className="text-black text-center font-['Gilroy'] text-base leading-4 font-semibold">
                                        ТАРГЕТИРОВАННАЯ РЕКЛАМА И EMAIL-РАССЫЛКА
                                    </div>
                                    <div className="text-[#757575] text-stroke-[#0490c373] drop-shadow-sm font-['Gilroy'] text-xs text-center">
                                        KAZTICKET.KZ является центром данных. Это дает нам возможность запускать
                                        рекламные кампании с высокой эффективностью с оптимизацией под продажи
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className="lg:w-1/3 w-10/12"
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: false, amount: 0.1 }}
                        >
                            <motion.div
                                variants={{
                                    offscreen: {
                                        scale: 0.1,
                                    },
                                    onscreen: {
                                        scale: 1,
                                        transition: {
                                            type: 'spring',
                                            bounce: 0.5,
                                            duration: 1,
                                        },
                                    },
                                }}
                            >
                                <div className="lg:my-0 my-10">
                                    <ul className="list-disc text-sm">
                                        <li>Таргетинг по ключевым словам в поисковых сетях: google, яндекс</li>
                                        <li>
                                            Таргетинг в контекстно-медийных сетях (баннерная реклама): youtube,
                                            новостные порталы, приложения
                                        </li>
                                        <li>
                                            Таргетинг в социальных сетях: facebook, instagram, tiktok, вконтакте,
                                            одноклассники и другие социальные сети
                                        </li>
                                        <li>Видеореклама в youtube, социальных сетях и других популярных ресурсах</li>
                                        <li>
                                            Таргетинг и email-рассылка по лояльной базе клиентов и сформированным
                                            работающим сегментам аудиторий во всех доступных площадках
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                    <div className="flex lg:flex-row flex-col px-6 justify-around items-center">
                        <motion.div
                            className="card-container"
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: false, amount: 0.1 }}
                        >
                            <motion.div className="card" variants={AdditionalServicesVariants}>
                                <div className="flex flex-col justify-center items-center gap-5 rounded-3xl border-[#0490c373] border-[1px] p-10 lg:w-96 lg:h-96 w-80 h-80 shadow-xl shadow-[#0000000D]">
                                    <div className="text-black text-center font-['Gilroy'] text-base leading-4 font-semibold">
                                        CO-MARKETING
                                    </div>
                                    <div className="text-[#757575] text-stroke-[#0490c373] drop-shadow-sm font-['Gilroy'] text-xs text-center">
                                        Совместное продвижение вашего продукта с точки зрения коммуникации с клиентом
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className="lg:w-1/3 w-10/12"
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: false, amount: 0.1 }}
                        >
                            <motion.div
                                variants={{
                                    offscreen: {
                                        scale: 0.1,
                                    },
                                    onscreen: {
                                        scale: 1,
                                        transition: {
                                            type: 'spring',
                                            bounce: 0.5,
                                            duration: 1,
                                        },
                                    },
                                }}
                            >
                                <div className="lg:my-0 my-10">
                                    <ul className="list-disc text-sm">
                                        <li>Разработка и реализация стратегии продвижения вашего продукта</li>
                                        <li>Консультация и совместные мероприятия по созданию видеоконтента</li>
                                        <li>
                                            Креативы и оформление всех необходимых рекламных носителей: как онлайн, так
                                            и офлайн
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                    <div className="flex lg:flex-row flex-col px-6 justify-around items-center">
                        <motion.div
                            className="card-container"
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: false, amount: 0.1 }}
                        >
                            <motion.div className="card" variants={AdditionalServicesVariants}>
                                <div className="flex flex-col justify-center items-center gap-5 rounded-3xl border-[#0490c373] border-[1px] p-10 lg:w-96 lg:h-96 w-80 h-80 shadow-xl shadow-[#0000000D]">
                                    <div className="text-black text-center font-['Gilroy'] text-base leading-4 font-semibold">
                                        СМИ, ПАБЛИКИ, ИНФЛЮЕНСЕРЫ
                                    </div>
                                    <div className="text-[#757575] text-stroke-[#0490c373] drop-shadow-sm font-['Gilroy'] text-xs text-center">
                                        Налаженные взаимоотношения с тематическими площадками, сми и инфлюенсерами дают
                                        нам возможность получать выгодные условия для партнеров, таким образом достигать
                                        необходимые охваты аудитории
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className="lg:w-1/3 w-10/12"
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: false, amount: 0.1 }}
                        >
                            <motion.div
                                variants={{
                                    offscreen: {
                                        scale: 0.1,
                                    },
                                    onscreen: {
                                        scale: 1,
                                        transition: {
                                            type: 'spring',
                                            bounce: 0.5,
                                            duration: 1,
                                        },
                                    },
                                }}
                            >
                                <div className="lg:my-0 my-10">
                                    <ul className="list-disc text-sm">
                                        <li>
                                            Тематические статьи и анонсы в СМИ, а также радио: nur.kz, tengrinews.kz,
                                            capital.kz
                                        </li>
                                        <li>Реклама и нативные интеграции в пабликах: sxodim, almaty.today</li>
                                        <li>Популярные блогеры и микроблогеры</li>
                                        <li>Медиаплощадки: loveradio, gakku, hit tv, energy fm, lux fm</li>
                                    </ul>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </AnimatePresence>
    );
};

export default ParallaxComponent;
