import { SCREEN_PATH } from '@share/constants/routers';
import { RouteObject } from 'react-router-dom';
import EventDetail from '../pages/EventDetail';
import Payment from '../pages/Payment';
import PaymentCallback from '../pages/PaymentCallback';
import QuestionForm from '../pages/QuestionForm';
import TicketPurchase from '../pages/TicketPurchase';
import EventFlowLayout from './EventFlowLayout';

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
    {
        element: <PaymentCallback />,
        path: SCREEN_PATH.EVENT_PAYMENT_CALLBACK,
    },
];

// Private routes - cần đăng nhập
const eventDetailPrivateRouters: RouteObject[] = [
    {
        children: [
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
                element: <EventFlowLayout />,
            },
        ],
        path: SCREEN_PATH.EVENT_DETAIL,
    },
];

export { eventDetailPrivateRouters, eventDetailPublicRouters };
export default eventDetailPublicRouters;
