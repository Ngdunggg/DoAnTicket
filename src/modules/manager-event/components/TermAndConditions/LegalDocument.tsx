import HeaderBar from '../HeaderBar';

interface LegalDocumentProps {
    pdfUrl: string;
    title: string;
}

const LegalDocument = ({ pdfUrl, title }: LegalDocumentProps) => {
    return (
        <div className="flex flex-col flex-1 max-h-screen overflow-hidden">
            {/* Header */}
            <HeaderBar />

            {/* PDF Content */}
            <div className="w-full h-full bg-white overflow-hidden">
                <iframe
                    src={pdfUrl}
                    className="w-full h-screen border-0"
                    title={title}
                    loading="lazy"
                />
            </div>
        </div>
    );
};

export default LegalDocument;
