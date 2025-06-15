import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setSelectedPrompt } from '@/store/slices/promptsSlice';
import { PlusIcon } from '@heroicons/react/24/outline';

export const PromptList: React.FC = () => {
  const dispatch = useDispatch();
  const { prompts, selectedPromptId } = useSelector((state: RootState) => state.prompts);

  const handlePromptSelect = (promptId: string) => {
    dispatch(setSelectedPrompt(promptId));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Your Prompts</h2>
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          onClick={() => {/* TODO: Implement new prompt creation */}}
        >
          <PlusIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {prompts.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            No prompts yet. Create your first prompt!
          </div>
        ) : (
          <ul className="space-y-2">
            {prompts.map((prompt) => (
              <li
                key={prompt.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedPromptId === prompt.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50 border border-gray-200'
                }`}
                onClick={() => handlePromptSelect(prompt.id)}
              >
                <h3 className="font-medium text-gray-800">{prompt.title}</h3>
                <p className="text-sm text-gray-500 truncate">
                  {prompt.instructions}
                </p>
                <div className="flex gap-2 mt-2">
                  {prompt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}; 