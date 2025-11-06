import authReducers from '@modules/auth/store/authSlice';
import eventListReducers from '@modules/events/stores/EventListSlice';
import managerEventListReducers from '@modules/manager-event/stores/eventListSlice';
import createEventReducers from '@modules/manager-event/stores/createEventSlice';
import homeEventListReducers from '@modules/home/stores/homeEventListSlice';
import searchReducers from '@share/components/organisms/header/store/searchSlice';
import eventDetailReducers from '@modules/event-detail/stores/eventDetailSlice';
import myTicketReducers from '@modules/my-ticket/stores/myTicketSlice';
import adminReducers from '@modules/admin/store/adminSlice';

/**
 * Reducers for the main module.
 */
export default {
    admin: adminReducers,
    create_event: createEventReducers,
    event_detail: eventDetailReducers,
    event_list: eventListReducers,
    home_event_list: homeEventListReducers,
    login_signup: authReducers,
    manager_event_list: managerEventListReducers,
    my_ticket: myTicketReducers,
    search: searchReducers,
};
