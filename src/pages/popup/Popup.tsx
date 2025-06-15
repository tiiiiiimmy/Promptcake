import React, { useState } from 'react';
import { PlusIcon, ClipboardIcon, ArrowTopRightOnSquareIcon, GlobeAltIcon, BookmarkIcon } from '@heroicons/react/24/outline';

interface ReferenceBlock {
  id: string;
  label: string;
  value: string;
}

const defaultReferences = [
  { id: 'job', label: 'Job Description', value: '' },
  { id: 'resume', label: 'Resume', value: '' },
];

const Popup: React.FC = () => {
  const [instruction, setInstruction] = useState('');
  const [references, setReferences] = useState<ReferenceBlock[]>(defaultReferences);
  const [newRefLabel, setNewRefLabel] = useState('');
  const [translated, setTranslated] = useState('');

  // 添加参考材料块
  const handleAddReference = () => {
    if (newRefLabel.trim()) {
      setReferences([...references, { id: Date.now().toString(), label: newRefLabel, value: '' }]);
      setNewRefLabel('');
    }
  };

  // 编辑参考材料内容
  const handleRefChange = (id: string, value: string) => {
    setReferences(refs => refs.map(r => r.id === id ? { ...r, value } : r));
  };

  // 编辑参考材料标题
  const handleRefLabelChange = (id: string, label: string) => {
    setReferences(refs => refs.map(r => r.id === id ? { ...r, label } : r));
  };

  // 删除参考材料
  const handleRemoveReference = (id: string) => {
    setReferences(refs => refs.filter(r => r.id !== id));
  };

  // 翻译主指令（模拟）
  const handleTranslate = () => {
    setTranslated('This is a translated version of: ' + instruction);
  };

  // 保存主指令（模拟）
  const handleSaveInstruction = () => {
    alert('Instruction saved!');
  };

  // 保存完整 prompt（模拟）
  const handleSavePrompt = () => {
    alert('Prompt (instruction + references) saved!');
  };

  // 复制全部
  const handleCopyAll = () => {
    const all = instruction + '\n' + references.map(r => `${r.label}: ${r.value}`).join('\n');
    navigator.clipboard.writeText(all);
    alert('Copied to clipboard!');
  };

  // 跳转 ChatGPT
  const handleOpenChatGPT = () => {
    window.open('https://chat.openai.com/', '_blank');
  };

  return (
    <div className="w-[400px] min-h-[600px] bg-white p-4 flex flex-col gap-4 font-sans">
      {/* 顶部 Logo + 名称 */}
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-block w-8 h-8 bg-sky-400 rounded-full flex items-center justify-center text-white text-xl font-bold">🍰</span>
        <span className="text-2xl font-bold text-gray-800 tracking-tight">PromptCake</span>
      </div>
      <hr />
      {/* 主指令区 */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="font-semibold text-gray-700">Instruction</label>
          <button className="flex items-center gap-1 text-xs text-blue-600 hover:underline" onClick={handleSaveInstruction}>
            <BookmarkIcon className="w-4 h-4" /> Save Instruction
          </button>
        </div>
        <textarea
          className="w-full rounded border border-gray-300 p-2 focus:ring-2 focus:ring-sky-400 focus:outline-none resize-none"
          rows={2}
          placeholder="Write a cover letter..."
          value={instruction}
          onChange={e => setInstruction(e.target.value)}
        />
      </div>
      <hr />
      {/* 参考材料区 */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base">📎</span>
          <span className="font-semibold text-gray-700">Reference Materials</span>
        </div>
        <div className="flex flex-col gap-2">
          {references.map((ref) => (
            <div key={ref.id} className="flex gap-2 items-start">
              <input
                className="w-32 rounded border border-gray-200 px-2 py-1 text-xs"
                value={ref.label}
                onChange={e => handleRefLabelChange(ref.id, e.target.value)}
              />
              <textarea
                className="flex-1 rounded border border-gray-200 px-2 py-1 text-xs"
                rows={2}
                placeholder={`Enter ${ref.label}...`}
                value={ref.value}
                onChange={e => handleRefChange(ref.id, e.target.value)}
              />
              <button className="text-gray-400 hover:text-red-500" onClick={() => handleRemoveReference(ref.id)} title="Remove">
                ×
              </button>
            </div>
          ))}
          <div className="flex gap-2 items-center mt-1">
            <input
              className="w-32 rounded border border-gray-200 px-2 py-1 text-xs"
              placeholder="New block label"
              value={newRefLabel}
              onChange={e => setNewRefLabel(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddReference()}
            />
            <button className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200 border border-gray-200" onClick={handleAddReference}>
              <PlusIcon className="w-4 h-4" /> Add Reference Block
            </button>
          </div>
        </div>
      </div>
      <hr />
      {/* 操作区：翻译、保存 */}
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-sky-500 text-white rounded hover:bg-sky-600" onClick={handleTranslate}>
          <GlobeAltIcon className="w-5 h-5" /> Translate
        </button>
        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleSavePrompt}>
          <BookmarkIcon className="w-5 h-5" /> Save Prompt
        </button>
      </div>
      {/* 翻译结果展示 */}
      {translated && (
        <div className="bg-gray-50 border border-sky-100 rounded p-2 text-xs text-gray-700">
          <span className="font-semibold">EN:</span> {translated}
        </div>
      )}
      <hr />
      {/* 底部操作区：复制/跳转 */}
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 border border-gray-200" onClick={handleCopyAll}>
          <ClipboardIcon className="w-5 h-5" /> Copy All
        </button>
        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600" onClick={handleOpenChatGPT}>
          <ArrowTopRightOnSquareIcon className="w-5 h-5" /> Open ChatGPT
        </button>
      </div>
    </div>
  );
};

export default Popup; 