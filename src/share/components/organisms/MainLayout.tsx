import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="pt-20">{children}</div>
            <Footer />
        </div>
    );
};

export default MainLayout;
