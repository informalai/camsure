import React from 'react';
import { Zap, FileText, AlertCircle, BarChart3, Settings, Bell, User } from 'lucide-react';

const QuickActions = () => {
    const actions = [
        { icon: FileText, label: 'Generate Report', color: 'blue' },
        { icon: AlertCircle, label: 'View Alerts', color: 'red' },
        { icon: BarChart3, label: 'Analytics', color: 'green' },
        { icon: Settings, label: 'Settings', color: 'gray' },
        { icon: Bell, label: 'Notifications', color: 'yellow' },
        { icon: User, label: 'Team', color: 'purple' }
    ];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap size={20} className="text-yellow-500" />
                Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {actions.map((action, idx) => (
                    <button
                        key={idx}
                        className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-center group"
                    >
                        <action.icon size={24} className="mx-auto mb-2 text-gray-600 group-hover:text-gray-800" />
                        <div className="text-sm font-medium text-gray-700">{action.label}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickActions; 