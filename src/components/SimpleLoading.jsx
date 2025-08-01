import React from 'react';

const SimpleLoading = () => {
    return (
        <main className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-center min-h-96">
                <div className="text-center">
                    {/* Spinning Circle */}
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>

                    {/* Loading Text */}
                    <p className="text-gray-600 font-medium">Đang tải bài viết...</p>
                </div>
            </div>
        </main>
    );
};
export default SimpleLoading;