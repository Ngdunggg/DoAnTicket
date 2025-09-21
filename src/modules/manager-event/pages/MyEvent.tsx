import HeaderBar from '../components/HeaderBar';
import EventList from '../components/EventList/EventList';

const MyEvent = () => {
    return (
        <div className="flex flex-col flex-1 max-h-screen overflow-hidden">
            <HeaderBar />
            <EventList />
        </div>
    );
};

export default MyEvent;
