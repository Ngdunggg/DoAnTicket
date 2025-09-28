import LegalDocument from './LegalDocument';
import hangHoaCamPdf from '@assets/pdf/Hang_hoa_cam.pdf';

const BusinessLegalPage = () => {
    return (
        <LegalDocument
            title="Danh mục hàng hóa, dịch vụ cấm kinh doanh"
            pdfUrl={hangHoaCamPdf}
        />
    );
};

export default BusinessLegalPage;
