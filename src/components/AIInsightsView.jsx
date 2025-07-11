import React from 'react';
import { Brain, AlertCircle, FileText } from 'lucide-react';

const AIInsightsView = ({ mines }) => {
    const predictions = [
        {
            type: 'risk',
            title: 'High Risk Prediction',
            description: 'Gua East Mine likely to face EC renewal issues',
            probability: 78,
            timeframe: '30 days',
            action: 'Schedule pre-compliance audit'
        },
        {
            type: 'opportunity',
            title: 'Excellence Opportunity',
            description: 'Gua West Mine trending toward excellent status',
            probability: 85,
            timeframe: '45 days',
            action: 'Accelerate best practices'
        },
        {
            type: 'timeline',
            title: 'Deadline Optimization',
            description: 'FC renewals can be batched for efficiency',
            probability: 92,
            timeframe: '60 days',
            action: 'Coordinate renewal schedules'
        }
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* AI Predictions */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Brain size={20} className="text-purple-500" />
                        AI Predictions
                    </h3>
                    <div className="space-y-4">
                        {predictions.map((prediction, idx) => (
                            <div key={idx} className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-gray-900">{prediction.title}</h4>
                                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                                        {prediction.probability}%
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">{prediction.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">{prediction.timeframe}</span>
                                    <button className="text-xs bg-purple-500 text-white px-3 py-1 rounded-full hover:bg-purple-600 transition-colors">
                                        {prediction.action}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Risk Heatmap */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <AlertCircle size={20} className="text-red-500" />
                        Risk Assessment
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                        {mines.map((mine) => (
                            <div
                                key={mine.id}
                                className={`p-3 rounded-lg text-center ${mine.complianceScore >= 95 ? 'bg-green-100 text-green-800' :
                                    mine.complianceScore >= 85 ? 'bg-blue-100 text-blue-800' :
                                        mine.complianceScore >= 75 ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                    }`}
                            >
                                <div className="font-bold">{mine.complianceScore}%</div>
                                <div className="text-xs">{mine.name.split(' ')[0]}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Document Timeline */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText size={20} className="text-blue-500" />
                    Document Status Timeline
                </h3>
                <div className="space-y-3">
                    {mines.slice(0, 5).map((mine) => (
                        <div key={mine.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <div className="font-medium text-gray-900">{mine.name}</div>
                                <div className="text-sm text-gray-600">EC Renewal Due</div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">30 days</div>
                                <div className="text-xs text-gray-500">March 15, 2025</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AIInsightsView; 