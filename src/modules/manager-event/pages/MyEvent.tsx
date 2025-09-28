import HeaderBar from '../components/HeaderBar';
import EventList from '../components/EventList/EventList';
import CreateEvent from '../components/CreateAndEditEvent/CreateEvent';
import useCreateEventStoreSelector from '../components/CreateAndEditEvent/hooks/useCreateEventStoreSelector';
import { useLocation } from 'react-router-dom';
import { SCREEN_PATH } from '@share/constants/routers';
import { useEffect } from 'react';
import useCreateEventStoreAction from '../components/CreateAndEditEvent/hooks/useCreateEventStoreAction';
import ManagerReport from './ManagerReport';
import TermAndCondition from '../components/TermAndConditions/TermAndCondition';

const MyEvent = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const { setIsOpenCreateEventStore } = useCreateEventStoreAction();
    const { isOpenCreateEvent } = useCreateEventStoreSelector();

    useEffect(() => {
        if (currentPath !== SCREEN_PATH.CREATE_EVENT) {
            setIsOpenCreateEventStore(false);
        }
    }, [currentPath]);

    return (
        <div className="flex flex-col flex-1 max-h-screen overflow-hidden">
            <HeaderBar />
            {isOpenCreateEvent ? (
                <CreateEvent />
            ) : currentPath === SCREEN_PATH.MANAGER_REPORT ? (
                <ManagerReport />
            ) : currentPath === SCREEN_PATH.MANAGER_LEGAL ? (
                <TermAndCondition />
            ) : (
                <EventList />
            )}
        </div>
    );
};

export default MyEvent;
