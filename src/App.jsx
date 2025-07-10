import React, { useState, useRef, useEffect } from 'react'
import {
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Award,
  Activity,
  Shield,
  Filter,
  X,
  ChevronRight,
  BarChart3,
  PieChart,
  TrendingDown,
  Building2,
  Brain,
  Zap,
  Menu,
  Search,
  Bell,
  User,
  Settings,
  Home,
  FileText,
  Map
} from 'lucide-react'
import DashboardPage from './components/dashboad';
import ImageViewer from './components/ImageViewer';
import Jira from './Jira';

// Mock data
const sailMines = [
  {
    id: 'gua-main',
    name: 'Gua Main Mine',
    location: 'Gua, Jharkhand',
    type: 'Iron Ore',
    complianceScore: 96,
    status: 'excellent',
    documents: {
      EC: { score: 98, status: 'Active', dueDate: '2025-06-15' },
      CTE: { score: 95, status: 'Active', dueDate: '2025-03-20' },
      CTO: { score: 97, status: 'Active', dueDate: '2025-08-10' },
      FC: { score: 94, status: 'Active', dueDate: '2025-12-05' }
    },
    departments: { environmental: 98, safety: 94, operations: 96, legal: 95 }
  },
  {
    id: 'gua-west',
    name: 'Gua West Mine',
    location: 'Gua, Jharkhand',
    type: 'Iron Ore',
    complianceScore: 92,
    status: 'good',
    documents: {
      EC: { score: 94, status: 'Active', dueDate: '2025-04-12' },
      CTE: { score: 91, status: 'Active', dueDate: '2025-07-18' },
      CTO: { score: 93, status: 'Active', dueDate: '2025-05-25' },
      FC: { score: 90, status: 'Renewal Due', dueDate: '2024-01-30' }
    },
    departments: { environmental: 93, safety: 91, operations: 92, legal: 91 }
  },
  {
    id: 'gua-east',
    name: 'Gua East Mine',
    location: 'Gua, Jharkhand',
    type: 'Iron Ore',
    complianceScore: 84,
    status: 'warning',
    documents: {
      EC: { score: 87, status: 'Under Review', dueDate: '2024-01-25' },
      CTE: { score: 85, status: 'Active', dueDate: '2025-09-08' },
      CTO: { score: 82, status: 'Action Required', dueDate: '2024-01-20' },
      FC: { score: 81, status: 'Pending', dueDate: '2024-02-15' }
    },
    departments: { environmental: 82, safety: 85, operations: 84, legal: 86 }
  },
  {
    id: 'rourkela-coal',
    name: 'Rourkela Coal Mine',
    location: 'Rourkela, Odisha',
    type: 'Coal',
    complianceScore: 88,
    status: 'good',
    documents: {
      EC: { score: 90, status: 'Active', dueDate: '2025-11-30' },
      CTE: { score: 87, status: 'Active', dueDate: '2025-02-14' },
      CTO: { score: 89, status: 'Active', dueDate: '2025-06-22' },
      FC: { score: 86, status: 'Active', dueDate: '2025-10-18' }
    },
    departments: { environmental: 89, safety: 87, operations: 88, legal: 88 }
  },
  {
    id: 'durg-limestone',
    name: 'Durg Limestone Mine',
    location: 'Durg, Chhattisgarh',
    type: 'Limestone',
    complianceScore: 78,
    status: 'critical',
    documents: {
      EC: { score: 75, status: 'Critical', dueDate: '2024-01-18' },
      CTE: { score: 80, status: 'Active', dueDate: '2025-04-05' },
      CTO: { score: 79, status: 'Warning', dueDate: '2024-02-28' },
      FC: { score: 76, status: 'Critical', dueDate: '2024-01-22' }
    },
    departments: { environmental: 76, safety: 78, operations: 79, legal: 80 }
  }
];

// Filter Panel Component
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

