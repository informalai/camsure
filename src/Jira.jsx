import React, { useState } from 'react';
import { Search, Plus, Filter, Calendar, Clock, Paperclip, MessageSquare, User, ChevronDown, MoreHorizontal, X, Check, AlertCircle, ArrowUp, ArrowDown, Minus, Shield, FileText, Map, Building2 } from 'lucide-react';

// Mock data for mining compliance issues
const mockIssues = [
  {
    id: 1,
    key: 'COMP-101',
    summary: 'Environmental Clearance (EC) renewal for Gua Main Mine',
    description: 'Complete the renewal process for Environmental Clearance certificate which expires in June 2025. Requires submission of compliance reports and environmental impact assessment.',
    type: 'Compliance',
    status: 'todo',
    priority: 'highest',
    assignee: { id: 1, name: 'Rajesh Kumar', avatar: 'RK' },
    reporter: { id: 2, name: 'Priya Sharma', avatar: 'PS' },
    storyPoints: 8,
    timeTracking: { logged: 0, estimated: 40, remaining: 40 },
    comments: 5,
    attachments: 3,
    labels: ['EC', 'renewal', 'gua-main'],
    dueDate: '2025-06-15',
    createdAt: '2025-01-05',
    mine: 'Gua Main Mine'
  },
  {
    id: 2,
    key: 'COMP-102',
    summary: 'Forest Clearance (FC) documentation update',
    description: 'Update Forest Clearance documentation for compensatory afforestation activities. Track plantation progress and submit quarterly reports.',
    type: 'Task',
    status: 'inprogress',
    priority: 'high',
    assignee: { id: 3, name: 'Amit Patel', avatar: 'AP' },
    reporter: { id: 1, name: 'Rajesh Kumar', avatar: 'RK' },
    storyPoints: 5,
    timeTracking: { logged: 12, estimated: 24, remaining: 12 },
    comments: 8,
    attachments: 6,
    labels: ['FC', 'afforestation', 'documentation'],
    dueDate: '2025-01-30',
    createdAt: '2025-01-04',
    mine: 'Gua West Mine'
  },
  {
    id: 3,
    key: 'COMP-103',
    summary: 'Consent to Operate (CTO) violation investigation',
    description: 'Investigate reported CTO violation at Gua East Mine. Review operational parameters and submit corrective action plan.',
    type: 'Bug',
    status: 'inreview',
    priority: 'highest',
    assignee: { id: 4, name: 'Sneha Reddy', avatar: 'SR' },
    reporter: { id: 2, name: 'Priya Sharma', avatar: 'PS' },
    storyPoints: 3,
    timeTracking: { logged: 16, estimated: 16, remaining: 0 },
    comments: 12,
    attachments: 4,
    labels: ['CTO', 'violation', 'investigation'],
    dueDate: '2025-01-20',
    createdAt: '2025-01-03',
    mine: 'Gua East Mine'
  },
  {
    id: 4,
    key: 'COMP-104',
    summary: 'Air quality monitoring system installation',
    description: 'Install and calibrate new air quality monitoring equipment at Rourkela Coal Mine as per CPCB guidelines.',
    type: 'Story',
    status: 'done',
    priority: 'medium',
    assignee: { id: 1, name: 'Rajesh Kumar', avatar: 'RK' },
    reporter: { id: 4, name: 'Sneha Reddy', avatar: 'SR' },
    storyPoints: 4,
    timeTracking: { logged: 20, estimated: 20, remaining: 0 },
    comments: 6,
    attachments: 2,
    labels: ['monitoring', 'air-quality', 'installation'],
    dueDate: '2025-01-08',
    createdAt: '2025-01-02',
    mine: 'Rourkela Coal Mine'
  },
  {
    id: 5,
    key: 'COMP-105',
    summary: 'Water pollution control measures implementation',
    description: 'Implement additional water pollution control measures at Durg Limestone Mine to meet revised discharge standards.',
    type: 'Compliance',
    status: 'todo',
    priority: 'high',
    assignee: { id: 3, name: 'Amit Patel', avatar: 'AP' },
    reporter: { id: 1, name: 'Rajesh Kumar', avatar: 'RK' },
    storyPoints: 6,
    timeTracking: { logged: 0, estimated: 32, remaining: 32 },
    comments: 3,
    attachments: 1,
    labels: ['water-pollution', 'control-measures', 'durg'],
    dueDate: '2025-02-15',
    createdAt: '2025-01-06',
    mine: 'Durg Limestone Mine'
  },
  {
    id: 6,
    key: 'COMP-106',
    summary: 'Safety audit preparation for all sites',
    description: 'Prepare comprehensive safety audit documentation for all mining operations. Coordinate with safety officers and compile reports.',
    type: 'Task',
    status: 'inprogress',
    priority: 'medium',
    assignee: { id: 2, name: 'Priya Sharma', avatar: 'PS' },
    reporter: { id: 3, name: 'Amit Patel', avatar: 'AP' },
    storyPoints: 7,
    timeTracking: { logged: 8, estimated: 28, remaining: 20 },
    comments: 4,
    attachments: 5,
    labels: ['safety', 'audit', 'all-sites'],
    dueDate: '2025-01-25',
    createdAt: '2025-01-05',
    mine: 'All Sites'
  }
];

