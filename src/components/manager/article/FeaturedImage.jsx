import React from "react";
import { ImageIcon, Upload, X, RefreshCw } from "lucide-react";

const FeaturedImage = ({ imagePreview, onImageUpload, onRemoveImage }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-xs font-medium text-gray-600">Ảnh đại diện</span>
            </div>
            {imagePreview && (
                <button
                    onClick={() => document.getElementById("featuredImageUpload").click()}
                    className="text-xs text-green-600 hover:text-green-700 flex items-center gap-1"
                >
                    <RefreshCw className="w-3 h-3" /> Đổi ảnh
                </button>
            )}
        </div>

        <div className="p-4">
            {imagePreview ? (
                <div className="relative rounded-xl overflow-hidden">
                    <img src={imagePreview} alt="Featured" className="w-full h-36 object-cover" />
                    <button
                        onClick={onRemoveImage}
                        className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => document.getElementById("featuredImageUpload").click()}
                    className="border-2 border-dashed border-gray-200 hover:border-green-400 rounded-xl p-6 text-center cursor-pointer transition-colors group"
                >
                    <Upload className="w-6 h-6 text-gray-300 group-hover:text-green-400 mx-auto mb-2 transition-colors" />
                    <p className="text-xs text-gray-400">Kéo thả hoặc</p>
                    <p className="text-xs text-green-500 font-medium mt-0.5">Chọn ảnh từ máy tính</p>
                </div>
            )}
            <input
                id="featuredImageUpload"
                type="file"
                accept="image/*"
                onChange={(e) => onImageUpload(e.target.files[0])}
                className="hidden"
            />
        </div>
    </div>
);

export default FeaturedImage;