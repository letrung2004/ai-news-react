import React from 'react';
import { Image, Upload, X } from 'lucide-react';

const FeaturedImage = ({
    imagePreview,
    onImageUpload,
    onRemoveImage
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between p-4">
                <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <Image className="w-4 h-4 text-orange-600" />
                    <span>Ảnh đại diện</span>
                </h4>
            </div>

            <div className="p-4">
                {imagePreview ? (
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Featured"
                            className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                            onClick={onRemoveImage}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={() => document.getElementById('imageUpload').click()}
                        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors cursor-pointer"
                    >
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-600 mb-2">Kéo thả ảnh vào đây hoặc</p>
                        <span className="text-green-500 text-sm hover:text-green-600 font-medium">
                            Chọn ảnh từ máy tính
                        </span>
                        <input
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            onChange={(e) => onImageUpload(e.target.files[0])}
                            className="hidden"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeaturedImage;
