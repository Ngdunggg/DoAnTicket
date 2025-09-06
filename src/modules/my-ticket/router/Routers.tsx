import { Path } from '@share/constants/routers';
import { RouteObject } from 'react-router-dom';
import MyTicket from '../pages/MyTicket';

const myTicketRouters: RouteObject[] = [
    {
        children: [
            {
                element: <MyTicket />,
                index: true,
            },
            {
                element: <MyTicket />,
                path: Path.PathMyProfile,
            },
        ],
        path: Path.PathMyTicket,
    },
];

export default myTicketRouters;
