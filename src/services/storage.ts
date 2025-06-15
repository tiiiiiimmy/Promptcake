import { Prompt } from '@/store/slices/promptsSlice';

const STORAGE_KEYS = {
  PROMPTS: 'prompts',
  SETTINGS: 'settings',
};

export interface Settings {
  theme: 'light' | 'dark';
  defaultLanguage: string;
}

export const storageService = {
  // Prompt operations
  async getPrompts(): Promise<Prompt[]> {
    const result = await chrome.storage.local.get(STORAGE_KEYS.PROMPTS);
    return result[STORAGE_KEYS.PROMPTS] || [];
  },

  async savePrompts(prompts: Prompt[]): Promise<void> {
    await chrome.storage.local.set({ [STORAGE_KEYS.PROMPTS]: prompts });
  },

  async addPrompt(prompt: Prompt): Promise<void> {
    const prompts = await this.getPrompts();
    prompts.push(prompt);
    await this.savePrompts(prompts);
  },

  async updatePrompt(prompt: Prompt): Promise<void> {
    const prompts = await this.getPrompts();
    const index = prompts.findIndex(p => p.id === prompt.id);
    if (index !== -1) {
      prompts[index] = prompt;
      await this.savePrompts(prompts);
    }
  },

  async deletePrompt(promptId: string): Promise<void> {
    const prompts = await this.getPrompts();
    const filteredPrompts = prompts.filter(p => p.id !== promptId);
    await this.savePrompts(filteredPrompts);
  },

  // Settings operations
  async getSettings(): Promise<Settings> {
    const result = await chrome.storage.local.get(STORAGE_KEYS.SETTINGS);
    return result[STORAGE_KEYS.SETTINGS] || {
      theme: 'light',
      defaultLanguage: 'en',
    };
  },

  async saveSettings(settings: Settings): Promise<void> {
    await chrome.storage.local.set({ [STORAGE_KEYS.SETTINGS]: settings });
  },

  // Utility functions
  async clearAll(): Promise<void> {
    await chrome.storage.local.clear();
  },
}; 