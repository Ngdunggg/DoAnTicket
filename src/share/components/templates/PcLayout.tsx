import { ReactNode } from 'react';
import MainLayout from '@share/components/organisms/MainLayout';

const PcLayout = ({ children }: { children: ReactNode }) => {
    return (
        <MainLayout>
            <div className="w-full h-full">{children}</div>
        </MainLayout>
    );
};

export default PcLayout;
