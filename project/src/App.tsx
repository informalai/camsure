import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Board from './components/Board/Board';
import Team from './components/Team/Team';
import CreateTicketModal from './components/Modals/CreateTicketModal';
import TicketDetailModal from './components/Modals/TicketDetailModal';
import { mockUsers, mockTickets } from './data/mockData';
import { Ticket } from './types';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [users] = useState(mockUsers);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const currentUser = users[0]; // Mock current user

  const handleCreateTicket = (ticketData: Partial<Ticket>) => {
    const newTicket: Ticket = {
      id: Date.now().toString(),
      title: ticketData.title || '',
      description: ticketData.description || '',
      status: 'todo',
      priority: ticketData.priority || 'medium',
      assigneeId: ticketData.assigneeId,
      reporterId: currentUser.id,
      projectId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: ticketData.dueDate,
      comments: [],
      tags: ticketData.tags || [],
      estimatedHours: ticketData.estimatedHours,
      loggedHours: 0
    };

    setTickets([...tickets, newTicket]);
    setShowCreateModal(false);
  };

  const handleUpdateTicket = (ticketId: string, updates: Partial<Ticket>) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, ...updates, updatedAt: new Date() }
        : ticket
    ));
    
    // Update selected ticket if it's the one being updated
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, ...updates, updatedAt: new Date() });
    }
  };

  const handleDeleteTicket = (ticketId: string) => {
    setTickets(tickets.filter(ticket => ticket.id !== ticketId));
  };

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowDetailModal(true);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard tickets={tickets} users={users} />;
      case 'board':
        return (
          <Board
            tickets={tickets}
            users={users}
            onTicketClick={handleTicketClick}
            onCreateTicket={() => setShowCreateModal(true)}
          />
        );
      case 'team':
        return <Team users={users} />;
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Settings</h1>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-gray-600">Settings panel coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard tickets={tickets} users={users} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeView={activeView}
        onViewChange={setActiveView}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header user={currentUser} />

        {/* Content */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>

      {/* Modals */}
      <CreateTicketModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateTicket}
        users={users}
      />

      <TicketDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        ticket={selectedTicket}
        users={users}
        onUpdateTicket={handleUpdateTicket}
        onDeleteTicket={handleDeleteTicket}
      />
    </div>
  );
}

export default App;