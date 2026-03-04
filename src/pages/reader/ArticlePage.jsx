import React from "react";
import { useParams, Link } from "react-router-dom";
import usePublicArticles from "../../hooks/usePublicArticles";
import SimpleLoading from "../../components/SimpleLoading";
import PopularArticles from "../../components/reader/PopularArticles";
import ListCategories from "../../components/reader/ListCategories";
import Breadcrumb from "../../components/Breadcrumb";
import ArticleDetail from "../../components/reader/ArticleDetail";
import RelatedArticles from "../../components/reader/RelatedArticles";
import CommentSection from "../../components/reader/CommentSection";
import { Error } from "../../components/Error";
import Chatbot from "../../components/reader/Chatbot";
import useComment from "../../hooks/useComment";
import useAlert from "../../hooks/useAlert";
import Alert from "../../components/Alert";

const ReadingProgressBar = () => {
    const [progress, setProgress] = React.useState(0);
    React.useEffect(() => {
        const onScroll = () => {
            const el = document.documentElement;
            const total = el.scrollHeight - el.clientHeight;
            setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return (
        <div
            className="fixed top-0 left-0 h-0.5 z-50 transition-all duration-100"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #16a34a, #4ade80)' }}
        />
    );
};

const ArticlePage = () => {
    const { articleSlug } = useParams();
    const { detailArticle, loading, error, loadDetailArticles, comments } = usePublicArticles();
    const { handleCreateComment } = useComment();
    const { alert, showSuccess, showError, hideAlert } = useAlert();

    React.useEffect(() => {
        if (articleSlug) {
            loadDetailArticles(articleSlug);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [articleSlug]);

    if (error) return <Error message={error} onRetry={() => window.location.reload()} />;

    const article = detailArticle?.result;

    return (
        <>
            <ReadingProgressBar />

            <div className="min-h-screen bg-white">
                {loading ? (
                    <SimpleLoading />
                ) : !article ? (
                    <div className="max-w-6xl mx-auto px-6 pb-16">
                        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                            <span className="text-5xl mb-4 opacity-20">📰</span>
                            <p className="text-gray-400 mb-5">Không tìm thấy bài viết.</p>
                            <Link
                                to="/"
                                className="text-sm font-medium text-green-600 border border-green-200 px-5 py-2 rounded-sm hover:bg-green-50 transition-colors"
                            >
                                ← Về trang chủ
                            </Link>
                        </div>
                    </div>
                ) : (
                    <main className="max-w-6xl mx-auto px-6 pb-16">
                        <Breadcrumb
                            category={article.category}
                            title={article.title}
                        />

                        <div className="grid grid-cols-12">
                            {/* Main article + related + comments */}
                            <div className="col-span-8 pr-8">
                                <ArticleDetail article={article} />

                                {/* Related articles — sau content, trước comment */}
                                <RelatedArticles
                                    currentArticleId={article.id}
                                    categorySlug={article.category?.slug}
                                    categoryName={article.category?.name}
                                />

                                {/* Comments */}
                                <div className="mt-10">
                                    <CommentSection
                                        articleId={article.id}
                                        comments={comments}
                                        onSubmitComment={handleCreateComment}
                                        showSuccess={showSuccess}
                                        showError={showError}
                                    />
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="col-span-4 border-l border-gray-100 pl-8">
                                <div className="sticky top-24 space-y-8">
                                    <PopularArticles limit={5} />
                                    <ListCategories />
                                </div>
                            </div>
                        </div>
                    </main>
                )}
            </div>

            <Chatbot articleId={article?.id} />
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