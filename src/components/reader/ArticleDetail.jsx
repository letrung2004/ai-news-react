import React from "react";
import { sanitizeHtmlContent } from "../../utils/helpers";
import SocialShareComponent from "./SocialShareComponent";

// CSS tối thiểu — chỉ những thứ Tailwind không hỗ trợ:
// 1. Drop cap (::first-letter pseudo)
// 2. article-content styles cho HTML từ CKEditor (dangerouslySetInnerHTML)
// 3. audio accent-color
// 4. ::before pseudo cho end-rule
const PROSE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Source+Serif+4:ital,wght@0,400;1,400&display=swap');

  .article-drop-cap p:first-child::first-letter {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 3.6em;
    font-weight: 700;
    float: left;
    line-height: 0.8;
    margin: 0.06em 0.12em 0 0;
    color: #16a34a;
  }
  .article-drop-cap p { margin-bottom: 1.4em; font-family: 'Source Serif 4', Georgia, serif; font-size: 1.0625rem; line-height: 1.85; color: #1f2937; }
  .article-drop-cap h2 { font-family: 'Playfair Display', serif; font-size: 1.45rem; font-weight: 700; color: #111827; margin: 2em 0 0.5em; line-height: 1.3; }
  .article-drop-cap h3 { font-size: 1.1rem; font-weight: 600; color: #111827; margin: 1.6em 0 0.4em; }
  .article-drop-cap strong { font-weight: 600; color: #111827; }
  .article-drop-cap a { color: #16a34a; text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }
  .article-drop-cap a:hover { color: #15803d; }
  .article-drop-cap figure { margin: 2em -4px; }
  .article-drop-cap figure img { width: 100%; border-radius: 4px; display: block; }
  .article-drop-cap figcaption { font-size: 0.76rem; color: #9ca3af; text-align: center; margin-top: 6px; font-style: italic; }
  .article-drop-cap blockquote { border-left: 3px solid #16a34a; padding: 4px 20px; margin: 1.5em 0; font-style: italic; color: #4b5563; background: #f9fafb; }
  audio { width: 100%; accent-color: #16a34a; }
  .end-rule { display:flex; align-items:center; gap:12px; margin: 2.5rem 0; }
  .end-rule::before, .end-rule::after { content:''; flex:1; height:1px; background:#e5e7eb; }
`;

const ArticleDetail = ({ article }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('vi-VN', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            timeZone: 'UTC'
        });
    };

    return (
        <div className="col-span-8 pr-8">
            <style>{PROSE_STYLES}</style>

            {/* Title */}
            <h1
                className="text-4xl font-bold leading-tight tracking-tight text-gray-900 mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.85rem, 3vw, 2.7rem)' }}
            >
                {article.title}
            </h1>

            {/* Meta row */}
            <div className="flex items-center gap-4 py-3 border-t border-b border-gray-200 mb-6">
                <span className="text-sm font-medium text-gray-900">
                    {article.authors?.length > 0 ? article.authors.join(', ') : 'Biên tập viên'}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                <span className="text-xs text-gray-400">{formatDate(article.publishDate)}</span>
                {article.viewCount > 0 && (
                    <>
                        <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                        <span className="text-xs text-gray-400">
                            {article.viewCount.toLocaleString('vi-VN')} lượt xem
                        </span>
                    </>
                )}
            </div>

            {/* Summary */}
            {article.summary && (
                <div
                    className="mb-7 px-6 py-5 bg-gray-50 border-l-4 border-green-500 rounded-r-lg text-gray-700 leading-relaxed italic"
                    style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1.1rem' }}
                >
                    {article.summary}
                </div>
            )}

            {/* Hero image */}
            {article.featuredImage && (
                <div className="mb-7 overflow-hidden rounded bg-gray-100">
                    <img
                        src={article.featuredImage}
                        alt={article.title}
                        className="w-full object-cover object-top"
                        style={{ height: '440px' }}
                    />
                    <p className="text-xs text-gray-400 italic text-center mt-2 pb-1">
                        {article.title}
                    </p>
                </div>
            )}

            {/* Audio */}
            {article.audioUrl && (
                <div className="mb-8 px-5 py-4 rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-green-100">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-medium text-green-600 tracking-wide uppercase">
                            Nghe bài báo
                        </span>
                    </div>
                    <audio controls>
                        <source src={article.audioUrl} type="audio/mpeg" />
                    </audio>
                </div>
            )}

            {/* Article content */}
            <div
                className="article-drop-cap"
                dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent(article.content) }}
            />

            {/* End rule */}
            <div className="end-rule">
                <span className="text-gray-300 tracking-widest" style={{ fontFamily: "'Playfair Display', serif" }}>
                    ✦ ✦ ✦
                </span>
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
                <div className="mb-8">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Thẻ</p>
                    <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                            <span
                                key={tag.id}
                                className="text-xs font-medium text-gray-600 bg-gray-100 border border-gray-200 px-3 py-1 rounded-sm cursor-pointer hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-colors"
                            >
                                #{tag.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <SocialShareComponent title={article.title} description={article.summary} />
        </div>
    );
};

export default ArticleDetail;