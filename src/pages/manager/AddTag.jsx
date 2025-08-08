import React, { useState } from "react";
import {
    Save,
    FileCheck,
    Hash,
    Plus,
    Edit,
    Trash2,
    Search,
    Tag
} from "lucide-react";
import { useTag } from "../../hooks/useTag";

const AddTag = () => {
    const { tags, isLoading, error, loadTags, createTag, deleteTag } = useTag();
    console.log("Tags:", tags.result);

    const [tagForm, setTagForm] = useState({
        name: '',
        description: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    const handleFormChange = (field, value) => {
        setTagForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        try {
            setIsSubmitting(true);
            createTag(tagForm);
            setTagForm({ name: '', description: '' });
        } catch (error) {
            console.error('Error submitting tag:', error);
        } finally {
            setIsSubmitting(false);
        }


    };

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa thẻ này?')) {
            deleteTag(id);
        }
    };

    const tagList = tags?.result || [];

    const filteredTags = tagList.filter(tag =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tag.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getTagColor = (index) => {
        const colors = [
            'bg-green-100 text-green-800',
            'bg-green-100 text-green-800',
            'bg-green-100 text-green-800',
            'bg-yellow-100 text-yellow-800',
            'bg-pink-100 text-pink-800',
            'bg-indigo-100 text-indigo-800',
            'bg-red-100 text-red-800',
            'bg-gray-100 text-gray-800'
        ];
        return colors[index % colors.length];
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý thẻ</h1>
                    <p className="text-gray-600">Thêm mới và quản lý thẻ nội dung</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form thêm tag */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                                <Plus className="w-5 h-5 mr-2 text-green-600" />
                                Thêm thẻ mới
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Tên thẻ
                                    </label>
                                    <input
                                        type="text"
                                        value={tagForm.name}
                                        onChange={(e) => handleFormChange('name', e.target.value)}
                                        placeholder="Nhập tên thẻ..."
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Mô tả
                                    </label>
                                    <textarea
                                        value={tagForm.description}
                                        onChange={(e) => handleFormChange('description', e.target.value)}
                                        placeholder="Nhập mô tả thẻ..."
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 resize-none"
                                    />
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FileCheck className="w-4 h-4" />
                                    <span>{isSubmitting ? 'Đang thêm...' : 'Thêm thẻ'}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Danh sách tag */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                        <Hash className="w-5 h-5 mr-2 text-green-600" />
                                        Danh sách thẻ
                                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-600 text-sm rounded-full">
                                            {filteredTags.length} thẻ
                                        </span>
                                    </h3>
                                </div>

                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm thẻ..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="p-6">
                                {filteredTags.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {filteredTags.map((tag, index) => (
                                            <div key={tag.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(index)}`}>
                                                            <Hash className="w-3 h-3 inline mr-1" />
                                                            {tag.name}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {tag.count} bài viết
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <button className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
                                                            <Edit className="w-3 h-3" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(tag.id)}
                                                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                                {tag.description && (
                                                    <p className="text-xs text-gray-600">{tag.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <Tag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500">
                                            {searchTerm ? 'Không tìm thấy thẻ nào' : 'Chưa có thẻ nào'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTag;