// StatsCard.jsx
import React from 'react';

/**
 * StatsCard — grid 4 cột, icon lớn hơn, hover lift effect tinh tế hơn.
 */
const StatsCard = ({ statsData }) => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
                <div
                    key={index}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5
                               hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                                {stat.title}
                            </p>
                            <p className="text-3xl font-bold text-gray-900 leading-none">
                                {stat.value}
                            </p>
                        </div>
                        <div
                            className={`w-11 h-11 ${stat.bgColor} rounded-xl flex items-center justify-center
                                        group-hover:scale-110 transition-transform duration-200 flex-shrink-0`}
                        >
                            <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
);

export default StatsCard;