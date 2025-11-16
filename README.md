# TicketVN - Ứng dụng đặt vé sự kiện

Ứng dụng web đặt vé sự kiện được xây dựng với React, TypeScript, Tailwind CSS và Redux Toolkit.

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống

- Node.js >= 16.0.0
- npm >= 8.0.0

### Cài đặt dependencies

```bash
npm install
```

### Chạy dự án

```bash
# Development mode
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

## 📁 Cấu trúc dự án

```
src/
├── app/                    # App configuration
│   ├── ContainerApp.tsx    # App container
│   ├── ErrorBoundaryApp.tsx # Error boundary
│   ├── NavigationApp.tsx   # Navigation setup
│   └── QueryApp.tsx        # React Query setup
├── configs/                # Configuration files
│   ├── env.ts             # Environment variables
│   ├── query.ts           # React Query config
│   ├── rootReducer.ts     # Redux root reducer
│   ├── router.ts          # React Router config
│   └── store.ts           # Redux store
├── modules/               # Feature modules
│   ├── auth/              # Authentication module
│   ├── home/              # Home page module
│   ├── event-detail/      # Event detail module
│   ├── my-ticket/         # My tickets module
│   └── main/              # Main module
├── share/                 # Shared components & utilities
│   ├── components/        # Reusable components
│   ├── auth/              # Auth utilities
│   ├── constants/         # App constants
│   ├── hooks/             # Custom hooks
│   ├── models/            # TypeScript interfaces
│   ├── stores/            # Redux slices
│   ├── types/             # Type definitions
│   └── utils/             # Utility functions
└── assets/                # Static assets
    ├── css/               # Global styles
    └── images/            # Images
```

## 🎨 Components Architecture

Dự án sử dụng **Atomic Design** pattern:

### Atoms (Components cơ bản)

- **Button**: Button với nhiều mode (BLACK, WHITE, YELLOW)
- **Text**: Text với các mode màu sắc, kích thước, font weight
- **DivClick**: Div có thể click được
- **Icons**: Các icon components (ArrowIcon, CalendarIcon, etc.)

### Molecules (Kết hợp atoms)

- **SearchBar**: Thanh tìm kiếm
- **EventCard**: Card hiển thị thông tin sự kiện
- **FormField**: Field form với validation

### Organisms (Kết hợp molecules)

- **Header**: Header với navigation và user menu
- **Footer**: Footer với thông tin liên hệ
- **MainLayout**: Layout chính
- **EventGrid**: Grid hiển thị danh sách sự kiện

### Templates

- **PcLayout**: Layout cho desktop

## 🎨 Màu sắc và Styling

### Màu chính

- **Primary Black**: `#01060F` (bg-bg-black, text-text-black)
- **Primary Yellow**: `#FCCB62` (bg-bg-yellow, text-text-yellow)
- **White**: `#FFFFFF` (text-white)
- **Gray**: `#F7F7F1` (text-gray)
- **Gray Secondary**: `#6C757D` (text-gray-2)
- **Red**: `#E03E2D` (text-red)

## 🛠️ Development

### Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Lint
npm run lint

# Type check
npm run type-check
```

### Code Style

- Sử dụng TypeScript strict mode
- ESLint + Prettier cho code formatting
- Atomic Design pattern cho components
- Tailwind CSS cho styling

## 📦 Dependencies chính

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management
- **React Router DOM** - Routing
- **React Query** - Data fetching
- **Vite** - Build tool

## 🚀 Deployment

### Build production

```bash
npm run build
```

### Preview build

```bash
npm run preview
```

### Deploy

Copy thư mục `dist/` lên server web (Nginx, Apache, etc.)

## 📝 Notes

- Header được cố định với `position: fixed`
- Content area có `padding-top: 80px` để tránh bị che bởi header
- Sử dụng Redux Persist để lưu trữ state
- Mock data được sử dụng cho development
- MSW (Mock Service Worker) cho API mocking
