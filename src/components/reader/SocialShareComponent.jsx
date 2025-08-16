import React, { useState } from 'react';
import { Share2, Facebook, MessageCircle, Link, Check } from 'lucide-react';

const SocialShareComponent = (title, description) => {
    const [copied, setCopied] = useState(false);

    // Thông tin bài báo để chia sẻ
    const articleData = {
        title: "Tiêu đề bài báo của bạn",
        url: window.location.href,
        description: "Mô tả ngắn gọn về bài báo..."
    };


    const shareToFacebook = () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleData.url)}&t=${encodeURIComponent(articleData.title)}`;
        window.open(facebookUrl, '_blank', 'width=600,height=400');
    };

    // Hàm chia sẻ Zalo (Web)
    const shareToZalo = () => {
        const zaloUrl = `https://zalo.me/share/article?url=${encodeURIComponent(articleData.url)}&title=${encodeURIComponent(articleData.title)}`;
        window.open(zaloUrl, '_blank', 'width=600,height=400');
    };

    // Hàm copy link
    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(articleData.url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            const textArea = document.createElement('textarea');
            textArea.value = articleData.url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">

            <div className="border-t border-b border-gray-200 py-6 my-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <span className="text-gray-700 font-medium flex items-center">
                            <Share2 className="mr-2 h-5 w-5" />
                            Chia sẻ bài báo:
                        </span>
                        <div className="flex flex-wrap gap-3">

                            <button
                                onClick={shareToFacebook}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap flex items-center"
                            >
                                <Facebook className="mr-2 h-4 w-4" />
                                Facebook
                            </button>

                            {/* Zalo Share */}
                            <button
                                onClick={shareToZalo}
                                className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors cursor-pointer whitespace-nowrap flex items-center"
                            >
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Zalo
                            </button>

                            {/* Copy Link */}
                            <button
                                onClick={copyLink}
                                className={`px-4 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center ${copied
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-600 text-white hover:bg-gray-700'
                                    }`}
                            >
                                {copied ? (
                                    <>
                                        <Check className="mr-2 h-4 w-4" />
                                        Đã sao chép!
                                    </>
                                ) : (
                                    <>
                                        <Link className="mr-2 h-4 w-4" />
                                        Sao chép link
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default SocialShareComponent;