import React from 'react';

const TitleSection = ({ title, onChange }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
                Tiêu đề bài viết
            </label>
            <input
                type="text"
                value={title}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Nhập tiêu đề hấp dẫn cho bài viết..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-medium placeholder-gray-400"
            />
        </div>
    );
};

export default TitleSection;