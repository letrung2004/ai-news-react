import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmDialog = ({
    isVisible,
    title,
    message,
    confirmText = 'Xác nhận',
    cancelText = 'Hủy',
    onConfirm,
    onCancel,
    type = 'warning' // warning, danger, info
}) => {
    if (!isVisible) return null;

    const typeStyles = {
        warning: {
            bg: 'bg-yellow-50',
            border: 'border-yellow-200',
            icon: 'text-yellow-500',
            confirmBtn: 'bg-yellow-500 hover:bg-yellow-600'
        },
        danger: {
            bg: 'bg-red-50',
            border: 'border-red-200',
            icon: 'text-red-500',
            confirmBtn: 'bg-red-500 hover:bg-red-600'
        },
        info: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            icon: 'text-blue-500',
            confirmBtn: 'bg-blue-500 hover:bg-blue-600'
        }
    };

    const style = typeStyles[type] || typeStyles.warning;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-in zoom-in-95 duration-200">
                <div className="p-6">
                    <div className="flex items-start">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${style.bg} ${style.border} border`}>
                            <AlertTriangle className={`w-5 h-5 ${style.icon}`} />
                        </div>
                        <div className="ml-4 flex-1">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {title}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {message}
                            </p>
                        </div>
                        <button
                            onClick={onCancel}
                            className="ml-4 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${style.confirmBtn}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;