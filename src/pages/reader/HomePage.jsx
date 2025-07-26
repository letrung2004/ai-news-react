import React, { useState } from 'react';

const HomePage = () => {
    return (
        <>
            {/* Breaking News Ticker */}
            <div className="bg-red-600 text-white py-2">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center">
                        <span className="font-bold mr-4">Tin mới:</span>
                        <span className="text-sm">Bộ Nội vụ đề xuất tăng lương tối thiểu vùng 7,2% từ 1/1/2026</span>
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-12 gap-6">
                    {/* Featured Article */}
                    <div className="col-span-7">
                        <div
                            className="relative h-104 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                            onClick={() => setCurrentView('article')}
                        >
                            <img
                                src="https://readdy.ai/api/search-image?query=elderly%20man%20with%20white%20beard%20wearing%20cowboy%20hat%20and%20sunglasses%20against%20blue%20sky%20background%20professional%20portrait%20photography%20style%20modern%20clean%20aesthetic&width=800&height=600&seq=featured1&orientation=landscape"
                                alt="Featured Article"
                                className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <span className="inline-block bg-blue-600 text-xs px-2 py-1 rounded mb-3">Business</span>
                                <h2 className="text-2xl font-bold mb-2">Microsoft quisque at ipsum vel orci eleifend ultrices</h2>
                                <div className="flex items-center text-sm text-gray-300">
                                    <span>Jack Sims</span>
                                    <span className="mx-2">•</span>
                                    <span>Feb 16</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Side Articles */}
                    <div className="col-span-5 space-y-4">
                        {/* Article 1 */}
                        <div className="relative h-32 rounded-lg overflow-hidden shadow-lg cursor-pointer">
                            <img
                                src="https://readdy.ai/api/search-image?query=golden%20bridge%20with%20fireworks%20celebration%20night%20scene%20city%20lights%20reflection%20modern%20architecture%20festive%20atmosphere%20clean%20background&width=400&height=200&seq=side1&orientation=landscape"
                                alt="Side Article 1"
                                className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                            <div className="absolute inset-0 p-4 text-white flex flex-col justify-end">
                                <span className="inline-block bg-purple-600 text-xs px-2 py-1 rounded mb-2 w-fit">Culture</span>
                                <h3 className="text-sm font-bold">London ipsum dolor sit amet, consectetur adipiscing elit</h3>
                            </div>
                        </div>
                        {/* Article 2 */}
                        <div className="relative h-32 rounded-lg overflow-hidden shadow-lg cursor-pointer">
                            <img
                                src="https://readdy.ai/api/search-image?query=young%20woman%20wearing%20colorful%20cap%20smiling%20outdoor%20lifestyle%20portrait%20natural%20lighting%20vibrant%20colors%20clean%20simple%20background&width=400&height=200&seq=side2&orientation=landscape"
                                alt="Side Article 2"
                                className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                            <div className="absolute inset-0 p-4 text-white flex flex-col justify-end">
                                <span className="inline-block bg-green-600 text-xs px-2 py-1 rounded mb-2 w-fit">Life Style</span>
                                <h3 className="text-sm font-bold">Pellentesque dui nibh, pellentesque ut dapibus ut</h3>
                            </div>
                        </div>
                        {/* Article 3 */}
                        <div className="relative h-32 rounded-lg overflow-hidden shadow-lg cursor-pointer">
                            <img
                                src="https://readdy.ai/api/search-image?query=motorcycle%20racing%20scene%20dynamic%20action%20sports%20photography%20professional%20rider%20on%20track%20speed%20motion%20blur%20clean%20background&width=400&height=200&seq=side3&orientation=landscape"
                                alt="Side Article 3"
                                className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                            <div className="absolute inset-0 p-4 text-white flex flex-col justify-end">
                                <span className="inline-block bg-orange-600 text-xs px-2 py-1 rounded mb-2 w-fit">Sport</span>
                                <h3 className="text-sm font-bold">Motobike vestibulum venenatis purus nec nibh volutpat</h3>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Latest News Section */}
                <section className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Tin Mới Nhất</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <article key={item} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={`https://readdy.ai/api/search-image?query=news%20article%20image%20modern%20clean%20professional%20photography%20journalism%20style%20simple%20background%20high%20quality&width=400&height=300&seq=news${item}&orientation=landscape`}
                                        alt={`News ${item}`}
                                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4">
                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">Tin tức</span>
                                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">
                                        Tiêu đề bài viết tin tức số {item} với nội dung thú vị và hấp dẫn
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                                        Mô tả ngắn gọn về nội dung bài viết, giúp người đọc hiểu được thông tin chính...
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span>Tác giả {item}</span>
                                        <span>2 giờ trước</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
};
export default HomePage;