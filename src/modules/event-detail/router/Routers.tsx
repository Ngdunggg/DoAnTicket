import { SCREEN_PATH } from '@share/constants/routers';
import { RouteObject } from 'react-router-dom';
import EventDetail from '../pages/EventDetail';
import Payment from '../pages/Payment';
import QuestionForm from '../pages/QuestionForm';
import TicketPurchase from '../pages/TicketPurchase';

// Public routes - không cần đăng nhập
const eventDetailPublicRouters: RouteObject[] = [
    {
        children: [
            {
                element: <EventDetail />,
                index: true,
            },
        ],
        path: SCREEN_PATH.EVENT_DETAIL,
    },
];

// Private routes - cần đăng nhập
const eventDetailPrivateRouters: RouteObject[] = [
    {
        children: [
            {
                element: <TicketPurchase />,
                path: SCREEN_PATH.EVENT_TICKET_SELECTION,
            },
            {
                element: <QuestionForm />,
                path: SCREEN_PATH.EVENT_QUESTION_FORM,
            },
            {
                element: <Payment />,
                path: SCREEN_PATH.EVENT_PAYMENT,
            },
        ],
        path: SCREEN_PATH.EVENT_DETAIL,
    },
];

export { eventDetailPrivateRouters, eventDetailPublicRouters };
export default eventDetailPublicRouters;
