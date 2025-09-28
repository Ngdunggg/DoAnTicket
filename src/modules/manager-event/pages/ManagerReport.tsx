import { useLocation } from 'react-router-dom';
import DetailReport from '../components/ManagerReport/components/DetailEventReport/DetailReport';
import ListEventReport from '../components/ManagerReport/components/ListEvent/ListEventReport';
import { getCurrentEventId } from '@share/utils/path';
import HeaderBar from '../components/HeaderBar';

const ManagerReport = () => {
    const location = useLocation();
    const eventId = getCurrentEventId(location.pathname);

    if (eventId) {
        return <DetailReport />;
    }

    return (
        <div className="flex flex-col flex-1 max-h-screen overflow-hidden">
            <HeaderBar />
            <ListEventReport />
        </div>
    );
};

export default ManagerReport;
