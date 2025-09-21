import authReducers from '@modules/auth/store/authSlice';
import eventListReducers from '@modules/events/stores/EventListSlice';
import managerEventListReducers from '@modules/manager-event/stores/eventListSlice';
import searchReducers from '@share/components/organisms/header/store/searchSlice';

/**
 * Reducers for the main module.
 */
export default {
    event_list: eventListReducers,
    login_signup: authReducers,
    manager_event_list: managerEventListReducers,
    search: searchReducers,
};
