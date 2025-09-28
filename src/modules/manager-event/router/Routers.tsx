import { SCREEN_PATH } from '@share/constants/routers';
import { RouteObject } from 'react-router-dom';
import MyEvent from '../pages/MyEvent';
import DetailEvent from '../pages/DetailEvent';
import ManagerReport from '../pages/ManagerReport';
import BusinessLegalPage from '../components/TermAndConditions/BusinessLegalPage';
import ImageLegalPage from '../components/TermAndConditions/ImageLegalPage';

const myEventRouters: RouteObject[] = [
    {
        children: [
            {
                element: <MyEvent />,
                index: true,
            },
        ],
        path: SCREEN_PATH.MANAGER_EVENT,
    },
    {
        children: [
            {
                element: <ManagerReport />,
                index: true,
            },
        ],
        path: SCREEN_PATH.MANAGER_REPORT,
    },
    {
        children: [
            {
                element: <MyEvent />,
                index: true,
            },
        ],
        path: SCREEN_PATH.MANAGER_LEGAL,
    },
    {
        children: [
            {
                element: <MyEvent />,
                index: true,
            },
        ],
        path: SCREEN_PATH.CREATE_EVENT,
    },
    {
        children: [
            {
                element: <DetailEvent />,
                index: true,
            },
        ],
        path: SCREEN_PATH.MANAGER_EVENT_DETAIL,
    },
    {
        children: [
            {
                element: <ManagerReport />,
                index: true,
            },
        ],
        path: SCREEN_PATH.MANAGER_REPORT_DETAIL,
    },
    {
        children: [
            {
                element: <BusinessLegalPage />,
                index: true,
            },
        ],
        path: SCREEN_PATH.MANAGER_LEGAL_BUSINESS,
    },
    {
        children: [
            {
                element: <ImageLegalPage />,
                index: true,
            },
        ],
        path: SCREEN_PATH.MANAGER_LEGAL_IMAGE,
    },
];

export default myEventRouters;
