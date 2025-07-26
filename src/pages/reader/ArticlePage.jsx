import React, { useState } from "react";

const ArticlePage = () => {

    return (
        <main className="max-w-7xl mx-auto px-6 py-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
                <ol className="flex items-center space-x-2 text-sm text-gray-500">
                    <li>
                        <button
                            onClick={() => setCurrentView('home')}
                            className="hover:text-green-600 cursor-pointer"
                        >
                            Trang chủ
                        </button>
                    </li>
                    <li><i className="fas fa-chevron-right text-xs"></i></li>
                    <li>
                        <button className="hover:text-green-600 cursor-pointer">Kinh doanh</button>
                    </li>
                    <li><i className="fas fa-chevron-right text-xs"></i></li>
                    <li className="text-gray-800">Chi tiết bài báo</li>
                </ol>
            </nav>

            <div className="grid grid-cols-12 gap-8">
                {/* Main Article Content */}
                <div className="col-span-8">
                    {/* Article Header */}
                    <header className="mb-8">
                        <div className="mb-4">
                            <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full">Kinh doanh</span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                            Microsoft quisque at ipsum vel orci eleifend ultrices trong thời đại công nghệ số
                        </h1>
                        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                            <div className="flex items-center space-x-4">
                                <img
                                    src="https://readdy.ai/api/search-image?query=professional%20journalist%20portrait%20smiling%20man%20in%20suit%20office%20background%20modern%20clean%20photography%20style&width=60&height=60&seq=author1&orientation=squarish"
                                    alt="Author"
                                    className="w-12 h-12 rounded-full object-cover object-top"
                                />
                                <div>
                                    <p className="font-semibold text-gray-900">Jack Sims</p>
                                    <p className="text-sm text-gray-500">Phóng viên kinh tế</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                                <span><i className="far fa-calendar mr-1"></i>26/07/2025</span>
                                <span><i className="far fa-clock mr-1"></i>5 phút đọc</span>
                                <span><i className="far fa-eye mr-1"></i>1,234 lượt xem</span>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    <div className="mb-8">
                        <div className="h-96 rounded-lg overflow-hidden shadow-lg">
                            <img
                                src="https://readdy.ai/api/search-image?query=modern%20office%20building%20with%20glass%20facade%20business%20district%20cityscape%20professional%20corporate%20architecture%20clean%20blue%20sky%20background&width=800&height=400&seq=articlefeat1&orientation=landscape"
                                alt="Article Featured"
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-2 italic">Trụ sở chính của Microsoft tại Seattle, Mỹ</p>
                    </div>

                    {/* Article Content */}
                    <article className="prose prose-lg max-w-none">
                        <p className="text-xl text-gray-700 mb-6 font-medium leading-relaxed">
                            Trong bối cảnh công nghệ phát triển mạnh mẽ, Microsoft đang dẫn đầu cuộc cách mạng số với những sáng kiến đột phá và chiến lược kinh doanh táo bạo.
                        </p>
                        <p className="mb-6 text-gray-800 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Những thành tựu đáng chú ý</h2>
                        <p className="mb-6 text-gray-800 leading-relaxed">
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                        </p>
                        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-800">
                            <li>Tăng trưởng doanh thu 15% so với cùng kỳ năm trước</li>
                            <li>Ra mắt 5 sản phẩm công nghệ mới trong quý này</li>
                            <li>Mở rộng thị trường sang 12 quốc gia mới</li>
                            <li>Đầu tư 2 tỷ USD cho nghiên cứu và phát triển</li>
                        </ul>
                        <div className="my-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                            <p className="text-gray-800 italic">
                                "Chúng tôi tin rằng công nghệ không chỉ là công cụ, mà còn là cầu nối kết nối con người và tạo ra những giá trị bền vững cho xã hội."
                            </p>
                            <cite className="text-sm text-gray-600 mt-2 block">- Satya Nadella, CEO Microsoft</cite>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Triển vọng tương lai</h2>
                        <p className="mb-6 text-gray-800 leading-relaxed">
                            Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                        </p>
                        <div className="my-8">
                            <img
                                src="https://readdy.ai/api/search-image?query=futuristic%20technology%20innovation%20artificial%20intelligence%20digital%20transformation%20modern%20workspace%20clean%20professional%20lighting&width=600&height=300&seq=articlemid1&orientation=landscape"
                                alt="Technology Innovation"
                                className="w-full h-64 object-cover object-top rounded-lg shadow-md"
                            />
                            <p className="text-sm text-gray-500 mt-2 italic">Công nghệ AI đang thay đổi cách chúng ta làm việc</p>
                        </div>
                        <p className="mb-6 text-gray-800 leading-relaxed">
                            Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                        </p>
                    </article>

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
                                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Họ và tên"
                                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                    />
                                </div> */}
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

                {/* Sidebar */}
                <div className="col-span-4">
                    <div className="space-y-8">
                        {/* Author Info */}
                        {/* <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Tác giả</h3>
                            <div className="flex items-center space-x-4 mb-4">
                                <img
                                    src="https://readdy.ai/api/search-image?query=professional%20journalist%20portrait%20smiling%20man%20in%20suit%20office%20background%20modern%20clean%20photography%20style&width=80&height=80&seq=authorlarge&orientation=squarish"
                                    alt="Author"
                                    className="w-16 h-16 rounded-full object-cover object-top"
                                />
                                <div>
                                    <p className="font-semibold text-gray-900">Jack Sims</p>
                                    <p className="text-sm text-gray-500">Phóng viên kinh tế</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                                Phóng viên kinh tế với hơn 10 năm kinh nghiệm trong lĩnh vực công nghệ và kinh doanh.
                            </p>
                            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                                Xem thêm bài viết →
                            </button>
                        </div> */}

                        {/* Related Articles */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Bài viết liên quan</h3>
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <div key={item} className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                                        <img
                                            src={`https://readdy.ai/api/search-image?query=business%20technology%20news%20article%20modern%20office%20corporate%20environment%20professional%20clean%20background&width=80&height=60&seq=sidebar${item}&orientation=landscape`}
                                            alt={`Related ${item}`}
                                            className="w-16 h-12 object-cover object-top rounded flex-shrink-0"
                                        />
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-green-600">
                                                Tiêu đề bài viết liên quan số {item}
                                            </h4>
                                            <p className="text-xs text-gray-500 mt-1">2 ngày trước</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Popular Tags */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Thẻ phổ biến</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Microsoft', 'Công nghệ', 'AI', 'Kinh doanh', 'Đầu tư', 'Startup', 'Digital'].map((tag) => (
                                    <span key={tag} className="inline-block bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 text-xs px-3 py-1 rounded-full cursor-pointer transition-colors">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter */}
                        {/* <div className="bg-green-500 rounded-lg shadow-md p-6 text-white">
                            <h3 className="text-lg font-bold mb-2">Đăng ký nhận tin</h3>
                            <p className="text-sm mb-4 text-green-100">
                                Nhận thông tin mới nhất được gửi đến email của bạn mỗi tuần.
                            </p>
                            <div className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="Email của bạn"
                                    className="w-full px-4 py-2 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                                />
                                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors">
                                    Đăng ký
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Related Articles Full Width */}
            <section className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Có thể bạn quan tâm</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((item) => (
                        <article key={item} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="h-40 overflow-hidden">
                                <img
                                    src={`https://readdy.ai/api/search-image?query=business%20technology%20news%20article%20modern%20office%20corporate%20environment%20professional%20clean%20background&width=400&height=200&seq=fullwidth${item}&orientation=landscape`}
                                    alt={`Related ${item}`}
                                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4">
                                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-2">Kinh doanh</span>
                                <h4 className="font-bold text-gray-800 mb-2 line-clamp-2">
                                    Tiêu đề bài viết liên quan số {item} với nội dung thú vị
                                </h4>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>Tác giả {item}</span>
                                    <span>1 ngày trước</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );

};

export default ArticlePage;