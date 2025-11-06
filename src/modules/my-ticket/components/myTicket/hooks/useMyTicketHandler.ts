import useGetMyTicketQuery from '@modules/my-ticket/hooks/useGetMyTicketQuery';
import useMyTicketStoreAction from '@modules/my-ticket/hooks/useMyTicketStoreAction';
import { useEffect, useMemo, useState } from 'react';
import { Event } from '@share/types/event';
import { PurchasedTicket } from '@share/types/purchasedTicket';
import { MY_TICKET_TAB, MyTicketTab } from '@share/constants/commons';

// Combined ticket and event data
export interface TicketWithEvent {
    event: Event;
    ticket: PurchasedTicket;
}

const useMyTicketHandler = () => {
    const { data: myTickets } = useGetMyTicketQuery();
    const { setMyTicketsStore } = useMyTicketStoreAction();

    const [activeTab, setActiveTab] = useState<MyTicketTab>(
        MY_TICKET_TAB.UPCOMING
    );

    useEffect(() => {
        if (myTickets) {
            setMyTicketsStore(myTickets);
        }
    }, [myTickets]);

    // Combine tickets with their events and categorize
    const { pastTickets, upcomingTickets } = useMemo(() => {
        const now = new Date();
        const upcoming: TicketWithEvent[] = [];
        const past: TicketWithEvent[] = [];

        if (!myTickets) return { pastTickets: [], upcomingTickets: [] };

        // Create a map of event_id -> event for quick lookup
        const eventMap = new Map<string, Event>();
        myTickets.event_items?.forEach(event => {
            eventMap.set(event.id, event);
        });

        // Combine tickets with their events
        myTickets.ticket_items?.forEach(ticket => {
            const event = eventMap.get(ticket.event_id);
            if (event) {
                const ticketWithEvent: TicketWithEvent = {
                    event,
                    ticket,
                };
                const eventDate = new Date(event.start_time);
                if (eventDate > now) {
                    upcoming.push(ticketWithEvent);
                } else {
                    past.push(ticketWithEvent);
                }
            }
        });

        // Sắp xếp sự kiện sắp diễn ra theo thời gian tăng dần (gần nhất trước)
        upcoming.sort(
            (a, b) =>
                new Date(a.event.start_time).getTime() -
                new Date(b.event.start_time).getTime()
        );

        // Sắp xếp sự kiện đã diễn ra theo thời gian giảm dần (mới nhất trước)
        past.sort(
            (a, b) =>
                new Date(b.event.start_time).getTime() -
                new Date(a.event.start_time).getTime()
        );

        return { pastTickets: past, upcomingTickets: upcoming };
    }, [myTickets]);

    return {
        activeTab,
        myTickets,
        pastTickets,
        setActiveTab,
        upcomingTickets,
    };
};

export default useMyTicketHandler;
