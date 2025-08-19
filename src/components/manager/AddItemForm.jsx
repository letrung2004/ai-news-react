import React from 'react';
import { Plus, FileCheck } from "lucide-react";

const AddItemForm = ({
    title,
    formData,
    onFormChange,
    onSubmit,
    isSubmitting
}) => {
    return (
        <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <Plus className="w-5 h-5 mr-2 text-green-500" />
                    Thêm {title} mới
                </h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Tên {title}
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => onFormChange("name", e.target.value)}
                            placeholder={`Nhập tên ${title.toLowerCase()}...`}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Mô tả
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => onFormChange("description", e.target.value)}
                            placeholder={`Nhập mô tả ${title.toLowerCase()}...`}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 resize-none"
                        />
                    </div>

                    <button
                        onClick={onSubmit}
                        disabled={isSubmitting}
                        className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FileCheck className="w-4 h-4" />
                        <span>{isSubmitting ? "Đang thêm..." : `Thêm ${title}`}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddItemForm;
