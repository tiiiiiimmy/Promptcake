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
    <div className="options-root">
      <div className="options-container">
        <h1 className="options-title">PromptCake Settings</h1>

        <div className="options-section">
          <div>
            <h2 className="options-section-title">Appearance</h2>
            <div>
              <label className="options-label">Theme</label>
              <select
                value={theme}
                onChange={(e) => handleThemeChange(e.target.value as 'light' | 'dark')}
                className="options-select"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>

          <div>
            <h2 className="options-section-title">Data Management</h2>
            <div>
              <button
                onClick={() => storageService.clearAll()}
                className="options-btn options-btn-danger"
              >
                Clear All Data
              </button>
            </div>
          </div>

          <div>
            <h2 className="options-section-title">About</h2>
            <p className="options-about">
              PromptCake v1.0.0 - A Chrome extension for organizing and managing ChatGPT prompts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options; 