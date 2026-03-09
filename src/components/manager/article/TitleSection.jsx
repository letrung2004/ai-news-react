import React from "react";

const TitleSection = ({ title, onChange }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
            Tiêu đề bài viết <span className="text-red-400 normal-case tracking-normal">*</span>
        </label>
        <input
            type="text"
            value={title}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Nhập tiêu đề hấp dẫn cho bài viết..."
            className="w-full text-lg font-semibold text-gray-900 bg-transparent border-none outline-none placeholder-gray-300 resize-none"
        />
        {title?.length > 0 && (
            <p className="text-xs text-gray-300 mt-2 text-right">{title.length} ký tự</p>
        )}
    </div>
);

export default TitleSection;