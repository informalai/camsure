import React, { useState } from 'react';
import { X } from 'lucide-react';

function SettingsModal({ open, onClose, theme, setTheme, notifications, setNotifications, setToast }) {
    const [logo, setLogo] = useState(null);
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-md relative">
                <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700" onClick={onClose}>
                    <X size={22} />
                </button>
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Settings</h2>
                <div className="mb-4">
                    <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Theme</label>
                    <select
                        className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                        value={theme}
                        onChange={e => setTheme(e.target.value)}
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Notifications</label>
                    <input
                        type="checkbox"
                        checked={notifications}
                        onChange={e => setNotifications(e.target.checked)}
                        className="mr-2"
                    />
                    <span className="text-gray-700 dark:text-gray-200">Enable notifications</span>
                </div>
                <div className="mb-4">
                    <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Logo (demo only)</label>
                    <input type="file" accept="image/*" onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                            setLogo(URL.createObjectURL(e.target.files[0]));
                            setToast && setToast('Logo uploaded (demo only)');
                        }
                    }} />
                    {logo && <img src={logo} alt="Logo preview" className="mt-2 h-12" />}
                </div>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default SettingsModal; 