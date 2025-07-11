import React from 'react';

const ImageCard = ({ image, onClick, getComplianceIcon, getComplianceBadgeClass, getComplianceType, getActiveDetections, getTotalDetections }) => {
    const annotations = image.annotations;
    const activeDetections = getActiveDetections(annotations);
    const totalDetections = getTotalDetections(annotations);
    const complianceType = getComplianceType(annotations.compliance_aspect);

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden" onClick={onClick}>
            <div className="h-48 flex flex-col items-center justify-center relative" style={{ background: image.color }}>
                <div className="text-6xl mb-2">{getComplianceIcon(annotations.compliance_aspect)}</div>
                <div className="text-white text-sm font-semibold uppercase tracking-wide">Analysis Ready</div>
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold text-white ${getComplianceBadgeClass(annotations.compliance_aspect)}`}>
                    {complianceType.toUpperCase()}
                </div>
            </div>
            <div className="p-4">
                <div className="font-semibold text-gray-900 text-sm mb-1 truncate">{image.image_name}</div>
                <div className="text-gray-600 text-xs mb-3">{annotations.compliance_aspect}</div>
                <div className="flex justify-between items-center text-xs">
                    <span className="text-green-600 font-medium">{activeDetections} active elements</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">{totalDetections} total</span>
                </div>
            </div>
        </div>
    );
};

export default ImageCard; 