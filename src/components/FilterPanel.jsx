import React, { useState, useMemo } from 'react';
import { Filter, X, Search, Tag, List, User, CheckCircle } from 'lucide-react';

const FilterPanel = ({
  isOpen,
  onClose,
  onFilterChange,
  items,
  filterConfig,
  searchPlaceholder = "Search items..."
}) => {
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const filterOptions = useMemo(() => {
    const options = {};
    if (!items) return options;

    filterConfig.forEach(config => {
      options[config.key] = ['All', ...Array.from(new Set(items.map(item => item[config.key]).filter(Boolean)))];
    });
    return options;
  }, [items, filterConfig]);

  const handleFilterClick = (key, value) => {
    const newFilters = { ...filters, [key]: value === 'All' ? undefined : value };
    setFilters(newFilters);
    onFilterChange({ ...newFilters, searchTerm });
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onFilterChange({ ...filters, searchTerm: e.target.value });
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
    onFilterChange({});
  };
  
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'User': return <User size={16} className="text-blue-500" />;
      case 'CheckCircle': return <CheckCircle size={16} className="text-blue-500" />;
      case 'List': return <List size={16} className="text-blue-500" />;
      default: return <Tag size={16} className="text-blue-500" />;
    }
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
                <p className="text-sm text-gray-600">Refine your view</p>
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
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {filterConfig.map(config => (
            <div className="mb-8" key={config.key}>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                {getIcon(config.icon)}
                {config.title}
              </h4>
              <div className="space-y-2">
                {(filterOptions[config.key] || []).map(option => (
                  <button
                    key={option}
                    onClick={() => handleFilterClick(config.key, option)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      (filters[config.key] || 'All') === option
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
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