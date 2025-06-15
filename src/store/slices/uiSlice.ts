import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isTranslationPanelOpen: boolean;
  activeTab: 'prompts' | 'templates' | 'settings';
  theme: 'light' | 'dark';
}

const initialState: UIState = {
  isTranslationPanelOpen: false,
  activeTab: 'prompts',
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTranslationPanel: (state) => {
      state.isTranslationPanelOpen = !state.isTranslationPanelOpen;
    },
    setActiveTab: (state, action: PayloadAction<UIState['activeTab']>) => {
      state.activeTab = action.payload;
    },
    setTheme: (state, action: PayloadAction<UIState['theme']>) => {
      state.theme = action.payload;
    },
  },
});

export const {
  toggleTranslationPanel,
  setActiveTab,
  setTheme,
} = uiSlice.actions;

export default uiSlice.reducer; 