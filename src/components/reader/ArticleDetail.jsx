import React from "react";
import { sanitizeHtmlContent } from "../../utils/helpers";
import SocialShareComponent from "./SocialShareComponent";

const ArticleDetail = ({ article }) => {
    return (
        <div className="col-span-8">
            {/* Article Header */}
            <header className="mb-8">
                <div className="mb-4">
                    <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                        {article.category?.name || 'Tin tức'}
                    </span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {article.title}
                </h1>
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <div className="flex items-center space-x-4">
                        <div>
                            <p className="font-semibold text-gray-900">
                                {article.authors?.length > 0
                                    ? article.authors.join(', ')
                                    : 'Admin'
                                }
                            </p>
                            <p className="text-sm text-gray-500">Phóng viên</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span>
                            <i className="far fa-calendar mr-1"></i>
                            {article.publishDate ? (
                                new Date().toLocaleDateString('vi-VN', { timeZone: 'UTC' })
                            ) : (
                                'Đang tải...'
                            )}
                        </span>
                        <span>
                            <i className="far fa-eye mr-1"></i>
                            {article.viewCount || 0} lượt xem
                        </span>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            {article.featuredImage && (
                <div className="mb-8">
                    <div className="h-96 rounded-lg overflow-hidden shadow-lg">
                        <img
                            src={article.featuredImage}
                            alt={article.title}
                            className="w-full h-full object-cover object-top"
                        />
                    </div>
                    <p className="text-sm text-gray-500 mt-2 italic">
                        {article.title}
                    </p>
                </div>
            )}

            {/* Article Summary */}
            {article.summary && (
                <div className="mb-6">
                    <div className="text-xl text-gray-700 font-medium leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                        <p className="text-sm text-gray-500 mb-1">Tóm tắt bài báo:</p>
                        {article.summary}
                    </div>
                </div>
            )}

            {/* Audio Player */}
            {article.audioUrl && (
                <div className="mt-8 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">
                        <i className="fas fa-volume-up mr-2"></i>
                        Nghe bài báo
                    </h3>
                    <audio controls className="w-full">
                        <source src={article.audioUrl} type="audio/mpeg" />
                        Trình duyệt của bạn không hỗ trợ audio player.
                    </audio>
                </div>
            )}

            {/* Article Content */}
            <article className="prose prose-lg max-w-none pt-5">
                <div
                    className="article-content ckeditor-content"
                    dangerouslySetInnerHTML={{
                        __html: sanitizeHtmlContent(article.content)
                    }}
                />
            </article>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">Thẻ:</h3>
                    <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                            <span
                                key={tag.id}
                                className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:bg-blue-200 cursor-pointer transition-colors"
                            >
                                #{tag.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <SocialShareComponent title={article.title} description={article.description} />
        </div>
    );
};

export default ArticleDetail;
