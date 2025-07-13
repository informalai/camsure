import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  X, 
  Search, 
  Tag, 
  List, 
  User, 
  CheckCircle, 
  MapPin, 
  FileText, 
  UserCheck, 
  Shield, 
  Clock, 
  Paperclip, 
  MessageSquare, 
  Calendar 
} from 'lucide-react';

const FilterPanel = ({
  isOpen,
  onClose,
  onFilterChange,
  items,
  filterConfig,
  searchPlaceholder = "Search items...",
  embedded = false // New prop to indicate if it's embedded in another panel
}) => {
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const filterOptions = useMemo(() => {
    const options = {};
    if (!items) return options;

    filterConfig.forEach(config => {
      // Handle computed filters with custom options
      if (config.key === 'taskStatus') {
        options[config.key] = ['All', 'overdue', 'upcoming', 'ontime'];
      } else if (config.key === 'evidenceStatus') {
        options[config.key] = ['All', 'has', 'none'];
      } else if (config.key === 'commentsStatus') {
        options[config.key] = ['All', 'has', 'none'];
      } else if (config.key === 'dateRange') {
        options[config.key] = ['All', 'overdue', 'thisWeek', 'thisMonth', 'future'];
      } else if (config.key === 'priority') {
        // Handle priority specially to show descriptive labels
        options[config.key] = ['All', '1 (High)', '2 (Medium)', '3 (Low)'];
      } else {
        // Dynamic options from data
        options[config.key] = ['All', ...Array.from(new Set(items.map(item => item[config.key]).filter(Boolean)))];
      }
    });
    return options;
  }, [items, filterConfig]);

  const handleFilterClick = (key, value) => {
    let filterValue = value === 'All' ? undefined : value;
    
    // Handle special cases
    if (key === 'priority' && filterValue) {
      // Extract numeric value from "1 (High)" format
      filterValue = parseInt(filterValue.split(' ')[0]);
    }
    
    const newFilters = { ...filters, [key]: filterValue };
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
      case 'UserCheck': return <UserCheck size={16} className="text-blue-500" />;
      case 'CheckCircle': return <CheckCircle size={16} className="text-blue-500" />;
      case 'List': return <List size={16} className="text-blue-500" />;
      case 'MapPin': return <MapPin size={16} className="text-blue-500" />;
      case 'FileText': return <FileText size={16} className="text-blue-500" />;
      case 'Tag': return <Tag size={16} className="text-blue-500" />;
      case 'Shield': return <Shield size={16} className="text-blue-500" />;
      case 'Clock': return <Clock size={16} className="text-blue-500" />;
      case 'Paperclip': return <Paperclip size={16} className="text-blue-500" />;
      case 'MessageSquare': return <MessageSquare size={16} className="text-blue-500" />;
      case 'Calendar': return <Calendar size={16} className="text-blue-500" />;
      default: return <Tag size={16} className="text-blue-500" />;
    }
  };

  const getOptionLabel = (key, option) => {
    // Return user-friendly labels for computed filters
    switch (key) {
      case 'taskStatus':
        switch (option) {
          case 'overdue': return '🔴 Overdue';
          case 'upcoming': return '🟡 Due Soon (7 days)';
          case 'ontime': return '🟢 On Time';
          default: return option;
        }
      case 'evidenceStatus':
        switch (option) {
          case 'has': return '📎 Has Evidence';
          case 'none': return '📋 No Evidence';
          default: return option;
        }
      case 'commentsStatus':
        switch (option) {
          case 'has': return '💬 Has Comments';
          case 'none': return '📝 No Comments';
          default: return option;
        }
      case 'dateRange':
        switch (option) {
          case 'overdue': return '🚨 Overdue';
          case 'thisWeek': return '📅 This Week';
          case 'thisMonth': return '🗓️ This Month';
          case 'future': return '⏳ Future (>30 days)';
          default: return option;
        }
      case 'validationStatus':
        switch (option) {
          case 'pending': return '⏳ Pending';
          case 'validated': return '✅ Validated';
          case 'rejected': return '❌ Rejected';
          default: return option;
        }
      case 'column':
        switch (option) {
          case 'assigned': return '📋 Assigned';
          case 'in-progress': return '🔄 In Progress';
          case 'evidence-submitted': return '📎 Evidence Submitted';
          case 'completed': return '✅ Completed';
          case 'rejected': return '🔄 Rejected/Reopened';
          default: return option;
        }
      default:
        return option;
    }
  };


  if (!isOpen) return null;

  // If embedded, just return the filter content without the full panel wrapper
  if (embedded) {
    return (
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Search */}
        <div className="relative mb-6">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter Content */}
        {filterConfig.map(config => (
          <div className="mb-8" key={config.key}>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              {getIcon(config.icon)}
              {config.title}
            </h4>
            <div className="space-y-2">
              {(filterOptions[config.key] || []).map(option => {
                // Handle selection state for special cases
                let isSelected = false;
                if (config.key === 'priority' && option !== 'All') {
                  const currentValue = filters[config.key];
                  const optionValue = parseInt(option.split(' ')[0]);
                  isSelected = currentValue === optionValue;
                } else {
                  isSelected = (filters[config.key] || 'All') === option;
                }
                
                return (
                  <button
                    key={option}
                    onClick={() => handleFilterClick(config.key, option)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      isSelected
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {getOptionLabel(config.key, option)}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

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
    );
  }

  // Original standalone panel
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
                {(filterOptions[config.key] || []).map(option => {
                  // Handle selection state for special cases
                  let isSelected = false;
                  if (config.key === 'priority' && option !== 'All') {
                    const currentValue = filters[config.key];
                    const optionValue = parseInt(option.split(' ')[0]);
                    isSelected = currentValue === optionValue;
                  } else {
                    isSelected = (filters[config.key] || 'All') === option;
                  }
                  
                  return (
                    <button
                      key={option}
                      onClick={() => handleFilterClick(config.key, option)}
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        isSelected
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {getOptionLabel(config.key, option)}
                    </button>
                  );
                })}
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