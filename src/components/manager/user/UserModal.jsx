import React, { useState, useEffect } from 'react';
import { X, Save, User, Lock, Calendar, UserCheck, Mail, UserCircle } from 'lucide-react';
import { useUser } from '../../../hooks/useUser';

const UserModal = ({ isOpen, onClose, userId, mode = 'edit', onSuccess }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        dob: '',
        roles: []
    });
    const [localError, setLocalError] = useState(null);

    const {
        userDetail,
        getUser,
        createUser,
        updateUser,
        isLoading,
        isSubmitting,
        error: hookError
    } = useUser();

    const isEditMode = mode === 'edit';
    const isAddMode = mode === 'add';
    const error = localError || hookError;

    const formFields = [
        {
            name: "username",
            label: "Username",
            placeholder: "Nhập username...",
            type: "text",
            required: true,
            icon: UserCircle,
            showOn: "add",
            gridCols: "full"
        },
        {
            name: "email",
            label: "Email",
            placeholder: "Nhập email...",
            type: "email",
            required: true,
            icon: Mail,
            showOn: "add",
            gridCols: "full"
        },
        {
            name: "password",
            label: isAddMode ? "Mật khẩu" : "Mật khẩu mới (để trống nếu không đổi)",
            placeholder: isAddMode ? "Nhập mật khẩu..." : "Nhập mật khẩu mới...",
            type: "password",
            required: isAddMode,
            icon: Lock,
            gridCols: "full"
        },
        {
            name: "lastName",
            label: "Họ",
            placeholder: "Họ...",
            type: "text",
            required: true,
            gridCols: "half"
        },
        {
            name: "firstName",
            label: "Tên",
            placeholder: "Tên...",
            type: "text",
            required: true,
            gridCols: "half"
        },
        {
            name: "dob",
            label: "Ngày sinh",
            placeholder: "",
            type: "date",
            required: false,
            icon: Calendar,
            gridCols: "full"
        }
    ];

    const visibleFields = formFields.filter(field => {
        if (field.showOn === "add" && !isAddMode) return false;
        if (field.showOn === "edit" && !isEditMode) return false;
        return true;
    });

    const availableRoles = [
        { value: 'ADMIN', label: 'Quản trị viên' },
        { value: 'EDITOR', label: 'Biên tập viên' },
        { value: 'USER', label: 'Người dùng' }
    ];

    useEffect(() => {
        if (isOpen && userId && isEditMode) {
            setLocalError(null);
            getUser(userId);
        }
    }, [isOpen, userId, isEditMode]);

    useEffect(() => {
        if (userDetail?.result && isEditMode) {
            const user = userDetail.result;
            setFormData({
                username: user.username || '',
                email: user.email || '',
                password: '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                dob: user.dob ? user.dob.split('T')[0] : '',
                roles: user.roles?.map(r => r.name) || []
            });
        }
    }, [userDetail, isEditMode]);

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            setFormData({
                username: '',
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                dob: '',
                roles: []
            });
            setLocalError(null);
        }
    }, [isOpen]);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (roleValue, isChecked) => {
        setFormData(prev => ({
            ...prev,
            roles: isChecked
                ? [...prev.roles, roleValue]
                : prev.roles.filter(r => r !== roleValue)
        }));
    };

    const validateForm = () => {
        const requiredFields = formFields.filter(field => field.required);

        for (const field of requiredFields) {
            if (!formData[field.name].trim()) {
                setLocalError(`${field.label} là bắt buộc`);
                return false;
            }
        }

        if (formData.roles.length === 0) {
            setLocalError('Vui lòng chọn ít nhất một vai trò');
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setLocalError(null);

        const submitData = {
            ...formData,
            roles: formData.roles
        };

        let result;
        if (isEditMode) {
            if (!submitData.password) {
                delete submitData.password;
            }
            delete submitData.username;
            delete submitData.email;

            result = await updateUser(userId, submitData);
        } else {
            result = await createUser(submitData);
        }

        if (result.success) {
            onSuccess?.();
            onClose();
        } else {
            setLocalError(result.message || `Có lỗi xảy ra khi ${isAddMode ? 'tạo' : 'cập nhật'} người dùng`);
        }
    };

    const renderFormField = (field) => {
        const { name, type, icon: Icon, label, placeholder, required, gridCols } = field;

        const gridClasses = {
            'full': 'col-span-2',
            'half': 'col-span-1'
        };

        return (
            <div key={name} className={gridClasses[gridCols] || 'col-span-2'}>
                <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    {Icon && <Icon className="w-4 h-4 mr-2" />}
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </div>
                <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder={placeholder}
                    required={required}
                />
            </div>
        );
    };

    if (!isOpen) return null;

    const user = userDetail?.result;
    const modalTitle = isAddMode ? 'Thêm người dùng mới' : 'Cập nhật thông tin người dùng';
    const submitButtonText = isAddMode ? 'Thêm mới' : 'Cập nhật';
    const submittingText = isAddMode ? 'Đang thêm...' : 'Đang cập nhật...';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center space-x-3">
                        <User className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-900">
                            {modalTitle}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        disabled={isSubmitting}
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-6">
                    {(isLoading && isEditMode) ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <span className="ml-3 text-gray-600">Đang tải thông tin...</span>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <p className="text-red-600">{error}</p>
                                </div>
                            )}

                            {isEditMode && user && (
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                                        Thông tin hiện tại:
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-500">Email:</span>
                                            <span className="ml-2 font-medium">{user.email}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Username:</span>
                                            <span className="ml-2 font-medium">{user.username}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                {formFields.map(renderFormField)}
                            </div>

                            <div>
                                <div className="flex items-center text-sm font-medium text-gray-700 mb-3">
                                    <UserCheck className="w-4 h-4 mr-2" />
                                    Vai trò <span className="text-red-500 ml-1">*</span>
                                </div>
                                <div className="space-y-2">
                                    {availableRoles.map(role => (
                                        <label key={role.value} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={formData.roles.includes(role.value)}
                                                onChange={e => handleRoleChange(role.value, e.target.checked)}
                                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{role.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-3 pt-6 border-t">
                                <button
                                    onClick={onClose}
                                    disabled={isSubmitting}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            <span>{submittingText}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            <span>{submitButtonText}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserModal;