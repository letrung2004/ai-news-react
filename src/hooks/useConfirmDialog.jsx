import { useState } from 'react';

const useConfirmDialog = () => {
    const [confirmDialog, setConfirmDialog] = useState({
        isVisible: false,
        title: '',
        message: '',
        confirmText: 'Xác nhận',
        cancelText: 'Hủy',
        type: 'warning',
        onConfirm: null,
        data: null // để lưu thêm data nếu cần
    });

    const showConfirmDialog = ({
        title,
        message,
        confirmText = 'Xác nhận',
        cancelText = 'Hủy',
        type = 'warning',
        onConfirm,
        data = null
    }) => {
        setConfirmDialog({
            isVisible: true,
            title,
            message,
            confirmText,
            cancelText,
            type,
            onConfirm,
            data
        });
    };

    const hideConfirmDialog = () => {
        setConfirmDialog(prev => ({
            ...prev,
            isVisible: false,
            onConfirm: null,
            data: null
        }));
    };

    const handleConfirm = async () => {
        if (confirmDialog.onConfirm) {
            await confirmDialog.onConfirm(confirmDialog.data);
        }
        hideConfirmDialog();
    };

    const handleCancel = () => {
        hideConfirmDialog();
    };

    // Shortcut methods
    const showDeleteConfirm = (itemName, onConfirm, data = null) => {
        showConfirmDialog({
            title: 'Xác nhận xóa',
            message: `Bạn có chắc chắn muốn xóa "${itemName}"? Hành động này không thể hoàn tác.`,
            confirmText: 'Xóa',
            cancelText: 'Hủy',
            type: 'danger',
            onConfirm,
            data
        });
    };

    const showWarningConfirm = (title, message, onConfirm, data = null) => {
        showConfirmDialog({
            title,
            message,
            confirmText: 'Tiếp tục',
            cancelText: 'Hủy',
            type: 'warning',
            onConfirm,
            data
        });
    };

    return {
        confirmDialog,
        showConfirmDialog,
        hideConfirmDialog,
        handleConfirm,
        handleCancel,
        showDeleteConfirm,
        showWarningConfirm
    };
};

export default useConfirmDialog;