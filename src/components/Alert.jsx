import React from 'react';
import { CheckCircle, X, AlertTriangle, Info, XCircle } from 'lucide-react';

const Alert = ({
    type = 'info',
    title,
    message,
    isVisible,
    onClose,
    autoClose = true,
    duration = 3000
}) => {
    React.useEffect(() => {
        if (isVisible && autoClose && onClose) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, autoClose, onClose, duration]);

    if (!isVisible) return null;

    const alertStyles = {
        success: {
            bg: 'bg-green-50 border-green-200',
            text: 'text-green-800',
            icon: CheckCircle,
            iconColor: 'text-green-500'
        },
        error: {
            bg: 'bg-red-50 border-red-200',
            text: 'text-red-800',
            icon: XCircle,
            iconColor: 'text-red-500'
        },
        warning: {
            bg: 'bg-yellow-50 border-yellow-200',
            text: 'text-yellow-800',
            icon: AlertTriangle,
            iconColor: 'text-yellow-500'
        },
        info: {
            bg: 'bg-blue-50 border-blue-200',
            text: 'text-blue-800',
            icon: Info,
            iconColor: 'text-blue-500'
        }
    };

    const style = alertStyles[type] || alertStyles.info;
    const IconComponent = style.icon;

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
            <div className={`flex items-start p-4 border rounded-lg shadow-lg max-w-md ${style.bg}`}>
                <div className="flex-shrink-0">
                    <IconComponent className={`w-5 h-5 ${style.iconColor}`} />
                </div>
                <div className={`ml-3 flex-1 ${style.text}`}>
                    {title && (
                        <h3 className="text-sm font-medium mb-1">{title}</h3>
                    )}
                    <p className="text-sm">{message}</p>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className={`ml-4 flex-shrink-0 p-1 rounded-md hover:bg-opacity-20 hover:bg-gray-600 ${style.text}`}
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Alert;