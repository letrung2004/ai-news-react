import React, { useState } from 'react';

const ListArticle = () => {
    const [email, setEmail] = useState('');

    const articles = [
        {
            id: 1,
            title: "Robot lorem ipsum dolor sit amet consectetur",
            author: "John Alvarado",
            date: "Feb 18",
            excerpt: "Duis eu felis id tortor congue consequat. Sed vitae vestibulum enim, et pharetra magna",
            image: "https://readdy.ai/api/search-image?query=modern%20office%20building%20with%20glass%20facade%20business%20district%20cityscape%20professional%20corporate%20architecture%20clean%20blue%20sky%20background&width=800&height=400&seq=articlefeat1&orientation=landscape",
            category: "Technology"
        },
        {
            id: 2,
            title: "Health lorem ipsum dolor sit amet consectetur",
            author: "Sarah Johnson",
            date: "Feb 17",
            excerpt: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas",
            image: "https://readdy.ai/api/search-image?query=young%20woman%20smiling%20healthy%20lifestyle%20natural%20portrait%20wellness%20clean%20background%20professional%20photography&width=400&height=300&seq=health1&orientation=landscape",
            category: "Health"
        },
        {
            id: 3,
            title: "Business strategies for modern entrepreneurs",
            author: "Michael Chen",
            date: "Feb 16",
            excerpt: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae",
            image: "https://readdy.ai/api/search-image?query=business%20meeting%20modern%20office%20professional%20team%20collaboration%20corporate%20environment%20clean%20background&width=400&height=300&seq=business1&orientation=landscape",
            category: "Business"
        },
        {
            id: 4,
            title: "Travel destinations you must visit this year",
            author: "Emma Wilson",
            date: "Feb 15",
            excerpt: "Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet non curabitur gravida",
            image: "https://readdy.ai/api/search-image?query=beautiful%20mountain%20landscape%20travel%20destination%20scenic%20view%20nature%20photography%20clean%20background&width=400&height=300&seq=travel1&orientation=landscape",
            category: "Travel"
        },
        {
            id: 5,
            title: "Food trends that are shaping culinary world",
            author: "David Rodriguez",
            date: "Feb 14",
            excerpt: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam",
            image: "https://readdy.ai/api/search-image?query=gourmet%20food%20plating%20culinary%20art%20fine%20dining%20professional%20food%20photography%20clean%20background&width=400&height=300&seq=food1&orientation=landscape",
            category: "Food"
        }
    ];

    const popularArticles = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "Sed do eiusmod tempor incididunt ut labore",
        "Ut enim ad minim veniam quis nostrud",
        "Duis aute irure dolor in reprehenderit",
        "Excepteur sint occaecat cupidatat non proident"
    ];

    const handleEmailSubmit = () => {
        if (email.trim()) {
            console.log('Email subscription:', email);
            setEmail('');
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Breadcrumb */}
                <nav className="mb-6">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500">
                        <li>
                            <button className="hover:text-green-600 cursor-pointer">
                                Trang chủ
                            </button>
                        </li>
                        <li><i className="fas fa-chevron-right text-xs"></i></li>
                        <li className="text-gray-800">Danh sách bài viết</li>
                    </ol>
                </nav>
                <div className="grid grid-cols-12 gap-8">
                    {/* Main Content */}
                    <div className="col-span-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-8">Danh sách bài viết</h1>

                        <div className="space-y-8">
                            {articles.map((article) => (
                                <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="flex">
                                        <div className="w-80 h-48 flex-shrink-0 mt-5 pl-3">
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 p-6">
                                            <div className="flex flex-col h-full">
                                                <div className="flex-1">
                                                    <div className="mb-2">
                                                        <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                                                            {article.category}
                                                        </span>
                                                    </div>
                                                    <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 cursor-pointer">
                                                        {article.title}
                                                    </h2>
                                                    <div className="flex items-center text-sm text-gray-500 mb-3">
                                                        <span>bởi {article.author}</span>
                                                        <span className="mx-2">•</span>
                                                        <span>{article.date}</span>
                                                    </div>
                                                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                                                        {article.excerpt}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <button className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center">
                                                        Đọc thêm
                                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12 flex justify-center">
                            <nav className="flex items-center space-x-2">
                                <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">
                                    Trước
                                </button>
                                <button className="px-3 py-2 text-sm bg-green-600 text-white rounded">
                                    1
                                </button>
                                <button className="px-3 py-2 text-sm text-gray-700 hover:text-green-600">
                                    2
                                </button>
                                <button className="px-3 py-2 text-sm text-gray-700 hover:text-green-600">
                                    3
                                </button>
                                <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">
                                    Sau
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="col-span-4">
                        <div className="space-y-8">
                            {/* Search */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Tìm kiếm</h3>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm bài viết..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                    <button className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Subscribe */}
                            <div className="bg-green-500 rounded-lg shadow-md p-6 text-white">
                                <h3 className="text-lg font-bold mb-2">Đăng ký nhận tin</h3>
                                <p className="text-sm mb-4 text-green-100">
                                    Nhận thông tin mới nhất được gửi đến email của bạn mỗi tháng vài lần.
                                </p>
                                <div className="space-y-3">
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-2 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                                        />
                                        <button
                                            onClick={handleEmailSubmit}
                                            className="absolute right-1 top-1 bottom-1 px-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Most Popular */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Phổ biến nhất</h3>
                                <div className="space-y-4">
                                    {popularArticles.map((title, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <span className="flex-shrink-0 w-6 h-6 bg-gray-400 text-white text-xs rounded flex items-center justify-center font-bold">
                                                {index + 1}
                                            </span>
                                            <p className="text-sm text-gray-600 hover:text-green-600 cursor-pointer leading-relaxed">
                                                {title}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Danh mục</h3>
                                <div className="space-y-2">
                                    {['Công nghệ', 'Sức khỏe', 'Kinh doanh', 'Du lịch', 'Ẩm thực', 'Phong cách sống'].map((category) => (
                                        <div key={category} className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600 hover:text-green-600 cursor-pointer">
                                                {category}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                ({Math.floor(Math.random() * 20) + 5})
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListArticle;