import React, { useState, useEffect } from "react";
import { X, Save, User, Lock, Calendar, UserCheck, Mail, UserCircle, Loader2, Crown, Shield } from "lucide-react";
import { useUser } from "../../../hooks/useUser";

const ROLES = [
    { value: "ADMIN",  label: "Quản trị viên", icon: Crown,  cls: "border-red-200 bg-red-50 text-red-600",    check: "text-red-500" },
    { value: "EDITOR", label: "Biên tập viên",  icon: Shield, cls: "border-blue-200 bg-blue-50 text-blue-600", check: "text-blue-500" },
    { value: "USER",   label: "Người dùng",     icon: User,   cls: "border-gray-200 bg-gray-50 text-gray-600", check: "text-gray-500" },
];

const Field = ({ label, icon: Icon, required, children }) => (
    <div>
        <label className="block text-xs font-medium text-gray-500 mb-1.5">
            {Icon && <Icon className="w-3.5 h-3.5 inline mr-1.5 text-gray-400" />}
            {label} {required && <span className="text-red-400">*</span>}
        </label>
        {children}
    </div>
);

const inputCls = "w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white transition-all placeholder-gray-300";

const UserModal = ({ isOpen, onClose, userId, mode = "edit", onSuccess }) => {
    const isAdd = mode === "add";

    const [formData, setFormData] = useState({
        username: "", email: "", password: "",
        firstName: "", lastName: "", dob: "", roles: []
    });
    const [localError, setLocalError] = useState(null);

    const { userDetail, getUser, createUser, updateUser, isLoading, isSubmitting, error: hookError } = useUser();
    const error = localError || hookError;

    // Load user khi edit
    useEffect(() => {
        if (isOpen && userId && !isAdd) { setLocalError(null); getUser(userId); }
    }, [isOpen, userId, isAdd]);

    useEffect(() => {
        if (userDetail?.result && !isAdd) {
            const u = userDetail.result;
            setFormData({
                username: u.username || "", email: u.email || "", password: "",
                firstName: u.firstName || "", lastName: u.lastName || "",
                dob: u.dob ? u.dob.split("T")[0] : "",
                roles: u.roles?.map(r => r.name) || []
            });
        }
    }, [userDetail, isAdd]);

    useEffect(() => {
        if (!isOpen) {
            setFormData({ username: "", email: "", password: "", firstName: "", lastName: "", dob: "", roles: [] });
            setLocalError(null);
        }
    }, [isOpen]);

    const set = (field) => (e) => setFormData(p => ({ ...p, [field]: e.target.value }));

    const toggleRole = (val) => setFormData(p => ({
        ...p,
        roles: p.roles.includes(val) ? p.roles.filter(r => r !== val) : [...p.roles, val]
    }));

    const validate = () => {
        if (!formData.firstName.trim()) return setLocalError("Tên là bắt buộc"), false;
        if (!formData.lastName.trim()) return setLocalError("Họ là bắt buộc"), false;
        if (isAdd && !formData.username.trim()) return setLocalError("Username là bắt buộc"), false;
        if (isAdd && !formData.email.trim()) return setLocalError("Email là bắt buộc"), false;
        if (isAdd && !formData.password.trim()) return setLocalError("Mật khẩu là bắt buộc"), false;
        if (formData.roles.length === 0) return setLocalError("Chọn ít nhất một vai trò"), false;
        return true;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        setLocalError(null);

        const data = { ...formData };
        let result;
        if (isAdd) {
            result = await createUser(data);
        } else {
            if (!data.password) delete data.password;
            delete data.username; delete data.email;
            result = await updateUser(userId, data);
        }

        if (result.success) { onSuccess?.(); onClose(); }
        else setLocalError(result.message || "Có lỗi xảy ra");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center">
                            <User className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-gray-900">
                                {isAdd ? "Thêm người dùng mới" : "Cập nhật người dùng"}
                            </h2>
                            {!isAdd && userDetail?.result && (
                                <p className="text-xs text-gray-400">@{userDetail.result.username}</p>
                            )}
                        </div>
                    </div>
                    <button onClick={onClose} disabled={isSubmitting} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5">
                    {isLoading && !isAdd ? (
                        <div className="flex items-center justify-center py-12 gap-3 text-gray-400">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span className="text-sm">Đang tải thông tin...</span>
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            {/* Add-only fields */}
                            {isAdd && (
                                <div className="space-y-4">
                                    <Field label="Username" icon={UserCircle} required>
                                        <input type="text" value={formData.username} onChange={set("username")} placeholder="Nhập username..." className={inputCls} />
                                    </Field>
                                    <Field label="Email" icon={Mail} required>
                                        <input type="email" value={formData.email} onChange={set("email")} placeholder="Nhập email..." className={inputCls} />
                                    </Field>
                                </div>
                            )}

                            {/* Password */}
                            <Field label={isAdd ? "Mật khẩu" : "Mật khẩu mới"} icon={Lock} required={isAdd}>
                                <input type="password" value={formData.password} onChange={set("password")}
                                    placeholder={isAdd ? "Nhập mật khẩu..." : "Để trống nếu không đổi..."} className={inputCls} />
                            </Field>

                            {/* Name row */}
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Họ" required>
                                    <input type="text" value={formData.lastName} onChange={set("lastName")} placeholder="Họ..." className={inputCls} />
                                </Field>
                                <Field label="Tên" required>
                                    <input type="text" value={formData.firstName} onChange={set("firstName")} placeholder="Tên..." className={inputCls} />
                                </Field>
                            </div>

                            {/* DOB */}
                            <Field label="Ngày sinh" icon={Calendar}>
                                <input type="date" value={formData.dob} onChange={set("dob")} className={inputCls} />
                            </Field>

                            {/* Roles */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-2">
                                    <UserCheck className="w-3.5 h-3.5 inline mr-1.5 text-gray-400" />
                                    Vai trò <span className="text-red-400">*</span>
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {ROLES.map(({ value, label, icon: Icon, cls }) => {
                                        const selected = formData.roles.includes(value);
                                        return (
                                            <button
                                                key={value}
                                                type="button"
                                                onClick={() => toggleRole(value)}
                                                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-xs font-medium ${
                                                    selected ? cls + " shadow-sm" : "border-gray-100 bg-white text-gray-400 hover:border-gray-200"
                                                }`}
                                            >
                                                <Icon className="w-4 h-4" />
                                                {label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                {!(isLoading && !isAdd) && (
                    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
                        <button
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors disabled:opacity-50 shadow-sm"
                        >
                            {isSubmitting
                                ? <><Loader2 className="w-4 h-4 animate-spin" />{isAdd ? "Đang thêm..." : "Đang lưu..."}</>
                                : <><Save className="w-4 h-4" />{isAdd ? "Thêm mới" : "Lưu thay đổi"}</>
                            }
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserModal;