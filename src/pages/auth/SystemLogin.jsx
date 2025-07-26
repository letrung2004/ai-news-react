import React, { useEffect, useState } from 'react';

const SystemLogin = () => {
    const [user, setUser] = useState({ username: '', password: '' });
    const errors = {};
    const loading = false;
    const loginUser = () => { };
    const handleUrlErrors = () => { };
    const clearError = () => { };

    const info = [
        { label: 'Tên đăng nhập', type: 'text', field: 'username' },
        { label: 'Mật khẩu', type: 'password', field: 'password' },
    ];

    const handleChange = (value, field) => {
        setUser((prev) => ({ ...prev, [field]: value }));
        clearError(field);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginUser(user);
    };

    useEffect(() => {
        handleUrlErrors();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">
            <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12 py-12">
                {/* Left branding */}
                <div className="flex-1 text-center">
                    <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
                        <span className="text-green-500">MAG</span>
                        <span className="text-gray-800">NEWS</span>
                    </h1>
                    <p className="text-xl text-gray-600">
                        Chào mừng đăng nhập hệ thống quản trị MAGNEWS
                    </p>
                </div>

                {/* Form card */}
                <div className="flex-1 flex justify-center">
                    <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
                            Đăng nhập hệ thống
                        </h2>
                        <p className="text-sm text-gray-500 text-center mb-6">
                            Chỉ dành cho quản trị viên và biên tập viên
                        </p>

                        {errors.general && (
                            <div className="bg-red-100 border border-red-300 text-red-600 px-4 py-3 rounded mb-6 text-sm flex items-center gap-2">
                                <span>⚠</span> {errors.general}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {info.map((f) => (
                                <div key={f.field} className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {f.label}
                                    </label>
                                    <input
                                        type={f.type}
                                        autoComplete={f.field === 'password' ? 'current-password' : 'username'}
                                        value={user[f.field]}
                                        onChange={(e) => handleChange(e.target.value, f.field)}
                                        placeholder={f.label}
                                        className={`w-full px-4 py-3 rounded-lg border text-sm transition focus:outline-none focus:ring-2 ${errors[f.field]
                                            ? 'border-red-400 bg-red-50 focus:ring-red-300'
                                            : 'border-gray-300 bg-gray-50 focus:ring-green-400'
                                            }`}
                                    />
                                    {errors[f.field] && (
                                        <span className="text-red-500 text-xs">{errors[f.field]}</span>
                                    )}
                                </div>
                            ))}

                            <button
                                type="submit"
                                className={`w-full py-3 rounded-lg text-white font-semibold transition relative ${loading
                                    ? 'bg-green-400 opacity-70 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                                    }`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Đang đăng nhập...
                                    </span>
                                ) : (
                                    'Đăng nhập'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemLogin;
