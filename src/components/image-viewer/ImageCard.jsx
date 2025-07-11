import React, { useState, useEffect } from 'react';

const ImageCard = ({ image, onClick, getComplianceIcon, getComplianceBadgeClass, getComplianceType, getActiveDetections, getTotalDetections }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [actualImageUrl, setActualImageUrl] = useState(null);
    
    const annotations = image.annotations;
    const activeDetections = getActiveDetections(annotations);
    const totalDetections = getTotalDetections(annotations);
    const complianceType = getComplianceType(annotations.compliance_aspect);

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

    // Try different Google Drive URL formats
    const getImageUrls = (fileId) => {
        if (!fileId) return [];
        
        return [
            // Thumbnail format (best for previews)
            `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`,
            // View format (good for direct viewing)
            `https://drive.google.com/uc?export=view&id=${fileId}`,
            // Download format (backup)
            `https://drive.google.com/uc?export=download&id=${fileId}`,
            // Alternative thumbnail sizes
            `https://drive.google.com/thumbnail?id=${fileId}&sz=w300`,
            `https://drive.google.com/thumbnail?id=${fileId}&sz=w200`
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
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden" onClick={onClick}>
            <div className="h-48 flex flex-col items-center justify-center relative overflow-hidden" style={{ background: imageLoaded ? '#f8f9fa' : image.color }}>
                {image.drive_link ? (
                    <iframe src={`https://drive.google.com/file/d/${extractFileId(image.drive_link)}/preview`} width="100%" height="100%" allow="autoplay"></iframe>
                ) : (
                    <>
                        <div className="text-6xl mb-2">{getComplianceIcon(annotations.compliance_aspect)}</div>
                        <div className="text-white text-sm font-semibold uppercase tracking-wide">
                            {isLoading ? 'Loading Image...' : imageError ? 'Preview Unavailable' : 'Analysis Ready'}
                        </div>
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                            </div>
                        )}
                    </>
                )}
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold ${imageLoaded ? 'bg-black bg-opacity-70 text-white' : 'text-white'} ${!imageLoaded ? getComplianceBadgeClass(annotations.compliance_aspect) : ''}`}>
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