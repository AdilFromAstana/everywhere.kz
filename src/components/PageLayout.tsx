import { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

interface PageLayoutProps {
    children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = async ({ children }) => {
    return (
        <div className="container mx-auto xl:px-10">
            <Header />
            <div className="px-4 md:px-0">{children}</div>
            <Footer />
        </div>
    );
};

export default PageLayout;
