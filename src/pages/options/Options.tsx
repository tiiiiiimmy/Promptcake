import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setTheme } from '@/store/slices/uiSlice';
import { storageService } from '@/services/storage';

const Options: React.FC = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.ui);

  const handleThemeChange = async (newTheme: 'light' | 'dark') => {
    dispatch(setTheme(newTheme));
    const settings = await storageService.getSettings();
    await storageService.saveSettings({ ...settings, theme: newTheme });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">PromptCake Settings</h1>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Appearance</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Theme</label>
                <select
                  value={theme}
                  onChange={(e) => handleThemeChange(e.target.value as 'light' | 'dark')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Data Management</h2>
            <div className="space-y-4">
              <button
                onClick={() => storageService.clearAll()}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Clear All Data
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">About</h2>
            <p className="text-sm text-gray-500">
              PromptCake v1.0.0 - A Chrome extension for organizing and managing ChatGPT prompts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options; 