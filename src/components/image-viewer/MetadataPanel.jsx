import React, { useState, useEffect } from 'react';
import { X, MapPin, User, FileText, Building } from 'lucide-react';
import DetectionGrid from './DetectionGrid';

const MetadataPanel = ({ image, onClose, getComplianceIcon, calculateComplianceScore, getTotalDetections, getActiveDetections }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [actualImageUrl, setActualImageUrl] = useState(null);
    
    if (!image) return null;

    const annotations = image.annotations;
    const totalDetections = getTotalDetections(annotations);
    const activeElements = getActiveDetections(annotations);
    const complianceScore = calculateComplianceScore(annotations);

    // Extract file ID from Google Drive link
    const extractFileId = (driveLink) => {
        if (!driveLink) return null;
        
        // Handle different Google Drive link formats
        let fileId = null;
        
        // Format 1: /file/d/{fileId}/view
        let match = driveLink.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (match) {
            fileId = match[1];
        }
        
        // Format 2: id= parameter
        if (!fileId) {
            match = driveLink.match(/[?&]id=([a-zA-Z0-9_-]+)/);
            if (match) {
                fileId = match[1];
            }
        }
        
        // Format 3: direct drive.google.com/open?id=
        if (!fileId) {
            match = driveLink.match(/open\?id=([a-zA-Z0-9_-]+)/);
            if (match) {
                fileId = match[1];
            }
        }
        
        return fileId;
    };

    // Try different Google Drive URL formats for larger images
    const getImageUrls = (fileId) => {
        if (!fileId) return [];
        
        return [
            // High quality thumbnail for enlarged view
            `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`,
            `https://drive.google.com/thumbnail?id=${fileId}&sz=w600`,
            // View format (good for direct viewing)
            `https://drive.google.com/uc?export=view&id=${fileId}`,
            // Download format (backup)
            `https://drive.google.com/uc?export=download&id=${fileId}`,
            // Alternative thumbnail sizes
            `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`,
            `https://drive.google.com/thumbnail?id=${fileId}&sz=w300`
        ];
    };

    // Try loading image from multiple URLs
    const tryLoadImage = (urls, index = 0) => {
        if (index >= urls.length) {
            setImageError(true);
            setImageLoaded(false);
            setIsLoading(false);
            return;
        }

        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
            setActualImageUrl(urls[index]);
            setImageLoaded(true);
            setImageError(false);
            setIsLoading(false);
        };
        
        img.onerror = () => {
            // Try the next URL
            setTimeout(() => tryLoadImage(urls, index + 1), 100);
        };
        
        img.src = urls[index];
    };

    useEffect(() => {
        if (image.drive_link) {
            setIsLoading(true);
            setImageError(false);
            setImageLoaded(false);
            
            const fileId = extractFileId(image.drive_link);
            if (fileId) {
                const urls = getImageUrls(fileId);
                tryLoadImage(urls);
            } else {
                setIsLoading(false);
                setImageError(true);
            }
        }
    }, [image.drive_link]);

    const handleImageError = () => {
        setImageError(true);
        setImageLoaded(false);
        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex z-50">
            <button className="absolute top-4 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800" onClick={onClose}>
                <span style={{ color: 'black' }}>X</span>
            </button>
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full h-full flex flex-col items-center justify-center rounded-lg overflow-hidden relative shadow-2xl" style={{ background: imageLoaded ? '#f8f9fa' : image.color }}>
                    {image.drive_link ? (
                        <iframe src={`https://drive.google.com/file/d/${extractFileId(image.drive_link)}/preview`} width="100%" height="100%" allow="autoplay"></iframe>
                    ) : (
                        <>
                            <div className="text-8xl mb-4">{getComplianceIcon(annotations.compliance_aspect)}</div>
                            <div className="text-white text-lg font-semibold uppercase tracking-wide">
                                {isLoading ? 'Loading Image...' : imageError ? 'Preview Unavailable' : 'Enlarged View'}
                            </div>
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-lg">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                                </div>
                            )}
                        </>
                    )}
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

                {/* Location and Submission Info */}
                <div className="mb-6">
                    <div className="text-sm font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">Location & Submission Details</div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                            <MapPin size={16} className="text-blue-600 flex-shrink-0" />
                            <div>
                                <div className="font-medium text-gray-900">{image.location}</div>
                                <div className="text-xs text-gray-600">{image.latlon}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                            <User size={16} className="text-purple-600 flex-shrink-0" />
                            <div>
                                <div className="font-medium text-gray-900">Submitted by {image.submitted_by}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lease and Document Information */}
                <div className="mb-6">
                    <div className="text-sm font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">Lease & Document Information</div>
                    <div className="space-y-2">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-600 flex items-center gap-2">
                                <Building size={14} />
                                Lease Name
                            </span>
                            <span className="text-gray-800 font-medium">{image["Lease Name"]}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-600">Area</span>
                            <span className="text-gray-800">{image.Area} hectares</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-600 flex items-center gap-2">
                                <FileText size={14} />
                                Document
                            </span>
                            <span className="text-gray-800 font-medium">{image["Document Name"]}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-600">Condition Type</span>
                            <span className="text-gray-800">{image.condition_type}</span>
                        </div>
                    </div>
                </div>

                {/* Compliance Condition */}
                <div className="mb-6">
                    <div className="text-sm font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">Compliance Condition</div>
                    <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                        <div className="text-sm text-amber-800 font-medium">{image.shortened_condition_text}</div>
                    </div>
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
                            <span className="font-medium text-gray-600">Google Drive</span>
                            <a 
                                href={image.drive_link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-xs underline"
                            >
                                View Original
                            </a>
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