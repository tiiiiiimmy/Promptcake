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
    <div className="prompt-list">
      <div className="prompt-list-header">
        <h2>Your Prompts</h2>
        <button
          className="add-prompt-btn"
          onClick={() => {/* TODO: Implement new prompt creation */}}
        >
          <PlusIcon className="icon" />
        </button>
      </div>

      <div className="prompt-list-content">
        {prompts.length === 0 ? (
          <div className="empty-message">
            No prompts yet. Create your first prompt!
          </div>
        ) : (
          <ul className="prompt-list-ul">
            {prompts.map((prompt) => (
              <li
                key={prompt.id}
                className={`prompt-list-item${selectedPromptId === prompt.id ? ' selected' : ''}`}
                onClick={() => handlePromptSelect(prompt.id)}
              >
                <h3 className="prompt-title">{prompt.title}</h3>
                <p className="prompt-instructions">
                  {prompt.instructions}
                </p>
                <div className="prompt-tags">
                  {prompt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tag"
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