import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { updatePrompt } from '@/store/slices/promptsSlice';
import { Prompt } from '@/store/slices/promptsSlice';

export const PromptEditor: React.FC = () => {
  const dispatch = useDispatch();
  const { prompts, selectedPromptId } = useSelector((state: RootState) => state.prompts);
  const selectedPrompt = prompts.find(p => p.id === selectedPromptId);

  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [references, setReferences] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (selectedPrompt) {
      setTitle(selectedPrompt.title);
      setInstructions(selectedPrompt.instructions);
      setReferences(selectedPrompt.references);
      setTags(selectedPrompt.tags);
    } else {
      setTitle('');
      setInstructions('');
      setReferences([]);
      setTags([]);
    }
  }, [selectedPrompt]);

  const handleSave = () => {
    if (!selectedPrompt) return;

    const updatedPrompt: Prompt = {
      ...selectedPrompt,
      title,
      instructions,
      references,
      tags,
      updatedAt: new Date().toISOString(),
    };

    dispatch(updatePrompt(updatedPrompt));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  if (!selectedPrompt) {
    return (
      <div className="empty-message">
        Select a prompt to edit
      </div>
    );
  }

  return (
    <div className="prompt-editor">
      <div>
        <label className="label">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-primary"
        />
      </div>

      <div>
        <label className="label">Instructions</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="input-primary"
        />
      </div>

      <div>
        <label className="label">Tags</label>
        <div className="tag-input-row">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            className="input-primary"
            placeholder="Add a tag..."
          />
          <button
            onClick={handleAddTag}
            className="btn-primary"
          >
            Add
          </button>
        </div>
        <div className="tag-list">
          {tags.map((tag) => (
            <span
              key={tag}
              className="tag"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="tag-remove"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="actions">
        <button
          onClick={handleSave}
          className="btn-primary"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}; 