//* Max length validate error type
export const MAX_LENGTH_VALIDATE_ERROR_TYPE = 'too_big';

//* Authentication mode
export const AUTH_MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
};
export type AuthMode = typeof AUTH_MODE.LOGIN | typeof AUTH_MODE.REGISTER;

//* Location
export const LOCATION = {
    ALL: 'Toàn quốc',
    DANANG: 'Đà Nẵng',
    HANOI: 'Hà Nội',
    HCM: 'Hồ Chí Minh',
    OTHER: 'Vị trí khác',
};
export type Location =
    | typeof LOCATION.ALL
    | typeof LOCATION.HANOI
    | typeof LOCATION.HCM
    | typeof LOCATION.DANANG
    | typeof LOCATION.OTHER;

//* Type
export const TYPE = {
    ART: 'Sân khấu & nghệ thuật',
    MUSIC: 'Ca nhạc',
    OTHER: 'Khác',
    SPORT: 'Thể thao',
};
export type Type =
    | typeof TYPE.ART
    | typeof TYPE.MUSIC
    | typeof TYPE.SPORT
    | typeof TYPE.OTHER;

//* Filter status
export const FILTER_STATUS = {
    ALL: 'all',
    PAST: 'past',
    PENDING: 'pending',
    UPCOMING: 'upcoming',
};
export type FilterStatus =
    | typeof FILTER_STATUS.ALL
    | typeof FILTER_STATUS.UPCOMING
    | typeof FILTER_STATUS.PAST
    | typeof FILTER_STATUS.PENDING;

//* Create event tab
export const CREATE_EVENT_TAB = {
    INFO: 'info',
    PAYMENT: 'payment',
    PREVIEW: 'preview',
};
export type CreateEventTab =
    | typeof CREATE_EVENT_TAB.INFO
    | typeof CREATE_EVENT_TAB.PAYMENT
    | typeof CREATE_EVENT_TAB.PREVIEW;

//* Event description template
export const EVENT_DESCRIPTION_TEMPLATE = `
    <h2>Giới thiệu sự kiện:</h2>
    <p>[Tóm tắt ngắn gọn về sự kiện: Nội dung chính của sự kiện, điểm đặc sắc nhất và lý do khiến người tham gia không nên bỏ lỡ]</p>

    <h2>Chi tiết sự kiện:</h2>

    <h3>Chương trình chính:</h3>
    <p>[Liệt kê những hoạt động nổi bật trong sự kiện: các phần trình diễn, khách mời đặc biệt, lịch trình các tiết mục cụ thể nếu có.]</p>

    <h3>Khách mời:</h3>
    <p>[Thông tin về các khách mời đặc biệt, nghệ sĩ, diễn giả sẽ tham gia sự kiện. Có thể bao gồm phần mô tả ngắn gọn về họ và những gì họ sẽ mang lại cho sự kiện.]</p>

    <h3>Trải nghiệm đặc biệt:</h3>
    <p>[Nếu có các hoạt động đặc biệt khác như workshop, khu trải nghiệm, photo booth, khu vực check-in hay các phần quà/ưu đãi dành riêng cho người tham dự.]</p>

    <h2>Điều khoản và điều kiện:</h2>
    <p>[TnC] sự kiện</p>

    <h3>Lưu ý về điều khoản trẻ em</h3>
    <p>[Nội dung điều khoản về trẻ em]</p>

    <h3>Lưu ý về điều khoản VAT</h3>
    <p>[Nội dung điều khoản về VAT]</p>
`;
