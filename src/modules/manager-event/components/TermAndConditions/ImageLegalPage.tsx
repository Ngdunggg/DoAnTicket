import LegalDocument from '@modules/manager-event/components/TermAndConditions/LegalDocument';
import kiemDuyetPdf from '@assets/pdf/Kiem_Duyet.pdf';

const ImageLegalPage = () => {
    return (
        <LegalDocument
            title="Quy định kiểm duyệt nội dung & hình ảnh"
            pdfUrl={kiemDuyetPdf}
        />
    );
};

export default ImageLegalPage;
