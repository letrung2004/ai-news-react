// components/manager/StatusChart.jsx
import { STATUS_BARS } from "./StatusBadge";

const StatusChart = ({ articlesByStatus, total, loading }) => {
    if (loading) return (
        <div className="space-y-4">
            {[0, 1, 2].map(i => (
                <div key={i} className="space-y-1.5">
                    <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
                    <div className="h-1.5 bg-gray-100 rounded-full animate-pulse" />
                </div>
            ))}
        </div>
    );

    return (
        <div className="space-y-4">
            {STATUS_BARS.map(({ key, label, bar, text }) => {
                const count = articlesByStatus[key] ?? 0;
                const pct   = total > 0 ? Math.round((count / total) * 100) : 0;
                return (
                    <div key={key}>
                        <div className="flex justify-between items-center mb-1.5">
                            <span className="text-xs text-gray-500">{label}</span>
                            <div className="flex items-center gap-2">
                                <span className={`text-xs font-bold ${text}`}>{count}</span>
                                <span className="text-xs text-gray-300">{pct}%</span>
                            </div>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${bar} rounded-full transition-all duration-700`}
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                    </div>
                );
            })}

            {/* Stacked overview bar */}
            <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden flex gap-0.5">
                {STATUS_BARS.map(({ key, bar }) => {
                    const pct = total > 0
                        ? Math.round(((articlesByStatus[key] ?? 0) / total) * 100)
                        : 0;
                    return pct > 0
                        ? <div key={key} className={`h-full ${bar} transition-all duration-700`} style={{ width: `${pct}%` }} />
                        : null;
                })}
            </div>

            {/* Summary counts */}
            <div className="mt-5 pt-4 border-t border-gray-50 grid grid-cols-3 gap-2 text-center">
                {STATUS_BARS.map(({ key, label, text }) => (
                    <div key={key}>
                        <p className={`text-lg font-bold ${text}`}>{articlesByStatus[key] ?? 0}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatusChart;