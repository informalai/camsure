import React from 'react';

const DetectionGrid = ({ title, annotations, keys }) => (
    <div className="mb-6">
        <div className="text-sm font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">{title}</div>
        <div className="grid grid-cols-2 gap-2">
            {keys.map(detectionKey => {
                if (Object.prototype.hasOwnProperty.call(annotations, detectionKey)) {
                    const value = annotations[detectionKey];
                    return (
                        <div key={detectionKey} className={`flex justify-between items-center p-2 rounded text-xs ${value > 0 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                            }`}>
                            <span className="font-medium text-gray-700">{detectionKey.replace(/_/g, ' ')}</span>
                            <span className={`font-semibold ${value > 0 ? 'text-green-600' : 'text-gray-500'}`}>{value}</span>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    </div>
);

export default DetectionGrid; 