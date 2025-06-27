import React, { useState, useEffect } from 'react';
import { TRANSLATE_CONFIG } from '../../config/translate';

const logoImg = (
  <img 
    src="/icons/icon48.png" 
    alt="PromptCake Logo" 
    width="40" 
    height="40"
    style={{ borderRadius: '50%' }}
  />
);

const settingsSvg = (
  <svg width="24" height="24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 16 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 8c.14.31.22.65.22 1v.09A1.65 1.65 0 0 0 21 12c0 .35-.08.69-.22 1z" />
  </svg>
);

interface SavedInstruction {
  id: string;
  content: string;
  createdAt: Date;
}

interface TranslationResult {
  original: string;
  translated: string;
  detectedLanguage?: string;
}

interface MaterialCardProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  onRemove: () => void;
}

const MaterialCard: React.FC<MaterialCardProps & { onLabelChange: (val: string) => void; onTranslate: () => void; isTranslating?: boolean; }> = ({ label, value, onChange, onRemove, onLabelChange, onTranslate, isTranslating }) => {
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);
  const [labelInput, setLabelInput] = useState(label);

  useEffect(() => {
    setLabelInput(label);
  }, [label]);

  const handleLabelSave = () => {
    if (labelInput.trim() && labelInput !== label) {
      onLabelChange(labelInput.trim());
    }
    setEditing(false);
  };

  return (
    <div className="popup-reference-card">
      <div className="popup-reference-header">
        {editing ? (
          <input
            className="popup-reference-label-input"
            value={labelInput}
            autoFocus
            onChange={e => setLabelInput(e.target.value)}
            onBlur={handleLabelSave}
            onKeyDown={e => { if (e.key === 'Enter') handleLabelSave(); }}
            style={{ marginRight: 8, width: 100 }}
          />
        ) : (
          <span className="popup-reference-label">{label}</span>
        )}
        <button
          className="popup-btn-edit"
          title="Edit label"
          onClick={() => setEditing(true)}
          style={{ marginLeft: 4 }}
        >
          <svg width="14" height="14" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
        </button>
        <button
          className="popup-btn-translate"
          title="Translate"
          onClick={onTranslate}
          disabled={isTranslating}
          style={{ marginLeft: 4 }}
        >
          <svg width="14" height="14" fill="none" stroke="#418fb7" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 17v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1"/><path d="M7 11l5-5 5 5"/><path d="M12 4v12"/></svg>
        </button>
        <button
          className={hover ? 'popup-btn-remove hovered' : 'popup-btn-remove'}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          onClick={onRemove}
          style={{ marginLeft: 4 }}
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 12 13"><path d="M3.625 1.125H3.5C3.56875 1.125 3.625 1.06875 3.625 1V1.125H8.375V1C8.375 1.06875 8.43125 1.125 8.5 1.125H8.375V2.25H9.5V1C9.5 0.448438 9.05156 0 8.5 0H3.5C2.94844 0 2.5 0.448438 2.5 1V2.25H3.625V1.125ZM11.5 2.25H0.5C0.223438 2.25 0 2.47344 0 2.75V3.25C0 3.31875 0.05625 3.375 0.125 3.375H1.06875L1.45469 11.5469C1.47969 12.0797 1.92031 12.5 2.45313 12.5H9.54688C10.0813 12.5 10.5203 12.0813 10.5453 11.5469L10.9313 3.375H11.875C11.9438 3.375 12 3.31875 12 3.25V2.75C12 2.47344 11.7766 2.25 11.5 2.25ZM9.42656 11.375H2.57344L2.19531 3.375H9.80469L9.42656 11.375Z" /></svg>
        </button>
      </div>
      <textarea
        className="popup-reference-textarea"
        placeholder={label === 'Materials 1' ? 'Job Description...' : label === 'Materials 2' ? 'Resume...' : 'Content...'}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
      />
    </div>
  );
};

