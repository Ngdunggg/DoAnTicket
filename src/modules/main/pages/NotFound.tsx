import { useNavigate } from 'react-router-dom';
import { SCREEN_PATH } from '@share/constants/routers';

const NotFound = () => {
    const navigate = useNavigate();

    const handleReturnHome = () => {
        navigate(SCREEN_PATH.HOME);
    };

    return (
        <div className="bg-bg-black text-white min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            <div className="perspective-container">
                <div className="floating-box relative w-64 h-64 md:w-80 md:h-80">
                    {/* 3D Cube Faces */}
                    <div className="front absolute w-full h-full bg-bg-black-2 border-2 border-bg-yellow rounded-lg flex flex-col items-center justify-center p-4 shadow-lg">
                        <div className="text-9xl font-bold text-text-yellow mb-2 glow">
                            404
                        </div>
                        <div className="text-xl font-semibold text-text-yellow">
                            Không Tìm Thấy Trang
                        </div>
                        <p className="text-text-gray-2 text-center mt-4">
                            Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa
                            .
                        </p>
                        <button
                            onClick={handleReturnHome}
                            className="mt-6 px-6 py-2 bg-bg-yellow text-text-black font-medium rounded-full transition-all transform hover:scale-105 hover:brightness-110"
                        >
                            Về Trang Chủ
                        </button>
                    </div>

                    <div className="back absolute w-full h-full bg-bg-black-2 border-2 border-bg-yellow rounded-lg"></div>
                    <div className="right absolute w-10 h-full bg-bg-yellow/50 left-full origin-left rounded-r-lg"></div>
                    <div className="left absolute w-10 h-full bg-bg-yellow/50 right-full origin-right rounded-l-lg"></div>
                    <div className="top absolute w-full h-10 bg-bg-yellow/30 bottom-full origin-bottom rounded-t-lg"></div>
                    <div className="bottom absolute w-full h-10 bg-bg-yellow/30 top-full origin-top rounded-b-lg"></div>
                </div>
            </div>

            {/* Floating particles for additional 3D effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute w-2 h-2 bg-bg-yellow rounded-full opacity-30 particle"
                    style={{
                        animation: 'particle 8s linear infinite',
                        left: '15%',
                        top: '20%',
                    }}
                ></div>
                <div
                    className="absolute w-3 h-3 bg-bg-yellow rounded-full opacity-20 particle"
                    style={{
                        animation: 'particle 10s linear infinite 2s',
                        left: '25%',
                        top: '60%',
                    }}
                ></div>
                <div
                    className="absolute w-2 h-2 bg-bg-yellow rounded-full opacity-25 particle"
                    style={{
                        animation: 'particle 12s linear infinite 1s',
                        left: '80%',
                        top: '30%',
                    }}
                ></div>
                <div
                    className="absolute w-4 h-4 bg-bg-yellow rounded-full opacity-15 particle"
                    style={{
                        animation: 'particle 9s linear infinite 3s',
                        left: '70%',
                        top: '80%',
                    }}
                ></div>
            </div>
        </div>
    );
};

export default NotFound;
