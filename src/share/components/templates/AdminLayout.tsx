import { ReactNode } from 'react';
import MenuAdmin from '@share/components/organisms/layout/MenuAdmin';

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex w-full h-full">
            <MenuAdmin />
            <div className="w-full h-full">{children}</div>
        </div>
    );
};

export default AdminLayout;
