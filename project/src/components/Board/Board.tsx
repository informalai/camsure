import React, { useState } from 'react';
import { Plus, Filter, Search } from 'lucide-react';
import TicketCard from './TicketCard';
import { Ticket, User } from '../../types';

interface BoardProps {
  tickets: Ticket[];
  users: User[];
  onTicketClick: (ticket: Ticket) => void;
  onCreateTicket: () => void;
}

const Board: React.FC<BoardProps> = ({ 
  tickets, 
  users, 
  onTicketClick, 
  onCreateTicket 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterAssignee, setFilterAssignee] = useState('all');

  const columns = [
    { id: 'backlog', title: 'Backlog', color: 'bg-gray-50 border-gray-200' },
    { id: 'todo', title: 'To Do', color: 'bg-blue-50 border-blue-200' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-yellow-50 border-yellow-200' },
    { id: 'review', title: 'Review', color: 'bg-purple-50 border-purple-200' },
    { id: 'done', title: 'Done', color: 'bg-green-50 border-green-200' },
  ];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    const matchesAssignee = filterAssignee === 'all' || ticket.assigneeId === filterAssignee;
    
    return matchesSearch && matchesPriority && matchesAssignee;
  });

  const getTicketsForColumn = (columnId: string) => {
    return filteredTickets.filter(ticket => ticket.status === columnId);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project Board</h1>
          <p className="text-gray-600 mt-1">Manage and track your project tickets</p>
        </div>
        
        <button
          onClick={onCreateTicket}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Ticket</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Priorities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          value={filterAssignee}
          onChange={(e) => setFilterAssignee(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Assignees</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>

      {/* Board */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 overflow-auto">
        {columns.map(column => {
          const columnTickets = getTicketsForColumn(column.id);
          
          return (
            <div key={column.id} className={`rounded-lg border-2 border-dashed ${column.color} p-4`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">{column.title}</h2>
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {columnTickets.length}
                </span>
              </div>
              
              <div className="space-y-3">
                {columnTickets.map(ticket => {
                  const assignee = users.find(u => u.id === ticket.assigneeId);
                  
                  return (
                    <TicketCard
                      key={ticket.id}
                      ticket={ticket}
                      assignee={assignee}
                      onClick={() => onTicketClick(ticket)}
                    />
                  );
                })}
                
                {columnTickets.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">No tickets</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;