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
    <div className="border-t border-gray-200 pt-4">
      <button
        className="w-full flex items-center justify-between text-gray-700 hover:text-gray-900"
        onClick={() => dispatch(toggleTranslationPanel())}
      >
        <span className="font-medium">Translation</span>
        {isOpen ? (
          <ChevronUpIcon className="w-5 h-5" />
        ) : (
          <ChevronDownIcon className="w-5 h-5" />
        )}
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Target Language
            </label>
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Translated Text
            </label>
            <div className="mt-1 p-3 bg-gray-50 rounded-md min-h-[100px]">
              {translatedText || 'Translation will appear here...'}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleTranslate}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Translate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 