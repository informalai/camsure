import React, { useState, useMemo } from 'react';

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
    
    for (const [key, value] of Object.entries(annotations)) {
      if (typeof value === 'number') {
        total++;
        if (positiveIndicators.includes(key) && value > 0) {
          score += Math.min(value, 10);
        } else if (negativeIndicators.includes(key) && value === 0) {
          score += 5;
        }
      }
    }
    
    return Math.round((score / Math.max(total * 2, 1)) * 100);
  };

  const getActiveDetections = (annotations) => {
    return Object.entries(annotations)
      .filter(([key, value]) => typeof value === 'number' && value > 0)
      .length;
  };

  const getTotalDetections = (annotations) => {
    return Object.entries(annotations)
      .filter(([key, value]) => typeof value === 'number')
      .reduce((sum, [key, value]) => sum + value, 0);
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
        Object.keys(img.annotations).some(key => 
          key.toLowerCase().includes(searchQuery.toLowerCase()) && img.annotations[key] > 0
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
  const FilterSection = ({ title, category, options }) => (
    <div className="filter-section">
      <span className="filter-label">{title}</span>
      {options.map(option => (
        <button
          key={option.value}
          className={`filter-btn ${activeFilters[category] === option.value ? 'active' : ''}`}
          onClick={() => setActiveFilters(prev => ({ ...prev, [category]: option.value }))}
        >
          {option.label}
        </button>
      ))}
    </div>
  );

  const ImageCard = ({ image, onClick }) => {
    const annotations = image.annotations;
    const activeDetections = getActiveDetections(annotations);
    const totalDetections = getTotalDetections(annotations);
    const complianceType = getComplianceType(annotations.compliance_aspect);

    return (
      <div className="image-card" onClick={onClick}>
        <div className="image-placeholder" style={{ background: image.color }}>
          <div className="image-icon">{getComplianceIcon(annotations.compliance_aspect)}</div>
          <div className="image-type-label">Analysis Ready</div>
          <div className={`compliance-badge ${getComplianceBadgeClass(annotations.compliance_aspect)}`}>
            {complianceType.toUpperCase()}
          </div>
        </div>
        <div className="image-info">
          <div className="image-title">{image.image_name}</div>
          <div className="image-meta">{annotations.compliance_aspect}</div>
          <div className="compliance-summary">
            <div className="compliance-text">{activeDetections} active elements</div>
            <div className="detection-count">{totalDetections} total</div>
          </div>
        </div>
      </div>
    );
  };

  const DetectionGrid = ({ title, annotations, keys }) => (
    <div className="metadata-section">
      <div className="metadata-section-title">{title}</div>
      <div className="detections-grid">
        {keys.map(key => {
          if (annotations.hasOwnProperty(key)) {
            const value = annotations[key];
            return (
              <div key={key} className={`detection-item ${value > 0 ? 'active' : ''}`}>
                <span className="detection-label">{key.replace(/_/g, ' ')}</span>
                <span className="detection-value">{value}</span>
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
      <div className="split-view active">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="split-left">
          <div className="enlarged-image" style={{ 
            background: image.color,
            width: '400px',
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.9)',
            borderRadius: '8px',
            boxShadow: '0 10px 50px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{ fontSize: '80px', marginBottom: '15px' }}>
              {getComplianceIcon(annotations.compliance_aspect)}
            </div>
            <div style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '2px' }}>
              Enlarged View
            </div>
          </div>
        </div>
        <div className="split-right">
          <div className="metadata-panel">
            <div className="metadata-header">{image.image_name}</div>
            
            <div className="compliance-header">
              <div className={`compliance-icon compliance-${getComplianceType(annotations.compliance_aspect)}`}>
                ✓
              </div>
              <div className="compliance-title">{annotations.compliance_aspect}</div>
            </div>

            <div className="justification-box">
              <div className="justification-text">{annotations.justification}</div>
            </div>

            <div className="summary-stats">
              <div className="stat-box">
                <div className="stat-number">{totalDetections}</div>
                <div className="stat-label">Total Detections</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{activeElements}</div>
                <div className="stat-label">Active Elements</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{complianceScore}%</div>
                <div className="stat-label">Compliance Score</div>
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

            <div className="metadata-section">
              <div className="metadata-section-title">Technical Metadata</div>
              <div style={{ display: 'grid', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <span style={{ fontWeight: '500', color: '#666' }}>File Name</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '11px' }}>{image.image_name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <span style={{ fontWeight: '500', color: '#666' }}>Analysis Date</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '11px' }}>{new Date().toLocaleDateString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <span style={{ fontWeight: '500', color: '#666' }}>Model Version</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '11px' }}>v2.1.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #2c5530 0%, #1a3d1f 100%);
          min-height: 100vh;
        }

        .app-container {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          min-height: 100vh;
        }

        .header {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          padding: 20px;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .logo {
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #2c5530, #1a3d1f);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .search-container {
          flex: 1;
          max-width: 600px;
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 12px 20px 12px 50px;
          border: 2px solid #e0e0e0;
          border-radius: 25px;
          font-size: 16px;
          outline: none;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.9);
        }

        .search-input:focus {
          border-color: #2c5530;
          box-shadow: 0 0 0 3px rgba(44, 85, 48, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
        }

        .filters {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .filter-section {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-right: 20px;
        }

        .filter-label {
          font-size: 12px;
          color: #666;
          font-weight: 600;
          text-transform: uppercase;
        }

        .filter-btn {
          padding: 6px 12px;
          border: 1px solid #e0e0e0;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.9);
          color: #666;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 12px;
          font-weight: 500;
        }

        .filter-btn:hover, .filter-btn.active {
          border-color: #2c5530;
          background: #2c5530;
          color: white;
          transform: translateY(-1px);
        }

        .main-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 30px 20px;
          transition: all 0.3s ease;
        }

        .gallery-container {
          transition: all 0.3s ease;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .image-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
        }

        .image-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .image-placeholder {
          width: 100%;
          height: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.9);
          font-size: 48px;
          position: relative;
          overflow: hidden;
        }

        .image-icon {
          font-size: 64px;
          margin-bottom: 10px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .image-type-label {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        .compliance-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
        }

        .compliance-dust { background: #ff6b35; }
        .compliance-water { background: #4ecdc4; }
        .compliance-afforestation { background: #2ecc71; }
        .compliance-erosion { background: #f39c12; }
        .compliance-green { background: #27ae60; }
        .compliance-air { background: #9b59b6; }
        .compliance-stormwater { background: #3498db; }
        .compliance-other { background: #95a5a6; }

        .image-info {
          padding: 15px;
        }

        .image-title {
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
          font-size: 14px;
        }

        .image-meta {
          color: #666;
          font-size: 11px;
          margin-bottom: 8px;
        }

        .compliance-summary {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
        }

        .compliance-text {
          font-size: 11px;
          color: #2c5530;
          font-weight: 500;
        }

        .detection-count {
          background: #f8f9fa;
          padding: 2px 6px;
          border-radius: 8px;
          font-size: 10px;
          color: #666;
        }

        .split-view {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.95);
          z-index: 1000;
          display: flex;
          animation: fadeIn 0.3s ease;
        }

        .split-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .split-right {
          width: 450px;
          background: white;
          overflow-y: auto;
          border-left: 1px solid #e0e0e0;
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          cursor: pointer;
          font-size: 18px;
          color: #333;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: white;
          transform: scale(1.1);
        }

        .metadata-panel {
          padding: 25px;
        }

        .metadata-header {
          font-size: 18px;
          font-weight: 700;
          color: #333;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #f0f0f0;
        }

        .compliance-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }

        .compliance-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          font-weight: bold;
        }

        .compliance-title {
          font-size: 16px;
          font-weight: 600;
          color: #2c5530;
        }

        .justification-box {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #2c5530;
          margin-bottom: 20px;
        }

        .justification-text {
          font-size: 13px;
          line-height: 1.5;
          color: #444;
        }

        .detections-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 8px;
          margin-bottom: 20px;
        }

        .detection-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 10px;
          background: #f8f9fa;
          border-radius: 6px;
          font-size: 11px;
        }

        .detection-item.active {
          background: #e8f5e8;
          border: 1px solid #2c5530;
        }

        .detection-label {
          font-weight: 500;
          color: #555;
        }

        .detection-value {
          font-weight: 600;
          color: #2c5530;
        }

        .metadata-section {
          margin-bottom: 20px;
        }

        .metadata-section-title {
          font-size: 14px;
          font-weight: 600;
          color: #2c5530;
          margin-bottom: 10px;
          border-bottom: 1px solid #eee;
          padding-bottom: 5px;
        }

        .stats-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          color: #666;
          font-size: 14px;
        }

        .view-toggle {
          display: flex;
          gap: 5px;
        }

        .toggle-btn {
          padding: 6px 12px;
          border: 1px solid #e0e0e0;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 12px;
        }

        .toggle-btn.active {
          background: #2c5530;
          color: white;
        }

        .summary-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 10px;
          margin-bottom: 15px;
        }

        .stat-box {
          background: #f8f9fa;
          padding: 10px;
          border-radius: 8px;
          text-align: center;
        }

        .stat-number {
          font-size: 18px;
          font-weight: 700;
          color: #2c5530;
        }

        .stat-label {
          font-size: 10px;
          color: #666;
          text-transform: uppercase;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 15px;
          }

          .split-view {
            flex-direction: column;
          }

          .split-right {
            width: 100%;
            height: 50%;
          }

          .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 15px;
          }

          .filters {
            flex-direction: column;
            gap: 10px;
          }

          .filter-section {
            margin-right: 0;
          }
        }
      `}</style>

      <header className="header">
        <div className="header-content">
          <div className="logo">EcoCompliance Inspector</div>
          <div className="search-container">
            <div style={{ position: 'relative' }}>
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search by image name, compliance aspect, detections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filters">
              <FilterSection 
                title="Compliance" 
                category="compliance"
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'dust', label: 'Dust Control' },
                  { value: 'water', label: 'Water Mgmt' },
                  { value: 'afforestation', label: 'Afforestation' },
                  { value: 'erosion', label: 'Erosion Control' }
                ]}
              />
              <FilterSection 
                title="Environment" 
                category="environment"
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'humans', label: 'Human Activity' },
                  { value: 'machinery', label: 'Machinery' },
                  { value: 'vegetation', label: 'Vegetation' },
                  { value: 'water_features', label: 'Water Features' }
                ]}
              />
              <FilterSection 
                title="Infrastructure" 
                category="infrastructure"
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'roads', label: 'Roads' },
                  { value: 'construction', label: 'Construction' },
                  { value: 'mining', label: 'Mining Areas' }
                ]}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="gallery-container">
          <div className="stats-bar">
            <span>Showing {filteredImages.length} of {sampleImages.length} images</span>
            <div className="view-toggle">
              <button className="toggle-btn active">Grid</button>
              <button className="toggle-btn">List</button>
            </div>
          </div>
          
          <div className="gallery-grid">
            {filteredImages.map((image, index) => (
              <ImageCard 
                key={index} 
                image={image} 
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>
      </main>

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