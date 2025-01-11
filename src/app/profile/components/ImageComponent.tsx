'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import ava from '../../../images/default-ui-image-placeholder-wireframes-600nw-1037719192.webp';

interface UploadImageComponentProps {
    imageUrl: string;
}

const ImageComponent: React.FC<UploadImageComponentProps> = ({ imageUrl }) => {
    const [imageData, setImageData] = useState(imageUrl);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [hovered, setHovered] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const fileUrl = URL.createObjectURL(file);
            setImageData(fileUrl);
            setHovered(false);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const res = await fetch('/api/upload-image', {
                method: 'POST',
                body: formData,
                cache: 'no-store',
            });

            if (res.ok) {
                const result = await res.json();
                setImageData(result.imageUrl);
            } else {
                console.error('Error uploading image:', res.statusText);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const resetImage = () => {
        setImageData(imageUrl);
        setSelectedFile(null);
    };

    return (
        <div className="relative flex flex-col w-fit gap-4">
            <div
                className="relative w-fit"
                onMouseEnter={() => !selectedFile && setHovered(true)}
                onMouseLeave={() => !selectedFile && setHovered(false)}
            >
                <Image
                    className="border-2 dark:border-white border-black rounded-full w-48 h-48"
                    src={imageData || ava.src}
                    width={240}
                    height={240}
                    alt="User uploaded image"
                />
                {hovered && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                        <label className="text-white cursor-pointer w-fit text-center">
                            Изменить изображение
                            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>
                )}
            </div>
            {selectedFile && (
                <div className="flex gap-2 flex-col w-full">
                    <button className="text-white rounded bg-blue-500 px-2 py-1" onClick={handleUpload}>
                        Обновить фото
                    </button>
                    <button className="text-white rounded bg-red-700 px-2 py-1" onClick={resetImage}>
                        Сброс
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageComponent;
