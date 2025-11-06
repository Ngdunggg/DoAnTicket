import React from 'react';
import { ADMIN_TAB } from '@share/constants/commons';
import useAdminStoreAction from '@modules/admin/hooks/useAdminStoreAction';
import useAdminStoreSelector from '@modules/admin/hooks/useAdminStoreSelector';
import UsersIcon from '@share/components/atoms/icons/UsersIcon';
import EventIcon, { MODE_EVENT } from '@share/components/atoms/icons/EventIcon';
import DashboardIcon from '@share/components/atoms/icons/DashboardIcon';
import CategoryIcon from '@share/components/atoms/icons/CategoryIcon';

export interface AdminMenuItem {
    icon?: React.ReactNode;
    id: string;
    label: string;
    onClick?: () => void;
}

const useMenuAdmin = () => {
    const { setActiveTabStore } = useAdminStoreAction();
    const { activeTab } = useAdminStoreSelector();

    const handleClickDashboard = () => {
        setActiveTabStore(ADMIN_TAB.DASHBOARD);
    };

    const handleClickUsers = () => {
        setActiveTabStore(ADMIN_TAB.USERS);
    };

    const handleClickEvents = () => {
        setActiveTabStore(ADMIN_TAB.EVENTS);
    };

    const handleClickCategories = () => {
        setActiveTabStore(ADMIN_TAB.CATEGORIES);
    };

    const menuItems: AdminMenuItem[] = [
        {
            icon: React.createElement(DashboardIcon, { size: 30 }),
            id: ADMIN_TAB.DASHBOARD,
            label: 'Dashboard',
            onClick: handleClickDashboard,
        },
        {
            icon: React.createElement(UsersIcon, { size: 30 }),
            id: ADMIN_TAB.USERS,
            label: 'Người dùng',
            onClick: handleClickUsers,
        },
        {
            icon: React.createElement(EventIcon, {
                mode: MODE_EVENT.BLACK,
                size: 30,
            }),
            id: ADMIN_TAB.EVENTS,
            label: 'Sự kiện',
            onClick: handleClickEvents,
        },
        {
            icon: React.createElement(CategoryIcon, { size: 30 }),
            id: ADMIN_TAB.CATEGORIES,
            label: 'Danh mục',
            onClick: handleClickCategories,
        },
    ];

    return {
        activeTab,
        menuItems,
    };
};

export default useMenuAdmin;
