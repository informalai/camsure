import React from 'react';
import { X } from 'lucide-react';
import DetectionGrid from './DetectionGrid';

const MetadataPanel = ({ image, onClose, getComplianceIcon, calculateComplianceScore, getTotalDetections, getActiveDetections }) => {
    if (!image) return null;

    const annotations = image.annotations;
    const totalDetections = getTotalDetections(annotations);
    const activeElements = getActiveDetections(annotations);
    const complianceScore = calculateComplianceScore(annotations);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex z-50">
            <button className="absolute top-4 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800" onClick={onClose}>
                <span style={{ color: 'black' }}>X</span>
            </button>
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-96 h-96 flex flex-col items-center justify-center rounded-lg" style={{ background: image.color }}>
                    <div className="text-8xl mb-4">{getComplianceIcon(annotations.compliance_aspect)}</div>
                    <div className="text-white text-lg font-semibold uppercase tracking-wide">Enlarged View</div>
                </div>
            </div>
            <div className="w-96 bg-white overflow-y-auto p-6">
                <div className="font-bold text-lg text-gray-900 mb-4 border-b border-gray-200 pb-3">{image.image_name}</div>

                <div className="flex items-center gap-3 mb-4 p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                    <div className="font-semibold">{annotations.compliance_aspect}</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6 border-l-4 border-green-500">
                    <div className="text-sm text-gray-700 leading-relaxed">{annotations.justification}</div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">{totalDetections}</div>
                        <div className="text-xs text-gray-600 uppercase">Total Detections</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">{activeElements}</div>
                        <div className="text-xs text-gray-600 uppercase">Active Elements</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">{complianceScore}%</div>
                        <div className="text-xs text-gray-600 uppercase">Compliance Score</div>
                    </div>
                </div>

                <DetectionGrid
                    title="Environmental Detections"
                    annotations={annotations}
                    keys={['Trees', 'Saplings', 'Grass', 'Wet_area', 'Dry_area', 'Dust', 'Fog', 'River', 'Drainage', 'Pond', 'Reservoir', 'Water_mist', 'Water_sprayer']}
                />

                <DetectionGrid
                    title="Infrastructure & Objects"
                    annotations={annotations}
                    keys={['Road', 'Bunds', 'Electrical_poles', 'Fence', 'Vehicles', 'Machinery', 'Humans', 'Cemented_construction', 'Cemented_body', 'Soil_Dump', 'Mines', 'Mine_pit', 'Solar_panels', 'Rock_dump', 'Boundaries', 'House_or_similar_structure']}
                />

                <div className="mb-6">
                    <div className="text-sm font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">Technical Metadata</div>
                    <div className="space-y-2">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-600">File Name</span>
                            <span className="font-mono text-xs text-gray-800">{image.image_name}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-600">Analysis Date</span>
                            <span className="font-mono text-xs text-gray-800">{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="font-medium text-gray-600">Model Version</span>
                            <span className="font-mono text-xs text-gray-800">v2.1.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MetadataPanel; 