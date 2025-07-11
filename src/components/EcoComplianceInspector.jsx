import React, { useState, useMemo } from 'react';
import { Filter, X, Search, Building2, AlertCircle } from 'lucide-react';
import imageData from './image-viewer/image-viewer-data.json';
import ImageCard from './image-viewer/ImageCard';
import MetadataPanel from './image-viewer/MetadataPanel';

const EcoComplianceInspector = () => {
    // State
    const [selectedImage, setSelectedImage] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState({ compliance: 'all', environment: 'all', infrastructure: 'all' });
    const [rightPanelExpanded, setRightPanelExpanded] = useState(false);

    // Helper functions
    const getComplianceType = (aspect) => {
        if (aspect.toLowerCase().includes('dust')) return 'dust';
        if (aspect.toLowerCase().includes('water') || aspect.toLowerCase().includes('stormwater')) return 'water';
        if (aspect.toLowerCase().includes('afforestation') || aspect.toLowerCase().includes('revegetation')) return 'afforestation';
        if (aspect.toLowerCase().includes('erosion')) return 'erosion';
        if (aspect.toLowerCase().includes('green')) return 'green';
        if (aspect.toLowerCase().includes('air')) return 'air';
        return 'other';
    };

    const getComplianceIcon = (aspect) => {
        if (aspect.toLowerCase().includes('dust')) return '💨';
        if (aspect.toLowerCase().includes('water') || aspect.toLowerCase().includes('stormwater')) return '💧';
        if (aspect.toLowerCase().includes('afforestation') || aspect.toLowerCase().includes('revegetation')) return '🌱';
        if (aspect.toLowerCase().includes('erosion')) return '🏔️';
        if (aspect.toLowerCase().includes('green')) return '🌳';
        if (aspect.toLowerCase().includes('air')) return '🌪️';
        if (aspect.toLowerCase().includes('mining')) return '⛏️';
        return '📊';
    };

    const getComplianceBadgeClass = (aspect) => {
        const type = getComplianceType(aspect);
        return `compliance-${type}`;
    };

    const calculateComplianceScore = (annotations) => {
        const positiveIndicators = [
            'Trees', 'Saplings', 'Grass', 'Water_sprayer', 'Water_mist',
            'Drainage', 'Fence', 'Boundaries'
        ];
        const negativeIndicators = ['Dust', 'Soil_Dump'];

        let score = 0;
        let total = 0;

        for (const [annotationKey, value] of Object.entries(annotations)) {
            if (typeof value === 'number') {
                total++;
                if (positiveIndicators.includes(annotationKey) && value > 0) {
                    score += Math.min(value, 10);
                } else if (negativeIndicators.includes(annotationKey) && value === 0) {
                    score += 5;
                }
            }
        }

        return Math.round((score / Math.max(total * 2, 1)) * 100);
    };

    const getActiveDetections = (annotations) => {
        return Object.entries(annotations)
            .filter(([annotationKey, value]) => typeof value === 'number' && value > 0)
            .length;
    };

    const getTotalDetections = (annotations) => {
        return Object.entries(annotations)
            .filter(([annotationKey, value]) => typeof value === 'number')
            .reduce((sum, [annotationKey, value]) => sum + value, 0);
    };

    // Filtered images based on search and filters
    const filteredImages = useMemo(() => {
        let result = imageData;

        // Apply search filter
        if (searchQuery) {
            result = result.filter(img =>
                img.image_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                img.annotations.compliance_aspect.toLowerCase().includes(searchQuery.toLowerCase()) ||
                img.annotations.justification.toLowerCase().includes(searchQuery.toLowerCase()) ||
                Object.keys(img.annotations).some(annotationKey =>
                    annotationKey.toLowerCase().includes(searchQuery.toLowerCase()) && img.annotations[annotationKey] > 0
                )
            );
        }

        // Apply category filters
        if (activeFilters.compliance !== 'all' || activeFilters.environment !== 'all' || activeFilters.infrastructure !== 'all') {
            result = result.filter(img => {
                const annotations = img.annotations;
                let passesFilters = true;

                // Compliance filters
                if (activeFilters.compliance !== 'all') {
                    switch (activeFilters.compliance) {
                        case 'dust':
                            passesFilters = passesFilters && annotations.compliance_aspect.toLowerCase().includes('dust');
                            break;
                        case 'water':
                            passesFilters = passesFilters && (annotations.compliance_aspect.toLowerCase().includes('water') ||
                                annotations.compliance_aspect.toLowerCase().includes('stormwater'));
                            break;
                        case 'afforestation':
                            passesFilters = passesFilters && (annotations.compliance_aspect.toLowerCase().includes('afforestation') ||
                                annotations.compliance_aspect.toLowerCase().includes('revegetation'));
                            break;
                        case 'erosion':
                            passesFilters = passesFilters && annotations.compliance_aspect.toLowerCase().includes('erosion');
                            break;
                    }
                }

                // Environment filters
                if (activeFilters.environment !== 'all') {
                    switch (activeFilters.environment) {
                        case 'humans':
                            passesFilters = passesFilters && annotations.Humans > 0;
                            break;
                        case 'machinery':
                            passesFilters = passesFilters && annotations.Machinery > 0;
                            break;
                        case 'vegetation':
                            passesFilters = passesFilters && (annotations.Trees > 0 || annotations.Saplings > 0 || annotations.Grass > 0);
                            break;
                        case 'water_features':
                            passesFilters = passesFilters && (annotations.River > 0 || annotations.Pond > 0 || annotations.Reservoir > 0 ||
                                annotations.Drainage > 0 || annotations.Wet_area > 0);
                            break;
                    }
                }

                // Infrastructure filters
                if (activeFilters.infrastructure !== 'all') {
                    switch (activeFilters.infrastructure) {
                        case 'roads':
                            passesFilters = passesFilters && annotations.Road > 0;
                            break;
                        case 'construction':
                            passesFilters = passesFilters && (annotations.Cemented_construction > 0 || annotations.Cemented_body > 0 ||
                                annotations.House_or_similar_structure > 0);
                            break;
                        case 'mining':
                            passesFilters = passesFilters && (annotations.Mines > 0 || annotations.Mine_pit > 0);
                            break;
                    }
                }

                return passesFilters;
            });
        }

        return result;
    }, [searchQuery, activeFilters]);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Main Content */}
            <div
                className={`flex-1 flex flex-col transition-all duration-300 ${rightPanelExpanded ? 'mr-80' : 'mr-16'}`}
            >
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">🌱</span>
                            </div>
                            <div>
                                <p className="text-lg font-bold text-gray-900">EcoCompliance Inspector</p>
                                <p className="text-sm text-gray-600">AI-Powered Image Analysis • Compliance Verification</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Search */}
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search images..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                            {/* Stats */}
                            <div className="text-right px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                                <div className="text-lg font-bold text-green-600">{filteredImages.length}</div>
                                <div className="text-xs text-green-700">of {imageData.length} images</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <div className="flex-1 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredImages.map((image, index) => (
                            <ImageCard
                                key={index}
                                image={image}
                                onClick={() => setSelectedImage(image)}
                                getComplianceIcon={getComplianceIcon}
                                getComplianceBadgeClass={getComplianceBadgeClass}
                                getComplianceType={getComplianceType}
                                getActiveDetections={getActiveDetections}
                                getTotalDetections={getTotalDetections}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Filter Panel (hoverable) */}
            <div
                className={`fixed right-0 top-0 h-full bg-white border-l border-gray-200 z-50 shadow-2xl transition-all duration-300 ${rightPanelExpanded ? 'w-80' : 'w-16'}`}
                onMouseEnter={() => setRightPanelExpanded(true)}
                onMouseLeave={() => setRightPanelExpanded(false)}
            >
                <div className="h-full flex flex-col">
                    {/* Header (always show icon, expand details on hover) */}
                    <div className="p-4 border-b bg-gradient-to-r from-green-50 to-emerald-50 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                            <Filter size={20} className="text-white" />
                        </div>
                        {rightPanelExpanded && (
                            <div>
                                <h3 className="font-bold text-gray-900">Smart Filters</h3>
                                <p className="text-sm text-gray-600">Refine your analysis</p>
                            </div>
                        )}
                    </div>
                    {/* Only show filter content if expanded */}
                    {rightPanelExpanded && (
                        <div className="flex-1 p-6 overflow-y-auto">
                            {/* Compliance Filters */}
                            <div className="mb-8">
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <AlertCircle size={16} className="text-green-500" />
                                    Compliance Type
                                </h4>
                                <div className="space-y-2">
                                    {[
                                        { value: 'all', label: 'All Types' },
                                        { value: 'dust', label: 'Dust Control' },
                                        { value: 'water', label: 'Water Management' },
                                        { value: 'afforestation', label: 'Afforestation' },
                                        { value: 'erosion', label: 'Erosion Control' }
                                    ].map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => setActiveFilters(prev => ({ ...prev, compliance: option.value }))}
                                            className={`w-full p-3 rounded-lg text-left transition-all ${activeFilters.compliance === option.value
                                                    ? 'bg-green-500 text-white shadow-lg'
                                                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Environment Filters */}
                            <div className="mb-8">
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <Building2 size={16} className="text-green-500" />
                                    Environment
                                </h4>
                                <div className="space-y-2">
                                    {[
                                        { value: 'all', label: 'All Elements' },
                                        { value: 'humans', label: 'Human Activity' },
                                        { value: 'machinery', label: 'Machinery' },
                                        { value: 'vegetation', label: 'Vegetation' },
                                        { value: 'water_features', label: 'Water Features' }
                                    ].map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => setActiveFilters(prev => ({ ...prev, environment: option.value }))}
                                            className={`w-full p-3 rounded-lg text-left transition-all ${activeFilters.environment === option.value
                                                    ? 'bg-green-500 text-white shadow-lg'
                                                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Infrastructure Filters */}
                            <div className="mb-8">
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <Building2 size={16} className="text-green-500" />
                                    Infrastructure
                                </h4>
                                <div className="space-y-2">
                                    {[
                                        { value: 'all', label: 'All Infrastructure' },
                                        { value: 'roads', label: 'Roads' },
                                        { value: 'construction', label: 'Construction' },
                                        { value: 'mining', label: 'Mining Areas' }
                                    ].map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => setActiveFilters(prev => ({ ...prev, infrastructure: option.value }))}
                                            className={`w-full p-3 rounded-lg text-left transition-all ${activeFilters.infrastructure === option.value
                                                    ? 'bg-green-500 text-white shadow-lg'
                                                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Image Detail Modal */}
            {selectedImage && (
                <MetadataPanel
                    image={selectedImage}
                    onClose={() => setSelectedImage(null)}
                    getComplianceIcon={getComplianceIcon}
                    calculateComplianceScore={calculateComplianceScore}
                    getTotalDetections={getTotalDetections}
                    getActiveDetections={getActiveDetections}
                />
            )}
        </div>
    );
};

export default EcoComplianceInspector;