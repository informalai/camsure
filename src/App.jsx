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
import DashboardPage from './components/dashboard';
import EcoComplianceInspector from './components/EcoComplianceInspector';
import ComplianceKanban from './ComplianceKanban';
import FilterPanel from './components/FilterPanel';
import AnalyticsView from './components/AnalyticsView';
import AIInsightsView from './components/AIInsightsView';
import QuickActions from './components/QuickActions';
import SettingsModal from './components/SettingsModal';
import HelpModal from './components/HelpModal';
import Toast from './components/Toast';
import { sailMines } from './mock-data';

// Main App Component
function App() {
  const [filteredMines, setFilteredMines] = useState(sailMines);
  const [leftPanelExpanded, setLeftPanelExpanded] = useState(false);
  const [rightPanelExpanded, setRightPanelExpanded] = useState(false);
  const [activeView, setActiveView] = useState('kanban');
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

  const overallCompliance = Math.round(
    filteredMines.reduce((sum, mine) => sum + mine.complianceScore, 0) / filteredMines.length
  );

  const navigationItems = [
    { id: 'kanban', icon: FileText, label: 'WFM Kanban', color: 'blue' },
    { id: 'imageviewer', icon: Map, label: 'AI Gallery', color: 'green' },
    { id: 'dashboard', icon: Brain, label: 'Taskboard', color: 'purple' }
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case 'kanban':
        return <ComplianceKanban />;
      case 'imageviewer':
        return <EcoComplianceInspector />;
      case 'dashboard':
        return <DashboardPage />;
      default:
        return <ComplianceKanban />;
    }
  };

  // Simulate loading for jira view (demo)
  useEffect(() => {
    if (activeView === 'kanban') {
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
                onClick={() => activeView === 'kanban' && setGraffiti(true)}
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

      

        {/* Main Content Area */}
        <div className="flex-1 w-full flex flex-col">
          {activeView === 'dashboard' ? (
            <DashboardPage />
          ) : activeView === 'kanban' ? (
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
              <div className="p-6 mt-8 w-full flex flex-col">
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
      <FilterPanel
        isOpen={rightPanelExpanded}
        onClose={() => setRightPanelExpanded(false)}
        onFilterChange={() => {}}
        mines={sailMines}
      />
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