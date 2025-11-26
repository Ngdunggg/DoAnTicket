import { ReactNode } from 'react';
import MenuManager from '../organisms/layout/MenuManager';
import useDetectMobile from '@share/hooks/useDetectMobile';

const ManagerLayout = ({ children }: { children: ReactNode }) => {
    const isMobile = useDetectMobile();
    return (
        <div className="min-h-screen my-background flex w-full h-full">
            {!isMobile && <MenuManager />}
            <div className="w-full h-full">{children}</div>
        </div>
    );
};

export default ManagerLayout;
