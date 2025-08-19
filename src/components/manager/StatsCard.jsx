import React from 'react';

const StatsCard = ({
    statsData
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => {
                const IconComponent = stat.icon;
                const isIncrease = stat.changeType === 'increase';

                return (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                            </div>
                            <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                <IconComponent className={`w-7 h-7 ${stat.iconColor}`} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default StatsCard;