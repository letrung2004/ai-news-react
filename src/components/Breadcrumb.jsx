import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ category, title }) => {
    return (
        <nav className="py-4 mb-6 border-b border-gray-100">
            <ol className="flex items-center gap-1 flex-wrap">
                <li>
                    <Link
                        to="/"
                        className="text-xs font-medium text-gray-400 hover:text-green-600 transition-colors"
                    >
                        Trang chủ
                    </Link>
                </li>

                <li className="text-gray-300 text-xs select-none">›</li>

                {category && (
                    <>
                        <li>
                            <Link
                                to={`/category/${category.slug}`}
                                className="text-xs font-medium text-gray-400 hover:text-green-600 transition-colors"
                            >
                                {category.name}
                            </Link>
                        </li>
                        <li className="text-gray-300 text-xs select-none">›</li>
                    </>
                )}

                <li className="text-xs text-gray-600 truncate max-w-xs" title={title}>
                    {title}
                </li>
            </ol>
        </nav>
    );
};

export default Breadcrumb;