import React, { useState } from 'react';
import { Filter, X, Search, Building2 } from 'lucide-react';

const FilterPanel = ({ isOpen, onClose, onFilterChange, mines }) => {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSite, setSelectedSite] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const mineTypes = ['All', ...Array.from(new Set(mines.map(m => m.type)))];
  const siteLocations = ['All', ...Array.from(new Set(mines.map(m => m.location)))];

  const handleTypeFilter = (type) => {
    setSelectedType(type);
    onFilterChange({ type, site: selectedSite });
  };

  const handleSiteFilter = (site) => {
    setSelectedSite(site);
    onFilterChange({ type: selectedType, site });
  };

  const clearFilters = () => {
    setSelectedType('All');
    setSelectedSite('All');
    setSearchTerm('');
    onFilterChange({ type: 'All', site: 'All' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl border-l border-gray-200 z-50 transform transition-transform duration-300 ease-in-out">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Filter size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Smart Filters</h3>
                <p className="text-sm text-gray-600">Refine your analysis</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search mines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Mine Type Filter */}
          <div className="mb-8">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Building2 size={16} className="text-blue-500" />
              Operation Type
            </h4>
            <div className="space-y-2">
              {mineTypes.map(type => (
                <button
                  key={type}
                  onClick={() => handleTypeFilter(type)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${selectedType === type
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div className="mb-8">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Building2 size={16} className="text-blue-500" />
              Location
            </h4>
            <div className="space-y-2">
              {siteLocations.map(site => (
                <button
                  key={site}
                  onClick={() => handleSiteFilter(site)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${selectedSite === site
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                >
                  {site}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <button
            onClick={clearFilters}
            className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel; 