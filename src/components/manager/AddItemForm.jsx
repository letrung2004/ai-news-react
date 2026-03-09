import React from "react";
import { Plus, Loader2 } from "lucide-react";

const AddItemForm = ({ title, formData, onFormChange, onSubmit, isSubmitting }) => {
    const canSubmit = formData.name?.trim().length > 0 && !isSubmitting;

    return (
        <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-6">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center">
                        <Plus className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">Thêm {title} mới</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Điền thông tin bên dưới</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            Tên {title} <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => onFormChange("name", e.target.value)}
                            placeholder={`Nhập tên ${title}...`}
                            className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white transition-all placeholder-gray-300"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            Mô tả <span className="text-gray-300 font-normal">(tùy chọn)</span>
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => onFormChange("description", e.target.value)}
                            placeholder={`Mô tả ngắn về ${title}...`}
                            rows={3}
                            className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white transition-all placeholder-gray-300 resize-none"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        onClick={onSubmit}
                        disabled={!canSubmit}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 disabled:bg-gray-100 disabled:text-gray-300 text-white text-sm font-medium rounded-xl transition-all shadow-sm disabled:cursor-not-allowed"
                    >
                        {isSubmitting
                            ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang thêm...</>
                            : <><Plus className="w-4 h-4" /> Thêm {title}</>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddItemForm;