import { Dialog } from 'primereact/dialog';
import { ReactNode, useState } from 'react';
import LoadingContent from './LoadingContent';

type CommonDialogProps = {
    children: ReactNode;
    className?: string;
    contentClassName?: string;
    contentId?: string;
    focusOnShow?: boolean;
    footer?: ReactNode;
    isLoading?: boolean;
    onHide: () => void;
    title?: string;
    visible: boolean;
};

const Modal = ({
    children,
    className = '',
    contentClassName = '',
    contentId,
    // prime-react/dialog focusOnShow default is true
    focusOnShow = true,
    footer,
    isLoading = false,
    onHide,
    title,
    visible,
}: CommonDialogProps) => {
    const [show, setShow] = useState(visible);
    const renderModalContent = () => {
        return (
            <div className={`flex overflow-y-auto ${contentClassName}`}>
                {children}
                {isLoading && show && (
                    <LoadingContent
                        body={children}
                        contentId={contentId}
                        message="Đang tải..."
                    />
                )}
            </div>
        );
    };

    return (
        <Dialog
            header={title}
            visible={visible}
            style={{}}
            onHide={onHide}
            className={`${className} max-w-[calc(100%-1rem)] mx-auto`}
            footer={footer}
            content={renderModalContent}
            onShow={() => setShow(true)}
            modal
            focusOnShow={focusOnShow}
        />
    );
};

export default Modal;
