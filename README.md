# Atomic Design Components

Base project được xây dựng theo kiến trúc Atomic Design với các components được tổ chức theo thứ bậc:

## Cấu trúc thư mục

```
src/share/components/
├── atoms/           # Components cơ bản nhất
├── molecules/       # Kết hợp các atoms
├── organisms/       # Kết hợp các molecules và atoms
├── templates/       # Layout templates
└── styles/          # SCSS styles
```

## Components

### Atoms
- **Button**: Component button với nhiều mode khác nhau
- **Text**: Component text với các mode màu sắc, kích thước, leading
- **DivClick**: Component div có thể click được
- **HeaderIcon**: Icon header
- **TicketIcon**: Icon vé

### Molecules
- **SearchBar**: Thanh tìm kiếm
- **EventCard**: Card hiển thị thông tin sự kiện
- **FormField**: Field form với validation

### Organisms
- **Header**: Header cố định với logo, search bar, và navigation
- **Footer**: Footer với thông tin liên hệ
- **MainLayout**: Layout chính bao gồm header, content, và footer
- **EventGrid**: Grid hiển thị danh sách sự kiện

### Templates
- **PcLayout**: Layout cho desktop với MainLayout

## Cách sử dụng

### Import components
```typescript
import { Button, MODE_BUTTON, Text, MODE_COLOR_TEXT, MODE_SIZE } from "@share/components";
```

### Sử dụng trong page
```typescript
import PcLayout from "@share/components/templates/PcLayout";

const MyPage = () => {
    return (
        <PcLayout>
            {/* Nội dung trang */}
        </PcLayout>
    );
};
```

## Màu sắc

Các màu được định nghĩa trong `src/assets/css/tailwind.config.css`:
- `bg-black`: #01060F
- `bg-yellow`: #FCCB62
- `text-white`: #FFFFFF
- `text-yellow`: #FCCB62
- `text-black`: #01060F
- `text-gray`: #F7F7F1
- `text-gray-2`: #6C757D
- `text-red`: #E03E2D

## Responsive

Project hỗ trợ responsive với các breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Notes

- Header được cố định ở đầu trang với `position: fixed`
- Content area có `padding-top: 80px` để tránh bị che bởi header
- Footer luôn ở cuối trang
- Sử dụng Tailwind CSS cho styling
