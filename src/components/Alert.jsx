import React, { useState, useEffect } from 'react';
import { CheckCircle, X, AlertTriangle, Info, XCircle, FileCheck, Save, Eye, ExternalLink, Edit3 } from 'lucide-react';

const Alert = ({
    type = 'info',
    title,
    message,
    isVisible,
    onClose,
    autoClose = true,
    duration = 3000
}) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setShow(true);
            if (autoClose) {
                const timer = setTimeout(() => {
                    setShow(false);
                    setTimeout(onClose, 300);
                }, duration);
                return () => clearTimeout(timer);
            }
        } else {
            setShow(false);
        }
    }, [isVisible, autoClose, duration, onClose]);

    if (!isVisible) return null;

    const alertStyles = {
        success: {
            bg: 'bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600',
            text: 'text-white',
            icon: CheckCircle,
            iconBg: 'bg-white/25',
            title: title || 'Thành công!',
            showActions: false
        },
        publish: {
            bg: 'bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600',
            text: 'text-white',
            icon: FileCheck,
            iconBg: 'bg-white/25',
            title: title || 'Xuất bản thành công! 🎉',
            showActions: true,
            actions: [
                { label: 'Xem bài viết', icon: ExternalLink, primary: true },
                { label: 'Viết bài mới', icon: Edit3, primary: false }
            ]
        },
        error: {
            bg: 'bg-gradient-to-br from-red-500 to-red-600',
            text: 'text-white',
            icon: XCircle,
            iconBg: 'bg-white/25',
            title: title || 'Có lỗi xảy ra!',
            showActions: false
        },
        warning: {
            bg: 'bg-gradient-to-br from-yellow-500 to-orange-500',
            text: 'text-white',
            icon: AlertTriangle,
            iconBg: 'bg-white/25',
            title: title || 'Cảnh báo!',
            showActions: false
        },
        info: {
            bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
            text: 'text-white',
            icon: Info,
            iconBg: 'bg-white/25',
            title: title || 'Thông tin',
            showActions: false
        }
    };

    const style = alertStyles[type] || alertStyles.info;
    const IconComponent = style.icon;

    const handleCloseClick = () => {
        setShow(false);
        setTimeout(onClose, 300);
    };

    return (
        <>
            {/* Backdrop cho success notifications */}
            {(type === 'publish' || type === 'draft') && (
                <div
                    className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={handleCloseClick}
                />
            )}

            {/* Notification */}
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none">
                <div
                    className={`
                        ${style.bg} ${style.text} rounded-2xl shadow-2xl 
                        min-w-96 max-w-md pointer-events-auto
                        transform transition-all duration-500 ease-out
                        ${show ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-full opacity-0 scale-95'}
                        relative overflow-hidden
                    `}
                >
                    {/* Decorative background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                    </div>

                    <div className="relative p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4 flex-1">
                                {/* Icon với animation */}
                                <div className={`${style.iconBg} backdrop-blur-sm rounded-xl p-3 flex-shrink-0 transform transition-transform duration-500 hover:scale-110`}>
                                    <IconComponent className="w-7 h-7 text-white drop-shadow-sm" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-bold mb-2 leading-tight">
                                        {style.title}
                                    </h3>
                                    <p className="text-white/95 text-sm leading-relaxed mb-4">
                                        {message}
                                    </p>

                                    {/* Action buttons cho success types */}
                                    {style.showActions && (
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            {style.actions.map((action, index) => (
                                                <button
                                                    key={index}
                                                    className={`
                                                        flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium
                                                        transition-all duration-200 transform hover:scale-105
                                                        ${action.primary
                                                            ? 'bg-white text-gray-800 hover:bg-gray-100 shadow-lg'
                                                            : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                                                        }
                                                    `}
                                                >
                                                    <action.icon className="w-4 h-4" />
                                                    <span>{action.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Close button */}
                            <button
                                onClick={handleCloseClick}
                                className="ml-2 p-2 hover:bg-white/20 rounded-full transition-all duration-200 flex-shrink-0 transform hover:scale-110"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Animated progress bar */}
                    {autoClose && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                            <div
                                className="h-full bg-white/50 transition-all ease-linear"
                                style={{
                                    animation: `shrink ${duration}ms linear forwards`
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* CSS Animation */}
            <style jsx>{`
                @keyframes shrink {
                    from { width: 100%; }
                    to { width: 0%; }
                }
            `}</style>
        </>
    );
};

export default Alert;