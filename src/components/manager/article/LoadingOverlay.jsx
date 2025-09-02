import React from 'react';
import { FileCheck, Loader2 } from 'lucide-react';

const LoadingOverlay = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center">
                {/* Icon với animation */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
                    </div>
                    <div className="flex items-center justify-center">
                        <FileCheck className="w-8 h-8 text-green-600 animate-pulse" />
                    </div>
                </div>

                {/* Loading text */}
                <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                        Đang lưu bài báo...
                    </h3>
                    <p className="text-gray-600 text-sm">
                        Vui lòng đợi trong giây lát
                    </p>

                    {/* Progress dots */}
                    <div className="flex justify-center items-center space-x-2 mt-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;