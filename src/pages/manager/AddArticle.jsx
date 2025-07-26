import React, { useState } from "react";
const AddArticle = () => {
    const [addArticleForm, setAddArticleForm] = useState({
        title: '',
        content: '',
        category: '',
        tags: '',
        status: 'draft',
        visibility: 'public',
        publishTime: 'immediately',
        seoScore: 2,
        notificationContent: ''
    });

    const handleAddArticleFormChange = (field, value) => {
        setAddArticleForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    return (
        <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Thêm bài báo mới</h3>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content Area */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tiêu đề bài viết
                                </label>
                                <input
                                    type="text"
                                    value={addArticleForm.title}
                                    onChange={(e) => handleAddArticleFormChange('title', e.target.value)}
                                    placeholder="Nhập tiêu đề bài viết..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                                />
                            </div>

                            {/* Toolbar */}
                            <div className="border border-gray-200 rounded-lg">
                                <div className="flex items-center justify-between p-3 border-b border-gray-200">
                                    <div className="flex items-center space-x-4">
                                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm cursor-pointer whitespace-nowrap">
                                            <i className="fas fa-image mr-1"></i>
                                            Thêm Media
                                        </button>
                                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm cursor-pointer whitespace-nowrap">
                                            <i className="fas fa-wpforms mr-1"></i>
                                            Thêm Form
                                        </button>
                                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm cursor-pointer whitespace-nowrap">
                                            <i className="fab fa-youtube mr-1"></i>
                                            YouTube
                                        </button>
                                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm cursor-pointer whitespace-nowrap">
                                            <i className="fas fa-address-card mr-1"></i>
                                            Thêm Contact Form
                                        </button>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button className="text-gray-600 hover:text-gray-800 cursor-pointer">Visual</button>
                                        <button className="text-gray-600 hover:text-gray-800 cursor-pointer">Text</button>
                                    </div>
                                </div>

                                {/* Editor Toolbar */}
                                <div className="flex items-center p-3 border-b border-gray-200 flex-wrap gap-2">
                                    <select className="text-sm border-none bg-transparent cursor-pointer">
                                        <option>Đoạn văn</option>
                                        <option>Tiêu đề 1</option>
                                        <option>Tiêu đề 2</option>
                                    </select>
                                    <div className="flex items-center space-x-1">
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer">
                                            <i className="fas fa-bold text-sm"></i>
                                        </button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer">
                                            <i className="fas fa-italic text-sm"></i>
                                        </button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer">
                                            <i className="fas fa-list-ul text-sm"></i>
                                        </button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer">
                                            <i className="fas fa-list-ol text-sm"></i>
                                        </button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer">
                                            <i className="fas fa-quote-left text-sm"></i>
                                        </button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer">
                                            <i className="fas fa-align-left text-sm"></i>
                                        </button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer">
                                            <i className="fas fa-align-center text-sm"></i>
                                        </button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer">
                                            <i className="fas fa-align-right text-sm"></i>
                                        </button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer">
                                            <i className="fas fa-link text-sm"></i>
                                        </button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer">
                                            <i className="fas fa-table text-sm"></i>
                                        </button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer">
                                            <i className="fas fa-image text-sm"></i>
                                        </button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer">
                                            <i className="fas fa-video text-sm"></i>
                                        </button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer">
                                            <i className="fas fa-circle text-sm"></i>
                                        </button>
                                        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer">
                                            <i className="fas fa-globe text-sm"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-4">
                                    <textarea
                                        value={addArticleForm.content}
                                        onChange={(e) => handleAddArticleFormChange('content', e.target.value)}
                                        placeholder="Nhập nội dung bài viết..."
                                        className="w-full h-64 border-none resize-none focus:outline-none text-sm"
                                    />
                                </div>

                                {/* Status Bar */}
                                <div className="flex items-center justify-between p-3 border-t border-gray-200 bg-gray-50">
                                    <div className="text-sm text-gray-500">
                                        Số từ: {addArticleForm.content.split(' ').filter(word => word.length > 0).length}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Đang lưu nháp...
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* OneSignal Push Notifications */}
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-gray-900">OneSignal Push Notifications</h4>
                                    <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                        <i className="fas fa-chevron-up"></i>
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" defaultChecked />
                                        <span className="text-sm text-gray-700">Gửi thông báo khi xuất bản bài viết</span>
                                    </label>
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-1">Tùy chỉnh nội dung thông báo</label>
                                        <textarea
                                            value={addArticleForm.notificationContent}
                                            onChange={(e) => handleAddArticleFormChange('notificationContent', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                                            rows={3}
                                            placeholder="Nhập nội dung thông báo..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Publish */}
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-gray-900">Xuất bản</h4>
                                    <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                        <i className="fas fa-chevron-up"></i>
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded text-sm cursor-pointer whitespace-nowrap">
                                            Lưu nháp
                                        </button>
                                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded text-sm cursor-pointer whitespace-nowrap">
                                            Xem trước
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">
                                                <i className="fas fa-file-alt mr-1"></i>
                                                Trạng thái:
                                            </span>
                                            <span className="text-sm font-medium text-gray-900">Nháp</span>
                                            <button className="text-red-500 text-sm cursor-pointer">Chỉnh sửa</button>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">
                                                <i className="fas fa-eye mr-1"></i>
                                                Hiển thị:
                                            </span>
                                            <span className="text-sm font-medium text-gray-900">Công khai</span>
                                            <button className="text-red-500 text-sm cursor-pointer">Chỉnh sửa</button>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">
                                                <i className="fas fa-calendar mr-1"></i>
                                                Xuất bản:
                                            </span>
                                            <span className="text-sm font-medium text-gray-900">Ngay lập tức</span>
                                            <button className="text-red-500 text-sm cursor-pointer">Chỉnh sửa</button>
                                        </div>
                                    </div>

                                    <div className="bg-red-50 border border-red-200 rounded p-3">
                                        <div className="flex items-center">
                                            <i className="fas fa-exclamation-triangle text-red-500 mr-2"></i>
                                            <span className="text-sm text-red-700">SEO: {addArticleForm.seoScore}/100</span>
                                        </div>
                                    </div>

                                    <button className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap">
                                        Xuất bản
                                    </button>
                                </div>
                            </div>

                            {/* Content AI */}
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-gray-900">Content AI</h4>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-500">0</span>
                                        <i className="fas fa-circle text-green-500 text-xs"></i>
                                        <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                            <i className="fas fa-chevron-up"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded text-sm hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                                        <i className="fas fa-search mr-2"></i>
                                        Nghiên cứu
                                    </button>
                                    <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded text-sm hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                                        <i className="fas fa-magic mr-2"></i>
                                        Tạo nội dung
                                    </button>
                                    <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded text-sm hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                                        <i className="fas fa-comment mr-2"></i>
                                        Bình luận
                                    </button>
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-gray-900">Danh mục</h4>
                                    <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                        <i className="fas fa-chevron-up"></i>
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    <div className="max-h-32 overflow-y-auto space-y-2">
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" />
                                            <span className="text-sm text-gray-700">Công nghệ</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" />
                                            <span className="text-sm text-gray-700">Thể thao</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" />
                                            <span className="text-sm text-gray-700">Văn hóa</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" />
                                            <span className="text-sm text-gray-700">Kinh tế</span>
                                        </label>
                                    </div>
                                    <button className="text-red-500 text-sm cursor-pointer">+ Thêm danh mục mới</button>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-gray-900">Thẻ</h4>
                                    <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                        <i className="fas fa-chevron-up"></i>
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        value={addArticleForm.tags}
                                        onChange={(e) => handleAddArticleFormChange('tags', e.target.value)}
                                        placeholder="Nhập thẻ, cách nhau bằng dấu phẩy"
                                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                    <div className="text-xs text-gray-500">
                                        Các thẻ phổ biến: công nghệ, tin tức, thể thao
                                    </div>
                                </div>
                            </div>

                            {/* Featured Image */}
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-gray-900">Ảnh đại diện</h4>
                                    <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                        <i className="fas fa-chevron-up"></i>
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <i className="fas fa-image text-3xl text-gray-400 mb-2"></i>
                                        <p className="text-sm text-gray-500 mb-2">Kéo thả ảnh vào đây hoặc</p>
                                        <button className="text-red-500 text-sm cursor-pointer">Chọn ảnh</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );

};

export default AddArticle;