import useCreateEventHandler from './hooks/useCreateEventHandler';
import ToolBarHeader from './ToolBarHeader';
import InfoEventSection from './InfoEventSection';
import { CREATE_EVENT_TAB } from '@share/constants/commons';
import PaymentSection from './PaymentSection';
import PreviewSection from './PreviewSection';

const CreateEvent = () => {
    const { activeTab } = useCreateEventHandler();
    return (
        <div className="flex flex-col flex-1 max-h-screen overflow-hidden">
            <div className="relative">
                <ToolBarHeader />
            </div>
            {/* Info Event Section Tab 1 */}
            {activeTab === CREATE_EVENT_TAB.INFO && <InfoEventSection />}

            {/* Payment Section Tab 2 */}
            {activeTab === CREATE_EVENT_TAB.PAYMENT && <PaymentSection />}

            {/* Preview Section Tab 3 */}
            {activeTab === CREATE_EVENT_TAB.PREVIEW && <PreviewSection />}
        </div>
    );
};

export default CreateEvent;
