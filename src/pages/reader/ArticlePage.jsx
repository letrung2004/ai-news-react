import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import usePublicArticles from "../../hooks/usePublicArticles";
import SimpleLoading from "../../components/SimpleLoading";
import { sanitizeHtmlContent } from "../../utils/helpers";

const ArticlePage = () => {
    const { user } = useAuth();
    const { articleSlug } = useParams();

    const { detailArticle, loading, error, loadDetailArticles } = usePublicArticles();
    console.log(detailArticle);

    useEffect(() => {
        if (articleSlug) {
            loadDetailArticles(articleSlug);
        }
    }, [articleSlug]);

    // Xử lý error
    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="text-center">
                    <p className="text-red-600 text-lg">Có lỗi xảy ra: {error}</p>
                    <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
                        ← Về trang chủ
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            {loading ? (
                <SimpleLoading />
            ) : !detailArticle?.result ? (
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="text-center">
                        <p className="text-gray-600 text-lg">Không tìm thấy bài viết.</p>
                        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
                            ← Về trang chủ
                        </Link>
                    </div>
                </div>
            ) : (
                <main className="max-w-7xl mx-auto px-6 py-8">
                    {/* Breadcrumb */}
                    <nav className="mb-8">
                        <ol className="flex items-center space-x-2 text-sm text-gray-500">
                            <li>
                                <Link to="/" className="hover:text-blue-600 cursor-pointer">
                                    Trang chủ
                                </Link>
                            </li>
                            <li><i className="fas fa-chevron-right text-xs"></i></li>
                            <li>
                                <span className="hover:text-blue-600 cursor-pointer">
                                    {detailArticle.result.category?.name || 'Tin tức'}
                                </span>
                            </li>
                            <li><i className="fas fa-chevron-right text-xs"></i></li>
                            <li className="text-gray-800 truncate">{detailArticle.result.title}</li>
                        </ol>
                    </nav>

                    {/* Main Article Content - Full Width */}
                    <div className="w-full">
                        {/* Article Header */}
                        <header className="mb-8">
                            <div className="mb-4">
                                <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                                    {detailArticle.result.category?.name || 'Tin tức'}
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                {detailArticle.result.title}
                            </h1>
                            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {detailArticle.result.authors?.length > 0
                                                ? detailArticle.result.authors.join(', ')
                                                : 'Admin'
                                            }
                                        </p>
                                        <p className="text-sm text-gray-500">Phóng viên</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-6 text-sm text-gray-500">
                                    <span>
                                        <i className="far fa-calendar mr-1"></i>
                                        {detailArticle.result.publishDate ? (
                                            new Date(detailArticle.result.publishDate).toLocaleDateString('vi-VN', { timeZone: 'UTC' })
                                        ) : (
                                            'Đang tải...'
                                        )}
                                    </span>
                                    <span><i className="far fa-clock mr-1"></i>5 phút đọc</span>
                                    <span>
                                        <i className="far fa-eye mr-1"></i>
                                        {detailArticle.result.viewCount || 0} lượt xem
                                    </span>
                                </div>
                            </div>
                        </header>

                        {/* Featured Image */}
                        {detailArticle.result.featuredImage && (
                            <div className="mb-8">
                                <div className="h-96 rounded-lg overflow-hidden shadow-lg">
                                    <img
                                        src={detailArticle.result.featuredImage}
                                        alt={detailArticle.result.title}
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                                <p className="text-sm text-gray-500 mt-2 italic">
                                    {detailArticle.result.title}
                                </p>
                            </div>
                        )}

                        {/* Article Summary */}
                        {detailArticle.result.summary && (
                            <div className="mb-6">

                                <div className="text-xl text-gray-700 font-medium leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                                    <p className="text-sm text-gray-500 mb-1">Tóm tắt bài viết:</p>
                                    {detailArticle.result.summary}
                                </div>
                            </div>
                        )}


                        {/* Audio Player (if available) */}
                        {detailArticle.result.audioUrl && (
                            <div className="mt-8 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                                    <i className="fas fa-volume-up mr-2"></i>
                                    Nghe bài viết
                                </h3>
                                <audio controls className="w-full">
                                    <source src={detailArticle.result.audioUrl} type="audio/mpeg" />
                                    Trình duyệt của bạn không hỗ trợ audio player.
                                </audio>
                            </div>
                        )}

                        {/* Article Content */}
                        <article className="prose prose-lg max-w-none pt-5">
                            <div
                                className="article-content ckeditor-content"
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHtmlContent(detailArticle.result.content)
                                }}
                            />
                        </article>

                        {/* Tags */}
                        {detailArticle.result.tags && detailArticle.result.tags.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h3 className="text-lg font-semibold mb-3 text-gray-900">Thẻ:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {detailArticle.result.tags.map((tag) => (
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

                        {/* Social Share */}
                        <div className="border-t border-b border-gray-200 py-6 my-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-700 font-medium">Chia sẻ bài viết:</span>
                                    <div className="flex space-x-3">
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                                            <i className="fab fa-facebook-f mr-2"></i>Facebook
                                        </button>
                                        <button className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors cursor-pointer whitespace-nowrap">
                                            <i className="fab fa-twitter mr-2"></i>Twitter
                                        </button>
                                        <button className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors cursor-pointer whitespace-nowrap">
                                            <i className="fab fa-linkedin-in mr-2"></i>LinkedIn
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 cursor-pointer">
                                        <i className="far fa-heart"></i>
                                        <span>142</span>
                                    </button>
                                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 cursor-pointer">
                                        <i className="far fa-bookmark"></i>
                                        <span>Lưu</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <section className="mt-12">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Bình luận (12)</h3>
                            {/* Comment Form */}
                            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                <h4 className="font-semibold text-gray-900 mb-4">Để lại bình luận</h4>
                                <div className="space-y-4">
                                    <textarea
                                        rows={4}
                                        placeholder="Nội dung bình luận"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                    ></textarea>
                                    <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap">
                                        Gửi bình luận
                                    </button>
                                </div>
                            </div>
                            {/* Comments List */}
                            <div className="space-y-6">
                                {[1, 2, 3].map((comment) => (
                                    <div key={comment} className="border-b border-gray-200 pb-6">
                                        <div className="flex items-start space-x-4">
                                            <img
                                                src={`https://readdy.ai/api/search-image?query=professional%20person%20portrait%20avatar%20clean%20background%20modern%20style&width=60&height=60&seq=commenter${comment}&orientation=squarish`}
                                                alt={`Commenter ${comment}`}
                                                className="w-10 h-10 rounded-full object-cover object-top"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <h5 className="font-semibold text-gray-900">Người dùng {comment}</h5>
                                                    <span className="text-sm text-gray-500">2 giờ trước</span>
                                                </div>
                                                <p className="text-gray-800 mb-2">
                                                    Bài viết rất hay và bổ ích. Cảm ơn tác giả đã chia sẻ những thông tin quý giá về công nghệ và xu hướng phát triển.
                                                </p>
                                                <button className="text-sm text-green-600 hover:text-green-700 cursor-pointer">
                                                    Trả lời
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
            )}
        </>
    );
};

export default ArticlePage;