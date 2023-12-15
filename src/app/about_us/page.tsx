import Image from 'next/image';

import slide1 from '@/assets/about_us/1.jpg';
import slide2 from '@/assets/about_us/2.jpg';
import slide3 from '@/assets/about_us/3.jpg';
import slide4 from '@/assets/about_us/4.jpg';
import slide5 from '@/assets/about_us/5.jpg';
import slide6 from '@/assets/about_us/6.jpg';
import slide7 from '@/assets/about_us/7.jpg';
import slide8 from '@/assets/about_us/8.jpg';
import slide9 from '@/assets/about_us/9.jpg';
import slide10 from '@/assets/about_us/10.jpg';

export default async function AboutUsPage() {
    return (
        <>
            <Image className="w-full h-full" src={slide1} alt="Slide1" />
            <Image className="w-full h-full" src={slide2} alt="Slide2" />
            <Image className="w-full h-full" src={slide3} alt="Slide3" />
            <Image className="w-full h-full" src={slide4} alt="Slide4" />
            <Image className="w-full h-full" src={slide5} alt="Slide5" />
            <Image className="w-full h-full" src={slide6} alt="Slide6" />
            <Image className="w-full h-full" src={slide7} alt="Slide7" />
            <Image className="w-full h-full" src={slide8} alt="Slide8" />
            <Image className="w-full h-full" src={slide9} alt="Slide9" />
            <Image className="w-full h-full" src={slide10} alt="Slide10" />
        </>
    );
}
