import React, { useState } from "react";
import {
    Plus, Image, FileText, Youtube, Mail, Save, Eye, FileCheck, MessageCircle, Hash, Upload, ChevronUp, ChevronDown,
    Bold, Italic, List, ListOrdered, Quote, AlignLeft, AlignCenter,
    AlignRight, Link, Table, Video
} from "lucide-react";

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

    const [collapsedSections, setCollapsedSections] = useState({});
    const [editorMode, setEditorMode] = useState('visual');

    const handleAddArticleFormChange = (field, value) => {
        setAddArticleForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const toggleSection = (sectionId) => {
        setCollapsedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const wordCount = addArticleForm.content.split(' ').filter(word => word.length > 0).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Thêm bài báo mới</h1>
                            <p className="text-gray-600">Tạo và xuất bản nội dung chất lượng cao</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                                <Save className="w-4 h-4" />
                                <span>Lưu nháp</span>
                            </button>
                            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                                <Eye className="w-4 h-4" />
                                <span>Xem trước</span>
                            </button>
                            <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg flex items-center space-x-2">
                                <FileCheck className="w-4 h-4" />
                                <span>Xuất bản</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Tiêu đề bài viết
                            </label>
                            <input
                                type="text"
                                value={addArticleForm.title}
                                onChange={(e) => handleAddArticleFormChange('title', e.target.value)}
                                placeholder="Nhập tiêu đề hấp dẫn cho bài viết..."
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-medium placeholder-gray-400"
                            />
                        </div>

                        {/* Editor */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            {/* Media Toolbar */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                                <div className="flex items-center space-x-3">
                                    <button className="px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center space-x-2">
                                        <Image className="w-4 h-4" />
                                        <span>Media</span>
                                    </button>
                                    <button className="px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center space-x-2">
                                        <FileText className="w-4 h-4" />
                                        <span>Form</span>
                                    </button>
                                    <button className="px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center space-x-2">
                                        <Youtube className="w-4 h-4" />
                                        <span>YouTube</span>
                                    </button>
                                    <button className="px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center space-x-2">
                                        <Mail className="w-4 h-4" />
                                        <span>Contact</span>
                                    </button>
                                </div>
                                <div className="flex items-center space-x-1 bg-white rounded-lg p-1 border border-gray-200">
                                    <button
                                        onClick={() => setEditorMode('visual')}
                                        className={`px-3 py-1 text-sm rounded-md transition-colors ${editorMode === 'visual'
                                            ? 'bg-green-100 text-green-700'
                                            : 'text-gray-600 hover:text-gray-800'
                                            }`}
                                    >
                                        Visual
                                    </button>
                                    <button
                                        onClick={() => setEditorMode('text')}
                                        className={`px-3 py-1 text-sm rounded-md transition-colors ${editorMode === 'text'
                                            ? 'bg-green-100 text-green-700'
                                            : 'text-gray-600 hover:text-gray-800'
                                            }`}
                                    >
                                        Text
                                    </button>
                                </div>
                            </div>

                            {/* Format Toolbar */}
                            <div className="flex items-center p-4 border-b border-gray-200 flex-wrap gap-2">
                                <select className="px-3 py-1 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-500">
                                    <option>Đoạn văn</option>
                                    <option>Tiêu đề 1</option>
                                    <option>Tiêu đề 2</option>
                                    <option>Tiêu đề 3</option>
                                </select>

                                <div className="flex items-center space-x-1 ml-4">
                                    {[
                                        { icon: Bold, title: 'Bold' },
                                        { icon: Italic, title: 'Italic' },
                                        { icon: List, title: 'Bullet List' },
                                        { icon: ListOrdered, title: 'Numbered List' },
                                        { icon: Quote, title: 'Quote' },
                                        { icon: AlignLeft, title: 'Align Left' },
                                        { icon: AlignCenter, title: 'Align Center' },
                                        { icon: AlignRight, title: 'Align Right' },
                                        { icon: Link, title: 'Link' },
                                        { icon: Table, title: 'Table' },
                                        { icon: Image, title: 'Image' },
                                        { icon: Video, title: 'Video' }
                                    ].map((tool, index) => (
                                        <button
                                            key={index}
                                            title={tool.title}
                                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors"
                                        >
                                            <tool.icon className="w-4 h-4 text-gray-600" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-6">
                                <textarea
                                    value={addArticleForm.content}
                                    onChange={(e) => handleAddArticleFormChange('content', e.target.value)}
                                    placeholder="Bắt đầu viết nội dung tuyệt vời của bạn..."
                                    className="w-full h-80 border-none resize-none focus:outline-none text-base leading-relaxed placeholder-gray-400"
                                />
                            </div>

                            {/* Status Bar */}
                            {/* <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
                                <div className="text-sm text-gray-600 flex items-center space-x-4">
                                    <span>Số từ: <span className="font-semibold text-gray-800">{wordCount}</span></span>
                                    <span>Ký tự: <span className="font-semibold text-gray-800">{addArticleForm.content.length}</span></span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-green-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span>Đang lưu tự động...</span>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {/* Publish Section */}
                        {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div
                                className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 cursor-pointer"
                                onClick={() => toggleSection('publish')}
                            >
                                <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                                    <FileCheck className="w-4 h-4 text-green-600" />
                                    <span>Xuất bản</span>
                                </h4>
                                {collapsedSections['publish'] ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                            </div>

                            {!collapsedSections['publish'] && (
                                <div className="p-4 space-y-4">
                                    <div className="grid grid-cols-2 gap-2">
                                        <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1">
                                            <Save className="w-3 h-3" />
                                            <span>Lưu nháp</span>
                                        </button>
                                        <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1">
                                            <Eye className="w-3 h-3" />
                                            <span>Xem trước</span>
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {[
                                            { icon: FileText, label: 'Trạng thái:', value: 'Nháp', color: 'text-yellow-600' },
                                            { icon: Globe, label: 'Hiển thị:', value: 'Công khai', color: 'text-green-600' },
                                            { icon: Calendar, label: 'Xuất bản:', value: 'Ngay lập tức', color: 'text-blue-600' }
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center justify-between py-2">
                                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                    <item.icon className="w-4 h-4" />
                                                    <span>{item.label}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className={`text-sm font-medium ${item.color}`}>{item.value}</span>
                                                    <button className="text-green-500 text-sm hover:text-green-600">
                                                        <Edit3 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                        <div className="flex items-center space-x-2">
                                            <AlertTriangle className="w-4 h-4 text-red-500" />
                                            <span className="text-sm text-red-700">SEO Score: {addArticleForm.seoScore}/100</span>
                                        </div>
                                        <div className="mt-2 bg-red-100 rounded-full h-2">
                                            <div
                                                className="bg-red-500 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${addArticleForm.seoScore}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg font-medium">
                                        Xuất bản ngay
                                    </button>
                                </div>
                            )}
                        </div> */}

                        {/* Categories */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer"
                                onClick={() => toggleSection('categories')}
                            >
                                <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                                    <FileText className="w-4 h-4 text-blue-600" />
                                    <span>Danh mục</span>
                                </h4>
                                {collapsedSections['categories'] ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                            </div>

                            {!collapsedSections['categories'] && (
                                <div className="p-4 space-y-3">
                                    <div className="max-h-32 overflow-y-auto space-y-2">
                                        {['Công nghệ', 'Thể thao', 'Văn hóa', 'Kinh tế', 'Giải trí'].map((category, index) => (
                                            <label key={index} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg">
                                                <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                                                <span className="text-sm text-gray-700">{category}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <button className="text-green-500 text-sm hover:text-green-600 flex items-center space-x-1">
                                        <Plus className="w-3 h-3" />
                                        <span>Thêm danh mục mới</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Tags */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer"
                                onClick={() => toggleSection('tags')}
                            >
                                <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                                    <Hash className="w-4 h-4 text-purple-600" />
                                    <span>Thẻ</span>
                                </h4>
                                {collapsedSections['tags'] ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                            </div>

                            {!collapsedSections['tags'] && (
                                <div className="p-4 space-y-3">
                                    <input
                                        type="text"
                                        value={addArticleForm.tags}
                                        onChange={(e) => handleAddArticleFormChange('tags', e.target.value)}
                                        placeholder="Nhập thẻ, cách nhau bằng dấu phẩy"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                    <div className="text-xs text-gray-500">
                                        Thẻ phổ biến: <span className="text-blue-600">công nghệ</span>, <span className="text-blue-600">tin tức</span>, <span className="text-blue-600">thể thao</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Featured Image */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer"
                                onClick={() => toggleSection('image')}
                            >
                                <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                                    <Image className="w-4 h-4 text-orange-600" />
                                    <span>Ảnh đại diện</span>
                                </h4>
                                {collapsedSections['image'] ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                            </div>

                            {!collapsedSections['image'] && (
                                <div className="p-4">
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors">
                                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                                        <p className="text-sm text-gray-600 mb-2">Kéo thả ảnh vào đây hoặc</p>
                                        <button className="text-green-500 text-sm hover:text-green-600 font-medium">
                                            Chọn ảnh từ máy tính
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Notifications */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer"
                                onClick={() => toggleSection('notifications')}
                            >
                                <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                                    <MessageCircle className="w-4 h-4 text-indigo-600" />
                                    <span>Thông báo Push</span>
                                </h4>
                                {collapsedSections['notifications'] ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                            </div>

                            {!collapsedSections['notifications'] && (
                                <div className="p-4 space-y-3">
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" defaultChecked />
                                        <span className="text-sm text-gray-700">Gửi thông báo khi xuất bản</span>
                                    </label>
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-2">Nội dung thông báo</label>
                                        <textarea
                                            value={addArticleForm.notificationContent}
                                            onChange={(e) => handleAddArticleFormChange('notificationContent', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                            rows={3}
                                            placeholder="Tùy chỉnh nội dung thông báo..."
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddArticle;