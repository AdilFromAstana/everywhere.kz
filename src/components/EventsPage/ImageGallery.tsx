'use client';

import { useState } from 'react';

interface ImageGalleryProps {
    images: any[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(images && images.length > 0 ? images[0]?.imageUrl : '');

    if (images?.length > 0) {
        return <img src={currentImage} alt={currentImage} className="w-full h-[15.5vh] md:h-[17.5vh] object-cover" />;
    }
};

export default ImageGallery;
