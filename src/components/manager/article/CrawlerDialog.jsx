import React, { useState, useEffect } from 'react';
import { Download, X, Loader2, Check } from 'lucide-react';

const CrawlerDialog = ({
    isVisible,
    onClose,
    onConfirm,
    categories = [], // Danh sách category từ API
    loading = false
}) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [limit, setLimit] = useState(10);
    const [submitting, setSubmitting] = useState(false);

    // Reset khi mở dialog
    useEffect(() => {
        if (isVisible) {
            setSelectedCategories([]);
            setLimit(10);
            setSubmitting(false);
        }
    }, [isVisible]);

    if (!isVisible) return null;

    const handleToggleCategory = (categoryId) => {
        setSelectedCategories(prev => {
            if (prev.includes(categoryId)) {
                return prev.filter(id => id !== categoryId);
            }
            return [...prev, categoryId];
        });
    };

    const handleSelectAll = () => {
        if (selectedCategories.length === categories.length) {
            setSelectedCategories([]);
        } else {
            setSelectedCategories(categories.map(cat => cat.id));
        }
    };

    const handleSubmit = async () => {
        if (selectedCategories.length === 0) {
            alert('Vui lòng chọn ít nhất 1 danh mục!');
            return;
        }

        if (limit < 1 || limit > 100) {
            alert('Số lượng bài viết phải từ 1 đến 100!');
            return;
        }

        setSubmitting(true);
        await onConfirm({
            categoryIds: selectedCategories,
            limit: limit
        });
        setSubmitting(false);
    };

    const isAllSelected = selectedCategories.length === categories.length && categories.length > 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                            <Download className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Crawl bài viết tự động
                            </h3>
                            <p className="text-sm text-gray-500">
                                Chọn danh mục và số lượng bài cần crawl
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={submitting}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    
                    {/* Limit Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số lượng bài viết mỗi danh mục
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                type="number"
                                min="1"
                                max="100"
                                value={limit}
                                onChange={(e) => setLimit(Number(e.target.value))}
                                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                disabled={submitting}
                            />
                            <span className="text-sm text-gray-500">
                                bài/danh mục (tối đa 100)
                            </span>
                        </div>
                    </div>

                    {/* Categories Selection */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-medium text-gray-700">
                                Chọn danh mục ({selectedCategories.length}/{categories.length})
                            </label>
                            <button
                                onClick={handleSelectAll}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                disabled={submitting || loading}
                            >
                                {isAllSelected ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                            </button>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                                <span className="ml-2 text-sm text-gray-500">Đang tải danh mục...</span>
                            </div>
                        ) : categories.length === 0 ? (
                            <div className="text-center py-12 text-gray-400">
                                <p className="text-sm">Không có danh mục nào có thể crawl</p>
                            </div>
                        ) : (
                            <div className="space-y-2 max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-3">
                                {categories.map((category) => {
                                    const isSelected = selectedCategories.includes(category.id);
                                    return (
                                        <div
                                            key={category.id}
                                            onClick={() => !submitting && handleToggleCategory(category.id)}
                                            className={`
                                                flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all
                                                ${isSelected 
                                                    ? 'bg-blue-50 border-2 border-blue-500' 
                                                    : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                                                }
                                                ${submitting ? 'opacity-50 cursor-not-allowed' : ''}
                                            `}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`
                                                    w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                                                    ${isSelected 
                                                        ? 'bg-blue-500 border-blue-500' 
                                                        : 'border-gray-300'
                                                    }
                                                `}>
                                                    {isSelected && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {category.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        {category.url}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    {selectedCategories.length > 0 && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800">
                                🤖 Sẽ crawl tối đa <span className="font-semibold">{selectedCategories.length * limit}</span> bài viết 
                                từ <span className="font-semibold">{selectedCategories.length}</span> danh mục
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        disabled={submitting}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={submitting || selectedCategories.length === 0}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Đang xử lý...
                            </>
                        ) : (
                            <>
                                <Download className="w-4 h-4" />
                                Bắt đầu crawl
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CrawlerDialog;