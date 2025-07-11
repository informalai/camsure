import React, { useState } from 'react';
import { FileText, Eye } from 'lucide-react';

const TaskModal = ({ task, onClose, onUpdateTask, columns }) => {
    const [newComment, setNewComment] = useState('');
    const [newEvidence, setNewEvidence] = useState('');

    if (!task) return null;

    const addComment = () => {
        if (newComment.trim()) {
            const updatedTask = {
                ...task,
                comments: [...task.comments, `${new Date().toLocaleString()}: ${newComment.trim()}`]
            };
            onUpdateTask(updatedTask);
            setNewComment('');
        }
    };

    const addEvidence = () => {
        if (newEvidence.trim()) {
            const updatedTask = {
                ...task,
                evidence: [...task.evidence, newEvidence.trim()]
            };
            onUpdateTask(updatedTask);
            setNewEvidence('');
        }
    };

    const moveTask = (newColumn) => {
        const currentDate = new Date().toISOString().split('T')[0];
        let updatedTask = { ...task, column: newColumn };

        switch (newColumn) {
            case 'in-progress':
                if (!updatedTask.createDate) updatedTask.createDate = currentDate;
                break;
            case 'evidence-submitted':
                if (!updatedTask.completionDate) updatedTask.completionDate = currentDate;
                break;
            case 'completed':
                if (!updatedTask.completionDate) updatedTask.completionDate = currentDate;
                if (!updatedTask.approvedDate) updatedTask.approvedDate = currentDate;
                if (!updatedTask.validationDate) updatedTask.validationDate = currentDate;
                if (!updatedTask.closureDate) updatedTask.closureDate = currentDate;
                updatedTask.validationStatus = 'validated';
                break;
            case 'rejected':
                updatedTask.reopenedDate = currentDate;
                updatedTask.validationStatus = 'rejected';
                updatedTask.validationDate = null;
                updatedTask.closureDate = null;
                break;
            case 'assigned':
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
        onUpdateTask(updatedTask);
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

        const getWorkflowProgress = () => {
            const columnOrder = ['assigned', 'in-progress', 'evidence-submitted', 'completed', 'rejected'];
            const currentIndex = columnOrder.indexOf(task.column);

            if (task.column === 'rejected') {
                return 60;
            }

            const baseProgress = ((currentIndex + 1) / (columnOrder.length - 1)) * 100;
            return Math.min(baseProgress, 100);
        };

        const progress = getWorkflowProgress();

        return (
            <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>Task Timeline</span>
                    <span>{Math.round(progress)}% complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        )
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
                                    onClick={() => moveTask(col.id)}
                                    className={`px-3 py-1 rounded text-xs transition-all duration-200 ${task.column === col.id
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
                        <div className="space-y-2 max-h-40 overflow-y-auto bg-gray-50 p-3 rounded">
                            {task.comments.map((comment, index) => (
                                <p key={index} className="text-sm text-gray-700">{comment}</p>
                            ))}
                        </div>
                        <div className="flex gap-2 mt-2">
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                            <button
                                onClick={addComment}
                                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskModal; 