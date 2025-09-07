import { SCREEN_PATH } from '@share/constants/routers';
import { RouteObject } from 'react-router-dom';
import EventDetail from '../pages/EventDetail';
import Payment from '../pages/Payment';
import QuestionForm from '../pages/QuestionForm';
import TicketPurchase from '../pages/TicketPurchase';

const eventDetailRouters: RouteObject[] = [
    {
        children: [
            {
                element: <EventDetail />,
                index: true,
            },
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

export default eventDetailRouters;
