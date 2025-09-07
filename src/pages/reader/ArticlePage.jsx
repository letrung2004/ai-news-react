import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import usePublicArticles from "../../hooks/usePublicArticles";
import SimpleLoading from "../../components/SimpleLoading";
import PopularArticles from "../../components/reader/PopularArticles";
import ListCategories from "../../components/reader/ListCategories";
import Breadcrumb from "../../components/Breadcrumb";
import ArticleDetail from "../../components/reader/ArticleDetail";
import CommentSection from "../../components/reader/CommentSection";
import { Error } from "../../components/Error";
import Chatbot from "../../components/reader/Chatbot";
import useComment from "../../hooks/useComment";
import useAlert from "../../hooks/useAlert";
import Alert from "../../components/Alert";

const ArticlePage = () => {
    const { articleSlug } = useParams();
    const { detailArticle, loading, error, loadDetailArticles, comments } = usePublicArticles();
    const { handleCreateComment } = useComment();
    const { alert, showSuccess, showError, hideAlert } = useAlert();




    useEffect(() => {
        if (articleSlug) {
            loadDetailArticles(articleSlug);
        }
    }, [articleSlug]);

    if (error) return <Error message={error} onRetry={() => window.location.reload()} />;

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
                    <Breadcrumb
                        category={detailArticle.result.category}
                        title={detailArticle.result.title}
                    />

                    <div className="grid grid-cols-12 gap-8">
                        <ArticleDetail article={detailArticle.result} />

                        {/* Sidebar */}
                        <div className="col-span-4">
                            <div className="space-y-8">
                                <PopularArticles title="Bài viết phổ biến" limit={5} />
                                <ListCategories />
                            </div>
                        </div>
                    </div>


                    <div className="grid grid-cols-12 gap-8 mt-8">
                        <div className="col-span-8">
                            <CommentSection
                                articleId={detailArticle.result.id}
                                comments={comments}
                                onSubmitComment={handleCreateComment}
                                showSuccess={showSuccess}
                                showError={showError}
                            />
                        </div>
                    </div>
                </main>
            )}
            <Chatbot articleId={detailArticle?.result.id} />
            <Alert
                type={alert.type}
                title={alert.title}
                message={alert.message}
                isVisible={alert.isVisible}
                onClose={hideAlert}
                autoClose={true}
                duration={3000}
            />
        </>
    );
};

export default ArticlePage;