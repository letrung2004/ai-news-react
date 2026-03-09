// components/manager/StatusBadge.jsx
const STATUS_MAP = {
    PUBLISHED: { label: "Đã đăng",   cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    PENDING:   { label: "Chờ duyệt", cls: "bg-amber-50  text-amber-700  border-amber-200"  },
    DRAFT:     { label: "Nháp",      cls: "bg-gray-50   text-gray-500   border-gray-200"   },
};

export const STATUS_BARS = [
    { key: "PUBLISHED", label: "Đã đăng",   bar: "bg-emerald-500", text: "text-emerald-600" },
    { key: "PENDING",   label: "Chờ duyệt", bar: "bg-amber-400",   text: "text-amber-600"   },
    { key: "DRAFT",     label: "Nháp",      bar: "bg-gray-300",    text: "text-gray-400"    },
];

const StatusBadge = ({ status }) => {
    const { label, cls } = STATUS_MAP[status]
        ?? { label: status, cls: "bg-gray-100 text-gray-600 border-gray-200" };

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${cls}`}>
            {label}
        </span>
    );
};

export default StatusBadge;