'use client';

import { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

interface ImageModalComponentProps {
    images: any[];
}

export const ImageModal: React.FC<ImageModalComponentProps> = (params) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        updateButtonVisibility();
    }, [params.images]);

    const handleOpen = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
        document.documentElement.classList.toggle('overflow-hidden', true);
    };

    const handleClose = () => {
        setIsOpen(false);
        document.documentElement.classList.toggle('overflow-hidden', false);
    };

    const handleNext = () => {
        if (currentIndex < params.images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleOutsideClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    const updateButtonVisibility = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftButton(scrollLeft > 0);
            setShowRightButton(scrollLeft + clientWidth < scrollWidth);
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleNext(),
        onSwipedRight: () => handlePrevious(),
    });

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Check this out!',
                    text: 'Check out this amazing content.',
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            alert(
                'Sharing not supported on this device. Please use the share options provided by your browser or operating system.'
            );
        }
    };

    if (params.images?.length > 0) {
        return (
            <div className="relative w-full">
                {showLeftButton && (
                    <button
                        onClick={scrollLeft}
                        className="md:flex hidden absolute -left-6 top-1/2 transform -translate-y-1/2 bg-black rounded-full z-10 w-10 h-10 border-white border items-center justify-center text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em">
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="m15.547 2-1.305 1.27L6 11.293v1.414l8.242 8.022L15.547 22H17v-1.414l-1.305-1.271L8.18 12l7.515-7.316L17 3.414V2z"
                            ></path>
                        </svg>
                    </button>
                )}
                <div
                    className="flex space-x-4 overflow-x-auto scrollbar-hide"
                    ref={scrollContainerRef}
                    style={{ scrollBehavior: 'smooth' }}
                    onScroll={updateButtonVisibility}
                >
                    {params.images.map((image, index) => (
                        <img
                            key={index}
                            src={image.imageUrl}
                            alt={`Image ${index}`}
                            className="cursor-pointer max-h-60 border-2 dark:border-white border-black rounded"
                            onClick={() => handleOpen(index)}
                        />
                    ))}
                </div>
                {showRightButton && (
                    <button
                        onClick={scrollRight}
                        className="md:flex hidden absolute -right-6 top-1/2 transform -translate-y-1/2 bg-black rounded-full z-10 w-10 h-10 border-white border items-center justify-center text-white"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="1em"
                            height="1em"
                            className="transform scale-x-[-1]"
                        >
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="m15.547 2-1.305 1.27L6 11.293v1.414l8.242 8.022L15.547 22H17v-1.414l-1.305-1.271L8.18 12l7.515-7.316L17 3.414V2z"
                            ></path>
                        </svg>
                    </button>
                )}
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center" {...swipeHandlers}>
                        <div className="absolute w-full h-full bg-black opacity-75"></div>
                        <div className="absolute h-[10vh] w-full top-0 border-b-2 border-white flex flex-row items-center justify-between px-4 opacity-75">
                            <button
                                onClick={handleOutsideClick}
                                className={`flex bg-black w-8 h-8 p-2 rounded-full border-2 items-center justify-center`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="1em"
                                    height="1em"
                                    onClick={handleOutsideClick}
                                >
                                    <path
                                        fill="white"
                                        fillRule="evenodd"
                                        d="m15.547 2-1.305 1.27L6 11.293v1.414l8.242 8.022L15.547 22H17v-1.414l-1.305-1.271L8.18 12l7.515-7.316L17 3.414V2z"
                                    ></path>
                                </svg>
                            </button>
                            <div className="text-white">
                                {currentIndex + 1}/{params.images.length}
                            </div>
                            <button onClick={handleShare}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                                    <polyline points="16 6 12 2 8 6" />
                                    <line x1="12" y1="2" x2="12" y2="15" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-4 h-[75vh] z-10">
                            <button
                                onClick={handlePrevious}
                                className={`md:flex hidden bg-black w-10 h-10 p-2 rounded-full border-2 items-center justify-center ${
                                    currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                disabled={currentIndex === 0}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em">
                                    <path
                                        fill="white"
                                        fillRule="evenodd"
                                        d="m15.547 2-1.305 1.27L6 11.293v1.414l8.242 8.022L15.547 22H17v-1.414l-1.305-1.271L8.18 12l7.515-7.316L17 3.414V2z"
                                    ></path>
                                </svg>
                            </button>
                            <img
                                src={params.images[currentIndex].imageUrl}
                                alt={`Image ${currentIndex}`}
                                className="max-h-[75vh] md:w-3/4 w-11/12"
                            />
                            <button
                                onClick={handleNext}
                                className={`md:flex hidden bg-black w-10 h-10 p-2 rounded-full border-2 items-center justify-center ${
                                    currentIndex === params.images.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                disabled={currentIndex === params.images.length - 1}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="1em"
                                    height="1em"
                                    className="transform scale-x-[-1]"
                                >
                                    <path
                                        fill="white"
                                        fillRule="evenodd"
                                        d="m15.547 2-1.305 1.27L6 11.293v1.414l8.242 8.022L15.547 22H17v-1.414l-1.305-1.271L8.18 12l7.515-7.316L17 3.414V2z"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
};
