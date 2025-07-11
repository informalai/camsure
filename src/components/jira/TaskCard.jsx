import React from 'react';
import { User, FileText, MessageSquare, AlertCircle, MapPin } from 'lucide-react';

const TaskCard = ({ task, onSelectTask }) => {

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 1: return 'bg-red-500';
            case 2: return 'bg-yellow-500';
            case 3: return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    const isOverdue = (deadline) => {
        return new Date(deadline) < new Date();
    };

    return (
        <div
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelectTask(task)}
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
                <span className={`px-2 py-1 rounded ${task.conditionType === 'Environmental' ? 'bg-green-100 text-green-800' :
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
    )
};

export default TaskCard; 