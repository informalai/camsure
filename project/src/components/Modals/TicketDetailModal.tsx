import React, { useState } from 'react';
import { 
  X, 
  User, 
  Calendar, 
  Tag, 
  Clock, 
  MessageCircle, 
  Edit3,
  Trash2,
  CheckCircle
} from 'lucide-react';
import { Ticket, User as UserType, Comment } from '../../types';

interface TicketDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: Ticket | null;
  users: UserType[];
  onUpdateTicket: (ticketId: string, updates: Partial<Ticket>) => void;
  onDeleteTicket: (ticketId: string) => void;
}

const TicketDetailModal: React.FC<TicketDetailModalProps> = ({
  isOpen,
  onClose,
  ticket,
  users,
  onUpdateTicket,
  onDeleteTicket
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assigneeId: '',
    status: 'todo',
    dueDate: '',
    estimatedHours: '',
    loggedHours: '',
    tags: ''
  });

  React.useEffect(() => {
    if (ticket) {
      setEditData({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        assigneeId: ticket.assigneeId || '',
        status: ticket.status,
        dueDate: ticket.dueDate ? ticket.dueDate.toISOString().split('T')[0] : '',
        estimatedHours: ticket.estimatedHours?.toString() || '',
        loggedHours: ticket.loggedHours?.toString() || '',
        tags: ticket.tags.join(', ')
      });
    }
  }, [ticket]);

  if (!isOpen || !ticket) return null;

  const assignee = users.find(u => u.id === ticket.assigneeId);
  const reporter = users.find(u => u.id === ticket.reporterId);

  const handleSave = () => {
    const updates = {
      ...editData,
      estimatedHours: editData.estimatedHours ? parseInt(editData.estimatedHours) : undefined,
      loggedHours: editData.loggedHours ? parseInt(editData.loggedHours) : undefined,
      dueDate: editData.dueDate ? new Date(editData.dueDate) : undefined,
      tags: editData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      assigneeId: editData.assigneeId || undefined,
      updatedAt: new Date()
    };
    
    onUpdateTicket(ticket.id, updates);
    setIsEditing(false);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        content: newComment,
        authorId: '1', // Current user
        createdAt: new Date()
      };
      
      onUpdateTicket(ticket.id, {
        comments: [...ticket.comments, comment]
      });
      setNewComment('');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'review':
        return 'bg-purple-100 text-purple-800';
      case 'todo':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold text-gray-900">
              {isEditing ? 'Edit Ticket' : ticket.title}
            </h2>
            <div className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority}
            </div>
            <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(ticket.status)}`}>
              {ticket.status.replace('-', ' ')}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {!isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this ticket?')) {
                      onDeleteTicket(ticket.id);
                      onClose();
                    }
                  }}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Description */}
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={4}
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{ticket.description || 'No description provided.'}</p>
              </div>
            )}

            {/* Comments */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Comments ({ticket.comments.length})</h3>
              
              {/* Add Comment */}
              <div className="mb-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
                >
                  Add Comment
                </button>
              </div>

              {/* Comments List */}
              <div className="space-y-3">
                {ticket.comments.map((comment) => {
                  const author = users.find(u => u.id === comment.authorId);
                  return (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        {author && (
                          <>
                            <img
                              src={author.avatar}
                              alt={author.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="font-medium text-gray-900">{author.name}</span>
                          </>
                        )}
                        <span className="text-xs text-gray-500">
                          {comment.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  );
                })}
                
                {ticket.comments.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No comments yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {isEditing ? (
              <div className="space-y-4">
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={editData.status}
                    onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="backlog">Backlog</option>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={editData.priority}
                    onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                {/* Assignee */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
                  <select
                    value={editData.assigneeId}
                    onChange={(e) => setEditData({ ...editData, assigneeId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Unassigned</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={editData.dueDate}
                    onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Hours */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estimated</label>
                    <input
                      type="number"
                      value={editData.estimatedHours}
                      onChange={(e) => setEditData({ ...editData, estimatedHours: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logged</label>
                    <input
                      type="number"
                      value={editData.loggedHours}
                      onChange={(e) => setEditData({ ...editData, loggedHours: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <input
                    type="text"
                    value={editData.tags}
                    onChange={(e) => setEditData({ ...editData, tags: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="frontend, api, urgent"
                  />
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Assignee */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Assignee</h4>
                  {assignee ? (
                    <div className="flex items-center space-x-2">
                      <img
                        src={assignee.avatar}
                        alt={assignee.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{assignee.name}</p>
                        <p className="text-xs text-gray-500">{assignee.role}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">Unassigned</p>
                  )}
                </div>

                {/* Reporter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Reporter</h4>
                  {reporter && (
                    <div className="flex items-center space-x-2">
                      <img
                        src={reporter.avatar}
                        alt={reporter.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{reporter.name}</p>
                        <p className="text-xs text-gray-500">{reporter.role}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dates */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Created</h4>
                  <p className="text-gray-900">{ticket.createdAt.toLocaleDateString()}</p>
                </div>

                {ticket.dueDate && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Due Date</h4>
                    <p className={`text-gray-900 ${
                      new Date(ticket.dueDate) < new Date() ? 'text-red-600 font-medium' : ''
                    }`}>
                      {ticket.dueDate.toLocaleDateString()}
                    </p>
                  </div>
                )}

                {/* Time Tracking */}
                {(ticket.estimatedHours || ticket.loggedHours) && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Time Tracking</h4>
                    <div className="space-y-2">
                      {ticket.estimatedHours && (
                        <p className="text-sm text-gray-700">
                          Estimated: {ticket.estimatedHours}h
                        </p>
                      )}
                      {ticket.loggedHours !== undefined && (
                        <p className="text-sm text-gray-700">
                          Logged: {ticket.loggedHours}h
                        </p>
                      )}
                      {ticket.estimatedHours && ticket.loggedHours !== undefined && (
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{
                              width: `${Math.min((ticket.loggedHours / ticket.estimatedHours) * 100, 100)}%`
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {ticket.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {ticket.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailModal;