import React from 'react';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

// Analytics View Component
const AnalyticsView = () => {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Compliance Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <BarChart3 size={20} className="text-blue-500" />
                        Compliance Distribution
                    </h3>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <BarChart3 size={48} className="text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500">Interactive Chart</p>
                        </div>
                    </div>
                </div>

                {/* Department Matrix */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <PieChart size={20} className="text-green-500" />
                        Department Performance
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {['Environmental', 'Safety', 'Operations', 'Legal'].map((dept, idx) => (
                            <div key={dept} className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-bold text-gray-900">{90 + idx * 2}%</div>
                                <div className="text-sm text-gray-600">{dept}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Trends */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp size={20} className="text-purple-500" />
                    Compliance Trends
                </h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <TrendingUp size={48} className="text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">6-Month Trend Analysis</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsView; 