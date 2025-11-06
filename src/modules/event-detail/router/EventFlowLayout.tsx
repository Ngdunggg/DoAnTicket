import { useEffect, useRef } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { SCREEN_PATH } from '@share/constants/routers';
import useEventDetailStoreAction from '@modules/event-detail/hooks/useEventDetailStoreAction';

const EventFlowLayout = () => {
    const location = useLocation();
    const params = useParams();
    const { setSelectedTicketsStore } = useEventDetailStoreAction();
    const prevPathRef = useRef(location.pathname);

    useEffect(() => {
        const prev = prevPathRef.current;
        const curr = location.pathname;
        prevPathRef.current = curr;

        // Allow paths within the current event flow: detail, ticket, question, payment
        const eventId = params.event_id || params.event_id as string | undefined;
        const allowed = [
            SCREEN_PATH.EVENT_DETAIL.replace(':event_id', eventId || ''),
            SCREEN_PATH.EVENT_TICKET_SELECTION.replace(':event_id', eventId || ''),
            SCREEN_PATH.EVENT_QUESTION_FORM.replace(':event_id', eventId || ''),
            SCREEN_PATH.EVENT_PAYMENT.replace(':event_id', eventId || ''),
        ];

        const isLeavingFlow =
            !!eventId &&
            prev &&
            allowed.every(p => p !== curr); // current path is not in allowed list

        if (isLeavingFlow) {
            setSelectedTicketsStore(null);
        }
    }, [location.pathname, params.event_id, setSelectedTicketsStore]);

    return <Outlet />;
};

export default EventFlowLayout;


