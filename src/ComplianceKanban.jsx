import React, { useState, useEffect } from 'react';
import { Plus, User, Calendar, AlertCircle, CheckCircle, FileText, MessageSquare, Eye, Clock, MapPin, Filter, List, UserCheck, Tag, Shield, Paperclip } from 'lucide-react';
import guaComplianceData from './components/kanban/gua-data.json';
import FilterPanel from './components/FilterPanel';

const ComplianceKanban = ({ tasks }) => {
  const [localTasks, setLocalTasks] = useState(tasks);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [rightPanelExpanded, setRightPanelExpanded] = useState(false);
  const [kanbanFilters, setKanbanFilters] = useState({});
  const [newTask, setNewTask] = useState({
    title: '',
    leaseName: '',
    area: '',
    documentName: '',
    conditionType: '',
    shortenedConditionText: '',
    conditionText: '',
    priority: 2,
    assignedTo: '',
    deadline: ''
  });

  // Use the actual kanban data from JSON file
  const complianceData = guaComplianceData;

  const kanbanFilterConfig = [
    { title: 'Status', key: 'column', icon: 'List' },
    { title: 'Assignee', key: 'assignedTo', icon: 'User' },
    { title: 'Assigned By', key: 'assignedBy', icon: 'UserCheck' },
    { title: 'Priority', key: 'priority', icon: 'CheckCircle' },
    { title: 'Lease Name', key: 'leaseName', icon: 'MapPin' },
    { title: 'Document Type', key: 'documentName', icon: 'FileText' },
    { title: 'Condition Type', key: 'conditionType', icon: 'Tag' },
    { title: 'Validation Status', key: 'validationStatus', icon: 'Shield' },
    { title: 'Task Status', key: 'taskStatus', icon: 'Clock' }, // Computed: overdue/upcoming/ontime
    { title: 'Evidence Status', key: 'evidenceStatus', icon: 'Paperclip' }, // Computed: has/none
    { title: 'Comments Status', key: 'commentsStatus', icon: 'MessageSquare' }, // Computed: has/none
    { title: 'Date Range', key: 'dateRange', icon: 'Calendar' }, // Computed: this week/month/overdue
  ];

  const filteredTasks = React.useMemo(() => {
    return tasks.filter(task => {
      const { 
        searchTerm, 
        column, 
        assignedTo, 
        assignedBy,
        priority, 
        leaseName, 
        documentName, 
        conditionType, 
        validationStatus,
        taskStatus,
        evidenceStatus,
        commentsStatus,
        dateRange
      } = kanbanFilters;
      
      // Search term filter
      if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Basic property filters
      if (column && task.column !== column) return false;
      if (assignedTo && task.assignedTo !== assignedTo) return false;
      if (assignedBy && task.assignedBy !== assignedBy) return false;
      if (priority && task.priority !== priority) return false;
      if (leaseName && task.leaseName !== leaseName) return false;
      if (documentName && task.documentName !== documentName) return false;
      if (conditionType && task.conditionType !== conditionType) return false;
      if (validationStatus && task.validationStatus !== validationStatus) return false;
      
      // Computed filters
      
      // Task Status (overdue/upcoming/ontime)
      if (taskStatus) {
        const today = new Date();
        const deadline = new Date(task.deadline);
        const isOverdue = deadline < today && task.column !== 'completed';
        const isUpcoming = deadline > today && (deadline - today) <= 7 * 24 * 60 * 60 * 1000; // Next 7 days
        
        if (taskStatus === 'overdue' && !isOverdue) return false;
        if (taskStatus === 'upcoming' && !isUpcoming) return false;
        if (taskStatus === 'ontime' && (isOverdue || isUpcoming)) return false;
      }
      
      // Evidence Status
      if (evidenceStatus) {
        const hasEvidence = task.evidence && task.evidence.length > 0;
        if (evidenceStatus === 'has' && !hasEvidence) return false;
        if (evidenceStatus === 'none' && hasEvidence) return false;
      }
      
      // Comments Status
      if (commentsStatus) {
        const hasComments = task.comments && task.comments.length > 0;
        if (commentsStatus === 'has' && !hasComments) return false;
        if (commentsStatus === 'none' && hasComments) return false;
      }
      
      // Date Range
      if (dateRange) {
        const today = new Date();
        const taskDate = new Date(task.deadline);
        const daysDiff = Math.ceil((taskDate - today) / (1000 * 60 * 60 * 24));
        
        if (dateRange === 'overdue' && daysDiff >= 0) return false;
        if (dateRange === 'thisWeek' && (daysDiff < 0 || daysDiff > 7)) return false;
        if (dateRange === 'thisMonth' && (daysDiff < 0 || daysDiff > 30)) return false;
        if (dateRange === 'future' && daysDiff < 30) return false;
      }
      
      return true;
    });
  }, [tasks, kanbanFilters]);

  useEffect(() => {
    setLocalTasks(filteredTasks);
  }, [filteredTasks]);

  // Helper functions for cascading dropdowns
  const getAvailableAreas = () => {
    if (!newTask.leaseName) return [];
    return Object.keys(complianceData[newTask.leaseName] || {});
  };

  const getAvailableDocuments = () => {
    if (!newTask.leaseName || !newTask.area) return [];
    return Object.keys(complianceData[newTask.leaseName]?.[newTask.area] || {});
  };

  const getAvailableConditionTypes = () => {
    if (!newTask.leaseName || !newTask.area || !newTask.documentName) return [];
    return Object.keys(complianceData[newTask.leaseName]?.[newTask.area]?.[newTask.documentName] || {});
  };

  const getAvailableShortenedConditions = () => {
    if (!newTask.leaseName || !newTask.area || !newTask.documentName || !newTask.conditionType) return [];
    const conditions = complianceData[newTask.leaseName]?.[newTask.area]?.[newTask.documentName]?.[newTask.conditionType];
    return Array.isArray(conditions) ? conditions : [];
  };



  // Reset dependent fields when parent changes
  const handleLeaseNameChange = (leaseName) => {
    setNewTask({
      ...newTask,
      leaseName,
      area: '',
      documentName: '',
      conditionType: '',
      shortenedConditionText: '',
      conditionText: ''
    });
  };

  const handleAreaChange = (area) => {
    setNewTask({
      ...newTask,
      area,
      documentName: '',
      conditionType: '',
      shortenedConditionText: '',
      conditionText: ''
    });
  };

  const handleDocumentChange = (documentName) => {
    setNewTask({
      ...newTask,
      documentName,
      conditionType: '',
      shortenedConditionText: '',
      conditionText: ''
    });
  };

  const handleConditionTypeChange = (conditionType) => {
    setNewTask({
      ...newTask,
      conditionType,
      shortenedConditionText: '',
      conditionText: ''
    });
  };

  const handleShortenedConditionChange = (shortenedConditionText) => {
    // Since conditions are stored as arrays, the condition text is the same as the selected condition
    setNewTask({
      ...newTask,
      shortenedConditionText,
      conditionText: shortenedConditionText
    });
  };

  const columns = [
    { id: 'assigned', title: 'Assigned', color: 'bg-blue-100', textColor: 'text-blue-700' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-yellow-100', textColor: 'text-yellow-700' },
    { id: 'evidence-submitted', title: 'Evidence Submitted', color: 'bg-purple-100', textColor: 'text-purple-700' },
    { id: 'completed', title: 'Completed', color: 'bg-green-100', textColor: 'text-green-700' },
    { id: 'rejected', title: 'Rejected/Reopened', color: 'bg-red-100', textColor: 'text-red-700' }
  ];

  const getTasksByColumn = (columnId) => {
    return localTasks.filter(task => task.column === columnId);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1: return 'bg-red-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 1: return 'High';
      case 2: return 'Medium';
      case 3: return 'Low';
      default: return 'Medium';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  const isOverdue = (deadline) => {
    return new Date(deadline) < new Date();
  };

  const MilestoneProgressBar = ({ task }) => {
    const milestones = [
      { key: 'createDate', label: 'Created', date: task.createDate, column: 'assigned' },
      { key: 'deadline', label: 'Due', date: task.deadline, column: 'assigned' },
      { key: 'completionDate', label: 'Completed', date: task.completionDate, column: 'evidence-submitted' },
      { key: 'approvedDate', label: 'Approved', date: task.approvedDate, column: 'completed' },
      { key: 'validationDate', label: 'Validated', date: task.validationDate, column: 'completed' },
      { key: 'closureDate', label: 'Closed', date: task.closureDate, column: 'completed' },
      { key: 'reopenedDate', label: 'Reopened', date: task.reopenedDate, column: 'rejected' }
    ];

    // Calculate progress based on workflow position, not just completed milestones
    const getWorkflowProgress = () => {
      const columnOrder = ['assigned', 'in-progress', 'evidence-submitted', 'completed', 'rejected'];
      const currentIndex = columnOrder.indexOf(task.column);
      
      if (task.column === 'rejected') {
        return 60; // Show as partial progress for rejected items
      }
      
      // Calculate progress based on current column position
      const baseProgress = ((currentIndex + 1) / (columnOrder.length - 1)) * 100; // Exclude rejected from normal flow
      return Math.min(baseProgress, 100);
    };

    const progress = getWorkflowProgress();

    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress Timeline</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{Math.round(progress)}% Complete</span>
            <div className={`px-2 py-1 rounded text-xs ${
              task.column === 'completed' ? 'bg-green-100 text-green-800' :
              task.column === 'rejected' ? 'bg-red-100 text-red-800' :
              task.column === 'evidence-submitted' ? 'bg-purple-100 text-purple-800' :
              task.column === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {task.column.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </div>
          </div>
        </div>
        
        <div className="relative">
          {/* Progress bar background */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                task.column === 'completed' ? 'bg-green-500' :
                task.column === 'rejected' ? 'bg-red-500' :
                'bg-blue-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Milestone markers */}
          <div className="flex justify-between text-xs">
            {milestones.map((milestone) => {
              // Determine if this milestone should be highlighted based on workflow progress
              const shouldHighlight = milestone.date || 
                (task.column === 'in-progress' && ['createDate', 'deadline'].includes(milestone.key)) ||
                (task.column === 'evidence-submitted' && ['createDate', 'deadline', 'completionDate'].includes(milestone.key)) ||
                (task.column === 'completed' && !['reopenedDate'].includes(milestone.key)) ||
                (task.column === 'rejected' && milestone.key === 'reopenedDate');

              return (
                <div key={milestone.key} className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    shouldHighlight
                      ? milestone.key === 'reopenedDate' 
                        ? 'bg-red-500 border-red-500 animate-pulse' 
                        : milestone.key === 'deadline' && isOverdue(milestone.date) && !task.completionDate
                        ? 'bg-red-500 border-red-500'
                        : 'bg-green-500 border-green-500'
                      : 'bg-white border-gray-300'
                  } mb-1`}>
                    {shouldHighlight && (
                      <div className="w-full h-full rounded-full bg-white opacity-30" />
                    )}
                  </div>
                  <span className={`text-xs transition-colors duration-200 ${
                    shouldHighlight ? 'text-gray-700 font-medium' : 'text-gray-400'
                  }`}>
                    {milestone.label}
                  </span>
                  {milestone.date && (
                    <span className="text-xs text-gray-500 mt-1">
                      {formatDate(milestone.date)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Status change indicator */}
        {task.reopenedDate && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs">
            <span className="text-red-700 font-medium">⚠️ Task was reopened on {formatDate(task.reopenedDate)}</span>
          </div>
        )}
      </div>
    );
  };

  const moveTask = (taskId, newColumn) => {
    const currentDate = new Date().toISOString().split('T')[0];
    
    setLocalTasks(localTasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, column: newColumn };
        
        // Auto-populate dates based on status changes
        switch (newColumn) {
          case 'in-progress':
            // When moving to in-progress, ensure creation date exists
            if (!updatedTask.createDate) {
              updatedTask.createDate = currentDate;
            }
            break;
            
          case 'evidence-submitted':
            // When evidence is submitted, mark as completed
            if (!updatedTask.completionDate) {
              updatedTask.completionDate = currentDate;
            }
            break;
            
          case 'completed':
            // When task is completed, set completion, approval, validation, and closure dates
            if (!updatedTask.completionDate) {
              updatedTask.completionDate = currentDate;
            }
            if (!updatedTask.approvedDate) {
              updatedTask.approvedDate = currentDate;
            }
            if (!updatedTask.validationDate) {
              updatedTask.validationDate = currentDate;
            }
            if (!updatedTask.closureDate) {
              updatedTask.closureDate = currentDate;
            }
            updatedTask.validationStatus = 'validated';
            break;
            
          case 'rejected':
            // When task is rejected/reopened
            updatedTask.reopenedDate = currentDate;
            updatedTask.validationStatus = 'rejected';
            // Clear future dates when reopening
            updatedTask.validationDate = null;
            updatedTask.closureDate = null;
            break;
            
          case 'assigned':
            // When task is reassigned, clear completion-related dates
            updatedTask.completionDate = null;
            updatedTask.approvedDate = null;
            updatedTask.validationDate = null;
            updatedTask.closureDate = null;
            updatedTask.reopenedDate = null;
            updatedTask.validationStatus = 'pending';
            break;
            
          default:
            break;
        }
        
        return updatedTask;
      }
      return task;
    }));
  };

  const createTask = () => {
    if (!newTask.leaseName || !newTask.area || !newTask.documentName || !newTask.conditionType || !newTask.shortenedConditionText || !newTask.assignedTo) {
      alert('Please fill in all required fields');
      return;
    }

    const task = {
      id: Date.now().toString(),
      title: newTask.shortenedConditionText, // Use shortened condition text as title
      leaseName: newTask.leaseName,
      area: parseFloat(newTask.area),
      documentName: newTask.documentName,
      conditionType: newTask.conditionType,
      shortenedConditionText: newTask.shortenedConditionText,
      conditionText: newTask.conditionText,
      priority: newTask.priority,
      assignedTo: newTask.assignedTo,
      assignedBy: 'Current User',
      createDate: new Date().toISOString().split('T')[0],
      deadline: newTask.deadline,
      completionDate: null,
      approvedDate: null,
      validationDate: null,
      closureDate: null,
      reopenedDate: null,
      evidence: [],
      comments: [],
      validationStatus: 'pending',
      column: 'assigned'
    };

    setLocalTasks([...localTasks, task]);
    setNewTask({
      title: '',
      leaseName: '',
      area: '',
      documentName: '',
      conditionType: '',
      shortenedConditionText: '',
      conditionText: '',
      priority: 2,
      assignedTo: '',
      deadline: ''
    });
    setShowTaskForm(false);
  };

  const TaskCard = ({ task }) => (
    <div
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => setSelectedTask(task)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 flex-1">{task.title}</h3>
        <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)} ml-2`} />
      </div>
      
      <div className="text-xs text-gray-600 mb-2">
        <div className="flex items-center gap-1 mb-1">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{task.leaseName}</span>
        </div>
        <div className="flex items-center gap-1">
          <User className="w-3 h-3" />
          <span>{task.assignedTo}</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs mb-2">
        <span className="text-gray-500">Area: {task.area}km²</span>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className={`px-2 py-1 rounded ${
          task.conditionType === 'Environmental' ? 'bg-green-100 text-green-800' :
          task.conditionType === 'Regulatory' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {task.conditionType}
        </span>
        
        <div className="flex items-center gap-2">
          {task.evidence.length > 0 && (
            <div className="flex items-center gap-1 text-blue-600">
              <FileText className="w-3 h-3" />
              <span>{task.evidence.length}</span>
            </div>
          )}
          {task.comments.length > 0 && (
            <div className="flex items-center gap-1 text-gray-500">
              <MessageSquare className="w-3 h-3" />
              <span>{task.comments.length}</span>
            </div>
          )}
        </div>
      </div>

      {isOverdue(task.deadline) && (
        <div className="mt-2 flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="w-3 h-3" />
          <span>Overdue</span>
        </div>
      )}
    </div>
  );

  const TaskModal = ({ task, onClose }) => {
    const [newComment, setNewComment] = useState('');
    const [newEvidence, setNewEvidence] = useState('');

    if (!task) return null;

    const addComment = () => {
      if (newComment.trim()) {
        task.comments.push(`${new Date().toLocaleString()}: ${newComment.trim()}`);
        setNewComment('');
        setLocalTasks([...localTasks]);
      }
    };

    const addEvidence = () => {
      if (newEvidence.trim()) {
        task.evidence.push(newEvidence.trim());
        setNewEvidence('');
        setLocalTasks([...localTasks]);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lease Name</label>
                <p className="text-sm text-gray-600">{task.leaseName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                <p className="text-sm text-gray-600">{task.area} km²</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition Type</label>
                <p className="text-sm text-gray-600">{task.conditionType}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
                  <span className="text-sm text-gray-600">{getPriorityText(task.priority)}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                <p className="text-sm text-gray-600">{task.assignedTo}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned By</label>
                <p className="text-sm text-gray-600">{task.assignedBy}</p>
              </div>
            </div>

            <MilestoneProgressBar task={task} />

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status Actions</label>
              <p className="text-xs text-gray-500 mb-3">Click any status to move the task and automatically update timeline dates</p>
              <div className="flex gap-2 flex-wrap">
                {columns.map(col => (
                  <button
                    key={col.id}
                    onClick={() => {
                      moveTask(task.id, col.id);
                      // Update the selected task to reflect changes immediately
                      setSelectedTask({...task, column: col.id});
                    }}
                    className={`px-3 py-1 rounded text-xs transition-all duration-200 ${
                      task.column === col.id 
                        ? `${col.color} ${col.textColor} border-2 border-current font-medium` 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                    }`}
                  >
                    {col.title}
                    {task.column === col.id && (
                      <span className="ml-1">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Evidence Files</label>
              <div className="space-y-2">
                {task.evidence.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700 flex-1">{file}</span>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add evidence file name..."
                    value={newEvidence}
                    onChange={(e) => setNewEvidence(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                  <button
                    onClick={addEvidence}
                    className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {task.comments.map((comment, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded text-sm text-gray-700">
                    {comment}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Add comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addComment()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <button
                  onClick={addComment}
                  className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">AI Validation:</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  task.validationStatus === 'validated' ? 'bg-green-100 text-green-800' :
                  task.validationStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {task.validationStatus}
                </span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    const currentDate = new Date().toISOString().split('T')[0];
                    const updatedTask = {
                      ...task,
                      validationStatus: 'rejected',
                      reopenedDate: currentDate,
                      validationDate: null,
                      closureDate: null,
                      column: 'rejected'
                    };
                    setLocalTasks(localTasks.map(t => t.id === task.id ? updatedTask : t));
                    setSelectedTask(updatedTask);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Reject & Reopen
                </button>
                <button 
                  onClick={() => {
                    const currentDate = new Date().toISOString().split('T')[0];
                    const updatedTask = {
                      ...task,
                      validationStatus: 'validated',
                      validationDate: currentDate,
                      closureDate: currentDate,
                      completionDate: task.completionDate || currentDate,
                      approvedDate: task.approvedDate || currentDate,
                      column: 'completed'
                    };
                    setLocalTasks(localTasks.map(t => t.id === task.id ? updatedTask : t));
                    setSelectedTask(updatedTask);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Validate & Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const NewTaskForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Create New Compliance Task</h3>
        <div className="space-y-4">
          
          {/* Lease Name Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lease Name *</label>
            <select
              value={newTask.leaseName}
              onChange={(e) => handleLeaseNameChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Lease Name</option>
              {Object.keys(complianceData).map(lease => (
                <option key={lease} value={lease}>{lease}</option>
              ))}
            </select>
          </div>

          {/* Area Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Area (km²) *</label>
            <select
              value={newTask.area}
              onChange={(e) => handleAreaChange(e.target.value)}
              disabled={!newTask.leaseName}
              className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
            >
              <option value="">Select Area</option>
              {getAvailableAreas().map(area => (
                <option key={area} value={area}>{area} km²</option>
              ))}
            </select>
          </div>

          {/* Document Name Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Document Name *</label>
            <select
              value={newTask.documentName}
              onChange={(e) => handleDocumentChange(e.target.value)}
              disabled={!newTask.area}
              className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
            >
              <option value="">Select Document</option>
              {getAvailableDocuments().map(doc => (
                <option key={doc} value={doc}>{doc}</option>
              ))}
            </select>
          </div>

          {/* Condition Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Condition Type *</label>
            <select
              value={newTask.conditionType}
              onChange={(e) => handleConditionTypeChange(e.target.value)}
              disabled={!newTask.documentName}
              className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
            >
              <option value="">Select Condition Type</option>
              {getAvailableConditionTypes().map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Shortened Condition Text Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Condition Summary *</label>
            <select
              value={newTask.shortenedConditionText}
              onChange={(e) => handleShortenedConditionChange(e.target.value)}
              disabled={!newTask.conditionType}
              className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
            >
              <option value="">Select Condition</option>
              {getAvailableShortenedConditions().map(condition => (
                <option key={condition} value={condition}>{condition}</option>
              ))}
            </select>
          </div>

          {/* Condition Text Display */}
          {newTask.conditionText && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Condition Text</label>
              <div className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-sm text-gray-700 max-h-20 overflow-y-auto">
                {newTask.conditionText}
              </div>
            </div>
          )}

          {/* Priority and Assignment */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value={1}>High</option>
                <option value={2}>Medium</option>
                <option value={3}>Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To *</label>
              <input
                type="text"
                placeholder="e.g., John Smith"
                value={newTask.assignedTo}
                onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
            <input
              type="date"
              value={newTask.deadline}
              onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <button
              onClick={() => setShowTaskForm(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={createTask}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${rightPanelExpanded ? 'mr-80' : 'mr-16'}`}
      >
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">SAIL Kanban Board</h1>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Manage compliance tasks across all the lease</p>
              
              {/* Metrics Box */}
              <div className="flex gap-4 mr-4">
                <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-4 text-center min-w-[120px]">
                  <div className="text-2xl font-bold text-red-600">
                    {localTasks.filter(task => {
                      const deadline = new Date(task.deadline);
                      const today = new Date();
                      return deadline < today && task.column !== 'completed';
                    }).length}
                  </div>
                  <div className="text-xs text-red-700 font-medium">Overdue Tasks</div>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-4 text-center min-w-[120px]">
                  <div className="text-2xl font-bold text-yellow-600">
                    {localTasks.filter(task => {
                      const deadline = new Date(task.deadline);
                      const today = new Date();
                      const daysUntilDeadline = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
                      return daysUntilDeadline >= 0 && daysUntilDeadline <= 7;
                    }).length}
                  </div>
                  <div className="text-xs text-yellow-700 font-medium">Due This Week</div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 text-center min-w-[120px]">
                  <div className="text-2xl font-bold text-purple-600">
                    {localTasks.filter(task => !task.evidence || task.evidence.length === 0).length}
                  </div>
                  <div className="text-xs text-purple-700 font-medium">Evidence Pending</div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4 text-center min-w-[120px]">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round((localTasks.filter(task => task.column === 'completed').length / localTasks.length) * 100)}%
                  </div>
                  <div className="text-xs text-green-700 font-medium">Completion Rate</div>
                </div>
              </div>
              
              <button
                onClick={() => setShowTaskForm(true)}
                className="flex items-center gap-2 px-4 py-2 border-2 border-black text-black rounded-md hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                New Task
              </button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4 overflow-x-auto pb-4">
            {columns.map((column) => (
              <div key={column.id} className="min-w-full flex-shrink-0">
                <div className={`${column.color} p-4 rounded-t-lg border-b-2 border-gray-300`}>
                  <h2 className={`font-semibold ${column.textColor} text-lg`}>{column.title}</h2>
                  <span className="text-sm text-gray-600">
                    {getTasksByColumn(column.id).length} tasks
                  </span>
                </div>
                <div className="bg-white p-4 rounded-b-lg border-2 border-gray-200 min-h-[600px]">
                  <div className="space-y-3">
                    {getTasksByColumn(column.id).map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                    {getTasksByColumn(column.id).length === 0 && (
                      <div className="text-center text-gray-500 py-8">
                        <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No tasks in this column</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
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
            <FilterPanel
              isOpen={true}
              onClose={() => {}} // No close function since it's hover-based
              onFilterChange={setKanbanFilters}
              items={tasks}
              filterConfig={kanbanFilterConfig}
              searchPlaceholder="Search tasks..."
              embedded={true}
            />
          )}
        </div>
      </div>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}

      {showTaskForm && <NewTaskForm />}
    </div>
  );
};

export default ComplianceKanban;