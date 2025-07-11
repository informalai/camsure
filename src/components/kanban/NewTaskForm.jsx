import React from 'react';

const NewTaskForm = ({ newTask, onUpdateNewTask, onCreateTask, onCancel, complianceData, error }) => {
    const availableAreas = newTask.leaseName ? Object.keys(complianceData[newTask.leaseName]?.areas || {}) : [];
    const availableDocuments = newTask.area ? Object.keys(complianceData[newTask.leaseName]?.areas[newTask.area]?.documents || {}) : [];
    const availableConditionTypes = newTask.documentName ? Object.keys(complianceData[newTask.leaseName]?.areas[newTask.area]?.documents[newTask.documentName]?.conditionTypes || {}) : [];
    const availableShortenedConditions = newTask.conditionType ? Object.keys(complianceData[newTask.leaseName]?.areas[newTask.area]?.documents[newTask.documentName]?.conditionTypes[newTask.conditionType]?.shortenedConditions || {}) : [];

    const handleInputChange = (field, value) => {
        const updatedTask = { ...newTask, [field]: value };

        if (field === 'leaseName') {
            updatedTask.area = '';
            updatedTask.documentName = '';
            updatedTask.conditionType = '';
            updatedTask.shortenedConditionText = '';
            updatedTask.conditionText = '';
        } else if (field === 'area') {
            updatedTask.documentName = '';
            updatedTask.conditionType = '';
            updatedTask.shortenedConditionText = '';
            updatedTask.conditionText = '';
        } else if (field === 'documentName') {
            updatedTask.conditionType = '';
            updatedTask.shortenedConditionText = '';
            updatedTask.conditionText = '';
        } else if (field === 'conditionType') {
            updatedTask.shortenedConditionText = '';
            updatedTask.conditionText = '';
        } else if (field === 'shortenedConditionText') {
            updatedTask.conditionText = complianceData[newTask.leaseName]?.areas[newTask.area]?.documents[newTask.documentName]?.conditionTypes[newTask.conditionType]?.shortenedConditions[value] || '';
        }

        onUpdateNewTask(updatedTask);
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-bold mb-4">Create New Compliance Task</h3>
                <div className="space-y-4">

                    {/* Lease Name Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lease Name *</label>
                        <select
                            value={newTask.leaseName}
                            onChange={(e) => handleInputChange('leaseName', e.target.value)}
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
                            onChange={(e) => handleInputChange('area', e.target.value)}
                            disabled={!newTask.leaseName}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                        >
                            <option value="">Select Area</option>
                            {availableAreas.map(area => (
                                <option key={area} value={area}>{area} km²</option>
                            ))}
                        </select>
                    </div>

                    {/* Document Name Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Document Name *</label>
                        <select
                            value={newTask.documentName}
                            onChange={(e) => handleInputChange('documentName', e.target.value)}
                            disabled={!newTask.area}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                        >
                            <option value="">Select Document</option>
                            {availableDocuments.map(doc => (
                                <option key={doc} value={doc}>{doc}</option>
                            ))}
                        </select>
                    </div>

                    {/* Condition Type Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Condition Type *</label>
                        <select
                            value={newTask.conditionType}
                            onChange={(e) => handleInputChange('conditionType', e.target.value)}
                            disabled={!newTask.documentName}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                        >
                            <option value="">Select Condition Type</option>
                            {availableConditionTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Shortened Condition Text Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Shortened Condition Text *</label>
                        <select
                            value={newTask.shortenedConditionText}
                            onChange={(e) => handleInputChange('shortenedConditionText', e.target.value)}
                            disabled={!newTask.conditionType}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                        >
                            <option value="">Select Condition</option>
                            {availableShortenedConditions.map(shortened => (
                                <option key={shortened} value={shortened}>{shortened}</option>
                            ))}
                        </select>
                    </div>

                    {/* Condition Text (Read-only) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Condition Text</label>
                        <textarea
                            readOnly
                            value={newTask.conditionText}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 h-24"
                        />
                    </div>

                    {/* Priority and Assigned To */}
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                            <select
                                value={newTask.priority}
                                onChange={(e) => handleInputChange('priority', parseInt(e.target.value, 10))}
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
                                onChange={(e) => handleInputChange('assignedTo', e.target.value)}
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
                            onChange={(e) => handleInputChange('deadline', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {error && (
                        <div className="text-red-600 bg-red-100 p-3 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4">
                        <button
                            onClick={onCancel}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onCreateTask}
                            className="flex-1 px-4 py-2 text-black font-bold border-2 border-black rounded-md hover:bg-blue-700"
                        >
                            Create Task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewTaskForm; 