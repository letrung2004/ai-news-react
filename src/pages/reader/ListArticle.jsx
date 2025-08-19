import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListCategories from '../../components/reader/ListCategories';
import PopularArticles from '../../components/reader/PopularArticles';
import usePublicArticles from '../../hooks/usePublicArticles';
import SimpleLoading from '../../components/SimpleLoading';
import Breadcrumb from '../../components/Breadcrumb';
import { Error } from '../../components/Error';
import ListArticleByCategory from '../../components/reader/ListArticleByCategory';
import Pagination from '../../components/Pagination';

const ListArticle = () => {
    const { categorySlug } = useParams();
    const { articles, loading, error, loadArticlesByCategory } = usePublicArticles(categorySlug);

    useEffect(() => {
        if (categorySlug) {
            loadArticlesByCategory(categorySlug);
        }
    }, [categorySlug]);

    if (error) return <Error message={error} onRetry={() => window.location.reload()} />;

    return (
        <>
            {loading ? (
                <SimpleLoading />
            ) : (
                <div className="bg-gray-50 min-h-screen">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <Breadcrumb />

                        <div className="grid grid-cols-12 gap-8">
                            {/* Main Content */}
                            <div className="col-span-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-8">Danh sách bài viết</h1>

                                <ListArticleByCategory articles={articles} />

                                <Pagination
                                    currentPage={1}
                                    totalPages={5}
                                    onPageChange={(page) => console.log("Chuyển sang trang:", page)}
                                />

                            </div>

                            {/* Sidebar */}
                            <div className="col-span-4">
                                <div className="space-y-8">
                                    {/* Popular Articles Component */}
                                    <PopularArticles title="Tin phổ biến" limit={5} />

                                    {/* Categories Component */}
                                    <ListCategories />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ListArticle;