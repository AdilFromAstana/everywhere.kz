import React, { useState } from 'react';

import ConfirmationModal from './ConfirmationModal';

import './styles.css';

import { getCookie } from '@/functions';

interface FileUploadProps {
    images: any[];
    setImages: React.Dispatch<React.SetStateAction<any[]>>;
}

const FileUploadComponent: React.FC<FileUploadProps> = ({ images, setImages }) => {
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageToRemove, setImageToRemove] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        handleFiles(selectedFiles);
    };

    const handleFiles = (selectedFiles: File[]) => {
        const fileObjects = selectedFiles.map((file) => ({
            id: URL.createObjectURL(file),
            file,
        }));
        setImages((prevImages) => [...prevImages, ...fileObjects]);
    };

    const handleRemoveImage = async (index: number) => {
        setImageToRemove(index);
        setIsModalOpen(true);
        document.documentElement.classList.toggle('overflow-hidden', true);
    };

    const confirmRemoveImage = async () => {
        setIsLoading(true);
        if (imageToRemove !== null) {
            const newImages = [...images];
            newImages.splice(imageToRemove, 1);
            setImages(newImages);

            const image = images[imageToRemove];
            if (image.announcementId) {
                try {
                    await fetch(process.env.NEXT_PUBLIC_EVENTS_URL + `announcementImages/deleteById/${image.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${getCookie('accessToken')}`,
                        },
                        credentials: 'include',
                    });
                } catch (error) {
                    console.error('Error deleting image:', error);
                    return;
                } finally {
                    setIsLoading(false);
                    setIsModalOpen(false);
                    setImageToRemove(null);
                    document.documentElement.classList.toggle('overflow-hidden', false);
                }
            }
        } else {
            setIsLoading(false);
            setIsModalOpen(false);
            setImageToRemove(null);
            document.documentElement.classList.toggle('overflow-hidden', false);
        }
    };

    const handleDragStart = (index: number) => {
        setDragIndex(index);
    };

    const handleTouchStart = (index: number) => {
        setDragIndex(index);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        setHoverIndex(index);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>, index: number) => {
        setHoverIndex(index);
    };

    const handleDragEnd = () => {
        if (dragIndex !== null && hoverIndex !== null && dragIndex !== hoverIndex) {
            const draggedImage = images[dragIndex];
            const newImages = [...images];
            newImages.splice(dragIndex, 1);
            newImages.splice(hoverIndex, 0, draggedImage);
            setImages(newImages);
        }
        setDragIndex(null);
        setHoverIndex(null);
    };

    const handleTouchEnd = () => {
        handleDragEnd();
    };

    const handleClickAddPhoto = () => {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) fileInput.click();
    };

    return (
        <div className="w-full mt-4">
            <label className="block text-lg font-medium mb-2">Изображения</label>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-4 mt-2">
                {images.map((image: any, index) => (
                    <div
                        key={index}
                        className={`file-upload relative aspect-w-1 aspect-h-1 overflow-hidden rounded-md ${
                            index === dragIndex ? 'dragging' : ''
                        } ${index === hoverIndex ? 'dragged-over' : ''}`}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={handleDragEnd}
                        onTouchStart={() => handleTouchStart(index)}
                        onTouchMove={(e) => handleTouchMove(e, index)}
                        onTouchEnd={handleTouchEnd}
                        style={{ cursor: 'grabbing' }}
                    >
                        {index === 0 && (
                            <div className="absolute bottom-1 left-1 p-1 bg-gray-800 bg-opacity-75 rounded-md text-white">
                                Главное
                            </div>
                        )}
                        <img
                            src={image.file ? URL.createObjectURL(image.file) : image.imageUrl}
                            alt={`Image ${index}`}
                            className="w-full h-[20vh] object-cover cursor-pointer hover:cursor-grab"
                        />
                        <div
                            className="absolute top-1 right-1 p-1 cursor-pointer bg-gray-800 bg-opacity-50 rounded-full text-white h-8 w-8 flex justify-center"
                            onClick={() => handleRemoveImage(index)}
                        >
                            &#x2715;
                        </div>
                    </div>
                ))}
                {images.length < 6 && (
                    <div
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white text-center cursor-pointer aspect-w-1 aspect-h-1 h-[20vh] flex items-center justify-center"
                        onClick={handleClickAddPhoto}
                    >
                        Добавить фото
                        <input id="fileInput" type="file" className="hidden" onChange={handleFileChange} multiple />
                    </div>
                )}
            </div>

            <ConfirmationModal
                isLoading={isLoading}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmRemoveImage}
                message="Вы действительно хотите удалить это изображение?"
            />
        </div>
    );
};

export default FileUploadComponent;