const Popup: React.FC = () => {
  const [instruction, setInstruction] = useState('');
  const [savedInstructions, setSavedInstructions] = useState<SavedInstruction[]>([]);
  const [showSavedInstructions, setShowSavedInstructions] = useState(false);
  const [references, setReferences] = useState<any[]>([]);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');
  const [addHover, setAddHover] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('en');

  // 语言选项 - 现在使用配置文件中的语言代码
  const languageOptions = [
    { code: 'en', name: 'EN' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'es', name: 'ES' },
    { code: 'fr', name: 'FR' },
    { code: 'de', name: 'DE' },
    { code: 'ru', name: 'RU' },
    { code: 'it', name: 'IT' },
    { code: 'pt', name: 'PT' },
  ];

  // Google Translate API调用（带重试逻辑）
  const translateText = async (text: string, targetLang: string = 'en'): Promise<TranslationResult> => {
    if (TRANSLATE_CONFIG.DEBUG_MODE) {
      console.log('🔄 Translation request:', { text, targetLang });
    }

    if (!TRANSLATE_CONFIG.GOOGLE_TRANSLATE_API_KEY) {
      alert('Please configure Google Translate API Key in src/config/translate.ts');
      throw new Error('Google Translate API Key not configured');
    }

    const detectedLang = detectLanguage(text);
    
    if (TRANSLATE_CONFIG.DEBUG_MODE) {
      console.log('🔍 Detected language:', detectedLang);
    }
    
    // 如果目标语言和检测到的语言相同，直接返回
    if (detectedLang === targetLang) {
      if (TRANSLATE_CONFIG.DEBUG_MODE) {
        console.log('✅ Same language detected, returning original text');
      }
      return {
        original: text,
        translated: text,
        detectedLanguage: detectedLang
      };
    }

    // 转换语言代码为Google Translate支持的格式
    const googleTargetLang = TRANSLATE_CONFIG.LANGUAGE_CODES[targetLang as keyof typeof TRANSLATE_CONFIG.LANGUAGE_CODES] || targetLang;
    const googleSourceLang = detectedLang !== 'auto' ? (TRANSLATE_CONFIG.LANGUAGE_CODES[detectedLang as keyof typeof TRANSLATE_CONFIG.LANGUAGE_CODES] || detectedLang) : undefined;

    if (TRANSLATE_CONFIG.DEBUG_MODE) {
      console.log('🌐 Language mapping:', { googleSourceLang, googleTargetLang });
    }

    let lastError: Error | null = null;
    
    // 重试逻辑
    for (let attempt = 0; attempt <= TRANSLATE_CONFIG.MAX_RETRIES; attempt++) {
      try {
        if (TRANSLATE_CONFIG.DEBUG_MODE) {
          console.log(`🚀 Translation attempt ${attempt + 1}/${TRANSLATE_CONFIG.MAX_RETRIES + 1}`);
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TRANSLATE_CONFIG.TIMEOUT);

        const requestBody = {
          q: text,
          target: googleTargetLang,
          source: googleSourceLang,
          format: 'text'
        };

        if (TRANSLATE_CONFIG.DEBUG_MODE) {
          console.log('📤 API Request body:', requestBody);
        }

        const response = await fetch(`${TRANSLATE_CONFIG.GOOGLE_TRANSLATE_API_URL}?key=${TRANSLATE_CONFIG.GOOGLE_TRANSLATE_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Translation API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        if (TRANSLATE_CONFIG.DEBUG_MODE) {
          console.log('📥 API Response:', data);
        }
        
        if (data.error) {
          throw new Error(`Google Translate API error: ${data.error.message}`);
        }

        const translatedText = data.data.translations[0].translatedText;
        const sourceLanguage = data.data.translations[0].detectedSourceLanguage || detectedLang;

        if (TRANSLATE_CONFIG.DEBUG_MODE) {
          console.log('✅ Translation successful:', { 
            original: text, 
            translated: translatedText, 
            detectedLanguage: sourceLanguage 
          });
        }

        return {
          original: text,
          translated: translatedText,
          detectedLanguage: sourceLanguage
        };

      } catch (error) {
        lastError = error as Error;
        
        if (TRANSLATE_CONFIG.DEBUG_MODE) {
          console.warn(`❌ Translation attempt ${attempt + 1} failed:`, error);
        }
        
        // 如果不是最后一次重试，等待一段时间后重试
        if (attempt < TRANSLATE_CONFIG.MAX_RETRIES) {
          const waitTime = 1000 * (attempt + 1);
          if (TRANSLATE_CONFIG.DEBUG_MODE) {
            console.log(`⏳ Waiting ${waitTime}ms before retry...`);
          }
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
    }

    // 所有重试都失败，使用fallback处理
    console.error('🔥 All translation attempts failed:', lastError);
    
    if (TRANSLATE_CONFIG.DEBUG_MODE) {
      console.log('🔄 Using fallback translation...');
    }
    
    const fallbackTranslations: { [key: string]: { [key: string]: string } } = {
      'en': {
        '写一封求职信': 'Write a cover letter',
        '我需要帮助': 'I need help',
        '职位描述': 'Job description',
        '简历': 'Resume',
        '个人简历': 'Personal resume',
        '工作经验': 'Work experience',
        '技能': 'Skills',
        '教育背景': 'Educational background'
      },
      'zh': {
        'Write a cover letter': '写一封求职信',
        'I need help': '我需要帮助',
        'Job description': '职位描述',
        'Resume': '简历',
        'Personal resume': '个人简历',
        'Work experience': '工作经验',
        'Skills': '技能',
        'Educational background': '教育背景'
      }
    };

    // 尝试使用fallback翻译
    let translated = text;
    const translations = fallbackTranslations[targetLang];
    if (translations) {
      for (const [source, target] of Object.entries(translations)) {
        if (text.includes(source)) {
          translated = translated.replace(new RegExp(source, 'g'), target);
        }
      }
    }

    // 如果没有匹配到，显示错误信息
    if (translated === text && detectedLang !== targetLang) {
      const langPrefix = languageOptions.find(l => l.code === targetLang)?.name || targetLang.toUpperCase();
      translated = `[Translation failed - ${langPrefix}] ${text}`;
    }

    if (TRANSLATE_CONFIG.DEBUG_MODE) {
      console.log('🔄 Fallback result:', { original: text, translated, detectedLanguage: detectedLang });
    }

    return {
      original: text,
      translated: translated,
      detectedLanguage: detectedLang
    };
  };

  // 语言检测函数
  const detectLanguage = (text: string): string => {
    // 简单的语言检测逻辑
    const chineseRegex = /[\u4e00-\u9fff]/;
    const japaneseRegex = /[\u3040-\u309f\u30a0-\u30ff]/;
    const koreanRegex = /[\uac00-\ud7af]/;
    
    if (chineseRegex.test(text)) return 'zh';
    if (japaneseRegex.test(text)) return 'ja';
    if (koreanRegex.test(text)) return 'ko';
    
    // 检测是否已经是英文
    const englishRegex = /^[a-zA-Z\s\.,!?;:'"()-]+$/;
    if (englishRegex.test(text.trim())) return 'en';
    
    return 'auto'; // 默认自动检测
  };

  // 从 localStorage 加载保存的指令
  useEffect(() => {
    const saved = localStorage.getItem('promptcake-saved-instructions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedInstructions(parsed.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt)
        })));
      } catch (error) {
        console.error('Failed to load saved instructions:', error);
      }
    }
  }, []);

  // 保存指令到 localStorage
  const saveInstructionsToStorage = (instructions: SavedInstruction[]) => {
    localStorage.setItem('promptcake-saved-instructions', JSON.stringify(instructions));
  };

  // 编辑材料label
  const handleLabelChange = (id: string, newLabel: string) => {
    setReferences(refs => refs.map(r => r.id === id ? { ...r, label: newLabel } : r));
  };

  // 翻译单个材料
  const handleTranslateMaterial = async (id: string) => {
    const ref = references.find(r => r.id === id);
    if (!ref || !ref.value.trim()) return;
    setIsTranslating(true);
    try {
      const translation = await translateText(ref.value, targetLanguage);
      // 直接替换材料内容
      setReferences(refs => refs.map(r => r.id === id ? { ...r, value: translation.translated } : r));
    } catch (e) {
      alert('Translation failed.');
    } finally {
      setIsTranslating(false);
    }
  };

  // 添加材料
  const handleAddReference = () => {
    setReferences([
      ...references,
      { id: Date.now().toString(), label: `Materials ${references.length + 1}`, value: '' }
    ]);
  };

  // 编辑内容
  const handleRefChange = (id: string, value: string) => {
    setReferences(refs => refs.map(r => r.id === id ? { ...r, value } : r));
  };

  // 删除材料
  const handleRemoveReference = (id: string) => {
    setReferences(refs => refs.filter(r => r.id !== id));
  };

  // 复制全部
  const handleCopyAll = () => {
    let content = instruction + '\n\n' + references.map(r => r.value.trim() ? `${r.label}: ${r.value}` : '').filter(Boolean).join('\n');
    navigator.clipboard.writeText(content);
    alert('Copied to clipboard!');
  };

  // 保存指令
  const handleSaveInstruction = () => {
    if (!instruction.trim()) {
      alert('Please enter an instruction before saving');
      return;
    }

    const newInstruction: SavedInstruction = {
      id: Date.now().toString(),
      content: instruction,
      createdAt: new Date()
    };

    const updatedInstructions = [newInstruction, ...savedInstructions].slice(0, 10); // 最多保存10个
    setSavedInstructions(updatedInstructions);
    saveInstructionsToStorage(updatedInstructions);
    
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  // 选择已保存的指令
  const handleSelectSavedInstruction = (savedInstruction: SavedInstruction) => {
    setInstruction(savedInstruction.content);
    setShowSavedInstructions(false);
  };

  // 删除已保存的指令
  const handleDeleteSavedInstruction = (id: string) => {
    const updatedInstructions = savedInstructions.filter(item => item.id !== id);
    setSavedInstructions(updatedInstructions);
    saveInstructionsToStorage(updatedInstructions);
  };

  // 翻译指令
  const handleTranslateInstruction = async () => {
    if (!instruction.trim()) return;
    setIsTranslating(true);
    try {
      const translation = await translateText(instruction, targetLanguage);
      setInstruction(translation.translated);
    } catch (e) {
      alert('Translation failed.');
    } finally {
      setIsTranslating(false);
    }
  };

  // 翻译全部内容
  const handleTranslateAll = async () => {
    setIsTranslating(true);
    
    try {
      const promises = [];
      
      // 翻译指令
      if (instruction.trim()) {
        promises.push(translateText(instruction, targetLanguage).then(result => {
          setInstruction(result.translated);
        }));
      }
      
      // 翻译所有材料
      references.forEach((ref, index) => {
        if (ref.value.trim()) {
          promises.push(translateText(ref.value, targetLanguage).then(result => {
            setReferences(refs => refs.map(r => r.id === ref.id ? { ...r, value: result.translated } : r));
          }));
        }
      });
      
      if (promises.length === 0) {
        alert('No content to translate');
        setIsTranslating(false);
        return;
      }
      
      await Promise.all(promises);
    } catch (error) {
      console.error('Translation failed:', error);
      alert('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="popup-root">
      {/* 顶部 Logo + 名称 + 设置icon */}
      <div className="popup-header">
        <div className="popup-header-left">
          <span className="popup-logo">{logoImg}</span>
          <span className="popup-title">Promptcake</span>
        </div>
        <button className="popup-settings-btn" title="Settings">
          {settingsSvg}
        </button>
      </div>

      {/* Instruction 区块 */}
      <div className="popup-section">
        <div className="popup-section-header">
          <span className="popup-label">Instruction</span>
          <button className="popup-btn-save" onClick={handleSaveInstruction}>
            {saveStatus === 'saved' ? 'Saved!' : 'Save'}
            <svg width="16" height="16" fill="#418fb7" style={{ marginLeft: 4, opacity: saveStatus === 'saved' ? 0.3 : 1 }} viewBox="0 0 12 12"><path d="M11.7195 2.7195L9.2805 0.2805C9.168 0.168 9.03 0.0855 8.88 0.0405V0H0.48C0.2145 0 0 0.2145 0 0.48V11.52C0 11.7855 0.2145 12 0.48 12H11.52C11.7855 12 12 11.7855 12 11.52V3.3975C12 3.1425 11.8995 2.8995 11.7195 2.7195ZM4.08 1.08H7.92V2.64H4.08V1.08ZM10.92 10.92H1.08V1.08H3.12V3.12C3.12 3.3855 3.3345 3.6 3.6 3.6H8.4C8.6655 3.6 8.88 3.3855 8.88 3.12V1.407L10.92 3.447V10.92ZM6 4.95C4.8075 4.95 3.84 5.9175 3.84 7.11C3.84 8.3025 4.8075 9.27 6 9.27C7.1925 9.27 8.16 8.3025 8.16 7.11C8.16 5.9175 7.1925 4.95 6 4.95ZM6 8.31C5.337 8.31 4.8 7.773 4.8 7.11C4.8 6.447 5.337 5.91 6 5.91C6.663 5.91 7.2 6.447 7.2 7.11C7.2 7.773 6.663 8.31 6 8.31Z" /></svg>
          </button>
        </div>

        {/* 已保存指令按钮 */}
        {savedInstructions.length > 0 && (
          <button 
            className="popup-btn-saved-instruction" 
            onClick={() => setShowSavedInstructions(!showSavedInstructions)}
          >
            <span>Saved Instruction</span>
            <svg 
              width="11" 
              height="8" 
              fill="#418fb7" 
              viewBox="0 0 9 6"
              style={{ 
                transform: showSavedInstructions ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
              }}
            >
              <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37824C8.49596 5.0336 8.02925 6 7.19249 6H1.80751C0.970755 6 0.504042 5.0336 1.0243 4.37824L3.71679 0.986589Z"/>
            </svg>
          </button>
        )}

        {/* 已保存指令列表 */}
        {showSavedInstructions && (
          <div className="popup-saved-instructions-list">
            {savedInstructions.map((savedInstruction) => (
              <div key={savedInstruction.id} className="popup-saved-instruction-item">
                <div 
                  className="popup-saved-instruction-content"
                  onClick={() => handleSelectSavedInstruction(savedInstruction)}
                >
                  <span className="popup-saved-instruction-text">
                    {savedInstruction.content.length > 50 
                      ? savedInstruction.content.substring(0, 50) + '...' 
                      : savedInstruction.content}
                  </span>
                  <span className="popup-saved-instruction-date">
                    {savedInstruction.createdAt.toLocaleDateString()}
                  </span>
                </div>
                <button
                  className="popup-btn-remove"
                  onClick={() => handleDeleteSavedInstruction(savedInstruction.id)}
                >
                  <svg width="12" height="12" fill="currentColor" viewBox="0 0 12 13"><path d="M3.625 1.125H3.5C3.56875 1.125 3.625 1.06875 3.625 1V1.125H8.375V1C8.375 1.06875 8.43125 1.125 8.5 1.125H8.375V2.25H9.5V1C9.5 0.448438 9.05156 0 8.5 0H3.5C2.94844 0 2.5 0.448438 2.5 1V2.25H3.625V1.125ZM11.5 2.25H0.5C0.223438 2.25 0 2.47344 0 2.75V3.25C0 3.31875 0.05625 3.375 0.125 3.375H1.06875L1.45469 11.5469C1.47969 12.0797 1.92031 12.5 2.45313 12.5H9.54688C10.0813 12.5 10.5203 12.0813 10.5453 11.5469L10.9313 3.375H11.875C11.9438 3.375 12 3.31875 12 3.25V2.75C12 2.47344 11.7766 2.25 11.5 2.25ZM9.42656 11.375H2.57344L2.19531 3.375H9.80469L9.42656 11.375Z" /></svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <textarea
          className="popup-textarea"
          placeholder="Write a cover letter for me..."
          value={instruction}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInstruction(e.target.value)}
        />
      </div>

      {/* Reference Materials 区块 */}
      <div className="popup-section">
        <div className="popup-section-header">
          <span className="popup-label">Materials</span>
        </div>
        <div className="popup-reference-list">
          {references.map((ref) => (
            <div key={ref.id}>
              <MaterialCard
                label={ref.label}
                value={ref.value}
                onChange={(val: string) => handleRefChange(ref.id, val)}
                onRemove={() => handleRemoveReference(ref.id)}
                onLabelChange={(val: string) => handleLabelChange(ref.id, val)}
                onTranslate={() => handleTranslateMaterial(ref.id)}
                isTranslating={isTranslating}
              />
            </div>
          ))}
          <button
            className={addHover ? 'popup-btn-add-material hovered' : 'popup-btn-add-material'}
            onMouseOver={() => setAddHover(true)}
            onMouseOut={() => setAddHover(false)}
            onClick={handleAddReference}
          >
            Add Materials +
          </button>
        </div>
      </div>

      {/* 底部操作区 */}
      <div className="popup-actions-row">
        <div className="popup-translate-section">
          <select 
            value={targetLanguage} 
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="popup-language-select"
            disabled={isTranslating}
          >
            {languageOptions.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
          <button 
            className="popup-btn-translate" 
            onClick={handleTranslateInstruction}
            disabled={isTranslating || !instruction.trim()}
            title="Translate instruction only"
          >
            {isTranslating ? 'Translating...' : 'Translate Instruction'}
          </button>
          <button 
            className="popup-btn-translate-all" 
            onClick={handleTranslateAll}
            disabled={isTranslating}
            title="Translate all content"
          >
            {isTranslating ? 'Translating...' : 'Translate All'}
          </button>
        </div>
        <button className="popup-btn-copyall" onClick={handleCopyAll}>
          Copy All
        </button>
      </div>
    </div>
  );
};

export default Popup; 