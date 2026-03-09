// components/manager/QuickActions.jsx
import { Link } from "react-router-dom";
import { FileEdit, MessageSquare, Users, Tag, ArrowRight } from "lucide-react";

const ACTIONS = [
    { label: "Thêm bài viết",      desc: "Tạo nội dung mới",   to: "/admin/articles/create", icon: FileEdit,      color: "border-green-200  bg-green-50  hover:bg-green-100",  ic: "text-green-600"  },
    { label: "Quản lý bình luận",  desc: "Duyệt & kiểm duyệt", to: "/admin/comments",        icon: MessageSquare, color: "border-violet-200 bg-violet-50 hover:bg-violet-100", ic: "text-violet-600" },
    { label: "Quản lý người dùng", desc: "Xem & chỉnh sửa",    to: "/admin/users",           icon: Users,         color: "border-blue-200   bg-blue-50   hover:bg-blue-100",   ic: "text-blue-600"   },
    { label: "Quản lý danh mục",   desc: "Thêm & sắp xếp",     to: "/admin/categories",      icon: Tag,           color: "border-orange-200 bg-orange-50 hover:bg-orange-100", ic: "text-orange-600" },
];

const QuickActions = () => (
    <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Thao tác nhanh</h3>
        <div className="grid grid-cols-2 gap-3">
            {ACTIONS.map(({ label, desc, to, icon: Icon, color, ic }) => (
                <Link
                    key={label}
                    to={to}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-colors ${color}`}
                >
                    <Icon className={`w-5 h-5 ${ic} flex-shrink-0`} />
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{label}</p>
                        <p className="text-xs text-gray-500 truncate">{desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 ml-auto flex-shrink-0" />
                </Link>
            ))}
        </div>
    </div>
);

export default QuickActions;