// Portfolio View Component
const PortfolioView = ({ mines }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'from-green-400 to-green-600';
      case 'good': return 'from-blue-400 to-blue-600';
      case 'warning': return 'from-yellow-400 to-yellow-600';
      case 'critical': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent': return '🌟';
      case 'good': return '✅';
      case 'warning': return '⚠️';
      case 'critical': return '🚨';
      default: return '📊';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Sites', value: mines.length, color: 'blue' },
          { label: 'Excellent', value: mines.filter(m => m.status === 'excellent').length, color: 'green' },
          { label: 'Need Attention', value: mines.filter(m => m.status === 'warning').length, color: 'yellow' },
          { label: 'Critical', value: mines.filter(m => m.status === 'critical').length, color: 'red' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Mine Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mines.map((mine) => (
          <div key={mine.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{mine.name}</h3>
                <p className="text-sm text-gray-600">{mine.location}</p>
                <p className="text-xs text-gray-500 mt-1">{mine.type}</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-br ${getStatusColor(mine.status)} rounded-full flex items-center justify-center text-white text-lg`}>
                {getStatusIcon(mine.status)}
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Compliance Score</span>
                <span className="text-xl font-bold text-gray-900">{mine.complianceScore}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${getStatusColor(mine.status)}`}
                  style={{ width: `${mine.complianceScore}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {Object.entries(mine.documents).map(([doc, data]) => (
                <div key={doc} className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs font-semibold text-gray-700">{doc}</div>
                  <div className="text-sm text-gray-900">{data.score}%</div>
                  <div className="text-xs text-gray-500">{data.status}</div>
                </div>
              ))}
            </div>

            <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Analytics View Component
const AnalyticsView = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Compliance Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 size={20} className="text-blue-500" />
            Compliance Distribution
          </h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 size={48} className="text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Interactive Chart</p>
            </div>
          </div>
        </div>

        {/* Department Matrix */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <PieChart size={20} className="text-green-500" />
            Department Performance
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {['Environmental', 'Safety', 'Operations', 'Legal'].map((dept, idx) => (
              <div key={dept} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{90 + idx * 2}%</div>
                <div className="text-sm text-gray-600">{dept}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trends */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-purple-500" />
          Compliance Trends
        </h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp size={48} className="text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">6-Month Trend Analysis</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// AI Insights View Component
const AIInsightsView = ({ mines }) => {
  const predictions = [
    {
      type: 'risk',
      title: 'High Risk Prediction',
      description: 'Gua East Mine likely to face EC renewal issues',
      probability: 78,
      timeframe: '30 days',
      action: 'Schedule pre-compliance audit'
    },
    {
      type: 'opportunity',
      title: 'Excellence Opportunity',
      description: 'Gua West Mine trending toward excellent status',
      probability: 85,
      timeframe: '45 days',
      action: 'Accelerate best practices'
    },
    {
      type: 'timeline',
      title: 'Deadline Optimization',
      description: 'FC renewals can be batched for efficiency',
      probability: 92,
      timeframe: '60 days',
      action: 'Coordinate renewal schedules'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Predictions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Brain size={20} className="text-purple-500" />
            AI Predictions
          </h3>
          <div className="space-y-4">
            {predictions.map((prediction, idx) => (
              <div key={idx} className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{prediction.title}</h4>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    {prediction.probability}%
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{prediction.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{prediction.timeframe}</span>
                  <button className="text-xs bg-purple-500 text-white px-3 py-1 rounded-full hover:bg-purple-600 transition-colors">
                    {prediction.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Heatmap */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle size={20} className="text-red-500" />
            Risk Assessment
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {mines.map((mine) => (
              <div
                key={mine.id}
                className={`p-3 rounded-lg text-center ${mine.complianceScore >= 95 ? 'bg-green-100 text-green-800' :
                  mine.complianceScore >= 85 ? 'bg-blue-100 text-blue-800' :
                    mine.complianceScore >= 75 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                  }`}
              >
                <div className="font-bold">{mine.complianceScore}%</div>
                <div className="text-xs">{mine.name.split(' ')[0]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Document Timeline */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileText size={20} className="text-blue-500" />
          Document Status Timeline
        </h3>
        <div className="space-y-3">
          {mines.slice(0, 5).map((mine) => (
            <div key={mine.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{mine.name}</div>
                <div className="text-sm text-gray-600">EC Renewal Due</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">30 days</div>
                <div className="text-xs text-gray-500">March 15, 2025</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Quick Actions Component
const QuickActions = () => {
  const actions = [
    { icon: FileText, label: 'Generate Report', color: 'blue' },
    { icon: AlertCircle, label: 'View Alerts', color: 'red' },
    { icon: BarChart3, label: 'Analytics', color: 'green' },
    { icon: Settings, label: 'Settings', color: 'gray' },
    { icon: Bell, label: 'Notifications', color: 'yellow' },
    { icon: User, label: 'Team', color: 'purple' }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Zap size={20} className="text-yellow-500" />
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action, idx) => (
          <button
            key={idx}
            className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-center group"
          >
            <action.icon size={24} className="mx-auto mb-2 text-gray-600 group-hover:text-gray-800" />
            <div className="text-sm font-medium text-gray-700">{action.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

function Toast({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 2500);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);
  if (!message) return null;
  return (
    <div className="fixed bottom-8 right-8 z-50 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
      {message}
    </div>
  );
}

function SettingsModal({ open, onClose, theme, setTheme, notifications, setNotifications, setToast }) {
  const [logo, setLogo] = useState(null);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-md relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700" onClick={onClose}>
          <X size={22} />
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Settings</h2>
        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Theme</label>
          <select
            className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            value={theme}
            onChange={e => setTheme(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Notifications</label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={e => setNotifications(e.target.checked)}
            className="mr-2"
          />
          <span className="text-gray-700 dark:text-gray-200">Enable notifications</span>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Logo (demo only)</label>
          <input type="file" accept="image/*" onChange={e => {
            if (e.target.files && e.target.files[0]) {
              setLogo(URL.createObjectURL(e.target.files[0]));
              setToast && setToast('Logo uploaded (demo only)');
            }
          }} />
          {logo && <img src={logo} alt="Logo preview" className="mt-2 h-12" />}
        </div>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function HelpModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-md relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700" onClick={onClose}>
          <X size={22} />
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Help & Support</h2>
        <div className="mb-4 text-gray-700 dark:text-gray-200">
          <p className="mb-2">Need help? Here are some resources:</p>
          <ul className="list-disc pl-5 mb-4">
            <li>Check the <a href="#" className="text-blue-600 underline">Documentation</a></li>
            <li>Contact support: <a href="mailto:support@yourcompany.com" className="text-blue-600 underline">support@yourcompany.com</a></li>
            <li>FAQ: <a href="#" className="text-blue-600 underline">Frequently Asked Questions</a></li>
          </ul>
          <p>For urgent issues, reach out to your admin or product manager.</p>
        </div>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [filteredMines, setFilteredMines] = useState(sailMines);
  const [leftPanelExpanded, setLeftPanelExpanded] = useState(false);
  const [rightPanelExpanded, setRightPanelExpanded] = useState(false);
  const [activeView, setActiveView] = useState('jira');
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notifRef = useRef();
  const profileRef = useRef();
  const searchRef = useRef();
  const [graffiti, setGraffiti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [userNotifications, setUserNotifications] = useState(true);
  const [helpOpen, setHelpOpen] = useState(false);

  // Dummy notifications
  const notifications = [
    { id: 1, text: 'Compliance report for Gua Main Mine submitted.', time: '2h ago' },
    { id: 2, text: 'Action required: CTO renewal for Gua West Mine.', time: '5h ago' },
    { id: 3, text: 'New penalty guidelines released.', time: '1d ago' },
  ];
  // Dummy profile actions
  const profileActions = [
    { id: 1, label: 'View Profile' },
    { id: 2, label: 'Settings' },
    { id: 3, label: 'Logout' },
  ];
  // Dummy search results for compliance issues
  const searchResults = [
    { key: 'COMP-101', summary: 'Environmental Clearance (EC) renewal for Gua Main Mine', mine: 'Gua Main Mine' },
    { key: 'COMP-102', summary: 'Forest Clearance (FC) documentation update', mine: 'Gua West Mine' },
    { key: 'COMP-103', summary: 'Consent to Operate (CTO) violation investigation', mine: 'Gua East Mine' }
  ].filter(issue =>
    issue.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.mine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter change handler (currently unused but kept for future functionality)
  const _handleFilterChange = (filters) => {
    let filtered = sailMines;

    if (filters.type !== 'All') {
      filtered = filtered.filter(mine => mine.type === filters.type);
    }

    if (filters.site !== 'All') {
      filtered = filtered.filter(mine => mine.location === filters.site);
    }

    setFilteredMines(filtered);
  };

  const overallCompliance = Math.round(
    filteredMines.reduce((sum, mine) => sum + mine.complianceScore, 0) / filteredMines.length
  );

  const navigationItems = [
    { id: 'jira', icon: FileText, label: 'Jira', color: 'blue' },
    { id: 'imageviewer', icon: Map, label: 'Image Viewer', color: 'green' },
    { id: 'dashboard', icon: Brain, label: 'Dashboard', color: 'purple' }
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case 'jira':
        return <Jira />;
      case 'imageviewer':
        return <ImageViewer />;
      case 'dashboard':
        return <DashboardPage />;
      default:
        return <Jira />;
    }
  };

  // Simulate loading for jira view (demo)
  useEffect(() => {
    if (activeView === 'jira') {
      setLoading(true);
      const t = setTimeout(() => setLoading(false), 800);
      return () => clearTimeout(t);
    } else {
      setLoading(false);
    }
  }, [activeView]);

  // Confetti burst effect (simple CSS burst)
  useEffect(() => {
    if (graffiti) {
      const timer = setTimeout(() => setGraffiti(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [graffiti]);

  // Add dark mode class to root
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className={`min-h-screen bg-gray-50 flex ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Left Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-40 transition-all duration-300 ${leftPanelExpanded ? 'w-64' : 'w-16'}`}
        onMouseEnter={() => setLeftPanelExpanded(true)}
        onMouseLeave={() => setLeftPanelExpanded(false)}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            {leftPanelExpanded && (
              <div className="overflow-hidden">
                <p className="font-bold text-gray-900 whitespace-nowrap">Compass</p>
                <p className="text-xs text-gray-500 whitespace-nowrap">Intelligence</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-2 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${activeView === item.id
                ? 'bg-blue-50 text-blue-600 border border-blue-200'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <item.icon size={20} />
              {leftPanelExpanded && (
                <span className="font-medium whitespace-nowrap overflow-hidden">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${leftPanelExpanded ? 'ml-64' : 'ml-16'} ${rightPanelExpanded ? 'mr-80' : 'mr-16'}`}
      >
        {/* Top Header */}
        <header className={`bg-white border-b border-gray-200 px-6 py-4 w-full relative`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    🧭 Compass Informalai
                  </p>
                  <p className="text-sm text-gray-600">
                    SAIL Compliance Platform • Compliance Issues
                  </p>
                </div>
              </div>
              <button
                className="ml-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium"
                onClick={() => setHelpOpen(true)}
                title="Help & Support"
              >
                Help
              </button>
            </div>
            <div className="flex items-center gap-4">
              {/* Search Icon */}
              <div className="relative">
                <button
                  className="p-2 text-gray-600 hover:text-blue-600 bg-gray-100 rounded-lg"
                  onClick={() => setSearchOpen((v) => !v)}
                  ref={searchRef}
                >
                  <Search size={20} />
                </button>
                {searchOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4">
                    <input
                      type="text"
                      placeholder="Search compliance issues..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full mb-2 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                    <div className="max-h-48 overflow-y-auto">
                      {searchResults.length === 0 ? (
                        <div className="text-gray-500 text-sm">No results found.</div>
                      ) : (
                        searchResults.map(issue => (
                          <div key={issue.key} className="py-2 px-2 hover:bg-blue-50 rounded cursor-pointer text-gray-800 text-sm">
                            {issue.key}: {issue.summary} <span className="text-xs text-gray-400">({issue.mine})</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* Notifications */}
              <div className="relative">
                <button
                  className="relative p-2 text-gray-600 hover:text-blue-600 bg-gray-100 rounded-lg"
                  onClick={() => setNotifOpen((v) => !v)}
                  ref={notifRef}
                >
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4">
                    <div className="font-bold text-gray-900 mb-2">Notifications</div>
                    <ul className="divide-y divide-gray-100">
                      {notifications.map(n => (
                        <li key={n.id} className="py-2 text-gray-800 flex justify-between items-center">
                          <span>{n.text}</span>
                          <span className="text-xs text-gray-400 ml-2">{n.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* User/Profile */}
              <div className="relative">
                <button
                  className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center focus:outline-none"
                  onClick={() => setProfileOpen((v) => !v)}
                  ref={profileRef}
                >
                  <User size={16} className="text-white" />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-2">
                    <div className="px-4 py-2 border-b text-gray-900 font-bold">Naveen Kala</div>
                    <ul>
                      {profileActions.map(a => (
                        <li key={a.id} className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-800 text-sm"
                          onClick={() => a.label === 'Settings' ? (setSettingsOpen(true), setProfileOpen(false)) : null}
                        >
                          {a.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* Overall Score */}
              <div className="relative text-right px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 cursor-pointer select-none"
                onClick={() => activeView === 'main' && setGraffiti(true)}
                title="Celebrate!"
              >
                <div className="text-2xl font-bold text-green-600">{overallCompliance}%</div>
                <div className="text-xs text-green-700">Overall Score</div>
                {/* Graffiti/Confetti burst */}
                {graffiti && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-50">
                    <div className="graffiti-burst" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Executive KPIs */}
        {activeView === 'jira' && (
          <div className="px-6 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  label: 'Compliance Score',
                  value: `${overallCompliance}%`,
                  trend: '+2.3%',
                  icon: TrendingUp,
                  color: 'from-green-400 to-emerald-500'
                },
                {
                  label: 'Active Issues',
                  value: filteredMines.reduce((sum, mine) => sum + Object.values(mine.documents).filter(doc => doc.status !== 'Active').length, 0),
                  trend: '-3 issues',
                  icon: AlertCircle,
                  color: 'from-orange-400 to-red-500'
                },
                {
                  label: 'Penalties This Year',
                  value: '₹0',
                  trend: '364 days clean',
                  icon: Shield,
                  color: 'from-blue-400 to-cyan-500'
                },
                {
                  label: 'Excellent Sites',
                  value: filteredMines.filter(m => m.status === 'excellent').length,
                  trend: `${Math.round((filteredMines.filter(m => m.status === 'excellent').length / filteredMines.length) * 100)}% of portfolio`,
                  icon: Award,
                  color: 'from-purple-400 to-pink-500'
                }
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${kpi.color} rounded-xl flex items-center justify-center`}>
                      <kpi.icon size={24} className="text-white" />
                    </div>
                    <div className="text-white">
                      <div className="text-2xl font-bold">{kpi.value}</div>
                      <div className="text-sm opacity-90">{kpi.label}</div>
                    </div>
                  </div>
                  <div className="text-xs text-white/70 bg-white/10 rounded-lg px-3 py-1 inline-block">
                    {kpi.trend}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 w-full flex flex-col">
          {activeView === 'dashboard' ? (
            <DashboardPage />
          ) : activeView === 'jira' ? (
            <>
              <div className="p-6 w-full flex flex-col min-h-[300px] items-center justify-center">
                {loading ? (
                  <div className="flex flex-col items-center justify-center w-full h-64">
                    <div className="loader mb-4" />
                    <div className="text-gray-500">Loading compliance data...</div>
                  </div>
                ) : (
                  renderActiveView()
                )}
              </div>
              <div className="mt-8 w-full flex flex-col">
                <QuickActions />
              </div>
            </>
          ) : (
            <div className="p-6 w-full flex flex-col">
              {renderActiveView()}
            </div>
          )}
        </div>

      </div>

      {/* Right Filter Panel (hoverable) */}
      {activeView === 'jira' && (
        <div
          className={`fixed right-0 top-0 h-full bg-white border-l border-gray-200 z-50 shadow-2xl transition-all duration-300 ${rightPanelExpanded ? 'w-80' : 'w-16'}`}
          onMouseEnter={() => setRightPanelExpanded(true)}
          onMouseLeave={() => setRightPanelExpanded(false)}
        >
          <div className="h-full flex flex-col">
            {/* Header (always show icon, expand details on hover) */}
            <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
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
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Filter size={16} className="text-blue-500" />
                    Issue Type
                  </h4>
                  <div className="space-y-2">
                    {['All', 'Compliance', 'Task', 'Bug', 'Story'].map(type => (
                      <button
                        key={type}
                        className="w-full p-3 rounded-lg text-left transition-all bg-gray-50 hover:bg-gray-100 text-gray-700"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Building2 size={16} className="text-blue-500" />
                    Mine Location
                  </h4>
                  <div className="space-y-2">
                    {['All Sites', 'Gua Main Mine', 'Gua West Mine', 'Gua East Mine', 'Rourkela Coal Mine', 'Durg Limestone Mine'].map(mine => (
                      <button
                        key={mine}
                        className="w-full p-3 rounded-lg text-left transition-all bg-gray-50 hover:bg-gray-100 text-gray-700"
                      >
                        {mine}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <AlertCircle size={16} className="text-blue-500" />
                    Priority
                  </h4>
                  <div className="space-y-2">
                    {['All', 'Highest', 'High', 'Medium', 'Low'].map(priority => (
                      <button
                        key={priority}
                        className="w-full p-3 rounded-lg text-left transition-all bg-gray-50 hover:bg-gray-100 text-gray-700"
                      >
                        {priority}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Toast message={toast} onClose={() => setToast('')} />
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        theme={theme}
        setTheme={setTheme}
        notifications={userNotifications}
        setNotifications={setUserNotifications}
        setToast={setToast}
      />
      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
}

export default App;