import React, { useState, useMemo } from 'react';
import { Filter, X, Search, Building2, AlertCircle } from 'lucide-react';

const EcoComplianceInspector = () => {
  // Sample data
  const sampleImages = [
    {
      "image_name": "WhatsApp Image 2025-06-24 at 13.15.41.jpeg",
      "annotations": {
        "Trees": 0, "Saplings": 0, "Grass": 0, "Wet_area": 1, "Dry_area": 1, "Dust": 1, "Fog": 0, "River": 0, "Drainage": 0, "Pond": 0, "Reservoir": 0, "Road": 0, "Bunds": 0, "Electrical_poles": 0, "Fence": 0, "Vehicles": 0, "Machinery": 1, "Humans": 0, "Cemented_construction": 1, "Cemented_body": 0, "Soil_Dump": 0, "Water_mist": 1, "Water_sprayer": 1, "Mines": 0, "Mine_pit": 0, "Solar_panels": 0, "Rock_dump": 0, "Boundaries": 0, "House_or_similar_structure": 0,
        "compliance_aspect": "Dust Suppression",
        "justification": "The image clearly shows a fixed water sprayer system in operation, generating a fine mist to control airborne dust. This is a critical environmental compliance measure, particularly in material handling and transport areas within a mine or industrial site, to maintain air quality standards. The visible wetness on the structure below confirms the system's operation."
      },
      color: "linear-gradient(45deg, #ff6b35, #ffa500)"
    },
    {
      "image_name": "WhatsApp Image 2025-06-24 at 13.14.35 (1).jpg",
      "annotations": {
        "Trees": 0, "Saplings": 25, "Grass": 0, "Wet_area": 0, "Dry_area": 1, "Dust": 0, "Fog": 0, "River": 0, "Drainage": 1, "Pond": 0, "Reservoir": 0, "Road": 0, "Bunds": 1, "Electrical_poles": 0, "Fence": 0, "Vehicles": 0, "Machinery": 0, "Humans": 3, "Cemented_construction": 0, "Cemented_body": 0, "Soil_Dump": 1, "Water_mist": 0, "Water_sprayer": 0, "Mines": 1, "Mine_pit": 1, "Solar_panels": 0, "Rock_dump": 0, "Boundaries": 0, "House_or_similar_structure": 0,
        "compliance_aspect": "Afforestation and Mine Land Reclamation",
        "justification": "This image documents a vital compliance activity: the reclamation of mined-out areas. Numerous saplings have been planted across a graded slope, which is likely a stabilized soil or overburden dump. The presence of personnel inspecting the site suggests active management and monitoring of this afforestation project, a common condition in Environmental Clearances to ensure ecological restoration."
      },
      color: "linear-gradient(45deg, #2ecc71, #27ae60)"
    },
    {
      "image_name": "WhatsApp Image 2025-06-11 at 17.15.19.jpg",
      "annotations": {
        "Trees": 0, "Saplings": 0, "Grass": 1, "Wet_area": 1, "Dry_area": 1, "Dust": 0, "Fog": 0, "River": 0, "Drainage": 1, "Pond": 0, "Reservoir": 0, "Road": 0, "Bunds": 0, "Electrical_poles": 0, "Fence": 0, "Vehicles": 0, "Machinery": 0, "Humans": 0, "Cemented_construction": 0, "Cemented_body": 0, "Soil_Dump": 1, "Water_mist": 0, "Water_sprayer": 0, "Mines": 0, "Mine_pit": 0, "Solar_panels": 0, "Rock_dump": 0, "Boundaries": 0, "House_or_similar_structure": 0,
        "compliance_aspect": "Erosion Control and Stormwater Management",
        "justification": "A garland drain has been excavated along the toe of a dump or excavated slope. This is a mandatory feature for soil conservation and erosion control. It intercepts surface water runoff, preventing the formation of gullies and the washing away of soil, thereby demonstrating compliance with conditions related to dump management and land stability."
      },
      color: "linear-gradient(45deg, #f39c12, #e67e22)"
    },
    {
      "image_name": "PXL_20210701_081416725.jpg",
      "annotations": {
        "Trees": 20, "Saplings": 5, "Grass": 1, "Wet_area": 0, "Dry_area": 1, "Dust": 0, "Fog": 0, "River": 0, "Drainage": 0, "Pond": 0, "Reservoir": 0, "Road": 1, "Bunds": 0, "Electrical_poles": 1, "Fence": 1, "Vehicles": 0, "Machinery": 0, "Humans": 0, "Cemented_construction": 1, "Cemented_body": 1, "Soil_Dump": 0, "Water_mist": 0, "Water_sprayer": 0, "Mines": 1, "Mine_pit": 0, "Solar_panels": 0, "Rock_dump": 0, "Boundaries": 1, "House_or_similar_structure": 1,
        "compliance_aspect": "Green Belt Development and Site Demarcation",
        "justification": "The image shows the entrance to a mine, with a sign indicating 'RAW ORE'. The area is fenced, marking the lease boundary. The presence of numerous mature trees and other vegetation along the road and boundary is evidence of green belt development. Green belts are required to act as a buffer zone, mitigate air and noise pollution, and improve the aesthetics of the area."
      },
      color: "linear-gradient(45deg, #27ae60, #2ecc71)"
    },
    {
      "image_name": "WhatsApp Image 2022-09-12 at 1.01.08 PM (1).jpeg",
      "annotations": {
        "Trees": 5, "Saplings": 0, "Grass": 0, "Wet_area": 0, "Dry_area": 1, "Dust": 0, "Fog": 0, "River": 0, "Drainage": 0, "Pond": 0, "Reservoir": 0, "Road": 0, "Bunds": 0, "Electrical_poles": 0, "Fence": 0, "Vehicles": 0, "Machinery": 0, "Humans": 0, "Cemented_construction": 1, "Cemented_body": 0, "Soil_Dump": 0, "Water_mist": 0, "Water_sprayer": 0, "Mines": 1, "Mine_pit": 0, "Solar_panels": 0, "Rock_dump": 0, "Boundaries": 0, "House_or_similar_structure": 1,
        "compliance_aspect": "Water Conservation",
        "justification": "The signboard provides clear, quantifiable evidence of compliance with water conservation norms. It details the implementation of a 'Rooftop Rainwater Harvesting System' with a specified potential of 480 KL/Annum at the Gua Ore Mines. This directly addresses the conditions often found in environmental clearances that mandate rainwater harvesting to reduce reliance on fresh water sources."
      },
      color: "linear-gradient(45deg, #4ecdc4, #44a08d)"
    },
    {
      "image_name": "3587826b-4a7c-46e7-a6f0-aaed2abebbaa.jpg",
      "annotations": {
        "Trees": 1, "Saplings": 0, "Grass": 0, "Wet_area": 0, "Dry_area": 1, "Dust": 1, "Fog": 0, "River": 0, "Drainage": 0, "Pond": 0, "Reservoir": 0, "Road": 0, "Bunds": 0, "Electrical_poles": 0, "Fence": 0, "Vehicles": 0, "Machinery": 1, "Humans": 1, "Cemented_construction": 0, "Cemented_body": 0, "Soil_Dump": 0, "Water_mist": 0, "Water_sprayer": 0, "Mines": 1, "Mine_pit": 1, "Solar_panels": 0, "Rock_dump": 0, "Boundaries": 0, "House_or_similar_structure": 0,
        "compliance_aspect": "Air Pollution Control during Drilling",
        "justification": "The image captures a drilling operation in a mine pit. The machinery is equipped with a dust collection system, visible as the conical structure at the base of the drill rod. This is a critical engineering control to capture dust at the source, thereby preventing fugitive emissions and ensuring compliance with air quality standards stipulated for mining operations."
      },
      color: "linear-gradient(45deg, #9b59b6, #8e44ad)"
    },
    {
      "image_name": "7eaf91de-6a0d-45a2-9f5c-f7da364c3be1.jpg",
      "annotations": {
        "Trees": 15, "Saplings": 0, "Grass": 0, "Wet_area": 1, "Dry_area": 1, "Dust": 1, "Fog": 0, "River": 0, "Drainage": 0, "Pond": 0, "Reservoir": 0, "Road": 1, "Bunds": 1, "Electrical_poles": 1, "Fence": 0, "Vehicles": 1, "Machinery": 0, "Humans": 0, "Cemented_construction": 0, "Cemented_body": 0, "Soil_Dump": 1, "Water_mist": 1, "Water_sprayer": 1, "Mines": 1, "Mine_pit": 0, "Solar_panels": 0, "Rock_dump": 1, "Boundaries": 0, "House_or_similar_structure": 1,
        "compliance_aspect": "Dust Suppression on Haul Roads",
        "justification": "This image shows a network of fixed sprinklers spraying water over a large area, including haul roads and adjacent dumps. This method of dust suppression is essential for controlling particulate matter generated by the movement of heavy vehicles and wind action. The scale of the operation indicates a systematic approach to air pollution control, which is a key compliance requirement."
      },
      color: "linear-gradient(45deg, #ff6b35, #f39c12)"
    },
    {
      "image_name": "WhatsApp Image 2025-06-24 at 13.14.37 (2).jpg",
      "annotations": {
        "Trees": 1, "Saplings": 20, "Grass": 0, "Wet_area": 0, "Dry_area": 1, "Dust": 0, "Fog": 0, "River": 0, "Drainage": 1, "Pond": 0, "Reservoir": 0, "Road": 0, "Bunds": 0, "Electrical_poles": 0, "Fence": 0, "Vehicles": 0, "Machinery": 0, "Humans": 0, "Cemented_construction": 0, "Cemented_body": 0, "Soil_Dump": 1, "Water_mist": 0, "Water_sprayer": 0, "Mines": 1, "Mine_pit": 1, "Solar_panels": 0, "Rock_dump": 0, "Boundaries": 0, "House_or_similar_structure": 0,
        "compliance_aspect": "Mine Dump Revegetation",
        "justification": "This is another view of the afforestation efforts on a mined-out area or dump. The planted saplings are arranged in rows on the arid, rocky soil. A small drainage channel is also visible, which aids in water retention and erosion control for the new plantation. This demonstrates ongoing compliance with land reclamation and ecological restoration mandates."
      },
      color: "linear-gradient(45deg, #2ecc71, #16a085)"
    },
    {
      "image_name": "WhatsApp Image 2025-06-11 at 17.15.54.jpg",
      "annotations": {
        "Trees": 10, "Saplings": 2, "Grass": 1, "Wet_area": 0, "Dry_area": 1, "Dust": 0, "Fog": 0, "River": 0, "Drainage": 1, "Pond": 0, "Reservoir": 0, "Road": 1, "Bunds": 0, "Electrical_poles": 0, "Fence": 0, "Vehicles": 0, "Machinery": 0, "Humans": 0, "Cemented_construction": 0, "Cemented_body": 0, "Soil_Dump": 0, "Water_mist": 0, "Water_sprayer": 0, "Mines": 0, "Mine_pit": 0, "Solar_panels": 0, "Rock_dump": 0, "Boundaries": 0, "House_or_similar_structure": 0,
        "compliance_aspect": "Stormwater Management",
        "justification": "The image displays a roadside drain in a vegetated area. The drain is designed to channel stormwater runoff from the road surface, preventing erosion and waterlogging. Effective stormwater management is a common condition in environmental permits to protect water quality and maintain the integrity of infrastructure like roads."
      },
      color: "linear-gradient(45deg, #3498db, #2980b9)"
    }
  ];

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
    let result = sampleImages;

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
          switch(activeFilters.compliance) {
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
          switch(activeFilters.environment) {
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
          switch(activeFilters.infrastructure) {
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

  // Components
  const ImageCard = ({ image, onClick }) => {
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

  const DetectionGrid = ({ title, annotations, keys }) => (
    <div className="mb-6">
      <div className="text-sm font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">{title}</div>
      <div className="grid grid-cols-2 gap-2">
        {keys.map(detectionKey => {
          if (Object.prototype.hasOwnProperty.call(annotations, detectionKey)) {
            const value = annotations[detectionKey];
            return (
              <div key={detectionKey} className={`flex justify-between items-center p-2 rounded text-xs ${
                value > 0 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
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

  const MetadataPanel = ({ image, onClose }) => {
    if (!image) return null;

    const annotations = image.annotations;
    const totalDetections = getTotalDetections(annotations);
    const activeElements = getActiveDetections(annotations);
    const complianceScore = calculateComplianceScore(annotations);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex z-50">
        <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800" onClick={onClose}>
          <X size={20} />
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
                <div className="text-xs text-green-700">of {sampleImages.length} images</div>
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
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        activeFilters.compliance === option.value
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
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        activeFilters.environment === option.value
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
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        activeFilters.infrastructure === option.value
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
        />
      )}
    </div>
  );
};

export default EcoComplianceInspector;