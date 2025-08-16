import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ category, title }) => {
    return (
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
                        {category?.name || 'Tin tức'}
                    </span>
                </li>
                <li><i className="fas fa-chevron-right text-xs"></i></li>
                <li className="text-gray-800 truncate">{title}</li>
            </ol>
        </nav>
    );
};

export default Breadcrumb;