import { ReactNode } from 'react';
import MenuManager from '../organisms/layout/MenuManager';

const ManagerLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen my-background flex w-full h-full">
            <MenuManager />
            <div className="w-full h-full">{children}</div>
        </div>
    );
};

export default ManagerLayout;
