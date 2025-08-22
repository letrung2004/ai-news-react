import React from "react";

const BreakingNewsTicker = ({ featuredArticle }) => {
    return (
        <div className="bg-red-600 text-white py-2">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center">
                    <span className="font-bold mr-4">Tin mới:</span>
                    {featuredArticle ? (
                        <span className="text-sm">{featuredArticle.title}</span>
                    ) : (
                        <span className="text-sm">
                            Bộ Nội vụ đề xuất tăng lương tối thiểu vùng 7,2% từ 1/1/2026
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BreakingNewsTicker;
