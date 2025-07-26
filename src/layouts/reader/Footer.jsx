import React from "react";
const Footer = () => {
    return (
        <>
            <footer className="bg-gray-900 text-white mt-16">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">
                                <span className="text-green-500">MAG</span>NEWS
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Trang tin tức hàng đầu Việt Nam, cập nhật thông tin nhanh chóng và chính xác.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Danh mục</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white cursor-pointer">Tin mới</a></li>
                                <li><a href="#" className="hover:text-white cursor-pointer">Giải trí</a></li>
                                <li><a href="#" className="hover:text-white cursor-pointer">Kinh doanh</a></li>
                                <li><a href="#" className="hover:text-white cursor-pointer">Thể thao</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Liên kết</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white cursor-pointer">Về chúng tôi</a></li>
                                <li><a href="#" className="hover:text-white cursor-pointer">Liên hệ</a></li>
                                <li><a href="#" className="hover:text-white cursor-pointer">Chính sách</a></li>
                                <li><a href="#" className="hover:text-white cursor-pointer">Điều khoản</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Theo dõi</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                                    <i className="fab fa-youtube"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                        <p>&copy; 2025 MagNews. Tất cả quyền được bảo lưu.</p>
                    </div>
                </div>
            </footer>
        </>
    );

};

export default Footer;