const mockSprint = {
  id: 1,
  name: 'Compliance Sprint 23',
  startDate: '2025-01-06',
  endDate: '2025-01-20',
  goal: 'Complete critical compliance renewals and address regulatory violations'
};

// Priority icons
const PriorityIcon = ({ priority }) => {
  switch (priority) {
    case 'highest':
      return <ArrowUp className="w-4 h-4 text-red-500" />;
    case 'high':
      return <ArrowUp className="w-4 h-4 text-orange-500" />;
    case 'medium':
      return <Minus className="w-4 h-4 text-yellow-500" />;
    case 'low':
      return <ArrowDown className="w-4 h-4 text-green-500" />;
    case 'lowest':
      return <ArrowDown className="w-4 h-4 text-gray-500" />;
    default:
      return null;
  }
};

// Issue type badge
const IssueTypeBadge = ({ type }) => {
  const colors = {
    Story: 'bg-green-100 text-green-800',
    Task: 'bg-blue-100 text-blue-800',
    Bug: 'bg-red-100 text-red-800',
    Epic: 'bg-purple-100 text-purple-800',
    Compliance: 'bg-orange-100 text-orange-800'
  };
  
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded ${colors[type] || 'bg-gray-100 text-gray-800'}`}>
      {type}
    </span>
  );
};

// User avatar
const UserAvatar = ({ user, size = 'sm' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };
  
  return (
    <div className={`${sizeClasses[size]} bg-blue-500 text-white rounded-full flex items-center justify-center font-medium`}>
      {user.avatar}
    </div>
  );
};

// Issue card component
const IssueCard = ({ issue, onSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('issueId', issue.id);
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
  };
  
  const progressPercentage = issue.timeTracking.estimated > 0 
    ? (issue.timeTracking.logged / issue.timeTracking.estimated) * 100 
    : 0;
  
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onSelect(issue)}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 cursor-move hover:shadow-md transition-shadow ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <IssueTypeBadge type={issue.type} />
          <span className="text-sm text-gray-500">{issue.key}</span>
        </div>
        <PriorityIcon priority={issue.priority} />
      </div>
      
      <h4 className="text-sm font-medium text-gray-900 mb-3">{issue.summary}</h4>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {issue.labels.map((label, idx) => (
          <span key={idx} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
            {label}
          </span>
        ))}
      </div>
      
      {issue.timeTracking.estimated > 0 && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{issue.timeTracking.logged}h logged</span>
            <span>{issue.timeTracking.remaining}h remaining</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-blue-500 h-1.5 rounded-full"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <UserAvatar user={issue.assignee} />
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            {issue.comments > 0 && (
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-3 h-3" />
                <span>{issue.comments}</span>
              </div>
            )}
            {issue.attachments > 0 && (
              <div className="flex items-center space-x-1">
                <Paperclip className="w-3 h-3" />
                <span>{issue.attachments}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-xs font-medium text-gray-700">{issue.storyPoints}</span>
          <span className="text-xs text-gray-500">pts</span>
        </div>
      </div>
    </div>
  );
};

// Column component
const BoardColumn = ({ title, status, issues, onIssueSelect }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  
  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const issueId = e.dataTransfer.getData('issueId');
    console.log(`Dropped issue ${issueId} into ${status}`);
  };
  
  const totalPoints = issues.reduce((sum, issue) => sum + issue.storyPoints, 0);
  
  return (
    <div className="flex-1 min-w-0">
      <div className="bg-gray-50 rounded-lg">
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">{title}</h3>
            <span className="text-xs text-gray-500">{issues.length} issues · {totalPoints} pts</span>
          </div>
        </div>
        <div
          className={`p-4 min-h-[400px] ${isDragOver ? 'bg-blue-50' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {issues.map(issue => (
            <IssueCard key={issue.id} issue={issue} onSelect={onIssueSelect} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Issue detail modal
const IssueDetailModal = ({ issue, onClose }) => {
  if (!issue) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <IssueTypeBadge type={issue.type} />
            <span className="text-sm text-gray-500">{issue.key}</span>
            <button className="text-sm text-blue-600 hover:underline">Edit</button>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex">
          <div className="flex-1 p-6 overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">{issue.summary}</h2>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600">{issue.description}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Attachments</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Drop files here or click to upload</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Activity</h3>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <UserAvatar user={issue.reporter} />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{issue.reporter.name}</span>
                        <span className="text-xs text-gray-500">2 hours ago</span>
                      </div>
                      <p className="text-sm text-gray-700">Changed status from To Do to In Progress</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <textarea
                placeholder="Add a comment..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
              <div className="flex justify-end mt-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Comment
                </button>
              </div>
            </div>
          </div>
          
          <div className="w-80 bg-gray-50 p-6 border-l">
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-medium text-gray-500 uppercase mb-3">Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Assignee</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <UserAvatar user={issue.assignee} />
                      <span className="text-sm">{issue.assignee.name}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Reporter</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <UserAvatar user={issue.reporter} />
                      <span className="text-sm">{issue.reporter.name}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Priority</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <PriorityIcon priority={issue.priority} />
                      <span className="text-sm capitalize">{issue.priority}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Story Points</label>
                    <div className="text-sm mt-1">{issue.storyPoints}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Labels</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {issue.labels.map((label, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded">
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xs font-medium text-gray-500 uppercase mb-3">Time Tracking</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Logged</span>
                    <span>{issue.timeTracking.logged}h</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Remaining</span>
                    <span>{issue.timeTracking.remaining}h</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Original Estimate</span>
                    <span>{issue.timeTracking.estimated}h</span>
                  </div>
                  <button className="w-full mt-2 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                    Log Work
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-xs font-medium text-gray-500 uppercase mb-3">Dates</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Created</span>
                    <span>{issue.createdAt}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Due Date</span>
                    <span className="text-orange-600">{issue.dueDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main board component
const ScrumBoard = () => {
  const [issues] = useState(mockIssues);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterMine, setFilterMine] = useState('All Sites');
  const [filterPriority, setFilterPriority] = useState('All');
  const [onlyMyIssues, setOnlyMyIssues] = useState(false);
  const myUserId = 1; // Simulate current user (Rajesh Kumar)

  const columns = [
    { title: 'To Do', status: 'todo' },
    { title: 'In Progress', status: 'inprogress' },
    { title: 'In Review', status: 'inreview' },
    { title: 'Done', status: 'done' }
  ];

  // Filtering logic
  const filteredIssues = issues.filter(issue => {
    const matchesType = filterType === 'All' || issue.type === filterType;
    const matchesMine = filterMine === 'All Sites' || issue.mine === filterMine;
    const matchesPriority = filterPriority === 'All' || issue.priority.toLowerCase() === filterPriority.toLowerCase();
    const matchesSearch =
      issue.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.mine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUser = !onlyMyIssues || issue.assignee.id === myUserId;
    return matchesType && matchesMine && matchesPriority && matchesSearch && matchesUser;
  });

  const getIssuesByStatus = (status) => {
    return filteredIssues.filter(issue => issue.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Main Board Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-semibold">Scrum Board</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span className="font-medium">{mockSprint.name}</span>
                  <span>·</span>
                  <span>{mockSprint.startDate} - {mockSprint.endDate}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                  Complete Sprint
                </button>
                <button 
                  onClick={() => console.log('Create issue clicked')}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Issue</span>
                </button>
              </div>
            </div>
          </div>
        </header>
        {/* Board columns */}
        <div className="flex-1 overflow-x-auto">
          <div className="p-6">
            <div className="flex space-x-6" style={{ minWidth: '1000px' }}>
              {columns.map(column => (
                <BoardColumn
                  key={column.status}
                  title={column.title}
                  status={column.status}
                  issues={getIssuesByStatus(column.status)}
                  onIssueSelect={setSelectedIssue}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Issue detail modal */}
        {selectedIssue && (
          <IssueDetailModal
            issue={selectedIssue}
            onClose={() => setSelectedIssue(null)}
          />
        )}
      </div>
      {/* Right Filter Panel */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 z-50 shadow-2xl flex flex-col">
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Filter size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Filters</h3>
              <p className="text-sm text-gray-600">Refine compliance issues</p>
            </div>
          </div>
          {/* Search */}
          <div className="relative mb-6">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search issues..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {/* Issue Type Filter */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText size={16} className="text-blue-500" />
              Issue Type
            </h4>
            <div className="space-y-2">
              {['All', 'Compliance', 'Task', 'Bug', 'Story'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${filterType === type ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          {/* Mine Location Filter */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Building2 size={16} className="text-blue-500" />
              Mine Location
            </h4>
            <div className="space-y-2">
              {['All Sites', 'Gua Main Mine', 'Gua West Mine', 'Gua East Mine', 'Rourkela Coal Mine', 'Durg Limestone Mine'].map(mine => (
                <button
                  key={mine}
                  onClick={() => setFilterMine(mine)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${filterMine === mine ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}
                >
                  {mine}
                </button>
              ))}
            </div>
          </div>
          {/* Priority Filter */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle size={16} className="text-blue-500" />
              Priority
            </h4>
            <div className="space-y-2">
              {['All', 'Highest', 'High', 'Medium', 'Low'].map(priority => (
                <button
                  key={priority}
                  onClick={() => setFilterPriority(priority)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${filterPriority === priority ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>
          {/* Only My Issues Toggle */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <User size={16} className="text-blue-500" />
              Only My Issues
            </h4>
            <button
              onClick={() => setOnlyMyIssues(v => !v)}
              className={`w-full p-3 rounded-lg text-left transition-all ${onlyMyIssues ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}
            >
              {onlyMyIssues ? 'Showing only issues assigned to you' : 'Show all issues'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrumBoard;