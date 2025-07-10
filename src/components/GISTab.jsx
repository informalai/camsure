import React, { useState } from 'react';
import { 
  Map, 
  Upload, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  MapPin, 
  Activity,
  Download,
  Camera,
  Navigation,
  Layers,
  Eye,
  EyeOff,
  Filter,
  Search,
  RefreshCw
} from 'lucide-react';

const GISTab = () => {
  const [selectedMine, setSelectedMine] = useState('gua-main');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [mapLayers, setMapLayers] = useState({
    boundaries: true,
    bufferZones: true,
    violations: true,
    structures: false,
    vegetation: false
  });

  // Mock data for SAIL mines with GIS-specific information
  const mineData = {
    'gua-main': {
      name: 'Gua Main Mine',
      location: 'Gua, Jharkhand',
      coordinates: '22.5726° N, 85.8274° E',
      area: '245.7 hectares',
      boundaryStatus: 'compliant',
      lastSurvey: '2024-03-15',
      violations: 0,
      bufferCompliance: 98,
      documents: {
        surveyReport: 'Available',
        boundaryMap: 'Updated',
        complianceCert: 'Valid'
      }
    },
    'gua-west': {
      name: 'Gua West Mine',
      location: 'Gua, Jharkhand',
      coordinates: '22.5689° N, 85.8156° E',
      area: '189.3 hectares',
      boundaryStatus: 'minor-issues',
      lastSurvey: '2024-02-28',
      violations: 2,
      bufferCompliance: 92,
      documents: {
        surveyReport: 'Available',
        boundaryMap: 'Needs Update',
        complianceCert: 'Valid'
      }
    },
    'gua-east': {
      name: 'Gua East Mine',
      location: 'Gua, Jharkhand',
      coordinates: '22.5812° N, 85.8394° E',
      area: '156.8 hectares',
      boundaryStatus: 'critical',
      lastSurvey: '2024-01-20',
      violations: 5,
      bufferCompliance: 76,
      documents: {
        surveyReport: 'Outdated',
        boundaryMap: 'Critical Update Needed',
        complianceCert: 'Expired'
      }
    }
  };

  const currentMine = mineData[selectedMine];

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const toggleLayer = (layer) => {
    setMapLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800 border-green-200';
      case 'minor-issues': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'minor-issues': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">GIS Boundary Management</h1>
        <p className="text-gray-600">Monitor mine boundaries, buffer zones, and compliance violations</p>
      </div>

      {/* Mine Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Select Mine Site</h2>
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search mines..." 
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(mineData).map(([key, mine]) => (
            <button
              key={key}
              onClick={() => setSelectedMine(key)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedMine === key 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{mine.name}</h3>
                {getStatusIcon(mine.boundaryStatus)}
              </div>
              <p className="text-sm text-gray-600 mb-1">{mine.location}</p>
              <p className="text-sm text-gray-500">{mine.area}</p>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(mine.boundaryStatus)}`}>
                {mine.violations} violations
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {currentMine.name} - Boundary Map
              </h2>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm">
                  <RefreshCw className="w-4 h-4 inline mr-1" />
                  Refresh
                </button>
                <button className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm">
                  <Download className="w-4 h-4 inline mr-1" />
                  Export
                </button>
              </div>
            </div>

            {/* Placeholder Map */}
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-blue-300 mb-4">
              <div className="text-center">
                <Map className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Interactive Map View</h3>
                <p className="text-gray-600 mb-4">Satellite imagery with boundary overlays</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Licensed Area</span>
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">Buffer Zone</span>
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">Violations</span>
                </div>
              </div>
            </div>

            {/* Map Controls */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Map Layers</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(mapLayers).map(([layer, enabled]) => (
                  <button
                    key={layer}
                    onClick={() => toggleLayer(layer)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                      enabled 
                        ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    {layer.charAt(0).toUpperCase() + layer.slice(1).replace(/([A-Z])/g, ' $1')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Mine Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Mine Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Coordinates:</span>
                <span className="font-medium text-gray-900">{currentMine.coordinates}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Licensed Area:</span>
                <span className="font-medium text-gray-900">{currentMine.area}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Survey:</span>
                <span className="font-medium text-gray-900">{currentMine.lastSurvey}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Buffer Compliance:</span>
                <span className="font-medium text-gray-900">{currentMine.bufferCompliance}%</span>
              </div>
            </div>

            {/* Status Indicator */}
            <div className={`mt-4 p-3 rounded-lg border ${getStatusColor(currentMine.boundaryStatus)}`}>
              <div className="flex items-center gap-2">
                {getStatusIcon(currentMine.boundaryStatus)}
                <span className="font-medium">
                  {currentMine.boundaryStatus === 'compliant' ? 'Fully Compliant' :
                   currentMine.boundaryStatus === 'minor-issues' ? 'Minor Issues' : 'Critical Issues'}
                </span>
              </div>
              <p className="text-sm mt-1">
                {currentMine.violations} boundary violations detected
              </p>
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Boundary Files</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">Drop GIS files here or click to browse</p>
              <p className="text-xs text-gray-500 mb-3">Supports: .shp, .kml, .geojson (Max 10MB)</p>
              <input
                type="file"
                multiple
                accept=".shp,.kml,.geojson,.kmz"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer inline-block"
              >
                Select Files
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Uploaded Files:</h4>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{file.name}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-3 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors text-sm">
                  Process Files
                </button>
              </div>
            )}
          </div>

          {/* Document Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Status</h3>
            <div className="space-y-3">
              {Object.entries(currentMine.documents).map(([doc, status]) => (
                <div key={doc} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">
                      {doc.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    status === 'Available' || status === 'Updated' || status === 'Valid' 
                      ? 'bg-green-100 text-green-800'
                      : status === 'Needs Update' 
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors text-sm">
                <Camera className="w-4 h-4 inline mr-2" />
                Capture Site Photos
              </button>
              <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors text-sm">
                <Navigation className="w-4 h-4 inline mr-2" />
                Start GPS Survey
              </button>
              <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors text-sm">
                <FileText className="w-4 h-4 inline mr-2" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GISTab; 