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
      <div className="h-full flex items-center justify-center text-gray-500">
        Select a prompt to edit
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">Instructions</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="mt-1 block w-full h-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        <div className="mt-1 flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Add a tag..."
          />
          <button
            onClick={handleAddTag}
            className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}; 