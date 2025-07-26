import React from "react";
const Login = () => {
    return (
        <>
            <main className="max-w-md mx-auto px-6 py-16">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Đăng nhập</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                placeholder="Nhập email của bạn"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                placeholder="Nhập mật khẩu"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                                <span className="ml-2 text-sm text-gray-600">Ghi nhớ đăng nhập</span>
                            </label>
                            <a href="#" className="text-sm text-green-600 hover:text-green-700 cursor-pointer">Quên mật khẩu?</a>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap !rounded-button"
                        >
                            Đăng nhập
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Chưa có tài khoản?{' '}
                            <button
                                onClick={() => setCurrentView('register')}
                                className="text-green-600 hover:text-green-700 cursor-pointer"
                            >
                                Đăng ký ngay
                            </button>
                        </p>
                    </div>
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button">
                                <i className="fab fa-google text-red-500 mr-2"></i>
                                Google
                            </button>
                            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button">
                                <i className="fab fa-facebook-f text-blue-600 mr-2"></i>
                                Facebook
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );

};

export default Login;