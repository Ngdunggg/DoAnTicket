import { SCREEN_PATH } from '@share/constants/routers';
import EventIcon from '@share/components/atoms/icons/EventIcon';
import FolderIcon from '@share/components/atoms/icons/FolderIcon';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FileIcon from '@share/components/atoms/icons/FileIcon';

export interface MenuItem {
    icon?: React.ReactNode;
    id: string;
    label: string;
    onClick?: () => void;
    path: string;
}

const useMenuManager = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const handleClickEvent = () => {
        navigate(SCREEN_PATH.MANAGER_EVENT);
    };

    const handleClickReport = () => {
        navigate(SCREEN_PATH.MANAGER_REPORT);
    };

    const handleClickTerms = () => {
        navigate(SCREEN_PATH.MANAGER_LEGAL);
    };
    const menuItems: MenuItem[] = [
        {
            icon: React.createElement(EventIcon),
            id: 'event',
            label: 'Sự kiện của tôi',
            onClick: handleClickEvent,
            path: SCREEN_PATH.MANAGER_EVENT,
        },
        {
            icon: React.createElement(FolderIcon),
            id: 'report',
            label: 'Quản lí báo cáo',
            onClick: handleClickReport,
            path: SCREEN_PATH.MANAGER_REPORT,
        },
        {
            icon: React.createElement(FileIcon, { size: 30 }),
            id: 'terms',
            label: 'Điều khoản cho Ban tổ chức',
            onClick: handleClickTerms,
            path: SCREEN_PATH.MANAGER_LEGAL,
        },
    ];

    const isActive = (path: string) => currentPath === path;

    return {
        isActive,
        menuItems,
    };
};

export default useMenuManager;
