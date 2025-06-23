import React from 'react';
import { Clock, User, MessageCircle, Paperclip } from 'lucide-react';
import { Ticket, User as UserType } from '../../types';

interface TicketCardProps {
  ticket: Ticket;
  assignee?: UserType;
  onClick: () => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, assignee, onClick }) => {
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

  const isOverdue = ticket.dueDate && new Date(ticket.dueDate) < new Date();

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 flex-1">
          {ticket.title}
        </h3>
        <div className={`ml-2 px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
          {ticket.priority}
        </div>
      </div>

      {/* Description */}
      {ticket.description && (
        <p className="text-gray-600 text-xs line-clamp-2 mb-3">
          {ticket.description}
        </p>
      )}

      {/* Tags */}
      {ticket.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {ticket.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
            >
              {tag}
            </span>
          ))}
          {ticket.tags.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              +{ticket.tags.length - 2}
            </span>
          )}
        </div>
      )}

      {/* Attachments */}
      {ticket.attachments && ticket.attachments.length > 0 && (
        <div className="flex items-center gap-2 mb-3">
          <Paperclip className="w-3 h-3 text-gray-500" />
          <div className="flex items-center gap-1 overflow-hidden">
            {ticket.attachments.slice(0, 3).map((uri, idx) => (
              <img
                key={idx}
                src={uri}
                alt="attachment thumbnail"
                className="w-8 h-8 rounded object-cover border border-gray-200"
              />
            ))}
            {ticket.attachments.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-600 rounded px-1">
                +{ticket.attachments.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Meta Information */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-3">
          {/* Comments */}
          {ticket.comments.length > 0 && (
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-3 h-3" />
              <span>{ticket.comments.length}</span>
            </div>
          )}

          {/* Due Date */}
          {ticket.dueDate && (
            <div className={`flex items-center space-x-1 ${isOverdue ? 'text-red-600' : ''}`}>
              <Clock className="w-3 h-3" />
              <span>{ticket.dueDate.toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Assignee */}
        {assignee && (
          <div className="flex items-center space-x-1">
            <img
              src={assignee.avatar}
              alt={assignee.name}
              className="w-5 h-5 rounded-full"
            />
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {ticket.estimatedHours && ticket.loggedHours !== undefined && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{ticket.loggedHours}h / {ticket.estimatedHours}h</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-blue-500 h-1 rounded-full"
              style={{
                width: `${Math.min((ticket.loggedHours / ticket.estimatedHours) * 100, 100)}%`
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketCard;