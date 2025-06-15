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
  const [translated, setTranslated] = useState('');

  // 添加参考材料块
  const handleAddReference = () => {
    const nextIndex = references.length + 1;
    setReferences([
      ...references,
      { id: Date.now().toString(), label: `Reference ${nextIndex}`, value: '' }
    ]);
  };

  // 编辑参考材料内容
  const handleRefChange = (id: string, value: string) => {
    setReferences(refs => refs.map(r => r.id === id ? { ...r, value } : r));
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
    <div className="popup-root">
      {/* 顶部 Logo + 名称 */}
      <div className="popup-header">
        <span className="popup-logo">🍰</span>
        <span className="popup-title">PromptCake</span>
      </div>
      <hr />
      {/* 主指令区 */}
      <div className="popup-section">
        <div className="popup-section-header">
          <label className="popup-label">Instruction</label>
          <button className="popup-btn-save-instruction" onClick={handleSaveInstruction}>
            <BookmarkIcon className="icon" /> Save Instruction
          </button>
        </div>
        <textarea
          className="popup-textarea"
          rows={2}
          placeholder="Write a cover letter..."
          value={instruction}
          onChange={e => setInstruction(e.target.value)}
        />
      </div>
      <hr />
      {/* 参考材料区 */}
      <div className="popup-section">
        <div className="popup-section-header">
          <span className="popup-section-icon">📎</span>
          <span className="popup-label">Reference Materials</span>
        </div>
        <div className="popup-reference-list">
          {references.map((ref) => (
            <div key={ref.id} className="popup-reference">
              <span className="popup-label" style={{width: '8rem'}}>{ref.label}</span>
              <textarea
                className="popup-input popup-input-value"
                rows={2}
                placeholder={`Enter reference...`}
                value={ref.value}
                onChange={e => handleRefChange(ref.id, e.target.value)}
              />
              <button className="popup-btn-remove" onClick={() => handleRemoveReference(ref.id)} title="Remove">
                ×
              </button>
            </div>
          ))}
          <div className="popup-reference-add">
            <button className="popup-btn-add" onClick={handleAddReference}>
              <PlusIcon className="icon" /> Add Reference Block
            </button>
          </div>
        </div>
      </div>
      <hr />
      {/* 操作区：翻译、保存 */}
      <div className="popup-actions-row">
        <button className="popup-btn popup-btn-translate" onClick={handleTranslate}>
          <GlobeAltIcon className="icon" /> Translate
        </button>
        <button className="popup-btn popup-btn-save-prompt" onClick={handleSavePrompt}>
          <BookmarkIcon className="icon" /> Save Prompt
        </button>
      </div>
      {/* 翻译结果展示 */}
      {translated && (
        <div className="popup-translation-result">
          <span className="popup-translation-label">EN:</span> {translated}
        </div>
      )}
      <hr />
      {/* 底部操作区：复制/跳转 */}
      <div className="popup-actions-row">
        <button className="popup-btn popup-btn-copy" onClick={handleCopyAll}>
          <ClipboardIcon className="icon" /> Copy All
        </button>
        <button className="popup-btn popup-btn-open-chatgpt" onClick={handleOpenChatGPT}>
          <ArrowTopRightOnSquareIcon className="icon" /> Open ChatGPT
        </button>
      </div>
    </div>
  );
};

export default Popup; 