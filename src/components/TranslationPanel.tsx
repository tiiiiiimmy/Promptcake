import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleTranslationPanel } from '@/store/slices/uiSlice';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
];

export const TranslationPanel: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.isTranslationPanelOpen);
  const selectedPrompt = useSelector((state: RootState) =>
    state.prompts.prompts.find(p => p.id === state.prompts.selectedPromptId)
  );

  const [targetLanguage, setTargetLanguage] = useState('es');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    if (!selectedPrompt) return;

    // TODO: Implement actual translation logic
    // This is a placeholder for the translation API integration
    setTranslatedText('Translated text will appear here...');
  };

  if (!selectedPrompt) {
    return null;
  }

  return (
    <div className="translation-panel">
      <button
        className="translation-toggle"
        onClick={() => dispatch(toggleTranslationPanel())}
      >
        <span className="translation-title">Translation</span>
        {isOpen ? (
          <ChevronUpIcon className="icon" />
        ) : (
          <ChevronDownIcon className="icon" />
        )}
      </button>

      {isOpen && (
        <div className="translation-section">
          <div>
            <label className="translation-label">
              Target Language
            </label>
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="translation-select"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="translation-label">
              Translated Text
            </label>
            <div className="translation-result">
              {translatedText || 'Translation will appear here...'}
            </div>
          </div>

          <div className="translation-actions">
            <button
              onClick={handleTranslate}
              className="btn-primary"
            >
              Translate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 