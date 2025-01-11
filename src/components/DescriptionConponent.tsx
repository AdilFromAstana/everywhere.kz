'use client';

import React, { useEffect, useRef } from 'react';

interface DescriptionComponentProps {
    description: string;
}

const DescriptionComponent: React.FC<DescriptionComponentProps> = ({ description }) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Сбрасываем высоту
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [description]);

    return (
        <textarea
            ref={textareaRef} // Привязка рефа к элементу
            value={description}
            cols={30}
            rows={10}
            readOnly
            className="w-full dark:text-white cursor-default focus:outline-none text-sm resize-none bg-transparent"
        />
    );
};

export default DescriptionComponent;
